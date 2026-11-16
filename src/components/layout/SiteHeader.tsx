import { useState } from 'react'
import { Menu, Search } from 'lucide-react'
import { NavLink } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { CommandMenu } from './CommandMenu'
import { Logo } from './Logo'
import { navItems } from './nav'

/** The current page gets a thick yellow bar under its name, like the line indicator on a station sign. */
const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'flex h-full items-center border-b-4 px-3 pt-1 text-base font-bold transition-colors',
    isActive ? 'border-signal text-ink' : 'border-transparent text-ink/80 hover:border-border hover:text-ink',
  )

export function SiteHeader() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-white print:hidden">
      <div className="mx-auto flex h-16 max-w-6xl items-stretch justify-between gap-3 px-4 sm:px-6">
        <div className="flex items-center">
          <Logo />
        </div>

        <nav aria-label="Main" className="hidden items-stretch lg:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="flex min-h-11 cursor-pointer items-center gap-2 rounded-md border-2 border-border px-3 text-base font-bold text-ink hover:border-ink"
          >
            <Search aria-hidden="true" className="size-5" />
            <span className="hidden sm:inline">Search</span>
            <span className="sr-only sm:hidden">Search</span>
          </button>

          <Button asChild size="sm" className="hidden lg:inline-flex">
            <NavLink to="/contact">Contact us</NavLink>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="grid size-11 cursor-pointer place-items-center rounded-md text-ink hover:bg-signage lg:hidden"
              >
                <Menu aria-hidden="true" className="size-7" />
              </button>
            </SheetTrigger>
            <SheetContent>
              <SheetTitle className="text-xl font-bold">Menu</SheetTitle>
              <SheetDescription className="sr-only">Site navigation</SheetDescription>
              <nav aria-label="Mobile" className="mt-2 flex flex-col">
                {[{ to: '/', label: 'Home' }, ...navItems, { to: '/contact', label: 'Contact us' }].map((item) => (
                  <SheetClose asChild key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) =>
                        cn(
                          'border-l-4 px-4 py-3 text-xl font-bold text-ink hover:bg-signage',
                          isActive ? 'border-signal bg-signage' : 'border-transparent',
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <CommandMenu open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  )
}
