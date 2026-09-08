import Section from './Section'
import { Arc } from './ui'

/*
 * Cuatro pasos con sangría creciente: el bloque desciende en diagonal en vez de
 * formar una lista alineada. La sección existe para bajar la incertidumbre del
 * cliente, así que cada paso dice qué pasa y qué recibe, no cómo se programa.
 */
const INDENT = ['lg:pl-0', 'lg:pl-12', 'lg:pl-24', 'lg:pl-36']

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
            className={`reveal border-t border-line py-9 md:py-12 ${INDENT[i]} ${
              i === t.process.steps.length - 1 ? 'border-b' : ''
            }`}
          >
            <div className="grid gap-x-10 gap-y-3 md:grid-cols-[6rem_1fr]">
              <span
                aria-hidden
                className="display text-[2.5rem] leading-none text-edge md:text-[3.25rem]"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="max-w-2xl">
                <h3 className="display-light text-2xl md:text-[1.75rem]">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{step.text}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
