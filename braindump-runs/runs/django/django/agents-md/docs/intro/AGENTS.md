<!-- braindump: rules extracted from PR review patterns -->

# docs/intro/ Guidelines

## Documentation

<!-- rule:2648 -->
- Keep sentences explaining `$` in tutorial shells; call it a *convention* for typed commands, not 'special' — readers need to tell input from output. — In tutorials like `docs/intro/tutorial01.txt`, `$` marks a line the reader types, not program output; wording like 'special' implies magic syntax and obscures that distinction, so describe it as a convention and keep the sentence that explains it.
<!-- rule:2649 -->
- In `docs/intro/` tutorials (e.g., `tutorial01.txt`, `reusable-apps.txt`), use the minimal command form matching the project name the tutorial uses — prefer `django-admin startproject <projectname>` over passing a name plus a destination directory. — Minimal commands keep the project name consistent with every later step that references it; incidental tool-behavior asides are hard to verify and rot as tools change.
  - Document only the setup steps the tutorial actually performs; drop unverified or incidental notes about tool behavior — readers follow exact commands, and extra args or side explanations either mismatch later `cd`/`manage.py` steps or go stale.
<!-- rule:2645 -->
- In project-structure bullets in `docs/intro/tutorial*.txt`, use `:file:`path/`` plus an appositive defining clause ("A child directory that is the actual Python package"), not prepositional phrasing ("with the actual Python package") — appositives define what the entry *is*, keeping the scaffold list scannable and consistent across tutorials. For the outer project root, state that its name is arbitrary and can be renamed — otherwise readers assume the directory name is load-bearing. — Appositive clauses read as definitions, so each bullet in the project-structure list parses the same way; prepositional phrasing makes entries read as descriptions of adjacent items and breaks that parallelism. Calling out that the project root name is arbitrary stops readers from treating `mysite/` as a fixed identifier that must match later commands.
<!-- rule:6079 -->
- Name only the tutorial's primary package in third-party docs; refer to broader sources or maintainers (e.g., `Jazzband`) otherwise — avoids implying project endorsement or favoritism toward specific packages — Naming other packages as examples reads as an official recommendation, which Django shouldn't give. Pointing to umbrella organizations like `Jazzband` keeps the guidance neutral and applies to similar third-party package tutorial documentation in `docs/intro/` (e.g., `docs/intro/tutorial08.txt`).

## File-Specific Rules

### `docs/intro/reusable-apps.txt`

<!-- rule:5318 -->
- In `docs/intro/reusable-apps.txt`, show packaging via declarative `setup.cfg` plus a minimal `setup.py` shim — `setup.cfg` is easier to read and validate for static metadata; the `setup.py` shim preserves compatibility with pip/setuptools versions that don't read `setup.cfg` alone. — Declarative metadata in `setup.cfg` is clearer to read than imperative `setup.py` code; keeping a minimal `setup.py` alongside preserves compatibility with older pip/setuptools.
<!-- rule:1761 -->
- In `docs/intro/reusable-apps.txt`, tie `MANIFEST.in` guidance to the example's build backend — The tutorial's packaging steps are copied verbatim by readers, so a `MANIFEST.in` step that doesn't match the example backend either breaks their build or adds dead config. Listing auto-included files as manual entries implies they'd be missing otherwise, teaching an inaccurate mental model of what `MANIFEST.in` actually controls.
  - Keep the `MANIFEST.in` step for `setuptools` examples — it's still required there
  - Skip `MANIFEST.in` for `pyproject.toml`-based examples — modern backends ship templates/static without it, and a mandatory extra step misleads readers
  - When `MANIFEST.in` is shown, list only manually-included paths (`static/`, `templates/`); leave out `LICENSE`, `README`, `docs/` since backends pick those up automatically

<!-- /braindump -->