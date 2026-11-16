import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { hasContactEmail, site } from '@/config/site'
import { DotGrid } from '../canvas/DotGrid'
import { Container } from '../section'
import { Logo } from './Logo'
import { navItems } from './nav'

const year = new Date().getFullYear()

export function SiteFooter() {
  return (
    <footer className="grain relative overflow-hidden bg-brand-ink text-white print:hidden">
      <DotGrid className="opacity-60" />
      <Container className="relative grid gap-12 pb-10 pt-20 md:grid-cols-[1.3fr_1fr_1.3fr]">
        <div>
          <Logo dark />
          <p className="mt-5 max-w-sm text-white/85">
            A student-led project in {site.region} helping make sure healthcare referrals turn into real appointments.
          </p>
          <p className="mt-4 text-white/85">
            {hasContactEmail ? (
              <>
                Email:{' '}
                <a className="font-semibold text-brand-mint underline underline-offset-2" href={`mailto:${site.contactEmail}`}>
                  {site.contactEmail}
                </a>
              </>
            ) : (
              <>A monitored contact email is being set up.</>
            )}
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-brand-mint">Pages</h2>
          <ul className="mt-4 space-y-2.5">
            {[{ to: '/', label: 'Home' }, ...navItems, { to: '/contact', label: 'Contact' }].map((item) => (
              <li key={item.to}>
                <Link className="group inline-flex items-center gap-1 text-lg text-white/90 hover:text-white" to={item.to}>
                  {item.label}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-brand-mint">Privacy</h2>
          <p className="mt-4 text-white/85">
            This website does not use cookies, analytics, or tracking. Fonts are stored on this site, so your browser does not
            contact Google or other outside services. The guides run in your browser and do not save what you choose.
          </p>
          <h2 className="mt-7 text-sm font-bold uppercase tracking-[0.14em] text-brand-mint">Languages</h2>
          <p className="mt-3 text-white/85">
            <span lang="es">Español — próximamente.</span> Translations will be published only after review by a qualified
            translator.
          </p>
        </div>
      </Container>

      {/* Oversized wordmark. Decorative, so hidden from screen readers. */}
      <div aria-hidden="true" className="relative select-none overflow-hidden">
        <p className="-mb-[0.22em] text-center font-display text-[23vw] font-extrabold leading-none tracking-tighter text-white/[0.06]">
          CarePath
        </p>
      </div>

      <div className="relative border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-[0.95rem] text-white/80 sm:flex-row sm:justify-between">
          <span>
            © {year} {site.name} · Student-led project in development
          </span>
          <span>Nonmedical information only. Not medical, legal, or immigration advice.</span>
        </Container>
      </div>
    </footer>
  )
}
