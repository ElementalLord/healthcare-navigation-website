import { cn } from '@/lib/utils'
import { useCanvas, type Draw } from './useCanvas'

interface Line {
  base: number
  amp: number
  f1: number
  f2: number
  p1: number
  p2: number
  speed: number
  alpha: number
  width: number
  color: string
}

const COLORS = ['127, 216, 198', '127, 216, 198', '255, 255, 255', '96, 165, 190', '255, 207, 112']

/**
 * Decorative canvas: slow flowing "paths" with small lights travelling along them,
 * like referrals making their way to an appointment. Lines bend gently around the pointer.
 * Purely visual, so it is hidden from screen readers.
 */
export function PathField({ className, lines: lineCount = 16, pulses: pulseCount = 7 }: { className?: string; lines?: number; pulses?: number }) {
  const ref = useCanvas((): Draw => {
    const rand = (a: number, b: number) => a + Math.random() * (b - a)
    const lines: Line[] = Array.from({ length: lineCount }, (_, i) => ({
      base: (i + 0.5) / lineCount,
      amp: rand(14, 54),
      f1: rand(0.0014, 0.0036),
      f2: rand(0.004, 0.009),
      p1: rand(0, 6.28),
      p2: rand(0, 6.28),
      speed: rand(0.12, 0.4),
      alpha: rand(0.1, 0.32),
      width: Math.random() > 0.75 ? 1.6 : 1,
      color: COLORS[i % COLORS.length],
    }))
    const pulses = Array.from({ length: pulseCount }, () => ({
      line: Math.floor(rand(0, lineCount)),
      x: Math.random(),
      v: rand(0.03, 0.09),
      size: rand(1.6, 2.8),
    }))

    return (ctx, { w, h, t, pointer }) => {
      const yAt = (l: Line, x: number) => {
        let y =
          l.base * h +
          Math.sin(x * l.f1 + t * l.speed + l.p1) * l.amp +
          Math.sin(x * l.f2 - t * l.speed * 0.6 + l.p2) * l.amp * 0.4
        if (pointer.power > 0) {
          const dx = x - pointer.x
          const dy = y - pointer.y
          y += (dy >= 0 ? 1 : -1) * 42 * Math.exp(-(dx * dx + dy * dy) / 52000) * pointer.power
        }
        return y
      }

      ctx.clearRect(0, 0, w, h)
      ctx.lineCap = 'round'

      for (const l of lines) {
        ctx.beginPath()
        for (let x = -20; x <= w + 20; x += 16) {
          const y = yAt(l, x)
          if (x === -20) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.strokeStyle = `rgba(${l.color}, ${l.alpha})`
        ctx.lineWidth = l.width
        ctx.stroke()
      }

      // Travelling lights, each with a fading tail.
      for (const p of pulses) {
        p.x += p.v * 0.016
        if (p.x > 1.05) {
          p.x = -0.05
          p.line = Math.floor(Math.random() * lines.length)
        }
        const l = lines[p.line]
        const px = p.x * w
        for (let k = 14; k >= 0; k--) {
          const x = px - k * 7
          const y = yAt(l, x)
          const fade = 1 - k / 15
          ctx.beginPath()
          ctx.arc(x, y, p.size * (0.4 + fade * 0.6), 0, 6.283)
          ctx.fillStyle = `rgba(${l.color}, ${fade * fade * 0.9})`
          ctx.fill()
        }
        const y = yAt(l, px)
        const glow = ctx.createRadialGradient(px, y, 0, px, y, 22)
        glow.addColorStop(0, `rgba(${l.color}, 0.45)`)
        glow.addColorStop(1, `rgba(${l.color}, 0)`)
        ctx.fillStyle = glow
        ctx.fillRect(px - 22, y - 22, 44, 44)
      }
    }
  })

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 size-full [mask-image:linear-gradient(to_right,transparent,black_18%,black_82%,transparent)] print:hidden',
        className,
      )}
    />
  )
}
