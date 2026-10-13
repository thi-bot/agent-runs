# Documentation and User-Facing Copy

> Rules for writing and updating documentation, docstrings, user-facing text, translation strings, and contributor-facing content.

**When to check**: When writing or updating documentation, docstrings, help text, or user-facing copy.

## Rules

<!-- rule:323 -->
- Repoint stale template links instead of deleting — preserves navigation and `{% translate %}` string coverage — Update the `href` to the new canonical destination and refresh the visible label to current terminology, keeping it wrapped in `{% translate %}`. Deleting a stale link silently drops a navigation path and orphans its translation string; repointing keeps users on the intended destination.
<!-- rule:384 -->
- Confirm copyright holder and license with the rights holder or legal before adding or editing headers on third-party or in-kind contributions — wrong attribution creates legal exposure. — Third-party and in-kind contributions often carry licenses that dictate exactly what the header must say. Getting it wrong risks misattribution, license incompatibility, or imposing restrictions (like `All rights reserved`) that contradict the contribution's actual terms.
  - Don't add `All rights reserved` unless legal counsel confirms it's required — it can conflict with open-source license terms.
<!-- rule:147 -->
- Update docstrings when return contracts change; name the wrapped upstream function — stale docs mislead callers about return values and behavior. — Docstrings are the only inline spec callers see, so a return-type or field change left undocumented silently breaks dependents expecting the old shape; naming the upstream function in a wrapper makes the custom behavior (and divergences from the library) unambiguous.
<!-- rule:27 -->
- Use absolute imports in doc and tutorial samples (`from polls import models`, `from bands.models import Band, Member`) instead of relative imports like `from . import models` — readers paste snippets into their own files, where relative imports resolve against the wrong package and break. Reference imported symbols directly rather than module-qualified names where practical, since it matches how real code reads. — Copy-pasted example code lives outside the source package, so `from .` fails immediately; absolute imports work anywhere and match the names readers see in their own projects.
<!-- rule:394 -->
- Report `QuerySet.delete()`'s return value as total "objects deleted," not primary-model instances — it counts all cascaded deletions; for a primary-model figure, capture `qs.count()` before deleting or read the deletion summary dict — `QuerySet.delete()` returns the sum of deletions across every cascaded model, so labeling it as the primary-model count overstates what the user's own filter matched and misleads anyone auditing the command's output or logs. Rewording to "objects deleted," or pulling a separate `qs.count()` before deletion, keeps the reported number accurate wherever `delete()` is called.
<!-- rule:414 -->
- Use `whom` (not `who`) for objective-case pronouns in user-facing copy; update translatable strings when flagged — Grammar errors in templates propagate to every locale through translatable strings, and leaving source text stale after a review flag desyncs translations from the corrected copy.
<!-- rule:348 -->
- Anchor duration, count, and date-offset docs to their reference point — write `28 months beyond mainstream`, not a bare `total` — an unstated base makes the number unverifiable — Readers can't check an offset without knowing what it's measured from; matching the comment's wording to the calculation also keeps the two in sync when the base changes.
<!-- rule:33 -->
- Keep detailed checklist content in `checklists/README.md`, link it from the root `README.rst`, and register `checklist/*` in the releasers section of `.github/CODEOWNERS` — so `@django/releasers` are auto-notified of checklist changes and the docs stay discoverable from the project root. — Prevents checklist edits from silently skipping releaser review and keeps the detailed list reachable from `README.rst`.
<!-- rule:427 -->
- Mark new config lines in setup docs — readers may overwrite existing `/etc/hosts` or similar files if examples look like full file contents — Setup docs showing system config files like `/etc/hosts` must clarify which lines are new additions versus pre-existing defaults, and list added entries on separate lines. Readers who copy an example as the complete file contents can clobber their existing configuration or create duplicate/conflicting entries — stating "add this line" and separating new lines from defaults prevents that.
<!-- rule:267 -->
- Audit every block when copying a page template — keep required content (e.g. feedback invitations), drop unneeded boilerplate (shared sidebar, legal, license). — Copying a template like `templates/accessibility/index.html` or `templates/diversity/base.html` silently carries both directions of error: short but required sections get skipped, and sidebar/legal/license blocks leak into pages that don't need them. Per-block review makes each derived statement, policy, or code-of-conduct page carry exactly what it should.
<!-- rule:268 -->
- Link doc and user-facing template CTAs to the actionable edit URL (e.g., GitHub `edit file` link) and phrase feedback asks as "would benefit from your feedback" rather than "can use your feedback" — frictionless, reader-centered asks actually get contributions. — Vague "submit a pull request" language and project-centric phrasing add friction; linking directly to the edit target and framing the ask around the reader's value converts more contributors for `.github/SECURITY.md`-style docs and templates like `djangoproject/templates/aggregator/ecosystem.html`.
