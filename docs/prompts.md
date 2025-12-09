## Prompting Cheat Sheet (fast, copy/paste)

Use these snippets to get solid, standards-aligned code quickly. Add specifics (files, functions, constraints) before sending.

### Quick Change (small, scoped)
- Context: `<what exists, files involved>`
- Goal: `<small change>`
- Plan: "`<3–5 steps>`. Final step: Add learning notes in section top-down view and step by step detailed changes into docs/learning/v0/`<file_name.md>`. Make the notes digestible to entry-level web developer."
- Then say: “Implement now. Show diff. Tests: `<commands>`.”

### New Feature (moderate/bigger)
- Summarize: modules/entrypoints, related data/types, env vars/feature flags, tests covering area.
- Plan: numbered steps with files/functions to touch.
- Build: small functions, clear names, no magic numbers, cohesive files.
- CRUD expectations: validate inputs, authz, not-found/duplicates handling, clear status/messages.
- Errors/logging: structured, actionable, no secrets.
- Tests: unit for core/edges, integration for key flows; list commands.
- Ask: “Return diff/code + test results; note assumptions/gaps.”

### Debugging/Fix
- Bug summary + suspected surface (modules/routes/functions); note recent changes.
- Hypotheses + minimal repro (inputs/outputs/logs).
- Instrument minimally (no secrets); add correlation if available.
- Smallest safe fix + ripple checks; add regression test.
- Request: “Provide patch/diff, tests run/results, remaining risks.”

### Must-remember standards
- Clarity: intention-revealing names; avoid magic numbers.
- Structure: small, single-responsibility functions; cohesive files.
- Contracts: predictable types/shapes; consistent responses; version APIs when needed.
- Security: validate/sanitize inputs; parameterized queries; authz on every operation; protect secrets.
- Accessibility: follow a11y lint hints; proper labels/roles/keyboard support.
- Performance/reliability: avoid wasted work in hot paths; timeouts/retries thoughtfully.
- Debuggability: purposeful logging; don’t swsallow errors.
- Lint/style: follow repo lint/format rules; brief comments only for non-obvious logic.

### Context to pull before coding
- What’s built: key modules, entrypoints, routes, data models.
- Anchors: `README.md`, `docs/dev-setup.md`, `docs/learning`, current `ca-frontend` structure.
- Constraints: feature flags, env vars, external services, TODO/FIXME/bugs.
- Tests: existing coverage and gaps.
