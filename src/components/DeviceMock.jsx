import { Frame } from './ui'

/*
 * La prueba visual del hero: un sistema en pantalla grande y una web en el
 * móvil, que es exactamente lo que vende RubenDev —las dos caras de un negocio.
 *
 * Dibujado con CSS: ni librería, ni PNG de marco, ni sombra falsa. Reutiliza la
 * ventana de `<Frame>`, así que consume los mismos tokens que el resto y cambia
 * con el estilo; la captura pasa además por `--shot-filter` para no deslumbrar
 * en el estilo oscuro.
 *
 * Las dos imágenes son reales y están en producción. Ninguna es una maqueta.
 */
export default function DeviceMock({ laptop, phone, priority = false }) {
  const carga = priority ? 'eager' : 'lazy'

  return (
    <div className="relative">
      <div className="w-full">
        <Frame label={laptop.label} className="shadow-[var(--shadow-shot)]">
          <img
            src={laptop.src}
            alt={laptop.alt}
            width={1600}
            height={900}
            fetchPriority={priority ? 'high' : 'auto'}
            loading={carga}
            decoding="async"
            className="shot-img block aspect-[16/9] w-full bg-surface object-cover object-top"
          />
        </Frame>

        {/*
          La peana del portátil: más estrecha que la pantalla y con el mismo
          borde. Dos filetes bastan para que se lea como base.
        */}
        <div className="laptop-base mx-auto w-[86%]" />
      </div>

      {/*
        El móvil se solapa con la esquina del portátil. En pantallas estrechas se
        encoge, pero nunca desaparece: es la mitad del argumento. Va pegado al
        borde derecho del contenedor, no fuera, para no empujar el ancho.
      */}
      <div className="absolute right-0 -bottom-5 w-[26%] min-w-[5rem] max-w-[9.5rem] md:-bottom-8">
        <div className="rounded-[1.35rem] border border-frame-line bg-frame p-1 shadow-[var(--shadow-shot)]">
          <img
            src={phone.src}
            alt={phone.alt}
            width={780}
            height={1688}
            loading={carga}
            decoding="async"
            className="shot-img block aspect-[390/844] w-full rounded-[1rem] bg-surface object-cover object-top"
          />
        </div>
      </div>
    </div>
  )
}
