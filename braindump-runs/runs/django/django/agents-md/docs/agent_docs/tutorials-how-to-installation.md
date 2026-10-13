# Tutorials, How-To & Installation Docs

> Procedural steps, prerequisites, defaults, platform instructions, and canonical tutorial setup.

**When to check**: When writing tutorials, how-to guides, installation instructions, or deployment steps.

## Rules

<!-- rule:2548 -->
- In how-to docs, order content as: intro → prerequisites → steps; open the first step with "First," — gives readers a predictable entry path and a clear signal that actions are starting. — How-to guides across `docs/howto/` (e.g. `custom-shell.txt`, `delete-app.txt`) and `docs/topics/` (e.g. `migrations.txt`) serve the same reader need: scan, confirm prerequisites, then follow steps. Consistent ordering lets readers skip straight to the prerequisite warning if they're not ready, and the explicit "First," prevents ambiguity about whether the preceding paragraphs are also instructions to perform.
<!-- rule:871 -->
- One action per numbered step in `docs/` procedural guides, imperative first sentence — readers execute and skip steps individually, so chaining actions or burying details mid-step causes missed steps; give terminal actions (e.g., `Submit changes`) their own final step — Splitting compound instructions makes each step independently verifiable and skippable, and keeps the imperative instruction visible before supporting detail/link prose.
<!-- rule:1853 -->
- In `docs/installation` and reference guides, include platform-specific blocks (e.g. `doscon`, Linux/macOS/Windows admonitions) only when the command genuinely differs by OS — otherwise they duplicate content and mislead users. — Keeps installation docs accurate and lean: platform notes earn their place only when behavior differs, existing ones carry information that refactors shouldn't drop, and overcomplicated commands that don't actually reproduce the intended result erode reader trust.
  - Preserve existing OS-specific blocks during refactors — deleting them silently removes steps some users depend on.
  - Prefer simple native commands over elaborate examples that don't reliably achieve the described effect.
<!-- rule:2544 -->
- In `docs/**`, lead customization instructions with a task phrase (e.g. `To customize <thing>`, "To add a CSS class to the wrapping HTML element...") instead of conversational conditionals like "if you want to..." or abstract framing like "requirement" — task phrasing tells readers what they're doing, not whether they qualify. Introduce advanced/optional examples with conditional wording (e.g. "If you still need customization...") — signals these are opt-in, not default. — This prevents `docs/**` readers from mistaking default customization steps for optional ones and advanced overrides for required ones, keeping guidance consistent with how the codebase actually expects customizations to be applied.
<!-- rule:2753 -->
- In installation and tutorial docs (`docs/howto`, `docs/ref/contrib/gis/install`), write out concrete default values for required installer options instead of saying "use the defaults" or leaving readers to infer them, and skip optional wizard settings that only matter if someone deliberately changes a default unless the tutorial needs them. — Readers copy values verbatim rather than reverse-engineering what a default is, and omitting unrelated wizard options keeps tutorials focused on the settings that actually affect the walkthrough.
<!-- rule:2940 -->
- In deployment docs, label dev-only commands like `runserver` as development servers and state they're not production-suitable — self-contained warnings stop readers from copying dev setups into production. — Prevents misapplication of dev tooling in production deployments.
<!-- rule:4858 -->
- Avoid 'Now'/'from now on' in `docs/` setup steps — instead name the scope, precondition, or sequence (`in this terminal`, `while the virtual environment is active`, `Then`); otherwise readers can't tell which shell, session, or completed step the behavior depends on and run commands in the wrong context. — Ambiguous temporal phrasing only makes sense to the author, who knows the current session state; readers following `docs/` setup instructions may have a different shell, an inactive virtual environment, or a skipped prior step, so the instructions silently fail or produce confusing errors.
<!-- rule:873 -->
- Write required steps inline as imperatives (`Ensure that ...`), not trailing notes — Readers follow a numbered procedure top-to-bottom and skip trailing notes, so manual follow-ups get missed — a real risk in `docs/topics/migrations.txt` and `docs/internals/howto-release-django.txt` release procedures.
<!-- rule:52 -->
- In docs, list env names exactly as `tox -l` prints (no version specifiers) and take Python versions from `tox.ini`/CI config; keep constraints in the config, not duplicated in samples. — Copied constraints and hand-written env names drift out of sync with `tox.ini`/CI, so contributors run commands that no longer match the project.
<!-- rule:870 -->
- Keep `docs/tutorials/` to one canonical working setup; move alternatives (e.g. `pytest-django`'s `conftest.py` vs Django's `settings.py`) to `docs/topics/` — beginners get lost when a tutorial shows competing approaches — Preserving the single-path tutorial flow in `docs/tutorials/` lets readers reach a working result without deciding between alternatives. Deferring variant setups like `conftest.py`/`settings.py` pairs to `docs/topics/` keeps advanced configuration discoverable without stalling beginners.
