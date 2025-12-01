## Prompt Checklist

Use this checklist when drafting coding prompts so the assistant pulls prior context and produces clean, secure, debuggable code.

### Pull context first
- Summarize what’s already built: key modules, entrypoints, API routes, data models, env vars.
- Reference anchors: `README.md`, `docs/dev-setup.md`, `docs/learning/mvp.md`, current `ca-frontend` structure.
- Map dependencies: list functions/modules/routes to touch and cross-module impacts.
- Restate constraints: feature flags, env vars, external services, known TODO/FIXME/bugs.
- Note existing tests covering the area and gaps to fill.

### Coding expectations
- Clarity: intention-revealing names, no magic numbers, small single-responsibility functions.
- Structure: compose small functions; keep files cohesive; avoid unnecessary globals/stateful side effects.
- CRUD: validate inputs, enforce authz, handle not-found/duplicates, use clear status codes/messages.
- Errors & logging: structured handling; surface actionable messages (no secrets); log with context/levels; don’t swallow errors.
- Security: validate/sanitize inputs; parameterized queries; protect secrets; authz on every operation.
- Testing: add/update unit tests for core logic/edges; integration tests for key flows; keep tests deterministic.
- API/contracts: predictable types/shapes; payload validation; consistent responses; version endpoints when needed.
- Readability/style: follow lint/format rules; brief comments only for non-obvious logic.
- Performance/reliability: avoid unnecessary work in hot paths; use async/await thoughtfully; timeouts/retries where appropriate.
- Debuggability: purposeful logging, correlation IDs/trace data, feature flags for risky changes.

### Output format
- Provide a brief plan (steps, files, functions).
- Show the diff or code changes.
- List test commands and results; call out remaining gaps or assumptions.

### Copy-paste templates
**New Feature (baseline)**
- “Summarize the current code relevant to feature X (modules, entrypoints, routes, models, env vars, tests). Then propose a short plan (steps + files/functions to touch).”
- “Implement feature X with small, single-responsibility functions; intention-revealing names; no magic numbers; cohesive files.”
- “For CRUD parts, validate inputs, enforce authz, handle not-found/duplicates, return clear status codes/messages.”
- “Add/adjust tests: unit for core logic/edge cases, integration for key flows; keep tests deterministic. List test commands.”
- “Handle errors/logging: structured errors, actionable messages without secrets, log with levels/context, don’t swallow errors.”
- “Return the final diff/code plus test results.”

**Debugging (baseline)**
- “Summarize the bug and suspected surface area (modules/routes/functions); note recent changes related to it.”
- “List hypotheses; design minimal repro steps; capture inputs/outputs/logs.”
- “Instrument with minimal, purposeful logging (no secrets); include correlation/trace IDs if available.”
- “Propose the smallest safe fix and any ripple effects; add regression tests covering the repro; list test commands and results.”
- “Provide the patch/diff and remaining risks or assumptions.”

**Quick change (small, scoped)**
- “Given files A/B and goal X, outline a 3–5 step plan, then implement, then show tests run/results. Keep functions small and readable.”

### When to use which
- New Feature template: adding behavior or refactoring with behavioral changes; moderate/big scope.
- Debugging template: triage/fix bugs or regressions; need repro, hypotheses, instrumentation, smallest-safe fix, regression tests.
- Quick change template: small, well-scoped tweaks when you already know the files/goal and just need plan → implement → tests.