import { useEffect, useState } from 'react'

/*
 * ¿Se cumple una media query ahora mismo? Devuelve un booleano que se actualiza
 * al cambiar el tamaño de la ventana.
 *
 * Existe sólo para lo que NO se puede resolver con CSS: decidir qué se pinta,
 * no cómo se pinta. Si lo que hace falta es enseñar u ocultar algo, se hace con
 * las utilidades de Tailwind y este hook no pinta nada.
 *
 * El caso que lo justificó: la barra de móvil enseña sólo dos estilos de los
 * cuatro. Ocultando dos botones con CSS, el `radiogroup` se queda con nodos que
 * están en el DOM pero no se ven, y entonces las flechas del teclado mueven el
 * foco a un botón invisible y la parada de tabulador puede caer en él. Con esto
 * esos botones directamente no existen mientras no haya sitio.
 *
 * El valor inicial se lee en el primer render, no en un efecto, para que no
 * haya un fotograma con la versión equivocada.
 */
export function useMedia(consulta) {
  const [coincide, setCoincide] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(consulta).matches,
  )

  useEffect(() => {
    const mq = window.matchMedia(consulta)
    const alCambiar = () => setCoincide(mq.matches)
    alCambiar()
    mq.addEventListener('change', alCambiar)
    return () => mq.removeEventListener('change', alCambiar)
  }, [consulta])

  return coincide
}
