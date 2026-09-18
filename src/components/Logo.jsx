/*
 * El logotipo de RuberpDev: el círculo con «RD» y su rayita de terracota, y el
 * nombre apilado debajo con el subrayado bajo «Dev».
 *
 * Es la LÁMINA DE CONCEPTO recortada, no un redibujo. Se intentó reconstruirlo
 * con vectores —contornos de Outfit colocados con las medidas de la lámina— y
 * seguía sin ser lo aprobado, así que el logo del sitio es la propia lámina.
 * Las piezas las recorta `scripts/logo.py` a `public/logo/*.webp`. **No volver
 * a redibujarlo.**
 *
 * Aquí no se elige ninguna pieza: el estilo activo las pone en `--logo` y
 * `--logo-icono`, y `.logotipo` y `.isotipo` de `index.css` las pintan de
 * fondo. Por eso este componente no recibe el tema, no lo pregunta y no hay
 * ningún `if (tema === …)`: el pie usa `<Mark>` exactamente igual que la barra.
 *
 * Son dos piezas y no una que se encoge porque el nombre necesita sitio: el
 * apilado mide 434 × 368 de recorte, así que en la barra de 64 de móvil su
 * nombre caería a ocho píxeles. Ahí va sólo el círculo.
 *
 * Las dos se escalan dando SÓLO la altura; el ancho sale del `aspect-ratio`.
 */

/*
 * El círculo suelto. Es lo que se ve en la barra por debajo de `md` y en la
 * línea de cierre del pie, que es texto a cuerpo 12 y no admite el apilado.
 */
export function Mark({ className = '' }) {
  return <span aria-hidden className={`isotipo shrink-0 ${className}`} />
}

/* El logotipo entero, apilado. La barra de escritorio, de `md` en adelante. */
export default function Logo({ className = '' }) {
  return <span aria-hidden className={`logotipo shrink-0 ${className}`} />
}
