/*
 * El isotipo RD y el logotipo completo de RubenDev.
 *
 * Las cuatro piezas las dibujó Rubén, una por estilo, y viven en
 * `public/logo/*.webp`. No se eligen aquí: el estilo activo las pone en
 * `--logo` y la clase `.isotipo` de `index.css` las pinta de fondo. Por eso
 * este componente no recibe el tema, no lo pregunta y no hay ningún
 * `if (tema === …)` —el pie lo usa exactamente igual que la barra—.
 *
 * Se probó calcar la referencia a vectores y se descartó: el original era una
 * imagen de 125 px con el borde blando y a los 24 px de la barra se deshacía.
 * Estas piezas vienen dibujadas una a una y se exportan a 3x, así que en
 * pantalla retina llegan limpias. Las prepara `scripts/logo.py`.
 *
 * Cómo está construido el monograma, porque no es una R y una D cualesquiera:
 * la R no tiene asta entera —el brazo entra por arriba, gira en la panza y baja
 * hasta un asta que sólo existe en la mitad inferior, así que la contraforma
 * queda abierta por la izquierda— y la D es sólo su arco, sin asta, porque el
 * hueco que deja la R le hace de asta. La diagonal en color es la pierna de la
 * R y va suelta, sin tocar el asta: es el único detalle en color y lo que hace
 * que se lea como una marca y no como dos letras juntas.
 */

/*
 * El isotipo suelto. Funciona solo —es lo que se ve en la barra por debajo de
 * `sm` y en el pie— y se escala dando SÓLO la altura: el ancho sale del
 * `aspect-ratio` de `.isotipo`, así que nunca se deforma.
 */
export function Mark({ className = '' }) {
  return <span aria-hidden className={`isotipo shrink-0 ${className}`} />
}

/*
 * El logotipo de la barra: isotipo + nombre.
 *
 * El nombre desaparece por debajo de `sm` y queda sólo el isotipo. No es una
 * concesión: es lo que libera sitio en la barra estrecha, donde las cuatro
 * muestras y el menú no admiten menos. De paso el logotipo pasa de ~85 px de
 * ancho a 26, así que a 320 px la barra queda MÁS holgada que antes de tener
 * isotipo.
 *
 * Va a `items-baseline` y no a `items-center`: el isotipo se apoya en la línea
 * base del nombre, que es lo que hace que los dos se lean como una sola pieza.
 * Centrado lo dejaba flotando medio píxel por encima y se veía despegado.
 *
 * El alto va a ojo y NO a la altura de las mayúsculas. Se probó igualarlo a
 * ellas —12,6 px a `text-lg` y 14 a `text-xl`— y se veía claramente más
 * pequeño que la palabra: el monograma es ancho y de trazo fino, así que a la
 * misma altura pesa menos. Va a ~1,45 veces la mayúscula (18 y 20 px), que es
 * donde las dos piezas se leen con el mismo peso.
 *
 * Por debajo de `sm` va a 26: ahí el isotipo está solo en una barra de 64 y no
 * tiene palabra con la que igualarse, así que necesita cuerpo al lado de unos
 * controles de 44.
 */
export default function Logo() {
  return (
    <span className="flex items-baseline gap-2 md:gap-2.5">
      <Mark className="h-[1.625rem] sm:h-[1.125rem] md:h-[1.25rem]" />
      <span className="hidden items-baseline sm:flex">
        <span className="wordmark text-lg tracking-tight md:text-xl">Ruben</span>
        <span className="wordmark text-lg tracking-tight text-accent md:text-xl">Dev</span>
      </span>
    </span>
  )
}
