import { STACK } from '../data/content'
import Section from './Section'

export default function Stack({ t }) {
  return (
    <Section
      id="stack"
      index="04"
      eyebrow={t.stack.eyebrow}
      title={t.stack.title}
      subtitle={t.stack.subtitle}
    >
      <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {STACK.map((group) => (
          <div key={group.id} className="reveal bg-ink px-6 py-7">
            <h3 className="eyebrow">{t.stack.groups[group.id]}</h3>
            <ul className="mt-5 space-y-2.5">
              {group.items.map((item) => (
                <li key={item} className="text-sm text-soft">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
