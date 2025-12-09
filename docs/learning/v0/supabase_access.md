**Recommended approach (MVP)**
Use the public anon key for both reads and writes, with tight RLS policies. Rationale: you don’t have auth yet, so adding Supabase Auth or a backend would slow the MVP. Public reads + guarded anon inserts let you ship questions/answers quickly while keeping the service key out of the browser.

**Top-down**

Reads: allow anon to SELECT talks_questions and talks_answers.
Writes: allow anon to INSERT into both tables under simple conditions (e.g., non-empty title/content, optional length caps). Skip UPDATE/DELETE for now to avoid abuse.
Security: rely on RLS, not secrecy of the anon key; never expose the service key.

**Step-by-step**

Schema sanity: ensure talks_questions has id, title, body, created_at default now(), and optional user_id uuid; talks_answers has id, question_id FK, content, created_at default now(), optional user_id.
Enable/confirm RLS on both tables.
Policies for reads: create SELECT policy for anon on both tables (e.g., USING (true)).
Policies for writes: create INSERT policy for anon with simple guards, e.g.:
talks_questions: USING (true) WITH CHECK (char_length(title) > 0 AND char_length(title) <= 200)
talks_answers: USING (true) WITH CHECK (char_length(content) > 0 AND char_length(content) <= 1000)
Skip updates/deletes for now.
Frontend wiring: keep anon Supabase client; in addQuestion/addAnswer call insert and use returned rows; keep sample-data fallback if fetch is empty.
Smoke test: insert one question/answer via SQL or the app; verify they appear in the UI and the fallback no longer triggers.