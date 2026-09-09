// Toda la copia del sitio vive aquí. Editar textos = editar este archivo,
// nunca los componentes. Cada idioma tiene exactamente las mismas claves.

export const PROFILE = {
  // La marca comercial. La persona detrás sigue teniendo nombre y cara: eso es
  // lo que separa una marca personal de una agencia sin rostro.
  brand: 'RubenDev',
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
 * El estilo oscuro tiene su propio juego de capturas, en `proyectos/oscuro/`:
 * invertidas y con las zonas de foto repegadas en color real
 * (`scripts/oscurecer.py`). No se resuelve con un filtro CSS a propósito —
 * `invert()` dejaría a las personas de las fotos en negativo, y el pie del caso
 * dice "tal como se ve hoy".
 *
 * Es la única excepción a que el estilo no cambie nada más que variables: aquí
 * cambia un archivo, no cómo se pinta un componente. Se resuelve en `Hero` y en
 * `Projects`, y de ahí para abajo todos reciben rutas ya resueltas.
 */
export function shotFor(theme, ruta) {
  return theme === 'oscuro' ? ruta.replace('/proyectos/', '/proyectos/oscuro/') : ruta
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
     * Los cuatro estilos. El identificador vive en `hooks/useTheme.js` y el
     * color en `index.css`: aquí sólo están los nombres que ve el visitante.
     */
    theme: {
      aria: 'Elegir el estilo visual del sitio',
      label: 'Estilo',
      names: { claro: 'Claro', oscuro: 'Oscuro', azul: 'Azul', verde: 'Verde' },
    },

    nav: {
      services: 'Soluciones',
      styles: 'Estilos',
      projects: 'Proyectos',
      process: 'Proceso',
      contact: 'Contacto',
      talk: 'Hablemos',
      menu: 'Menú',
      close: 'Cerrar menú',
    },

    hero: {
      kicker: 'Soluciones digitales para tu negocio',
      headline: 'Transformo procesos complejos en soluciones digitales simples.',
      lead: 'Diseño y desarrollo páginas web, sistemas y experiencias digitales adaptadas a las necesidades reales de cada negocio.',
      ctaPrimary: 'Hablemos de tu proyecto',
      ctaSecondary: 'Ver cómo trabajamos',
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
      mock: {
        laptopAlt: 'Panel del sistema de gestión de muestras, en producción',
        phoneAlt: 'Sitio de J&M Consulting Foods visto en un móvil',
        label: 'arin · desarrollo de muestras',
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

    styles: {
      eyebrow: 'Tu negocio, tu identidad',
      title: 'Un mismo objetivo. Diferentes estilos.',
      subtitle:
        'Cada negocio tiene una identidad diferente. Tu experiencia digital también debería tenerla.',
      note: 'El diseño cambia. La calidad no.',
      hint: 'El mismo contenido, diferentes estilos',
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
        'Dos sistemas construidos de cero este año y funcionando hoy. En los dos empecé por entender el proceso, no por elegir la tecnología.',
      clientLabel: 'Cliente',
      viewLive: 'Ver el sitio',
      privateLabel: 'Sistema interno',
      problemLabel: 'Problema',
      solutionLabel: 'Solución',
      resultLabel: 'Resultado',
      toolsLabel: 'Construido con',
      viewShots: 'Ver las {n} capturas',
      galleryLabel: 'Capturas del sistema',
      closeShot: 'Cerrar la captura',
      prev: 'Captura anterior',
      next: 'Captura siguiente',
      items: {
        muestras: {
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
          name: 'J&M Consulting Foods',
          evidenceNote: 'Capturas reales del sitio publicado, tal como se ve hoy.',
          problem:
            'Dependían de terceros para publicar cualquier cambio y las consultas llegaban desordenadas por vías distintas.',
          solution:
            'El sitio completo con su catálogo de trámites y un panel con acceso autenticado para que publiquen ellos.',
          result:
            'En uso con dominio propio. El equipo gestiona su contenido sin tocar código y recibe las consultas ya armadas.',
          shots: [
            'Portada: la propuesta de valor y el paso directo a WhatsApp.',
            'Catálogo de servicios con el detalle de cada trámite y certificación.',
            'Capacitaciones: fotos reales de los talleres, cada una con su pie de foto.',
            'El proceso en cuatro etapas, para que el cliente sepa en todo momento dónde está.',
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
        'Soy Rubén, desarrollador full stack especializado en crear soluciones digitales para negocios. Trabajas directamente conmigo, del primer boceto al despliegue.',
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
          'Cuatro estilos, un mismo contenido',
          'Desplegado en Vercel',
        ],
      },
    },
  },

  en: {
    langLabel: 'ES',
    langAria: 'Switch language to Spanish',

    theme: {
      aria: 'Choose the visual style of the site',
      label: 'Style',
      names: { claro: 'Light', oscuro: 'Dark', azul: 'Blue', verde: 'Green' },
    },

    nav: {
      services: 'Solutions',
      styles: 'Styles',
      projects: 'Projects',
      process: 'Process',
      contact: 'Contact',
      talk: 'Let us talk',
      menu: 'Menu',
      close: 'Close menu',
    },

    hero: {
      kicker: 'Digital solutions for your business',
      headline: 'I turn complex processes into simple digital solutions.',
      lead: 'I design and build websites, systems and digital experiences shaped around what each business actually needs.',
      ctaPrimary: 'Let us talk about your project',
      ctaSecondary: 'See how I work',
      services: [
        'Corporate websites',
        'Custom web systems',
        'Process automation',
        'Service integrations',
      ],
      mock: {
        laptopAlt: 'Dashboard of the sample management system, in production',
        phoneAlt: 'J&M Consulting Foods site seen on a phone',
        label: 'arin · desarrollo de muestras',
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

    styles: {
      eyebrow: 'Your business, your identity',
      title: 'One goal. Different styles.',
      subtitle:
        'Every business has a different identity. Your digital experience should have one too.',
      note: 'The design changes. The quality does not.',
      hint: 'The same content, different styles',
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
        'Two systems built from scratch this year and running today. In both I started by understanding the process, not by picking the technology.',
      clientLabel: 'Client',
      viewLive: 'Visit the site',
      privateLabel: 'Internal system',
      problemLabel: 'Problem',
      solutionLabel: 'Solution',
      resultLabel: 'Result',
      toolsLabel: 'Built with',
      viewShots: 'See all {n} screens',
      galleryLabel: 'System screens',
      closeShot: 'Close the screen',
      prev: 'Previous screen',
      next: 'Next screen',
      items: {
        muestras: {
          name: 'Sample Management System',
          evidenceNote: 'Real screens in production. Client data is blurred out.',
          problem:
            'Tracking for every sample lived in spreadsheets and nobody knew for certain where it was or who had touched it.',
          solution:
            'A platform with status tracking, a signed history, a closing calendar and due-date reports.',
          result:
            'In production. Every movement is signed, and changing one holiday recalculates deadlines across the system.',
          shots: [
            'Dashboard: pending, finished and approved work, with the load of every process up to date.',
            'Design list: combined filters by status and category, with Excel export.',
            'Closing calendar: the full year, colored by overdue, due soon and on-time samples.',
            'Design sheet: approvals are signed with name and date, and the history keeps every change.',
            'Due-date report: percentage by status, distribution by business unit and pieces by karat.',
            'Sample report: closing curve, statuses for the period and average lead time.',
            'Holiday maintenance: one change here recalculates deadlines across the whole system.',
            'The reports of the system, grouped: by week, by month, by designer and by due date.',
          ],
        },
        'jm-consulting': {
          name: 'J&M Consulting Foods',
          evidenceNote: 'Real screens of the published site, exactly as it looks today.',
          problem:
            'They depended on others to publish any change, and enquiries arrived scattered across different channels.',
          solution:
            'The full site with its catalog of procedures and an authenticated panel so they publish themselves.',
          result:
            'In use on its own domain. The team manages its content without touching code and gets enquiries ready to answer.',
          shots: [
            'Home: the value proposition and a direct path to WhatsApp.',
            'Service catalog detailing every procedure and certification.',
            'Training: real photos from the workshops, each one with its caption.',
            'The four-stage process, so the client always knows where they stand.',
            'The food sectors they serve, listed one by one.',
            'Carousel of the companies that already worked with the consultancy.',
          ],
        },
      },
    },

    contact: {
      eyebrow: 'Have a project in mind?',
      title: 'Let us talk and make your idea real.',
      text: 'Tell me what you need and let us find the best solution for your business together.',
      about:
        'I am Rubén, a full stack developer specialised in building digital solutions for businesses. You work directly with me, from the first sketch to deployment.',
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
          'Four styles, one same content',
          'Deployed on Vercel',
        ],
      },
    },
  },
}
