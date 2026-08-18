import { PROJECTS } from '../data/content'
import Section from './Section'
import { ArrowUpRight, Lock } from './icons'

function Project({ project, copy, index, labels }) {
  const isLink = Boolean(project.url)

  return (
    <article className="reveal group relative border-t border-line pt-8 md:pt-10">
      <div className="grid gap-8 md:grid-cols-[auto_1fr] md:gap-12">
        <div className="font-mono text-xs tracking-widest text-muted md:w-20">
          <span className="text-bright">{index}</span>
          <span className="mx-2 md:hidden">·</span>
          <span className="md:mt-2 md:block">{project.year}</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
          <div>
            <h3 className="text-2xl font-normal tracking-tight text-bright md:text-3xl">
              {isLink ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-start gap-2 decoration-line-strong underline-offset-8 hover:underline"
                >
                  {copy.name}
                  <ArrowUpRight
                    width={18}
                    height={18}
                    className="mt-1.5 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bright"
                  />
                </a>
              ) : (
                copy.name
              )}
            </h3>

            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
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

            <p className="mt-5 leading-relaxed text-soft">{copy.summary}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted">{copy.detail}</p>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-line px-3 py-1 font-mono text-[0.6875rem] tracking-wide text-soft"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-7">
              {isLink ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 border-b border-line-strong pb-1 text-sm text-bright transition-colors hover:border-bright"
                >
                  {labels.viewLive}
                  <ArrowUpRight width={14} height={14} />
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 text-sm text-muted">
                  <Lock width={14} height={14} />
                  {labels.privateLabel}
                </span>
              )}
            </div>
          </div>

          <ul className="space-y-3 self-start rounded-lg border border-line bg-surface p-6">
            {copy.highlights.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-soft">
                <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-line-strong" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}

export default function Projects({ t }) {
  return (
    <Section
      id="projects"
      index="02"
      eyebrow={t.projects.eyebrow}
      title={t.projects.title}
      subtitle={t.projects.subtitle}
    >
      <div className="space-y-14 md:space-y-20">
        {PROJECTS.map((project, i) => (
          <Project
            key={project.id}
            project={project}
            copy={t.projects.items[project.id]}
            index={String(i + 1).padStart(2, '0')}
            labels={t.projects}
          />
        ))}
      </div>
    </Section>
  )
}
