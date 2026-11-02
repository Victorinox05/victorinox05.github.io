// Fondo animado con varios modos «de electrónica». Se elige con ?fondo=<modo>
// (pcb, osciloscopio, fpga, cronograma, puntos); sin parámetro, el de POR_DEFECTO.
// Los colores salen de las variables de estilos.css (--pista, --pad, --serigrafia, --pulso…).
// Lo que no se mueve se dibuja una vez en un lienzo aparte (capa); en cada fotograma
// solo se pinta encima lo que se mueve. Sin animación si el sistema pide menos movimiento.

(function () {
  const lienzo = document.getElementById('fondo');
  if (!lienzo) return;
  const ctx = lienzo.getContext('2d');
  const capa = document.createElement('canvas');
  const cctx = capa.getContext('2d');
  const sinMovimiento = matchMedia('(prefers-reduced-motion: reduce)');

  const POR_DEFECTO = 'pcb';
  const S = { ancho: 0, alto: 0, escala: 1, movil: false, c: {}, t: 0 };   // estado común
  let modo, estado, animando = false, ultimo = 0;

  const azar = (a, b) => a + Math.random() * (b - a);
  const entero = (a, b) => Math.floor(azar(a, b + 1));
  const rgba = (rgb, a) => `rgba(${rgb}, ${a})`;
  // Número pseudoaleatorio fijo para (a, b): las señales infinitas no necesitan guardar nada
  const hash = (a, b) => {
    let h = (a * 374761393 + b * 668265263) | 0;
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  };

  function leerColores() {
    const css = getComputedStyle(document.documentElement);
    const v = n => css.getPropertyValue(n).trim();
    S.claro = document.documentElement.getAttribute('data-theme') === 'light';
    S.c = { linea: v('--pista'), pad: v('--pad'), fondo: v('--fondo'), p1: v('--pulso'), p2: v('--pulso-2') || v('--pulso'), silk: v('--serigrafia') || v('--pad') };
  }

  // ---------------------------------------------------------------- modos
  const MODOS = {};

  // 1 · Circuito impreso: chips con patillas, buses de pistas a 45°, vías, componentes
  // pequeños y serigrafía. Los pulsos salen de los chips y encienden la vía al llegar.
  MODOS.pcb = (function () {
    const P = 8;                                                // separación entre pistas (px)
    const R = Math.SQRT1_2;
    const DIRS = [[1, 0], [R, R], [0, 1], [-R, R], [-1, 0], [-R, -R], [0, -1], [R, -R]];
    const QFP = ['XC7A100T', 'STM32F407', 'ATMEGA2560', 'ESP32-S3', 'RP2040'];
    const SOIC = ['LM358', 'NE555', '74HC595', 'MAX232', 'L293D'];
    const REDES = ['GND', '3V3', '5V', 'SDA', 'SCL', 'TX', 'RX', 'CLK', 'MOSI', 'MISO', 'PWM', 'RST'];
    let ocupado, cols, filas;                                    // rejilla para que las pistas no se crucen

    const giro = (a, b) => Math.min((a - b + 8) % 8, (b - a + 8) % 8);
    const fuera = (x, y) => x < 0 || y < 0 || x >= S.ancho || y >= S.alto;
    const libre = (x, y) => !ocupado[Math.floor(y / P) * cols + Math.floor(x / P)];
    function marcar(x0, y0, x1, y1) {
      for (let i = Math.max(0, Math.floor(x0 / P)); i <= Math.min(cols - 1, Math.floor(x1 / P)); i++)
        for (let j = Math.max(0, Math.floor(y0 / P)); j <= Math.min(filas - 1, Math.floor(y1 / P)); j++) ocupado[j * cols + i] = 1;
    }
    function areaLibre(x0, y0, x1, y1) {
      if (x0 < 0 || y0 < 0 || x1 >= S.ancho || y1 >= S.alto) return false;
      for (let x = x0; x <= x1; x += P / 2) for (let y = y0; y <= y1; y += P / 2) if (!libre(x, y)) return false;
      return true;
    }

    function medir(puntos) {
      const acum = [0];
      for (let i = 1; i < puntos.length; i++) acum.push(acum[i - 1] + Math.hypot(puntos[i][0] - puntos[i - 1][0], puntos[i][1] - puntos[i - 1][1]));
      return { puntos, acum, total: acum[acum.length - 1] };
    }
    function puntoEn(t, s) {
      let i = 1;
      while (i < t.acum.length - 1 && t.acum[i] < s) i++;
      const [x0, y0] = t.puntos[i - 1], [x1, y1] = t.puntos[i];
      const k = (s - t.acum[i - 1]) / ((t.acum[i] - t.acum[i - 1]) || 1);
      return [x0 + (x1 - x0) * k, y0 + (y1 - y0) * k];
    }
    function cortar(t, s) {
      const pts = [t.puntos[0]];
      for (let i = 1; i < t.puntos.length; i++) {
        if (t.acum[i] < s) { pts.push(t.puntos[i]); continue; }
        pts.push(puntoEn(t, s)); break;
      }
      return medir(pts);
    }
    function trazar(c, t, s0, s1) {                              // trozo de pista entre dos longitudes
      c.moveTo(...puntoEn(t, s0));
      for (let i = 1; i < t.puntos.length; i++) if (t.acum[i] > s0 && t.acum[i] < s1) c.lineTo(...t.puntos[i]);
      c.lineTo(...puntoEn(t, s1));
    }

    // Línea central de un bus: tramos rectos y diagonales que se alternan, sin volver hacia atrás
    function camino(x, y, d, largo) {
      const pts = [[x, y]];
      let dir = d, l = entero(1, 5) * P;
      while (largo > 0) {
        l = Math.min(l, largo); largo -= l;
        x += DIRS[dir][0] * l; y += DIRS[dir][1] * l; pts.push([x, y]);
        const op = [(dir + 1) % 8, (dir + 7) % 8].filter(n => giro(n, d) <= 2);
        dir = op[entero(0, op.length - 1)];
        l = dir % 2 ? entero(1, 4) * P * Math.SQRT2 : entero(3, 20) * P;
      }
      return pts;
    }
    // Pista paralela a la línea central, a una distancia o (inglete en cada esquina)
    function normal([x0, y0], [x1, y1]) { const l = Math.hypot(x1 - x0, y1 - y0) || 1; return [-(y1 - y0) / l, (x1 - x0) / l]; }
    function desplazar(pts, o) {
      return pts.map((p, i) => {
        const n1 = normal(pts[Math.max(0, i - 1)], pts[Math.max(1, i)]);
        const n2 = normal(pts[Math.min(i, pts.length - 2)], pts[Math.min(i + 1, pts.length - 1)]);
        let mx = n1[0] + n2[0], my = n1[1] + n2[1];
        const l = Math.hypot(mx, my); mx /= l; my /= l;
        const k = o / (mx * n1[0] + my * n1[1]);
        return [p[0] + mx * k, p[1] + my * k];
      });
    }
    function hastaChoque(t) {
      for (let s = 12; s < t.total; s += 3) {
        const [x, y] = puntoEn(t, s);
        if (fuera(x, y)) return { s, via: false };
        if (!libre(x, y)) return { s: s - 12, via: true };
      }
      return { s: t.total, via: true };
    }
    function bus(e, x, y, d, k, largo) {
      const centro = camino(x, y, d, largo), nuevas = [];
      for (let i = 0; i < k; i++) {
        let t = medir(desplazar(centro, (i - (k - 1) / 2) * P));
        if (fuera(...t.puntos[0])) continue;
        const fin = hastaChoque(t);
        const s = fin.s - (fin.via ? (i % 2) * 10 : 0);         // vías al tresbolillo
        if (s < 40) continue;
        t = cortar(t, s); t.via = fin.via;
        nuevas.push(t);
      }
      if (nuevas.length < Math.min(2, k)) return;
      for (const t of nuevas) {
        for (let s = 0; s <= t.total; s += 3) { const [px, py] = puntoEn(t, s); marcar(px - P, py - P, px + P, py + P); }
        if (t.via) e.vias.push(t.puntos[t.puntos.length - 1]);
        e.pistas.push(t);
      }
      const ult = nuevas[0];
      if (ult.via && Math.random() < .2) {                       // nombre de la red junto a la vía
        const [vx, vy] = ult.puntos[ult.puntos.length - 1], [ax, ay] = ult.puntos[ult.puntos.length - 2];
        const l = Math.hypot(vx - ax, vy - ay) || 1;
        e.textos.push([REDES[entero(0, REDES.length - 1)], vx + (vx - ax) / l * 9, vy + (vy - ay) / l * 9 + 3]);
      }
    }

    function ponerChip(e) {
      for (let intento = 0; intento < 50; intento++) {
        const qfp = Math.random() < .6, n = qfp ? entero(6, 10) : entero(4, 7);
        const w = n * P + 8, h = qfp ? w : 3 * P + 6;
        const x = Math.round(azar(40, S.ancho - 40 - w) / P) * P, y = Math.round(azar(40, S.alto - 40 - h) / P) * P;
        if (!areaLibre(x - 90, y - 90, x + w + 90, y + h + 90)) continue;
        const ch = { x, y, w, h, n, qfp, cx: x + w / 2, cy: y + h / 2, patillas: [],
          nombre: (qfp ? QFP : SOIC)[entero(0, (qfp ? QFP : SOIC).length - 1)], ref: 'U' + (e.chips.length + 1) };
        ch.lados = qfp ? [0, 2, 4, 6] : [2, 6];
        for (const d of ch.lados) {
          const ext = d % 4 ? h / 2 : w / 2, nd = [-DIRS[d][1], DIRS[d][0]];
          for (let j = 0; j < n; j++) {
            const a = (j - (n - 1) / 2) * P, bx = ch.cx + DIRS[d][0] * ext + nd[0] * a, by = ch.cy + DIRS[d][1] * ext + nd[1] * a;
            ch.patillas.push([bx, by, bx + DIRS[d][0] * 6, by + DIRS[d][1] * 6]);
          }
        }
        marcar(x - 6, y - 6, x + w + 6, y + h + 6);
        e.chips.push(ch);
        return;
      }
    }

    function ponerPasivo(e, ch) {                              // si hay chip, cerca de él (desacoplo)
      const tumbado = Math.random() < .5, w = tumbado ? 18 : 7, h = tumbado ? 7 : 18;
      const x = Math.round((ch ? ch.x + azar(-70, ch.w + 50) : azar(10, S.ancho - 30)) / 2) * 2;
      const y = Math.round((ch ? ch.y + azar(-70, ch.h + 50) : azar(10, S.alto - 30)) / 2) * 2;
      if (!areaLibre(x - 6, y - 14, x + w + 6, y + h + 6)) return;
      const pads = tumbado ? [[x, y, 6, 7], [x + 12, y, 6, 7]] : [[x, y, 7, 6], [x, y + 12, 7, 6]];
      const letra = 'RRRCCCDL'[entero(0, 7)];
      e.pasivos.push({ x, y, w, h, pads, ref: letra + entero(1, 48) });
      marcar(x - 4, y - 12, x + w + 4, y + h + 4);
    }

    return {
      preparar() {
        cols = Math.ceil(S.ancho / P) + 1; filas = Math.ceil(S.alto / P) + 1;
        ocupado = new Uint8Array(cols * filas);
        const e = { chips: [], pistas: [], vias: [], pasivos: [], textos: [], pulsos: [], destellos: [] };
        const area = S.ancho * S.alto;
        for (let i = 0, n = Math.max(2, Math.round(area / 230000)); i < n; i++) ponerChip(e);
        for (const ch of e.chips) for (const d of ch.lados) {          // buses que salen de cada lado
          if (Math.random() < .15) continue;
          const k = entero(3, ch.n), j0 = entero(0, ch.n - k), ext = d % 4 ? ch.h / 2 : ch.w / 2;
          const gc = (j0 + (k - 1) / 2 - (ch.n - 1) / 2) * P, nd = [-DIRS[d][1], DIRS[d][0]];
          bus(e, ch.cx + DIRS[d][0] * (ext + 7) + nd[0] * gc, ch.cy + DIRS[d][1] * (ext + 7) + nd[1] * gc, d, k, entero(12, 50) * P);
        }
        for (let i = 0, n = Math.round(area / 50000); i < n; i++) {    // buses que entran por los bordes
          const d = entero(0, 3) * 2;
          const x = d === 0 ? 1 : d === 4 ? S.ancho - 1 : Math.round(azar(20, S.ancho - 20) / P) * P;
          const y = d === 2 ? 1 : d === 6 ? S.alto - 1 : Math.round(azar(20, S.alto - 20) / P) * P;
          bus(e, x, y, d, entero(2, 6), entero(10, 45) * P);
        }
        for (const ch of e.chips) for (let i = 0; i < 8; i++) ponerPasivo(e, ch);
        for (let i = 0, n = Math.round(area / 90000); i < n; i++) ponerPasivo(e);
        return e;
      },
      fijo(c, e) {
        c.lineCap = c.lineJoin = 'round';
        c.strokeStyle = S.c.linea; c.lineWidth = 1.5;
        c.beginPath();
        for (const t of e.pistas) { c.moveTo(...t.puntos[0]); for (const q of t.puntos.slice(1)) c.lineTo(...q); }
        c.stroke();
        c.strokeStyle = S.c.pad; c.lineWidth = 3; c.lineCap = 'butt';          // patillas
        c.beginPath();
        for (const ch of e.chips) for (const [x0, y0, x1, y1] of ch.patillas) { c.moveTo(x0, y0); c.lineTo(x1, y1); }
        c.stroke();
        c.fillStyle = S.c.pad;
        for (const p of e.pasivos) for (const [x, y, w, h] of p.pads) c.fillRect(x, y, w, h);
        c.lineWidth = 1.6;                                                       // vías
        for (const [x, y] of e.vias) {
          c.strokeStyle = S.c.pad; c.beginPath(); c.arc(x, y, 3.4, 0, 7); c.stroke();
          c.fillStyle = S.c.fondo; c.beginPath(); c.arc(x, y, 2.4, 0, 7); c.fill();
        }
        // Serigrafía: contornos, referencias y nombres
        c.strokeStyle = c.fillStyle = S.c.silk; c.lineWidth = 1;
        c.textAlign = 'center';
        for (const ch of e.chips) {
          c.strokeRect(ch.x + .5, ch.y + .5, ch.w - 1, ch.h - 1);
          c.beginPath(); c.arc(ch.x + 6, ch.y + 6, 1.8, 0, 7); c.fill();
          c.font = '600 9px "JetBrains Mono", monospace'; c.fillText(ch.nombre, ch.cx, ch.cy + (ch.qfp ? 0 : 3));
          c.font = '8px "JetBrains Mono", monospace'; c.fillText(ch.ref, ch.cx, ch.qfp ? ch.cy + 12 : ch.y - 10);
        }
        c.font = '8px "JetBrains Mono", monospace';
        for (const p of e.pasivos) {
          c.strokeRect(p.x - 2.5, p.y - 2.5, p.w + 5, p.h + 5);
          c.fillText(p.ref, p.x + p.w / 2, p.y - 5);
        }
        for (const [txt, x, y] of e.textos) c.fillText(txt, x, y);
        c.textAlign = 'start';
      },
      mover(c, e, dt) {
        if (e.pistas.length && e.pulsos.length < (S.movil ? 5 : 11) && Math.random() < .07)
          e.pulsos.push({ t: e.pistas[entero(0, e.pistas.length - 1)], s: 0, v: azar(80, 170) });
        c.lineCap = c.lineJoin = 'round';
        const f = S.claro ? .6 : 1;                                             // en el tema claro, más suaves
        for (const pu of e.pulsos) {
          pu.s += pu.v * dt;
          const s = Math.min(pu.s, pu.t.total);
          c.strokeStyle = rgba(S.c.p1, .4 * f); c.lineWidth = 2;
          c.beginPath(); trazar(c, pu.t, Math.max(0, pu.s - 44), s); c.stroke();
          const [x, y] = puntoEn(pu.t, s);
          const g = c.createRadialGradient(x, y, 0, x, y, 9);
          g.addColorStop(0, rgba(S.c.p1, .95 * f)); g.addColorStop(1, rgba(S.c.p1, 0));
          c.fillStyle = g; c.beginPath(); c.arc(x, y, 9, 0, 7); c.fill();
          if (pu.s >= pu.t.total && !pu.llego) { pu.llego = true; if (pu.t.via) e.destellos.push({ x, y, v: 1 }); }
        }
        e.pulsos = e.pulsos.filter(pu => pu.s < pu.t.total + 44);
        for (const d of e.destellos) {                                           // la vía se enciende y se apaga
          const g = c.createRadialGradient(d.x, d.y, 0, d.x, d.y, 12);
          g.addColorStop(0, rgba(S.c.p2, .85 * f * d.v)); g.addColorStop(1, rgba(S.c.p2, 0));
          c.fillStyle = g; c.beginPath(); c.arc(d.x, d.y, 12, 0, 7); c.fill();
          d.v -= dt * 1.1;
        }
        e.destellos = e.destellos.filter(d => d.v > 0);
      }
    };
  })();

  // 2 · Pantalla de osciloscopio: retícula y tres canales que avanzan
  MODOS.osciloscopio = (function () {
    return {
      preparar: () => ({ div: S.movil ? 64 : 96 }),
      fijo(c, e) {
        const { div } = e, cx = Math.round(S.ancho / 2 / div) * div, cy = Math.round(S.alto / 2 / div) * div;
        c.strokeStyle = S.c.linea; c.lineWidth = 1;
        c.setLineDash([2, 6]);
        c.beginPath();
        for (let x = cx % div; x < S.ancho; x += div) { c.moveTo(x + .5, 0); c.lineTo(x + .5, S.alto); }
        for (let y = cy % div; y < S.alto; y += div) { c.moveTo(0, y + .5); c.lineTo(S.ancho, y + .5); }
        c.stroke(); c.setLineDash([]);
        // Ejes centrales con marcas, como en la pantalla de verdad
        c.strokeStyle = S.c.pad; c.beginPath();
        c.moveTo(0, cy + .5); c.lineTo(S.ancho, cy + .5); c.moveTo(cx + .5, 0); c.lineTo(cx + .5, S.alto);
        for (let x = cx % (div / 5); x < S.ancho; x += div / 5) { c.moveTo(x + .5, cy - 4); c.lineTo(x + .5, cy + 5); }
        for (let y = cy % (div / 5); y < S.alto; y += div / 5) { c.moveTo(cx - 4, y + .5); c.lineTo(cx + 5, y + .5); }
        c.stroke();
        c.font = '11px "JetBrains Mono", monospace'; c.fillStyle = S.c.pad;
        c.fillText('CH1 500mV   CH2 2V   CH3 1V   10µs/div   TRIG ↑ CH2', 16, S.alto - 16);
      },
      mover(c, e) {
        const { div } = e, t = S.t, A = div * .42;
        const canales = [
          { y: S.alto * .3, col: S.c.p1, f: x => Math.sin((x - t * 60) / 70) * A * .8 + Math.sin((x - t * 60) / 23) * A * .12 },
          { y: S.alto * .58, col: S.c.p2, f: x => (Math.floor((x - t * 60) / 48) % 2 ? -A : A) * .55 },
          { y: S.alto * .82, col: S.c.p1, f: x => { const u = (x - t * 60) / 160, k = Math.floor(u), r = u - k; return (r < .45 + .35 * Math.sin(k * 1.7) ? -A : A) * .4; } }
        ];
        for (const ch of canales) {
          for (const [ancho, alfa] of [[6, .07], [1.6, .55]]) {        // halo de fósforo y trazo
            c.strokeStyle = rgba(ch.col, alfa); c.lineWidth = ancho; c.lineJoin = 'round';
            c.beginPath();
            let prev = ch.f(0);
            c.moveTo(0, ch.y + prev);
            for (let x = 2; x <= S.ancho; x += 2) {
              const y = ch.f(x);
              if (Math.abs(y - prev) > A * .5) c.lineTo(x, ch.y + prev);   // flanco vertical
              c.lineTo(x, ch.y + y); prev = y;
            }
            c.stroke();
          }
        }
      }
    };
  })();

  // 3 · Malla de una FPGA: bloques lógicos y rutas que se van trazando entre ellos
  MODOS.fpga = (function () {
    function ruta(e) {
      const { cols, filas, paso } = e;
      const a = [entero(0, cols - 1), entero(0, filas - 1)];
      const b = [Math.max(0, Math.min(cols - 1, a[0] + entero(-8, 8))), Math.max(0, Math.min(filas - 1, a[1] + entero(-5, 5)))];
      const centro = ([i, j]) => [e.x0 + i * paso, e.y0 + j * paso];
      const canal = ([i, j]) => [e.x0 + i * paso + paso / 2, e.y0 + j * paso + paso / 2];
      const [ax, ay] = centro(a), [bx, by] = centro(b), [kx, ky] = canal(a), [, my] = canal(b);
      const puntos = [[ax, ay], [kx, ky], [kx, my], [bx + paso / 2, my], [bx + paso / 2, by], [bx, by]];
      const acum = [0];
      for (let i = 1; i < puntos.length; i++) acum.push(acum[i - 1] + Math.hypot(puntos[i][0] - puntos[i - 1][0], puntos[i][1] - puntos[i - 1][1]));
      return { puntos, acum, total: acum[acum.length - 1], s: 0, v: azar(120, 220), fin: 0, b };
    }
    function puntaRuta(r) {
      let i = 1;
      while (i < r.puntos.length - 1 && r.acum[i] < r.s) i++;
      const [x0, y0] = r.puntos[i - 1], [x1, y1] = r.puntos[i], t = (r.s - r.acum[i - 1]) / ((r.acum[i] - r.acum[i - 1]) || 1);
      return [x0 + (x1 - x0) * t, y0 + (y1 - y0) * t];
    }
    return {
      preparar() {
        const paso = S.movil ? 34 : 42;
        const cols = Math.ceil(S.ancho / paso) + 1, filas = Math.ceil(S.alto / paso) + 1;
        return { paso, cols, filas, x0: (S.ancho % paso) / 2, y0: (S.alto % paso) / 2, rutas: [], encendidos: new Map() };
      },
      fijo(c, e) {
        const { paso } = e, lado = paso * .36;
        c.strokeStyle = S.c.linea; c.lineWidth = 1;
        for (let i = 0; i < e.cols; i++) for (let j = 0; j < e.filas; j++) {
          const x = e.x0 + i * paso, y = e.y0 + j * paso;
          c.strokeRect(x - lado / 2 + .5, y - lado / 2 + .5, lado, lado);
          if (hash(i, j) < .5) {                       // caja de conmutación en el cruce de canales
            c.beginPath();
            c.moveTo(x + paso / 2 - 3, y + paso / 2); c.lineTo(x + paso / 2 + 3, y + paso / 2);
            c.moveTo(x + paso / 2, y + paso / 2 - 3); c.lineTo(x + paso / 2, y + paso / 2 + 3);
            c.stroke();
          }
        }
      },
      mover(c, e, dt) {
        const { paso } = e, lado = paso * .36;
        if (e.rutas.length < (S.movil ? 5 : 10) && Math.random() < .08) e.rutas.push(ruta(e));
        if (Math.random() < .25) e.encendidos.set(entero(0, e.cols - 1) + ',' + entero(0, e.filas - 1), .35);   // LUTs que cambian
        for (const r of e.rutas) {
          r.s = Math.min(r.total, r.s + r.v * dt);
          if (r.s >= r.total) r.fin += dt;
          const alfa = r.fin ? Math.max(0, .75 - r.fin * .6) : .75;
          c.strokeStyle = rgba(S.c.p1, alfa); c.lineWidth = 1.8; c.lineJoin = 'round';
          c.beginPath(); c.moveTo(...r.puntos[0]);
          for (let i = 1; i < r.puntos.length; i++) {
            if (r.acum[i] <= r.s) { c.lineTo(...r.puntos[i]); continue; }
            const [x0, y0] = r.puntos[i - 1], [x1, y1] = r.puntos[i], t = (r.s - r.acum[i - 1]) / (r.acum[i] - r.acum[i - 1]);
            c.lineTo(x0 + (x1 - x0) * t, y0 + (y1 - y0) * t);
            break;
          }
          c.stroke();
          if (!r.fin) {                                  // cabeza de la señal
            const [hx, hy] = puntaRuta(r);
            const g = c.createRadialGradient(hx, hy, 0, hx, hy, 8);
            g.addColorStop(0, rgba(S.c.p1, .9)); g.addColorStop(1, rgba(S.c.p1, 0));
            c.fillStyle = g; c.beginPath(); c.arc(hx, hy, 8, 0, 7); c.fill();
          }
          if (r.fin && r.fin < .05) e.encendidos.set(r.b.join(), 1);
        }
        e.rutas = e.rutas.filter(r => r.fin < 1.3);
        // Bloques que se encienden al llegar la señal y se apagan poco a poco
        for (const [k, v] of e.encendidos) {
          const [i, j] = k.split(',').map(Number), x = e.x0 + i * paso, y = e.y0 + j * paso;
          c.fillStyle = rgba(S.c.p2, .6 * v);
          c.fillRect(x - lado / 2, y - lado / 2, lado, lado);
          const nv = v - dt * .6;
          nv > 0 ? e.encendidos.set(k, nv) : e.encendidos.delete(k);
        }
      }
    };
  })();

  // 4 · Cronograma de un simulador digital (como el de Vivado): reloj, bits y buses que avanzan
  MODOS.cronograma = (function () {
    const SENALES = [
      ['clk', 'reloj', 1], ['rst_n', 'bit', 9], ['enable', 'bit', 4], ['data[7:0]', 'bus', 4], ['valid', 'bit', 2],
      ['addr[3:0]', 'bus', 8], ['tx', 'bit', 1], ['pwm', 'pwm', 6], ['irq', 'bit', 7], ['state', 'estado', 6],
      ['spi_sck', 'reloj', 1], ['spi_mosi', 'bit', 1], ['count[3:0]', 'cuenta', 2], ['busy', 'bit', 5]
    ];
    const ESTADOS = ['IDLE', 'LOAD', 'RUN', 'WAIT', 'DONE'];
    return {
      preparar() {
        const fila = S.movil ? 58 : 72, medio = S.movil ? 9 : 11;   // altura de fila y medio periodo del reloj
        const n = Math.ceil(S.alto / fila) + 1;
        return { fila, medio, n, alto: fila * .26 };
      },
      fijo(c, e) {
        c.strokeStyle = S.c.linea; c.lineWidth = 1; c.setLineDash([1, 5]);
        c.beginPath();
        for (let j = 0; j < e.n; j++) { const y = j * e.fila + e.fila / 2 + .5; c.moveTo(0, y); c.lineTo(S.ancho, y); }
        c.stroke(); c.setLineDash([]);
        c.font = (S.movil ? 10 : 11) + 'px "JetBrains Mono", monospace'; c.fillStyle = S.c.pad;
        for (let j = 0; j < e.n; j++) c.fillText(SENALES[j % SENALES.length][0], 12, j * e.fila + e.fila / 2 - e.alto / 2 - 6);
      },
      mover(c, e) {
        const T = e.medio * 2, des = S.t * 26;                     // desplazamiento en px
        c.font = (S.movil ? 9 : 10) + 'px "JetBrains Mono", monospace';
        for (let j = 0; j < e.n; j++) {
          const [, tipo, ciclos] = SENALES[j % SENALES.length];
          const yc = j * e.fila + e.fila / 2, h = e.alto / 2;
          const col = tipo === 'bus' || tipo === 'estado' || tipo === 'cuenta' ? S.c.p2 : S.c.p1;
          c.strokeStyle = rgba(col, S.claro ? .3 : .24); c.lineWidth = 1.2; c.fillStyle = rgba(col, S.claro ? .45 : .34);
          const w = tipo === 'reloj' ? e.medio : T * ciclos;
          const k0 = Math.floor(des / w) - 1, k1 = k0 + Math.ceil(S.ancho / w) + 3;
          c.beginPath();
          if (tipo === 'reloj' || tipo === 'bit' || tipo === 'pwm') {
            let prev = null;
            for (let k = k0; k <= k1; k++) {
              const x = k * w - des;
              if (tipo === 'pwm') {                                 // ancho de pulso que cambia
                const xs = x + w * (.2 + .6 * hash(j, k));
                c.moveTo(x, yc + h); c.lineTo(x, yc - h); c.lineTo(xs, yc - h); c.lineTo(xs, yc + h); c.lineTo(x + w, yc + h);
                continue;
              }
              const arriba = tipo === 'reloj' ? k % 2 : hash(j, k) < .5;
              const y = arriba ? yc - h : yc + h;
              if (prev === null) c.moveTo(x, y); else if (prev !== y) c.lineTo(x, y);
              c.lineTo(x + w, y); prev = y;
            }
            c.stroke();
          } else {                                                   // bus: rombos con el valor dentro
            for (let k = k0; k <= k1; k++) {
              const x = k * w - des, b = 4;
              c.moveTo(x, yc); c.lineTo(x + b, yc - h); c.lineTo(x + w - b, yc - h); c.lineTo(x + w, yc);
              c.lineTo(x + w - b, yc + h); c.lineTo(x + b, yc + h); c.closePath();
            }
            c.stroke();
            for (let k = k0; k <= k1; k++) {
              const x = k * w - des, r = hash(j, k);
              const txt = tipo === 'estado' ? ESTADOS[((k % ESTADOS.length) + ESTADOS.length) % ESTADOS.length]
                : tipo === 'cuenta' ? (((k % 16) + 16) % 16).toString(16).toUpperCase()
                : Math.floor(r * (j % 2 ? 16 : 256)).toString(16).toUpperCase().padStart(j % 2 ? 1 : 2, '0');
              c.fillText(txt, x + 8, yc + 3.5);
            }
          }
        }
        // Cursor del simulador
        const xc = Math.round(S.ancho * .72) + .5;
        c.strokeStyle = rgba(S.c.p2, .22); c.lineWidth = 1;
        c.beginPath(); c.moveTo(xc, 0); c.lineTo(xc, S.alto); c.stroke();
      }
    };
  })();

  // 5 · Matriz de puntos con ondas (y el ratón deja un brillo)
  MODOS.puntos = (function () {
    let raton = null;
    window.addEventListener('pointermove', ev => { raton = [ev.clientX, ev.clientY]; }, { passive: true });
    return {
      preparar: () => ({ paso: S.movil ? 20 : 24, ondas: [] }),
      fijo(c, e) {
        c.fillStyle = S.c.pad;
        for (let x = e.paso / 2; x < S.ancho; x += e.paso) for (let y = e.paso / 2; y < S.alto; y += e.paso) c.fillRect(x - .75, y - .75, 1.5, 1.5);
      },
      mover(c, e, dt) {
        if (e.ondas.length < 3 && Math.random() < .015) e.ondas.push({ x: azar(0, S.ancho), y: azar(0, S.alto * .8), r: 0, v: azar(90, 150) });
        for (const o of e.ondas) o.r += o.v * dt;
        e.ondas = e.ondas.filter(o => o.r < 520);
        const p = e.paso;
        for (let x = p / 2; x < S.ancho; x += p) for (let y = p / 2; y < S.alto; y += p) {
          let luz = 0;
          for (const o of e.ondas) {
            const d = Math.abs(Math.hypot(x - o.x, y - o.y) - o.r);
            if (d < 26) luz = Math.max(luz, (1 - d / 26) * (1 - o.r / 520));
          }
          if (raton) {
            const d = Math.hypot(x - raton[0], y - raton[1]);
            if (d < 130) luz = Math.max(luz, (1 - d / 130) * .8);
          }
          if (luz > .03) {
            c.fillStyle = rgba(luz > .5 ? S.c.p2 : S.c.p1, Math.min(.9, luz));
            c.beginPath(); c.arc(x, y, 1.2 + luz * 1.6, 0, 7); c.fill();
          }
        }
      }
    };
  })();

  // ---------------------------------------------------------------- motor común
  function preparar() {
    S.ancho = window.innerWidth; S.alto = window.innerHeight; S.movil = S.ancho < 760;
    S.escala = Math.min(window.devicePixelRatio || 1, S.movil ? 1.5 : 2);
    for (const c of [lienzo, capa]) { c.width = Math.round(S.ancho * S.escala); c.height = Math.round(S.alto * S.escala); }
    leerColores();
    estado = MODOS[modo].preparar();
    dibujarFijo();
    pintar(0);
  }

  function dibujarFijo() {
    cctx.setTransform(S.escala, 0, 0, S.escala, 0, 0);
    cctx.clearRect(0, 0, S.ancho, S.alto);
    MODOS[modo].fijo(cctx, estado);
  }

  function pintar(dt) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, lienzo.width, lienzo.height);
    ctx.drawImage(capa, 0, 0);
    ctx.setTransform(S.escala, 0, 0, S.escala, 0, 0);
    S.t += dt;
    MODOS[modo].mover(ctx, estado, dt);
  }

  function bucle(t) {
    if (!animando) return;
    const dt = ultimo ? Math.min((t - ultimo) / 1000, .05) : 0;
    ultimo = t;
    pintar(dt);
    requestAnimationFrame(bucle);
  }
  function arrancar() {
    if (animando || sinMovimiento.matches || document.hidden) return;
    animando = true; ultimo = 0;
    requestAnimationFrame(bucle);
  }
  function parar() { animando = false; }

  let espera;
  window.addEventListener('resize', () => {
    clearTimeout(espera);
    espera = setTimeout(() => {
      // En el móvil, al hacer scroll la barra del navegador cambia la altura: no rehacer por eso
      if (Math.abs(window.innerWidth - S.ancho) < 2 && Math.abs(window.innerHeight - S.alto) < 140) return;
      preparar();
    }, 200);
  });
  document.addEventListener('visibilitychange', () => (document.hidden ? parar() : arrancar()));
  sinMovimiento.addEventListener('change', () => (sinMovimiento.matches ? parar() : arrancar()));

  // main.js lo llama al cambiar de tema; cambiar() sirve para comparar modos
  window.fondoPCB = {
    redibujar() { leerColores(); dibujarFijo(); pintar(0); },
    cambiar(m) { if (MODOS[m]) { modo = m; S.t = 4; preparar(); } },
    modos: Object.keys(MODOS),
    actual: () => modo
  };

  const pedido = new URLSearchParams(location.search).get('fondo');
  modo = MODOS[pedido] ? pedido : POR_DEFECTO;
  S.t = 4;                    // que la primera imagen ya tenga señales (también sin animación)
  preparar();
  if (document.fonts) document.fonts.ready.then(() => window.fondoPCB.redibujar());
  arrancar();
})();
