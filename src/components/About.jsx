import Section from './Section'

export default function About({ t }) {
  return (
    <Section
      id="about"
      index="01"
      eyebrow={t.about.eyebrow}
      title={t.about.title}
    >
      <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div className="reveal space-y-5">
          {t.about.body.map((paragraph, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? 'text-lg leading-relaxed text-bright'
                  : 'leading-relaxed text-soft'
              }
            >
              {paragraph}
            </p>
          ))}
        </div>

        <ul className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-1">
          {t.about.pillars.map((pillar) => (
            <li
              key={pillar.title}
              className="reveal bg-ink px-6 py-6 transition-colors hover:bg-raised"
            >
              <h3 className="text-sm font-medium tracking-tight text-bright">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{pillar.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
