// Pinta la web a partir de datos.js y se encarga de la interacción:
// idioma, tema, filtros, ventana de cada proyecto, skills y formulario.

(function () {
  const D = DATOS;
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];
  const sinMovimiento = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- Idioma ----------
  function guardado(clave) { try { return localStorage.getItem(clave); } catch (e) { return null; } }
  function guardar(clave, valor) { try { localStorage.setItem(clave, valor); } catch (e) { /* modo privado */ } }

  function idiomaInicial() {
    const param = new URLSearchParams(location.search).get('lang');
    if (param === 'es' || param === 'en') return param;
    const elegido = guardado('idioma');
    if (elegido === 'es' || elegido === 'en') return elegido;
    return (navigator.language || 'es').toLowerCase().startsWith('es') ? 'es' : 'en';
  }
  let idioma = idiomaInicial();

  // t(): texto en el idioma actual (acepta {es, en} o un texto fijo). tx(): textos de la interfaz.
  const t = v => (v == null ? '' : typeof v === 'object' ? (v[idioma] ?? v.es) : String(v));
  const tx = clave => D.textos[idioma][clave] ?? clave;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // ---------- Iconos (trazo, 24x24) ----------
  const I = {
    gorro: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5"/>',
    nube: '<path d="M7 18a5 5 0 1 1 .9-9.9A6 6 0 0 1 19 10a4 4 0 0 1-1 8z"/>',
    engranaje: '<circle cx="12" cy="12" r="3.2"/><path d="M10.3 3h3.4l.5 2.4 2 1.1 2.3-.8 1.7 2.9-1.8 1.6v2.4l1.8 1.6-1.7 2.9-2.3-.8-2 1.1-.5 2.4h-3.4l-.5-2.4-2-1.1-2.3.8-1.7-2.9 1.8-1.6v-2.4L3.3 8.6 5 5.7l2.3.8 2-1.1z"/>',
    robot: '<rect x="4" y="8" width="16" height="12" rx="3"/><path d="M12 8V5M9 13h.01M15 13h.01M9.5 16.5h5"/><circle cx="12" cy="3.5" r="1.5"/>',
    chip: '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/><rect x="10" y="10" width="4" height="4" rx=".5"/>',
    onda: '<path d="M2 12h3l2.5-6 4 12 3-9 2 3H22"/>',
    codigo: '<path d="M8 6l-6 6 6 6M16 6l6 6-6 6M14 4l-4 16"/>',
    idiomas: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    correo: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    ubicacion: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    certificado: '<circle cx="12" cy="9" r="6"/><path d="M8.5 14L7 22l5-3 5 3-1.5-8"/>',
    flechaDer: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    flechaIzq: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    cerrar: '<path d="M6 6l12 12M18 6L6 18"/>',
    enlace: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
    externo: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    descarga: '<path d="M12 4v12M6 10l6 6 6-6M5 20h14"/>'
  };
  const RELLENO = {
    linkedin: '<path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.2c0-1.24-.02-2.84-1.73-2.84-1.73 0-2 1.35-2 2.75V21h-4z"/>',
    github: '<path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z"/>',
    play: '<path d="M8 5v14l11-7z"/>'
  };
  const icono = (nombre, clase = '') => `<svg viewBox="0 0 24 24" aria-hidden="true" class="${clase}">${I[nombre] || ''}</svg>`;
  const iconoRelleno = nombre => `<svg viewBox="0 0 24 24" aria-hidden="true" class="relleno">${RELLENO[nombre]}</svg>`;

  // ---------- Textos fijos ----------
  function pintarTextos() {
    document.documentElement.lang = idioma;
    $$('[data-t]').forEach(el => { el.textContent = tx(el.dataset.t); });
    $$('[data-t-title]').forEach(el => { el.title = tx(el.dataset.tTitle); });
    $$('[data-t-aria]').forEach(el => el.setAttribute('aria-label', tx(el.dataset.tAria)));
    $$('.bandera').forEach(b => b.classList.toggle('activa', b.dataset.idioma === idioma));
    $('#f-nombre').placeholder = tx('phNombre');
    $('#f-correo').placeholder = tx('phCorreo');
    $('#f-mensaje').placeholder = tx('phMensaje');
    document.title = idioma === 'es'
      ? 'Víctor Casanova · Electrónica, embebidos y robótica'
      : 'Víctor Casanova · Electronics, embedded systems and robotics';
  }

  // ---------- Portada ----------
  function pintarPortada() {
    const P = D.persona;
    $('#distintivo').textContent = t(P.distintivo);
    $('#nombre').textContent = P.nombre;
    $('#bio').innerHTML = t(P.bio);
    $('#foto').alt = P.nombre;
    $('#etiqueta-premio').textContent = tx('etiquetaPremio');
    $('#boton-linkedin').href = D.contacto.linkedin;
    const cv = t(D.cv);
    for (const b of [$('#boton-cv'), $('#cv-nav')]) {
      b.hidden = !cv;
      if (cv) b.href = cv;
    }

    const aniosCrea = Math.floor((Date.now() - new Date(2023, 1, 1)) / (365.25 * 864e5));
    const cifras = [
      [idioma === 'es' ? '4.º' : '4th', tx('statCurso')],
      [aniosCrea + '+', tx('statCrea')],
      [PROYECTOS.length, tx('statProyectos')],
      [idioma === 'es' ? '1.er' : '1st', tx('statPremio')]
    ];
    $('#cifras').innerHTML = cifras
      .map(([n, texto]) => `<li><span class="cifra">${n}</span><span class="cifra-texto">${texto}</span></li>`)
      .join('');
    escribir();
  }

  // Rótulo que se escribe y se borra solo
  let temporizador;
  function escribir() {
    clearTimeout(temporizador);
    const el = $('#escribiendo');
    const roles = t(D.persona.roles);
    let i = 0, letras = 0, borrando = false;
    if (sinMovimiento) {
      el.textContent = roles[0];
      temporizador = setInterval(() => { i = (i + 1) % roles.length; el.textContent = roles[i]; }, 3000);
      return;
    }
    (function paso() {
      const palabra = roles[i];
      letras += borrando ? -1 : 1;
      el.textContent = palabra.slice(0, letras);
      let espera = borrando ? 35 : 75;
      if (!borrando && letras === palabra.length) { borrando = true; espera = 1800; }
      else if (borrando && letras === 0) { borrando = false; i = (i + 1) % roles.length; espera = 350; }
      temporizador = setTimeout(paso, espera);
    })();
  }

  // ---------- Sobre mí ----------
  function pintarSobreMi() {
    $('#sobre-mi-texto').innerHTML = t(D.sobreMi).map(p => `<p class="revelar">${p}</p>`).join('');
    $('#ahora-lista').innerHTML = D.ahoraMismo
      .map(a => `<li><span class="ahora-icono">${icono(a.icono)}</span><span>${t(a)}</span></li>`)
      .join('');
    $('#actualizado').textContent = t(D.actualizado);
  }

  // ---------- Proyectos ----------
  const filtro = { categoria: 'todos', skill: null };

  function portadaHTML(p) {
    if (p.portada && p.portada.diagrama) {
      return `<div class="diagrama-portada">${DIAGRAMAS[p.portada.diagrama](idioma === 'es', '-tarjeta')}</div>`;
    }
    return `<img src="${p.portada}" alt="" loading="lazy" decoding="async">`;
  }

  // Los concursos (concurso: true) salen en «Premios, concursos y certificados», no en la rejilla
  const PROYECTOS = D.proyectos.filter(p => !p.concurso);
  const CONCURSOS = D.proyectos.filter(p => p.concurso);

  function etiquetaEstado(p) {
    return p.etiquetaEstado ? t(p.etiquetaEstado) : tx(p.estado === 'en-curso' ? 'enCurso' : 'terminado');
  }

  function pintarProyectos() {
    const cats = Object.keys(D.categorias);
    const cuenta = c => PROYECTOS.filter(p => p.categorias.includes(c)).length;
    $('#filtros').innerHTML =
      `<button class="filtro" type="button" data-cat="todos">${tx('todos')}<span class="filtro-cuenta">${PROYECTOS.length}</span></button>` +
      cats.map(c => `<button class="filtro" type="button" data-cat="${c}">${t(D.categorias[c])}<span class="filtro-cuenta">${cuenta(c)}</span></button>`).join('');

    $('#rejilla-proyectos').innerHTML = PROYECTOS.map(tarjetaProyecto).join('');
    aplicarFiltro();
  }

  function tarjetaProyecto(p) {
    return `
      <article class="proyecto revelar${p.destacado ? ' ancho' : ''}" data-id="${p.id}">
        <div class="proyecto-imagen${p.portada.diagrama ? ' con-diagrama' : ''}">
          ${portadaHTML(p)}
          <span class="estado ${p.estado}">${etiquetaEstado(p)}</span>
        </div>
        <div class="proyecto-cuerpo">
          <p class="proyecto-meta">${t(p.fechas)}</p>
          <h3><a class="proyecto-enlace" href="#proyecto/${p.id}">${t(p.titulo)}</a></h3>
          <p>${t(p.resumen)}</p>
          <ul class="etiquetas">${p.tecnologias.slice(0, 5).map(x => `<li class="etiqueta" data-tag="${esc(typeof x === 'object' ? x.es : x)}">${t(x)}</li>`).join('')}</ul>
          <span class="proyecto-pie" aria-hidden="true">${tx('verMas')} ${icono('flechaDer')}</span>
        </div>
      </article>`;
  }

  const tagsDe = p => p.tecnologias.map(x => (typeof x === 'object' ? x.es : x));

  function aplicarFiltro() {
    $$('.filtro').forEach(b => b.setAttribute('aria-pressed', String(!filtro.skill && b.dataset.cat === filtro.categoria)));
    $$('.proyecto', $('#rejilla-proyectos')).forEach(tarjeta => {
      const p = PROYECTOS.find(x => x.id === tarjeta.dataset.id);
      let visible = filtro.categoria === 'todos' || p.categorias.includes(filtro.categoria);
      if (filtro.skill) visible = filtro.skill.tags.some(tag => tagsDe(p).includes(tag));
      tarjeta.hidden = !visible;
      $$('.etiqueta', tarjeta).forEach(e => e.classList.toggle('coincide', !!filtro.skill && filtro.skill.tags.includes(e.dataset.tag)));
    });
    $('#rejilla-proyectos').classList.toggle('completa', filtro.categoria === 'todos' && !filtro.skill);
    const aviso = $('#filtro-skill');
    aviso.hidden = !filtro.skill;
    if (filtro.skill) {
      aviso.innerHTML = `<span>${tx('filtrandoPor')} <strong>${esc(t(filtro.skill.n))}</strong></span><button type="button" id="quitar-filtro">${tx('quitarFiltro')}</button>`;
      $('#quitar-filtro').addEventListener('click', () => { filtro.skill = null; aplicarFiltro(); });
    }
  }

  $('#filtros').addEventListener('click', e => {
    const b = e.target.closest('.filtro');
    if (!b) return;
    filtro.categoria = b.dataset.cat;
    filtro.skill = null;
    aplicarFiltro();
  });

  // ---------- Ventana de proyecto ----------
  const ventana = $('#ventana');
  let actual = null;      // proyecto abierto
  let indice = 0;         // foto o vídeo de la galería que se ve

  function htmlMedia(m) {
    if (m.tipo === 'video') {
      return `<video src="${m.src}" poster="${m.poster || ''}" controls muted loop playsinline preload="metadata" aria-label="${esc(t(m.pie))}"></video>`;
    }
    if (m.tipo === 'diagrama') {
      return `<div class="diagrama">${DIAGRAMAS[m.src](idioma === 'es', '-ventana')}</div>`;
    }
    return `<img src="${m.src}" alt="${esc(t(m.pie))}">`;
  }

  function htmlMiniatura(m, i) {
    let dentro;
    if (m.tipo === 'video') dentro = `<img src="${m.poster}" alt=""><span class="play">${iconoRelleno('play')}</span>`;
    else if (m.tipo === 'diagrama') dentro = `<span class="mini-diagrama">SVG</span>`;
    else dentro = `<img src="${m.src}" alt="" loading="lazy">`;
    return `<button class="miniatura" type="button" data-i="${i}" aria-label="${esc(t(m.pie))}">${dentro}</button>`;
  }

  function abrirProyecto(id) {
    const p = D.proyectos.find(x => x.id === id);
    if (!p) return;
    actual = p;
    indice = 0;
    const grupo = p.concurso ? CONCURSOS : PROYECTOS;          // anterior y siguiente, del mismo grupo
    const n = grupo.indexOf(p);
    const ant = grupo[(n - 1 + grupo.length) % grupo.length];
    const sig = grupo[(n + 1) % grupo.length];
    const varias = p.galeria.length > 1;

    $('#ventana-caja').innerHTML = `
      <div class="ventana-media">
        <div class="escenario" id="escenario"></div>
        <p class="pie-media" id="pie-media"></p>
        ${varias ? `<div class="miniaturas" id="miniaturas">${p.galeria.map(htmlMiniatura).join('')}</div>` : ''}
      </div>
      <div class="ventana-info">
        <button class="ventana-cerrar" type="button" id="ventana-cerrar" aria-label="${tx('cerrar')}">${icono('cerrar')}</button>
        <p class="proyecto-meta"><span>${t(p.fechas)}</span><span class="estado ${p.estado}">${etiquetaEstado(p)}</span></p>
        <h2 id="ventana-titulo">${t(p.titulo)}</h2>
        <p class="ventana-equipo">${t(p.equipo)}</p>
        <h3>${tx('contexto')}</h3>
        <p class="texto">${t(p.contexto)}</p>
        <h3>${tx('aportacion')}</h3>
        <p class="aportacion">${t(p.aportacion)}</p>
        <ul class="puntos">${p.puntos.map(x => `<li>${t(x)}</li>`).join('')}</ul>
        <h3>${tx('tecnologias')}</h3>
        <ul class="etiquetas">${p.tecnologias.map(x => `<li class="etiqueta">${t(x)}</li>`).join('')}</ul>
        <div class="ventana-enlaces">
          ${(p.enlaces || []).map(l => `<a class="boton boton-secundario" href="${l.url}" target="_blank" rel="noopener">${t(l.texto)} ${icono('externo')}</a>`).join('')}
          <button class="boton boton-secundario" type="button" id="copiar-enlace">${icono('enlace')} <span>${tx('copiarEnlace')}</span></button>
        </div>
        <nav class="ventana-nav" aria-label="${tx('navProyectos')}">
          <button type="button" data-ir="${ant.id}">${icono('flechaIzq')} ${t(ant.titulo).split(':')[0]}</button>
          <button type="button" data-ir="${sig.id}">${t(sig.titulo).split(':')[0]} ${icono('flechaDer')}</button>
        </nav>
      </div>`;

    mostrarMedia(0);
    if (!ventana.open) {
      ventana.showModal();
      document.body.style.overflow = 'hidden';
    }
    $('.ventana-info', ventana).scrollTop = 0;
    $('#ventana-cerrar').focus({ preventScroll: true });
  }

  function mostrarMedia(i) {
    const g = actual.galeria;
    indice = (i + g.length) % g.length;
    const m = g[indice];
    const escenario = $('#escenario');
    $$('video', escenario).forEach(v => v.pause());
    const flechas = g.length > 1
      ? `<button class="escenario-flecha izq" type="button" data-paso="-1" aria-label="${tx('anterior')}">${icono('flechaIzq')}</button>
         <button class="escenario-flecha der" type="button" data-paso="1" aria-label="${tx('siguiente')}">${icono('flechaDer')}</button>`
      : '';
    escenario.innerHTML = htmlMedia(m) + flechas;
    $('#pie-media').textContent = t(m.pie);
    $$('.miniatura', ventana).forEach(b => b.setAttribute('aria-current', String(Number(b.dataset.i) === indice)));
    const video = $('video', escenario);
    if (video && !sinMovimiento) video.play().catch(() => {});
  }

  function cerrarVentana() {
    if (ventana.open) ventana.close();
  }

  ventana.addEventListener('close', () => {
    $$('video', ventana).forEach(v => v.pause());
    document.body.style.overflow = '';
    const volver = actual && actual.concurso ? '#premios' : '#proyectos';
    actual = null;
    if (location.hash.startsWith('#proyecto/')) {
      history.replaceState(null, '', location.pathname + location.search + volver);
    }
  });

  ventana.addEventListener('click', e => {
    if (e.target === ventana) return cerrarVentana();      // clic fuera de la caja
    if (e.target.closest('#ventana-cerrar')) return cerrarVentana();
    const flecha = e.target.closest('[data-paso]');
    if (flecha) return mostrarMedia(indice + Number(flecha.dataset.paso));
    const mini = e.target.closest('.miniatura');
    if (mini) return mostrarMedia(Number(mini.dataset.i));
    const ir = e.target.closest('[data-ir]');
    if (ir) return (location.hash = 'proyecto/' + ir.dataset.ir);
    if (e.target.closest('#copiar-enlace')) copiarEnlace();
  });

  ventana.addEventListener('keydown', e => {
    if (!actual || e.target.matches('video')) return;
    if (e.key === 'ArrowRight') mostrarMedia(indice + 1);
    if (e.key === 'ArrowLeft') mostrarMedia(indice - 1);
  });

  function copiarEnlace() {
    const url = location.href.split('#')[0] + '#proyecto/' + actual.id;
    const hecho = () => {
      const span = $('#copiar-enlace span');
      span.textContent = tx('enlaceCopiado');
      setTimeout(() => { if (span.isConnected) span.textContent = tx('copiarEnlace'); }, 2000);
    };
    if (navigator.clipboard) navigator.clipboard.writeText(url).then(hecho, () => prompt('URL', url));
    else prompt('URL', url);
  }

  // Enlaces directos: #proyecto/tunabot abre ese proyecto
  function leerHash() {
    const m = location.hash.match(/^#proyecto\/([\w-]+)/);
    if (m) abrirProyecto(m[1]);
    else if (ventana.open) cerrarVentana();
  }
  window.addEventListener('hashchange', leerHash);

  // ---------- Premios ----------
  function pintarPremios() {
    const P = D.premio;
    $('#premio').innerHTML = `
      <article class="tarjeta premio revelar">
        <div class="premio-fotos">
          ${P.fotos.map(f => `<figure><img src="${f.src}" alt="${esc(t(f.pie))}" loading="lazy"><figcaption>${t(f.pie)}</figcaption></figure>`).join('')}
        </div>
        <div class="premio-texto">
          <p class="premio-medalla"><span aria-hidden="true">🥇</span> ${idioma === 'es' ? 'PRIMER PREMIO' : 'FIRST PRIZE'}</p>
          <h3>${t(P.titulo)}</h3>
          <p class="premio-entidad">${t(P.entidad)}</p>
          <p>${t(P.texto)}</p>
          ${P.enlace ? `<a class="boton boton-secundario" href="${P.enlace}" target="_blank" rel="noopener">${tx('verPost')} ${icono('externo')}</a>` : ''}
        </div>
      </article>`;
    $('#concursos').innerHTML = CONCURSOS.map(tarjetaProyecto).join('');
    $('#certificados').innerHTML = D.certificados.map(c => `
      <article class="tarjeta certificado revelar">
        <span class="certificado-icono">${icono('certificado')}</span>
        <div>
          <h3>${t(c.titulo)}</h3>
          <p>${t(c.entidad)} · ${t(c.fecha)}${c.url ? ` · <a href="${c.url}" target="_blank" rel="noopener">${tx('verificar')}</a>` : ''}</p>
        </div>
      </article>`).join('');
  }

  // ---------- Experiencia y formación ----------
  function logoEmpresa(x) {
    if (x.logo && x.logoMono) return `<span class="hito-logo mono" style="--logo: url('${x.logo}')" role="img" aria-label="${x.empresa}"></span>`;
    if (x.logo) return `<img class="hito-logo" src="${x.logo}" alt="${x.empresa}" width="48" height="48" loading="lazy">`;
    return `<span class="hito-logo siglas" aria-hidden="true">${x.siglas || x.empresa.slice(0, 2)}</span>`;
  }

  function pintarExperiencia() {
    $('#lista-experiencia').innerHTML = D.experiencia.map(x => `
      <li class="hito revelar ${x.actual ? 'actual' : ''}">
        <div class="tarjeta">
          <div class="hito-cabecera">
            <span class="hito-fechas">${t(x.fechas)}</span>
            ${x.actual ? `<span class="chip-actual">${tx('actual')}</span>` : ''}
          </div>
          <div class="hito-empresa">
            ${logoEmpresa(x)}
            <div>
              <h4>${t(x.puesto)}</h4>
              <p class="hito-sub"><b>${x.empresa}</b> · ${t(x.lugar)}</p>
            </div>
          </div>
          <p class="hito-contexto">${t(x.contexto)}</p>
          <ul class="puntos">${x.puntos.map(p => `<li>${t(p)}</li>`).join('')}</ul>
        </div>
      </li>`).join('');

    $('#lista-formacion').innerHTML = D.formacion.map(x => `
      <li class="hito revelar ${x.actual ? 'actual' : ''}">
        <div class="tarjeta">
          <div class="hito-cabecera">
            <span class="hito-fechas">${t(x.fechas)}</span>
            ${x.actual ? `<span class="chip-actual">${tx('actual')}</span>` : ''}
          </div>
          <h4>${t(x.titulo)}</h4>
          <p class="hito-sub"><b>${x.centro}</b></p>
          ${x.texto ? `<p class="hito-contexto">${t(x.texto)}</p>` : ''}
        </div>
      </li>`).join('');
  }

  // ---------- Skills ----------
  function proyectosConSkill(s) {
    return PROYECTOS.filter(p => s.tags.some(tag => tagsDe(p).includes(tag))).length;
  }

  // Dos formas de ver las skills: «dibujos» (una tarjeta con dibujo por familia) o «detalle»
  // (todas, y las que salen en algún proyecto se pueden pulsar para filtrar).
  let vistaSkills = guardado('vistaSkills') === 'detalle' ? 'detalle' : 'dibujos';

  function pintarSkills() {
    const dibujos = vistaSkills === 'dibujos';
    $('#sub-skills').textContent = tx(dibujos ? 'subSkillsDibujos' : 'subSkills');
    $('#vista-skills').innerHTML = ['dibujos', 'detalle'].map(v =>
      `<button type="button" data-vista="${v}" aria-pressed="${v === vistaSkills}">${tx(v === 'dibujos' ? 'vistaDibujos' : 'vistaDetalle')}</button>`).join('');
    $('#rejilla-skills').className = dibujos ? 'rejilla-dibujos' : 'rejilla-skills';
    if (dibujos) {
      $('#rejilla-skills').innerHTML = D.skillsDibujos.map(g => `
        <article class="tarjeta tarjeta-dibujo revelar">
          <div class="dibujo" aria-hidden="true">${window.DIBUJOS[g.dibujo] || ''}</div>
          <h3>${t(g.titulo)}</h3>
          <p>${t(g.texto)}</p>
        </article>`).join('');
      return;
    }
    $('#rejilla-skills').innerHTML = D.skills.map((g, gi) => `
      <article class="tarjeta grupo-skills revelar">
        <h3><span class="skill-icono">${icono(g.icono)}</span>${t(g.titulo)}</h3>
        <ul class="lista-skills">
          ${g.items.map((s, si) => {
            const n = proyectosConSkill(s);
            if (!n) return `<li><span class="skill">${t(s.n)}</span></li>`;
            const titulo = `${n} ${tx(n === 1 ? 'proyecto' : 'proyectos')}`;
            return `<li><button class="skill" type="button" data-g="${gi}" data-s="${si}" title="${titulo}">${t(s.n)}<span class="skill-cuenta">${n}</span></button></li>`;
          }).join('')}
        </ul>
      </article>`).join('');
  }

  $('#vista-skills').addEventListener('click', e => {
    const b = e.target.closest('button[data-vista]');
    if (!b || b.dataset.vista === vistaSkills) return;
    vistaSkills = b.dataset.vista;
    guardar('vistaSkills', vistaSkills);
    pintarSkills();
    prepararAparicion(true);
  });

  $('#rejilla-skills').addEventListener('click', e => {
    const b = e.target.closest('button.skill');
    if (!b) return;
    filtro.skill = D.skills[b.dataset.g].items[b.dataset.s];
    aplicarFiltro();
    $('#proyectos').scrollIntoView({ behavior: sinMovimiento ? 'auto' : 'smooth' });
  });

  // ---------- Contacto ----------
  const correo = () => (D.contacto.correoUsuario && D.contacto.correoDominio ? `${D.contacto.correoUsuario}@${D.contacto.correoDominio}` : '');

  function pintarContacto() {
    const C = D.contacto;
    const filas = [];
    filas.push(`<li><a href="${C.linkedin}" target="_blank" rel="noopener"><span class="contacto-icono">${iconoRelleno('linkedin')}</span><span><span class="contacto-etiqueta">LinkedIn</span><span class="contacto-valor">${C.linkedin.replace(/^https:\/\/(www\.)?/, '')}</span></span></a></li>`);
    if (correo()) filas.push(`<li><a href="mailto:${correo()}"><span class="contacto-icono">${icono('correo')}</span><span><span class="contacto-etiqueta">${tx('correo')}</span><span class="contacto-valor">${correo()}</span></span></a></li>`);
    if (C.github) filas.push(`<li><a href="${C.github}" target="_blank" rel="noopener"><span class="contacto-icono">${iconoRelleno('github')}</span><span><span class="contacto-etiqueta">GitHub</span><span class="contacto-valor">${C.github.replace('https://', '')}</span></span></a></li>`);
    if (t(D.cv)) filas.push(`<li><a href="${t(D.cv)}" download><span class="contacto-icono">${icono('descarga')}</span><span><span class="contacto-etiqueta">CV</span><span class="contacto-valor">${tx('descargarCV')} (PDF)</span></span></a></li>`);
    filas.push(`<li><div><span class="contacto-icono">${icono('ubicacion')}</span><span><span class="contacto-etiqueta">${tx('ubicacion')}</span><span class="contacto-valor">${t(C.ubicacion)}</span></span></div></li>`);
    $('#contacto-lista').innerHTML = filas.join('');
    $('#formulario-aviso').textContent = D.contacto.formspree ? '' : tx('avisoCorreo');
    $('#formulario-aviso').className = 'formulario-aviso';
  }

  $('#formulario').addEventListener('submit', async e => {
    e.preventDefault();
    const f = e.target;
    const aviso = $('#formulario-aviso');
    let bien = true;
    for (const campo of [f.nombre, f.correo, f.mensaje]) {
      const ok = campo.value.trim() && (campo.type !== 'email' || /^\S+@\S+\.\S+$/.test(campo.value));
      campo.parentElement.classList.toggle('error', !ok);
      if (!ok && bien) { campo.focus(); bien = false; }
    }
    if (!bien) return;
    const datos = { nombre: f.nombre.value.trim(), correo: f.correo.value.trim(), mensaje: f.mensaje.value.trim() };

    if (D.contacto.formspree) {
      try {
        const r = await fetch(D.contacto.formspree, {
          method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(datos)
        });
        if (!r.ok) throw new Error(r.status);
        f.reset();
        aviso.textContent = tx('enviado');
        aviso.className = 'formulario-aviso ok';
      } catch (err) {
        aviso.textContent = tx('errorEnvio');
        aviso.className = 'formulario-aviso mal';
      }
      return;
    }
    // Sin servicio de formularios: se abre el correo con el mensaje escrito
    const cuerpo = `${datos.mensaje}\n\n— ${datos.nombre} (${datos.correo})`;
    location.href = `mailto:${correo()}?subject=${encodeURIComponent(tx('asuntoCorreo'))}&body=${encodeURIComponent(cuerpo)}`;
  });

  // ---------- Cabecera, menú y sección activa ----------
  const cabecera = $('#cabecera');
  const alHacerScroll = () => cabecera.classList.toggle('con-fondo', window.scrollY > 8);
  window.addEventListener('scroll', alHacerScroll, { passive: true });
  alHacerScroll();

  const botonMenu = $('#boton-menu');
  const enlaces = $('#nav-enlaces');
  function menu(abrir) {
    enlaces.classList.toggle('abierto', abrir);
    botonMenu.setAttribute('aria-expanded', String(abrir));
  }
  botonMenu.addEventListener('click', () => menu(!enlaces.classList.contains('abierto')));
  enlaces.addEventListener('click', e => { if (e.target.closest('a')) menu(false); });
  document.addEventListener('click', e => { if (!e.target.closest('.nav')) menu(false); });

  const vigilaSecciones = new IntersectionObserver(entradas => {
    entradas.forEach(en => {
      if (!en.isIntersecting) return;
      $$('.nav-enlaces a').forEach(a => a.classList.toggle('activo', a.getAttribute('href') === '#' + en.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  $$('main section[id]').forEach(s => vigilaSecciones.observe(s));

  // ---------- Aparición al hacer scroll ----------
  const vigilaAparicion = new IntersectionObserver(entradas => {
    entradas.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('visible'); vigilaAparicion.unobserve(en.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px' });

  function prepararAparicion(todoVisible) {
    $$('.revelar:not(.visible)').forEach((el, i) => {
      if (todoVisible || sinMovimiento) el.classList.add('visible');
      else { el.style.transitionDelay = `${(i % 3) * 70}ms`; vigilaAparicion.observe(el); }
    });
  }

  // ---------- Tema e idioma ----------
  function ponerTema(tema) {
    document.documentElement.dataset.theme = tema;
    $('meta[name="theme-color"]').content = getComputedStyle(document.documentElement).getPropertyValue('--fondo').trim();
    if (window.fondoPCB) window.fondoPCB.redibujar();
  }
  $('#boton-tema').addEventListener('click', () => {
    const nuevo = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    guardar('tema', nuevo);
    ponerTema(nuevo);
  });

  $('#boton-idioma').addEventListener('click', () => {
    idioma = idioma === 'es' ? 'en' : 'es';
    guardar('idioma', idioma);
    const url = new URL(location.href);
    if (idioma === 'en') url.searchParams.set('lang', 'en'); else url.searchParams.delete('lang');
    history.replaceState(null, '', url);
    pintarTodo(true);
    if (actual) abrirProyecto(actual.id);
  });

  function pintarTodo(todoVisible) {
    pintarTextos();
    pintarPortada();
    pintarSobreMi();
    pintarProyectos();
    pintarPremios();
    pintarExperiencia();
    pintarSkills();
    pintarContacto();
    $('#anio').textContent = new Date().getFullYear();
    prepararAparicion(todoVisible);
  }

  ponerTema(document.documentElement.dataset.theme);
  pintarTodo(false);
  leerHash();

  console.log('%c¡Hola! 👋', 'font: 700 20px sans-serif; color: #5aa8ff');
  console.log('Si estás mirando el código: HTML, CSS y JavaScript sin frameworks, hecho con ayuda de Claude Code. Todo el contenido sale de datos.js.\nIf you are reading the source: plain HTML, CSS and JavaScript, built with help from Claude Code. All content comes from datos.js.');
})();
