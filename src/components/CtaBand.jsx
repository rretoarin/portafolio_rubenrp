import { whatsappUrl } from '../data/content'
import { ArrowRight } from './icons'

/*
 * El CTA de la mitad de la página. Existe porque nadie está obligado a leerlo
 * todo para decidirse: quien ya se ha convencido con los casos no debería tener
 * que recorrer tres secciones más para encontrar dónde escribir.
 *
 * Va sobre superficie y sin filete propio: separa dos bloques sin fingir que es
 * una sección más. Es la segunda de las dos únicas franjas de fondo del sitio.
 */
export default function CtaBand({ t }) {
  return (
    <section className="relative overflow-hidden py-16 md:py-20">
      <div className="shell">
        <div className="reveal card overflow-hidden p-8 md:p-14">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_auto] lg:items-center">
            <div>
              <h2 className="display text-[1.75rem] text-heading sm:text-[2.25rem] lg:text-[2.75rem]">
                {t.cta.title}
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">{t.cta.text}</p>
            </div>

            <a
              href={whatsappUrl(t.contact.whatsappMessage)}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-primary magnetic group shrink-0 justify-self-start pr-3 pl-7"
            >
              {t.cta.button}
              <span className="flex size-9 items-center justify-center rounded-full btn-badge transition-transform group-hover:translate-x-0.5">
                <ArrowRight width={16} height={16} />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
