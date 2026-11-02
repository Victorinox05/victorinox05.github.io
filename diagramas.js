// Diagramas de los proyectos que no tienen fotos. Son SVG escritos a mano dentro de
// una función, para que usen los colores del tema (clases dg-*) y el idioma elegido.
// 'uid' hace únicos los id de las flechas: el mismo diagrama puede salir varias veces.

const DIAGRAMAS = {
  casa(es, uid = '') {
    const T = (a, b) => (es ? a : b);
    return `
<svg viewBox="0 0 720 430" role="img" aria-label="${T('Arquitectura de la casa inteligente', 'Smart home architecture')}">
  <defs>
    <marker id="fc${uid}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0L10 5L0 10z" class="dg-punta"/>
    </marker>
  </defs>

  <!-- Dispositivos -->
  <text x="20" y="62" class="dg-t2 dg-mono">${T('Dispositivos', 'Devices')}</text>
  <rect x="16" y="76" width="160" height="62" rx="12" class="dg-caja"/>
  <text x="32" y="102" class="dg-t">${T('Interruptor', 'Wall switch')}</text>
  <text x="32" y="122" class="dg-mono dg-t2">${T('sin neutro', 'no neutral')}</text>
  <rect x="16" y="152" width="160" height="62" rx="12" class="dg-caja"/>
  <text x="32" y="178" class="dg-t">${T('Sensor', 'Presence')}</text>
  <text x="32" y="198" class="dg-mono dg-t2">${T('de presencia', 'sensor')}</text>
  <rect x="16" y="228" width="160" height="62" rx="12" class="dg-caja dg-pendiente"/>
  <text x="32" y="254" class="dg-t2">${T('Próximas tandas', 'Next batches')}</text>
  <text x="32" y="274" class="dg-mono dg-t2">${T('garaje, salón…', 'garage, lounge…')}</text>

  <path d="M178 107 C205 107 205 160 226 160" class="dg-flecha"/>
  <path d="M178 183 H226" class="dg-flecha"/>
  <path d="M178 259 C205 259 205 206 226 206" class="dg-flecha dg-discontinua"/>

  <!-- Coordinador -->
  <rect x="226" y="142" width="104" height="82" rx="12" class="dg-caja dg-destacada"/>
  <text x="278" y="176" class="dg-t" text-anchor="middle">${T('Coordinador', 'Zigbee')}</text>
  <text x="278" y="196" class="dg-t" text-anchor="middle">${T('Zigbee', 'coordinator')}</text>
  <text x="278" y="246" class="dg-mono dg-acento" text-anchor="middle">Zigbee</text>
  <path d="M332 183 H372" class="dg-flecha" marker-end="url(#fc${uid})"/>

  <!-- Raspberry Pi -->
  <rect x="374" y="40" width="200" height="350" rx="16" class="dg-contenedor dg-rg"/>
  <text x="390" y="66" class="dg-t dg-titulo">Raspberry Pi 4</text>
  <rect x="390" y="82" width="168" height="68" rx="10" class="dg-caja"/>
  <text x="406" y="110" class="dg-t">Home Assistant OS</text>
  <text x="406" y="130" class="dg-mono dg-t2">${T('automatizaciones', 'automations')}</text>
  <rect x="390" y="162" width="168" height="52" rx="10" class="dg-caja"/>
  <text x="406" y="193" class="dg-t">Mosquitto · MQTT</text>
  <rect x="390" y="226" width="168" height="86" rx="10" class="dg-caja dg-destacada"/>
  <text x="406" y="252" class="dg-t">Casa App</text>
  <text x="406" y="272" class="dg-mono dg-t2">FastAPI + SQLite</text>
  <text x="406" y="292" class="dg-mono dg-t2">JWT · ${T('permisos/zona', 'per-zone ACL')}</text>
  <rect x="390" y="324" width="168" height="50" rx="10" class="dg-caja dg-interior"/>
  <text x="406" y="354" class="dg-mono dg-t2">${T('Copias diarias', 'Daily backups')}</text>
  <path d="M474 152 V160" class="dg-flecha"/>
  <path d="M474 216 V224" class="dg-flecha"/>

  <!-- Fuera de casa -->
  <path d="M594 30 V400" class="dg-vpn"/>
  <text x="604" y="404" class="dg-mono dg-acento">Tailscale (VPN)</text>

  <rect x="606" y="82" width="100" height="68" rx="12" class="dg-caja"/>
  <text x="656" y="110" class="dg-t" text-anchor="middle">Claude</text>
  <text x="656" y="130" class="dg-mono dg-t2" text-anchor="middle">MCP</text>
  <path d="M604 116 H560" class="dg-flecha" marker-end="url(#fc${uid})"/>

  <rect x="606" y="226" width="100" height="86" rx="12" class="dg-caja"/>
  <text x="656" y="256" class="dg-t" text-anchor="middle">${T('Móvil', 'Phone')}</text>
  <text x="656" y="276" class="dg-mono dg-t2" text-anchor="middle">PWA · HTTPS</text>
  <text x="656" y="296" class="dg-mono dg-t2" text-anchor="middle">React + TS</text>
  <path d="M604 269 H560" class="dg-flecha" marker-start="url(#fc${uid})" marker-end="url(#fc${uid})"/>
</svg>`;
  }
};
