## Top-down view

- Goal: load questions/answers from Supabase while keeping the existing UI/search/share UX, and fall back to the seeded sample data if Supabase is empty or unavailable.
- Env-driven: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` power a shared client in `src/lib/supabaseClient.ts`.
- Data shape: Supabase rows map to `TalkQuestion`/`TalkAnswer` with numeric `id`, ISO `createdAt`, and `questionId` on answers; console logs show what came back.
- Fallback: when Supabase returns zero questions (or errors), the hook reuses the current sample dataset so the interface still has content.
- Mutations: `addQuestion`/`addAnswer` remain local-only placeholders; Supabase inserts are intentionally deferred.

## Step-by-step

1) Configure env  
   - Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to your `.env` (Vite exposes `import.meta.env`). Missing keys trigger a console warning and the app uses sample data.

2) Supabase client  
   - File: `src/lib/supabaseClient.ts`.  
   - Creates a singleton Supabase client when env vars exist, otherwise exports `null` and logs a warning.

3) Fetch with fallback  
   - File: `src/features/campus-talks/hooks/useQuestions.ts`.  
   - On mount, fetches `talks_questions` ordered by `created_at` and `talks_answers`, maps to `TalkQuestion` with nested `answers`, and `console.log`s the mapped result.  
   - If the mapped list is empty (or a fetch errors), `setQuestions` uses the existing sample data instead. If Supabase is unset, it immediately loads the sample fallback.

4) Current UX  
   - Consumers (list, detail, search, share) keep the same props/shapes; `addQuestion`/`addAnswer` still mutate local state only until Supabase writes are added later.

5) Quick validation  
   - Run `npm run lint` in `ca-frontend` to verify types/imports after changes.
