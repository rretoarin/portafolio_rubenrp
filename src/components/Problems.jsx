import { ArrowRight } from './icons'
import { Arc, Eyebrow } from './ui'

/*
 * La sección que hace que el visitante se reconozca. Va inmediatamente después
 * del hero y antes de hablar de soluciones: si no se identifica con el problema,
 * el catálogo de servicios no le dice nada.
 *
 * Los cuatro síntomas van numerados y en dos columnas desfasadas para que se
 * lean como una lista de observaciones, no como cuatro tarjetas de producto.
 */
export default function Problems({ t }) {
  return (
    <section
      id="problems"
      className="relative scroll-mt-20 overflow-hidden py-20 md:py-28"
    >
      <Arc className="-bottom-[32rem] -left-[24rem] size-[54rem]" />

      <div className="shell relative">
        <div className="grid gap-x-10 gap-y-6 lg:grid-cols-12 lg:items-end">
          <header className="reveal lg:col-span-7">
            <Eyebrow>{t.problems.eyebrow}</Eyebrow>
            <h2 className="display mt-5 text-[2rem] sm:text-[2.5rem] lg:text-[3.25rem]">
              {t.problems.title}
            </h2>
          </header>
          <p className="reveal leading-relaxed text-ink-soft lg:col-span-4 lg:col-start-9 lg:pb-2">
            {t.problems.subtitle}
          </p>
        </div>

        <ul className="stagger mt-14 max-w-3xl space-y-10 md:mt-20">
          {t.problems.items.map((item, i) => (
            <li key={i} className="reveal block">
              <div className="flex items-baseline gap-4">
                <span className="block-num text-xs font-semibold tracking-widest">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span aria-hidden className="block-rule h-px flex-1 bg-line" />
              </div>
              <h3 className="block-title display-light mt-5 text-xl md:text-2xl">{item.title}</h3>
              <p className="mt-3 max-w-lg leading-relaxed text-ink-soft">{item.text}</p>
            </li>
          ))}
        </ul>

        {/*
          El puente hacia las soluciones. Es la única frase de la sección con
          fondo propio: cierra el diagnóstico y abre la conversación.
        */}
        <div className="reveal card mt-16 p-8 md:mt-20 md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_auto] lg:items-center">
            <p className="display-light text-xl text-ink sm:text-2xl">{t.problems.closing}</p>
            <a
              href="#contact"
              className="btn-primary magnetic group shrink-0 justify-self-start pr-3 pl-7"
            >
              {t.problems.cta}
              <span className="flex size-9 items-center justify-center rounded-full bg-page text-ink transition-transform group-hover:translate-x-0.5">
                <ArrowRight width={16} height={16} />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
