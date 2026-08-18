import Section from './Section'
import { Arc } from './ui'

export default function Process({ t }) {
  return (
    <Section
      id="process"
      eyebrow={t.process.eyebrow}
      title={t.process.title}
      subtitle={t.process.subtitle}
    >
      <Arc className="-top-[30rem] -right-[32rem] size-[66rem]" />

      <ol className="relative grid gap-3 md:grid-cols-2">
        {t.process.steps.map((step, i) => (
          <li
            key={step.title}
            className="reveal card p-7 transition-colors hover:bg-raised md:p-9"
          >
            <span className="display text-[2.5rem] text-line-strong">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-5 font-mono text-base text-bright">{step.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{step.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
