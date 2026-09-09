import Section from './Section'
import { Arc } from './ui'

/*
 * Proceso y acompañamiento en una sola sección, no en dos. Cinco pasos en una
 * fila: el recorrido completo se lee de un vistazo, sin scroll.
 *
 * El quinto va destacado a propósito. "No te dejamos solo después del
 * lanzamiento" es el argumento comercial que más separa a RubenDev de quien
 * entrega un proyecto y desaparece, así que no puede parecer un paso más.
 */
export default function Process({ t }) {
  const ultimo = t.process.steps.length - 1

  return (
    <Section
      id="process"
      eyebrow={t.process.eyebrow}
      title={t.process.title}
      subtitle={t.process.subtitle}
    >
      <Arc className="-top-[24rem] -left-[26rem] size-[50rem]" />

      <ol className="stagger relative grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
        {t.process.steps.map((step, i) => {
          const destacado = i === ultimo
          return (
            <li
              key={i}
              className={`reveal block-top border-t pt-5 ${
                destacado ? 'border-accent' : 'border-line'
              }`}
            >
              <span
                aria-hidden
                className={`display text-[1.75rem] leading-none ${
                  destacado ? 'text-accent' : 'text-accent/40'
                }`}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="block-title eyebrow eyebrow-plain mt-4 block">{step.title}</h3>
              <p
                className={`mt-2.5 text-sm leading-relaxed ${
                  destacado ? 'text-ink' : 'text-ink-soft'
                }`}
              >
                {step.text}
              </p>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
