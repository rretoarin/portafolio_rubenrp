/*
 * El isotipo RD y el logotipo completo de RubenDev.
 *
 * UNA sola geometría para los cuatro estilos. Los trazos van en `currentColor`
 * y la pierna en `fill-accent`, así que el monograma se retiñe con las
 * variables de `index.css` igual que todo lo demás: no hay una copia por tema,
 * no hay ni un color escrito aquí y no hay ningún `if (tema === …)`.
 *
 * ESTÁ CONSTRUIDO, NO CALCADO. La referencia aprobada es una imagen de 125 px
 * con el borde blando; calcarla se probó dos veces y las dos se vio mal: a los
 * 24 px de la barra el temblor del original se convierte en papilla. Así que lo
 * que se calcó fueron las MEDIDAS, y la forma se levantó con geometría exacta.
 * Por eso es nítido a 16 px y sigue siéndolo a 900.
 *
 * Las medidas, sobre una altura de 100:
 *
 * - La panza de la R es un CÍRCULO exacto de radio 29 centrado en (41,29). Su
 *   punto más alto y el más bajo caen en la horizontal del brazo y en la de la
 *   barra, así que las tres piezas empalman sin quiebre.
 * - La contraforma es un casquete de radio 13 centrado en (38.6,31), entre el
 *   brazo (0–18) y la barra (44–58). Abierta por la izquierda: el asta sólo
 *   existe en la mitad inferior y eso es medio carácter de la marca.
 * - La D es el anillo entre dos elipses concéntricas en (82,50): la de fuera
 *   52.6 × 50 y la de dentro 31.5 × 35.5. Sin asta, porque el hueco que deja la
 *   R le hace de asta.
 * - Las terminales van cortadas en recto. La del brazo lleva la pendiente 0.79
 *   y las de la D salen de cortar el anillo a −102°/−92° arriba y a 93°/100°
 *   abajo. Arriba y abajo NO son simétricas a propósito: abajo la terminal se
 *   recoge para no tocar la punta de la pierna.
 * - La pierna es la única pieza en color y va suelta, sin tocar el asta.
 *   Arranca en y=52, tapada por la panza, y asoma sola al acabar la barra.
 */

const R =
  'M0 0L41 0A29 29 0 0 1 41 58L23.5 58L23.5 100L2.5 100L2.5 44L38.6 44A13 13 0 0 0 38.6 18L14.22 18Z'

const D =
  'M71.06 1.09A52.6 50 0 1 1 79.25 99.93L76.53 84.96A31.5 35.5 0 1 0 80.9 14.52Z'

const PIERNA =
  'M27.5 52L42 52C42 62 70 81 71 98C40 90 31 68 27.5 52Z'

/*
 * El isotipo suelto. Funciona solo —es lo que se ve en la barra por debajo de
 * `sm` y en el pie— y se escala con `className` dando SÓLO la altura: el ancho
 * sale del viewBox, así que nunca se deforma.
 *
 * La pierna se pinta ANTES que la tinta: nace por debajo de la panza y es la
 * tinta la que tapa el solape, así que no puede quedar ni costura ni reborde.
 */
export function Mark({ className = '' }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 134.6 100"
      fill="currentColor"
      className={`w-auto shrink-0 ${className}`}
    >
      <path className="fill-accent" d={PIERNA} />
      <path d={R} />
      <path d={D} />
    </svg>
  )
}

/*
 * El logotipo de la barra: isotipo + nombre.
 *
 * El nombre desaparece por debajo de `sm` y queda sólo el isotipo. No es una
 * concesión: es lo que libera sitio en la barra estrecha, donde las cuatro
 * muestras y el menú no admiten menos. De paso el logotipo pasa de ~85 px de
 * ancho a 33, así que a 320 px la barra queda MÁS holgada que antes de tener
 * isotipo: medido, el último control cierra en 304 de 320.
 *
 * 24 px de alto en todos los anchos y no menos en móvil: ahí el isotipo va solo
 * en una barra de 64, y a 21 se quedaba en un adorno al lado de unos controles
 * de 44. Lo que no cabía era el nombre, no el monograma.
 *
 * Va a `items-baseline` y no a `items-center`: el isotipo se apoya en la línea
 * base del nombre, que es lo que hace que los dos se lean como una sola pieza.
 * Centrado lo dejaba flotando medio píxel por encima y se veía despegado.
 *
 * El nombre mantiene el reparto de siempre —«Ruben» en tinta y «Dev» en el
 * acento, los dos en la serifa a peso 700—, que es lo que lo separa de un
 * nombre suelto escrito en la misma fuente que el menú.
 */
export default function Logo() {
  return (
    <span className="flex items-baseline gap-2 md:gap-2.5">
      <Mark className="h-6" />
      <span className="hidden items-baseline sm:flex">
        <span className="wordmark text-lg tracking-tight md:text-xl">Ruben</span>
        <span className="wordmark text-lg tracking-tight text-accent md:text-xl">Dev</span>
      </span>
    </span>
  )
}
