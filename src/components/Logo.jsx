import { PROFILE } from '../data/content'

/*
 * El logo de RuberpDev, en UNA sola línea: el isotipo RD y la palabra
 * «RuberpDev» al lado. Nada apilado.
 *
 * El isotipo es la pieza que recorta `scripts/logo.py` de la lámina de
 * concepto. Se le da la altura y un ancho máximo, nunca un ancho fijo: con
 * `width: auto` + `object-fit: contain` no se estira (el bug de antes era un
 * `width` fijo). En oscuro se invierte por CSS en vez de cargar otro archivo.
 */
export function Mark({ className = '' }) {
  return <img src="/logo/icono-claro@2x.webp" alt="" aria-hidden className={`logo-img ${className}`} />
}

/* Isotipo + nombre. La barra; el pie usa sólo el isotipo, a 24px. */
export default function Logo() {
  return (
    <>
      <Mark />
      <span className="logo-word">{PROFILE.brand}</span>
    </>
  )
}
