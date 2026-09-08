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

// Datos estables entre idiomas: URLs, stack, año.
export const PROJECTS = [
  {
    id: 'jm-consulting',
    year: '2026',
    url: 'https://jm-consulting-foods.netlify.app/',
    stack: ['React', 'Vite', 'Node.js', 'MongoDB', 'Netlify'],
    // Lo que se lee en la barra de la ventana que enmarca cada captura.
    frameLabel: 'jm-consulting-foods.netlify.app',
    // El orden manda: cada ruta se empareja por índice con `shots` del idioma.
    shots: [
      '/proyectos/jm-1.webp',
      '/proyectos/jm-2.webp',
      '/proyectos/jm-3.webp',
      '/proyectos/jm-4.webp',
      '/proyectos/jm-5.webp',
      '/proyectos/jm-6.webp',
    ],
  },
  {
    id: 'muestras',
    year: '2026',
    client: 'Arin S.A.',
    url: null, // Sistema interno: no hay demo pública.
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    frameLabel: 'arin · desarrollo de muestras',
    shots: [
      '/proyectos/muestras-1.webp',
      '/proyectos/muestras-2.webp',
      '/proyectos/muestras-3.webp',
      '/proyectos/muestras-4.webp',
      '/proyectos/muestras-5.webp',
      '/proyectos/muestras-6.webp',
      '/proyectos/muestras-7.webp',
    ],
  },
]

/*
 * Testimonios reales de clientes. Vacío a propósito: aquí no se inventa nada.
 * Cuando haya uno, se agrega { id, quote: { es, en }, author, role } y la
 * sección aparece sola bajo los proyectos. Mientras esté vacío no se renderiza.
 */
export const TESTIMONIALS = []

// Sólo se nombra la institución; el detalle del certificado no va en el sitio.
export const UNIVERSITY = 'Pontificia Universidad Católica del Perú'

// Cinta en movimiento: sólo nombres propios, iguales en cualquier idioma.
export const MARQUEE = [
  'React',
  'Node.js',
  'Express',
  'MongoDB',
  'JavaScript',
  'Vite',
  'Tailwind CSS',
  'REST API',
  'JWT',
  'Git',
  'Vercel',
]

export const STACK = [
  {
    id: 'frontend',
    items: ['React', 'JavaScript', 'Vite', 'Tailwind CSS', 'HTML / CSS'],
  },
  {
    id: 'backend',
    items: ['Node.js', 'Express', 'APIs REST', 'JWT / Auth', 'Roles y permisos'],
  },
  {
    id: 'data',
    items: ['MongoDB', 'Mongoose', 'Modelado de datos', 'SQL'],
  },
  {
    id: 'tools',
    items: ['Git', 'Vercel', 'Netlify', 'Postman', 'Figma', 'Claude Code'],
  },
]

// Tecnologías fuera del uso diario que el proyecto puede pedir. Nombres
// propios: no se traducen, por eso viven aquí y no en CONTENT.
export const STACK_OPEN = [
  'Astro',
  'Next.js',
  'TypeScript',
  'Supabase',
  'PostgreSQL',
  'Firebase',
  'WordPress',
  'Python',
]

export const CONTENT = {
  es: {
    langLabel: 'EN',
    langAria: 'Cambiar idioma a inglés',
    nav: {
      services: 'Servicios',
      projects: 'Proyectos',
      process: 'Cómo trabajo',
      about: 'Perfil',
      stack: 'Stack',
      contact: 'Contacto',
      menu: 'Menú',
      close: 'Cerrar menú',
    },
    hero: {
      status: 'Disponible para nuevos proyectos',
      role: 'Desarrollador Full Stack',
      headline: ['Construyo la solución', 'digital que necesitas.'],
      lead: 'Desde una página web hasta un sistema a medida. Escucho tu idea, entiendo el problema y construyo una solución que funcione de verdad.',
      leadSecondary:
        'Trabajas directamente conmigo, de la primera conversación hasta que está en producción.',
      ctaPrimary: 'Hablemos de tu proyecto',
      ctaSecondary: 'Ver proyectos',
      metrics: [
        {
          value: 'Trabajas conmigo',
          label: 'Sin intermediarios: hablas con la persona que construye.',
        },
        {
          value: 'De la idea a producción',
          label: 'Diseño, desarrollo, despliegue y puesta en marcha.',
        },
        {
          value: 'Una web o un sistema',
          label: 'Desde algo sencillo hasta una herramienta hecha a tu medida.',
        },
      ],
    },
    services: {
      eyebrow: 'Servicios',
      title: '¿Qué puedo construir contigo?',
      subtitle:
        'No hace falta que sepas qué tecnología necesitas. Cuéntame qué quieres resolver y te digo qué se puede construir: a veces basta con algo sencillo, y a veces hace falta una herramienta hecha entera a tu medida.',
      sectorsLabel: 'Trabajo con proyectos de cualquier tamaño',
      sectors: [
        'Emprendedores',
        'Negocios locales',
        'Profesionales independientes',
        'Restaurantes',
        'Tiendas',
        'Talleres',
        'Consultoras',
        'Clínicas',
        'Empresas',
      ],
      cta: 'Cuéntame tu idea',
      items: [
        {
          title: 'Una web',
          text: 'Para presentar tu negocio, tu servicio, tu producto o tu marca profesional. Con un panel propio para que cambies textos, fotos y precios sin tener que llamar a nadie.',
        },
        {
          title: 'Una herramienta',
          text: 'Para administrar clientes, productos, pedidos o información. Lo que hoy vive en un cuaderno y en veinte hojas de cálculo, reunido en un solo lugar.',
        },
        {
          title: 'Una automatización',
          text: 'Para dejar de repetir a mano lo mismo cada semana: cálculos, plazos, avisos y reportes que se generan solos y no se equivocan al copiar.',
        },
        {
          title: 'Un sistema',
          text: 'Cuando necesitas algo adaptado por completo a tu forma de trabajar, porque ninguna herramienta genérica termina de encajar.',
        },
        {
          title: 'Una integración',
          text: 'Para conectar lo que ya usas: APIs, bases de datos y servicios que hoy no se hablan entre sí y te obligan a cargar la misma información dos veces.',
        },
      ],
    },
    projects: {
      eyebrow: 'Proyectos',
      title: 'Lo que ya construí, funcionando.',
      subtitle:
        'Dos proyectos de este año, los dos hechos de cero: uno público y uno interno. En ambos empecé por el problema, no por la tecnología.',
      viewLive: 'Ver sitio',
      privateLabel: 'Sistema interno · sin acceso público',
      clientLabel: 'Cliente',
      problemLabel: 'Problema',
      solutionLabel: 'Solución',
      resultLabel: 'Resultado',
      highlightsLabel: 'Qué incluye',
      galleryLabel: 'Capturas',
      prev: 'Captura anterior',
      next: 'Captura siguiente',
      shotOf: 'Captura {i} de {n}',
      trustLabel: 'Qué puedes esperar',
      trust: [
        {
          title: 'Cosas en uso, no maquetas',
          text: 'Los dos proyectos están desplegados y funcionando: uno público en internet y otro dentro de la operación diaria de una empresa.',
        },
        {
          title: 'Hablas conmigo',
          text: 'No hay ejecutivo de cuenta ni intermediario. Lo que me cuentas lo construyo yo, y a mí me preguntas cuando algo no te cuadra.',
        },
        {
          title: 'El control queda contigo',
          text: 'Panel de administración propio y código documentado. Puedes seguir con otra persona el día que quieras, sin quedar atado a mí.',
        },
      ],
      items: {
        'jm-consulting': {
          name: 'J&M Consulting Foods',
          tag: 'Sitio corporativo + panel de administración',
          summary:
            'Plataforma web para una consultora peruana de inocuidad alimentaria que gestiona registros sanitarios, HACCP, BPM y normas ISO.',
          problem:
            'Una consultora con un servicio técnico y difícil de explicar en pocas líneas necesitaba presentar su catálogo de trámites y certificaciones en detalle, y recibir consultas ordenadas — sin depender de un desarrollador cada vez que hubiera que cambiar un texto o publicar algo nuevo.',
          solution:
            'Construí el sitio completo: catálogo de servicios, proceso, sectores atendidos, portafolio de clientes, blog y varias vías de contacto con paso directo a WhatsApp. Detrás va un panel de administración con acceso autenticado, para que el propio cliente publique y edite contenido.',
          result:
            'Sitio desplegado en Netlify con dominio propio y en funcionamiento. El equipo de la consultora gestiona su contenido sin tocar código y recibe las consultas por formulario y por WhatsApp.',
          highlights: [
            'Panel de administración con acceso autenticado',
            'Contenido editable por el cliente, sin tocar código',
            'Captación de contactos vía formulario y WhatsApp',
            'Desplegado en Netlify con dominio propio',
          ],
          shots: [
            'Portada: la propuesta de valor y el paso directo a WhatsApp.',
            'Catálogo de servicios con el detalle de cada trámite y certificación.',
            'Quiénes somos: equipo, misión y datos verificables de la empresa.',
            'Proceso en cuatro etapas y los sectores de alimentos que atienden.',
            'Carrusel de las empresas que ya trabajaron con la consultora.',
            'Contacto: el formulario arma el mensaje y lo abre en WhatsApp.',
          ],
        },
        muestras: {
          name: 'Sistema de Gestión de Muestras',
          tag: 'Herramienta interna de gestión',
          sector: 'Joyería',
          summary:
            'Sistema interno para Arin S.A. que reemplazó el control manual en hojas de cálculo por un flujo digital con trazabilidad completa de cada muestra.',
          problem:
            'El control de muestras se llevaba a mano en hojas de cálculo. En joyería cada muestra que sale es un activo de valor, y no había una forma confiable de saber en todo momento dónde estaba, en qué estado y quién la había manipulado.',
          solution:
            'Diseñé el modelo de datos y la aplicación completa: registro de muestras, seguimiento por estados, historial firmado de cada movimiento, calendario de cierres con feriados, reportes de vencimientos y accesos diferenciados por rol.',
          result:
            'Sistema en producción como herramienta interna de la empresa. Cada movimiento queda registrado con autor, fecha y motivo, y los plazos se recalculan solos en todo el sistema.',
          highlights: [
            'Trazabilidad completa: cada cambio queda registrado',
            'Roles y permisos según el puesto de cada usuario',
            'Reportes y exportación de la información a Excel',
            'Modelo de datos y API REST propios, pensados para escalar',
          ],
          shots: [
            'Listado de productos: filtros combinados por estado, cliente, tipo y fecha, con exportación a Excel.',
            'Ficha del producto y su historial: cada cambio queda firmado con autor, fecha y motivo.',
            'Detalle de muestras: foto, kilataje, piezas y fechas de solicitud y entrega.',
            'Calendario de cierres: el año completo, coloreado por muestras vencidas, por vencer y a tiempo.',
            'Al abrir un día se listan las muestras que cierran esa fecha.',
            'Reporte de vencimientos: indicadores, distribución por unidad de negocio y comparativo mensual.',
            'Mantenimiento de feriados: un cambio acá recalcula los plazos de todo el sistema.',
          ],
        },
      },
    },
    process: {
      eyebrow: 'Cómo trabajo',
      title: 'De la idea a producción.',
      subtitle:
        'Cuatro pasos, siempre los mismos. Nada complicado: es lo que hace que sepas en todo momento en qué punto va tu proyecto.',
      steps: [
        {
          title: 'Entendemos',
          text: 'Me cuentas tu idea, tu negocio o el problema que tienes. Pregunto hasta entenderlo de verdad, no solamente la pantalla que te estás imaginando.',
        },
        {
          title: 'Proponemos',
          text: 'Definimos juntos la solución que más te conviene y hasta dónde llega. Sabes qué incluye antes de que yo empiece a construir.',
        },
        {
          title: 'Construyo',
          text: 'Desarrollo la solución y te voy mostrando avances. Si algo no era lo que tenías en la cabeza, lo corregimos ahí y no al final.',
        },
        {
          title: 'Producción',
          text: 'Pongo la solución en funcionamiento, te enseño a usarla y queda en tus manos. Si más adelante hace falta crecer, seguimos desde ahí.',
        },
      ],
    },
    about: {
      eyebrow: 'Perfil',
      title: 'Soy Rubén. Trabajas directamente conmigo.',
      quote: 'No tienes que coordinar tres proveedores ni traducir entre ellos.',
      body: [
        'Me interesa entender cómo funcionan las cosas: por qué un proceso se traba, por qué algo se rehace tres veces a mano, qué es lo que de verdad hace falta. Casi nunca el problema es exactamente el que se cuenta al principio, y encontrar el verdadero ya es la mitad del trabajo.',
        'La otra mitad es construirlo. Soy desarrollador full stack, así que la pantalla que ven tus clientes, la lógica que hay detrás, la base de datos y la puesta en línea salen de la misma persona. Hablas conmigo de principio a fin, y respondo yo por el resultado.',
      ],
      scopeLabel: 'De principio a fin',
      scope: ['Frontend', 'Backend', 'Base de datos', 'Despliegue', 'Mantenimiento'],
      pillars: [
        {
          title: 'Pregunto antes de proponer',
          text: 'Primero quiero entender tu negocio y el problema concreto. La solución sale de ahí, no de un catálogo de servicios.',
        },
        {
          title: 'Te digo qué incluye',
          text: 'Antes de escribir código queda claro el alcance. Lo que se agrega después se conversa, no aparece al final.',
        },
        {
          title: 'Ves los avances',
          text: 'Te muestro cómo va mientras se construye. Corregir a tiempo cuesta mucho menos que corregir el día de la entrega.',
        },
        {
          title: 'No desaparezco al entregar',
          text: 'Despliegue, dominio, capacitación de uso y un panel propio para que puedas seguir sin depender de mí.',
        },
      ],
      note: 'Trabajo con herramientas modernas de desarrollo, asistencia de IA incluida, para entregar en menos tiempo; y me mantengo al día con formación continua, lo último un curso de actualización full stack en la PUCP. Lo que no delego es el criterio: la arquitectura, las decisiones técnicas y la responsabilidad por lo que se entrega son mías.',
    },
    stack: {
      eyebrow: 'Stack',
      title: 'Con qué lo construyo.',
      subtitle:
        'La parte técnica, por si te interesa verla. Son las herramientas que uso a diario, pero la elección final depende siempre de lo que tu proyecto necesita.',
      groups: {
        frontend: 'Frontend',
        backend: 'Backend',
        data: 'Datos',
        tools: 'Herramientas',
      },
      open: {
        title: 'Y si tu proyecto pide otra cosa, se hace.',
        body: 'Esta es mi caja de herramientas del día a día, pero no es un límite. La tecnología se elige por lo que el proyecto necesita —cómo va a crecer, quién lo va a mantener y cuánto tiene que durar—, no por lo que a mí me resulte cómodo. Entrar en algo que no uso todas las semanas es parte de mi trabajo y no lo paga tu proyecto ni en tiempo ni en calidad.',
        listLabel: 'También sobre la mesa',
        note: 'Uso asistentes de IA como herramienta de desarrollo, nunca como sustituto del criterio: yo defino la arquitectura, reviso cada cambio que entra al proyecto y respondo por lo que se entrega.',
      },
    },
    contact: {
      eyebrow: 'Contacto',
      title: 'Cuéntame tu idea.',
      body: 'No necesitas tener los detalles técnicos ni saber qué tecnología hace falta. Explícame el problema o la idea que tienes en la cabeza y vemos juntos cuál puede ser la mejor solución.',
      bodySecondary:
        'Te respondo yo con una propuesta concreta: qué haría, hasta dónde llegaría y en cuánto tiempo. Sin compromiso.',
      emailLabel: 'Correo',
      linkedinLabel: 'LinkedIn',
      whatsappLabel: 'WhatsApp',
      whatsappAria: 'Escribirme por WhatsApp',
      whatsappHint: 'La vía más rápida',
      whatsappMessage:
        'Hola Rubén, vi tu sitio y quisiera conversar sobre un proyecto.',
      cta: 'Hablemos de tu proyecto',
      ctaNote: 'Te contesto yo, no un formulario automático.',
      copy: 'Copiar correo',
      copied: 'Copiado',
    },
    footer: {
      role: 'Desarrollador Full Stack',
      tagline: 'Construyo la solución digital que necesitas.',
      built: 'Hecho con React, Vite y Tailwind CSS.',
      rights: 'Todos los derechos reservados.',
      top: 'Volver arriba',
      site: {
        label: 'Sitio',
        lines: [
          'Diseñado y construido por mí',
          'React / Vite / Tailwind CSS',
          'Desplegado en Vercel',
        ],
      },
    },
  },

  en: {
    langLabel: 'ES',
    langAria: 'Switch language to Spanish',
    nav: {
      services: 'Services',
      projects: 'Work',
      process: 'How I work',
      about: 'About',
      stack: 'Stack',
      contact: 'Contact',
      menu: 'Menu',
      close: 'Close menu',
    },
    hero: {
      status: 'Available for new projects',
      role: 'Full Stack Developer',
      headline: ['I build the digital', 'solution you need.'],
      lead: 'From a website to a fully custom system. I listen to your idea, understand the problem and build something that actually works.',
      leadSecondary:
        'You work directly with me, from the first conversation to the day it goes live.',
      ctaPrimary: 'Let us talk about your project',
      ctaSecondary: 'View work',
      metrics: [
        {
          value: 'You work with me',
          label: 'No middlemen: you talk to the person who builds it.',
        },
        {
          value: 'Idea to production',
          label: 'Design, development, deployment and going live.',
        },
        {
          value: 'A site or a system',
          label: 'From something simple to a tool built entirely around you.',
        },
      ],
    },
    services: {
      eyebrow: 'Services',
      title: 'What can I build with you?',
      subtitle:
        'You do not need to know which technology you need. Tell me what you want to solve and I will tell you what can be built: sometimes something simple is enough, sometimes it takes a tool made entirely to measure.',
      sectorsLabel: 'I work with projects of any size',
      sectors: [
        'Founders',
        'Local businesses',
        'Independent professionals',
        'Restaurants',
        'Retail',
        'Workshops',
        'Consultancies',
        'Clinics',
        'Companies',
      ],
      cta: 'Tell me your idea',
      items: [
        {
          title: 'A website',
          text: 'To present your business, your service, your product or your professional brand. With your own panel to change text, photos and prices without having to call anyone.',
        },
        {
          title: 'A tool',
          text: 'To manage clients, products, orders or information. What lives today in a notebook and twenty spreadsheets, gathered in a single place.',
        },
        {
          title: 'An automation',
          text: 'To stop repeating the same thing by hand every week: calculations, deadlines, alerts and reports that generate themselves and never mistype.',
        },
        {
          title: 'A system',
          text: 'When you need something shaped entirely around the way you work, because no generic tool quite fits.',
        },
        {
          title: 'An integration',
          text: 'To connect what you already use: APIs, databases and services that today do not talk to each other and force you to enter the same data twice.',
        },
      ],
    },
    projects: {
      eyebrow: 'Work',
      title: 'What I have built, running.',
      subtitle:
        'Two projects from this year, both built from scratch: one public and one internal. In both I started from the problem, not from the technology.',
      viewLive: 'Visit site',
      privateLabel: 'Internal system · no public access',
      clientLabel: 'Client',
      problemLabel: 'Problem',
      solutionLabel: 'Solution',
      resultLabel: 'Result',
      highlightsLabel: 'What it includes',
      galleryLabel: 'Screens',
      prev: 'Previous screen',
      next: 'Next screen',
      shotOf: 'Screen {i} of {n}',
      trustLabel: 'What you can expect',
      trust: [
        {
          title: 'Things in use, not mockups',
          text: 'Both projects are deployed and running: one public on the internet, the other inside a company’s daily operation.',
        },
        {
          title: 'You talk to me',
          text: 'No account manager, no middleman. What you tell me I build myself, and I am the one you ask when something does not add up.',
        },
        {
          title: 'You keep control',
          text: 'Your own admin panel and documented code. You can continue with someone else whenever you want, with nothing tying you to me.',
        },
      ],
      items: {
        'jm-consulting': {
          name: 'J&M Consulting Foods',
          tag: 'Corporate site + admin panel',
          summary:
            'Web platform for a Peruvian food-safety consultancy handling sanitary registrations, HACCP, GMP and ISO standards.',
          problem:
            'A consultancy with a technical service that is hard to explain in a few lines needed to present its catalog of procedures and certifications in detail, and receive enquiries in an orderly way — without depending on a developer every time a text had to change or something new had to be published.',
          solution:
            'I built the full site: service catalog, process, sectors served, client portfolio, blog and several contact paths with a direct step into WhatsApp. Behind it sits an admin panel with authenticated access so the client publishes and edits content directly.',
          result:
            'Site deployed on Netlify with a custom domain and running. The consultancy manages its own content without touching code and receives enquiries through the form and WhatsApp.',
          highlights: [
            'Admin panel with authenticated access',
            'Client-editable content, no code required',
            'Lead capture via form and WhatsApp',
            'Deployed on Netlify with a custom domain',
          ],
          shots: [
            'Home: the value proposition and a direct path to WhatsApp.',
            'Service catalog detailing every procedure and certification.',
            'About: team, mission and verifiable company records.',
            'Four-stage process and the food sectors they serve.',
            'Carousel of the companies that already worked with the consultancy.',
            'Contact: the form composes the message and opens WhatsApp.',
          ],
        },
        muestras: {
          name: 'Sample Management System',
          tag: 'Internal management tool',
          sector: 'Jewelry',
          summary:
            'Internal system for Arin S.A. that replaced manual spreadsheet tracking with a digital flow giving full traceability over every sample.',
          problem:
            'Sample tracking was handled by hand in spreadsheets. In jewelry every sample that leaves the building is a valuable asset, and there was no reliable way to know at any moment where it was, in what state and who had handled it.',
          solution:
            'I designed the data model and the whole application: sample registration, status tracking, a signed history of every movement, a closing calendar with holidays, due-date reports and role-based access.',
          result:
            'System in production as an internal company tool. Every movement is recorded with author, date and reason, and deadlines recalculate themselves across the whole system.',
          highlights: [
            'Full traceability: every change is recorded',
            'Roles and permissions matched to each job',
            'Reports and export of the information to Excel',
            'Custom data model and REST API, designed to scale',
          ],
          shots: [
            'Product list: combined filters by status, client, type and date, with Excel export.',
            'Product sheet and its history: every change is signed with author, date and reason.',
            'Sample detail: photo, karat, pieces and request and due dates.',
            'Closing calendar: the full year, colored by overdue, due soon and on-time samples.',
            'Opening a day lists the samples closing on that date.',
            'Due-date report: indicators, distribution by business unit and month-over-month comparison.',
            'Holiday maintenance: one change here recalculates deadlines across the whole system.',
          ],
        },
      },
    },
    process: {
      eyebrow: 'How I work',
      title: 'From the idea to production.',
      subtitle:
        'Four steps, always the same ones. Nothing complicated: it is what keeps you knowing exactly where your project stands.',
      steps: [
        {
          title: 'We understand',
          text: 'You tell me your idea, your business or the problem you have. I ask until I really get it, not just the screen you are picturing.',
        },
        {
          title: 'We propose',
          text: 'Together we define the solution that suits you and how far it goes. You know what is included before I start building.',
        },
        {
          title: 'I build',
          text: 'I develop the solution and keep showing you progress. If something was not what you had in mind, we fix it there and not at the end.',
        },
        {
          title: 'Production',
          text: 'I put the solution live, show you how to use it and hand it over. If it needs to grow later, we carry on from there.',
        },
      ],
    },
    about: {
      eyebrow: 'About',
      title: 'I am Rubén. You work directly with me.',
      quote: 'No juggling three vendors, no translating between them.',
      body: [
        'I like understanding how things work: why a process gets stuck, why something gets redone three times by hand, what is actually needed. The problem is almost never exactly the one described at the start, and finding the real one is already half the job.',
        'The other half is building it. I am a full stack developer, so the screen your customers see, the logic behind it, the database and going live all come from the same person. You talk to me from start to finish, and I answer for the result.',
      ],
      scopeLabel: 'Start to finish',
      scope: ['Frontend', 'Backend', 'Database', 'Deployment', 'Maintenance'],
      pillars: [
        {
          title: 'I ask before proposing',
          text: 'First I want to understand your business and the concrete problem. The solution comes from there, not from a service catalog.',
        },
        {
          title: 'I tell you what is included',
          text: 'Before any code the scope is clear. Anything added later gets discussed, it does not turn up at the end.',
        },
        {
          title: 'You see the progress',
          text: 'I show you how it is going while it is built. Correcting in time costs far less than correcting on delivery day.',
        },
        {
          title: 'I do not disappear at handoff',
          text: 'Deployment, domain, training and your own admin panel so you can carry on without depending on me.',
        },
      ],
      note: 'I work with modern development tooling, AI assistance included, to deliver in less time; and I keep current with continuous training, most recently a full stack refresher course at PUCP. What I do not delegate is judgment: the architecture, the technical decisions and the accountability for what is delivered are mine.',
    },
    stack: {
      eyebrow: 'Stack',
      title: 'What I build it with.',
      subtitle:
        'The technical part, in case you want to see it. These are the tools I use daily, but the final choice always depends on what your project needs.',
      groups: {
        frontend: 'Frontend',
        backend: 'Backend',
        data: 'Data',
        tools: 'Tooling',
      },
      open: {
        title: 'And if your project calls for something else, it gets built.',
        body: 'This is my day-to-day toolbox, but it is not a limit. The technology is chosen for what the project needs — how it will grow, who will maintain it and how long it has to last — not for what happens to be comfortable for me. Moving into something I do not use every week is part of my job, and your project pays for it neither in time nor in quality.',
        listLabel: 'Also on the table',
        note: 'I use AI assistants as a development tool, never as a substitute for judgment: I define the architecture, review every change that enters the project and answer for what is delivered.',
      },
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Tell me your idea.',
      body: 'You do not need the technical details or to know which technology it takes. Describe the problem or the idea you have in mind and we will work out the best solution together.',
      bodySecondary:
        'I reply myself with a concrete proposal: what I would do, how far it would go and how long it takes. No strings attached.',
      emailLabel: 'Email',
      linkedinLabel: 'LinkedIn',
      whatsappLabel: 'WhatsApp',
      whatsappAria: 'Message me on WhatsApp',
      whatsappHint: 'Fastest way to reach me',
      whatsappMessage:
        'Hi Rubén, I saw your site and would like to discuss a project.',
      cta: 'Let us talk about your project',
      ctaNote: 'You get me, not an automated form.',
      copy: 'Copy email',
      copied: 'Copied',
    },
    footer: {
      role: 'Full Stack Developer',
      tagline: 'I build the digital solution you need.',
      built: 'Built with React, Vite and Tailwind CSS.',
      rights: 'All rights reserved.',
      top: 'Back to top',
      site: {
        label: 'Site',
        lines: [
          'Designed and built by me',
          'React / Vite / Tailwind CSS',
          'Deployed on Vercel',
        ],
      },
    },
  },
}
