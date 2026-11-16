import { Link } from 'react-router-dom'

import { hasContactEmail, site } from '@/config/site'
import { Container } from '../section'
import { Logo } from './Logo'
import { navItems } from './nav'

const year = new Date().getFullYear()

export function SiteFooter() {
  return (
    <footer className="border-t-8 border-signal bg-ink text-white print:hidden">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.3fr_1fr_1.3fr]">
        <div>
          <Logo dark />
          <p className="mt-5 max-w-sm text-white/90">
            A student-led project in {site.region} helping make sure healthcare referrals turn into real appointments.
          </p>
          <p className="mt-4 text-white/90">
            {hasContactEmail ? (
              <>
                Email:{' '}
                <a className="font-bold underline underline-offset-2" href={`mailto:${site.contactEmail}`}>
                  {site.contactEmail}
                </a>
              </>
            ) : (
              <>A monitored contact email is being set up.</>
            )}
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-lg font-bold">Pages</h2>
          <ul className="mt-3 space-y-2">
            {[{ to: '/', label: 'Home' }, ...navItems, { to: '/contact', label: 'Contact' }].map((item) => (
              <li key={item.to}>
                <Link className="text-white/90 underline-offset-4 hover:text-white hover:underline" to={item.to}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-lg font-bold">Privacy</h2>
          <p className="mt-3 text-white/90">
            This website does not use cookies, analytics, or tracking. Fonts are stored on this site, so your browser does not
            contact Google or other outside services. The guides run in your browser and do not save what you choose.
          </p>
          <h2 className="mt-6 text-lg font-bold">Languages</h2>
          <p className="mt-2 text-white/90">
            <span lang="es">Español: próximamente.</span> Translations will be published only after review by a qualified
            translator.
          </p>
        </div>
      </Container>
      <div className="border-t border-white/20">
        <Container className="flex flex-col gap-2 py-6 text-[0.95rem] text-white/85 sm:flex-row sm:justify-between">
          <span>
            © {year} {site.name}. A student-led project in development.
          </span>
          <span>Nonmedical information only. Not medical, legal, or immigration advice.</span>
        </Container>
      </div>
    </footer>
  )
}
