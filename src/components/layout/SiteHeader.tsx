import { Menu } from 'lucide-react'
import { NavLink } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { Logo } from './Logo'
import { navItems } from './nav'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'rounded-lg px-3 py-2 text-base font-semibold transition-colors hover:bg-muted hover:text-brand-navy',
    isActive ? 'text-brand-teal' : 'text-foreground/85',
  )

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur print:hidden">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
          <Button asChild size="sm" className="ml-2">
            <NavLink to="/contact">Contact us</NavLink>
          </Button>
        </nav>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
              <Menu aria-hidden="true" className="size-7!" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetTitle className="font-display text-xl font-bold">Menu</SheetTitle>
            <SheetDescription className="sr-only">Site navigation</SheetDescription>
            <nav aria-label="Mobile" className="mt-2 flex flex-col gap-1">
              {[{ to: '/', label: 'Home' }, ...navItems, { to: '/contact', label: 'Contact us' }].map((item) => (
                <SheetClose asChild key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      cn('rounded-lg px-4 py-3 text-lg font-semibold hover:bg-muted', isActive && 'bg-secondary text-secondary-foreground')
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
    </header>
  )
}
