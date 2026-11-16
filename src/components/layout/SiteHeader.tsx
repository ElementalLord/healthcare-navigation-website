import { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, Search } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { CommandMenu } from './CommandMenu'
import { Logo } from './Logo'
import { navItems } from './nav'

/**
 * Floating glass navigation bar. It sits on top of the page (the wrapper has no height),
 * so page heroes add top padding to make room for it.
 */
export function SiteHeader() {
  const { pathname } = useLocation()
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 h-0 print:hidden">
      <div className="absolute inset-x-0 top-3 px-3">
        <motion.div
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 rounded-full border border-white/10 bg-[#0a222c]/85 pl-4 pr-2.5 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl"
        >
          <Logo dark />

          <nav aria-label="Main" className="hidden items-center lg:flex">
            {navItems.map((item) => {
              const active = pathname.startsWith(item.to)
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={cn(
                    'relative rounded-full px-4 py-2 text-base font-semibold transition-colors',
                    active ? 'text-white' : 'text-white/80 hover:text-white',
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full bg-white/12 ring-1 ring-white/15"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </NavLink>
              )
            })}
          </nav>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 text-base font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white"
            >
              <Search aria-hidden="true" className="size-4.5" />
              <span className="hidden sm:inline">Search</span>
              <kbd aria-hidden="true" className="hidden rounded-md border border-white/20 px-1.5 font-sans text-sm text-white/80 xl:inline">
                Ctrl K
              </kbd>
              <span className="sr-only sm:hidden">Search</span>
            </button>

            <Button asChild variant="mint" size="sm" className="hidden lg:inline-flex">
              <NavLink to="/contact">Contact us</NavLink>
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label="Open menu"
                  className="grid size-11 cursor-pointer place-items-center rounded-full text-white hover:bg-white/10 lg:hidden"
                >
                  <Menu aria-hidden="true" className="size-6" />
                </button>
              </SheetTrigger>
              <SheetContent>
                <SheetTitle className="font-display text-xl font-bold">Menu</SheetTitle>
                <SheetDescription className="sr-only">Site navigation</SheetDescription>
                <nav aria-label="Mobile" className="mt-2 flex flex-col gap-1">
                  {[{ to: '/', label: 'Home' }, ...navItems, { to: '/contact', label: 'Contact us' }].map((item, i) => (
                    <motion.div
                      key={item.to}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.12 + i * 0.05, duration: 0.4 }}
                    >
                      <SheetClose asChild>
                        <NavLink
                          to={item.to}
                          end={item.to === '/'}
                          className={({ isActive }) =>
                            cn(
                              'block rounded-2xl px-4 py-3 font-display text-2xl font-bold text-brand-navy hover:bg-muted',
                              isActive && 'bg-secondary text-secondary-foreground',
                            )
                          }
                        >
                          {item.label}
                        </NavLink>
                      </SheetClose>
                    </motion.div>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </motion.div>
      </div>
      <CommandMenu open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  )
}
