import Section from './Section'
import { Arc } from './ui'

/*
 * Cinco pasos. La sección existe para bajar la incertidumbre de quien nunca ha
 * encargado software: cada paso dice qué pasa y qué recibe, no cómo se programa.
 *
 * El número va grande y en el filete, a la izquierda; el texto ocupa una columna
 * cómoda de lectura. Antes iban en diagonal con sangría creciente, y con cinco
 * pasos el último acababa demasiado a la derecha.
 */
export default function Process({ t }) {
  return (
    <Section
      id="process"
      eyebrow={t.process.eyebrow}
      title={t.process.title}
      subtitle={t.process.subtitle}
    >
      <Arc className="-top-[26rem] -left-[28rem] size-[54rem]" />

      <ol className="stagger relative">
        {t.process.steps.map((step, i) => (
          <li
            key={i}
            className={`reveal block-top border-t border-line py-7 md:py-9 ${
              i === t.process.steps.length - 1 ? 'border-b' : ''
            }`}
          >
            <div className="grid gap-x-10 gap-y-2 md:grid-cols-[5rem_1fr]">
              <span
                aria-hidden
                className="display text-[2rem] leading-none text-accent/45 md:text-[2.75rem]"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="max-w-2xl">
                <h3 className="block-title display-light text-xl md:text-[1.625rem]">
                  {step.title}
                </h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{step.text}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
