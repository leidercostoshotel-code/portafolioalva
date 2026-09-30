/* ══════════════════════════════════════════════════════════
   DATOS DE EJEMPLO
   Se usan cuando Firebase aún no está configurado o el
   documento "portafolio/contenido" todavía no existe.
   Desde /admin.html se edita todo esto y se guarda en
   Firestore; el sitio público lee primero Firestore.
   ══════════════════════════════════════════════════════════ */
export const DATOS_BASE = {
  autor: 'Leider Tisnado Mego',
  anio: '2026',
  tituloPortada: 'Portfolio',

  perfil: {
    foto: '',
    intro: 'Hola. Para este portafolio he seleccionado los proyectos que, como profesional de control de costos y desarrollador independiente, me han permitido unir dos mundos: la operación diaria de un negocio y la tecnología que la hace más clara. Me interesa cómo una herramienta bien diseñada cambia la forma en que un equipo decide y trabaja.',
    datos: { edad: '[XX]', origen: 'Lima, Perú', contacto: '[correo@ejemplo.com]', telefono: '[+51 999 999 999]' },
    educacion: [
      { fecha: '2014 – 2019', lineas: ['Bachiller en Administración de Empresas', 'Universidad Inca Garcilaso de la Vega'] },
      { fecha: '2023', lineas: ['Especialización en Supply Chain Management', 'Escuela de Postgrado UPC'] }
    ],
    idiomas: [
      { nombre: 'Español nativo', nivel: 100 },
      { nombre: 'Inglés (intermedio)', nivel: 55 }
    ],
    voluntariado: [
      { fecha: '2022 – 2024', lineas: ['Mentoría en herramientas digitales', 'Programa de formación para pequeños negocios de barrio'] }
    ],
    academica: [
      { fecha: '2019', lineas: ['Tesis de grado: gestión de inventarios en servicios de alimentación', 'Universidad Inca Garcilaso de la Vega'] },
      { fecha: '2023', lineas: ['Proyecto final: rediseño del flujo de compras y almacén', 'Escuela de Postgrado UPC'] },
      { fecha: '2024', lineas: ['Curso: analítica de datos aplicada a operaciones', 'Formación en línea, certificado'] }
    ],
    profesional: [
      { fecha: '2021 – Presente', lineas: ['Hotel de cinco estrellas, Lima', 'Rol: Analista de Control de Costos (Alimentos y Bebidas)', 'Objetivo: control de inventarios, costeo de recetas y reportes de consumo con SAP Business One y Oracle MICROS Simphony.'] },
      { fecha: '2022 – Presente', lineas: ['LTM Soluciones Digitales, Lima', 'Rol: Desarrollador independiente', 'Objetivo: diseño y desarrollo de aplicaciones web, plataformas en Firebase y herramientas de automatización para negocios.'] },
      { fecha: '2019 – 2021', lineas: ['Cadena de restaurantes, Lima', 'Rol: Asistente de costos', 'Objetivo: toma de inventarios, conciliación de compras y análisis de mermas.'] }
    ],
    comisiones: [
      { fecha: '2025', lineas: ['Plataforma SaaS de control de costos para hoteles y restaurantes', 'Ubicación: Lima, Perú'] },
      { fecha: '2026', lineas: ['App de rastreo en tiempo real para empresa de delivery', 'Ubicación: Lima, Perú'] },
      { fecha: '2025', lineas: ['Sitio web y catálogo digital para tienda de abarrotes', 'Ubicación: Lima, Perú'] }
    ],
    cursos: [
      { fecha: '2023', lineas: ['Especialización en Supply Chain Management', 'Escuela de Postgrado UPC'] },
      { fecha: '2024', lineas: ['Desarrollo web con JavaScript y Firebase', 'Certificado en línea'] },
      { fecha: '2024', lineas: ['Excel avanzado y automatización con VBA', 'Certificado en línea'] }
    ],
    concursos: [
      { fecha: '2025', lineas: ['Hackatón de soluciones para gastronomía', 'Propuesta: control de mermas con datos en tiempo real'] }
    ],
    software: [
      { nombre: 'Excel', nivel: 95 }, { nombre: 'HTML / CSS', nivel: 90 },
      { nombre: 'SAP B1', nivel: 85 }, { nombre: 'JavaScript', nivel: 80 },
      { nombre: 'MICROS', nivel: 85 }, { nombre: 'Firebase', nivel: 80 },
      { nombre: 'Power BI', nivel: 70 }, { nombre: 'Python', nivel: 60 }
    ]
  },

  contacto: {
    correo: '[correo@ejemplo.com]',
    telefono: '[+51 999 999 999]',
    ciudad: 'Lima, Perú',
    behance: '', linkedin: '', github: ''
  },

  proyectos: [
    {
      num: '01',
      titulo: 'GastroControl Pro',
      subtitulo: 'Plataforma SaaS de control de costos',
      tipo: 'Aplicación web · SaaS',
      ubicacion: 'Lima, Perú (nube)',
      anio: '2025',
      duracion: '8 meses',
      colaboracion: 'Proyecto propio, LTM Soluciones Digitales',
      rol: 'Diseño, desarrollo y despliegue · Firebase, JavaScript, HTML/CSS',
      parrafos: [
        'El proyecto nace de una necesidad observada durante años en operaciones de alimentos y bebidas: el costo real de una receta rara vez coincide con el costo teórico, y la diferencia se descubre tarde. GastroControl Pro centraliza recetas, inventarios y compras en una sola plataforma en la nube, pensada para hoteles y restaurantes de cualquier tamaño.',
        'La interfaz prioriza la lectura rápida de indicadores: costo por plato, margen, mermas y rotación de insumos. Cada módulo se diseñó con la misma lógica de columnas estrechas y jerarquía tipográfica que un reporte impreso, para que el equipo de costos reconozca de inmediato lo que está viendo.'
      ],
      lista: ['Módulo de recetas y escandallos', 'Inventario por almacén', 'Compras y proveedores', 'Panel de indicadores', 'Usuarios y roles', 'Exportación a Excel'],
      pregunta: ['¿Es posible ', 'optimizar', ' los costos de una cocina mediante datos?'],
      desarrollo: [
        'El flujo de datos se modeló primero en papel: qué entra (facturas, inventarios), qué se transforma (recetas) y qué sale (costos, reportes). Ese esquema se convirtió luego en colecciones de Firestore.',
        'Las vistas se construyeron sin frameworks, con componentes ligeros en JavaScript, para mantener el tiempo de carga bajo en conexiones lentas de cocina y almacén.'
      ],
      pies: ['Diagrama de arquitectura', 'Modelo de datos', 'Panel de indicadores', 'Vista de recetas'],
      img: { mapa: '', principal: '', dev: ['', '', '', ''] }
    },
    {
      num: '02',
      titulo: 'Rastreo Delivery',
      subtitulo: 'Seguimiento en tiempo real de pedidos',
      tipo: 'Aplicación móvil web · Mapas',
      ubicacion: 'Lima, Perú',
      anio: '2026',
      duracion: '4 meses',
      colaboracion: 'Empresa de reparto local',
      rol: 'Desarrollo full-stack · Firebase Realtime Database, geolocalización, JavaScript',
      parrafos: [
        'Una empresa de reparto con motorizados necesitaba que sus clientes supieran dónde estaba su pedido sin llamar por teléfono. La solución fue una aplicación web en la que cada repartidor comparte su ubicación y el cliente, con solo un número de pedido, sigue el recorrido en un mapa.',
        'El reto principal fue la precisión y el consumo de batería: se definió una frecuencia de actualización variable según la velocidad del repartidor, y un estado claro para cada etapa del pedido, desde la recolección hasta la entrega.'
      ],
      lista: ['Panel del repartidor', 'Vista de seguimiento del cliente', 'Estados del pedido', 'Historial de rutas', 'Notificaciones de llegada'],
      pregunta: ['¿Cómo ', 'visibilizar', ' un pedido que está en movimiento?'],
      desarrollo: [
        'Se diagramaron los tres actores del sistema —negocio, repartidor y cliente— y los datos que cada uno necesita ver, evitando exponer más información de la necesaria.',
        'La interfaz del cliente se redujo a una sola pantalla: mapa, estado y tiempo estimado. Todo lo demás vive en el panel del negocio.'
      ],
      pies: ['Diagrama de actores', 'Flujo de estados', 'Pantalla de seguimiento', 'Panel del repartidor'],
      img: { mapa: '', principal: '', dev: ['', '', '', ''] }
    },
    {
      num: '03',
      titulo: 'Dashboard de Compras',
      subtitulo: 'Análisis de compras e inventario',
      tipo: 'Analítica · Web app',
      ubicacion: 'Lima, Perú',
      anio: '2026',
      duracion: '5 meses',
      colaboracion: 'Área de costos de una operación hotelera',
      rol: 'Análisis y desarrollo · Vite, JavaScript, Firebase Hosting, Excel',
      parrafos: [
        'Un libro de Excel con más de treinta hojas concentraba todo el análisis de compras e inventario de una operación de alimentos y bebidas. Funcionaba, pero era lento, frágil y solo una persona sabía usarlo. El proyecto migró ese análisis a una aplicación web con los mismos indicadores, pero navegables.',
        'Cada hoja se tradujo en una vista: compras por proveedor, evolución de precios, rotación por almacén y comparación contra presupuesto. Las tablas se acompañan de gráficos en escala de grises que priorizan la tendencia sobre el adorno.'
      ],
      lista: ['Compras por proveedor', 'Evolución de precios', 'Rotación de inventario', 'Comparación con presupuesto', 'Carga de datos desde Excel'],
      pregunta: ['¿Qué revela un ', 'inventario', ' cuando por fin se mide?'],
      desarrollo: [
        'El primer paso fue auditar el Excel original: qué fórmulas se repetían, qué hojas ya nadie usaba y qué indicadores realmente se consultaban cada semana.',
        'Con ese mapa se definió una estructura de datos única desde la que se calculan todas las vistas, eliminando la duplicación de cifras.'
      ],
      pies: ['Mapa de hojas originales', 'Estructura de datos', 'Vista de compras', 'Vista de rotación'],
      img: { mapa: '', principal: '', dev: ['', '', '', ''] }
    },
    {
      num: '04',
      titulo: 'Automatización Excel',
      subtitulo: 'Herramientas para el área de costos',
      tipo: 'Automatización · Excel y HTML',
      ubicacion: 'Lima, Perú',
      anio: '2024 – 2025',
      duracion: 'Continuo',
      colaboracion: 'Equipo de costos y almacén',
      rol: 'Diseño de procesos y desarrollo · Excel, VBA, HTML/JavaScript',
      parrafos: [
        'Un conjunto de herramientas pequeñas que resuelven tareas repetitivas del día a día: conciliación de facturas contra órdenes de compra, formatos de toma de inventario, cálculo de mermas y generación de reportes de consumo. Cada herramienta nació de una hora que se perdía todas las semanas.',
        'Algunas viven en Excel con macros; otras, en un archivo HTML de una sola página que funciona sin instalación y sin internet. La regla común: que cualquier persona del equipo pueda usarlas sin explicación.'
      ],
      lista: ['Conciliación de facturas', 'Formato de inventario', 'Calculadora de mermas', 'Reporte de consumo', 'Plantilla de costeo'],
      pregunta: ['¿Puede una hoja de cálculo ', 'automatizar', ' una rutina completa?'],
      desarrollo: [
        'Antes de programar, cada proceso se dibujó como un diagrama de pasos con sus entradas y salidas, para identificar en qué punto exacto se producía el error humano.',
        'Las herramientas se entregaron con un manual de una página y se ajustaron durante las primeras semanas de uso real.'
      ],
      pies: ['Diagrama de proceso', 'Formato de inventario', 'Herramienta de conciliación', 'Reporte generado'],
      img: { mapa: '', principal: '', dev: ['', '', '', ''] }
    },
    {
      num: '05',
      titulo: 'Tienda Leitime',
      subtitulo: 'Sitio web y catálogo para negocio de barrio',
      tipo: 'Sitio web · Catálogo digital',
      ubicacion: 'Lima, Perú',
      anio: '2025',
      duracion: '2 meses',
      colaboracion: 'Negocio propio de abarrotes, frutas y verduras',
      rol: 'Diseño y desarrollo · HTML, CSS, JavaScript, WhatsApp API',
      parrafos: [
        'Un negocio de abarrotes, frutas y verduras necesitaba un lugar donde sus clientes vieran productos y precios actualizados y pudieran hacer pedidos sin complicaciones. El sitio se diseñó como un catálogo limpio, con fotografías en fondo neutro y un botón de pedido directo por WhatsApp.',
        'El catálogo se administra desde una hoja de cálculo sencilla que alimenta la página, de modo que el negocio actualiza precios sin tocar código. Todo el sitio pesa menos de un megabyte y carga en segundos en un celular básico.'
      ],
      lista: ['Catálogo por categorías', 'Precios actualizables', 'Pedido por WhatsApp', 'Horarios y ubicación', 'Versión móvil'],
      pregunta: ['¿Cómo ', 'acercar', ' un negocio de barrio a la web?'],
      desarrollo: [
        'Se fotografiaron los productos con un mismo encuadre y fondo para lograr un catálogo uniforme, y se definió una grilla de tres columnas que se convierte en una sola en el celular.',
        'El botón de pedido arma el mensaje de WhatsApp con los productos elegidos, evitando cualquier formulario o registro.'
      ],
      pies: ['Grilla del catálogo', 'Ficha de producto', 'Flujo de pedido', 'Versión móvil'],
      img: { mapa: '', principal: '', dev: ['', '', '', ''] }
    }
  ]
};

/* Proyecto vacío que usa el administrador al pulsar "Añadir proyecto" */
export const PROYECTO_VACIO = () => ({
  num: '', titulo: 'Nuevo proyecto', subtitulo: '', tipo: '', ubicacion: '', anio: '',
  duracion: '', colaboracion: '', rol: '',
  parrafos: ['', ''], lista: [], pregunta: ['¿', '', '?'], desarrollo: ['', ''],
  pies: ['', '', '', ''], img: { mapa: '', principal: '', dev: ['', '', '', ''] }
});
