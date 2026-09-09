import { useState } from 'react'
import { PROJECTS, shotFor } from '../data/content'
import Lightbox from './Lightbox'
import Section from './Section'
import { ArrowUpRight, Lock } from './icons'
import { Arc } from './ui'

/*
 * Un caso ya no ocupa tres pantallas. Cada uno es una tarjeta con una sola
 * captura y tres líneas —problema, solución, resultado—, que es exactamente lo
 * que un cliente necesita para decidir si esto se parece a su situación.
 *
 * Las demás capturas no se pierden: siguen todas en el visor, a un clic. Antes
 * se enseñaban catorce de golpe y la sección era la mitad de la página.
 */
function Caso({ project, copy, labels, shots, onOpen }) {
  const esEnlace = Boolean(project.url)

  return (
    <article className="reveal flex flex-col">
      {/* La captura abre la galería: es la puerta a la evidencia completa. */}
      <button
        type="button"
        onClick={() => onOpen(0)}
        aria-label={`${labels.galleryLabel} — ${copy.name}`}
        className="shot group block overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface"
      >
        <img
          src={shots[0]}
          alt={`${copy.name} — ${copy.shots[0]}`}
          width={1600}
          height={900}
          loading="lazy"
          decoding="async"
          className="shot-img block aspect-[16/10] w-full object-cover object-top transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
        />
      </button>

      <p className="mt-3 text-xs text-ink-soft">{copy.evidenceNote}</p>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <span className="tag">
          <span className="sr-only">{labels.clientLabel}: </span>
          {project.client}
        </span>
        <span className="tag">{project.year}</span>
        {esEnlace ? (
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer noopener"
            className="tap link group inline-flex items-center gap-1.5 text-sm font-medium"
          >
            {labels.viewLive}
            <ArrowUpRight
              width={14}
              height={14}
              className="text-ink-soft transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        ) : (
          <span className="tag">
            <Lock width={11} height={11} />
            {labels.privateLabel}
          </span>
        )}
      </div>

      <h3 className="display mt-4 text-[1.625rem] text-heading md:text-[1.875rem]">{copy.name}</h3>

      <dl className="mt-6 space-y-4">
        {[
          [labels.problemLabel, copy.problem],
          [labels.solutionLabel, copy.solution],
          [labels.resultLabel, copy.result],
        ].map(([etiqueta, texto]) => (
          <div key={etiqueta} className="grid gap-1 sm:grid-cols-[6.5rem_1fr] sm:gap-5">
            <dt className="eyebrow eyebrow-plain">{etiqueta}</dt>
            <dd className="leading-relaxed text-ink-soft">{texto}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-line pt-5 sm:mt-8">
        <p className="text-sm text-ink-soft">
          <span className="eyebrow eyebrow-plain mr-2.5">{labels.toolsLabel}</span>
          {project.stack.join(' · ')}
        </p>
        <button type="button" onClick={() => onOpen(0)} className="tap link text-sm font-medium">
          {labels.viewShots.replace('{n}', shots.length)}
        </button>
      </div>
    </article>
  )
}

export default function Projects({ t, theme }) {
  // Un solo visor para los dos casos: guarda qué caso y qué captura.
  const [visor, setVisor] = useState(null)

  const abierto = visor ? PROJECTS.find((p) => p.id === visor.id) : null
  const copiaAbierta = abierto ? t.projects.items[abierto.id] : null
  const shotsAbiertos = abierto ? abierto.shots.map((r) => shotFor(theme, r)) : []

  return (
    <Section
      id="projects"
      eyebrow={t.projects.eyebrow}
      title={t.projects.title}
      subtitle={t.projects.subtitle}
    >
      <Arc className="top-[14rem] -right-[28rem] size-[54rem]" />

      <div className="stagger relative grid gap-x-14 gap-y-16 lg:grid-cols-2">
        {PROJECTS.map((project) => (
          <Caso
            key={project.id}
            project={project}
            copy={t.projects.items[project.id]}
            labels={t.projects}
            shots={project.shots.map((ruta) => shotFor(theme, ruta))}
            onOpen={(i) => setVisor({ id: project.id, i })}
          />
        ))}
      </div>

      {abierto && (
        <Lightbox
          shots={shotsAbiertos}
          captions={copiaAbierta.shots}
          index={visor.i}
          name={copiaAbierta.name}
          labels={t.projects}
          onClose={() => setVisor(null)}
          onMove={(i) => setVisor((v) => ({ ...v, i }))}
        />
      )}
    </Section>
  )
}
