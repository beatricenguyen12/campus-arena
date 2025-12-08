## Top-down view
- Goal: align frontend types and sample data with new `user_id` columns on `talks_questions` and `talks_answers` while keeping UI behavior unchanged.
- Scope: Type updates (`TalkQuestion`, `TalkAnswer`), Supabase row mapping in `useQuestions`, and sample data shape.
- Result: Both live Supabase fetches and local fallback data now surface `userId` (string or null) so future features can use it safely.

## Step-by-step changes (entry-level friendly)
1) Types: Added an optional `userId?: string | null` to `TalkQuestion` and `TalkAnswer` in `src/types/talks_questions.ts` and `src/types/talks_answers.ts`. This mirrors the new `user_id` column without forcing it to exist (null/undefined allowed).
2) Supabase mapping: In `src/features/campus-talks/hooks/useQuestions.ts`, extended the Supabase row shapes to include `user_id`, and when mapping rows to app types, set `userId: row.user_id ?? null`. Everything else stays the same.
3) Sample data: In `src/data/sampleData.ts`, added `userId` values to every sample question and answer so the mock data matches the updated type shape. UUIDs are placeholder strings; UI remains unchanged.
