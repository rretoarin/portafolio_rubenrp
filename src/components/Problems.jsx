import Section from './Section'
import { ArrowRight } from './icons'
import { Arc } from './ui'

/*
 * La sección que hace que el visitante se reconozca. Va inmediatamente después
 * del hero y antes de hablar de soluciones: si no se identifica con el problema,
 * el catálogo de servicios no le dice nada.
 *
 * Composición editorial, no cuadrícula de tarjetas: una lista numerada a ancho
 * completo, con el título a la izquierda y la explicación a la derecha. Cinco
 * síntomas leídos como observaciones, no como cinco productos.
 */
export default function Problems({ t }) {
  return (
    <Section
      id="problems"
      eyebrow={t.problems.eyebrow}
      title={t.problems.title}
      subtitle={t.problems.subtitle}
    >
      <Arc className="-bottom-[32rem] -left-[24rem] size-[54rem]" />

      <ul className="stagger relative">
        {t.problems.items.map((item, i) => (
          <li key={i} className="reveal block border-t border-line py-7 md:py-9">
            <div className="grid gap-x-12 gap-y-3 md:grid-cols-[3rem_1fr_1.1fr] md:items-baseline">
              <span className="block-num text-xs font-bold tracking-widest">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="block-title display-light text-xl md:text-[1.625rem]">
                {item.title}
              </h3>
              <p className="leading-relaxed text-ink-soft">{item.text}</p>
            </div>
          </li>
        ))}
      </ul>

      {/*
        El puente hacia las soluciones. Cierra el diagnóstico y abre la
        conversación: es la única frase de la sección que pide algo.
      */}
      <div className="reveal mt-14 border-t border-line pt-10">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_auto] lg:items-center">
          <p className="display-light max-w-3xl text-xl text-ink sm:text-2xl">
            {t.problems.closing}
          </p>
          <a
            href="#contact"
            className="btn-primary magnetic group shrink-0 justify-self-start pr-3 pl-7"
          >
            {t.problems.cta}
            <span className="flex size-9 items-center justify-center rounded-full btn-badge transition-transform group-hover:translate-x-0.5">
              <ArrowRight width={16} height={16} />
            </span>
          </a>
        </div>
      </div>
    </Section>
  )
}
