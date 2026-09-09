import { PROJECTS, whatsappUrl } from '../data/content'
import { ArrowRight } from './icons'
import { Arc, Words } from './ui'
import DeviceMock from './DeviceMock'

/*
 * El hero no vende el oficio, vende el resultado. Primero la frase de negocio a
 * tamaño de cartel, y justo debajo la prueba: un sistema en producción y una web
 * real, grandes, sin adornos.
 *
 * La composición es asimétrica: el titular ocupa siete columnas por la izquierda
 * y el texto de apoyo cae a la derecha alineado abajo, así que no comparten eje
 * ni línea de base. Tiene que sostenerse igual a 375px.
 */
export default function Hero({ t }) {
  return (
    <section
      id="top"
      className="hero-fill relative flex min-h-svh flex-col justify-center overflow-hidden pt-28 pb-16 md:pt-32"
    >
      <Arc className="-top-[34rem] -right-[26rem] size-[58rem]" />

      <div className="shell relative">
        <div className="grid gap-x-10 gap-y-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="reveal eyebrow">{t.hero.kicker}</p>

            <h1 className="reveal-words display mt-6 text-[2.75rem] text-heading sm:text-[3.75rem] lg:text-[4.5rem] xl:text-[5rem]">
              <Words text={t.hero.headline} />
            </h1>
          </div>

          <div className="reveal lg:col-span-4 lg:col-start-9 lg:pb-3">
            <p className="max-w-xl text-lg leading-relaxed text-ink-soft">{t.hero.lead}</p>
            <p className="mt-4 max-w-xl leading-relaxed text-ink-soft">{t.hero.leadSecondary}</p>
          </div>
        </div>

        <div className="reveal mt-10 flex flex-wrap items-center gap-3">
          <a
            href={whatsappUrl(t.contact.whatsappMessage)}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-primary magnetic group pr-3 pl-7"
          >
            {t.hero.ctaPrimary}
            <span className="flex size-9 items-center justify-center rounded-full btn-badge transition-transform group-hover:translate-x-0.5">
              <ArrowRight width={16} height={16} />
            </span>
          </a>

          <a href="#services" className="btn-ghost">
            {t.hero.ctaSecondary}
          </a>
        </div>

        <p className="reveal mt-4 text-sm text-ink-soft">{t.hero.ctaNote}</p>

        {/*
          Para quién es esto, antes de que haya que bajar tres pantallas: alguien
          con una tienda de barrio necesita saber que también le hablo a él.
        */}
        <div className="reveal mt-8 flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="eyebrow eyebrow-plain">{t.hero.sectorsLabel}</span>
          {t.hero.sectors.map((sector) => (
            <span key={sector} className="tag">
              {sector}
            </span>
          ))}
        </div>

        {/*
          La prueba, no un adorno. Va a ancho completo y asoma por debajo del
          pliegue a propósito: invita a bajar sin necesidad de una flecha.
        */}
        <div className="reveal mt-14 md:mt-16" data-parallax="0.08">
          <DeviceMock
            priority
            laptop={{
              src: '/proyectos/muestras-1.webp',
              alt: t.hero.mock.laptopAlt,
              label: PROJECTS[0].frameLabel,
            }}
            phone={{ src: '/proyectos/jm-movil.webp', alt: t.hero.mock.phoneAlt }}
          />
        </div>

        {/* Tres afirmaciones verificables con los casos de más abajo. */}
        <dl className="stagger mt-16 grid gap-x-10 gap-y-8 border-t border-line pt-8 sm:grid-cols-3 md:mt-20">
          {t.hero.proof.map((item, i) => (
            <div key={i} className="reveal">
              <dt className="font-semibold text-ink">{item.value}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-ink-soft">{item.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
