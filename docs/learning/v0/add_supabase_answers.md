## Add Supabase-backed answers

- `useQuestions.addAnswer` now attempts a Supabase insert into `talks_answers` (question_id + content), maps the returned row to `TalkAnswer`, and updates local state; if Supabase is unavailable, it falls back to the sample/local append. Errors from Supabase throw to the caller.
- `CampusTalksShell.handleAddAnswer` awaits the async add and only patches the selected question when the insert succeeds.
- `QuestionDetail` submit flow awaits `onAddAnswer`, shows success only on success, and shows an error while leaving the input text intact on failure.
