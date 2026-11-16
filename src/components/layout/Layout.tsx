import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { EmergencyBar } from './EmergencyBar'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'

export function Layout() {
  const { pathname } = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  const firstRender = useRef(true)

  // On page change: scroll to top and move keyboard/screen-reader focus to the new content.
  useEffect(() => {
    window.scrollTo(0, 0)
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    mainRef.current?.focus({ preventScroll: true })
  }, [pathname])

  return (
    <div className="flex min-h-svh flex-col">
      {/* Skip link uses a button because "#main" would be read as a page address by the router. */}
      <button
        type="button"
        onClick={() => mainRef.current?.focus()}
        className="sr-only z-50 rounded-md border-2 border-ink bg-white px-4 py-3 font-bold focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[80]"
      >
        Skip to content
      </button>
      <EmergencyBar />
      <SiteHeader />
      <main id="main" ref={mainRef} tabIndex={-1} className="flex-1 outline-none">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}
