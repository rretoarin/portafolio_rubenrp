import { useEffect, useRef } from 'react'

// Línea de progreso de lectura. Escala en X en vez de animar el ancho,
// para que el navegador la resuelva en la GPU y no repinte en cada scroll.
export default function ScrollProgress() {
  const bar = useRef(null)

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      const ratio = max > 0 ? Math.min(doc.scrollTop / max, 1) : 0
      if (bar.current) bar.current.style.transform = `scaleX(${ratio})`
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-60 h-0.5 bg-transparent">
      <div
        ref={bar}
        className="h-full origin-left scale-x-0 bg-bright"
        style={{ willChange: 'transform' }}
      />
    </div>
  )
}
