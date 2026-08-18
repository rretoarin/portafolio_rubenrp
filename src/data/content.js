// Toda la copia del sitio vive aquí. Editar textos = editar este archivo,
// nunca los componentes. Cada idioma tiene exactamente las mismas claves.

export const PROFILE = {
  name: 'Rubén Reto Panta',
  nameLines: ['Rubén Reto', 'Panta'], // Cierre a gran escala en el pie.
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
    client: 'Arin S.A.',
    url: null, // Sistema interno: no hay demo pública.
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
  },
]

// Certificado PUCP 2025. Datos verificables, iguales en ambos idiomas.
export const EDUCATION = {
  institution: 'Pontificia Universidad Católica del Perú',
  short: 'PUCP',
  hours: '180',
  grade: '18 / 20',
  period: 'Jun — Nov 2025',
  verifyUrl: 'https://www.pucp.edu.pe/certificaciones',
  verifyCode: 'ALK6N6IV',
}

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
      headline: ['Desarrollador', 'Full Stack'],
      lead: 'Construyo software que resuelve el problema real. No empiezo por la tecnología: empiezo por el requerimiento del cliente, defino cómo se estructura el sistema y recién ahí escribo código.',
      ctaPrimary: 'Ver proyectos',
      ctaSecondary: 'Hablemos',
      metrics: [
        { value: 'Full stack', label: 'Frontend, backend y base de datos' },
        { value: 'A medida', label: 'Cada solución nace del requerimiento' },
        { value: '180 horas', label: 'Especialización full stack en la PUCP' },
      ],
    },
    about: {
      eyebrow: 'Perfil',
      title: 'Desarrollo a medida, de la base de datos al despliegue.',
      body: [
        'Soy desarrollador full stack. Trabajo de punta a punta: interfaz, API, base de datos y despliegue. Mi especialidad no es una librería concreta, es traducir lo que el cliente necesita en un sistema que efectivamente lo resuelve.',
        'Mi formación es formal, no solo autodidacta: aprobé el Programa de Especialización en Desarrollo Web Front End y Back End de la Pontificia Universidad Católica del Perú. Ciento ochenta horas sobre el ciclo completo —backend, frontend, pruebas, seguridad y DevOps— más metodologías ágiles y trato con el cliente.',
        'Uso Claude Code como acelerador del trabajo, nunca como reemplazo del criterio. La IA escribe rápido; yo decido cómo se estructura el sistema, reviso cada cambio y respondo por el resultado. Esa supervisión es justamente lo que hace que la velocidad no cueste calidad.',
      ],
      pillars: [
        {
          title: 'Del requerimiento al sistema',
          text: 'Primero entiendo el negocio y el problema. La solución técnica es consecuencia de eso, no al revés.',
        },
        {
          title: 'Estructura antes que código',
          text: 'Modelo de datos y capas definidos antes de la primera línea. Es lo que evita reescribir el proyecto a mitad de camino.',
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
      education: {
        label: 'Formación',
        program: 'Programa de Especialización en Desarrollo Web Front End y Back End',
        faculty: 'Facultad de Ciencias e Ingeniería',
        hoursLabel: 'Horas',
        gradeLabel: 'Calificativo',
        periodLabel: 'Periodo',
        modulesLabel: 'Plan de estudios',
        verify: 'Verificar certificado',
        codeLabel: 'Código',
        modules: [
          'Fundamentos del Diseño y Desarrollo de Proyectos',
          'Taller de Gestión del Tiempo y Ceremonias Ágiles',
          'Fundamentos de Desarrollo Web',
          'Desarrollo Back End',
          'Taller de Relationship Management',
          'Desarrollo de Front End',
          'Taller de Marca Personal para Desarrolladores',
          'Pruebas, Seguridad y DevOps',
          'Taller de Habilidades para Entrevistas y Estrategias de Carrera',
          'Proyecto Web Full Stack',
          'Taller de Preparación de un Portafolio de Proyectos',
        ],
      },
    },
    projects: {
      eyebrow: 'Proyectos',
      title: 'Trabajo real, en producción.',
      subtitle: 'Dos sistemas construidos de cero: uno público, uno interno.',
      viewLive: 'Ver sitio',
      privateLabel: 'Sistema interno · sin acceso público',
      clientLabel: 'Cliente',
      highlightsLabel: 'Destacado',
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
      site: {
        label: 'Sitio',
        lines: [
          'Diseñado y construido por mí',
          'React / Vite / Tailwind CSS',
          'Desplegado en Netlify',
        ],
      },
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
      headline: ['Full Stack', 'Developer'],
      lead: 'I build software that solves the actual problem. I do not start from the technology: I start from the client requirement, define how the system is structured, and only then write code.',
      ctaPrimary: 'View work',
      ctaSecondary: 'Let us talk',
      metrics: [
        { value: 'Full stack', label: 'Frontend, backend and database' },
        { value: 'Tailor-made', label: 'Every solution starts from the requirement' },
        { value: '180 hours', label: 'Full stack web specialization at PUCP' },
      ],
    },
    about: {
      eyebrow: 'About',
      title: 'Custom development, from the database to the deployment.',
      body: [
        'I am a full stack developer. I work end to end: interface, API, database and deployment. My specialty is not a particular library, it is translating what a client needs into a system that actually solves it.',
        'My training is formal, not only self-taught: I completed the Front End and Back End Web Development Specialization Program at Pontificia Universidad Católica del Perú. One hundred and eighty hours across the full cycle — backend, frontend, testing, security and DevOps — plus agile methodologies and working with clients.',
        'I use Claude Code to accelerate the work, never to replace judgment. AI writes fast; I decide how the system is structured, review every change and answer for the result. That supervision is exactly what keeps speed from costing quality.',
      ],
      pillars: [
        {
          title: 'From requirement to system',
          text: 'I understand the business and the problem first. The technical solution follows from that, not the other way around.',
        },
        {
          title: 'Structure before code',
          text: 'Data model and layers defined before the first line. That is what keeps a project from being rewritten halfway through.',
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
      education: {
        label: 'Education',
        program: 'Front End and Back End Web Development Specialization Program',
        faculty: 'Faculty of Sciences and Engineering',
        hoursLabel: 'Hours',
        gradeLabel: 'Grade',
        periodLabel: 'Period',
        modulesLabel: 'Curriculum',
        verify: 'Verify certificate',
        codeLabel: 'Code',
        modules: [
          'Project Design and Development Fundamentals',
          'Time Management and Agile Ceremonies Workshop',
          'Web Development Fundamentals',
          'Back End Development',
          'Relationship Management Workshop',
          'Front End Development',
          'Personal Branding for Developers Workshop',
          'Testing, Security and DevOps',
          'Interview Skills and Career Strategy Workshop',
          'Full Stack Web Project',
          'Project Portfolio Preparation Workshop',
        ],
      },
    },
    projects: {
      eyebrow: 'Work',
      title: 'Real systems, in production.',
      subtitle: 'Two products built from scratch: one public, one internal.',
      viewLive: 'Visit site',
      privateLabel: 'Internal system · no public access',
      clientLabel: 'Client',
      highlightsLabel: 'Highlights',
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
      site: {
        label: 'Site',
        lines: [
          'Designed and built by me',
          'React / Vite / Tailwind CSS',
          'Deployed on Netlify',
        ],
      },
    },
  },
}
