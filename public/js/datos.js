/* ══════════════════════════════════════════════════════════
   DATOS BASE — Clara Alva Mas, bachiller en Arquitectura
   Se usan cuando Firebase aún no está configurado o el
   documento "portafolio/contenido" todavía no existe.
   Desde /admin.html se edita todo esto y se guarda en
   Firestore; el sitio público lee primero Firestore.
   ══════════════════════════════════════════════════════════ */
export const DATOS_BASE = {
  autor: 'Clara Alva Mas',
  anio: '2026',
  tituloPortada: 'Portfolio',

  perfil: {
    foto: '',
    intro: 'Hola. Soy bachiller en Arquitectura por la Universidad de San Martín de Porres, con experiencia en oficina técnica, supervisión de obra y dibujo técnico CAD. Me interesa el proyecto que nace del lugar: entender el entorno, la trama urbana y la vida de las personas antes de dibujar la primera línea. Este portafolio reúne los trabajos académicos y profesionales que mejor resumen esa forma de trabajar.',
    datos: { edad: '', origen: 'Chiclayo, Perú', contacto: 'hilmeralva91@gmail.com', telefono: '+51 978 498 516' },
    educacion: [
      { fecha: '2025', lineas: ['Bachiller en Arquitectura', 'Universidad de San Martín de Porres, Chiclayo'] }
    ],
    idiomas: [
      { nombre: 'Español (lengua materna)', nivel: 100 },
      { nombre: 'Inglés (intermedio)', nivel: 55 }
    ],
    voluntariado: [],
    academica: [
      { fecha: 'Taller IX y X', lineas: ['Colegio Politécnico Residencial para Jóvenes en Estado de Abandono', 'Taller de Diseño Arquitectónico · Chiclayo'] },
      { fecha: 'Taller VIII', lineas: ['Plaza Gastronómica en el distrito de Chiclayo', 'Taller de Diseño Arquitectónico · Chiclayo'] }
    ],
    profesional: [
      { fecha: 'Ene. 2026 – Actualidad', lineas: ['JEEB Vital S.A.C.', 'Rol: Practicante de Oficina Técnica / Apoyo en Supervisión de Obra', 'Metrados y presupuestos básicos, control de actividades programadas, supervisión en campo y coordinación con el personal técnico.'] },
      { fecha: 'Jul. 2025 – Dic. 2025', lineas: ['A&C Corporation S.A.C.', 'Rol: Dibujante Técnico CAD', 'Planos y dibujos técnicos en AutoCAD para infraestructura productiva: carpas solares, tanques tina y galpones de cuyes.'] }
    ],
    comisiones: [],
    cursos: [],
    concursos: [],
    software: [
      { nombre: 'AutoCAD', nivel: 95 }, { nombre: 'SketchUp', nivel: 90 },
      { nombre: 'Enscape', nivel: 70 }, { nombre: 'Lumion', nivel: 70 },
      { nombre: 'Photoshop', nivel: 70 }, { nombre: 'Canva', nivel: 70 }
    ]
  },

  contacto: {
    correo: 'hilmeralva91@gmail.com',
    telefono: '+51 978 498 516',
    ciudad: 'Calle Cantuarias 289, Lima, Perú',
    behance: '', linkedin: '', github: ''
  },

  proyectos: [
    {
      num: '01',
      titulo: 'Plaza Gastronómica',
      subtitulo: 'Mercado gastronómico en el distrito de Chiclayo',
      tipo: 'Equipamiento comercial · Taller VIII',
      ubicacion: 'Urb. Federico Villarreal (Av. Chinchaysuyo / Av. La Libertad / Av. Haya de la Torre), Chiclayo, Lambayeque',
      area: 'Terreno 11 399,69 m² · Área libre 8 712,69 m²',
      anio: '2024',
      duracion: 'Un ciclo académico',
      colaboracion: 'Taller de Diseño Arquitectónico VIII, USMP',
      estructura: 'Sistema constructivo híbrido: concreto y cerchas metálicas',
      rol: 'Diseño arquitectónico, planimetría y visualización · AutoCAD, SketchUp, Enscape',
      parrafos: [
        'El proyecto propone un mercado gastronómico que integra lo comercial, lo cultural y lo turístico en un terreno de 11 399 m² dentro de la trama de Chiclayo. Cuatro volúmenes modulares de tres niveles se apoyan sobre una plataforma común y liberan el 70 % del área como espacio público, frente al 30 % que exige la norma.',
        'El programa se organiza en sótano de estacionamiento (32 plazas), primer nivel de venta y plazas abiertas, y dos niveles superiores de consumo y actividades complementarias. La unidad modular repetida permite crecer por fases y mantener una lectura clara del conjunto.'
      ],
      lista: ['Sótano de estacionamiento (3 585 m²)', 'Plazas y calles peatonales', 'Puestos de venta y cocinas', 'Zonas de consumo en altura', 'Espacios culturales complementarios', 'Rehabilitación del entorno urbano'],
      pregunta: ['¿Cómo convertir un mercado en una', 'plaza', 'que active su barrio?'],
      desarrollo: [
        'Las estrategias urbanas se definieron primero: una conexión vehicular entre la Av. Libertad y la Av. Víctor Raúl, un sistema de calles exclusivamente peatonales que enlaza los equipamientos vecinos y la rehabilitación de áreas en deterioro como espacios públicos.',
        'La estructura combina columnas y vigas de concreto con cerchas metálicas vistas que cubren las luces mayores; la envolvente alterna ladrillo caravista rojo, muros cortina y vidrio templado de 8 mm, de modo que los frentes comerciales se abran a la plaza.'
      ],
      pies: ['Estrategias urbanas', 'Volumetría y estructura', 'Entorno y emplazamiento', 'Elevaciones', 'Cortes transversales', 'Planta general', 'Vista exterior desde la plaza'],
      img: {
        mapa: 'img/plaza-ubicacion.jpg',
        principal: 'img/plaza-sintesis.jpg',
        dev: ['img/plaza-estrategias.jpg', 'img/plaza-estructura.jpg', 'img/plaza-entorno.jpg', 'img/plaza-elevaciones.jpg', 'img/plaza-cortes.jpg', 'img/plaza-planta.jpg', 'img/plaza-render.jpg']
      }
    },
    {
      num: '02',
      titulo: 'Colegio Politécnico Residencial',
      subtitulo: 'Para jóvenes en estado de abandono',
      tipo: 'Equipamiento educativo · Taller IX y X',
      ubicacion: 'Chiclayo, Lambayeque',
      anio: '2025',
      duracion: 'Dos ciclos académicos',
      colaboracion: 'Taller de Diseño Arquitectónico IX y X, USMP',
      rol: 'Diseño arquitectónico y desarrollo del proyecto · AutoCAD, SketchUp, Lumion',
      parrafos: [
        'Complejo educativo y residencial orientado a la formación técnica y al desarrollo integral de jóvenes en situación de vulnerabilidad. El proyecto une en un solo conjunto los talleres politécnicos, las aulas, la residencia y los espacios de convivencia, de manera que aprender, vivir y compartir ocurran en el mismo lugar.',
        'La propuesta se apoya en patios y recorridos protegidos que separan las zonas de estudio de las de descanso sin aislarlas, y en una escala doméstica para la residencia que evita la imagen institucional.'
      ],
      lista: ['Talleres politécnicos', 'Aulas y biblioteca', 'Residencia estudiantil', 'Comedor y servicios', 'Áreas deportivas y patios', 'Administración y bienestar'],
      pregunta: ['¿Puede la arquitectura ofrecer un', 'hogar', 'y un oficio a la vez?'],
      desarrollo: [
        'El proyecto de tesis se desarrolló a lo largo de dos talleres: el primero centrado en el diagnóstico social y urbano y en el programa; el segundo, en el desarrollo arquitectónico, estructural y de detalle.',
        'Los planos y visualizaciones de esta sección se irán incorporando desde el administrador del portafolio.'
      ],
      pies: ['Diagnóstico urbano', 'Programa y zonificación', 'Emplazamiento', 'Planta general', 'Cortes', 'Residencia', 'Vista del conjunto'],
      img: { mapa: '', principal: '', dev: ['', '', '', '', '', '', ''] }
    },
    {
      num: '03',
      titulo: 'Infraestructura Productiva',
      subtitulo: 'Dibujo técnico para A&C Corporation S.A.C.',
      tipo: 'Experiencia profesional · Dibujo CAD',
      ubicacion: 'Perú',
      anio: '2025',
      duracion: '6 meses',
      colaboracion: 'A&C Corporation S.A.C.',
      rol: 'Dibujante Técnico CAD · AutoCAD',
      parrafos: [
        'Elaboración de planos y dibujos técnicos en AutoCAD para proyectos de infraestructura productiva: carpas solares, tanques tina y galpones de cuyes. Cada propuesta gráfica debía ser clara para el cliente y, a la vez, útil en obra.',
        'El trabajo incluyó la representación y documentación técnica de los proyectos, así como la organización y actualización de los planos para su presentación y ejecución.'
      ],
      lista: ['Carpas solares', 'Tanques tina', 'Galpones de cuyes', 'Propuestas gráficas para el cliente', 'Documentación técnica para ejecución'],
      pregunta: ['¿Cómo dibujar para que el plano se', 'construya', 'tal como se pensó?'],
      desarrollo: [
        'Los planos se organizaron por sistemas (estructura, cerramiento, instalaciones) con una misma plantilla de láminas, lo que redujo errores entre versiones y facilitó las revisiones con el equipo técnico.',
        'Las imágenes de esta sección se pueden añadir desde el administrador con la autorización de la empresa.'
      ],
      pies: ['Planta de carpa solar', 'Detalle de tanque tina', 'Galpón de cuyes', 'Corte de galpón', 'Propuesta gráfica', 'Lámina de presentación', 'Detalle constructivo'],
      img: { mapa: '', principal: '', dev: ['', '', '', '', '', '', ''] }
    },
    {
      num: '04',
      titulo: 'Oficina Técnica y Obra',
      subtitulo: 'Prácticas en JEEB Vital S.A.C.',
      tipo: 'Experiencia profesional · Supervisión de obra',
      ubicacion: 'Lima, Perú',
      anio: '2026',
      duracion: 'En curso',
      colaboracion: 'JEEB Vital S.A.C.',
      rol: 'Practicante de Oficina Técnica / Apoyo en Supervisión de Obra · Metrados, presupuestos, control de avance',
      parrafos: [
        'Elaboración de metrados y presupuestos básicos de obra para el seguimiento de proyectos, apoyo en el control de las actividades constructivas programadas y supervisión en campo con verificación del avance de los trabajos.',
        'La coordinación con el personal técnico para cumplir las actividades planificadas cierra el ciclo entre el plano y la obra construida: lo que se dibuja en oficina se comprueba en campo.'
      ],
      lista: ['Metrados y presupuestos básicos', 'Cronograma y control de avance', 'Supervisión en campo', 'Coordinación con personal técnico', 'Informes de seguimiento'],
      pregunta: ['¿Qué aprende el proyecto cuando se', 'mide', 'en la obra?'],
      desarrollo: [
        'Cada semana se comparan las partidas programadas con las ejecutadas y se registran las diferencias en el metrado, lo que permite ajustar el presupuesto antes de que la desviación crezca.',
        'Las fotografías de obra y formatos de control se pueden añadir desde el administrador.'
      ],
      pies: ['Formato de metrado', 'Control de avance', 'Presupuesto básico', 'Registro fotográfico', 'Coordinación en campo', 'Verificación de partidas', 'Informe de seguimiento'],
      img: { mapa: '', principal: '', dev: ['', '', '', '', '', '', ''] }
    }
  ]
};

/* Proyecto vacío que usa el administrador al pulsar "Añadir proyecto" */
export const PROYECTO_VACIO = () => ({
  num: '', titulo: 'Nuevo proyecto', subtitulo: '', tipo: '', ubicacion: '', area: '', anio: '',
  duracion: '', colaboracion: '', estructura: '', rol: '',
  parrafos: ['', ''], lista: [], pregunta: ['¿', '', '?'], desarrollo: ['', ''],
  pies: ['', '', '', ''], img: { mapa: '', principal: '', dev: ['', '', '', '', '', '', ''] }
});
