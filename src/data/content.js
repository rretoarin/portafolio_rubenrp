// Toda la copia del sitio vive aquí. Editar textos = editar este archivo,
// nunca los componentes. Cada idioma tiene exactamente las mismas claves.

export const PROFILE = {
  // La marca comercial. La persona detrás sigue teniendo nombre y cara: eso es
  // lo que separa una marca personal de una agencia sin rostro.
  //
  // Es el único sitio donde se escribe: de aquí salen el `aria-label` de la
  // barra y el `alternateName` del JSON-LD. El logotipo NO lo lee —lleva la
  // palabra dibujada en trazos, que los genera scripts/logo.py—, así que si
  // cambia la marca hay que volver a pasar ese script además de tocar esta
  // línea y el <title> de index.html.
  brand: 'RuberpDev',
  name: 'Rubén Reto Panta',
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

/*
 * Capturas por tema. En oscuro salen de `proyectos/oscuro/` (las genera
 * `scripts/capturas-estilo.py`), porque una captura clara a pantalla completa
 * deslumbra sobre el negro; encima, `--shot-filter` las atenúa un poco más.
 *
 * Es la única excepción a que el estilo no cambie nada más que variables: aquí
 * cambia un archivo, no cómo se pinta un componente. Se resuelve en `Hero` y en
 * `Projects`; de ahí para abajo todos reciben rutas ya resueltas.
 */
export function shotFor(theme, ruta) {
  if (theme === 'oscuro') return ruta.replace('/proyectos/', '/proyectos/oscuro/')
  return ruta
}

// wa.me abre la conversación en app o en web según el dispositivo.
export function whatsappUrl(message) {
  const base = `https://wa.me/${PROFILE.whatsapp}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

/*
 * Los dos casos. En la home cada uno ocupa una tarjeta con UNA captura y tres
 * líneas —problema, solución, resultado—; las demás capturas viven detrás del
 * visor, a un clic. Antes cada caso ocupaba tres pantallas.
 *
 * `shots` son capturas reales en producción; las del sistema de Arin llevan los
 * datos de cliente difuminados. El orden manda: cada ruta se empareja por índice
 * con `shots` del idioma.
 */
export const PROJECTS = [
  {
    id: 'muestras',
    year: '2026',
    client: 'Arin S.A.',
    url: null, // Sistema interno: no hay demo pública.
    stack: ['React', 'Node.js', 'Express', 'MongoDB'],
    shots: [
      '/proyectos/muestras-1.webp',
      '/proyectos/muestras-2.webp',
      '/proyectos/muestras-3.webp',
      '/proyectos/muestras-4.webp',
      '/proyectos/muestras-5.webp',
      '/proyectos/muestras-6.webp',
      '/proyectos/muestras-7.webp',
      '/proyectos/muestras-8.webp',
    ],
  },
  {
    id: 'jm-consulting',
    year: '2026',
    client: 'J&M Consulting Foods',
    url: 'https://jm-consulting-foods.netlify.app/',
    stack: ['React', 'Node.js', 'MongoDB', 'Netlify'],
    shots: [
      '/proyectos/jm-1.webp',
      '/proyectos/jm-2.webp',
      '/proyectos/jm-3.webp',
      '/proyectos/jm-4.webp',
      '/proyectos/jm-5.webp',
      '/proyectos/jm-6.webp',
    ],
  },
]

// Sólo se nombra la institución; el detalle del certificado no va en el sitio.
export const UNIVERSITY = 'Pontificia Universidad Católica del Perú'


export const CONTENT = {
  es: {
    langLabel: 'EN',
    langAria: 'Cambiar idioma a inglés',

    /*
     * Los dos temas. El identificador vive en `hooks/useTheme.js` y el color en
     * `index.css`: aquí sólo está lo que lee el visitante. El botón dice el
     * tema al que LLEVA.
     */
    theme: {
      toDark: 'Cambiar a modo oscuro',
      toLight: 'Cambiar a modo claro',
    },

    nav: {
      services: 'Soluciones',
      projects: 'Proyectos',
      process: 'Proceso',
      contact: 'Contacto',
      talk: 'Hablemos',
      language: 'Ver en inglés',
      menu: 'Menú',
      close: 'Cerrar menú',
    },

    hero: {
      kicker: 'Dos proyectos en producción · Míralos por dentro',
      headline: 'Transformo procesos complejos en soluciones digitales simples.',
      lead: 'Diseño y desarrollo páginas web, sistemas y experiencias digitales adaptadas a las necesidades reales de cada negocio.',
      ctaPrimary: 'Hablemos de tu proyecto',
      ctaSecondary: 'Ver proyectos reales',
      /*
       * Adelanto de las soluciones, en una línea. Sustituye a la fila de tipos
       * de cliente (emprendedores, talleres, consultoras…), que ocupaba mucho
       * sitio y no ayudaba a decidir.
       */
      services: [
        'Páginas web corporativas',
        'Sistemas web a medida',
        'Automatización de procesos',
        'Integraciones de servicios',
      ],
      // El visor del hero. Los pies de foto salen de `projects.items`.
      deck: {
        tag: 'Un vistazo a cada proyecto',
        prev: 'Captura anterior',
        next: 'Captura siguiente',
        pause: 'Pausar la secuencia',
        play: 'Reanudar la secuencia',
      },
    },

    services: {
      eyebrow: '¿Qué puedo hacer por tu negocio?',
      title: 'Soluciones digitales pensadas en tus objetivos.',
      subtitle:
        'Cada negocio tiene necesidades diferentes. Por eso construyo soluciones a medida que te ayudan a trabajar mejor, ahorrar tiempo y hacer crecer tu negocio.',
      items: [
        {
          title: 'Páginas web',
          text: 'Sitios corporativos, landings y tiendas en línea que comunican tu marca y generan confianza.',
        },
        {
          title: 'Sistemas web',
          text: 'Herramientas y aplicaciones que ordenan tu operación y te devuelven el control sobre ella.',
        },
        {
          title: 'Automatización',
          text: 'Lo que hoy se repite a mano cada semana pasa a hacerlo el sistema, y sin errores.',
        },
        {
          title: 'Integraciones',
          text: 'Conecto tus sistemas, APIs y servicios externos para que todo funcione en un solo lugar.',
        },
      ],
    },

    process: {
      eyebrow: 'Del proyecto al acompañamiento',
      title: 'Tu proyecto, en buenas manos. Siempre.',
      subtitle:
        'No entrego el proyecto y desaparezco: te acompaño durante todo el proceso y también después del lanzamiento.',
      steps: [
        { title: 'Conversamos', text: 'Entendemos qué necesita tu negocio y dónde se traba hoy.' },
        { title: 'Diseñamos', text: 'Definimos la experiencia y la forma de la solución.' },
        { title: 'Desarrollamos', text: 'Construyo el sistema por entregas que puedes revisar.' },
        { title: 'Lanzamos', text: 'Ponemos en marcha la solución y capacito a quien va a usarla.' },
        {
          title: 'Te acompaño',
          text: 'Después del lanzamiento sigo contigo para soporte, mejoras y evolución del proyecto.',
        },
      ],
    },

    projects: {
      eyebrow: 'Casos reales',
      title: 'Proyectos que solucionan problemas.',
      subtitle:
        'Una página web y un sistema interno, construidos de cero este año y funcionando hoy. Son cosas distintas y las dos las hago yo, de principio a fin.',
      clientLabel: 'Cliente',
      viewLive: 'Ver el sitio',
      privateLabel: 'Sistema interno',
      problemLabel: 'Problema',
      solutionLabel: 'Solución',
      resultLabel: 'Resultado',
      toolsLabel: 'Construido con',
      galleryLabel: 'Capturas del sistema',
      closeShot: 'Cerrar la captura',
      prev: 'Captura anterior',
      next: 'Captura siguiente',
      items: {
        muestras: {
          type: 'Sistema web',
          name: 'Sistema de Gestión de Muestras',
          evidenceNote: 'Capturas reales en producción. Los datos de cliente van difuminados.',
          problem:
            'El control de cada muestra vivía en hojas de cálculo y nadie sabía con certeza dónde estaba ni quién la había tocado.',
          solution:
            'Una plataforma con seguimiento por estados, historial firmado, calendario de cierres y reportes de vencimiento.',
          result:
            'En producción. Cada movimiento queda firmado y cambiar un feriado recalcula los plazos de todo el sistema.',
          shots: [
            'Panel de control: pendientes, finalizados y aprobados, con la carga de cada proceso al día.',
            'Listado de diseños: filtros combinados por estado y categoría, con exportación a Excel.',
            'Calendario de cierres: el año completo, coloreado por muestras vencidas, por vencer y a tiempo.',
            'Ficha del diseño: las aprobaciones quedan firmadas con nombre y fecha, y el historial guarda cada cambio.',
            'Reporte de vencimientos: porcentaje por estado, distribución por unidad de negocio y piezas por kilataje.',
            'Reporte de muestras: curva de cierres, estados del periodo y tiempo promedio de entrega.',
            'Mantenimiento de feriados: un cambio acá recalcula los plazos de todo el sistema.',
            'Los reportes del sistema, agrupados: por semana, por mes, por diseñador y por vencimiento.',
          ],
        },
        'jm-consulting': {
          type: 'Página web',
          name: 'J&M Consulting Foods',
          evidenceNote: 'Capturas reales del sitio en producción.',
          problem:
            'Dependían de terceros para publicar cualquier cambio y las consultas llegaban desordenadas por vías distintas.',
          solution:
            'El sitio completo con su catálogo de trámites y un panel con acceso autenticado para que publiquen ellos.',
          result:
            'En uso con dominio propio. El equipo gestiona su contenido sin tocar código y recibe las consultas ya armadas.',
          shots: [
            'Portada de J&M: la propuesta de valor y el paso directo a WhatsApp.',
            'Catálogo de servicios con el detalle de cada trámite y certificación.',
            'Capacitaciones: fotos reales de los talleres, cada una con su pie de foto.',
            'El proceso en cuatro etapas, para que el cliente sepa dónde está.',
            'Los sectores de alimentos que atienden, listados uno a uno.',
            'Carrusel de las empresas que ya trabajaron con la consultora.',
          ],
        },
      },
    },

    contact: {
      eyebrow: '¿Tienes un proyecto en mente?',
      title: 'Hablemos y hagamos realidad tu idea.',
      text: 'Cuéntame qué necesitas y encontremos juntos la mejor solución para tu negocio.',
      // La única presencia personal de la home, y va justo donde se decide.
      about:
        'Soy Rubén, desarrollador full stack especializado en crear soluciones digitales para negocios. Me apoyo en inteligencia artificial para avanzar más rápido y entregarte antes, pero las decisiones las tomo yo y todo pasa por mi revisión. Hablas directamente conmigo, del primer boceto al despliegue.',
      cta: 'Hablemos de tu proyecto',
      ctaNote: 'Te contesto yo, no un formulario automático.',
      whatsappAria: 'Escribirme por WhatsApp',
      whatsappMessage:
        'Hola Rubén, vi tu sitio y quisiera conversar sobre un proyecto para mi negocio.',
      formLabel: 'O escríbeme desde aquí',
      formName: 'Tu nombre',
      formNamePlaceholder: 'Opcional',
      formMessage: '¿Qué necesitas?',
      formMessagePlaceholder:
        'Ej.: llevamos el control de pedidos en Excel y se nos pierden cosas.',
      formSend: 'Enviar por WhatsApp',
      formNote:
        'Se abre WhatsApp con tu mensaje ya escrito. El sitio no guarda nada ni te pide más datos.',
    },

    footer: {
      role: 'Diseño web y software a medida',
      rights: 'Todos los derechos reservados.',
      top: 'Volver arriba',
      contact: 'Contacto',
      site: {
        label: 'Sitio',
        lines: [
          'Diseñado y construido por mí',
          'Claro y oscuro, un mismo contenido',
          'Desplegado en Vercel',
        ],
      },
    },
  },

  en: {
    langLabel: 'ES',
    langAria: 'Switch language to Spanish',

    theme: {
      toDark: 'Switch to dark mode',
      toLight: 'Switch to light mode',
    },

    nav: {
      services: 'Solutions',
      projects: 'Projects',
      process: 'Process',
      contact: 'Contact',
      talk: 'Let us talk',
      language: 'View in Spanish',
      menu: 'Menu',
      close: 'Close menu',
    },

    hero: {
      kicker: 'Two projects in production · See them from the inside',
      headline: 'I turn complex processes into simple digital solutions.',
      lead: 'I design and build websites, systems and digital experiences shaped around what each business actually needs.',
      ctaPrimary: 'Let us talk about your project',
      ctaSecondary: 'See real projects',
      services: [
        'Corporate websites',
        'Custom web systems',
        'Process automation',
        'Service integrations',
      ],
      deck: {
        tag: 'A glance at each project',
        prev: 'Previous screen',
        next: 'Next screen',
        pause: 'Pause the sequence',
        play: 'Resume the sequence',
      },
    },

    services: {
      eyebrow: 'What can I do for your business?',
      title: 'Digital solutions built around your goals.',
      subtitle:
        'Every business has different needs. That is why I build tailored solutions that help you work better, save time and grow your business.',
      items: [
        {
          title: 'Websites',
          text: 'Corporate sites, landing pages and online shops that communicate your brand and build trust.',
        },
        {
          title: 'Web systems',
          text: 'Tools and applications that put your operation in order and give you back control over it.',
        },
        {
          title: 'Automation',
          text: 'What is repeated by hand every week becomes the system’s job, and with no mistakes.',
        },
        {
          title: 'Integrations',
          text: 'I connect your systems, APIs and external services so everything works in one place.',
        },
      ],
    },

    process: {
      eyebrow: 'From the project to the follow-up',
      title: 'Your project, in good hands. Always.',
      subtitle:
        'I do not hand the project over and disappear: I stay with you through the whole process, and after launch too.',
      steps: [
        { title: 'We talk', text: 'We work out what your business needs and where it gets stuck today.' },
        { title: 'We design', text: 'We define the experience and the shape of the solution.' },
        { title: 'We build', text: 'I develop the system in increments you can review.' },
        { title: 'We launch', text: 'We go live and I train whoever is going to use it.' },
        {
          title: 'I stay with you',
          text: 'After launch I keep working with you on support, improvements and where the project goes next.',
        },
      ],
    },

    projects: {
      eyebrow: 'Real cases',
      title: 'Projects that solve problems.',
      subtitle:
        'A website and an internal system, built from scratch this year and running today. They are different jobs and I do both, end to end.',
      clientLabel: 'Client',
      viewLive: 'Visit the site',
      privateLabel: 'Internal system',
      problemLabel: 'Problem',
      solutionLabel: 'Solution',
      resultLabel: 'Result',
      toolsLabel: 'Built with',
      galleryLabel: 'System screens',
      closeShot: 'Close the screen',
      prev: 'Previous screen',
      next: 'Next screen',
      items: {
        muestras: {
          type: 'Web system',
          name: 'Sample Management System',
          evidenceNote: 'Real screens in production. Client data is blurred out.',
          problem:
            'Tracking for every sample lived in spreadsheets and nobody knew for certain where it was or who had touched it.',
          solution:
            'A platform with status tracking, a signed history, a closing calendar and due-date reports.',
          result:
            'In production. Every movement is signed, and changing one holiday recalculates deadlines across the system.',
          shots: [
            'Dashboard: pending, finished and approved, with each process load up to date.',
            'Design list: combined status and category filters, with Excel export.',
            'Deadline calendar: the full year, colour-coded by overdue, due soon and on time.',
            'Design record: approvals signed with name and date, and a history of every change.',
            'Overdue report: share by status, split by business unit and pieces by karat.',
            'Sample report: closing curve, period statuses and average delivery time.',
            'Holiday settings: one change here recalculates deadlines across the system.',
            'All system reports, grouped: by week, month, designer and due date.',
          ],
        },
        'jm-consulting': {
          type: 'Website',
          name: 'J&M Consulting Foods',
          evidenceNote: 'Real screens of the site in production.',
          problem:
            'They depended on others to publish any change, and enquiries arrived scattered across different channels.',
          solution:
            'The full site with its catalog of procedures and an authenticated panel so they publish themselves.',
          result:
            'In use on its own domain. The team manages its content without touching code and gets enquiries ready to answer.',
          shots: [
            'J&M home: the value proposition and a direct step to WhatsApp.',
            'Service catalogue detailing every procedure and certification.',
            'Training: real workshop photos, each with its own caption.',
            'A four-stage process, so the client always knows where things stand.',
            'The food sectors they serve, listed one by one.',
            'Carousel of companies that have already worked with the consultancy.',
          ],
        },
      },
    },

    contact: {
      eyebrow: 'Have a project in mind?',
      title: 'Let us talk and make your idea real.',
      text: 'Tell me what you need and let us find the best solution for your business together.',
      about:
        'I am Rubén, a full stack developer specialised in building digital solutions for businesses. I lean on AI to move faster and deliver sooner, but the decisions are mine and everything goes through my review. You work directly with me, from the first sketch to deployment.',
      cta: 'Let us talk about your project',
      ctaNote: 'You get me, not an automated form.',
      whatsappAria: 'Message me on WhatsApp',
      whatsappMessage:
        'Hi Rubén, I saw your site and would like to discuss a project for my business.',
      formLabel: 'Or write to me from here',
      formName: 'Your name',
      formNamePlaceholder: 'Optional',
      formMessage: 'What do you need?',
      formMessagePlaceholder:
        'E.g.: we track orders in a spreadsheet and things keep slipping through.',
      formSend: 'Send via WhatsApp',
      formNote:
        'This opens WhatsApp with your message already written. The site stores nothing and asks for nothing else.',
    },

    footer: {
      role: 'Web design and custom software',
      rights: 'All rights reserved.',
      top: 'Back to top',
      contact: 'Contact',
      site: {
        label: 'Site',
        lines: [
          'Designed and built by me',
          'Light and dark, one same content',
          'Deployed on Vercel',
        ],
      },
    },
  },
}
