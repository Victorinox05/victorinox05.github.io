// TODO el contenido de la web está aquí. Para cambiar un texto, una foto o añadir
// un proyecto no hace falta tocar el HTML. Cada texto va en español (es) y en inglés (en).
// Guía rápida en ../GUIA.md

const DATOS = {
  actualizado: { es: 'noviembre de 2026', en: 'November 2026' },

  persona: {
    nombre: 'Víctor Casanova',
    nombreCompleto: 'Víctor Humberto Casanova Bernal',
    foto: 'assets/retrato.webp',
    distintivo: { es: 'Madrid · 4.º de Ingeniería en la UPM', en: 'Madrid · 4th-year engineering student at UPM' },
    // Las áreas que salen del procesador de la portada
    chips: [
      { area: { es: 'Embebidos', en: 'Embedded' } },
      { area: { es: 'FPGA y VHDL', en: 'FPGA & VHDL' } },
      { area: { es: 'Robótica', en: 'Robotics' } },
      { area: { es: 'Automatización', en: 'Automation' } }
    ],
    bio: {
      es: 'Estudiante de último curso de <strong>Ingeniería Electrónica Industrial y Automática</strong> en la Universidad Politécnica de Madrid. Me considero un perfil práctico de hardware y software al que le encanta ver cómo una idea acaba siendo algo que se puede tocar, programar y testear.',
      en: 'Final-year student of <strong>Industrial Electronics and Automation Engineering</strong> at the Technical University of Madrid (UPM). I see myself as a hands-on hardware and software person who loves watching an idea turn into something you can touch, program and test.'
    }
  },

  contacto: {
    linkedin: 'https://www.linkedin.com/in/victor-casanova-bernal',
    // El correo va partido para que no lo lean los robots de spam; lo junta main.js.
    // Para quitarlo de la web, deja los dos campos vacíos: ''
    correoUsuario: 'victorhcb10',
    correoDominio: 'gmail.com',
    // Vacío = no sale. Pon 'https://github.com/Victorinox05' cuando el perfil esté arreglado
    github: '',
    // Si creas un formulario en formspree.io, pega aquí su URL y el formulario enviará
    // los mensajes directamente. Vacío = el formulario abre el programa de correo.
    formspree: '',
    ubicacion: { es: 'Madrid, España', en: 'Madrid, Spain' }
  },

  // PDF del CV. Vacío = el botón «Descargar CV» no sale (así desde el 07/11/2026).
  // Para volver a ponerlo: Cerebro/CV/generar_cv.py --web y 'cv/CV_Victor_Casanova_ES.pdf' aquí
  cv: { es: '', en: '' },

  sobreMi: {
    es: [
      'Aunque disfruto de la parte teórica, siempre he sido de aprender haciendo: montar, programar y probar sistemas reales, y pelearme con ellos hasta que funcionan bien.',
      'Empecé en el club de robótica CREA-ETSIDI, donde ahora doy el curso de Arduino, y desde entonces he pasado por la electrónica de una moto de competición, PLC industriales, FPGA y un enjambre de robots con el CSIC. Ahora completo esa base con IA, cloud e infraestructura como código en mis prácticas en NTT DATA. Uso a diario herramientas de IA, sobre todo Claude Code, para programar, documentar y aprender más rápido, revisando siempre lo que generan.'
    ],
    en: [
      'Although I enjoy theory, I have always learned best by doing: building, programming and testing real systems, and working on them until they run properly.',
      'I started at the CREA-ETSIDI robotics club, where I now teach the Arduino course. Since then I have worked on the electronics of a racing motorcycle, industrial PLCs, FPGAs and a robot swarm with CSIC. During my internship at NTT DATA I am adding AI, cloud and infrastructure as code to that background. I use AI tools every day, Claude Code above all, to code, document and learn faster, always reviewing what they produce.'
    ]
  },

  ahoraMismo: [
    { icono: 'gorro', es: 'Último curso del grado: FPGA y VHDL, microcontroladores STM32 y control digital.', en: 'Final year of my degree: FPGAs and VHDL, STM32 microcontrollers and digital control.' },
    { icono: 'nube', es: 'Prácticas en NTT DATA como Digital Architect: desarrollo con IA (Claude Code), Git, Azure, Terraform y contenedores.', en: 'Internship at NTT DATA as a Digital Architect: AI-assisted development (Claude Code), Git, Azure, Terraform and containers.' },
    { icono: 'engranaje', es: 'Empezando el TFG: control de una planta simulada con un PLC Siemens.', en: 'Starting my bachelor’s thesis: controlling a simulated plant with a Siemens PLC.' },
    { icono: 'robot', es: 'TunaBot (CSIC) en la recta final y EUROBOT 2027 con el club CREA.', en: 'TunaBot (CSIC) in its final stretch, and EUROBOT 2027 with the CREA club.' },
    { icono: 'chip', es: 'En casa, la versión 2 del brazo robótico sobre una Raspberry Pi.', en: 'At home, version 2 of my robotic arm on a Raspberry Pi.' }
  ],

  // Los proyectos salen en este orden. 'portada' es la foto de la tarjeta.
  // Textos cortos: resumen de una línea (sale en la tarjeta), contexto en 1-2 frases
  // y 3 puntos de una línea con solo lo que hice yo. Con quién, en 'equipo'.
  // Galería: { tipo: 'img' | 'video' | 'diagrama', src, poster (vídeos), pie: {es, en} }
  proyectos: [
    {
      id: 'tunabot',
      destacado: true,   // tarjeta ancha (ocupa dos columnas)
      titulo: { es: 'TunaBot: enjambre de robots coordinados (CSIC)', en: 'TunaBot: a coordinated robot swarm (CSIC)' },
      resumen: { es: 'Firmware de movimiento en ESP32 para un enjambre de robots.', en: 'ESP32 motion firmware for a swarm of robots.' },
      fechas: { es: 'Abr 2026 – actualidad', en: 'Apr 2026 – present' },
      estado: 'en-curso',
      equipo: { es: 'CREA-ETSIDI · departamento de movimiento', en: 'CREA-ETSIDI · motion team' },
      portada: 'assets/proyectos/tunabot/base.webp',
      contexto: {
        es: 'Enjambre de pequeños robots del club CREA-ETSIDI y el CSIC que se coordinan para huir de un robot «cazador», como un banco de peces.',
        en: 'A swarm of small robots, built by the CREA-ETSIDI club with CSIC (the Spanish National Research Council), that coordinate to escape from a “hunter” robot, like a school of fish.'
      },
      puntos: [
        { es: 'Comparativa de sistemas de locomoción y elección de ruedas omnidireccionales.', en: 'Comparison of drive systems and the choice of omni wheels.' },
        { es: 'Firmware en ESP32 (C++, PlatformIO): el robot se mueve con un vector de dirección y módulo.', en: 'ESP32 firmware (C++, PlatformIO): the robot is driven by a direction-and-magnitude vector.' },
        { es: 'Distribución de la placa (ESP32, drivers ULN2003, motores paso a paso) y depuración de un cortocircuito.', en: 'Board layout (ESP32, ULN2003 drivers, stepper motors) and debugging of a short circuit.' }
      ],
      tecnologias: ['ESP32', 'C++', 'PlatformIO', { es: 'Motores paso a paso', en: 'Stepper motors' }, { es: 'Diseño de circuitos', en: 'Circuit design' }],
      galeria: [
        { tipo: 'img', src: 'assets/proyectos/tunabot/base.webp', pie: { es: 'Base del robot con ruedas omnidireccionales y sus drivers', en: 'Robot base with omni wheels and its drivers' } },
        { tipo: 'video', src: 'assets/proyectos/tunabot/prueba-motores.mp4', poster: 'assets/proyectos/tunabot/prueba-motores.webp', pie: { es: 'Prueba de los motores con el ESP32', en: 'Motor test driven by the ESP32' } }
      ]
    },
    {
      id: 'brazo',
      titulo: { es: 'Brazo robótico con visión artificial', en: 'Robotic arm with computer vision' },
      resumen: { es: 'Brazo de 3 grados de libertad que localiza objetos con visión artificial.', en: 'A 3-DOF arm that locates objects with computer vision.' },
      fechas: { es: 'Feb – may 2025 · v2 desde jul 2026', en: 'Feb – May 2025 · v2 since Jul 2026' },
      estado: 'en-curso',
      etiquetaEstado: { es: 'v2 en curso', en: 'v2 in progress' },
      equipo: { es: 'Hardware y software', en: 'Hardware and software' },
      portada: 'assets/proyectos/brazo/portada.webp',
      contexto: {
        es: 'Detecta objetos con una cámara y calcula cómo llegar a ellos. La v1 (2025) hace la visión en un PC y mueve los motores con un Arduino; la v2 (2026) está rehecha desde cero en una Raspberry Pi.',
        en: 'It detects objects with a camera and works out how to reach them. v1 (2025) runs the vision on a PC and drives the motors with an Arduino; v2 (2026) is rebuilt from scratch on a Raspberry Pi.'
      },
      puntos: [
        { es: 'Visión en tiempo real con Python y OpenCV: detección por color y coordenadas del objetivo.', en: 'Real-time vision with Python and OpenCV: colour detection and target coordinates.' },
        { es: 'Mecánica en Fusion 360 e impresión 3D; servos y motores paso a paso desde Arduino.', en: 'Mechanics in Fusion 360 and 3D printing; servos and stepper motors driven by an Arduino.' },
        { es: 'v2 en una Raspberry Pi 4: PWM por hardware (PCA9685, I2C) y vídeo por streaming web.', en: 'v2 on a Raspberry Pi 4: hardware PWM (PCA9685, I2C) and video streamed to a web page.' }
      ],
      tecnologias: ['Python', 'OpenCV', 'C++', 'Arduino', 'Fusion 360', 'MATLAB', 'Raspberry Pi', 'I2C', { es: 'Impresión 3D', en: '3D printing' }],
      galeria: [
        { tipo: 'video', src: 'assets/proyectos/brazo/movimiento.mp4', poster: 'assets/proyectos/brazo/movimiento.webp', pie: { es: 'Prueba de movimiento de la v1', en: 'Motion test of v1' } },
        { tipo: 'video', src: 'assets/proyectos/brazo/vision.mp4', poster: 'assets/proyectos/brazo/vision.webp', pie: { es: 'Detección por color en el portátil mientras el brazo se mueve', en: 'Colour detection on the laptop while the arm moves' } },
        { tipo: 'img', src: 'assets/proyectos/brazo/cad.webp', pie: { es: 'Diseño completo en Fusion 360', en: 'Full design in Fusion 360' } },
        { tipo: 'video', src: 'assets/proyectos/brazo/fusion.mp4', poster: 'assets/proyectos/brazo/fusion.webp', pie: { es: 'El modelo en Fusion 360', en: 'The model in Fusion 360' } }
      ]
    },
    {
      id: 'skate',
      destacado: true,
      titulo: { es: 'Línea de fabricación de skateboards', en: 'Skateboard manufacturing line' },
      resumen: { es: 'PLC Siemens S7-1500 de una célula de inyección, simulada en FlexSim.', en: 'Siemens S7-1500 PLC for an injection moulding cell, simulated in FlexSim.' },
      fechas: { es: 'Feb – may 2026', en: 'Feb – May 2026' },
      estado: 'terminado',
      equipo: { es: 'Automatización Industrial (3.º) · en grupo', en: 'Industrial Automation course (3rd year) · team project' },
      portada: { diagrama: 'skate' },   // esquema del programa en TIA Portal (diagramas.js)
      contexto: {
        es: 'Trabajo de Automatización Industrial: una línea que fabrica cinco modelos de skateboard, diseñada y simulada en FlexSim.',
        en: 'Industrial Automation coursework: a line that builds five skateboard models, designed and simulated in FlexSim.'
      },
      puntos: [
        { es: '<b>PLC de la célula de inyección:</b> GRAFCET de nivel 2 y bloques multiinstancia (FB/FC) en TIA Portal.', en: '<b>PLC of the injection cell:</b> level-2 GRAFCET and multi-instance blocks (FB/FC) in TIA Portal.' },
        { es: 'Señales analógicas escaladas: temperatura por termopar y clasificación de piezas por peso.', en: 'Scaled analogue signals: thermocouple temperature and part sorting by weight.' },
        { es: 'Modos de marcha, paradas de emergencia, moldes por RFID y pruebas unitarias.', en: 'Operating modes, emergency stops, RFID mould identification and unit tests.' }
      ],
      tecnologias: ['PLC S7-1500', 'TIA Portal', 'GRAFCET', 'FlexSim', 'RFID'],
      galeria: [
        { tipo: 'diagrama', src: 'skate', pie: { es: 'Estructura del programa del PLC en TIA Portal', en: 'Structure of the PLC program in TIA Portal' } },
        { tipo: 'img', src: 'assets/proyectos/skate/flexsim.webp', pie: { es: 'Modelo de la planta en FlexSim', en: 'Plant model in FlexSim' } },
        { tipo: 'img', src: 'assets/proyectos/skate/estados.webp', pie: { es: 'Ocupación de las máquinas en la simulación', en: 'Machine utilisation in the simulation' } },
        { tipo: 'img', src: 'assets/proyectos/skate/codigo.webp', pie: { es: 'Gestión de la emergencia en el PLC (TIA Portal)', en: 'Emergency handling in the PLC (TIA Portal)' } },
        { tipo: 'img', src: 'assets/proyectos/skate/codigo-escalado.webp', pie: { es: 'Escalado de la temperatura del termopar (SCALE) en TIA Portal', en: 'Thermocouple temperature scaling (SCALE) in TIA Portal' } },
        { tipo: 'img', src: 'assets/proyectos/skate/layout.webp', pie: { es: 'Plano de la planta', en: 'Plant layout drawing' } },
        { tipo: 'img', src: 'assets/proyectos/skate/celda.webp', pie: { es: 'Distribución de la célula de inyección', en: 'Injection cell layout' } },
        { tipo: 'img', src: 'assets/proyectos/skate/grafcet.webp', pie: { es: 'GRAFCET general de la célula de inyección', en: 'Overall GRAFCET of the injection cell' } },
        { tipo: 'img', src: 'assets/proyectos/skate/grafcet-robot.webp', pie: { es: 'GRAFCET del robot de la célula', en: 'GRAFCET of the cell robot' } }
      ]
    },
    {
      id: 'microrred',
      titulo: { es: 'Nodo LoRa para una estación de telecomunicaciones aislada', en: 'LoRa node for an off-grid telecom station' },
      resumen: { es: 'Raspberry Pi que vigila una estación aislada y lo envía por LoRaWAN.', en: 'A Raspberry Pi that monitors an off-grid station and reports over LoRaWAN.' },
      fechas: { es: 'Primavera de 2026', en: 'Spring 2026' },
      estado: 'terminado',
      equipo: { es: 'Asignatura Introduction to Hybrid Energy Systems (UPM) · en pareja', en: 'Introduction to Hybrid Energy Systems course (UPM) · team of 2' },
      portada: 'assets/proyectos/microrred/nodo-lora.webp',
      contexto: {
        es: 'Vigila a distancia una estación de telecomunicaciones sin red eléctrica, alimentada por una microrred híbrida.',
        en: 'It remotely monitors a telecom station with no grid connection, powered by a hybrid microgrid.'
      },
      puntos: [
        { es: 'Raspberry Pi 400 con un módulo LoRa (SPI) y un sensor de temperatura y humedad (I2C).', en: 'A Raspberry Pi 400 with a LoRa module (SPI) and a temperature and humidity sensor (I2C).' },
        { es: 'Enlace LoRaWAN real (868 MHz) hasta The Things Network, con un decodificador en JavaScript.', en: 'A real LoRaWAN link (868 MHz) to The Things Network, with a JavaScript payload formatter.' },
        { es: 'Alarmas de temperatura y de catástrofe en la misma trama de 5 bytes.', en: 'Temperature and disaster alerts in the same 5-byte frame.' }
      ],
      tecnologias: ['Raspberry Pi', 'Python', 'LoRa / LoRaWAN', 'The Things Network', 'I2C', 'SPI', 'JavaScript'],
      galeria: [
        { tipo: 'img', src: 'assets/proyectos/microrred/nodo-lora.webp', pie: { es: 'El nodo: Raspberry Pi 400 con el módulo LoRa y los sensores en la protoboard', en: 'The node: Raspberry Pi 400 with the LoRa module and sensors on the breadboard' } },
        { tipo: 'video', src: 'assets/proyectos/microrred/ttn-consola.mp4', poster: 'assets/proyectos/microrred/ttn-consola.webp', pie: { es: 'Los datos llegando a The Things Network: la consola recibe y decodifica la temperatura y la humedad', en: 'Data reaching The Things Network: the console receives and decodes temperature and humidity' } }
      ]
    },
    {
      id: 'chess',
      titulo: { es: 'Chess Quest: ajedrez en C++', en: 'Chess Quest: a chess game in C++' },
      resumen: { es: 'Ajedrez en C++ con POO y OpenGL, dos variantes y rival por IA.', en: 'Chess in C++ with OOP and OpenGL, two variants and an AI opponent.' },
      fechas: { es: 'Feb – may 2025', en: 'Feb – May 2025' },
      estado: 'terminado',
      equipo: { es: 'Informática Industrial (3.º) · equipo de 5', en: 'Industrial Computing course (3rd year) · team of 5' },
      portada: 'assets/proyectos/chess/portada.webp',
      contexto: {
        es: 'Trabajo final de Informática Industrial: ajedrez con interfaz gráfica, dos variantes en tableros pequeños y una IA con cinco estrategias.',
        en: 'Final project for Industrial Computing: chess with a graphical interface, two small-board variants and an AI with five strategies.'
      },
      puntos: [
        { es: 'Lógica del tablero: piezas sobre la matriz y movimiento con el ratón.', en: 'Board logic: pieces on the board matrix, moved with the mouse.' },
        { es: 'Jugadas posibles resaltadas y un validador que impide dejar al rey en jaque.', en: 'Highlighted legal moves and a validator that blocks moves leaving the king in check.' },
        { es: 'Git y GitHub en equipo: ramas, resolución de conflictos y más de 200 commits.', en: 'Git and GitHub as a team: branches, conflict resolution and over 200 commits.' }
      ],
      tecnologias: ['C++', { es: 'POO', en: 'OOP' }, 'OpenGL', 'Git'],
      galeria: [
        { tipo: 'video', src: 'assets/proyectos/chess/partida.mp4', poster: 'assets/proyectos/chess/partida.webp', pie: { es: 'Partidas en los escenarios del juego', en: 'Games on the different boards' } },
        { tipo: 'img', src: 'assets/proyectos/chess/portada.webp', pie: { es: 'Movimientos posibles resaltados en verde', en: 'Legal moves highlighted in green' } },
        { tipo: 'video', src: 'assets/proyectos/chess/menu.mp4', poster: 'assets/proyectos/chess/tablero.webp', pie: { es: 'Menú: modo de juego, escenario y variante', en: 'Menu: game mode, board and variant' } },
        { tipo: 'img', src: 'assets/proyectos/chess/victoria.webp', pie: { es: 'Pantalla de victoria', en: 'Victory screen' } }
      ]
    },
    {
      id: 'casa',
      destacado: true,
      titulo: { es: 'Casa inteligente con app propia', en: 'Smart home with a custom app' },
      resumen: { es: 'Home Assistant, dispositivos Zigbee y una app web propia con permisos.', en: 'Home Assistant, Zigbee devices and a custom web app with permissions.' },
      fechas: { es: 'Sep 2026 – actualidad', en: 'Sep 2026 – present' },
      estado: 'en-curso',
      equipo: { es: 'Proyecto personal', en: 'Personal project' },
      portada: 'assets/proyectos/casa/app.webp',
      contexto: {
        es: 'Domótica montada por tandas: Home Assistant en una Raspberry Pi 4, dispositivos Zigbee y acceso remoto por VPN, sin abrir puertos.',
        en: 'Home automation built in stages: Home Assistant on a Raspberry Pi 4, Zigbee devices and remote access over a VPN, with no open ports.'
      },
      puntos: [
        { es: 'Coordinador Zigbee, interruptor sin neutro, sensor de presencia y copias de seguridad diarias.', en: 'A Zigbee coordinator, a no-neutral wall switch, a presence sensor and daily backups.' },
        { es: 'App web instalable (PWA) hecha con Claude Code: FastAPI + React, login y permisos por zona.', en: 'An installable web app (PWA) built with Claude Code: FastAPI + React, login and per-zone permissions.' },
        { es: 'Claude conectado a Home Assistant por MCP para consultar la casa y sus sensores.', en: 'Claude connected to Home Assistant over MCP to query the house and its sensors.' }
      ],
      tecnologias: ['Raspberry Pi', 'Home Assistant', 'Zigbee', 'MQTT', 'Python', 'FastAPI', 'React', 'TypeScript', 'Claude Code', 'Claude / MCP'],
      galeria: [
        { tipo: 'video', src: 'assets/proyectos/casa/recorrido.mp4', poster: 'assets/proyectos/casa/recorrido.webp', pie: { es: 'Recorrido por la app en modo demostración (piso y datos inventados)', en: 'A tour of the app in demo mode (made-up flat and data)' } },
        { tipo: 'img', src: 'assets/proyectos/casa/app.webp', pie: { es: 'Inicio, plano 2D, maqueta 3D e historial (modo demostración)', en: 'Home, 2D floor plan, 3D model and history (demo mode)' } },
        { tipo: 'diagrama', src: 'casa', pie: { es: 'Arquitectura del sistema', en: 'System architecture' } }
      ]
    },
    {
      id: 'zerospoil',
      concurso: true,   // sale en «Premios, concursos y certificados», no en Proyectos
      etiquetaEstado: { es: 'Concurso', en: 'Competition' },
      titulo: { es: 'ZeroSpoil: nevera inteligente contra el desperdicio', en: 'ZeroSpoil: a smart fridge against food waste' },
      resumen: { es: 'Kit con cámara que hace inteligente cualquier nevera, hecho en 48 horas.', en: 'A camera kit that makes any fridge smart, built in 48 hours.' },
      fechas: { es: 'Feb – mar 2026 · 48 h', en: 'Feb – Mar 2026 · 48 h' },
      estado: 'terminado',
      equipo: { es: 'Invent For The Planet 2026 · Texas A&M University y UPM · equipo de 5', en: 'Invent For The Planet 2026 · Texas A&M University and UPM · team of 5' },
      portada: 'assets/proyectos/zerospoil/ilustracion.svg',
      contexto: {
        es: 'Competición internacional de 48 horas de Texas A&M University, en la sede de la UPM. Nuestra idea: una caja con cámara que reconoce la comida de la nevera y avisa antes de que se estropee.',
        en: 'A 48-hour international competition run by Texas A&M University, at the UPM site. Our idea: a box with a camera that recognises the food in the fridge and warns you before it goes off.'
      },
      puntos: [
        { es: 'Demo de visión artificial con OpenCV, basada en la detección de colores.', en: 'A computer vision demo with OpenCV, based on colour detection.' },
        { es: 'Pitch ante el jurado y edición del vídeo oficial del equipo.', en: 'The pitch to the judges and the editing of the team’s official video.' },
        { es: 'Hardware propuesto: Raspberry Pi Zero 2 W con la IA en local y cámara IMX708; el prototipo, en maqueta.', en: 'Proposed hardware: a Raspberry Pi Zero 2 W running the AI locally and an IMX708 camera; the prototype was a mock-up.' }
      ],
      tecnologias: ['OpenCV', { es: 'Visión artificial', en: 'Computer vision' }, 'Pitch', { es: 'Edición de vídeo', en: 'Video editing' }],
      galeria: [
        { tipo: 'img', src: 'assets/proyectos/zerospoil/ilustracion.svg', pie: { es: 'Ilustración del concepto (no hay fotos del prototipo)', en: 'Illustration of the concept (there are no photos of the prototype)' } },
        { tipo: 'img', src: 'assets/proyectos/zerospoil/trabajando.webp', pie: { es: 'El equipo, en plenas 48 horas', en: 'The team, in the middle of the 48 hours' } },
        { tipo: 'img', src: 'assets/proyectos/zerospoil/smart-shelf.webp', pie: { es: 'Nuestro pitch: qué es la Smart-Shelf Box (escanear, guardar, reconocer y gestionar)', en: 'Our pitch: what the Smart-Shelf Box is (scan, store, match and manage)' } },
        { tipo: 'img', src: 'assets/proyectos/zerospoil/componentes.webp', pie: { es: 'Componentes: Raspberry Pi Zero 2 W, cámara IMX708, batería LiPo, antena y caja', en: 'Components: Raspberry Pi Zero 2 W, IMX708 camera, LiPo battery, antenna and enclosure' } },
        { tipo: 'img', src: 'assets/proyectos/zerospoil/camara.webp', pie: { es: 'La cámara: reconocimiento por grupos, memoria visual y detección de frescura', en: 'The camera: recognition by clusters, visual memory and freshness detection' } }
      ]
    },
    {
      id: 'navia',
      concurso: true,   // sale en «Premios, concursos y certificados», no en Proyectos
      etiquetaEstado: { es: 'Concurso', en: 'Competition' },
      titulo: { es: 'EMT NAVIA: asistente de navegación con IA (IBM y EMT Madrid)', en: 'EMT NAVIA: an AI navigation assistant (IBM & EMT Madrid)' },
      resumen: { es: 'Asistente con IA en el móvil para que una persona con discapacidad visual suba sola al autobús.', en: 'An AI assistant on the phone that helps visually impaired people board the bus alone.' },
      fechas: { es: 'Primavera de 2026', en: 'Spring 2026' },
      estado: 'terminado',
      equipo: { es: 'Programa OA6 · IBM Consulting, EMT Madrid y UPM · equipo de 5', en: 'OA6 programme · IBM Consulting, EMT Madrid and UPM · team of 5' },
      portada: 'assets/proyectos/oa6/equipo.webp',
      contexto: {
        es: 'Reto «Be My Way» del programa OA6 de IBM Consulting, EMT Madrid y la UPM: guiar a una persona con discapacidad visual desde la parada hasta la puerta del autobús.',
        en: 'The “Be My Way” challenge of the OA6 programme, run by IBM Consulting, EMT Madrid and UPM: guiding a visually impaired person from the bus stop to the bus door.'
      },
      puntos: [
        { es: 'Edge AI: YOLOv8 y MobileNet ajustados con transfer learning, con la inferencia en el propio móvil.', en: 'Edge AI: YOLOv8 and MobileNet fine-tuned with transfer learning, running on the phone itself.' },
        { es: 'Guiado manos libres por voz y vibración: de los 5 m de error del GPS a unos 0,2 m (estimado).', en: 'Hands-free guidance by voice and vibration: from the 5 m error of GPS to about 0.2 m (estimated).' },
        { es: 'Privacy-by-design (no se guarda ni se envía nada) y caso de negocio con 0 € en hardware urbano.', en: 'Privacy by design (nothing is stored or sent) and a business case with €0 in street hardware.' }
      ],
      tecnologias: ['Edge AI', 'YOLOv8', { es: 'Visión artificial', en: 'Computer vision' }, 'Design Thinking', 'Lean Canvas'],
      galeria: [
        { tipo: 'img', src: 'assets/proyectos/oa6/equipo.webp', pie: { es: 'Mi equipo en la final del programa, en la UPM', en: 'My team at the programme final, at UPM' } },
        { tipo: 'img', src: 'assets/proyectos/oa6/evento.webp', pie: { es: 'La cúpula de la final, con IBM, EMT Madrid y la UPM', en: 'The dome where the final took place, with IBM, EMT Madrid and UPM' } },
        { tipo: 'img', src: 'assets/proyectos/oa6/manos-libres.webp', pie: { es: 'Nuestra presentación: la interfaz manos libres, con el móvil en el pecho y auriculares de conducción ósea', en: 'Our pitch (in Spanish): the hands-free interface, with the phone on the chest and bone-conduction headphones' } },
        { tipo: 'img', src: 'assets/proyectos/oa6/asistente.webp', pie: { es: 'La pantalla nunca muestra el vídeo: más privacidad y menos batería', en: 'The screen never shows the video: more privacy and less battery use' } },
        { tipo: 'img', src: 'assets/proyectos/oa6/entrenamiento.webp', pie: { es: 'Entrenamiento de la IA: transfer learning, dataset reducido e inferencia local', en: 'AI training: transfer learning, a small dataset and on-device inference' } },
        { tipo: 'img', src: 'assets/proyectos/oa6/eficiencia.webp', pie: { es: 'Margen de error del GPS, de la megafonía exterior y de NAVIA', en: 'Error margin of GPS, of the external announcements and of NAVIA' } },
        { tipo: 'img', src: 'assets/proyectos/oa6/coste.webp', pie: { es: '0 € en hardware urbano: todo va en el móvil del usuario', en: '€0 in street hardware: everything runs on the user’s phone' } },
        { tipo: 'img', src: 'assets/proyectos/oa6/grupo.webp', pie: { es: 'Participantes y organizadores del programa OA6', en: 'Participants and organisers of the OA6 programme' } }
      ],
      enlaces: [
        { texto: { es: 'Lo conté en LinkedIn', en: 'My LinkedIn post (Spanish)' }, url: 'https://www.linkedin.com/feed/update/urn%3Ali%3AugcPost%3A7463889643403440128' }
      ]
    }
  ],

  premio: {
    titulo: { es: 'Primer Premio Nacional · Promptathon ALIA 40B', en: 'First National Prize · ALIA 40B Promptathon' },
    entidad: { es: 'Ministerio para la Transformación Digital y de la Función Pública · dic 2025', en: 'Spanish Ministry for Digital Transformation · Dec 2025' },
    texto: {
      es: 'Final del Desafío Nacional de Algoritmos Verdes, en Madrid. En pareja, usamos ALIA, el modelo de lenguaje público en español, para resolver problemas de arquitectura e infraestructura técnica, como el diseño de un centro de datos, a base de prompt engineering.',
      en: 'Final of the National Green Algorithms Challenge, in Madrid. Working as a pair, we used ALIA, Spain’s public large language model, to solve technical architecture and infrastructure problems, such as data centre design, through prompt engineering.'
    },
    fotos: [
      { src: 'assets/premios/alia-certificado.webp', pie: { es: 'Certificado de ganador', en: 'Winner’s certificate' } },
      { src: 'assets/premios/alia-sofa.webp', pie: { es: 'Con los certificados en el escenario', en: 'With our certificates on stage' } },
      { src: 'assets/premios/alia-grupo.webp', pie: { es: 'Ganadores y organizadores del Desafío ALIA', en: 'Winners and organisers of the ALIA Challenge' } }
    ],
    enlace: 'https://www.linkedin.com/feed/update/urn%3Ali%3AugcPost%3A7421991732231430144'
  },

  certificados: [
    // url vacía = sin botón «Verificar»
    { titulo: { es: 'Claude Code in Action', en: 'Claude Code in Action' }, entidad: 'Anthropic', fecha: { es: 'Nov 2026', en: 'Nov 2026' }, url: 'https://verify.skilljar.com/c/3g2tkibikb79' },
    { titulo: { es: 'Claude Code 101', en: 'Claude Code 101' }, entidad: 'Anthropic', fecha: { es: 'Nov 2026', en: 'Nov 2026' }, url: 'https://verify.skilljar.com/c/7thxntndacp9' },
    { titulo: { es: 'AI Capabilities and Limitations', en: 'AI Capabilities and Limitations' }, entidad: 'Anthropic', fecha: { es: 'Oct 2026', en: 'Oct 2026' }, url: 'https://verify.skilljar.com/c/6cajj5chmk34' }
  ],

  experiencia: [
    {
      empresa: 'NTT DATA',
      // Logo: 'mono' = SVG de un color, que se pinta con el color del texto (sirve en claro y en oscuro).
      // Sin logo, sale un recuadro con las siglas. Formación usa los mismos campos.
      logo: 'assets/logos/ntt-data.svg', logoMono: true,
      puesto: { es: 'Digital Architect (prácticas)', en: 'Digital Architect (intern)' },
      fechas: { es: 'Oct 2026 – actualidad', en: 'Oct 2026 – present' },
      lugar: { es: 'Madrid · híbrido', en: 'Madrid · hybrid' },
      actual: true,
      contexto: { es: 'AI Engineering Talent Factory: programa de formación y proyectos en Digital Architecture, DevOps e IA agéntica, orientado a clientes de banca y seguros.', en: 'AI Engineering Talent Factory: a training and project programme in Digital Architecture, DevOps and agentic AI, aimed at banking and insurance clients.' },
      puntos: [
        { es: '<b>Desarrollo asistido por IA:</b> Claude Code como herramienta de trabajo diaria, configurado con instrucciones por proyecto (CLAUDE.md), permisos, hooks y servidores MCP.', en: '<b>AI-assisted development:</b> Claude Code as an everyday working tool, set up with per-project instructions (CLAUDE.md), permissions, hooks and MCP servers.' },
        { es: '<b>Git y GitHub:</b> ramas, pull requests y code review, también de los cambios que propone la IA; CI/CD con GitHub Actions.', en: '<b>Git and GitHub:</b> branches, pull requests and code review, including the changes suggested by AI; CI/CD with GitHub Actions.' },
        { es: '<b>Agentes e IDEs agénticos:</b> formación en desarrollo asistido por IA y agentes con Claude Code y GitHub Copilot, de cara a las certificaciones de Anthropic (en curso).', en: '<b>Agents and agentic IDEs:</b> training in AI-assisted development and agents with Claude Code and GitHub Copilot, towards Anthropic’s certifications (in progress).' },
        { es: '<b>Cloud:</b> Microsoft Azure (ruta AZ-900) e infraestructura como código con Terraform: red virtual, NSG, storage y Key Vault con RBAC.', en: '<b>Cloud:</b> Microsoft Azure (AZ-900 learning path) and infrastructure as code with Terraform: virtual network, NSG, storage and Key Vault with RBAC.' },
        { es: '<b>Contenedores:</b> imágenes Docker multi-stage, apps con Docker Compose y despliegues en Kubernetes.', en: '<b>Containers:</b> multi-stage Docker images, apps with Docker Compose and deployments on Kubernetes.' }
      ]
    },
    {
      empresa: 'CREA-ETSIDI',
      logo: 'assets/logos/crea.webp',
      puesto: { es: 'Desarrollador de robótica', en: 'Robotics developer' },
      fechas: { es: 'Feb 2023 – actualidad', en: 'Feb 2023 – present' },
      lugar: { es: 'Club de robótica de la UPM', en: 'UPM robotics club' },
      actual: true,
      contexto: { es: 'Club de robótica de la ETSIDI: prototipos de hardware y software para proyectos propios y competiciones universitarias.', en: 'The ETSIDI robotics club: hardware and software prototypes for our own projects and university competitions.' },
      puntos: [
        { es: '<b>Docencia:</b> instructor del curso oficial de Arduino del club: electrónica y programación en C++.', en: '<b>Teaching:</b> instructor of the club’s official Arduino course: electronics and C++ programming.' },
        { es: '<b>Robots desde cero:</b> diseño, montaje y programación, de vehículos de radiocontrol (RC) a TunaBot (con el CSIC) y EUROBOT 2027.', en: '<b>Robots from scratch:</b> design, assembly and programming, from radio-controlled (RC) vehicles to TunaBot (with CSIC) and EUROBOT 2027.' },
        { es: '<b>Firmware:</b> C++ para ESP32 con PlatformIO; en TunaBot, la locomoción y el firmware de movimiento.', en: '<b>Firmware:</b> C++ for ESP32 with PlatformIO; on TunaBot, the locomotion and motion firmware.' },
        { es: '<b>Sensores y actuadores:</b> montaje, programación y pruebas en placa.', en: '<b>Sensors and actuators:</b> assembly, programming and testing on the board.' }
      ]
    },
    {
      empresa: 'UPM MotoStudent Petrol',
      logo: 'assets/logos/motostudent.webp', logoLleno: true,   // logo cuadrado con fondo negro: sin margen
      puesto: { es: 'Miembro del departamento de electrónica', en: 'Electronics department member' },
      fechas: { es: 'Nov 2024 – jun 2026', en: 'Nov 2024 – Jun 2026' },
      lugar: { es: 'Madrid', en: 'Madrid' },
      contexto: { es: 'Equipo de la UPM que diseña y construye una moto de competición para MotoStudent, la competición internacional entre universidades.', en: 'The UPM team that designs and builds a racing motorcycle for MotoStudent, the international university competition.' },
      puntos: [
        { es: '<b>Telemetría:</b> desarrollo de un dashboard a medida que lee el bus OBD-II de la moto y muestra los datos del sistema.', en: '<b>Telemetry:</b> development of a custom dashboard that reads the bike’s OBD-II bus and displays the system data.' },
        { es: '<b>Documentación:</b> esquemas y documentación electrónica en OrCAD para facilitar el diagnóstico.', en: '<b>Documentation:</b> electronic schematics and documentation in OrCAD to make diagnosis easier.' },
        { es: '<b>Competición:</b> diagnóstico y reparación de fallos de sensores y electrónica durante la competición.', en: '<b>Competition:</b> diagnosing and fixing sensor and electronics failures during competition.' }
      ]
    }
  ],

  formacion: [
    {
      centro: 'Universidad Politécnica de Madrid · ETSIDI',
      logo: 'assets/logos/upm.webp',
      titulo: { es: 'Grado en Ingeniería Electrónica Industrial y Automática', en: 'BSc in Industrial Electronics and Automation Engineering' },
      fechas: { es: 'Sep 2022 – jun 2027 (previsto)', en: 'Sep 2022 – Jun 2027 (expected)' },
      actual: true
    },
    {
      centro: 'NTT DATA · AI Engineering Talent Factory',
      logo: 'assets/logos/ntt-data.svg', logoMono: true,
      titulo: { es: 'Formación en IA agéntica, cloud y DevOps', en: 'Agentic AI, cloud and DevOps training' },
      fechas: { es: 'Oct 2026 – actualidad', en: 'Oct 2026 – present' },
      texto: {
        es: 'Desarrollo asistido por IA y agentes (certificados de Anthropic Academy: Claude Code 101 y Claude Code in Action), Microsoft Azure (ruta completa de AZ-900 con proyectos guiados), Docker, Kubernetes, Terraform y GitHub Actions, dentro de las prácticas.',
        en: 'AI-assisted development and agents (Anthropic Academy certificates: Claude Code 101 and Claude Code in Action), Microsoft Azure (full AZ-900 learning path with guided projects), Docker, Kubernetes, Terraform and GitHub Actions, as part of my internship.'
      }
    },
    {
      centro: 'IES Magallanes · Tenerife',
      siglas: 'IES',
      titulo: { es: 'Bachillerato científico-tecnológico', en: 'High school diploma, science and technology track' },
      fechas: { es: '2020 – 2022', en: '2020 – 2022' }
    }
  ],

  // Skills por áreas. 'tags' son las tecnologías de los proyectos donde se ha usado
  // (si coincide con alguna, la skill se puede pulsar y filtra los proyectos).
  skills: [
    {
      icono: 'chip', titulo: { es: 'Embebidos y FPGA', en: 'Embedded & FPGA' },
      items: [
        { n: 'C', tags: [] }, { n: 'C++', tags: ['C++'] }, { n: 'ESP32 · PlatformIO', tags: ['ESP32', 'PlatformIO'] },
        { n: 'STM32 (HAL)', tags: [] }, { n: 'Arduino', tags: ['Arduino'] }, { n: 'Raspberry Pi', tags: ['Raspberry Pi'] },
        { n: 'VHDL', tags: [] }, { n: 'FPGA (Vivado)', tags: [] }, { n: 'I2C', tags: ['I2C'] }, { n: 'SPI', tags: ['SPI'] },
        { n: 'LoRa · LoRaWAN', tags: ['LoRa / LoRaWAN'] }
      ]
    },
    {
      icono: 'codigo', titulo: { es: 'Desarrollo con IA', en: 'AI-assisted development' },
      items: [
        { n: 'Claude Code', tags: ['Claude Code'] }, { n: { es: 'MCP y agentes', en: 'MCP & agents' }, tags: ['Claude / MCP'] },
        { n: 'ChatGPT', tags: [] }, { n: 'GitHub Copilot', tags: [] }, { n: 'Gemini', tags: [] },
        { n: 'Prompt engineering', tags: [] }, { n: 'Git · GitHub', tags: ['Git'] }, { n: 'GitHub Actions', tags: ['GitHub Actions'] }
      ]
    },
    {
      icono: 'nube', titulo: { es: 'Software y cloud', en: 'Software & cloud' },
      items: [
        { n: 'Python', tags: ['Python'] }, { n: 'OpenCV', tags: ['OpenCV'] }, { n: 'MATLAB', tags: ['MATLAB'] },
        { n: 'OpenGL', tags: ['OpenGL'] }, { n: 'Linux', tags: [] }, { n: 'FastAPI', tags: ['FastAPI'] },
        { n: 'React · TypeScript', tags: ['React', 'TypeScript'] }, { n: 'Microsoft Azure', tags: ['Microsoft Azure'] },
        { n: 'Terraform', tags: ['Terraform'] }, { n: 'Docker', tags: ['Docker'] }, { n: 'Kubernetes', tags: [] },
        { n: 'Home Assistant', tags: ['Home Assistant'] }
      ]
    },
    {
      icono: 'onda', titulo: { es: 'Electrónica y diseño', en: 'Electronics & design' },
      items: [
        { n: { es: 'Diseño de circuitos', en: 'Circuit design' }, tags: ['Diseño de circuitos'] }, { n: 'OrCAD', tags: [] },
        { n: { es: 'Bus OBD-II', en: 'OBD-II bus' }, tags: [] }, { n: 'Fusion 360', tags: ['Fusion 360'] },
        { n: { es: 'Impresión 3D', en: '3D printing' }, tags: ['Impresión 3D'] }
      ]
    },
    {
      icono: 'engranaje', titulo: { es: 'Automatización', en: 'Automation' },
      items: [
        { n: 'PLC Siemens S7-1500', tags: ['PLC S7-1500'] }, { n: 'TIA Portal V18', tags: ['TIA Portal'] },
        { n: 'GRAFCET', tags: ['GRAFCET'] }, { n: 'FlexSim', tags: ['FlexSim'] }, { n: 'RFID', tags: ['RFID'] }
      ]
    },
    {
      icono: 'idiomas', titulo: { es: 'Idiomas', en: 'Languages' },
      items: [
        { n: { es: 'Español · nativo', en: 'Spanish · native' }, tags: [] },
        { n: { es: 'Inglés · B2', en: 'English · B2' }, tags: [] }
      ]
    }
  ],

  // Modo «Dibujos» de la sección de skills: una tarjeta con dibujo por familia (los dibujos, en dibujos.js)
  skillsDibujos: [
    { dibujo: 'codigo', titulo: { es: 'Programación', en: 'Programming' }, texto: 'C · C++ · Python' },
    { dibujo: 'micro', titulo: { es: 'Microcontroladores', en: 'Microcontrollers' }, texto: 'ESP32 · STM32 · Arduino · Raspberry Pi · LoRa · I2C · SPI' },
    { dibujo: 'fpga', titulo: 'FPGA', texto: 'VHDL · Vivado' },
    { dibujo: 'plc', titulo: { es: 'Automatización', en: 'Automation' }, texto: 'PLC S7-1500 · TIA Portal · GRAFCET · RFID' },
    { dibujo: 'pcb', titulo: { es: 'Electrónica', en: 'Electronics' }, texto: { es: 'Diseño de circuitos · OrCAD · OBD-II', en: 'Circuit design · OrCAD · OBD-II' } },
    { dibujo: 'simulacion', titulo: { es: 'Simulación', en: 'Simulation' }, texto: 'MATLAB · FlexSim' },
    { dibujo: 'cad', titulo: { es: 'Diseño 3D', en: '3D design' }, texto: { es: 'Fusion 360 · Impresión 3D', en: 'Fusion 360 · 3D printing' } },
    { dibujo: 'vision', titulo: { es: 'Visión y gráficos', en: 'Vision & graphics' }, texto: 'OpenCV · OpenGL' },
    { dibujo: 'nube', titulo: 'Cloud y DevOps', texto: 'Azure · Docker · Kubernetes · Terraform · GitHub Actions' },
    { dibujo: 'ia', titulo: { es: 'IA', en: 'AI' }, texto: 'Claude Code · MCP · ChatGPT · Copilot · Gemini' },
    { dibujo: 'terminal', titulo: { es: 'Desarrollo', en: 'Development' }, texto: 'Git · GitHub · Linux · FastAPI · React · Home Assistant' },
    { dibujo: 'idiomas', titulo: { es: 'Idiomas', en: 'Languages' }, texto: { es: 'Español nativo · Inglés B2', en: 'Spanish (native) · English B2' } }
  ],

  // Textos fijos de la interfaz
  textos: {
    es: {
      saltar: 'Saltar al contenido',
      navSobreMi: 'Sobre mí', navProyectos: 'Proyectos', navExperiencia: 'Experiencia', navSkills: 'Skills', navContacto: 'Contacto',
      tema: 'Cambiar entre tema claro y oscuro', idioma: 'Read in English', menu: 'Abrir el menú',
      hola: 'Hola, soy', apasionado: 'Apasionado por', chipTexto: 'APASIONADO POR', etiquetaPremio: '1.er Premio Nacional · Promptathon ALIA',
      verProyectos: 'Ver proyectos', conectar: 'Conectemos', descargarCV: 'Descargar CV',
      statCurso: 'curso de Ingeniería Electrónica Industrial y Automática', statCrea: 'años en el club de robótica', statProyectos: 'proyectos en esta web', statPremio: 'premio nacional de IA (ALIA)',
      tituloSobreMi: 'Sobre mí', ahoraMismo: 'Ahora mismo', actualizado: 'Actualizado en',
      tituloProyectos: 'Proyectos', subProyectos: 'Lo que he diseñado, montado y programado: en clase, en el club de robótica y por mi cuenta.',
      filtrandoPor: 'Mostrando proyectos con', quitarFiltro: 'Quitar filtro', verMas: 'Ver más',
      enCurso: 'En curso',
      tecnologias: 'Tecnologías', cerrar: 'Cerrar',
      anterior: 'Anterior', siguiente: 'Siguiente', copiarEnlace: 'Copiar enlace', enlaceCopiado: '¡Enlace copiado!',
      tituloPremios: 'Premios, concursos y certificados', verPost: 'Ver en LinkedIn', verificar: 'Verificar',
      tituloExperiencia: 'Experiencia y formación', trabajo: 'Experiencia', estudios: 'Formación', actual: 'Actual',
      tituloSkills: 'Skills', subSkills: 'Pulsa una para ver los proyectos donde la he usado.',
      subSkillsDibujos: 'Con lo que trabajo, de un vistazo. En «Detalle», pulsa una para ver dónde la he usado.', vistaDibujos: 'Dibujos', vistaDetalle: 'Detalle', vistaSkills: 'Cómo ver las skills', proyecto: 'proyecto', proyectos: 'proyectos',
      tituloContacto: 'Contacto', subContacto: '¿Un proyecto, una oferta o simplemente hablar de robots? Escríbeme.',
      datosContacto: 'Dónde encontrarme', correo: 'Correo', ubicacion: 'Ubicación',
      tuNombre: 'Tu nombre', tuCorreo: 'Tu correo', mensaje: 'Mensaje', enviar: 'Enviar mensaje',
      phNombre: 'Ana García', phCorreo: 'ana@empresa.com', phMensaje: 'Hola, Víctor. Te escribo por…',
      avisoCorreo: 'Se abrirá tu programa de correo con el mensaje ya escrito.',
      enviado: '¡Mensaje enviado! Te responderé pronto.', errorEnvio: 'No se ha podido enviar. Escríbeme por LinkedIn o al correo.',
      asuntoCorreo: 'Contacto desde tu web',
      pie: 'Hecha con HTML, CSS y JavaScript, sin frameworks y con ayuda de Claude Code. Sin cookies ni rastreadores.'
    },
    en: {
      saltar: 'Skip to content',
      navSobreMi: 'About', navProyectos: 'Projects', navExperiencia: 'Experience', navSkills: 'Skills', navContacto: 'Contact',
      tema: 'Toggle light and dark theme', idioma: 'Leer en español', menu: 'Open the menu',
      hola: 'Hi, I’m', apasionado: 'Passionate about', chipTexto: 'PASSIONATE ABOUT', etiquetaPremio: '1st National Prize · ALIA Promptathon',
      verProyectos: 'See my projects', conectar: 'Let’s connect', descargarCV: 'Download CV',
      statCurso: 'year of Industrial Electronics and Automation Engineering', statCrea: 'years in the robotics club', statProyectos: 'projects on this site', statPremio: 'national AI prize (ALIA)',
      tituloSobreMi: 'About me', ahoraMismo: 'Right now', actualizado: 'Updated',
      tituloProyectos: 'Projects', subProyectos: 'Things I have designed, built and programmed: at university, at the robotics club and on my own.',
      filtrandoPor: 'Showing projects with', quitarFiltro: 'Clear filter', verMas: 'Read more',
      enCurso: 'In progress',
      tecnologias: 'Tech stack', cerrar: 'Close',
      anterior: 'Previous', siguiente: 'Next', copiarEnlace: 'Copy link', enlaceCopiado: 'Link copied!',
      tituloPremios: 'Awards, competitions and certificates', verPost: 'See on LinkedIn', verificar: 'Verify',
      tituloExperiencia: 'Experience and education', trabajo: 'Experience', estudios: 'Education', actual: 'Current',
      tituloSkills: 'Skills', subSkills: 'Click one to see the projects where I have used it.',
      subSkillsDibujos: 'What I work with, at a glance. In “Detail”, click one to see where I have used it.', vistaDibujos: 'Icons', vistaDetalle: 'Detail', vistaSkills: 'How to show the skills', proyecto: 'project', proyectos: 'projects',
      tituloContacto: 'Contact', subContacto: 'A project, a job opening or just a chat about robots? Drop me a line.',
      datosContacto: 'Where to find me', correo: 'Email', ubicacion: 'Location',
      tuNombre: 'Your name', tuCorreo: 'Your email', mensaje: 'Message', enviar: 'Send message',
      phNombre: 'Jane Smith', phCorreo: 'jane@company.com', phMensaje: 'Hi Víctor, I am writing about…',
      avisoCorreo: 'Your email app will open with the message ready to send.',
      enviado: 'Message sent! I will get back to you soon.', errorEnvio: 'It could not be sent. Please reach me on LinkedIn or by email.',
      asuntoCorreo: 'Message from your website',
      pie: 'Built with plain HTML, CSS and JavaScript, with help from Claude Code. No cookies, no trackers.'
    }
  }
};
