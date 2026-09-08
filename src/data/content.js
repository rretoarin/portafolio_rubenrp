// Toda la copia del sitio vive aquí. Editar textos = editar este archivo,
// nunca los componentes. Cada idioma tiene exactamente las mismas claves.

export const PROFILE = {
  name: 'Rubén Reto Panta',
  nameLines: ['Rubén Reto', 'Panta'], // Cierre a gran escala en el pie.
  initials: 'RR',
  email: 'rubenretopanta@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ruben-reto-panta-1580301a8/',
  linkedinLabel: 'ruben-reto-panta',
  // Avatar en /public. Si es null, la nav vuelve al monograma.
  photo: '/ruben.webp',
  whatsapp: '51933214520', // Formato wa.me: sin +, espacios ni guiones.
  whatsappDisplay: '+51 933 214 520',
  site: 'https://portafolio-rubenrp.vercel.app/',
}

// wa.me abre la conversación en app o en web según el dispositivo.
export function whatsappUrl(message) {
  const base = `https://wa.me/${PROFILE.whatsapp}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

/*
 * Casos. `shots` son capturas reales del sistema en producción, con los datos
 * de cliente difuminados. El orden manda: cada ruta se empareja por índice con
 * `shots` del idioma.
 */
export const PROJECTS = [
  {
    id: 'muestras',
    year: '2026',
    client: 'Arin S.A.',
    sectorKey: 'joyeria',
    url: null, // Sistema interno: no hay demo pública.
    stack: ['React', 'Node.js', 'Express', 'MongoDB'],
    frameLabel: 'arin · desarrollo de muestras',
    shots: [
      '/proyectos/muestras-1.webp',
      '/proyectos/muestras-2.webp',
      '/proyectos/muestras-4.webp',
      '/proyectos/muestras-6.webp',
      '/proyectos/muestras-7.webp',
      '/proyectos/muestras-3.webp',
      '/proyectos/muestras-5.webp',
    ],
  },
  {
    id: 'jm-consulting',
    year: '2026',
    url: 'https://jm-consulting-foods.netlify.app/',
    stack: ['React', 'Node.js', 'MongoDB', 'Netlify'],
    frameLabel: 'jm-consulting-foods.netlify.app',
    shots: [
      '/proyectos/jm-1.webp',
      '/proyectos/jm-2.webp',
      '/proyectos/jm-4.webp',
      '/proyectos/jm-6.webp',
      '/proyectos/jm-3.webp',
      '/proyectos/jm-5.webp',
    ],
  },
]

/*
 * Testimonios reales de clientes. Vacío a propósito: aquí no se inventa nada.
 * Cuando haya uno, se agrega { id, quote: { es, en }, author, role } y la
 * sección aparece sola bajo los casos. Mientras esté vacío no se renderiza.
 */
export const TESTIMONIALS = []

// Sólo se nombra la institución; el detalle del certificado no va en el sitio.
export const UNIVERSITY = 'Pontificia Universidad Católica del Perú'


export const CONTENT = {
  es: {
    langLabel: 'EN',
    langAria: 'Cambiar idioma a inglés',
    nav: {
      problems: 'El problema',
      services: 'Soluciones',
      projects: 'Casos',
      process: 'Cómo trabajo',
      about: 'Sobre mí',
      contact: 'Contacto',
      talk: 'Hablemos',
      menu: 'Menú',
      close: 'Cerrar menú',
    },

    hero: {
      status: 'Disponible para nuevos proyectos',
      kicker: 'Diseño y desarrollo web · Software a medida',
      headline: 'Webs que traen clientes. Sistemas que ordenan el trabajo.',
      lead: 'Diseño y construyo las dos caras de un negocio: el sitio con el que te encuentran y te escriben, y las herramientas internas con las que tu equipo trabaja cada día.',
      leadSecondary:
        'En ambos casos el orden es el mismo: primero entiendo qué necesitas resolver, después lo construyo. Y respondo yo por el resultado.',
      ctaPrimary: 'Hablemos de tu proceso',
      ctaSecondary: 'Ver casos reales',
      sectorsLabel: 'Trabajo con proyectos de cualquier tamaño',
      sectors: [
        'Emprendedores',
        'Negocios locales',
        'Profesionales independientes',
        'Talleres',
        'Consultoras',
        'Empresas',
      ],
      ctaNote: 'Te contesto yo, no un formulario automático.',
      // Se leen como evidencia, no como métricas: cada una es verificable
      // con los dos casos que se muestran más abajo.
      proof: [
        { value: 'En producción', label: 'Una web y un sistema funcionando hoy, no maquetas.' },
        { value: 'De principio a fin', label: 'Del primer boceto al despliegue, sin intermediarios.' },
        { value: 'Trato directo', label: 'Hablas con quien lo construye, sin intermediarios.' },
      ],
    },

    problems: {
      eyebrow: 'El problema',
      title: '¿Algo de esto te suena?',
      subtitle:
        'Casi ningún negocio se atasca por falta de esfuerzo. Se atasca porque por fuera no lo encuentran, o porque por dentro la información vive en sitios distintos y el control depende de que alguien se acuerde.',
      items: [
        {
          title: 'Tu cliente te busca y no te encuentra',
          text: 'Te busca en Google o preguntando. Si lo que encuentra es un perfil sin información o una web que no explica lo que haces, se va con el siguiente.',
        },
        {
          title: 'Nadie sabe con certeza en qué estado está cada cosa',
          text: 'Para saber dónde está un pedido o un trámite hay que preguntar. Y la respuesta depende de a quién le preguntes, porque el control vive en un archivo que entiende una sola persona.',
        },
        {
          title: 'Se va el tiempo en tareas que podrían hacerse solas',
          text: 'Recalcular plazos, avisar de vencimientos, rehacer el mismo reporte cada mes, escribir el mismo dato en dos sitios. Horas que no dejan nada nuevo.',
        },
      ],
      closing:
        'Si has reconocido dos o más, no necesitas comprar software. Necesitas que alguien entienda tu proceso y construya lo que le falta.',
      cta: 'Cuéntame qué está pasando',
    },

    services: {
      eyebrow: 'Soluciones',
      title: 'Lo que puedo diseñar y construir para tu negocio.',
      subtitle:
        'Por fuera y por dentro. No trabajo con un catálogo cerrado: estas son las formas que suele tomar la solución, pero primero está el problema y después la etiqueta.',
      items: [
        {
          title: 'Diseño y desarrollo web',
          text: 'Diseño el sitio y lo construyo: sitios corporativos, landings y catálogos. Con un panel para que cambies el contenido tú mismo, sin llamar a nadie.',
          gain: 'Te encuentran, entienden qué haces y te escriben.',
        },
        {
          title: 'Sistemas internos a medida',
          text: 'Herramientas construidas alrededor de cómo trabaja tu empresa de verdad. Con permisos por persona y el rastro de cada cambio.',
          gain: 'Tu proceso deja de depender de la memoria de alguien.',
        },
        {
          title: 'Automatización de procesos',
          text: 'Lo que hoy se repite a mano cada semana pasa a hacerlo el sistema: plazos, avisos de vencimiento y reportes que se generan solos.',
          gain: 'Menos horas perdidas y menos errores.',
        },
        {
          title: 'Información centralizada y a la vista',
          text: 'Lo que vive repartido entre archivos y correos, reunido en un solo lugar y convertido en indicadores que se leen de un vistazo.',
          gain: 'Decides mirando datos, no intuición.',
        },
      ],
      cta: 'Hablemos de tu proyecto',
    },

    projects: {
      eyebrow: 'Casos',
      title: 'Problemas reales, resueltos.',
      subtitle:
        'Dos sistemas construidos de cero este año y funcionando hoy. En los dos empecé por entender el proceso, no por elegir la tecnología.',
      viewLive: 'Ver el sitio',
      privateLabel: 'Sistema interno · sin acceso público',
      clientLabel: 'Cliente',
      sectorLabel: 'Sector',
      problemLabel: 'El problema',
      solutionLabel: 'Lo que construí',
      resultLabel: 'Qué cambió',
      toolsLabel: 'Construido con',
      detailOpen: 'Ver el detalle del caso',
      detailClose: 'Ocultar el detalle',
      galleryLabel: 'Capturas del sistema',
      openShot: 'Ver la captura a tamaño completo',
      moreShots: '+{n} capturas más',
      closeShot: 'Cerrar la captura',
      prev: 'Captura anterior',
      next: 'Captura siguiente',
      shotOf: 'Captura {i} de {n}',
      evidenceNote: 'Capturas reales del sistema. Los datos de cliente van difuminados.',
      trustLabel: 'Qué puedes esperar',
      trust: [
        {
          title: 'Sistemas en uso, no demos',
          text: 'Los dos casos están desplegados y funcionando: uno dentro de la operación diaria de una empresa y otro público en internet.',
        },
        {
          title: 'Hablas conmigo',
          text: 'No hay ejecutivo de cuenta. Lo que me cuentas lo construyo yo, y a mí me preguntas cuando algo no cuadra.',
        },
        {
          title: 'El control queda contigo',
          text: 'Panel propio y código documentado. Puedes seguir con otra persona el día que quieras, sin quedar atado a mí.',
        },
      ],
      sectors: { joyeria: 'Joyería' },
      items: {
        muestras: {
          name: 'Sistema de Gestión de Muestras',
          tag: 'Herramienta interna de operación',
          impact:
            'Un control que vivía en hojas de cálculo pasó a gestionarse desde una sola plataforma, con la trazabilidad de cada muestra al día.',
          problem:
            'En joyería cada muestra que sale es un activo de valor. El control se llevaba a mano en hojas de cálculo, así que nadie podía saber con certeza dónde estaba cada una, en qué estado ni quién la había tocado.',
          solution:
            'Modelo de datos y aplicación completa: registro y seguimiento por estados, historial firmado de cada movimiento, calendario de cierres con feriados, reportes de vencimientos y accesos por rol.',
          result:
            'En producción como herramienta interna. Cada movimiento queda firmado con autor, fecha y motivo, y cambiar un feriado recalcula los plazos de todo el sistema.',
          shots: [
            'Listado de productos: filtros combinados por estado, cliente, tipo y fecha, con exportación a Excel.',
            'Ficha del producto y su historial: cada cambio queda firmado con autor, fecha y motivo.',
            'Calendario de cierres: el año completo, coloreado por muestras vencidas, por vencer y a tiempo.',
            'Reporte de vencimientos: indicadores, distribución por unidad de negocio y comparativo mensual.',
            'Mantenimiento de feriados: un cambio acá recalcula los plazos de todo el sistema.',
            'Detalle de muestras: foto, kilataje, piezas y fechas de solicitud y entrega.',
            'Al abrir un día del calendario se listan las muestras que cierran esa fecha.',
          ],
        },
        'jm-consulting': {
          name: 'J&M Consulting Foods',
          tag: 'Sitio corporativo + panel de administración',
          impact:
            'Una consultora que dependía de terceros para publicar ahora edita su propio contenido y recibe las consultas ordenadas.',
          problem:
            'Una consultora con un servicio técnico difícil de explicar en pocas líneas. Necesitaba presentar su catálogo de trámites en detalle y recibir consultas ordenadas, sin llamar a un desarrollador cada vez que cambiaba un texto.',
          solution:
            'Diseñé y construí el sitio completo —catálogo, proceso, sectores, portafolio y blog— con varias vías de contacto que abren WhatsApp. Detrás, un panel con acceso autenticado para que publiquen ellos.',
          result:
            'Desplegado con dominio propio y en uso. El equipo gestiona su contenido sin tocar código y recibe las consultas con el mensaje ya armado.',
          shots: [
            'Portada: la propuesta de valor y el paso directo a WhatsApp.',
            'Catálogo de servicios con el detalle de cada trámite y certificación.',
            'Proceso en cuatro etapas y los sectores de alimentos que atienden.',
            'Contacto: el formulario arma el mensaje y lo abre en WhatsApp.',
            'Quiénes somos: equipo, misión y datos verificables de la empresa.',
            'Carrusel de las empresas que ya trabajaron con la consultora.',
          ],
        },
      },
    },

    process: {
      eyebrow: 'Cómo trabajo',
      title: 'Primero entiendo el proceso. Después escribo código.',
      subtitle:
        'Cuatro pasos, siempre los mismos. No es un método con nombre propio: es lo que evita construir la solución correcta al problema equivocado.',
      steps: [
        {
          title: 'Entendemos el problema',
          text: 'Me cuentas cómo funciona hoy el proceso, con sus atajos y sus excepciones. Pregunto hasta entenderlo de verdad, porque casi nunca el problema es exactamente el que se cuenta al principio.',
        },
        {
          title: 'Diseñamos la solución',
          text: 'Defino qué debe mejorar, qué forma tiene la solución y hasta dónde llega el proyecto. Sabes qué incluye y qué no antes de que yo empiece a construir.',
        },
        {
          title: 'Construimos',
          text: 'Desarrollo el sistema por entregas revisables y te voy mostrando avances. Si algo no era lo que tenías en la cabeza, lo corregimos ahí y no al final.',
        },
        {
          title: 'Ponemos en marcha y ajustamos',
          text: 'Despliego la solución, capacito a quien la va a usar y acompaño los primeros días reales. Con el sistema en uso siempre aparecen ajustes: ahí es donde se termina de afinar.',
        },
      ],
    },

    about: {
      eyebrow: 'Sobre mí',
      title: 'Soy Rubén. Trabajas directamente conmigo.',
      quote: 'No tienes que coordinar tres proveedores ni traducir entre ellos.',
      body: [
        'Lo que de verdad me interesa es entender por qué algo funciona mal: por qué un proceso se traba, por qué un dato se escribe tres veces. Casi nunca el problema es el que se cuenta al principio, y encontrar el verdadero ya es la mitad del trabajo.',
        'La otra mitad es construirlo. El diseño, la lógica, la base de datos y la puesta en marcha salen de la misma persona: hablas conmigo de principio a fin, y respondo yo por el resultado.',
      ],
      pillars: [
        {
          title: 'Pregunto antes de proponer',
          text: 'Primero entiendo tu negocio y el problema concreto. La solución sale de ahí, no de un catálogo.',
        },
        {
          title: 'Entrego más rápido',
          text: 'Me apoyo en inteligencia artificial para acelerar el desarrollo. Yo decido cómo se estructura todo y reviso cada cambio: la velocidad no la paga la calidad.',
        },
        {
          title: 'No desaparezco al entregar',
          text: 'Despliegue, dominio, capacitación y un panel propio para que sigas sin depender de mí.',
        },
      ],
      note: 'Construyo con React, Node.js y MongoDB, y elijo la tecnología por lo que el proyecto necesita —cómo va a crecer y cuánto tiene que durar—, no por lo que a mí me resulte cómodo.',
    },


    contact: {
      eyebrow: 'Contacto',
      title: '¿Tienes un proceso que podría funcionar mejor?',
      body: 'Cuéntame qué está ocurriendo hoy: cómo se hace, quién lo hace y dónde se atasca. Con eso te digo si hay algo que se pueda resolver y cómo lo abordaría.',
      bodySecondary:
        'No necesitas tener los detalles técnicos ni saber qué tecnología hace falta. Esa parte me toca a mí.',
      emailLabel: 'Correo',
      linkedinLabel: 'LinkedIn',
      whatsappLabel: 'WhatsApp',
      whatsappAria: 'Escribirme por WhatsApp',
      whatsappHint: 'La vía más rápida',
      whatsappMessage:
        'Hola Rubén, vi tu sitio y quisiera conversar sobre un proceso de mi empresa.',
      cta: 'Hablemos',
      ctaNote: 'Te contesto yo, no un formulario automático.',
      formLabel: 'O escríbeme desde aquí',
      formName: 'Tu nombre',
      formNamePlaceholder: 'Opcional',
      formMessage: '¿Qué está pasando?',
      formMessagePlaceholder:
        'Ej.: llevamos el control de pedidos en Excel y se nos pierden cosas.',
      formSend: 'Enviar por WhatsApp',
      formNote:
        'Se abre WhatsApp con tu mensaje ya escrito. El sitio no guarda nada ni te pide más datos.',
      stepsLabel: 'Qué pasa cuando me escribes',
      steps: [
        'Me cuentas qué está ocurriendo. Dos líneas bastan para empezar.',
        'Conversamos sin compromiso y te digo con franqueza si puedo ayudarte o no.',
        'Si tiene sentido, te mando una propuesta con alcance, plazo y precio cerrado.',
      ],
      copy: 'Copiar correo',
      copied: 'Copiado',
    },

    footer: {
      role: 'Software a medida para empresas',
      tagline: 'Menos trabajo manual. Más control sobre tu operación.',
      rights: 'Todos los derechos reservados.',
      top: 'Volver arriba',
      site: {
        label: 'Sitio',
        lines: ['Diseñado y construido por mí', 'React / Vite / Tailwind CSS', 'Desplegado en Vercel'],
      },
    },
  },

  en: {
    langLabel: 'ES',
    langAria: 'Switch language to Spanish',
    nav: {
      problems: 'The problem',
      services: 'Solutions',
      projects: 'Cases',
      process: 'How I work',
      about: 'About',
      contact: 'Contact',
      talk: 'Let us talk',
      menu: 'Menu',
      close: 'Close menu',
    },

    hero: {
      status: 'Available for new projects',
      kicker: 'Web design and development · Custom software',
      headline: 'Websites that bring clients. Systems that organise the work.',
      lead: 'I design and build both sides of a business: the site people find you through and write to you from, and the internal tools your team works with every day.',
      leadSecondary:
        'In both cases the order is the same: first I understand what needs solving, then I build it. And I answer for the result.',
      ctaPrimary: 'Let us talk about your process',
      ctaSecondary: 'See real cases',
      sectorsLabel: 'I work with projects of any size',
      sectors: [
        'Founders',
        'Local businesses',
        'Independent professionals',
        'Workshops',
        'Consultancies',
        'Companies',
      ],
      ctaNote: 'You get me, not an automated form.',
      proof: [
        { value: 'In production', label: 'A website and a system running today, not mockups.' },
        { value: 'Start to finish', label: 'From the first sketch to deployment, no middlemen.' },
        { value: 'Direct contact', label: 'You talk to the person who builds it.' },
      ],
    },

    problems: {
      eyebrow: 'The problem',
      title: 'Does any of this sound familiar?',
      subtitle:
        'Almost no business gets stuck for lack of effort. It gets stuck because nobody finds it from the outside, or because inside the information lives in different places and control depends on someone remembering.',
      items: [
        {
          title: 'Your client looks for you and cannot find you',
          text: 'They search Google or ask around. If what they find is a profile with no information or a site that does not explain what you do, they move on to the next one.',
        },
        {
          title: 'Nobody knows for certain what state anything is in',
          text: 'To find out where an order or a filing stands, you have to ask. And the answer depends on who you ask, because control lives in a file only one person understands.',
        },
        {
          title: 'Time goes into tasks that could run themselves',
          text: 'Recalculating deadlines, chasing due dates, rebuilding the same report every month, typing the same data in two places. Hours that leave nothing behind.',
        },
      ],
      closing:
        'If you recognised two or more, you do not need to buy software. You need someone to understand your process and build what is missing.',
      cta: 'Tell me what is happening',
    },

    services: {
      eyebrow: 'Solutions',
      title: 'What I can design and build for your business.',
      subtitle:
        'Outside and inside. I do not work from a fixed catalog: these are the shapes the solution usually takes, but the problem comes first and the label second.',
      items: [
        {
          title: 'Web design and development',
          text: 'I design the site and build it: corporate sites, landing pages and catalogues. With a panel so you change the content yourself without calling anyone.',
          gain: 'People find you, understand what you do, and write to you.',
        },
        {
          title: 'Custom internal systems',
          text: 'Tools built around how your company actually works. With per-person permissions and a trace of every change.',
          gain: 'Your process stops depending on someone’s memory.',
        },
        {
          title: 'Process automation',
          text: 'What is repeated by hand every week becomes the system’s job: deadlines, due-date alerts and reports that build themselves.',
          gain: 'Fewer hours lost and fewer mistakes.',
        },
        {
          title: 'Information centralised and visible',
          text: 'What lives scattered across files and emails, gathered in one place and turned into indicators you read at a glance.',
          gain: 'You decide looking at data, not intuition.',
        },
      ],
      cta: 'Let us talk about your project',
    },

    projects: {
      eyebrow: 'Cases',
      title: 'Real problems, solved.',
      subtitle:
        'Two systems built from scratch this year and running today. In both I started by understanding the process, not by picking the technology.',
      viewLive: 'Visit the site',
      privateLabel: 'Internal system · no public access',
      clientLabel: 'Client',
      sectorLabel: 'Sector',
      problemLabel: 'The problem',
      solutionLabel: 'What I built',
      resultLabel: 'What changed',
      toolsLabel: 'Built with',
      detailOpen: 'See the full case',
      detailClose: 'Hide the detail',
      galleryLabel: 'System screens',
      openShot: 'View the screen full size',
      moreShots: '+{n} more screens',
      closeShot: 'Close the screen',
      prev: 'Previous screen',
      next: 'Next screen',
      shotOf: 'Screen {i} of {n}',
      evidenceNote: 'Real screens from the system. Client data is blurred out.',
      trustLabel: 'What you can expect',
      trust: [
        {
          title: 'Systems in use, not demos',
          text: 'Both cases are deployed and running: one inside a company’s daily operation, the other public on the internet.',
        },
        {
          title: 'You talk to me',
          text: 'No account manager. What you tell me I build myself, and I am the one you ask when something does not add up.',
        },
        {
          title: 'You keep control',
          text: 'Your own panel and documented code. You can continue with someone else whenever you want, with nothing tying you to me.',
        },
      ],
      sectors: { joyeria: 'Jewelry' },
      items: {
        muestras: {
          name: 'Sample Management System',
          tag: 'Internal operations tool',
          impact:
            'Control that lived in spreadsheets moved to a single platform, with the traceability of every sample up to date.',
          problem:
            'In jewelry every sample that leaves the building is a valuable asset. Tracking was handled by hand in spreadsheets, so nobody could say for certain where each one was, in what state, or who had touched it.',
          solution:
            'Data model and full application: registration and status tracking, a signed history of every movement, a closing calendar with holidays, due-date reports and role-based access.',
          result:
            'In production as an internal tool. Every movement is signed with author, date and reason, and changing one holiday recalculates deadlines across the whole system.',
          shots: [
            'Product list: combined filters by status, client, type and date, with Excel export.',
            'Product sheet and its history: every change is signed with author, date and reason.',
            'Closing calendar: the full year, colored by overdue, due soon and on-time samples.',
            'Due-date report: indicators, distribution by business unit and month-over-month comparison.',
            'Holiday maintenance: one change here recalculates deadlines across the whole system.',
            'Sample detail: photo, karat, pieces and request and due dates.',
            'Opening a day in the calendar lists the samples closing on that date.',
          ],
        },
        'jm-consulting': {
          name: 'J&M Consulting Foods',
          tag: 'Corporate site + admin panel',
          impact:
            'A consultancy that depended on others to publish now edits its own content and receives enquiries in order.',
          problem:
            'A consultancy with a technical service that is hard to explain in a few lines. It needed to present its catalog of procedures in detail and receive orderly enquiries, without calling a developer every time a text changed.',
          solution:
            'I designed and built the full site — catalog, process, sectors, portfolio and blog — with several contact paths that open WhatsApp. Behind it, a panel with authenticated access so they publish themselves.',
          result:
            'Deployed with a custom domain and in use. The team manages its own content without touching code and receives enquiries with the message already composed.',
          shots: [
            'Home: the value proposition and a direct path to WhatsApp.',
            'Service catalog detailing every procedure and certification.',
            'Four-stage process and the food sectors they serve.',
            'Contact: the form composes the message and opens WhatsApp.',
            'About: team, mission and verifiable company records.',
            'Carousel of the companies that already worked with the consultancy.',
          ],
        },
      },
    },

    process: {
      eyebrow: 'How I work',
      title: 'First I understand the process. Then I write code.',
      subtitle:
        'Four steps, always the same ones. It is not a method with a brand name: it is what stops you building the right solution to the wrong problem.',
      steps: [
        {
          title: 'We understand the problem',
          text: 'You show me how the process works today, shortcuts and exceptions included. I ask until I really get it, because the problem is almost never exactly the one described at the start.',
        },
        {
          title: 'We design the solution',
          text: 'I define what has to improve, what shape the solution takes and how far the project goes. You know what is included and what is not before I start building.',
        },
        {
          title: 'We build',
          text: 'I develop the system in reviewable increments and keep showing you progress. If something was not what you had in mind, we fix it there and not at the end.',
        },
        {
          title: 'We go live and adjust',
          text: 'I deploy the solution, train whoever will use it and stay close through the first real days. With a system in use adjustments always appear: that is where it gets finished properly.',
        },
      ],
    },

    about: {
      eyebrow: 'About',
      title: 'I am Rubén. You work directly with me.',
      quote: 'No juggling three vendors, no translating between them.',
      body: [
        'What actually interests me is understanding why something works badly: why a process gets stuck, why a piece of data gets typed three times. The problem is almost never the one described at the start, and finding the real one is already half the job.',
        'The other half is building it. The design, the logic, the database and going live all come from the same person: you talk to me from start to finish, and I answer for the result.',
      ],
      pillars: [
        {
          title: 'I ask before proposing',
          text: 'First I understand your business and the concrete problem. The solution comes from there, not from a catalog.',
        },
        {
          title: 'I deliver faster',
          text: 'I lean on artificial intelligence to speed up development. I decide how everything is structured and review every change: speed does not come out of quality.',
        },
        {
          title: 'I do not disappear at handoff',
          text: 'Deployment, domain, training and your own panel so you can carry on without depending on me.',
        },
      ],
      note: 'I build with React, Node.js and MongoDB, and I choose the technology for what the project needs — how it will grow and how long it has to last — not for what suits me.',
    },


    contact: {
      eyebrow: 'Contact',
      title: 'Have a process that could work better?',
      body: 'Tell me what is happening today: how it is done, who does it and where it gets stuck. With that I can tell you whether there is something to solve and how I would approach it.',
      bodySecondary:
        'You do not need the technical details or to know which technology it takes. That part is on me.',
      emailLabel: 'Email',
      linkedinLabel: 'LinkedIn',
      whatsappLabel: 'WhatsApp',
      whatsappAria: 'Message me on WhatsApp',
      whatsappHint: 'Fastest way to reach me',
      whatsappMessage:
        'Hi Rubén, I saw your site and would like to discuss a process at my company.',
      cta: 'Let us talk',
      ctaNote: 'You get me, not an automated form.',
      formLabel: 'Or write to me from here',
      formName: 'Your name',
      formNamePlaceholder: 'Optional',
      formMessage: 'What is going on?',
      formMessagePlaceholder:
        'E.g.: we track orders in a spreadsheet and things keep slipping through.',
      formSend: 'Send via WhatsApp',
      formNote:
        'This opens WhatsApp with your message already written. The site stores nothing and asks for nothing else.',
      stepsLabel: 'What happens when you write',
      steps: [
        'You tell me what is going on. Two lines are enough to start.',
        'We talk with no commitment and I tell you honestly whether I can help.',
        'If it makes sense, I send a proposal with scope, timeline and a fixed price.',
      ],
      copy: 'Copy email',
      copied: 'Copied',
    },

    footer: {
      role: 'Custom software for businesses',
      tagline: 'Less manual work. More control over your operation.',
      rights: 'All rights reserved.',
      top: 'Back to top',
      site: {
        label: 'Site',
        lines: ['Designed and built by me', 'React / Vite / Tailwind CSS', 'Deployed on Vercel'],
      },
    },
  },
}
