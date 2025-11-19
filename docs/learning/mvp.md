# Epic 1

## Goal
Have clean repos, local dev servers running, and a central spot to document what I’m learning along the way.

## Learning Q&A

**Q: What is a monorepo vs a multi-repo setup?**  
**A:** A monorepo keeps multiple apps/packages inside a single repository (shared tooling, shared history); a multi-repo keeps each app in its own repo/folder (clear separation, simpler Git history per project). I’m using multi-repo semantics here by isolating `ca-backend` and `ca-frontend`, which keeps dependencies and release cadence independent while I learn.

**Q: What does TypeScript add over plain JavaScript?**  
**A:** TypeScript layers static typing, interfaces, and tooling on top of JS so the editor can catch mistakes (e.g., missing properties, incorrect params) before runtime. It also enables modern language features (decorators, enums, etc.) and tight IDE integration like go-to-definition. Compiling TS to JS via `tsc` ensures the backend runs anywhere Node understands JavaScript.

**Q: Why use ESLint and Prettier?**  
**A:** ESLint enforces code-quality rules (unused vars, unsafe patterns) while Prettier enforces consistent formatting. Running `npm run lint` ensures both code correctness (via ESLint) and style consistency (via the Prettier plugin) so that every file follows the same conventions without manual nitpicking.

**Q: How do linting/formatting tie into “clean repos”?**  
**A:** Adding `npm run lint` to each project gives a repeatable check before commits. The combination of ESLint + Prettier keeps diffs small and predictable, which is key for reviewing code and understanding changes as the repos evolve.

**Q: Why document setup steps as I go?**  
**A:** Writing docs like `dev-setup.md` turns the one-time learning into reusable instructions, making it faster to rebuild the environment, onboard others, or spot gaps in the tooling. It satisfies the Epic 1 goal of having “a place to document learning.”
