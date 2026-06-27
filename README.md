# Orca Pizza

Artisan wood-fired pizza website, rebuilt with Next.js (App Router), TypeScript, and Tailwind CSS.

## Features

- **Day / Night theme** — toggle in the header switches the whole site between a warm
  daylight palette and a wood-oven-ember night palette (persisted in `localStorage`,
  defaults to your local time on first visit).
- **Ambient background animation** — a canvas animation behind every page: soft drifting
  flour dust by day, rising embers by night. Respects `prefers-reduced-motion`.
- **Centered header** — logo sits in the true center of the nav bar on desktop, with links
  split left/right and the theme toggle on the right. Collapses to a mobile menu under
  768px.
- **Separate pages per section** — `/`, `/menu`, `/about`, `/contact` are real routes
  instead of anchor-linked sections, each with its own metadata for SEO.
- **Menu filtering** — filter pizzas by Classic / Specialty / Vegetarian.
- **Working contact form** — posts to `/app/api/contact/route.ts`. Currently logs the
  message server-side; wire it up to an email provider (Resend, SendGrid, etc.) or a
  database when you're ready to go live.
- Responsive, keyboard-accessible (visible focus states), and respects reduced-motion
  preferences throughout.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Project structure

```
app/
  layout.tsx        Root layout: fonts, ThemeProvider, Navbar, Footer, AmbientBackground
  page.tsx           Home
  menu/page.tsx       Menu (renders MenuExplorer)
  about/page.tsx      About
  contact/page.tsx    Contact
  api/contact/route.ts  Contact form submission endpoint
components/
  Navbar.tsx, Footer.tsx, Hero.tsx, PizzaCard.tsx, MenuExplorer.tsx,
  ContactForm.tsx, ThemeProvider.tsx, ThemeToggle.tsx, AmbientBackground.tsx, Reveal.tsx
lib/
  menu.ts            Pizza menu data
```

## Next steps you may want

- Connect the contact form to a real email service or CRM.
- Add a cart/checkout flow if you want to take orders online.
- Replace the Unsplash photography with your own product shots.
- Add a CMS (Sanity, Contentful) if the menu changes often.
