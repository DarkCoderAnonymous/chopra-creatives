# Chopra Creative

Marketing and portfolio site for Chopra Creative, a packaging design studio.
Built with Next.js (App Router), TypeScript, Tailwind CSS v4, Framer Motion,
and a React Three Fiber hero scene.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

- `app/` — routes: home, `/work`, `/work/[slug]` (case studies), `/about`, `/contact`
- `components/` — `layout/`, `home/`, `work/`, `theme/`, `three/`, `ui/`
- `lib/data.ts` — all case study content, site copy, and typed content models
- `public/images/` — optimized project imagery sourced from `../Web data`

## Notes

- Theme is class-based (`.dark` on `<html>`), persisted to `localStorage`,
  defaulting to the OS preference on first visit. See
  `components/theme/theme-provider.tsx`.
- The hero's 3D scene (`components/three/hero-scene.tsx`) is lazy-loaded on
  the client only, and falls back to a static layered image composition when
  WebGL is unavailable, the viewport is small, or `prefers-reduced-motion` is
  set. See `components/three/hero-visual.tsx`.

## Scripts

- `npm run dev` — start the dev server (Turbopack)
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — ESLint
