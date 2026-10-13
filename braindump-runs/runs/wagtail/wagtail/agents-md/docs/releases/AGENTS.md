<!-- braindump: rules extracted from PR review patterns -->

# docs/releases/ Guidelines

## Documentation

<!-- rule:388 -->
- Verify old/new mappings and column alignment in release/migration tables against the implementing PR. — Misdirected values (shifted `Old`/`New` columns, placeholder fields like `foo`) send users down broken migration paths; checking against the source PR keeps `docs/releases/*.md` directly usable.
<!-- rule:141 -->
- In `docs/releases/*` upgrade notes, name the exact `data-*`/Stimulus attribute, state its value encoding (e.g. options as stringified JSON), and show a concrete example with real option values — format-only prose forces users to guess how to migrate — This suggests a concise bullet guideline for docs/releases/AGENTS.md that preserves the project-specific references (data-* attributes, Stimulus, docs/releases/*) and explains why vague migration notes cause user confusion.
<!-- rule:1347 -->
- Put `Formalize support for Django X.Y` in its own section, not `### Other features` — keeps Django version history scannable across releases — Two bullets capture the placement and wording conventions separately, each with the why. Preserving the exact phrase `Formalize support for Django X.Y` and the `### Other features` heading keeps the rule machine-matchable for an AI assistant editing release notes.
  - Omit contributor attribution on these entries — they're version bookkeeping, not credited work
<!-- rule:131 -->
- Use real headings (`#### Before` / `#### After`) for before/after snippets in `docs/releases/*.md`, and keep both snippets' line breaks and attribute wrapping identical — bold pseudo-headings (`**Before:**`) break anchor links and screen readers, and asymmetric formatting makes diffs harder to scan. — Real headings make comparison blocks navigable and accessible; matching formatting across the pair lets readers spot the actual change instead of formatting noise.
<!-- rule:1078 -->
- In `docs/releases/release_process.md`, list always-applied backport criteria before maintainer-discretion ones; use `may` for discretionary policies and `will`/`must` for mandatory ones — an explicit modal boundary prevents contributors from treating optional steps as required (or vice versa). — Release-process docs mix hard requirements with maintainer judgment calls, so separating the two up front (always-applied first, then discretionary) and pairing each with the right modal makes the boundary unmistakable — contributors skip the wrong steps when the two are blurred together.

## File-Specific Rules

### `docs/releases/release_process.md`

<!-- rule:2258 -->
- When editing the LTS vs non-LTS policy in `docs/releases/release_process.md`, update its enumerated fix categories (critical bug, security, data loss, accessibility, UI) in the same change — stale lists contradict the new policy and mislead maintainers. — The enumerated fix categories are the operational expression of the LTS/non-LTS policy; if they drift from the policy text, contributors will backport or skip fixes incorrectly. Keeping them in sync in a single edit prevents contradictory guidance in the same document.
<!-- rule:2270 -->
- Identify maintenance-patch branches by support status (e.g. `release branches under "active support"`) and name `main` explicitly — recency labels like `last feature release branch` and bare `apply patches` leave readers guessing which branches actually get patches. — Unqualified wording and recency-based labels make it ambiguous whether `main` is patchable, causing contributors to target the wrong branch.

<!-- /braindump -->