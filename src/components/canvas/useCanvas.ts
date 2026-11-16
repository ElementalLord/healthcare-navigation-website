import { useEffect, useRef } from 'react'

export interface Frame {
  /** Canvas width and height in CSS pixels. */
  w: number
  h: number
  /** Seconds since the animation started. */
  t: number
  /** Pointer position relative to the canvas, and how recently it moved (0–1). */
  pointer: { x: number; y: number; power: number }
}

export type Draw = (ctx: CanvasRenderingContext2D, frame: Frame) => void

/**
 * Runs a drawing function on a <canvas> every animation frame.
 *
 * Handles the fiddly parts so each effect only has to draw:
 *  - sizes the canvas to its box and to the screen's pixel density (capped at 2x for speed)
 *  - pauses when the canvas is off screen or the tab is hidden (saves battery on phones)
 *  - draws a single still frame for people who ask their device for reduced motion
 *
 * `create` is called once and returns the draw function, so it can set up its own state.
 */
export function useCanvas(create: () => Draw) {
  const ref = useRef<HTMLCanvasElement>(null)
  const createRef = useRef(create)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const draw = createRef.current()
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const frame: Frame = { w: 0, h: 0, t: 0, pointer: { x: -9999, y: -9999, power: 0 } }
    let raf = 0
    let last = 0
    let onScreen = false

    function resize() {
      const rect = canvas!.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      frame.w = rect.width
      frame.h = rect.height
      canvas!.width = Math.round(rect.width * dpr)
      canvas!.height = Math.round(rect.height * dpr)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (reduceMotion || !raf) draw(ctx!, frame)
    }

    function tick(now: number) {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      frame.t += dt
      frame.pointer.power = Math.max(0, frame.pointer.power - dt * 0.6)
      draw(ctx!, frame)
      raf = requestAnimationFrame(tick)
    }

    function update() {
      const shouldRun = onScreen && !document.hidden && !reduceMotion
      if (shouldRun && !raf) {
        last = performance.now()
        raf = requestAnimationFrame(tick)
      } else if (!shouldRun && raf) {
        cancelAnimationFrame(raf)
        raf = 0
      }
    }

    function onPointer(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect()
      frame.pointer.x = e.clientX - rect.left
      frame.pointer.y = e.clientY - rect.top
      frame.pointer.power = 1
    }

    const sizeObserver = new ResizeObserver(resize)
    sizeObserver.observe(canvas)
    const viewObserver = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      update()
    })
    viewObserver.observe(canvas)
    document.addEventListener('visibilitychange', update)
    if (!reduceMotion) window.addEventListener('pointermove', onPointer, { passive: true })
    resize()

    return () => {
      cancelAnimationFrame(raf)
      sizeObserver.disconnect()
      viewObserver.disconnect()
      document.removeEventListener('visibilitychange', update)
      window.removeEventListener('pointermove', onPointer)
    }
  }, [])

  return ref
}
