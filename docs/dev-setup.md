# Dev Setup (Vite SPA)

The repo now ships only the Vite + React + TypeScript frontend in `ca-frontend`. The previous Next.js/Express pieces are gone; the UI runs as a single-page app backed by local mock data in `src/data`.

## Prerequisites
- Node.js 20+
- npm 10+
- Recommended: VS Code with the ESLint extension (flat config) and TypeScript tools enabled

## Install
```bash
cd ca-frontend
npm install
```

## Run the dev server
```bash
npm run dev
```
Vite serves the app on http://localhost:3000 (configured in `vite.config.ts`).

## Build for release
```bash
npm run build
```
Outputs static assets to `ca-frontend/build`.

## Lint
ESLint is configured with TypeScript, React, a11y, and import-order rules via `ca-frontend/eslint.config.cjs`.
```bash
npm run lint
```
Current warnings highlight import grouping and a11y touchpoints; fix or adjust per feature work.

## Project layout
- Frontend-only SPA: entry at `ca-frontend/src/main.tsx`, app state/flow in `ca-frontend/src/App.tsx`.
- UI kit and screens live under `ca-frontend/src/components` (design-system pieces in `ca-frontend/src/components/ui`).
- Data: Supabase client reads from Postgres when configured; otherwise the app falls back to mock data in `ca-frontend/src/data`.
- Vite config (`ca-frontend/vite.config.ts`) defines the `@` alias to `src` and builds to `build/`.

## Environment variables
- Optional Supabase connection: create `ca-frontend/.env.local` (or `.env`) with:
  - `VITE_SUPABASE_URL=<your-supabase-url>`
  - `VITE_SUPABASE_ANON_KEY=<your-anon-key>`
- If these are missing, the app uses local sample data; keep any service key server-side and rely on RLS for anon access.
