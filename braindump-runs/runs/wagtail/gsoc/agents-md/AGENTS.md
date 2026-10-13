<!-- braindump: rules extracted from PR review patterns -->

# Coding Guidelines

## Documentation

<!-- rule:0 -->
- Spellcheck and fix typos/grammar in READMEs (including `2023/{name}/README.md`) before opening a PR — participants and reviewers read these as the project's public docs. — READMEs under `2023/{name}/` are the main entry points for participants, so typos and grammar errors there are highly visible and undermine the repo's credibility; proofing before submitting a PR avoids follow-up cleanup commits and reviewer nitpicks.
<!-- rule:6 -->
- In GSoC participant docs (`{year}/participants/*.md`, `{year}/{username}/README.md`): use `[label](url)` links, not bare URLs — readers can't tell from a raw URL whether it points to the PR, issue, or blog post a checklist item claims. — Participant READMEs are the primary record of completed GSoC work, and graded/reviewed checklists are only verifiable when each item links to the artifact it references (PR, issue, discussion, blog post, repo, demo). Bare URLs obscure what they point to and render inconsistently across GitHub, mail archives, and static site generators, so descriptive labels keep the docs readable and auditable across every year's directory layout.
<!-- rule:8 -->
- Keep links and badges in docs accurate, current, and accessible — use stable doc URLs over version-pinned ones, avoid hotlinking third-party assets, and give images/badges descriptive alt text naming the destination or platform. Audit URLs, image names, and alt text when reusing markup from elsewhere. — Prevents broken or stale references that erode trust and break downstream CI/link checkers; hotlinked assets can vanish or change without warning.
<!-- rule:1 -->
- Before checking off a task in `README`/participant checklist files, confirm each linked deliverable meets every stated criterion (content match, recency, measurable requirements) and replace outdated or tangential links — a checked box implies verification, so a stale link silently passes review and misleads participants. — Checked items in `README`/participant checklists are treated as verified; linking an artifact that only tangentially matches, is stale, or misses a measurable criterion means the task appears complete while the actual requirement goes unmet.
<!-- rule:3 -->
- Link only public repos with detailed `README.md`s from Research/portfolio sections — reviewers can't assess private or bare links — Private repos and links without context are opaque to reviewers, defeating the purpose of showcasing work in a README.
<!-- rule:7 -->
- Follow the task template exactly in `{year}/participants/{name}.md` — don't add custom roadmap, milestone, or self-defined checklist sections without approval, and include a Markdown table wherever the template calls for one — Mentors review checklists across many years and participants; keeping the template structure uniform (including tables) makes progress and tasks comparable instead of custom formats.
<!-- rule:2 -->
- When docs list learning resources, add authoritative external course links (e.g. official course pages) — unlinked or unofficial recommendations go stale and mislead readers (see `2023/chinonso-ani/Green-Wagtail.md`) — 
<!-- rule:4 -->
- Keep RFCs scoped to the proposal's stated subject; include only background that directly informs the proposed design. — RFCs live in year-scoped directories (e.g., `2023/chinonso-ani/RFC72.md`), so this applies globally rather than per-directory. Tight scope keeps reviews focused on the proposed design and prevents padding from displacing the actual argument.
  - Discuss adjacent mechanisms (e.g., scheduling/cron) only to explain their effect on the core feature — unrelated context (e.g., WordPress background in `2023/chinonso-ani/RFC72.md`) buries the design rationale.
  - Write original project-specific prose, not generic AI boilerplate or padding — RFCs must justify a concrete design decision, and filler obscures it.
  - Rewrite or drop sections that don't support the subject — a focused RFC is reviewable; a sprawling one isn't.

<!-- /braindump -->