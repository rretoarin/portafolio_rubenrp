/*
 * Piezas gráficas compartidas. Todas son formas simples dibujadas con CSS o SVG
 * inline: no hay librería de iconos y no debe haberla.
 */

/*
 * Titular que entra palabra a palabra. El retardo va en línea y no en un
 * nth-child del CSS: el número de palabras cambia con el idioma, y una regla
 * fija dejaría la mitad de la frase sin escalonar al traducir.
 *
 * El espacio entre palabras es un nodo aparte para que el navegador siga
 * pudiendo partir la línea donde quiera.
 */
export function Words({ text, delay = 55 }) {
  const palabras = text.split(' ')
  return palabras.map((palabra, i) => (
    <span key={`${palabra}-${i}`} style={{ transitionDelay: `${i * delay}ms` }}>
      {palabra}
      {i < palabras.length - 1 ? ' ' : ''}
    </span>
  ))
}

// Etiqueta de sección. El punto de terracota lo pone `.eyebrow::before`.
export function Eyebrow({ children, className = '' }) {
  return <p className={`eyebrow ${className}`}>{children}</p>
}

/*
 * Ventana neutra que enmarca una captura. Es lo que hace que una captura se lea
 * como "esto es un sistema de verdad" y no como una imagen pegada: la barra
 * superior le da contexto de pantalla sin imitar ningún navegador concreto.
 */
export function Frame({ label, children, className = '' }) {
  return (
    <figure
      className={`overflow-hidden rounded-[var(--radius-card)] border border-frame-line bg-frame ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-frame-line px-4 py-2.5">
        <span aria-hidden className="flex shrink-0 gap-1.5">
          <span className="size-2 rounded-full bg-edge/60" />
          <span className="size-2 rounded-full bg-line/60" />
          <span className="size-2 rounded-full bg-edge/60" />
        </span>
        {label && (
          <span className="truncate text-[0.6875rem] font-medium text-ink-soft">{label}</span>
        )}
      </div>
      {children}
    </figure>
  )
}

/*
 * Arco de trazo salvia. Va detrás del contenido, dentro de un contenedor con
 * `relative overflow-hidden`, uno por sección como máximo.
 */
export function Arc({ className = '' }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full border border-line/25 ${className}`}
    />
  )
}

// Filete vertical con nudo: marca dónde empieza un bloque sin dibujar una caja.
export function Tick({ className = '' }) {
  return (
    <span aria-hidden className={`flex flex-col items-center ${className}`}>
      <span className="size-1.5 rounded-full bg-ink" />
      <span className="w-px flex-1 bg-gradient-to-b from-line to-transparent" />
    </span>
  )
}

// Check en círculo, dibujado a mano: nada de iconos de stock.
export function Check({ className = '' }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      className={`size-5 shrink-0 ${className}`}
      fill="none"
    >
      <circle cx="10" cy="10" r="9" fill="currentColor" opacity="0.12" />
      <path
        d="m6.4 10.2 2.4 2.4 4.8-5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
