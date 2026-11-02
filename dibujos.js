// Dibujos de la sección de skills (modo «Dibujos»). SVG hechos a mano, 64×64.
// Los colores salen del tema: l = contorno, la/la2 = trazo de acento, f1-f4 = rellenos (ver estilos.css).
window.DIBUJOS = {
  codigo: `<svg viewBox="0 0 64 64"><rect class="f3 l" x="6" y="10" width="52" height="42" rx="6"/><path class="l" d="M6 19h52"/>
    <circle class="rojo" cx="12" cy="14.5" r="1.8"/><circle class="ambar" cx="18" cy="14.5" r="1.8"/><circle class="verde" cx="24" cy="14.5" r="1.8"/>
    <path class="la" d="M24 28l-7 7 7 7M40 28l7 7-7 7"/><path class="la2" d="M35 26l-6 18"/></svg>`,

  micro: `<svg viewBox="0 0 64 64"><rect class="f2 l" x="8" y="14" width="48" height="38" rx="4"/><rect class="f3 l" x="26" y="8" width="12" height="8" rx="1.5"/>
    <path class="l" d="M19 27h3M19 31h3M19 35h3M19 39h3M42 27h3M42 31h3M42 35h3M42 39h3"/>
    <rect class="f1" x="22" y="24" width="20" height="18" rx="2"/><circle class="f3" cx="26" cy="28" r="1.4"/>
    <circle class="verde" cx="14" cy="20" r="2"/><path class="la2" d="M14 47h2M20 47h2M26 47h2M32 47h2M38 47h2M44 47h2M50 47h0"/></svg>`,

  fpga: `<svg viewBox="0 0 64 64"><path class="l" d="M19 12V6M26 12V6M33 12V6M40 12V6M47 12V6M19 52v6M26 52v6M33 52v6M40 52v6M47 52v6M12 19H6M12 26H6M12 33H6M12 40H6M12 47H6M52 19h6M52 26h6M52 33h6M52 40h6M52 47h6"/>
    <rect class="f2 l" x="12" y="12" width="40" height="40" rx="4"/>
    <rect class="f1" x="18" y="18" width="6" height="6" rx="1"/><rect class="f3" x="26" y="18" width="6" height="6" rx="1"/><rect class="f4" x="34" y="18" width="6" height="6" rx="1"/><rect class="f1" x="42" y="18" width="4" height="6" rx="1"/>
    <rect class="f3" x="18" y="26" width="6" height="6" rx="1"/><rect class="f1" x="26" y="26" width="6" height="6" rx="1"/><rect class="f1" x="34" y="26" width="6" height="6" rx="1"/><rect class="f3" x="42" y="26" width="4" height="6" rx="1"/>
    <rect class="f4" x="18" y="34" width="6" height="6" rx="1"/><rect class="f1" x="26" y="34" width="6" height="6" rx="1"/><rect class="f3" x="34" y="34" width="6" height="6" rx="1"/><rect class="f1" x="42" y="34" width="4" height="6" rx="1"/>
    <rect class="f1" x="18" y="42" width="6" height="4" rx="1"/><rect class="f3" x="26" y="42" width="6" height="4" rx="1"/><rect class="f1" x="34" y="42" width="6" height="4" rx="1"/><rect class="f4" x="42" y="42" width="4" height="4" rx="1"/></svg>`,

  plc: `<svg viewBox="0 0 64 64"><rect class="f3 l" x="10" y="8" width="44" height="48" rx="4"/><path class="l" d="M10 19h44M10 45h44"/>
    <circle class="l" cx="17" cy="13.5" r="2"/><circle class="l" cx="25" cy="13.5" r="2"/><circle class="l" cx="33" cy="13.5" r="2"/><circle class="l" cx="41" cy="13.5" r="2"/><circle class="l" cx="49" cy="13.5" r="2"/>
    <circle class="l" cx="17" cy="50.5" r="2"/><circle class="l" cx="25" cy="50.5" r="2"/><circle class="l" cx="33" cy="50.5" r="2"/><circle class="l" cx="41" cy="50.5" r="2"/><circle class="l" cx="49" cy="50.5" r="2"/>
    <rect class="f2 l" x="16" y="24" width="20" height="15" rx="2"/><path class="la" d="M19 35l4-5 4 3 6-6"/>
    <circle class="verde" cx="44" cy="26" r="2"/><circle class="verde" cx="44" cy="32" r="2"/><circle class="ambar" cx="44" cy="38" r="2"/></svg>`,

  simulacion: `<svg viewBox="0 0 64 64"><rect class="f3 l" x="8" y="10" width="48" height="44" rx="5"/><path class="l" d="M15 47h36M15 47V17"/>
    <path class="la2" d="M15 31h36" stroke-dasharray="3 3"/><path class="la" d="M15 47C20 47 21 22 27 23S33 33 37 31S45 30 51 31"/></svg>`,

  pcb: `<svg viewBox="0 0 64 64"><rect class="f2 l" x="8" y="8" width="48" height="48" rx="5"/>
    <path class="la2" d="M24 28h-6l-4-4v-7M24 36h-8l-4 4v6M40 30h6l4-4v-8M40 36h4l6 6v5M30 24v-7M34 40v7"/>
    <rect class="f1" x="24" y="24" width="16" height="16" rx="2"/><circle class="f3" cx="28" cy="28" r="1.4"/>
    <circle class="f3 la2" cx="14" cy="15" r="2.2"/><circle class="f3 la2" cx="12" cy="48" r="2.2"/><circle class="f3 la2" cx="50" cy="16" r="2.2"/><circle class="f3 la2" cx="50" cy="49" r="2.2"/><circle class="f3 la2" cx="30" cy="15" r="2.2"/><circle class="f3 la2" cx="34" cy="49" r="2.2"/></svg>`,

  cad: `<svg viewBox="0 0 64 64"><path class="f1" d="M32 10l20 11-20 11-20-11z"/><path class="f2" d="M12 21l20 11v22L12 43z"/><path class="f3" d="M52 21L32 32v22l20-11z"/>
    <path class="l" d="M32 10l20 11v22L32 54 12 43V21zM12 21l20 11 20-11M32 32v22"/><path class="la2" d="M6 24v20M4 24h4M4 44h4" /></svg>`,

  vision: `<svg viewBox="0 0 64 64"><path class="la2" d="M10 18v-6h6M48 12h6v6M54 46v6h-6M16 52h-6v-6"/>
    <path class="f3 l" d="M12 32c6-10 13-14 20-14s14 4 20 14c-6 10-13 14-20 14s-14-4-20-14z"/>
    <circle class="f1" cx="32" cy="32" r="8"/><circle class="f3" cx="35" cy="29" r="2.5"/></svg>`,

  nube: `<svg viewBox="0 0 64 64"><path class="f2 l" d="M20 36h25a8 8 0 0 0 1-16a12 12 0 0 0-23-3a10 10 0 0 0-3 19z"/>
    <path class="l" d="M20.5 36v6M32 36v6M43.5 36v6"/>
    <rect class="f1" x="16" y="42" width="9" height="9" rx="1.5"/><rect class="f4" x="27.5" y="42" width="9" height="9" rx="1.5"/><rect class="f1" x="39" y="42" width="9" height="9" rx="1.5"/></svg>`,

  ia: `<svg viewBox="0 0 64 64"><path class="f2 l" d="M12 12h40a6 6 0 0 1 6 6v18a6 6 0 0 1-6 6H27l-10 9v-9h-5a6 6 0 0 1-6-6V18a6 6 0 0 1 6-6z"/>
    <path class="f1" d="M29 17l2.6 7.4L39 27l-7.4 2.6L29 37l-2.6-7.4L19 27l7.4-2.6z"/>
    <path class="f4" d="M45 17l1.3 3.2 3.2 1.3-3.2 1.3L45 26l-1.3-3.2-3.2-1.3 3.2-1.3z"/></svg>`,

  terminal: `<svg viewBox="0 0 64 64"><rect class="f3 l" x="6" y="12" width="52" height="40" rx="6"/>
    <path class="la" d="M14 25l6 5-6 5"/><path class="la2" d="M24 35h10"/><path class="l" d="M14 44h22" opacity=".45"/>
    <circle class="f1" cx="46" cy="22" r="2.5"/><circle class="f1" cx="46" cy="38" r="2.5"/><circle class="f4" cx="52" cy="30" r="2.5"/><path class="l" d="M46 24.5v11M46 33c0-3 6-1 6-0.5"/></svg>`,

  idiomas: `<svg viewBox="0 0 64 64"><path class="f2 l" d="M8 10h28a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H20l-7 6v-6H8a4 4 0 0 1-4-4V14a4 4 0 0 1 4-4z"/>
    <text class="t1" x="22" y="25" text-anchor="middle">ES</text>
    <path class="f1" d="M28 28h28a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4h-5v6l-7-6H28a4 4 0 0 1-4-4V32a4 4 0 0 1 4-4z"/>
    <text class="t2" x="42" y="43" text-anchor="middle">EN</text></svg>`
};
