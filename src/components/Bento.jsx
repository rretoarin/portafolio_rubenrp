import { useState } from 'react'
import Lightbox from './Lightbox'

/*
 * Rejilla de capturas. Sustituye al carrusel por una razón de conversión: la
 * prueba de que el trabajo existe no puede depender de que alguien pulse una
 * flecha siete veces.
 *
 * Pero mostrarlas todas apiladas era peor: la sección de casos pasaba de 4 a 7
 * pantallas y el visitante abandonaba antes de llegar al resultado. Por eso se
 * enseñan tres —una grande y dos que la acompañan— y el resto vive en el visor,
 * detrás de un contador que dice cuántas faltan.
 *
 * La grande ocupa dos columnas y dos filas, así que su alto coincide con el de
 * las dos pequeñas apiladas y el bloque queda cuadrado sin fijar alturas a mano.
 */
const VISIBLES = 3

export default function Bento({ shots, captions, labels, name }) {
  const [abierta, setAbierta] = useState(null)
  const visibles = shots.slice(0, VISIBLES)
  const restantes = shots.length - visibles.length

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
        {visibles.map((src, i) => {
          const grande = i === 0
          const ultima = i === visibles.length - 1 && restantes > 0

          return (
            <li
              key={src}
              className={grande ? 'col-span-2 sm:row-span-2' : 'col-span-1'}
            >
              <button
                type="button"
                onClick={() => setAbierta(i)}
                aria-label={
                  ultima
                    ? `${labels.openShot} — ${labels.moreShots.replace('{n}', restantes)}`
                    : `${labels.openShot} — ${captions[i]}`
                }
                className="shot group block h-full w-full overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface text-left"
              >
                <span className="relative block h-full overflow-hidden">
                  <img
                    src={src}
                    alt={`${name} — ${captions[i]}`}
                    width={1600}
                    height={1000}
                    loading="lazy"
                    decoding="async"
                    className={`block w-full object-cover object-top transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] ${
                      grande ? 'aspect-[16/10] sm:h-full sm:aspect-auto' : 'aspect-[16/10]'
                    }`}
                  />

                  {/* La leyenda sube al pasar el puntero; en táctil vive en el alt. */}
                  {!ultima && (
                    <span className="shot-caption pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-ink/88 p-4 text-sm leading-snug text-page opacity-0 backdrop-blur-[2px] transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
                      {captions[i]}
                    </span>
                  )}

                  {/* Contador de las que quedan: invita a abrir el visor. */}
                  {ultima && (
                    <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink/70 text-center text-sm font-semibold text-page transition-colors duration-300 group-hover:bg-ink/80">
                      {labels.moreShots.replace('{n}', restantes)}
                    </span>
                  )}
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      <Lightbox
        shots={shots}
        captions={captions}
        index={abierta}
        name={name}
        labels={labels}
        onClose={() => setAbierta(null)}
        onMove={setAbierta}
      />
    </>
  )
}
