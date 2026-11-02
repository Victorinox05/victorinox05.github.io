// TODO el contenido de la web está aquí. Para cambiar un texto, una foto o añadir
// un proyecto no hace falta tocar el HTML. Cada texto va en español (es) y en inglés (en).
// Guía rápida en ../GUIA.md

const DATOS = {
  actualizado: { es: 'noviembre de 2026', en: 'November 2026' },

  persona: {
    nombre: 'Víctor Casanova',
    nombreCompleto: 'Víctor Humberto Casanova Bernal',
    foto: 'assets/foto.webp',
    distintivo: { es: 'Madrid · 4.º de Ingeniería en la UPM', en: 'Madrid · 4th-year engineering student at UPM' },
    // La línea que se va escribiendo sola en la portada
    roles: {
      es: ['los sistemas embebidos', 'las FPGA', 'la robótica', 'la automatización', 'el cacharreo'],
      en: ['embedded systems', 'FPGAs', 'robotics', 'industrial automation', 'tinkering with hardware']
    },
    bio: {
      es: 'Estudiante de último curso de <strong>Ingeniería Electrónica Industrial y Automática</strong> en la Universidad Politécnica de Madrid. Perfil práctico de hardware y software: me gusta ver cómo una idea acaba siendo algo que se puede tocar, programar y testear.',
      en: 'Final-year student of <strong>Industrial Electronics and Automation Engineering</strong> at the Technical University of Madrid (UPM). A hands-on hardware and software profile: I enjoy watching an idea turn into something you can touch, program and test.'
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

  // PDF del CV. Vacío = el botón «Descargar CV» no sale.
  // PDF sin teléfono, generados con Cerebro/CV/generar_cv.py --web (vacío = sin botón)
  cv: { es: 'cv/CV_Victor_Casanova_ES.pdf', en: 'cv/CV_Victor_Casanova_EN.pdf' },

  sobreMi: {
    es: [
      'Aunque disfruto de la parte teórica, siempre he sido de aprender haciendo: montar, programar y probar sistemas reales, y pelearme con ellos hasta que funcionan bien.',
      'Empecé en el club de robótica CREA-ETSIDI, donde ahora doy el curso de Arduino, y desde entonces he pasado por la electrónica de una moto de competición, PLC industriales, FPGA y un enjambre de robots con el CSIC. Ahora completo esa base con cloud, infraestructura como código e IA en mis prácticas en NTT DATA.'
    ],
    en: [
      'Although I enjoy theory, I have always learned best by doing: building, programming and testing real systems, and working on them until they run properly.',
      'I started at the CREA-ETSIDI robotics club, where I now teach the Arduino course. Since then I have worked on the electronics of a racing motorcycle, industrial PLCs, FPGAs and a robot swarm with CSIC. During my internship at NTT DATA I am adding cloud, infrastructure as code and AI to that background.'
    ]
  },

  ahoraMismo: [
    { icono: 'gorro', es: 'Último curso del grado: FPGA y VHDL, microcontroladores STM32 y control digital.', en: 'Final year of my degree: FPGAs and VHDL, STM32 microcontrollers and digital control.' },
    { icono: 'nube', es: 'Prácticas en NTT DATA como Digital Architect: Azure, Terraform, contenedores e IA agéntica.', en: 'Internship at NTT DATA as a Digital Architect: Azure, Terraform, containers and agentic AI.' },
    { icono: 'engranaje', es: 'Empezando el TFG: control de una planta simulada con un PLC Siemens.', en: 'Starting my bachelor’s thesis: controlling a simulated plant with a Siemens PLC.' },
    { icono: 'robot', es: 'TunaBot (CSIC) en la recta final y EUROBOT 2027 con el club CREA.', en: 'TunaBot (CSIC) in its final stretch, and EUROBOT 2027 with the CREA club.' },
    { icono: 'chip', es: 'En casa, la versión 2 del brazo robótico sobre una Raspberry Pi.', en: 'At home, version 2 of my robotic arm on a Raspberry Pi.' }
  ],

  // Categorías de los filtros de proyectos
  categorias: {
    embebidos: { es: 'Embebidos', en: 'Embedded' },
    robotica: { es: 'Robótica', en: 'Robotics' },
    automatizacion: { es: 'Automatización', en: 'Automation' },
    software: { es: 'Software', en: 'Software' },
    cloud: { es: 'Cloud e IA', en: 'Cloud & AI' }
  },

  // Los proyectos salen en este orden. 'portada' es la foto de la tarjeta.
  // Galería: { tipo: 'img' | 'video' | 'diagrama', src, poster (vídeos), pie: {es, en} }
  proyectos: [
    {
      id: 'tunabot',
      destacado: true,   // tarjeta ancha (ocupa dos columnas)
      titulo: { es: 'TunaBot: enjambre de robots coordinados (CSIC)', en: 'TunaBot: a coordinated robot swarm (CSIC)' },
      resumen: { es: 'Locomoción y firmware de movimiento en ESP32 para un enjambre de robots que huye de un «cazador».', en: 'Locomotion and ESP32 motion firmware for a robot swarm that escapes from a “hunter”.' },
      fechas: { es: 'Abr 2026 – actualidad', en: 'Apr 2026 – present' },
      estado: 'en-curso',
      categorias: ['embebidos', 'robotica'],
      equipo: { es: 'CREA-ETSIDI · departamento de movimiento', en: 'CREA-ETSIDI · motion team' },
      portada: 'assets/proyectos/tunabot/base.webp',
      contexto: {
        es: 'Proyecto del club de robótica CREA-ETSIDI en colaboración con el CSIC: un enjambre de pequeños robots terrestres que comparten su posición y se coordinan para huir de un robot «cazador», imitando a un banco de peces.',
        en: 'A project of the CREA-ETSIDI robotics club in collaboration with CSIC, the Spanish National Research Council: a swarm of small ground robots that share their position and coordinate to escape from a “hunter” robot, like a school of fish.'
      },
      aportacion: { es: 'Departamento de movimiento: cómo se mueve cada robot, de los motores al firmware.', en: 'Motion team: how each robot moves, from the motors to the firmware.' },
      puntos: [
        { es: '<b>Locomoción:</b> comparativa de sistemas de locomoción y de motores, y elección de ruedas omnidireccionales.', en: '<b>Locomotion:</b> comparison of drive systems and motor types, and the choice of omni wheels.' },
        { es: '<b>Firmware de movimiento</b> en ESP32 (C++, PlatformIO): el robot se controla con un vector de dirección y módulo relativo al propio robot.', en: '<b>Motion firmware</b> on an ESP32 (C++, PlatformIO): the robot is driven by a direction-and-magnitude vector in its own frame.' },
        { es: '<b>Placa del robot:</b> diseño de la distribución (ESP32, drivers ULN2003 y motores paso a paso) y depuración de un cortocircuito en la versión anterior.', en: '<b>Robot board:</b> layout design (ESP32, ULN2003 drivers and stepper motors) and debugging of a short circuit in the previous version.' }
      ],
      tecnologias: ['ESP32', 'C++', 'PlatformIO', { es: 'Motores paso a paso', en: 'Stepper motors' }, { es: 'Diseño de circuitos', en: 'Circuit design' }],
      galeria: [
        { tipo: 'img', src: 'assets/proyectos/tunabot/base.webp', pie: { es: 'Base del robot con ruedas omnidireccionales y sus drivers', en: 'Robot base with omni wheels and its drivers' } },
        { tipo: 'video', src: 'assets/proyectos/tunabot/prueba-motores.mp4', poster: 'assets/proyectos/tunabot/prueba-motores.webp', pie: { es: 'Prueba de los motores con el ESP32', en: 'Motor test driven by the ESP32' } },
        { tipo: 'img', src: 'assets/proyectos/tunabot/placa-v3.webp', pie: { es: 'Placa perforada v3: ESP32, drivers y conectores', en: 'Perfboard v3: ESP32, drivers and connectors' } },
        { tipo: 'img', src: 'assets/proyectos/tunabot/placa-v2.webp', pie: { es: 'Placa v2, la del cortocircuito', en: 'Board v2, the one with the short circuit' } },
        { tipo: 'img', src: 'assets/proyectos/tunabot/driver.webp', pie: { es: 'Driver ULN2003 de un motor paso a paso', en: 'ULN2003 stepper motor driver' } }
      ]
    },
    {
      id: 'brazo',
      titulo: { es: 'Brazo robótico con visión artificial', en: 'Robotic arm with computer vision' },
      resumen: { es: 'Brazo de 3 grados de libertad que localiza objetos con una cámara (Python, OpenCV) y calcula cómo llegar a ellos.', en: 'A 3-DOF arm that locates objects with a camera (Python, OpenCV) and works out how to reach them.' },
      fechas: { es: 'Feb – may 2025 · v2 desde jul 2026', en: 'Feb – May 2025 · v2 since Jul 2026' },
      estado: 'en-curso',
      etiquetaEstado: { es: 'v2 en curso', en: 'v2 in progress' },
      categorias: ['robotica', 'embebidos', 'software'],
      equipo: { es: 'Hardware y software', en: 'Hardware and software' },
      portada: 'assets/proyectos/brazo/portada.webp',
      contexto: {
        es: 'Brazo robótico que detecta objetos con una cámara y calcula sus coordenadas para ir a cogerlos. La primera versión (2025) reparte el trabajo entre un PC, que hace la visión, y un Arduino, que mueve los motores. La segunda (2026) es un proyecto personal rehecho desde cero sobre una Raspberry Pi.',
        en: 'A robotic arm that detects objects with a camera and computes their coordinates to pick them up. Version 1 (2025) splits the work between a PC, which runs the vision, and an Arduino, which drives the motors. Version 2 (2026) is a personal project rebuilt from scratch on a Raspberry Pi.'
      },
      aportacion: { es: 'Desarrollo de hardware y software: diseño, montaje y programación.', en: 'Hardware and software development: design, assembly and programming.' },
      puntos: [
        { es: '<b>Visión en tiempo real</b> con Python y OpenCV: detección de objetivos por color y cálculo de sus coordenadas.', en: '<b>Real-time vision</b> with Python and OpenCV: colour-based target detection and coordinate calculation.' },
        { es: '<b>Control de los actuadores</b> en C/C++ (Arduino) con órdenes enviadas desde el PC: servos y motores paso a paso, con giroscopio y encoder.', en: '<b>Actuator control</b> in C/C++ (Arduino) with commands sent from the PC: servos and stepper motors, with a gyroscope and an encoder.' },
        { es: '<b>Diseño mecánico</b> en Fusion 360 e impresión 3D; cinemática simulada en MATLAB para validar movimientos y alcance.', en: '<b>Mechanical design</b> in Fusion 360 and 3D printing; kinematics simulated in MATLAB to validate motion and reach.' },
        { es: '<b>v2:</b> todo en una Raspberry Pi 4 con un PCA9685 por I2C (PWM por hardware y alimentación de los servos aislada), sin pantalla y con el vídeo de la cámara por streaming web.', en: '<b>v2:</b> everything on a Raspberry Pi 4 with a PCA9685 over I2C (hardware PWM and isolated servo power), headless, with the camera feed streamed to a web page.' }
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
      id: 'casa',
      titulo: { es: 'Casa inteligente con app propia', en: 'Smart home with a custom app' },
      resumen: { es: 'Home Assistant en una Raspberry Pi, dispositivos Zigbee y una app web propia con permisos por zonas.', en: 'Home Assistant on a Raspberry Pi, Zigbee devices and a custom web app with per-zone permissions.' },
      fechas: { es: 'Sep 2026 – actualidad', en: 'Sep 2026 – present' },
      estado: 'en-curso',
      categorias: ['embebidos', 'software', 'cloud'],
      equipo: { es: 'Proyecto personal', en: 'Personal project' },
      portada: { diagrama: 'casa' },
      contexto: {
        es: 'Domótica de casa, montada por tandas: cada compra se usa de verdad antes de pasar a la siguiente. El cerebro es Home Assistant en una Raspberry Pi 4, con dispositivos Zigbee y acceso desde fuera por VPN, sin abrir puertos.',
        en: 'Home automation built in stages: each purchase is used for real before moving on to the next. The brain is Home Assistant on a Raspberry Pi 4, with Zigbee devices and remote access over a VPN, with no open ports.'
      },
      aportacion: { es: 'Proyecto propio, de la caja del interruptor a la app.', en: 'My own project, from the wall switch box to the app.' },
      puntos: [
        { es: '<b>Instalación:</b> Home Assistant OS en una Raspberry Pi 4, coordinador Zigbee, interruptor sin neutro y sensor de presencia; copias de seguridad diarias.', en: '<b>Setup:</b> Home Assistant OS on a Raspberry Pi 4, a Zigbee coordinator, a no-neutral wall switch and a presence sensor; daily backups.' },
        { es: '<b>Acceso remoto</b> con Tailscale (VPN), sin abrir puertos del router.', en: '<b>Remote access</b> through Tailscale (VPN), with no router ports open.' },
        { es: '<b>App web propia</b>, instalable en el móvil (PWA): backend en FastAPI + SQLite con login (Argon2 + JWT) y permisos por zona con denegación por defecto; frontend en React + TypeScript, en tiempo real.', en: '<b>Custom web app</b>, installable on a phone (PWA): FastAPI + SQLite backend with login (Argon2 + JWT) and deny-by-default per-zone permissions; real-time React + TypeScript frontend.' },
        { es: '<b>IA:</b> Claude conectado a Home Assistant por MCP para consultar el estado de la casa y el historial de los sensores.', en: '<b>AI:</b> Claude connected to Home Assistant over MCP to query the state of the house and the sensor history.' }
      ],
      tecnologias: ['Raspberry Pi', 'Home Assistant', 'Zigbee', 'MQTT', 'Python', 'FastAPI', 'React', 'TypeScript', 'Claude / MCP'],
      galeria: [
        { tipo: 'diagrama', src: 'casa', pie: { es: 'Arquitectura del sistema', en: 'System architecture' } }
      ]
    },
    {
      id: 'skate',
      destacado: true,
      titulo: { es: 'Línea de fabricación de skateboards', en: 'Skateboard manufacturing line' },
      resumen: { es: 'PLC Siemens S7-1500 de la célula de moldeo por inyección, con la planta simulada en FlexSim.', en: 'Siemens S7-1500 PLC for the injection moulding cell, with the plant simulated in FlexSim.' },
      fechas: { es: 'Feb – may 2026', en: 'Feb – May 2026' },
      estado: 'terminado',
      categorias: ['automatizacion'],
      equipo: { es: 'Automatización Industrial (3.º) · en grupo', en: 'Industrial Automation course (3rd year) · team project' },
      portada: 'assets/proyectos/skate/grafcet.webp',
      contexto: {
        es: 'Trabajo de Automatización Industrial: diseño y automatización de una línea que fabrica cinco modelos de skateboard (penny, waveboard, classic, longboard y cruiser) con piezas de plástico y de madera. Incluye el diseño de la planta (celdas, almacenes, transporte con AGV y cintas), su simulación en FlexSim y el control de la célula de moldeo por inyección.',
        en: 'Industrial Automation coursework: design and automation of a line that builds five skateboard models (penny, waveboard, classic, longboard and cruiser) from plastic and wooden parts. It covers the plant design (cells, storage, AGV and conveyor transport), its simulation in FlexSim and the control of the injection moulding cell.'
      },
      aportacion: { es: 'La programación del PLC de la célula de moldeo por inyección.', en: 'Programming the PLC of the injection moulding cell.' },
      puntos: [
        { es: '<b>GRAFCET de nivel 2</b> del proceso y código en bloques de función multiinstancia (FB/FC) para la inyectora, el robot, los pistones y las cintas.', en: '<b>Level-2 GRAFCET</b> of the process, coded as multi-instance function blocks (FB/FC) for the injection machine, the robot, the pistons and the conveyors.' },
        { es: '<b>Señales analógicas</b> con escalado: temperatura por termopar y clasificación de piezas por peso.', en: '<b>Analogue signals</b> with scaling: thermocouple temperature and part sorting by weight.' },
        { es: '<b>Modos de marcha y paradas de emergencia</b>, identificación de moldes por RFID y pruebas unitarias de los bloques.', en: '<b>Operating modes and emergency stops</b>, mould identification via RFID, and unit tests of the blocks.' }
      ],
      tecnologias: ['PLC S7-1500', 'TIA Portal', 'GRAFCET', 'FlexSim', 'RFID'],
      galeria: [
        { tipo: 'img', src: 'assets/proyectos/skate/grafcet.webp', pie: { es: 'GRAFCET general de la célula de inyección', en: 'Overall GRAFCET of the injection cell' } },
        { tipo: 'img', src: 'assets/proyectos/skate/celda.webp', pie: { es: 'Distribución de la célula de inyección', en: 'Injection cell layout' } },
        { tipo: 'img', src: 'assets/proyectos/skate/grafcet-robot.webp', pie: { es: 'GRAFCET del robot de la célula', en: 'GRAFCET of the cell robot' } },
        { tipo: 'img', src: 'assets/proyectos/skate/codigo.webp', pie: { es: 'Gestión de la emergencia en el PLC', en: 'Emergency handling in the PLC' } },
        { tipo: 'img', src: 'assets/proyectos/skate/flexsim.webp', pie: { es: 'Modelo de la planta en FlexSim', en: 'Plant model in FlexSim' } },
        { tipo: 'img', src: 'assets/proyectos/skate/estados.webp', pie: { es: 'Ocupación de las máquinas en la simulación', en: 'Machine utilisation in the simulation' } },
        { tipo: 'img', src: 'assets/proyectos/skate/layout.webp', pie: { es: 'Plano de la planta', en: 'Plant layout drawing' } }
      ]
    },
    {
      id: 'zerospoil',
      titulo: { es: 'ZeroSpoil: nevera inteligente contra el desperdicio', en: 'ZeroSpoil: a smart fridge against food waste' },
      resumen: { es: 'Kit con cámara y visión artificial que convierte cualquier nevera en inteligente para tirar menos comida. Hecho en 48 horas.', en: 'A camera-and-computer-vision kit that turns any fridge into a smart one, so less food goes to waste. Built in 48 hours.' },
      fechas: { es: 'Feb – mar 2026 · 48 h', en: 'Feb – Mar 2026 · 48 h' },
      estado: 'terminado',
      categorias: ['embebidos', 'software'],
      equipo: { es: 'Invent For The Planet 2026 · UPM-ETSIDI · equipo de 5', en: 'Invent For The Planet 2026 · UPM-ETSIDI · team of 5' },
      portada: 'assets/proyectos/zerospoil/ilustracion.svg',
      contexto: {
        es: 'Invent For The Planet es una competición internacional de 48 horas para estudiantes de ingeniería. En 2026 el tema eran los sistemas alimentarios y elegimos el reto del desperdicio: un tercio de la comida que se produce se pierde o se tira. Nuestra propuesta, la Smart-Shelf Box: escanear con la app, guardar, reconocer el producto y avisar antes de que se estropee.',
        en: 'Invent For The Planet is a 48-hour international competition for engineering students. In 2026 the theme was food systems and we chose the food-waste challenge: a third of all food produced is lost or thrown away. Our proposal, the Smart-Shelf Box: scan with the app, store, recognise the product and get a warning before it goes off.'
      },
      aportacion: { es: 'Hice un poco de todo; la visión artificial, el pitch y la edición del vídeo fueron solo míos.', en: 'I worked on a bit of everything; the computer vision, the pitch and the video editing were mine alone.' },
      puntos: [
        { es: '<b>Visión artificial:</b> una demo con OpenCV que funcionaba, basada en la detección de colores.', en: '<b>Computer vision:</b> a working OpenCV demo based on colour detection.' },
        { es: '<b>Hardware propuesto:</b> Raspberry Pi Zero 2 W con la IA en local, cámara Sony IMX708 gran angular con HDR, batería LiPo y antena wifi flexible para sacar la señal de la nevera; el prototipo, en maqueta.', en: '<b>Proposed hardware:</b> a Raspberry Pi Zero 2 W running the AI locally, a wide-angle Sony IMX708 camera with HDR, a LiPo battery and a flexible Wi-Fi antenna to get the signal out of the fridge; the prototype was a mock-up.' },
        { es: '<b>Pitch y vídeo:</b> presenté el proyecto al jurado y edité el vídeo oficial del equipo.', en: '<b>Pitch and video:</b> I pitched the project to the judges and edited the team’s official video.' }
      ],
      tecnologias: ['OpenCV', { es: 'Visión artificial', en: 'Computer vision' }, 'Pitch', { es: 'Edición de vídeo', en: 'Video editing' }],
      galeria: [
        { tipo: 'img', src: 'assets/proyectos/zerospoil/ilustracion.svg', pie: { es: 'Ilustración del concepto (no hay fotos del prototipo)', en: 'Illustration of the concept (there are no photos of the prototype)' } }
      ]
    },
    {
      id: 'navia',
      titulo: { es: 'EMT NAVIA: asistente de navegación con IA', en: 'EMT NAVIA: an AI navigation assistant' },
      resumen: { es: 'Caso de negocio de un asistente con visión e IA para que una persona con discapacidad visual suba sola al autobús.', en: 'Business case for a vision-and-AI assistant that helps visually impaired people board the bus on their own.' },
      fechas: { es: 'Primavera de 2026', en: 'Spring 2026' },
      estado: 'terminado',
      categorias: ['cloud'],
      equipo: { es: 'Programa OA6 · IBM Consulting, EMT Madrid y UPM · equipo de 5', en: 'OA6 programme · IBM Consulting, EMT Madrid and UPM · team of 5' },
      portada: 'assets/proyectos/oa6/evento.webp',
      contexto: {
        es: 'Reto del Programa de Emprendimiento Tecnológico OA6 – Soluciones de IA: un asistente que cubre la «última yarda», el tramo desde la parada hasta la puerta del autobús, para una persona con discapacidad visual.',
        en: 'Challenge of the OA6 Tech Entrepreneurship Programme – AI Solutions: an assistant that covers the “last yard”, from the bus stop to the bus door, for a visually impaired person.'
      },
      aportacion: { es: 'Del concepto técnico al caso de negocio, en un equipo de cinco.', en: 'From the technical concept to the business case, in a team of five.' },
      puntos: [
        { es: '<b>Edge AI:</b> modelos open source con la inferencia en el propio móvil, sin coste de servidores.', en: '<b>Edge AI:</b> open-source models running inference on the phone itself, with no server costs.' },
        { es: '<b>Privacy-by-design:</b> no se guarda ninguna imagen (RGPD).', en: '<b>Privacy by design:</b> no images are stored (GDPR).' },
        { es: '<b>Interfaz inclusiva:</b> feedback háptico y auriculares de conducción ósea, que no tapan el ruido del tráfico.', en: '<b>Inclusive interface:</b> haptic feedback and bone-conduction headphones that do not block traffic noise.' },
        { es: '<b>Negocio:</b> semanas de Design Thinking y Lean Canvas, validando el caso con expertos en las oficinas de IBM y EMT Madrid.', en: '<b>Business:</b> weeks of Design Thinking and Lean Canvas, validating the case with experts at IBM and EMT Madrid.' }
      ],
      tecnologias: ['Edge AI', { es: 'Visión artificial', en: 'Computer vision' }, 'Design Thinking', 'Lean Canvas'],
      galeria: [
        { tipo: 'img', src: 'assets/proyectos/oa6/evento.webp', pie: { es: 'Final del programa en la UPM', en: 'Programme final at UPM' } }
      ],
      enlaces: [
        { texto: { es: 'Lo conté en LinkedIn', en: 'My LinkedIn post (Spanish)' }, url: 'https://www.linkedin.com/feed/update/urn%3Ali%3AugcPost%3A7463889643403440128' }
      ]
    },
    {
      id: 'chess',
      titulo: { es: 'Chess Quest: ajedrez en C++', en: 'Chess Quest: a chess game in C++' },
      resumen: { es: 'Videojuego de ajedrez con dos variantes y rival por IA, en C++ con POO y OpenGL.', en: 'A chess video game with two variants and an AI opponent, written in C++ with OOP and OpenGL.' },
      fechas: { es: 'Feb – may 2025', en: 'Feb – May 2025' },
      estado: 'terminado',
      categorias: ['software'],
      equipo: { es: 'Informática Industrial (3.º) · equipo de 5', en: 'Industrial Computing course (3rd year) · team of 5' },
      portada: 'assets/proyectos/chess/portada.webp',
      contexto: {
        es: 'Trabajo final de Informática Industrial: un ajedrez con interfaz gráfica y dos variantes en tableros pequeños, Silverman 4x5 y Demichess. Estética retro de fantasía con sprites animados y sonido, modo de dos jugadores y modo contra una IA con cinco estrategias (agresiva, defensiva, táctica, aleatoria y adaptativa).',
        en: 'Final project for Industrial Computing: a chess game with a graphical interface and two small-board variants, Silverman 4x5 and Demichess. Retro fantasy look with animated sprites and sound, a two-player mode and a mode against an AI with five strategies (aggressive, defensive, tactical, random and adaptive).'
      },
      aportacion: { es: 'La lógica del tablero y la interacción del jugador.', en: 'The board logic and player interaction.' },
      puntos: [
        { es: '<b>Arquitectura en clases</b> (POO): coordinador, mundo, tablero, reglas, menú y una clase abstracta para las piezas.', en: '<b>Class-based architecture</b> (OOP): coordinator, world, board, rules, menu and an abstract piece class.' },
        { es: '<b>Tablero:</b> piezas sobre la matriz y comunicación entre el mundo y el tablero para moverlas con el ratón.', en: '<b>Board:</b> pieces on the board matrix and communication between the world and the board to move them with the mouse.' },
        { es: '<b>Validación de jugadas</b>, resaltado de los movimientos posibles y un validador que impide las jugadas que dejarían al rey en jaque.', en: '<b>Move validation</b>, highlighting of legal moves and a validator that blocks moves leaving the king in check.' },
        { es: '<b>Trabajo en equipo con Git y GitHub:</b> ramas, resolución de conflictos y más de 200 commits.', en: '<b>Teamwork with Git and GitHub:</b> branches, conflict resolution and more than 200 commits.' }
      ],
      tecnologias: ['C++', { es: 'POO', en: 'OOP' }, 'OpenGL', 'Git'],
      galeria: [
        { tipo: 'video', src: 'assets/proyectos/chess/partida.mp4', poster: 'assets/proyectos/chess/partida.webp', pie: { es: 'Partidas en los escenarios del juego', en: 'Games on the different boards' } },
        { tipo: 'img', src: 'assets/proyectos/chess/portada.webp', pie: { es: 'Movimientos posibles resaltados en verde', en: 'Legal moves highlighted in green' } },
        { tipo: 'video', src: 'assets/proyectos/chess/menu.mp4', poster: 'assets/proyectos/chess/tablero.webp', pie: { es: 'Menú: modo de juego, escenario y variante', en: 'Menu: game mode, board and variant' } },
        { tipo: 'img', src: 'assets/proyectos/chess/victoria.webp', pie: { es: 'Pantalla de victoria', en: 'Victory screen' } }
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
      { src: 'assets/premios/alia-entrega.webp', pie: { es: 'Entrega de premios', en: 'Award ceremony' } }
    ],
    enlace: 'https://www.linkedin.com/feed/update/urn%3Ali%3AugcPost%3A7421991732231430144'
  },

  certificados: [
    { titulo: { es: 'Programa de Emprendimiento Tecnológico OA6 – Soluciones de IA', en: 'OA6 Tech Entrepreneurship Programme – AI Solutions' }, entidad: 'IBM Consulting · EMT Madrid · UPM', fecha: { es: 'May 2026', en: 'May 2026' } },
    { titulo: { es: 'AI Capabilities and Limitations', en: 'AI Capabilities and Limitations' }, entidad: 'Anthropic', fecha: { es: 'Oct 2026', en: 'Oct 2026' }, url: 'https://verify.skilljar.com/c/6cajj5chmk34' }
  ],

  experiencia: [
    {
      empresa: 'NTT DATA',
      puesto: { es: 'Digital Architect (prácticas)', en: 'Digital Architect (intern)' },
      fechas: { es: 'Oct 2026 – actualidad', en: 'Oct 2026 – present' },
      lugar: { es: 'Madrid · híbrido', en: 'Madrid · hybrid' },
      actual: true,
      contexto: { es: 'AI Engineering Talent Factory: formación y proyectos en Digital Architecture, DevOps e IA agéntica.', en: 'AI Engineering Talent Factory: training and projects in Digital Architecture, DevOps and agentic AI.' },
      puntos: [
        { es: 'Infraestructura en Microsoft Azure definida como código con Terraform y CI/CD con GitHub Actions.', en: 'Microsoft Azure infrastructure defined as code with Terraform, and CI/CD with GitHub Actions.' },
        { es: 'Contenedores con Docker y Kubernetes; desarrollo asistido por IA (Claude Code) con Git y code review.', en: 'Containers with Docker and Kubernetes; AI-assisted development (Claude Code) with Git and code review.' }
      ]
    },
    {
      empresa: 'CREA-ETSIDI',
      puesto: { es: 'Desarrollador de robótica', en: 'Robotics developer' },
      fechas: { es: 'Feb 2023 – actualidad', en: 'Feb 2023 – present' },
      lugar: { es: 'Club de robótica de la UPM', en: 'UPM robotics club' },
      actual: true,
      contexto: { es: 'Club de robótica de la ETSIDI: prototipos de hardware y software para proyectos propios y competiciones universitarias.', en: 'The ETSIDI robotics club: hardware and software prototypes for our own projects and university competitions.' },
      puntos: [
        { es: 'Instructor del curso oficial de Arduino del club: electrónica y programación en C++.', en: 'Instructor of the club’s official Arduino course: electronics and C++ programming.' },
        { es: 'Diseño, montaje y programación de robots, de vehículos RC a TunaBot (con el CSIC) y EUROBOT 2027.', en: 'Design, assembly and programming of robots, from RC vehicles to TunaBot (with CSIC) and EUROBOT 2027.' }
      ]
    },
    {
      empresa: 'UPM MotoStudent Petrol',
      puesto: { es: 'Miembro del departamento de electrónica', en: 'Electronics department member' },
      fechas: { es: 'Nov 2024 – jun 2026', en: 'Nov 2024 – Jun 2026' },
      lugar: { es: 'Madrid', en: 'Madrid' },
      contexto: { es: 'Equipo de la UPM que diseña y construye una moto de competición para MotoStudent, la competición internacional entre universidades.', en: 'The UPM team that designs and builds a racing motorcycle for MotoStudent, the international university competition.' },
      puntos: [
        { es: 'Desarrollo de un dashboard de telemetría a medida que lee el bus OBD-II de la moto.', en: 'Development of a custom telemetry dashboard that reads the bike’s OBD-II bus.' },
        { es: 'Esquemas y documentación en OrCAD; diagnóstico y reparación de fallos de electrónica en competición.', en: 'Schematics and documentation in OrCAD; diagnosing and fixing electronics failures during competition.' }
      ]
    }
  ],

  formacion: [
    {
      centro: 'Universidad Politécnica de Madrid · ETSIDI',
      titulo: { es: 'Grado en Ingeniería Electrónica Industrial y Automática', en: 'BSc in Industrial Electronics and Automation Engineering' },
      fechas: { es: 'Sep 2022 – jun 2027 (previsto)', en: 'Sep 2022 – Jun 2027 (expected)' },
      actual: true,
      texto: {
        es: 'Asignaturas relevantes: Sistemas Electrónicos Digitales (VHDL en FPGA con Vivado; C en STM32F4 con HAL), Automatización Industrial (TIA Portal, S7-1500, GRAFCET), Ingeniería de Control e Informática Industrial (C++).',
        en: 'Relevant courses: Digital Electronic Systems (VHDL on FPGA with Vivado; C on STM32F4 with HAL), Industrial Automation (TIA Portal, S7-1500, GRAFCET), Control Engineering and Industrial Computing (C++).'
      }
    },
    {
      centro: 'NTT DATA · AI Engineering Talent Factory',
      titulo: { es: 'Formación en cloud y DevOps', en: 'Cloud and DevOps training' },
      fechas: { es: 'Oct 2026 – actualidad', en: 'Oct 2026 – present' },
      texto: {
        es: 'Microsoft Azure (ruta completa de AZ-900 con proyectos guiados), Docker, Kubernetes, Terraform y GitHub Actions, dentro de las prácticas.',
        en: 'Microsoft Azure (full AZ-900 learning path with guided projects), Docker, Kubernetes, Terraform and GitHub Actions, as part of my internship.'
      }
    },
    {
      centro: 'IES Magallanes · Tenerife',
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
        { n: 'VHDL', tags: [] }, { n: 'FPGA (Vivado)', tags: [] }, { n: 'I2C', tags: ['I2C'] }
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
      icono: 'codigo', titulo: { es: 'Software', en: 'Software' },
      items: [
        { n: 'Python', tags: ['Python'] }, { n: 'OpenCV', tags: ['OpenCV'] }, { n: 'MATLAB', tags: ['MATLAB'] },
        { n: 'OpenGL', tags: ['OpenGL'] }, { n: 'Git · GitHub', tags: ['Git'] }, { n: 'Linux', tags: [] },
        { n: 'FastAPI', tags: ['FastAPI'] }, { n: 'React · TypeScript', tags: ['React', 'TypeScript'] }
      ]
    },
    {
      icono: 'nube', titulo: { es: 'Cloud, DevOps e IA', en: 'Cloud, DevOps & AI' },
      items: [
        { n: 'Microsoft Azure', tags: ['Microsoft Azure'] }, { n: 'Terraform', tags: ['Terraform'] },
        { n: 'Docker', tags: ['Docker'] }, { n: 'Kubernetes', tags: [] }, { n: 'GitHub Actions', tags: ['GitHub Actions'] },
        { n: 'Claude Code · MCP', tags: ['Claude / MCP'] }, { n: 'Prompt engineering', tags: [] },
        { n: 'Home Assistant', tags: ['Home Assistant'] }
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
    { dibujo: 'micro', titulo: { es: 'Microcontroladores', en: 'Microcontrollers' }, texto: 'ESP32 · STM32 · Arduino · Raspberry Pi · I2C' },
    { dibujo: 'fpga', titulo: 'FPGA', texto: 'VHDL · Vivado' },
    { dibujo: 'plc', titulo: { es: 'Automatización', en: 'Automation' }, texto: 'PLC S7-1500 · TIA Portal · GRAFCET · RFID' },
    { dibujo: 'pcb', titulo: { es: 'Electrónica', en: 'Electronics' }, texto: { es: 'Diseño de circuitos · OrCAD · OBD-II', en: 'Circuit design · OrCAD · OBD-II' } },
    { dibujo: 'simulacion', titulo: { es: 'Simulación', en: 'Simulation' }, texto: 'MATLAB · FlexSim' },
    { dibujo: 'cad', titulo: { es: 'Diseño 3D', en: '3D design' }, texto: { es: 'Fusion 360 · Impresión 3D', en: 'Fusion 360 · 3D printing' } },
    { dibujo: 'vision', titulo: { es: 'Visión y gráficos', en: 'Vision & graphics' }, texto: 'OpenCV · OpenGL' },
    { dibujo: 'nube', titulo: 'Cloud y DevOps', texto: 'Azure · Docker · Kubernetes · Terraform · GitHub Actions' },
    { dibujo: 'ia', titulo: { es: 'IA', en: 'AI' }, texto: 'Claude Code · MCP · Prompt engineering' },
    { dibujo: 'terminal', titulo: { es: 'Desarrollo', en: 'Development' }, texto: 'Git · Linux · FastAPI · React · Home Assistant' },
    { dibujo: 'idiomas', titulo: { es: 'Idiomas', en: 'Languages' }, texto: { es: 'Español nativo · Inglés B2', en: 'Spanish (native) · English B2' } }
  ],

  // Textos fijos de la interfaz
  textos: {
    es: {
      saltar: 'Saltar al contenido',
      navSobreMi: 'Sobre mí', navProyectos: 'Proyectos', navExperiencia: 'Experiencia', navSkills: 'Skills', navContacto: 'Contacto',
      tema: 'Cambiar entre tema claro y oscuro', idioma: 'Read in English', menu: 'Abrir el menú',
      hola: 'Hola, soy', apasionado: 'Apasionado por', etiquetaPremio: '1.er Premio Nacional · Promptathon ALIA',
      verProyectos: 'Ver proyectos', conectar: 'Conectemos', descargarCV: 'Descargar CV',
      statCurso: 'curso de GIEIA en la UPM', statCrea: 'años en el club de robótica', statProyectos: 'proyectos en esta web', statPremio: 'premio nacional de IA (ALIA)',
      tituloSobreMi: 'Sobre mí', ahoraMismo: 'Ahora mismo', actualizado: 'Actualizado en',
      tituloProyectos: 'Proyectos', subProyectos: 'Lo que he diseñado, montado y programado: en clase, en el club de robótica y por mi cuenta.',
      todos: 'Todos', filtrandoPor: 'Mostrando proyectos con', quitarFiltro: 'Quitar filtro', verMas: 'Ver más',
      enCurso: 'En curso', terminado: 'Terminado',
      contexto: 'El proyecto', aportacion: 'Mi parte', tecnologias: 'Tecnologías', cerrar: 'Cerrar',
      anterior: 'Anterior', siguiente: 'Siguiente', copiarEnlace: 'Copiar enlace', enlaceCopiado: '¡Enlace copiado!',
      tituloPremios: 'Premios y certificados', verPost: 'Ver en LinkedIn', verificar: 'Verificar',
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
      hola: 'Hi, I’m', apasionado: 'Passionate about', etiquetaPremio: '1st National Prize · ALIA Promptathon',
      verProyectos: 'See my projects', conectar: 'Let’s connect', descargarCV: 'Download CV',
      statCurso: 'year of my engineering degree at UPM', statCrea: 'years in the robotics club', statProyectos: 'projects on this site', statPremio: 'national AI prize (ALIA)',
      tituloSobreMi: 'About me', ahoraMismo: 'Right now', actualizado: 'Updated',
      tituloProyectos: 'Projects', subProyectos: 'Things I have designed, built and programmed: at university, at the robotics club and on my own.',
      todos: 'All', filtrandoPor: 'Showing projects with', quitarFiltro: 'Clear filter', verMas: 'Read more',
      enCurso: 'In progress', terminado: 'Completed',
      contexto: 'The project', aportacion: 'My part', tecnologias: 'Tech stack', cerrar: 'Close',
      anterior: 'Previous', siguiente: 'Next', copiarEnlace: 'Copy link', enlaceCopiado: 'Link copied!',
      tituloPremios: 'Awards and certificates', verPost: 'See on LinkedIn', verificar: 'Verify',
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
