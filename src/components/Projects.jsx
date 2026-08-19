import { PROJECTS } from '../data/content'
import Carousel from './Carousel'
import Section from './Section'
import { ArrowUpRight, Lock } from './icons'
import { Arc, CircleLink } from './ui'

function Project({ project, copy, index, labels }) {
  const isLink = Boolean(project.url)
  const flipped = index % 2 === 1

  return (
    <article className="reveal relative grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className={flipped ? 'lg:order-2' : ''}>
        <p className="font-mono text-xs tracking-widest text-muted">
          {String(index + 1).padStart(2, '0')} · {project.year}
        </p>

        <h3 className="display mt-4 text-[1.75rem] md:text-[2.25rem]">{copy.name}</h3>

        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
          <span>{copy.tag}</span>
          {project.client && (
            <>
              <span aria-hidden className="h-3 w-px bg-line-strong" />
              <span>
                <span className="sr-only">{labels.clientLabel}: </span>
                <span className="text-soft">{project.client}</span>
                {copy.sector && <span> · {copy.sector}</span>}
              </span>
            </>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span key={tech} className="pill">
              {tech}
            </span>
          ))}
        </div>

        <p className="mt-7 leading-relaxed text-soft">{copy.summary}</p>
        <p className="mt-4 text-sm leading-relaxed text-muted">{copy.detail}</p>

        <div className="mt-8 flex items-center gap-4">
          {isLink ? (
            <>
              <CircleLink href={project.url} label={`${labels.viewLive} — ${copy.name}`} />
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer noopener"
                className="tap group inline-flex items-center gap-2 font-mono text-sm text-bright"
              >
                <span className="border-b border-line-strong pb-0.5 transition-colors group-hover:border-bright">
                  {labels.viewLive}
                </span>
                <ArrowUpRight width={14} height={14} className="text-muted" />
              </a>
            </>
          ) : (
            <span className="pill">
              <Lock width={13} height={13} />
              {labels.privateLabel}
            </span>
          )}
        </div>
      </div>

      <div className={flipped ? 'lg:order-1' : ''}>
        <div className="card p-7 md:p-9">
          <p className="eyebrow">{labels.highlightsLabel}</p>
          <ul className="mt-6 space-y-4">
            {copy.highlights.map((item, i) => (
              <li key={item} className="flex gap-4 text-sm leading-relaxed text-soft">
                <span className="font-mono text-xs text-muted tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/*
        Las capturas van a lo ancho: en media columna no se leería la interfaz.
        `min-w-0` es obligatorio: una celda de rejilla vale `min-width: auto` por
        defecto y se estiraría para caber la cinta entera en vez de encogerse.
      */}
      <div className="min-w-0 lg:order-3 lg:col-span-2">
        <Carousel
          shots={project.shots}
          captions={copy.shots}
          labels={labels}
          name={copy.name}
          frameLabel={project.frameLabel}
        />
      </div>
    </article>
  )
}

export default function Projects({ t }) {
  return (
    <Section
      id="projects"
      eyebrow={t.projects.eyebrow}
      title={t.projects.title}
      subtitle={t.projects.subtitle}
    >
      <Arc className="top-[10rem] -right-[38rem] size-[70rem]" />

      <div className="relative space-y-20 md:space-y-28">
        {PROJECTS.map((project, i) => (
          <Project
            key={project.id}
            project={project}
            copy={t.projects.items[project.id]}
            index={i}
            labels={t.projects}
          />
        ))}
      </div>
    </Section>
  )
}
