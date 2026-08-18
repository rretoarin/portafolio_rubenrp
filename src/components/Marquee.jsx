import { MARQUEE } from '../data/content'

// La lista se duplica para que el bucle sea continuo: la animación recorre
// exactamente el 50% del ancho y vuelve al inicio sin salto visible.
export default function Marquee() {
  const items = [...MARQUEE, ...MARQUEE]

  return (
    <div
      aria-hidden
      className="marquee relative overflow-hidden border-y border-line py-4 select-none"
    >
      <div className="marquee-track">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-8 px-4 font-mono text-sm text-muted"
          >
            {item}
            <span className="text-line-strong">/</span>
          </span>
        ))}
      </div>

      {/* Desvanecido en los bordes para que la cinta no se corte en seco. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink to-transparent md:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink to-transparent md:w-28" />
    </div>
  )
}
