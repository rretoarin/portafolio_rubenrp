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
    shots: [
      '/proyectos/muestras-1.webp',
      '/proyectos/muestras-2.webp',
      '/proyectos/muestras-3.webp',
      '/proyectos/muestras-4.webp',
      '/proyectos/muestras-5.webp',
      '/proyectos/muestras-6.webp',
      '/proyectos/muestras-7.webp',
      '/proyectos/muestras-8.webp',
      '/proyectos/muestras-9.webp',
    ],
  },
]

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
  'Claude Code',
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
    items: ['Git', 'Claude Code', 'Vercel', 'Netlify', 'Postman', 'Figma'],
  },
]

export const CONTENT = {
  es: {
    langLabel: 'EN',
    langAria: 'Cambiar idioma a inglés',
    nav: {
      about: 'Perfil',
      services: 'Servicios',
      projects: 'Proyectos',
      process: 'Proceso',
      stack: 'Stack',
      contact: 'Contacto',
      menu: 'Menú',
      close: 'Cerrar menú',
    },
    hero: {
      status: 'Disponible para nuevos proyectos',
      responseTime: 'Respondo en menos de 24 horas',
      role: 'Desarrollador Full Stack',
      headline: ['Desarrollador', 'Full Stack'],
      lead: 'Hola, soy Rubén. Te ayudo a convertir eso que necesitas resolver en un sistema que funciona de verdad: escucho el requerimiento, te propongo cómo resolverlo y me encargo del resto, desde el primer boceto hasta que está en línea.',
      ctaPrimary: 'Ver proyectos',
      ctaSecondary: 'Hablemos',
      metrics: [
        { value: 'Full stack', label: 'Frontend, backend y base de datos' },
        { value: 'A medida', label: 'Cada solución nace del requerimiento' },
        { value: 'En producción', label: 'Dos sistemas entregados y funcionando' },
      ],
    },
    about: {
      eyebrow: 'Perfil',
      title: 'Te acompaño desde la idea hasta la producción.',
      body: [
        'Soy desarrollador full stack, y para ti eso significa una sola persona responsable de todo: la pantalla que ven tus clientes, la lógica que hay detrás, la base de datos y la puesta en línea. No tienes que coordinar tres proveedores ni traducir entre ellos.',
        'Hace poco terminé un curso de actualización full stack en la PUCP. Mantenerme al día es parte del trabajo: las herramientas cambian rápido y lo que te entrego tiene que envejecer bien.',
        'Uso Claude Code para avanzar más rápido, siempre supervisando. La IA escribe veloz; yo decido cómo se estructura todo, reviso cada cambio y respondo por el resultado. Para ti se traduce en entregas más cortas sin que la calidad lo pague.',
      ],
      pillars: [
        {
          title: 'Entiendo antes de proponer',
          text: 'Primero conversamos sobre tu negocio y el problema concreto. La solución sale de ahí, no de un catálogo de servicios.',
        },
        {
          title: 'Un solo responsable',
          text: 'Frontend, backend, base de datos y despliegue en la misma persona. Menos coordinación para ti y menos cosas que se pierden en el camino.',
        },
        {
          title: 'Entregas cortas, con criterio',
          text: 'Claude Code para acelerar, revisión humana en cada paso. Te llega antes, y te llega código que puedo explicarte línea por línea.',
        },
        {
          title: 'No te dejo solo al entregar',
          text: 'Despliegue, dominio, capacitación de uso y un panel propio para que administres tu contenido sin depender de mí.',
        },
      ],
    },
    services: {
      eyebrow: 'Servicios',
      title: 'Tu negocio necesita una página web.',
      subtitle:
        'Hoy tu cliente busca en internet antes de decidir. Si no te encuentra, o solo encuentra un perfil de redes sin información, termina comprándole a otro. Una página propia le muestra tu producto en detalle, le responde las dudas antes de que las pregunte y te deja el contacto a un clic.',
      sectorsLabel: 'Trabajo con cualquier rubro',
      sectors: [
        'Restaurantes',
        'Consultoras',
        'Talleres',
        'Joyerías',
        'Tiendas',
        'Clínicas',
        'Profesionales independientes',
      ],
      cta: 'Conversemos sobre tu negocio',
      items: [
        {
          title: 'Página web para tu negocio',
          text: 'Catálogo de productos o servicios con fotos y descripciones, quiénes son, dónde están y contacto directo por WhatsApp. Todo lo que tu cliente necesita saber antes de escribirte, sin que se lo tengas que explicar una por una.',
        },
        {
          title: 'Un panel para administrarla tú',
          text: 'Cambias textos, fotos, precios o publicaciones desde tu propio panel, sin llamarme ni pagar por cada ajuste. Tu página deja de depender de mí el día que te la entrego.',
        },
        {
          title: 'Sistemas a medida',
          text: 'Cuando el negocio necesita más que una web: control de inventario, seguimiento de pedidos o muestras, usuarios con distintos permisos y reportes de lo que pasa adentro.',
        },
      ],
    },
    projects: {
      eyebrow: 'Proyectos',
      title: 'Trabajo real, en producción.',
      subtitle: 'Dos sistemas construidos de cero: uno público, uno interno.',
      viewLive: 'Ver sitio',
      privateLabel: 'Sistema interno · sin acceso público',
      clientLabel: 'Cliente',
      highlightsLabel: 'Destacado',
      galleryLabel: 'Capturas',
      prev: 'Captura anterior',
      next: 'Captura siguiente',
      shotOf: 'Captura {i} de {n}',
      items: {
        'jm-consulting': {
          name: 'J&M Consulting Foods',
          tag: 'Sitio corporativo + panel de administración',
          summary:
            'Plataforma web para una consultora peruana de inocuidad alimentaria que gestiona registros sanitarios, HACCP, BPM y normas ISO.',
          detail:
            'Construí el sitio completo: catálogo de servicios, secciones de proceso y sectores, portafolio de clientes, blog y múltiples vías de contacto con integración directa a WhatsApp. Detrás hay un panel de administración con login, para que el propio cliente publique contenido sin depender de mí.',
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
          detail:
            'Diseñé el modelo de datos y la aplicación completa: registro de muestras, seguimiento por estados, historial de cada movimiento y accesos diferenciados por rol. En joyería cada muestra que sale es un activo de valor, así que el requerimiento era saber en todo momento dónde está y quién la manipuló. La arquitectura se armó alrededor de esa necesidad.',
          highlights: [
            'Trazabilidad completa: cada cambio queda registrado',
            'Roles y permisos según el puesto de cada usuario',
            'Modelo de datos en MongoDB pensado para escalar',
            'API REST propia en Node.js y Express',
          ],
          shots: [
            'Listado de productos: filtros combinados por estado, cliente, tipo y fecha, con exportación a Excel.',
            'Ficha del producto con sus etapas: creación de código, impresión 3D y casting.',
            'Historial: cada cambio queda firmado con autor, fecha y motivo.',
            'Detalle de muestras: foto, kilataje, piezas y fechas de solicitud y entrega.',
            'Calendario de cierres: el año completo, coloreado por muestras vencidas, por vencer y a tiempo.',
            'Al abrir un día se listan las muestras que cierran esa fecha.',
            'Reportes: por semana, por mes, por diseñador, reprogramaciones y vencimientos.',
            'Reporte de vencimientos: indicadores, distribución por unidad de negocio y comparativo mensual.',
            'Mantenimiento de feriados: un cambio acá recalcula los plazos de todo el sistema.',
          ],
        },
      },
    },
    process: {
      eyebrow: 'Proceso',
      title: 'Cómo trabajo un proyecto.',
      subtitle: 'El mismo camino en todos los casos. Es lo que evita sorpresas al final.',
      steps: [
        {
          title: 'Entender el requerimiento',
          text: 'Conversamos sobre el negocio y el problema concreto. Salgo de ahí con el alcance escrito y priorizado, no con una lista de deseos.',
        },
        {
          title: 'Definir la arquitectura',
          text: 'Modelo de datos, estructura del backend y flujo de la interfaz. Las decisiones difíciles se toman acá, no a mitad del desarrollo.',
        },
        {
          title: 'Construir y validar',
          text: 'Desarrollo por entregas revisables. Uso Claude Code para acelerar, superviso cada cambio y muestro avances para corregir a tiempo.',
        },
        {
          title: 'Desplegar y acompañar',
          text: 'Puesta en producción, capacitación de uso y soporte. Te entrego además el control: panel propio y código documentado.',
        },
      ],
    },
    stack: {
      eyebrow: 'Stack',
      title: 'Con qué construyo.',
      subtitle: 'Herramientas que uso a diario. La elección final siempre depende del proyecto.',
      groups: {
        frontend: 'Frontend',
        backend: 'Backend',
        data: 'Datos',
        tools: 'Herramientas',
      },
    },
    contact: {
      eyebrow: 'Contacto',
      title: 'Cuéntame qué necesitas.',
      body: 'No hace falta que sepas cómo se resuelve técnicamente, para eso estoy yo. Descríbeme el problema y te respondo con una propuesta concreta: alcance, cómo lo abordaría y en cuánto tiempo. Sin compromiso.',
      emailLabel: 'Correo',
      linkedinLabel: 'LinkedIn',
      whatsappLabel: 'WhatsApp',
      whatsappAria: 'Escribirme por WhatsApp',
      whatsappMessage:
        'Hola Rubén, vi tu portafolio y quiero conversar sobre un proyecto.',
      cta: 'Escríbeme',
      copy: 'Copiar correo',
      copied: 'Copiado',
    },
    footer: {
      role: 'Desarrollador Full Stack',
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
      about: 'About',
      services: 'Services',
      projects: 'Work',
      process: 'Process',
      stack: 'Stack',
      contact: 'Contact',
      menu: 'Menu',
      close: 'Close menu',
    },
    hero: {
      status: 'Available for new projects',
      responseTime: 'I reply within 24 hours',
      role: 'Full Stack Developer',
      headline: ['Full Stack', 'Developer'],
      lead: 'Hi, I am Rubén. I help you turn what you need to solve into a system that actually works: I listen to the requirement, propose how to solve it and handle the rest, from the first sketch to going live.',
      ctaPrimary: 'View work',
      ctaSecondary: 'Let us talk',
      metrics: [
        { value: 'Full stack', label: 'Frontend, backend and database' },
        { value: 'Tailor-made', label: 'Every solution starts from the requirement' },
        { value: 'In production', label: 'Two systems delivered and running' },
      ],
    },
    about: {
      eyebrow: 'About',
      title: 'I walk with you from the idea to production.',
      body: [
        'I am a full stack developer, and for you that means one person accountable for everything: the screen your customers see, the logic behind it, the database and going live. No juggling three vendors, no translating between them.',
        'I recently finished a full stack refresher course at PUCP. Staying current is part of the job: tools move fast and what I hand you has to age well.',
        'I use Claude Code to move faster, always supervising. AI writes quickly; I decide how everything is structured, review every change and answer for the result. For you that means shorter deliveries without quality paying the bill.',
      ],
      pillars: [
        {
          title: 'I understand before proposing',
          text: 'We talk about your business and the concrete problem first. The solution comes from there, not from a service catalog.',
        },
        {
          title: 'One person accountable',
          text: 'Frontend, backend, database and deployment in the same hands. Less coordination for you, fewer things lost along the way.',
        },
        {
          title: 'Short deliveries, with judgment',
          text: 'Claude Code to accelerate, human review at every step. It reaches you sooner, and it is code I can walk you through line by line.',
        },
        {
          title: 'I do not disappear at handoff',
          text: 'Deployment, domain, training and your own admin panel so you manage your content without depending on me.',
        },
      ],
    },
    services: {
      eyebrow: 'Services',
      title: 'Your business needs a website.',
      subtitle:
        'Your customer searches online before deciding. If they cannot find you, or only find a social profile with no information, they end up buying from someone else. Your own site shows your product in detail, answers their questions before they ask, and puts your contact one click away.',
      sectorsLabel: 'I work with any industry',
      sectors: [
        'Restaurants',
        'Consultancies',
        'Workshops',
        'Jewelry',
        'Retail',
        'Clinics',
        'Independent professionals',
      ],
      cta: 'Let us talk about your business',
      items: [
        {
          title: 'A website for your business',
          text: 'A catalog of products or services with photos and descriptions, who you are, where you are and direct WhatsApp contact. Everything your customer needs to know before writing to you, without you explaining it one by one.',
        },
        {
          title: 'An admin panel you control',
          text: 'You change text, photos, prices or posts from your own panel, without calling me or paying for every tweak. Your site stops depending on me the day I hand it over.',
        },
        {
          title: 'Custom systems',
          text: 'When the business needs more than a website: inventory control, order or sample tracking, users with different permissions and reports on what is happening inside.',
        },
      ],
    },
    projects: {
      eyebrow: 'Work',
      title: 'Real systems, in production.',
      subtitle: 'Two products built from scratch: one public, one internal.',
      viewLive: 'Visit site',
      privateLabel: 'Internal system · no public access',
      clientLabel: 'Client',
      highlightsLabel: 'Highlights',
      galleryLabel: 'Screens',
      prev: 'Previous screen',
      next: 'Next screen',
      shotOf: 'Screen {i} of {n}',
      items: {
        'jm-consulting': {
          name: 'J&M Consulting Foods',
          tag: 'Corporate site + admin panel',
          summary:
            'Web platform for a Peruvian food-safety consultancy handling sanitary registrations, HACCP, GMP and ISO standards.',
          detail:
            'I built the full site: service catalog, process and sector sections, client portfolio, blog and multiple contact paths with direct WhatsApp integration. Behind it sits an authenticated admin panel so the client publishes content without depending on me.',
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
          detail:
            'I designed the data model and the whole application: sample registration, status tracking, a full history of every movement and role-based access. In jewelry every sample that leaves the building is a valuable asset, so the requirement was knowing where it is and who handled it at any moment. The architecture was built around that need.',
          highlights: [
            'Full traceability: every change is recorded',
            'Roles and permissions matched to each job',
            'MongoDB data model designed to scale',
            'Custom REST API in Node.js and Express',
          ],
          shots: [
            'Product list: combined filters by status, client, type and date, with Excel export.',
            'Product sheet and its stages: code creation, 3D printing and casting.',
            'History: every change is signed with author, date and reason.',
            'Sample detail: photo, karat, pieces and request and due dates.',
            'Closing calendar: the full year, colored by overdue, due soon and on-time samples.',
            'Opening a day lists the samples closing on that date.',
            'Reports: by week, by month, by designer, reschedules and due dates.',
            'Due-date report: indicators, distribution by business unit and month-over-month comparison.',
            'Holiday maintenance: one change here recalculates deadlines across the whole system.',
          ],
        },
      },
    },
    process: {
      eyebrow: 'Process',
      title: 'How I run a project.',
      subtitle: 'The same path every time. That is what prevents surprises at the end.',
      steps: [
        {
          title: 'Understand the requirement',
          text: 'We talk through the business and the concrete problem. I leave with a written, prioritized scope, not a wish list.',
        },
        {
          title: 'Define the architecture',
          text: 'Data model, backend structure and interface flow. The hard calls happen here, not halfway through development.',
        },
        {
          title: 'Build and validate',
          text: 'Development in reviewable increments. I use Claude Code to move faster, supervise every change and show progress early enough to correct.',
        },
        {
          title: 'Deploy and support',
          text: 'Production rollout, training and support. You also get the controls: your own admin panel and documented code.',
        },
      ],
    },
    stack: {
      eyebrow: 'Stack',
      title: 'What I build with.',
      subtitle: 'Tools I use daily. The final choice always depends on the project.',
      groups: {
        frontend: 'Frontend',
        backend: 'Backend',
        data: 'Data',
        tools: 'Tooling',
      },
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Tell me what you need.',
      body: 'You do not need to know how it is solved technically — that is my job. Describe the problem and I reply with a concrete proposal: scope, how I would approach it and how long it takes. No strings attached.',
      emailLabel: 'Email',
      linkedinLabel: 'LinkedIn',
      whatsappLabel: 'WhatsApp',
      whatsappAria: 'Message me on WhatsApp',
      whatsappMessage:
        'Hi Rubén, I saw your portfolio and would like to discuss a project.',
      cta: 'Get in touch',
      copy: 'Copy email',
      copied: 'Copied',
    },
    footer: {
      role: 'Full Stack Developer',
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
