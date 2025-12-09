## Top-down view
- Goal: add a required tag picker to the Ask Question flow and persist the chosen tag to Supabase/local state so it populates the `talks_questions.tag` column.
- Scope: AskQuestion UI/state/validation, view/router plumbing, addQuestion hook logic. Fetch mapping and sample data already cover `tag`.
- Result: every new question now carries a valid tag from the union; Supabase inserts include it and the fallback path mirrors the same shape.

## Step-by-step changes (entry-level friendly)
1) Ask form UI: In `src/features/campus-talks/components/AskQuestion.tsx`, imported the Select components and `TalkQuestion`; added `tag` state, required validation, and a dropdown listing all union options; updated `onSubmit` signature to include tag and made submit async with error handling.
2) Prop wiring: In `ViewRouter.tsx` and `CampusTalksShell.tsx`, updated the `onSubmitQuestion` prop/handler to accept `(title, body, tag)` and await the async addQuestion flow.
3) Data hook: In `useQuestions.ts`, changed `addQuestion` to require `tag`, perform a Supabase insert that includes `tag` (mapping `created_at`/`user_id`), and fall back to a local question that preserves the chosen tag instead of hardcoding `'other'`.
