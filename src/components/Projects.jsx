import { useState } from 'react'
import { PROJECTS, TESTIMONIALS } from '../data/content'
import Bento from './Bento'
import Section from './Section'
import { ArrowUpRight, Lock } from './icons'
import { Arc } from './ui'

function CaseBlock({ label, text, index }) {
  return (
    <div className="block-top border-t border-line pt-5">
      <p className="eyebrow eyebrow-plain">
        <span className="block-num mr-2 tabular-nums">
          {String(index).padStart(2, '0')}
        </span>
        <span className="block-title">{label}</span>
      </p>
      <p className="mt-3 leading-relaxed text-ink-soft">{text}</p>
    </div>
  )
}

/*
 * Un caso no es una ficha de proyecto: abre con la frase de impacto —qué
 * cambió en el negocio— y sólo después aparecen problema, solución y
 * resultado. La tecnología queda al final, como pie de página del caso.
 *
 * Las capturas ocupan el ancho completo porque son la evidencia: en media
 * columna no se leería la interfaz, que es justo lo que hay que poder leer.
 */
function Project({ project, copy, index, labels }) {
  const isLink = Boolean(project.url)

  /*
   * En móvil el caso completo son casi tres pantallas por proyecto. Lo que
   * vende —la frase de impacto y las capturas— queda siempre visible; el
   * detalle de problema, solución y resultado se pliega detrás de un botón.
   *
   * A partir de `lg` no hay botón ni pliegue: en escritorio el texto no estorba
   * y esconderlo sólo añadiría un clic para leer lo que ya cabe en pantalla.
   */
  const [abierto, setAbierto] = useState(false)
  const detalleId = `caso-${project.id}-detalle`

  return (
    <article className="reveal relative">
      {/*
        Cabecera en un solo flujo. El enlace al sitio (o la etiqueta de sistema
        interno) iba en una columna aparte a la derecha y dejaba un hueco
        enorme: ahora acompaña a las demás etiquetas.
      */}
      <header className="reveal">
        <div className="flex flex-wrap items-center gap-3">
          <span className="tag">
            {String(index + 1).padStart(2, '0')} · {project.year}
          </span>
          {project.client && (
            <span className="tag">
              <span className="sr-only">{labels.clientLabel}: </span>
              {project.client}
            </span>
          )}
          {project.sectorKey && <span className="tag">{labels.sectors[project.sectorKey]}</span>}

          {isLink ? (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer noopener"
              className="tap link group ml-1 inline-flex items-center gap-2 text-sm font-medium"
            >
              {labels.viewLive}
              <ArrowUpRight
                width={15}
                height={15}
                className="text-ink-soft transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          ) : (
            <span className="tag">
              <Lock width={12} height={12} />
              {labels.privateLabel}
            </span>
          )}
        </div>

        <h3 className="display mt-6 text-[2rem] md:text-[2.5rem]">{copy.name}</h3>
        <p className="mt-2 text-ink-soft">{copy.tag}</p>
      </header>

      {/* La frase de impacto: lo único que hay que retener de este caso. */}
      <p className="display-light mt-8 max-w-3xl text-[1.5rem] text-ink sm:text-[1.875rem]">
        {copy.impact}
      </p>

      {/* La evidencia, visible de golpe: no depende de pulsar una flecha. */}
      <div className="mt-12 min-w-0 md:mt-14">
        <Bento
          shots={project.shots}
          captions={copy.shots}
          labels={labels}
          name={copy.name}
        />
        <p className="mt-4 text-sm text-ink-soft">{copy.evidenceNote}</p>
      </div>

      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        aria-expanded={abierto}
        aria-controls={detalleId}
        className="btn-ghost mt-8 w-full justify-center lg:hidden"
      >
        {abierto ? labels.detailClose : labels.detailOpen}
      </button>

      <div id={detalleId} className={abierto ? '' : 'hidden lg:block'}>
        <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-3">
          <CaseBlock index={1} label={labels.problemLabel} text={copy.problem} />
          <CaseBlock index={2} label={labels.solutionLabel} text={copy.solution} />
          <CaseBlock index={3} label={labels.resultLabel} text={copy.result} />
        </div>

        {/* La tecnología, al pie y en pequeño: es soporte, no argumento. */}
        <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-line pt-6">
          <span className="eyebrow eyebrow-plain">{labels.toolsLabel}</span>
          <span className="text-sm text-ink-soft">{project.stack.join(' · ')}</span>
        </div>
      </div>

    </article>
  )
}

export default function Projects({ t, lang }) {
  return (
    <Section
      id="projects"
      eyebrow={t.projects.eyebrow}
      title={t.projects.title}
      subtitle={t.projects.subtitle}
    >
      <Arc className="top-[20rem] -right-[32rem] size-[60rem]" />

      <div className="relative space-y-16 md:space-y-24">
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

      <div className="reveal relative mt-16 border-t border-line pt-8 md:mt-20">
        <p className="eyebrow eyebrow-plain">{t.projects.trustLabel}</p>
        <ul className="stagger mt-6 grid gap-x-12 gap-y-8 md:grid-cols-3">
          {t.projects.trust.map((item) => (
            <li key={item.title} className="reveal block-top border-t border-line pt-5">
              <h3 className="block-title display-light text-xl">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Aparece sola el día que haya testimonios reales que publicar. */}
      {TESTIMONIALS.length > 0 && (
        <ul className="stagger relative mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {TESTIMONIALS.map((item) => (
            <li key={item.id} className="reveal border-t border-line pt-6">
              <p className="display-light text-xl">{item.quote[lang]}</p>
              <p className="eyebrow eyebrow-plain mt-5">
                {item.author} · {item.role}
              </p>
            </li>
          ))}
        </ul>
      )}
    </Section>
  )
}
