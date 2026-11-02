// Fondo animado con varios modos «de electrónica». Se elige con ?fondo=<modo>
// (pcb, osciloscopio, fpga, cronograma, puntos); sin parámetro, el de POR_DEFECTO.
// Lo que no se mueve se dibuja una vez en un lienzo aparte (capa); en cada fotograma
// solo se pinta encima lo que se mueve. Sin animación si el sistema pide menos movimiento.

(function () {
  const lienzo = document.getElementById('fondo');
  if (!lienzo) return;
  const ctx = lienzo.getContext('2d');
  const capa = document.createElement('canvas');
  const cctx = capa.getContext('2d');
  const sinMovimiento = matchMedia('(prefers-reduced-motion: reduce)');

  const POR_DEFECTO = 'cronograma';
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
    S.c = { linea: v('--pista'), pad: v('--pad'), fondo: v('--fondo'), p1: v('--pulso'), p2: v('--pulso-2') || v('--pulso') };
  }

  // ---------------------------------------------------------------- modos
  const MODOS = {};

  // 1 · Pistas de un circuito impreso con pulsos (el primero que tuvo la web)
  MODOS.pcb = (function () {
    const PASO = 26;
    const DIRS = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];
    function pista() {
      let x = entero(0, Math.ceil(S.ancho / PASO)) * PASO, y = entero(0, Math.ceil(S.alto / PASO)) * PASO;
      let d = entero(0, 3) * 2;
      const puntos = [[x, y]], acum = [0];
      for (let i = 0, n = entero(2, 5); i < n; i++) {
        const largo = entero(2, 9);
        x += DIRS[d][0] * PASO * largo; y += DIRS[d][1] * PASO * largo;
        puntos.push([x, y]);
        acum.push(acum[acum.length - 1] + Math.hypot(DIRS[d][0], DIRS[d][1]) * PASO * largo);
        d = (d + (Math.random() < .5 ? 1 : 7)) % 8;
      }
      return { puntos, acum, total: acum[acum.length - 1] };
    }
    function puntoEn(p, s) {
      let i = 1;
      while (i < p.acum.length - 1 && p.acum[i] < s) i++;
      const [x0, y0] = p.puntos[i - 1], [x1, y1] = p.puntos[i];
      const t = (s - p.acum[i - 1]) / ((p.acum[i] - p.acum[i - 1]) || 1);
      return [x0 + (x1 - x0) * t, y0 + (y1 - y0) * t];
    }
    return {
      preparar: () => ({ pistas: Array.from({ length: Math.round(S.ancho * S.alto / (S.movil ? 26000 : 19000)) }, pista), pulsos: [] }),
      fijo(c, e) {
        c.lineCap = c.lineJoin = 'round';
        c.strokeStyle = S.c.linea; c.lineWidth = 1.6;
        for (const p of e.pistas) {
          c.beginPath(); c.moveTo(...p.puntos[0]);
          for (const q of p.puntos.slice(1)) c.lineTo(...q);
          c.stroke();
        }
        for (const p of e.pistas) for (const [x, y] of [p.puntos[0], p.puntos[p.puntos.length - 1]]) {
          c.fillStyle = S.c.pad; c.beginPath(); c.arc(x, y, 4.2, 0, 7); c.fill();
          c.fillStyle = S.c.fondo; c.beginPath(); c.arc(x, y, 1.6, 0, 7); c.fill();
        }
      },
      mover(c, e, dt) {
        if (e.pulsos.length < (S.movil ? 5 : 10) && Math.random() < .05) e.pulsos.push({ p: e.pistas[entero(0, e.pistas.length - 1)], s: 0, v: azar(70, 150) });
        for (const pu of e.pulsos) {
          pu.s += pu.v * dt;
          const [x, y] = puntoEn(pu.p, Math.min(pu.s, pu.p.total));
          const [xa, ya] = puntoEn(pu.p, Math.max(0, pu.s - 36));
          c.strokeStyle = rgba(S.c.p1, .35); c.lineWidth = 2;
          c.beginPath(); c.moveTo(xa, ya); c.lineTo(x, y); c.stroke();
          const g = c.createRadialGradient(x, y, 0, x, y, 10);
          g.addColorStop(0, rgba(S.c.p1, .95)); g.addColorStop(1, rgba(S.c.p1, 0));
          c.fillStyle = g; c.beginPath(); c.arc(x, y, 10, 0, 7); c.fill();
        }
        e.pulsos = e.pulsos.filter(pu => pu.s < pu.p.total + 40);
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
    modos: Object.keys(MODOS)
  };

  const pedido = new URLSearchParams(location.search).get('fondo');
  modo = MODOS[pedido] ? pedido : POR_DEFECTO;
  S.t = 4;                    // que la primera imagen ya tenga señales (también sin animación)
  preparar();
  if (document.fonts) document.fonts.ready.then(() => window.fondoPCB.redibujar());
  arrancar();
})();
