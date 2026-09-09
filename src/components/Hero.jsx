import { PROFILE, whatsappUrl } from '../data/content'
import { ArrowRight } from './icons'
import { Arc, Frame, Words } from './ui'

/*
 * El hero no vende el oficio, vende el resultado: primero la frase de negocio,
 * y como prueba inmediata una captura real del sistema de Arin en la ventana.
 * La evidencia va arriba, no enterrada en una sección de proyectos.
 */
export default function Hero({ t }) {
  return (
    <section
      id="top"
      className="hero-fill relative flex min-h-svh items-center overflow-hidden pt-28 pb-16 md:pt-32"
    >
      <Arc className="-top-[34rem] -right-[26rem] size-[58rem]" />

      <div className="shell relative">
        <div className="grid gap-x-10 gap-y-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <p className="reveal eyebrow">{t.hero.kicker}</p>

            <h1 className="reveal-words display mt-6 text-[2.5rem] sm:text-[3.25rem] lg:text-[3.75rem] xl:text-[4.25rem]">
              <Words text={t.hero.headline} />
            </h1>

            <p className="reveal mt-8 max-w-xl text-lg leading-relaxed text-ink-soft">
              {t.hero.lead}
            </p>
            <p className="reveal mt-4 max-w-xl leading-relaxed text-ink-soft">
              {t.hero.leadSecondary}
            </p>

            <div className="reveal mt-10 flex flex-wrap items-center gap-3">
              <a
                href={whatsappUrl(t.contact.whatsappMessage)}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-primary magnetic group pr-3 pl-7"
              >
                {t.hero.ctaPrimary}
                <span className="flex size-9 items-center justify-center rounded-full bg-page text-ink transition-transform group-hover:translate-x-0.5">
                  <ArrowRight width={16} height={16} />
                </span>
              </a>

              <a href="#projects" className="btn-ghost">
                {t.hero.ctaSecondary}
              </a>
            </div>

            <p className="reveal mt-4 text-sm text-ink-soft">{t.hero.ctaNote}</p>
          </div>

          {/* La prueba, no un adorno: una pantalla del sistema en producción. */}
          <div className="reveal lg:col-span-6" data-parallax="0.14">
            <Frame label="arin · desarrollo de muestras" className="shadow-[0_18px_50px_-24px_rgba(11,13,18,0.28)]">
              <img
                src="/proyectos/muestras-1.webp"
                alt={`${PROFILE.name} — ${t.projects.items.muestras.shots[0]}`}
                width={1600}
                height={900}
                fetchPriority="high"
                decoding="async"
                className="block aspect-[16/10] w-full object-cover object-top"
              />
            </Frame>
          </div>
        </div>

        {/*
          Para quién es esto, antes de que haya que bajar tres pantallas: alguien
          con una tienda de barrio necesita saber que también le hablo a él.
        */}
        <div className="reveal mt-10 flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="eyebrow eyebrow-plain">{t.hero.sectorsLabel}</span>
          {t.hero.sectors.map((sector) => (
            <span key={sector} className="tag">
              {sector}
            </span>
          ))}
        </div>

        {/* Tres afirmaciones verificables con los casos de más abajo. */}
        <dl className="stagger mt-8 grid gap-x-10 gap-y-8 border-t border-line pt-8 sm:grid-cols-3">
          {t.hero.proof.map((item, i) => (
            <div key={i} className="reveal">
              <dt className="font-medium text-ink">{item.value}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-ink-soft">{item.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
