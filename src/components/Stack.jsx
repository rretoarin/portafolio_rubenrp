import { STACK, STACK_OPEN } from '../data/content'
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

      <div className="stagger relative grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {STACK.map((group) => (
          <div
            key={group.id}
            className={`reveal card px-6 py-6 ${SPAN[group.id]}`}
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

      {/*
       * Cierre de la sección: el stack de arriba es lo que uso a diario, esto es
       * lo que evita que un cliente lea esa lista como un techo. Va en una sola
       * tarjeta ancha para que se lea como una afirmación, no como otro grupo.
       */}
      <div className="reveal card relative mt-3 px-6 py-7 md:px-8 md:py-8">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
          <div>
            <h3 className="display text-xl text-bright sm:text-2xl">
              {t.stack.open.title}
            </h3>
            <p className="mt-5 text-sm leading-relaxed text-muted">
              {t.stack.open.body}
            </p>
          </div>

          <div>
            <p className="eyebrow">{t.stack.open.listLabel}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {STACK_OPEN.map((name) => (
                <span key={name} className="pill">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-8 border-t border-line pt-6 font-mono text-xs leading-relaxed text-soft sm:text-[0.8125rem]">
          {t.stack.open.note}
        </p>
      </div>
    </Section>
  )
}
