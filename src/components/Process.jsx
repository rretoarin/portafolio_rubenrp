import Section from './Section'

export default function Process({ t }) {
  return (
    <Section
      id="process"
      index="03"
      eyebrow={t.process.eyebrow}
      title={t.process.title}
      subtitle={t.process.subtitle}
    >
      <ol className="grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2">
        {t.process.steps.map((step, i) => (
          <li
            key={step.title}
            className="reveal group relative bg-ink p-7 transition-colors hover:bg-raised md:p-9"
          >
            <span className="font-mono text-xs tracking-widest text-muted">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-4 text-lg font-normal tracking-tight text-bright">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{step.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
