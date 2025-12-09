## Top-down view
- Goal: align the frontend with the new required `tag` column on `talks_questions` (allowed values: academics, orientation_campus_life, housing, jobs_internships, clubs_orgs, life_local_area, international_students, starter_pack, other) without changing UI behavior.
- Scope: question type definition, Supabase mapping for questions, and local sample data.
- Result: questions now carry a required `tag` in all data flows (Supabase and fallback), ready for future display/filter features.

## Step-by-step changes (entry-level friendly)
1) Types: Added a required `tag` field to `TalkQuestion` in `src/types/talks_questions.ts` as a union of the allowed tag strings, matching the NOT NULL column.
2) Supabase mapping: In `src/features/campus-talks/hooks/useQuestions.ts`, extended `SupabaseQuestionRow` with `tag` and mapped `tag: question.tag` when building `TalkQuestion`. Rest of the hook is unchanged.
3) Sample data: In `src/data/sampleData.ts`, added valid `tag` values to every sample question so fallback data matches the required type/DB shape.

**Follow-up concepts**
- talks_questions.ts = define the internal model (TypeScript interface) for questions.
- useQuestions.ts = adapter + stateful helper: fetch from Supabase (persistence), map to the internal model, keep it in state, expose functions to use it—just like an Angular service backed by Spring/Postgres.
