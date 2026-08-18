import { ArrowUpRight } from './icons'

// Etiqueta de sección con forma de ruta: "... /Proyectos ..."
export function SectionLabel({ children, className = '' }) {
  return (
    <p className={`tag-label ${className}`}>
      <span className="text-muted">... /</span>
      {children}
      <span className="text-muted"> ...</span>
    </p>
  )
}

// Arco decorativo: círculo gigante de trazo casi imperceptible.
export function Arc({ className = '' }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full border border-white/[0.045] ${className}`}
    />
  )
}

// Botón circular blanco con flecha: la acción principal de cada tarjeta.
export function CircleLink({ href, label, external = true }) {
  return (
    <a
      href={href}
      aria-label={label}
      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      className="group inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-bright text-ink transition-transform hover:scale-105"
    >
      <ArrowUpRight
        width={18}
        height={18}
        strokeWidth={1.75}
        className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </a>
  )
}
