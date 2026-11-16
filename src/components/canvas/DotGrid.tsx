import { cn } from '@/lib/utils'
import { useCanvas, type Draw } from './useCanvas'

/**
 * Decorative canvas: a grid of dots with a slow wave moving through it.
 * Dots brighten and grow near the pointer. Hidden from screen readers.
 */
export function DotGrid({ className, gap = 30, color = '127, 216, 198' }: { className?: string; gap?: number; color?: string }) {
  const ref = useCanvas((): Draw => {
    return (ctx, { w, h, t, pointer }) => {
      ctx.clearRect(0, 0, w, h)
      const cols = Math.ceil(w / gap) + 1
      const rows = Math.ceil(h / gap) + 1
      const offsetX = (w - (cols - 1) * gap) / 2
      const offsetY = (h - (rows - 1) * gap) / 2

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = offsetX + i * gap
          const y = offsetY + j * gap
          const wave = Math.sin(x * 0.012 + y * 0.018 - t * 0.9) * 0.5 + 0.5
          const dx = x - pointer.x
          const dy = y - pointer.y
          const near = Math.exp(-(dx * dx + dy * dy) / 26000) * pointer.power
          const alpha = 0.1 + wave * 0.14 + near * 0.7
          const size = 1.1 + wave * 0.5 + near * 2.2
          ctx.fillStyle = `rgba(${color}, ${alpha})`
          ctx.beginPath()
          ctx.arc(x, y, size, 0, 6.283)
          ctx.fill()
        }
      }
    }
  })

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 size-full [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_78%)] print:hidden',
        className,
      )}
    />
  )
}
