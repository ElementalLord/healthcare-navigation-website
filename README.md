# CarePath — Healthcare Navigation Website

CarePath is a student-led project in Houston and Katy, Texas. We help families **follow through** on healthcare referrals,
working through community organizations with adult supervision. This website supports that work: it gives families
plain-language guides and call scripts, and gives partner organizations a clear picture of what we do.

> This is nonmedical information only. No diagnosis, medical advice, eligibility decisions, legal or immigration advice.

## Tech stack

| Tool | What it does |
| --- | --- |
| [Vite](https://vite.dev) | Dev server and build tool |
| [React](https://react.dev) + [TypeScript](https://www.typescriptlang.org) | Pages and components, with type checking |
| [Tailwind CSS](https://tailwindcss.com) | Styling with utility classes |
| [shadcn/ui](https://ui.shadcn.com) | Accessible UI components (copied into `src/components/ui`, built on Radix) |
| [Framer Motion](https://motion.dev) | The route-map animation and responses to clicks (turned off for people who choose reduced motion) |
| [React Router](https://reactrouter.com) | Pages (`/#/guides`, `/#/directory`, …) |
| [Lucide](https://lucide.dev) | Icons |

No backend, database, cookies, analytics, or third-party requests. Fonts are self-hosted.

## Run it on your computer

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
```

```bash
npm run dev
```

Then open the address it prints (usually http://localhost:5173). Changes show up as soon as you save.

Other commands:

```bash
npm run build     # type-check and build the site into dist/
npm run preview   # serve the built site locally
npm run lint      # check for common mistakes
```

## Where things are

```
src/
  config/site.ts          ← contact email, emergency text, region. START HERE.
  data/                   ← all the words on the site live here
    journeys.ts           ← step-by-step guides (referral, bills, interpreter, …)
    topics.ts             ← Quick Guide topics and questions
    glossary.ts           ← plain-language definitions
    resources.json        ← resource directory listings
    content.ts            ← status board, follow-up protocol, volunteer roles and limits
    barriers.ts           ← barrier categories (and research percentages, once sourced)
    types.ts              ← the "shape" of each kind of content
  pages/                  ← one file per page
  components/             ← reusable pieces (QuickGuide, ContactForm, …)
    ui/                   ← shadcn/ui components (Button, Card, Tabs, Dialog, …)
    layout/               ← floating header, search (Ctrl/⌘ + K), footer, emergency bar
    home/                 ← home page pieces (RouteMap, FollowUpTimetable)
  data/routes.ts          ← each guide's route colour and icon
  index.css               ← colors, fonts, print styles
```

### Common edits

- **Change wording:** edit the files in `src/data/`. You rarely need to touch the pages.
- **Add a guide:** add an object to `journeys` in `src/data/journeys.ts`. TypeScript will tell you if a field is missing.
  It shows up automatically on the home page and on `/guides`.
- **Add a directory listing:** add an entry to `src/data/resources.json` (see "Verifying resources" below).
- **Set the contact email:** set `contactEmail` in `src/config/site.ts`. Forms switch from "demo" to opening the
  visitor's own email app. Only do this once someone has agreed to check that inbox.

### Design rules

The look borrows from public-transit signage: a referral is a trip with stops, and our job is making
sure the family arrives. The design follows Anthropic's `frontend-design` guidance to avoid a generic,
template look.

- **One typeface:** Atkinson Hyperlegible Next, made by the Braille Institute for low-vision readers.
- **Flat colours only:** ink `#14213D`, route blue `#1F5FAD`, route green `#1A6E44`, signal yellow `#F2B41B`,
  signage grey `#E9ECEE`, white. No gradients, glows, blur, or shadows. Yellow is a fill colour, never text on white.
- **Shapes:** rectangles with small corner radii. No pill shapes. Circles are used only for route stops
  and status markers.
- **Motion:** one animated moment (the route map on the home page). Everything else moves only when the
  visitor does something. No scroll fade-ins.
- **Words:** sentence case, no ALL-CAPS labels, no arrows or "·" separators in text, no made-up statistics.
  Buttons say exactly what happens ("Read the full guide", not "Learn more").
- **Structure carries meaning:** numbers only on real sequences (route stops, guide steps, the follow-up
  schedule). Each guide has a route colour in `src/data/routes.ts`, used on its icon, page stripe, and step line.

### Accessibility rules (please keep these)

- Body text is 17px; nothing smaller than 14px.
- All text meets WCAG AA contrast (4.5:1). Use `text-muted-foreground` for grey text on light backgrounds,
  and `text-brand-mint` **only** on the dark navy background.
- Decorative icons get `aria-hidden="true"`.
- The emergency bar (`EmergencyBar.tsx`) appears on every page. Do not remove it.

## Content rules

- Plain language, about a 5th–6th grade reading level. Short sentences.
- Say "usually" for timing; offices differ.
- Houston/Harris County/Fort Bend facts go in a guide's `localNotes` with `verified: false` until confirmed with the
  organization. Unverified notes are shown with a warning.
- Have a qualified adult advisor review guide changes before publishing.
- Do not publish translations until a qualified translator has reviewed them.
- Do not publish research percentages (`barriers.ts`) without naming the source.

## Verifying resources

The directory currently shows **sample** entries only. To publish a real listing:

1. Contact the organization directly and confirm service area, eligibility, cost, languages, and contact details.
2. In `resources.json`, set `"verification_status": "verified"`, `"last_verified": "YYYY-MM-DD"`, and `"verified_by"`.
3. Re-check every listing at least every 3 months. Change to `"needs-review"` if anything is uncertain.
4. Remove the sample entries once real ones exist.

## Privacy and safety boundaries

The site does not collect, store, or transmit personal information. Forms either do nothing (demo mode) or open the
visitor's own email app. Do not add real client intake to this website. Families are introduced through partner
organizations, and any tracking happens outside the website using pseudonymous IDs and task status only, after
adult oversight, consent, privacy, retention, and escalation procedures are approved.

## Deploying (GitHub Pages)

`.github/workflows/deploy.yml` builds the site and publishes it whenever `main` changes.

**One-time setup:** in the GitHub repo, go to **Settings → Pages → Build and deployment → Source** and choose
**GitHub Actions**. (If Pages is set to "Deploy from a branch", it will serve the unbuilt source and the site will be blank.)

The site uses hash URLs (`/#/guides`) so it works on GitHub Pages without extra server setup.
