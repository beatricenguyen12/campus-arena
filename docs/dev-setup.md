# Dev Setup (Next.js-only)

The repo now contains a single Next.js app (`ca-frontend`). The former Express backend has been removed.

## Prerequisites
- Node.js 20.x
- npm 10.x+
- Recommended: VS Code + ESLint/Prettier extensions

## Install
```bash
cd ca-frontend
npm install
```

## Run dev server
```bash
npm run dev
```
Open http://localhost:3000.

## Lint
```bash
npm run lint
```

## Environment variables
- None required for the starter template.
- Add future secrets to `.env.local` (server-only) or prefix with `NEXT_PUBLIC_` when safe for client use.

## APIs
- Use Next.js Route Handlers (e.g., `app/api/.../route.ts`) or Server Actions for backend logic.
- If you previously pointed the frontend at `ca-backend`, update calls to use in-app API routes instead.
