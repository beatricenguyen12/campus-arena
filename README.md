# campus-arena Project Overview

**Name:** CampusArea

**Overview:**
CampusArena is a lightweight web app that helps students access campus knowledge more easily.
We provide a simple Q&A experience where students can browse questions, share insights, and learn from peers who’ve been through the same classes and experiences.

**Tech Stack (current):**
- Frontend: React 18 + TypeScript SPA built with Vite 6 in `ca-frontend`, routed via React Router 7
- Styling/UI: Tailwind CSS v4 utility build with Radix UI/shadcn-inspired components and Lucide icons
- Data layer: Supabase (Postgres) via `@supabase/supabase-js`; uses `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` when provided, otherwise falls back to local sample data in `src/data`
- Tooling: TypeScript 5, ESLint (React/TS/a11y/import rules)
- Hosting: static Vite build output ready for any static host; Supabase hosts the database/API

**MVP Scope:**
- Mobile-friendly web interface
- Questions feed
- Question detail page
- Question tags
- Add answer
- Sharable link for each question page
- Basic question search
- Contact for feedback
