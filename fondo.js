// Fondo animado: pistas de un circuito impreso (PCB) con pulsos que las recorren.
// Las pistas se dibujan una sola vez en un lienzo aparte; en cada fotograma solo se
// pintan los pulsos encima. Sin animación si el sistema pide menos movimiento.

(function () {
  const lienzo = document.getElementById('fondo');
  if (!lienzo) return;
  const ctx = lienzo.getContext('2d');
  const capa = document.createElement('canvas');   // pistas (estático)
  const cctx = capa.getContext('2d');
  const sinMovimiento = matchMedia('(prefers-reduced-motion: reduce)');

  const PASO = 26;                        // rejilla de la PCB, en px
  const DIRS = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];
  let ancho = 0, alto = 0, escala = 1;
  let pistas = [];
  let pulsos = [];
  let colores = {};
  let animando = false;
  let ultimo = 0;

  function leerColores() {
    const css = getComputedStyle(document.documentElement);
    colores = {
      pista: css.getPropertyValue('--pista').trim(),
      pad: css.getPropertyValue('--pad').trim(),
      pulso: css.getPropertyValue('--pulso').trim(),
      fondo: css.getPropertyValue('--fondo').trim()
    };
  }

  const azar = (a, b) => a + Math.random() * (b - a);
  const entero = (a, b) => Math.floor(azar(a, b + 1));

  // Una pista: tramos rectos o a 45°, como las de verdad
  function nuevaPista() {
    let x = entero(0, Math.ceil(ancho / PASO)) * PASO;
    let y = entero(0, Math.ceil(alto / PASO)) * PASO;
    let d = entero(0, 3) * 2;             // empieza en horizontal o vertical
    const puntos = [[x, y]];
    const tramos = entero(2, 5);
    for (let i = 0; i < tramos; i++) {
      const n = entero(2, 9);
      x += DIRS[d][0] * PASO * n;
      y += DIRS[d][1] * PASO * n;
      puntos.push([x, y]);
      d = (d + (Math.random() < .5 ? 1 : 7)) % 8;   // gira 45° a un lado u otro
    }
    // Longitud acumulada, para mover los pulsos a velocidad constante
    let total = 0;
    const acum = [0];
    for (let i = 1; i < puntos.length; i++) {
      total += Math.hypot(puntos[i][0] - puntos[i - 1][0], puntos[i][1] - puntos[i - 1][1]);
      acum.push(total);
    }
    return { puntos, acum, total };
  }

  function chip(c, x, y, w, h) {
    c.strokeRect(x, y, w, h);
    c.beginPath();
    for (let px = x + 8; px < x + w - 4; px += 10) {
      c.moveTo(px, y); c.lineTo(px, y - 7);
      c.moveTo(px, y + h); c.lineTo(px, y + h + 7);
    }
    c.stroke();
    c.beginPath(); c.arc(x + 9, y + 9, 3, 0, Math.PI * 2); c.stroke();
  }

  function dibujarPistas() {
    cctx.setTransform(escala, 0, 0, escala, 0, 0);
    cctx.clearRect(0, 0, ancho, alto);
    cctx.lineCap = 'round';
    cctx.lineJoin = 'round';
    cctx.strokeStyle = colores.pista;
    cctx.lineWidth = 1.6;
    for (const p of pistas) {
      cctx.beginPath();
      cctx.moveTo(p.puntos[0][0], p.puntos[0][1]);
      for (const [x, y] of p.puntos.slice(1)) cctx.lineTo(x, y);
      cctx.stroke();
    }
    // Pads en los extremos (anillo con agujero)
    for (const p of pistas) {
      for (const [x, y] of [p.puntos[0], p.puntos[p.puntos.length - 1]]) {
        cctx.beginPath();
        cctx.arc(x, y, 4.2, 0, Math.PI * 2);
        cctx.fillStyle = colores.pad;
        cctx.fill();
        cctx.beginPath();
        cctx.arc(x, y, 1.6, 0, Math.PI * 2);
        cctx.fillStyle = colores.fondo;
        cctx.fill();
      }
    }
    // Un par de chips de adorno
    cctx.strokeStyle = colores.pad;
    cctx.lineWidth = 1.4;
    const n = ancho > 900 ? 3 : 1;
    for (let i = 0; i < n; i++) {
      chip(cctx, Math.round(azar(.05, .85) * ancho / PASO) * PASO, Math.round(azar(.1, .8) * alto / PASO) * PASO, PASO * entero(3, 5), PASO * 2);
    }
  }

  function preparar() {
    ancho = window.innerWidth;
    alto = window.innerHeight;
    escala = Math.min(window.devicePixelRatio || 1, ancho < 760 ? 1.5 : 2);
    for (const c of [lienzo, capa]) {
      c.width = Math.round(ancho * escala);
      c.height = Math.round(alto * escala);
    }
    const cantidad = Math.round((ancho * alto) / (ancho < 760 ? 26000 : 19000));
    pistas = Array.from({ length: cantidad }, nuevaPista);
    pulsos = [];
    leerColores();
    dibujarPistas();
    pintar(0);
  }

  // Posición a una distancia s a lo largo de la pista
  function puntoEn(p, s) {
    let i = 1;
    while (i < p.acum.length - 1 && p.acum[i] < s) i++;
    const [x0, y0] = p.puntos[i - 1];
    const [x1, y1] = p.puntos[i];
    const t = (s - p.acum[i - 1]) / ((p.acum[i] - p.acum[i - 1]) || 1);
    return [x0 + (x1 - x0) * t, y0 + (y1 - y0) * t];
  }

  function pintar(dt) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, lienzo.width, lienzo.height);
    ctx.drawImage(capa, 0, 0);
    if (!dt && !pulsos.length) return;
    ctx.setTransform(escala, 0, 0, escala, 0, 0);

    const maxPulsos = ancho < 760 ? 5 : 10;
    if (pulsos.length < maxPulsos && Math.random() < .05) {
      const p = pistas[entero(0, pistas.length - 1)];
      if (p) pulsos.push({ p, s: 0, v: azar(70, 150) });
    }
    for (const pu of pulsos) {
      pu.s += pu.v * dt;
      const [x, y] = puntoEn(pu.p, Math.min(pu.s, pu.p.total));
      // Estela
      ctx.strokeStyle = `rgba(${colores.pulso}, .35)`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      const [xa, ya] = puntoEn(pu.p, Math.max(0, pu.s - 36));
      ctx.moveTo(xa, ya);
      ctx.lineTo(x, y);
      ctx.stroke();
      // Cabeza con brillo
      const g = ctx.createRadialGradient(x, y, 0, x, y, 10);
      g.addColorStop(0, `rgba(${colores.pulso}, .95)`);
      g.addColorStop(1, `rgba(${colores.pulso}, 0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, Math.PI * 2);
      ctx.fill();
    }
    pulsos = pulsos.filter(pu => pu.s < pu.p.total + 40);
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
    animando = true;
    ultimo = 0;
    requestAnimationFrame(bucle);
  }
  function parar() { animando = false; }

  let espera;
  window.addEventListener('resize', () => {
    clearTimeout(espera);
    espera = setTimeout(() => {
      // En el móvil, al hacer scroll la barra del navegador cambia la altura: no rehacer por eso
      if (Math.abs(window.innerWidth - ancho) < 2 && Math.abs(window.innerHeight - alto) < 140) return;
      preparar();
    }, 200);
  });
  document.addEventListener('visibilitychange', () => (document.hidden ? parar() : arrancar()));
  sinMovimiento.addEventListener('change', () => (sinMovimiento.matches ? (parar(), pulsos = [], pintar(0)) : arrancar()));

  // main.js lo llama al cambiar de tema
  window.fondoPCB = {
    redibujar() { leerColores(); dibujarPistas(); pintar(0); }
  };

  preparar();
  arrancar();
})();
