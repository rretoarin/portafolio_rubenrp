import Section from './Section'
import { Arc } from './ui'

export default function About({ t }) {
  return (
    <Section id="about" eyebrow={t.about.eyebrow} title={t.about.title}>
      <Arc className="-top-[20rem] -left-[34rem] size-[64rem]" />

      <div className="relative grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
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

        <ul className="stagger grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {t.about.pillars.map((pillar) => (
            <li
              key={pillar.title}
              className="reveal card px-6 py-5"
            >
              <h3 className="font-mono text-sm text-bright">{pillar.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">{pillar.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
