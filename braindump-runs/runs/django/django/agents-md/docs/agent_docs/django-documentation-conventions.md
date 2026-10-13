# Django-Specific Documentation Conventions

> Django topic/reference documentation rules covering models, forms, fixtures, permissions, admin, settings, storage, and signals.

**When to check**: When documenting Django-specific features (models, forms, admin, settings, fixtures, static files, storage, signals)

## Rules

<!-- rule:1299 -->
- Document both `loaddata` fixture resolution (relative paths → each app's `fixtures/`) and ordering (all apps in app-definition order per label) in `docs/topics/db/fixtures.txt` and `docs/howto/initial-data.txt` — these non-obvious semantics are commonly omitted and leave users guessing at fixture namespacing and load order. — Documenting this prevents users from misplacing fixtures relative to the app namespace and from assuming an incorrect load order, both of which would otherwise cause silent fixture-not-found errors or order-dependent data overrides during `loaddata`/test setup.
<!-- rule:4361 -->
- Document Django admin login as requiring `is_staff=True` only, never `is_superuser`, and keep admin-only view references (e.g. `admin:logout`) out of non-admin docs sections unless that section explicitly covers admin integration — `is_superuser` grants permissions but isn't required for admin access, and leaking `admin:` namespaced views into e.g. `docs/topics/auth/default.txt` misleads readers integrating auth without the admin site. — The admin site checks `is_staff` for entry, not `is_superuser`; documenting the latter as a requirement misleads users setting up accounts. Scoping `admin:` view references to admin-focused files like `docs/ref/contrib/admin/index.txt` prevents auth tutorials from pulling in URLs that don't exist for non-admin projects.
<!-- rule:3274 -->
- In `docs/topics/forms/formsets.txt` and similar collection-like topic docs, show actual syntax and return values (e.g., ``formset[0]`` returns a form) — concrete behavior beats vague prose for users copying code — 
  - Advise overriding public extension points (e.g., ``forms`` via ``@cached_property`` and ``super().forms``) rather than internals like ``__iter__()`` — internal overrides break on refactor
  - Phrase descriptions so they don't imply the class itself provides iteration (e.g., "Instantiating the formset gives..." not "The formset is iterable") — implied API surface misleads users
<!-- rule:5728 -->
- `docs/AGENTS.md` bullet: "Alphabetize database backends in reference docs; list built-in cache backends in `docs/ref/settings.txt` with the preferred one first — predictable ordering keeps §reference lists scannable and surfaces the recommended backend" — Preserves both concrete conventions (alphabetical ordering for database backends like in `docs/howto/legacy-databases.txt`; preference ordering in `docs/ref/settings.txt`), retains the project-specific file paths, and explains the reader benefit instead of citing rules.
<!-- rule:5370 -->
- In `docs/howto/static-files/` and related staticfiles docs, reference current APIs: `staticfiles` alias of `:setting:`STORAGES`` (not deprecated `:setting:`STATICFILES_STORAGE``), `django.views.static.serve` (not `django.contrib.staticfiles.views.serve`) for manual serving, `StaticFilesStorage` where manifest behavior is irrelevant, and "static files" as two words in prose — deprecated or app-named references mislead readers upgrading and break copy-paste. — Static-files documentation spans `docs/howto/static-files/` and `docs/ref/contrib/staticfiles.txt`; stale references to `:setting:`STATICFILES_STORAGE``, `ManifestStaticFilesStorage` defaults, or the wrong `serve` import give readers deprecated guidance that fails on modern Django.
<!-- rule:3374 -->
- Order default permissions as `view`, `add`, `change`, `delete` in Django permission docs and examples — matches Django's canonical ordering and keeps permission lists scannable alongside the source code. — Inconsistent ordering across docs and code (`view`, `add`, `change`, `delete`) makes permission lists harder to diff and reason about; the canonical order mirrors how Django itself enumerates default permissions.
<!-- rule:5621 -->
- Format Django install identifiers as two bullets: `* PyPI: django-app-name`, then `* INSTALLED_APPS: 'app_name'` — PyPI needs the hyphenated distribution name while `INSTALLED_APPS` needs the quoted snake_case module path, so users don't copy the wrong form — The two forms are not interchangeable: installing uses the PyPI distribution name (`django-app-name`), but importing requires the snake_case module path quoted in `INSTALLED_APPS` (`'app_name'`).
<!-- rule:5196 -->
- Word per-instance hooks (`pre_init`/`post_init`) as firing 'for each instance returned during queryset iteration', not per iteration — wording like 'every queryset iteration' understates the N+1 query cost readers need to plan for. — Ambiguous frequency phrasing in `docs/ref/signals.txt` makes per-instance hooks look cheap, hiding the N+1 query impact that callers must account for.
<!-- rule:667 -->
- Describe `ForeignKey` from the declaring model: it's many-to-one (source → target) — Readers of the Django model-relationship docs see the field on the declaring model, so many-to-one matches what they're looking at; "one-to-many" describes only the reverse accessor back to the declaring model, and mixing the two makes the supported-relationship list ambiguous. Reserve "one-to-many" for that reverse direction, and include the relationship type when listing supported model relationships.
<!-- rule:4624 -->
- Document `vary_on` variation as `request attributes`, not `headers` — `vary_on` varies on any attribute of the request (user, session, method), so `headers` misleads readers into unsupported mental models. — Placed in the `docs/` AGENTS.md so any assistant editing fragment-caching docs or release notes picks it up. The terminology rule and the collision warning prevent readers from misusing `vary_on` and from shipping cache keys that collide across variables — a bug class that is invisible until users see each other's fragments.
  - When writing `vary_on` docs or `docs/releases/*.txt` notes, warn that `vary_on` values are string-coerced, so different variables can collide on the same key; show a namespaced discriminator example (e.g. prefixing with the source name) — silent collisions make the cache serve the wrong fragment.
<!-- rule:6438 -->
- In `modify_settings()` docs like `docs/topics/testing/tools.txt`, don't mix `remove` with `append`/`prepend` — order-dependent dicts mislead readers; if mixing, show why ordering is safe — 
  - Keep the `modify_settings()` note that `remove`/`append`/`prepend` order matters — it flags hard-to-debug test failures; update it for supported Pythons rather than deleting
