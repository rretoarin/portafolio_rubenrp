/*
 * El logo, como IMAGEN (2026-09-29, decisión de Rubén tras varias rondas con
 * el vector). Sale de `scripts/logo-fuente/logofinal.png` por
 * `scripts/logo-png.py`, que lo exporta a la medida EXACTA a la que se pinta
 * —1x, 2x y 3x— para que el navegador no lo reescale y no se ablande, con el
 * fondo transparente y una copia de tinta clara para el tema oscuro.
 *
 *   - lg: barra desde 769px, 77x54.
 *   - sm: barra en móvil y pie, 60x40.
 *
 * El «RD» y la palabra se exportan por separado, cada uno alineado a la
 * rejilla, y la palabra algo más grande que en el PNG (ver DISENO en el script).
 *
 * Las dos copias (claro y oscuro) van en la página y el CSS enseña la que toca
 * según `data-theme`: el componente no pregunta qué tema hay.
 */
const srcset = (tema, tam) => [1, 2, 3].map((k) => `/logo/logo-${tema}-${tam}@${k}x.webp ${k}x`).join(', ')

function Imagen({ tema, conGrande }) {
  return (
    <picture className={`logo-img logo-${tema}`}>
      {conGrande && <source media="(min-width: 769px)" srcSet={srcset(tema, 'lg')} width={77} height={54} />}
      <img src={`/logo/logo-${tema}-sm@1x.webp`} srcSet={srcset(tema, 'sm')} width={60} height={40} alt="" decoding="async" />
    </picture>
  )
}

/* El de la barra: grande desde 769px, pequeño por debajo. */
export default function Logo() {
  return (
    <>
      <Imagen tema="claro" conGrande />
      <Imagen tema="oscuro" conGrande />
    </>
  )
}

/* El del pie: siempre el pequeño. */
export function Mark({ className = '' }) {
  return (
    <span className={`flex ${className}`}>
      <Imagen tema="claro" />
      <Imagen tema="oscuro" />
    </span>
  )
}
