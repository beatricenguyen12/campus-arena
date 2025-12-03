## Top-down view

- Goal: align our front-end question/answer types with the Supabase tables (numeric ids, ISO `createdAt`, `questionId` on answers) so swapping sample data for real rows is painless.
- What changed: types now live in `src/types/talks_questions.ts` and `src/types/talks_answers.ts`, sample data matches the Supabase shape, and the UI formats timestamps from `createdAt`.
- How to think about it: questions own their `createdAt` and may optionally include `answers`; answers point back via `questionId` and carry their own `createdAt`.

## Step-by-step changes

1) Types  
   - Added `TalkQuestion` and `TalkAnswer` in the new `src/types/talks_questions.ts` and `src/types/talks_answers.ts`.  
   - `id` and `questionId` are numbers; `createdAt` is a timestamp string; questions can optionally ship with an `answers` array.  
   - Re-exported everything through `src/types/index.ts` so existing imports keep working.

2) Sample data  
   - `src/data/sampleData.ts` now seeds numeric ids and ISO `createdAt` values.  
   - Answers include `questionId` for an explicit join back to their question.  
   - A tiny `hoursAgo` helper keeps the demo timestamps fresh without hard-coding times.

3) Hooks  
   - `useQuestions` normalizes any missing `answers` to an empty array, generates numeric ids for new records, and stamps `createdAt` with `new Date().toISOString()`.  
   - `useSearch` now checks optional `answers` arrays safely.

4) UI wiring  
   - `QuestionCard`, `AnswerCard`, and `QuestionDetail` format `createdAt` via `formatTimeAgo` (`src/utils/time.ts`) so the UI still shows friendly “x ago” text.  
   - Routing in `CampusTalksShell` parses numeric `questionId` from the URL, and list/detail/search props now expect `TalkQuestion`.

5) When adding more data  
   - Keep `createdAt` as an ISO string (what Supabase returns by default).  
   - If you fetch from Supabase later, map rows into `TalkQuestion`/`TalkAnswer` before handing them to the hooks/components.
