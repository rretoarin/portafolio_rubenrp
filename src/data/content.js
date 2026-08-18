// Toda la copia del sitio vive aquí. Editar textos = editar este archivo,
// nunca los componentes. Cada idioma tiene exactamente las mismas claves.

export const PROFILE = {
  name: 'Rubén Reto Panta',
  initials: 'RR',
  email: 'rubenretopanta@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ruben-reto-panta-1580301a8/',
  linkedinLabel: 'ruben-reto-panta',
}

// Datos estables entre idiomas: URLs, stack, año.
export const PROJECTS = [
  {
    id: 'jm-consulting',
    year: '2025',
    url: 'https://jm-consulting-foods.netlify.app/',
    stack: ['React', 'Vite', 'Node.js', 'MongoDB', 'Netlify'],
  },
  {
    id: 'muestras',
    year: '2025',
    url: null, // Sistema interno: no hay demo pública.
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
  },
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
    items: ['Git', 'Claude Code', 'Netlify', 'Postman', 'Figma'],
  },
]

export const CONTENT = {
  es: {
    langLabel: 'EN',
    langAria: 'Cambiar idioma a inglés',
    nav: {
      about: 'Perfil',
      projects: 'Proyectos',
      process: 'Proceso',
      stack: 'Stack',
      contact: 'Contacto',
      menu: 'Menú',
      close: 'Cerrar menú',
    },
    hero: {
      status: 'Disponible para nuevos proyectos',
      role: 'Desarrollador Full Stack',
      headline: ['Construyo software', 'que resuelve el', 'problema real.'],
      lead: 'No empiezo por la tecnología, empiezo por el requerimiento. Escucho qué necesita el cliente, defino la arquitectura y recién ahí escribo código: React y Node.js sobre MongoDB, hecho para durar más que la entrega.',
      ctaPrimary: 'Ver proyectos',
      ctaSecondary: 'Hablemos',
      metrics: [
        { value: 'Full stack', label: 'Frontend, backend y base de datos' },
        { value: 'A medida', label: 'Cada solución nace del requerimiento' },
        { value: 'Arquitectura', label: 'Formación formal, no solo práctica' },
      ],
    },
    about: {
      eyebrow: 'Perfil',
      title: 'Desarrollo a medida, con criterio de arquitectura.',
      body: [
        'Soy desarrollador full stack. Trabajo de punta a punta: interfaz, API, base de datos y despliegue. Mi especialidad no es una librería concreta, es traducir lo que el cliente necesita en un sistema que efectivamente lo resuelve.',
        'Estudié arquitectura de software en la Universidad Católica, y eso cambió cómo construyo: separo responsabilidades, pienso en cómo va a crecer el proyecto y evito soluciones que funcionan hoy y estorban en seis meses.',
        'Uso Claude Code como acelerador del trabajo, nunca como reemplazo del criterio. La IA escribe rápido; yo decido la arquitectura, reviso cada cambio y respondo por el resultado. Esa supervisión es justamente lo que hace que la velocidad no cueste calidad.',
      ],
      pillars: [
        {
          title: 'Del requerimiento al sistema',
          text: 'Primero entiendo el negocio y el problema. La solución técnica es consecuencia de eso, no al revés.',
        },
        {
          title: 'Arquitectura antes que código',
          text: 'Formación en arquitectura de software: capas claras, datos bien modelados y decisiones que se sostienen con el tiempo.',
        },
        {
          title: 'IA supervisada',
          text: 'Claude Code para avanzar más rápido, con revisión humana en cada paso. Entrego código que entiendo y puedo defender.',
        },
        {
          title: 'Entrega en producción',
          text: 'El proyecto no termina en el repositorio: despliegue, dominio, panel de administración y soporte posterior.',
        },
      ],
    },
    projects: {
      eyebrow: 'Proyectos',
      title: 'Trabajo real, en producción.',
      subtitle: 'Dos sistemas construidos de cero: uno público, uno interno.',
      viewLive: 'Ver sitio',
      privateLabel: 'Sistema interno · sin acceso público',
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
        },
        muestras: {
          name: 'Sistema de Gestión de Muestras',
          tag: 'Herramienta interna de empresa',
          summary:
            'Sistema interno que reemplazó el control manual en hojas de cálculo por un flujo digital con trazabilidad completa de cada muestra.',
          detail:
            'Diseñé el modelo de datos y la aplicación completa: registro de muestras, seguimiento por estados, historial de cada movimiento y accesos diferenciados por rol. El objetivo del cliente era saber en todo momento dónde está cada muestra y quién la manipuló; la arquitectura se armó alrededor de esa necesidad.',
          highlights: [
            'Trazabilidad completa: cada cambio queda registrado',
            'Roles y permisos según el puesto de cada usuario',
            'Modelo de datos en MongoDB pensado para escalar',
            'API REST propia en Node.js y Express',
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
      title: '¿Tienes un requerimiento?',
      body: 'Cuéntame qué necesitas resolver. Respondo con una propuesta concreta: alcance, enfoque técnico y tiempos, sin compromiso.',
      emailLabel: 'Correo',
      linkedinLabel: 'LinkedIn',
      cta: 'Escríbeme',
      copy: 'Copiar correo',
      copied: 'Copiado',
    },
    footer: {
      role: 'Desarrollador Full Stack',
      built: 'Hecho con React, Vite y Tailwind CSS.',
      rights: 'Todos los derechos reservados.',
      top: 'Volver arriba',
    },
  },

  en: {
    langLabel: 'ES',
    langAria: 'Switch language to Spanish',
    nav: {
      about: 'About',
      projects: 'Work',
      process: 'Process',
      stack: 'Stack',
      contact: 'Contact',
      menu: 'Menu',
      close: 'Close menu',
    },
    hero: {
      status: 'Available for new projects',
      role: 'Full Stack Developer',
      headline: ['I build software', 'that solves the', 'actual problem.'],
      lead: 'I do not start from the technology, I start from the requirement. I listen to what the client needs, define the architecture, and only then write code: React and Node.js on MongoDB, built to outlast the handoff.',
      ctaPrimary: 'View work',
      ctaSecondary: 'Let us talk',
      metrics: [
        { value: 'Full stack', label: 'Frontend, backend and database' },
        { value: 'Tailor-made', label: 'Every solution starts from the requirement' },
        { value: 'Architecture', label: 'Formal training, not just practice' },
      ],
    },
    about: {
      eyebrow: 'About',
      title: 'Custom development, with architectural judgment.',
      body: [
        'I am a full stack developer. I work end to end: interface, API, database and deployment. My specialty is not a particular library, it is translating what a client needs into a system that actually solves it.',
        'I studied software architecture at Universidad Católica, and it changed how I build: clear separation of concerns, thinking about how the project will grow, and avoiding solutions that work today and get in the way six months later.',
        'I use Claude Code to accelerate the work, never to replace judgment. AI writes fast; I decide the architecture, review every change and answer for the result. That supervision is exactly what keeps speed from costing quality.',
      ],
      pillars: [
        {
          title: 'From requirement to system',
          text: 'I understand the business and the problem first. The technical solution follows from that, not the other way around.',
        },
        {
          title: 'Architecture before code',
          text: 'Training in software architecture: clear layers, well-modeled data and decisions that hold up over time.',
        },
        {
          title: 'Supervised AI',
          text: 'Claude Code to move faster, with human review at every step. I ship code I understand and can defend.',
        },
        {
          title: 'Delivered in production',
          text: 'The project does not end at the repository: deployment, domain, admin panel and ongoing support.',
        },
      ],
    },
    projects: {
      eyebrow: 'Work',
      title: 'Real systems, in production.',
      subtitle: 'Two products built from scratch: one public, one internal.',
      viewLive: 'Visit site',
      privateLabel: 'Internal system · no public access',
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
        },
        muestras: {
          name: 'Sample Management System',
          tag: 'Internal company tool',
          summary:
            'Internal system that replaced manual spreadsheet tracking with a digital flow giving full traceability over every sample.',
          detail:
            'I designed the data model and the whole application: sample registration, status tracking, a full history of every movement and role-based access. The client needed to know where each sample is and who handled it at any moment; the architecture was built around that need.',
          highlights: [
            'Full traceability: every change is recorded',
            'Roles and permissions matched to each job',
            'MongoDB data model designed to scale',
            'Custom REST API in Node.js and Express',
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
      title: 'Have a requirement?',
      body: 'Tell me what you need to solve. I reply with a concrete proposal: scope, technical approach and timeline, no strings attached.',
      emailLabel: 'Email',
      linkedinLabel: 'LinkedIn',
      cta: 'Get in touch',
      copy: 'Copy email',
      copied: 'Copied',
    },
    footer: {
      role: 'Full Stack Developer',
      built: 'Built with React, Vite and Tailwind CSS.',
      rights: 'All rights reserved.',
      top: 'Back to top',
    },
  },
}
