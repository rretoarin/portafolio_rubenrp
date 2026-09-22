import { useEffect, useReducer, useState } from 'react'
import { PROJECTS, shotFor } from '../data/content'
import { useMedia } from '../hooks/useMedia'
import { SIZES_CARRUSEL, srcsetFor } from '../data/capturas'
import Lightbox from './Lightbox'
import Section from './Section'
import { ArrowUpRight, Lock } from './icons'
import { Arc } from './ui'

// Ritmo del carrusel: ~2 s quieta + 0,9 s de volteo. El mismo en todo ancho.
const CICLO_MS = 2900
const DESMONTE_MS = 930

/*
 * `i` es la captura a la vista; `prev`, la que se está volteando encima (o
 * `null` si no hay volteo en curso). Un reducer y no dos `useState` para que el
 * paso de página cambie las dos cosas a la vez, sin un setState dentro de otro.
 */
function paginar(estado, accion) {
  if (accion.tipo === 'siguiente') {
    return { i: (estado.i + 1) % accion.total, prev: estado.i }
  }
  return { ...estado, prev: null }
}

/*
 * Carrusel «pasar página de un libro». Debajo, la captura nueva; encima, la
 * anterior como un `span` con fondo que gira sobre su borde izquierdo y se
 * desmonta a los 930 ms. Las capturas nunca se recortan: `contain` sobre el
 * paspartú (`--color-mat`).
 *
 * UN solo intervalo por carrusel: se crea en un único efecto y se limpia en su
 * `return`. Si no, se acumulan temporizadores y las páginas pasan mucho más
 * rápido de lo configurado.
 *
 * Con `prefers-reduced-motion` no arranca: se queda en la primera captura.
 */
function Carrusel({ shots, captions, name, pausado, onOpen, label }) {
  const [estado, dispatch] = useReducer(paginar, { i: 0, prev: null })
  const [oculto, setOculto] = useState(() => typeof document !== 'undefined' && document.hidden)
  const quieto = useMedia('(prefers-reduced-motion: reduce)')
  // Qué archivo eligió `srcset` para cada captura: la página que voltea usa el
  // mismo, ya descargado, en vez del original a tamaño completo.
  const [elegidas, setElegidas] = useState({})
  const total = shots.length

  useEffect(() => {
    const onVis = () => setOculto(document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  useEffect(() => {
    if (pausado || oculto || quieto) return
    const id = setInterval(() => dispatch({ tipo: 'siguiente', total }), CICLO_MS)
    return () => clearInterval(id)
  }, [pausado, oculto, quieto, total])

  // La página que voltea se desmonta al terminar su giro.
  useEffect(() => {
    if (estado.prev === null) return
    const id = setTimeout(() => dispatch({ tipo: 'fin' }), DESMONTE_MS)
    return () => clearTimeout(id)
  }, [estado])

  // La siguiente se pide antes de que toque, para que no aparezca en blanco.
  useEffect(() => {
    const siguiente = shots[(estado.i + 1) % total]
    const img = new Image()
    img.sizes = SIZES_CARRUSEL
    img.srcset = srcsetFor(siguiente) ?? ''
    img.src = siguiente
  }, [estado.i, shots, total])

  const texto = captions[estado.i]

  return (
    <div>
      {/* La captura sigue abriendo el visor, en la que esté a la vista. */}
      <button
        type="button"
        onClick={() => onOpen(estado.i)}
        aria-label={`${label} — ${name}`}
        className="flip block w-full"
      >
        {/* El pie de abajo ya la describe y se anuncia solo: la imagen no se lee. */}
        <img
          src={shots[estado.i]}
          srcSet={srcsetFor(shots[estado.i])}
          sizes={SIZES_CARRUSEL}
          alt=""
          aria-hidden
          width={1600}
          height={1000}
          decoding="async"
          onLoad={(e) => {
            const src = e.currentTarget.currentSrc
            setElegidas((m) => (m[estado.i] === src ? m : { ...m, [estado.i]: src }))
          }}
          className="flip-img"
        />
        {estado.prev !== null && (
          <span
            aria-hidden
            key={estado.prev}
            className="flip-page"
            style={{ backgroundImage: `url(${elegidas[estado.prev] ?? shots[estado.prev]})` }}
          />
        )}
      </button>
      {/* Región viva: el lector de pantalla anuncia cada captura nueva. */}
      <div aria-live="polite" aria-atomic="true">
        <p className="flip-caption">
          {estado.i + 1}/{total} · {texto}
        </p>
      </div>
    </div>
  )
}

/*
 * Cada caso es una tarjeta con TODAS sus capturas pasando solas y tres líneas
 * —problema, solución, resultado—. El carrusel se pausa mientras el puntero
 * está sobre la tarjeta, mientras el foco del teclado está dentro de ella y
 * mientras su visor está abierto.
 */
function Caso({ project, copy, labels, shots, onOpen, visorAbierto }) {
  const esEnlace = Boolean(project.url)
  const [encima, setEncima] = useState(false)
  const [foco, setFoco] = useState(false)

  return (
    <article
      className="reveal flex flex-col"
      onMouseEnter={() => setEncima(true)}
      onMouseLeave={() => setEncima(false)}
      onFocusCapture={() => setFoco(true)}
      onBlurCapture={(e) => {
        // Pasar el foco de un control a otro de la misma tarjeta no la suelta.
        if (!e.currentTarget.contains(e.relatedTarget)) setFoco(false)
      }}
    >
      <Carrusel
        shots={shots}
        captions={copy.shots}
        name={copy.name}
        pausado={encima || foco || visorAbierto}
        onOpen={onOpen}
        label={labels.galleryLabel}
      />

      <p className="mt-3 text-xs text-ink-soft">{copy.evidenceNote}</p>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        {/* Qué tipo de trabajo es: que no haya que deducirlo del párrafo. */}
        <span className="tag">{copy.type}</span>
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
              className="text-ink-soft transition-transform group-hover:-translate-y-0.5 group-focus-visible:-translate-y-0.5 group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5"
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

      {/*
        Las tres líneas del caso. El RESULTADO no es una más: es lo único que
        demuestra que el trabajo sirvió, así que se lleva el peso. Problema y
        solución se quedan en `ink-soft`; el resultado pasa a tinta plena
        (de 9.49:1 a 17.67:1), sube un punto de cuerpo y su etiqueta se pinta
        con el acento. Sigue siendo la misma lista de definiciones en el mismo
        sitio: cambia el peso, no la estructura.
      */}
      <dl className="mt-6 space-y-5">
        {[
          [labels.problemLabel, copy.problem, false],
          [labels.solutionLabel, copy.solution, false],
          [labels.resultLabel, copy.result, true],
        ].map(([etiqueta, texto, resultado]) => (
          <div key={etiqueta} className="grid gap-1 sm:grid-cols-[6.5rem_1fr] sm:gap-5">
            {/*
              `self-start` y cuatro píxeles de aire. `.eyebrow` es un `inline-flex`
              con `align-items: center`, así que como celda de la rejilla se
              estiraba a todo el alto de la fila y la etiqueta se centraba contra
              el párrafo entero en vez de sentarse en su primera línea: caía 13px
              por debajo con dos líneas y 26 con tres. Sólo desde `sm`, que es
              donde hay dos columnas; apilado, la etiqueta ya va encima.
            */}
            <dt
              className={`eyebrow eyebrow-plain sm:self-start sm:pt-1 ${
                resultado ? 'text-accent' : ''
              }`}
            >
              {etiqueta}
            </dt>
            <dd
              className={
                resultado
                  ? 'text-[1.0625rem] leading-relaxed text-ink'
                  : 'leading-relaxed text-ink-soft'
              }
            >
              {texto}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-line pt-5 sm:mt-8">
        <p className="text-sm text-ink-soft">
          <span className="eyebrow eyebrow-plain mr-2.5">{labels.toolsLabel}</span>
          {project.stack.join(' · ')}
        </p>
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
      <Arc className="-top-[10rem] -right-[38rem] size-[54rem]" />

      <div className="stagger relative grid gap-x-14 gap-y-16 lg:grid-cols-2">
        {PROJECTS.map((project) => (
          <Caso
            key={project.id}
            project={project}
            copy={t.projects.items[project.id]}
            labels={t.projects}
            shots={project.shots.map((ruta) => shotFor(theme, ruta))}
            onOpen={(i) => setVisor({ id: project.id, i })}
            visorAbierto={visor?.id === project.id}
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
