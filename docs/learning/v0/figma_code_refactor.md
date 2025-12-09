## React notes (beginner-friendly)

- **State lives at the top:** `App.tsx` holds the active tab and shared header info. Each feature (like CampusTalks) keeps its own state via hooks, so data is managed where it is used.
- **Tabs pick a feature:** `TabRouter` chooses which feature to show. For now there are two “tabs”: `splash` (shown first) and `campus-talks`. Only one renders at a time.
- **Splash is its own feature:** The splash screen lives in `features/splashscreen`. It has a timer that calls back to switch the tab to CampusTalks. The header stays hidden while the splash tab is active.
- **Header is shared chrome:** `AppLayout` renders the shared Header only when `showHeader` is true. Feature shells (like CampusTalks) pass up their search box state/handler so the header can control their search.
- **Feature shell idea:** `CampusTalksShell` wraps everything for Q&A: it uses `useQuestions` and `useSearch`, and its own `ViewRouter` to switch between home, search results, question detail, and ask-question screens.
- **Derived data, not duplicate state:** Search results are calculated from the current questions instead of storing a second list. This keeps data in sync.
- **Props pass data down:** Components receive the data and callbacks they need (e.g., `QuestionList` gets questions and click handlers). This keeps logic clear and local.
- **Conditional rendering:** The UI swaps screens based on simple checks (which tab is active, which view is active inside the feature) instead of routing URLs.
- **Shared vs feature code:** Shared UI sits in `src/components/` (Header, Snackbar, TabRouter, AppLayout). Feature-specific code sits under `src/features/<feature>/` so tabs can grow independently.
- **Search stays in the feature:** The search box now lives in the CampusTalks home/question list view and uses the feature’s search state. The shared Header no longer owns search, so other tabs can choose their own search UI later.
