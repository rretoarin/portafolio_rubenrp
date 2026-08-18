import { STACK } from '../data/content'
import Section from './Section'
import { Arc } from './ui'

// Reparto tipo bento: alterna tarjetas anchas y angostas para romper la rejilla.
const SPAN = {
  frontend: 'lg:col-span-2',
  backend: 'lg:col-span-1',
  data: 'lg:col-span-1',
  tools: 'lg:col-span-2',
}

export default function Stack({ t }) {
  return (
    <Section
      id="stack"
      eyebrow={t.stack.eyebrow}
      title={t.stack.title}
      subtitle={t.stack.subtitle}
    >
      <Arc className="-top-[26rem] -left-[30rem] size-[62rem]" />

      <div className="relative grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {STACK.map((group) => (
          <div
            key={group.id}
            className={`reveal card px-6 py-6 transition-colors hover:bg-raised ${SPAN[group.id]}`}
          >
            <h3 className="font-mono text-base text-bright">
              {t.stack.groups[group.id]}
            </h3>
            <p className="mt-4 font-mono text-sm leading-loose text-soft">
              {group.items.map((item, i) => (
                <span key={item}>
                  {i > 0 && <span className="text-muted"> / </span>}
                  {item}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </Section>
  )
}
