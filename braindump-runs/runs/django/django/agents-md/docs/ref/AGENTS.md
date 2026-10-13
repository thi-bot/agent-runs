<!-- braindump: rules extracted from PR review patterns -->

# docs/ref/ Guidelines

## Documentation

<!-- rule:1268 -->
- Document the full input/output contract for template tags/filters in `docs/ref/templates/builtins.txt` — list every accepted type (incl. generic mapping/iterable), show argument precedence with concrete examples, use 'returned'/'output' not 'displayed', and keep each example exercised by the documented tag/filter with matching input and locale — mismatched or overclaimed examples mislead users about what actually works. — Scope: `docs/ref/templates/builtins.txt` and similar template tag/filter reference pages — not repository-wide.
<!-- rule:3286 -->
- Write actual behavior in reference docs — state whether unknown attributes are silently accepted, the real trigger condition, and expected types (e.g. class vs instance) — vague phrasing misleads users of `Meta`/`AppConfig` settings — In `docs/ref/` settings/`Meta` docs, loose wording ("ignored", "required when needed", "a class") hides real semantics — silent acceptance, exact condition, class-vs-instance — so users misconfigure and file false bugs.
<!-- rule:3816 -->
- In `docs/ref/`, state each header's exact trigger and inference source (explicit arg vs. filename) separately — bundling or duplicating across lists hides when each applies and lets the copies drift — This applies to reference docs under `docs/ref/` such as `middleware.txt`, `request-response.txt`, and the settings reference. Users rely on reference docs to know precisely when a given response header is set and what determines its value — an explicit argument, a filename, or something else. Combining headers with different inference sources into a single sentence, or describing the same header in both a specific and a generic list, obscures the exact condition under which each applies and creates two copies that can fall out of sync as the code changes. Documenting every header the code sets or modifies, with its exact trigger and source, keeps the reference accurate and unambiguous. Use a separate clause or sentence per header whenever the trigger or source differs from another header's.
<!-- rule:1409 -->
- In reference docs, write precise trigger conditions: use `On <event>, …`, name the specific backend/attribute/operation or exception, label each component's role (e.g., `views`, `middleware`), and keep conditions that fire the same view in one paragraph — vague triggers leave readers unable to predict when behavior actually fires. — Reference docs are read to answer "when does this happen?" — imprecise conditions, unnamed backends, or same-trigger conditions split across paragraphs force readers to guess at behavior or misconfigure settings.
<!-- rule:381 -->
- Document native HTML5 input widgets (e.g. date pickers) in `docs/ref/forms/widgets.txt` with: the user-facing UI name, required value format and browser-validation limits, and the matching `format` option in both subclass and `attrs` examples. — Django's `format`/`FORMAT_*` settings control the value Django submits, not what the browser renders — users otherwise misconfigure format options or expect the widget to restyle native UI.
<!-- rule:4332 -->
- Document related admin settings together (e.g., `search_fields` with `raw_id_fields`, `radio_fields`, `autocomplete_fields`) — users miss options described in isolation — When a configuration option is documented alone, readers don't discover the companion settings they'll likely need, and the admin reference becomes inconsistent across options that share the same apply-to patterns.
<!-- rule:4881 -->
- In `docs/ref/contrib/postgres/` reference docs (`fields.txt`, `constraints.txt`), document PostgreSQL's canonical behavior, not Django expression internals. — Readers come here to understand how PostgreSQL ranges and lookups behave (bracket notation, filtering semantics); describing Django's internal expressions instead leaves the actual PostgreSQL behavior undocumented and forces users to cross-reference the PostgreSQL manual anyway.
<!-- rule:4639 -->
- In `docs/ref/validators.txt`, state each heuristic validator's exact scope and standard (e.g., "only used by `EmailValidator`, not a full RFC 5322 addr-spec parser") and link the spec-compliant alternative — prevents users trusting narrow heuristics for general parsing. — In `docs/ref/validators.txt`, state each heuristic validator's exact scope and standard (e.g., "only used by `EmailValidator`, not a full RFC 5322 addr-spec parser") and link the spec-compliant alternative — prevents users trusting narrow heuristics for general parsing.
<!-- rule:4186 -->
- In API reference docs for versioned standards (e.g., the UUID function entries under `docs/ref/`), state the version explicitly (`version 7 UUID`) and link the authoritative spec (`RFC 9562`) — generic terms like `time-based` or `random` map to multiple versions, so readers can't tell which spec applies. — UUID "random" and "time-based" descriptors are ambiguous across versions (v4 is random, v7 is time-ordered), so readers of the API reference can't identify which spec governs a function's behavior. Naming the version and linking `RFC 9562` removes that ambiguity, and omitting redundant qualifiers keeps doc entries scannable.
  - Drop parenthetical qualifiers the version already implies — write `version 4 UUID`, not `version 4 (random) UUID`; the redundancy adds noise without adding meaning.
<!-- rule:3992 -->
- In template-tag reference docs (`docs/ref/templates/builtins.txt`), call them "relative paths" (never "absolute") and show both `./` and `../` prefixes — paths resolve against the current template or a loader's directories, so implying `./` is required misleads users about parent-dir access. — These conventions keep Django's template-tag reference accurate and low-maintenance: wrong path terminology, missing `../` coverage, or unstated sandbox limits cause user confusion and bug reports, and per-tag duplication makes the section drift as the loader semantics evolve.
  - State that traversal stays inside the configured templates directory — users need to know `../` can't escape the loader sandbox.
  - Centralize path-resolution prose in the `{% extends %}` section and link to it from other tags — duplicating it per-tag drifts out of sync across tags.
  - Pair relative-path examples with complete clauses naming the referenced file, and optionally a small ASCII file tree — bare paths are ambiguous about which file resolves where.
<!-- rule:1843 -->
- In configuration reference documentation, refer to configuration options and values by their exact code identifier/key in double backticks rather than by a generic description; when a value is the name/key of an item defined in another section, state that relationship explicitly; when a value accepts free-form keywords, document that any keyword can be passed as a string and make the required quoting explicit. — Configuration reference docs are read by users trying to copy exact keys and values into their config; generic prose hides the identifier they need, implicit cross-references force them to hunt for the referenced item, and undocumented free-form keyword values leave quoting syntax to guesswork — all of which turn into support questions and misconfiguration. The conventions are evidenced across `docs/ref/databases.txt`, `docs/howto/logging.txt`, and the CSP docs (`django/conf/csp.py` + its reference page).
<!-- rule:5072 -->
- In `docs/ref/` response-class docs (e.g. `docs/ref/request-response.txt`, `docs/ref/template-response.txt`), document only the class's own behavior and accepted types. — Duplicating inherited attributes, removed/deprecated class paragraphs, or unverified type-conversion claims makes the reference inaccurate — point readers to the parent class instead.
<!-- rule:1914 -->
- In `docs/ref` middleware docs, use adjective-noun request phrasing (e.g. 'unauthenticated requests', not 'requests by unauthenticated users') and third-person singular bullet verbs (e.g. 'Sets the ... header', not 'Set ...') — matches surrounding descriptive style so reference pages read uniformly — Middleware reference pages in `docs/ref` (e.g. `docs/ref/middleware.txt`) share a descriptive style; matching it — compact `adjective noun` request descriptions and third-person `Sets ...` bullets — keeps new sections visually consistent with existing ones instead of drifting into prose-style or imperative phrasing.
<!-- rule:2911 -->
- In `docs/ref/`, use `:class:`~django.http.HttpRequest`` for the class, "HTTP request" for the concept — mixed references blur what's a linkable API object vs. generic prose, and inconsistency within a doc reads as sloppy. — Reference docs promise a consistent visual/semantic distinction between Django API objects and generic HTTP terminology. If `HttpRequest` is linked in one paragraph and written as plain "HTTP request" in the next, readers can't tell whether a linkable class exists on the page. Pinning each form to its meaning keeps cross-references predictable across files like `docs/ref/databases.txt` and `docs/ref/contrib/admin/index.txt`.
<!-- rule:2597 -->
- Document lazy/conditional outputs in `docs/ref/*.txt` — name the trigger condition and the symptom when unmet — otherwise readers assume the header value is always present and waste time debugging missing headers. — Lazy middleware only sets a header (e.g. CSP in `docs/ref/csp.txt`) when a related value is accessed during the request, so readers who skip the trigger condition chase phantom bugs.
<!-- rule:4392 -->
- Document per-depth limits for admin object-count attributes — for admin attributes like `ModelAdmin.delete_confirmation_max_objects`, note the limit applies per related-model depth, not globally, and state worst-case total as `max_objects ** max_depth` — readers would otherwise assume a global cap and underestimate the true count. — Prevents readers from misreading per-depth caps as global caps; the worst-case formula makes the real bound obvious.
<!-- rule:5532 -->
- In `docs/ref/contrib/gis/install/`, put shared setup steps in `index.txt` above the 'Add `django.contrib.gis` to `INSTALLED_APPS`' section, and omit deprecated build flags or superfluous `Path` entries — link upstream docs instead. — Platform pages (`geolibs.txt`, `spatialite.txt`) each restate the same prerequisites, so centralizing them in `index.txt` keeps them in sync; duplicating deprecated flags or `Path` entries makes the GIS install guide drift from upstream and misleads readers.
<!-- rule:2601 -->
- Mention three things in security opt-out warnings (e.g. in `docs/ref/csp.txt`): the opt-out is temporary/exceptional, the feature should normally be enabled site-wide, and weakening policy for one view/path gives no isolation — browsers treat same-origin resources alike. — Opt-outs look like a safe, local override, but same-origin browser behavior means any weakened policy applies broadly; documenting all three points prevents users from treating a per-view exception as full isolation.
<!-- rule:3711 -->
- In `docs/ref/` config pages, document the failure modes of misconfiguration (e.g. exhausting database connections) and the underlying technical rationale (e.g. thread/concurrency handling), not just the required setting — symptoms let users diagnose real problems that a bare value can't. — Reference docs that only state settings leave users unable to connect a config value to the actual failure it causes; explaining symptoms plus the request-lifecycle/threading reason makes misconfiguration diagnosable from docs alone.
<!-- rule:3189 -->
- Document task identifier fields in `docs/ref/tasks.txt` as opaque strings with a max length, not as UUID4 — over-constraining the docs misleads users about what pluggable backends must support. — Freezing the documented identifier format as UUID4 falsely implies every pluggable backend must emit and accept UUIDs, so backends that use other opaque identifiers appear broken or get rejected as non-conforming.
  - State in `docs/ref/*.txt` when an identifier is backend-defined, and require each backend reference to document its own format and bounds — otherwise users assume a fixed representation.
<!-- rule:2210 -->
- In `docs/ref/contrib/gis`, describe boolean attributes precisely — use `has X` or `is or contains X`, never `is or has X`. — The `is or has X` construction leaves users unsure whether the flag reflects identity or containment, e.g. for GDAL layer capabilities; picking one construct makes the exact semantics unambiguous.
<!-- rule:3803 -->
- In `docs/ref/contrib/admin`, state which parts of an admin option still apply for a given layout instead of writing "has no effect" — e.g. `fieldsets` on a `TabularInline` still controls field ordering and labels, just not layout, so blanket claims mislead users into removing working config. — Admin options often degrade gracefully rather than being fully ignored for a layout; a blanket "has no effect" statement hides still-functional behavior and leads users to strip config that was actually doing something.
<!-- rule:6151 -->
- In `docs/ref/forms/widgets.txt`, list only format codes users would expect to work — don't enumerate codes the widget's documented capabilities already exclude (e.g. `%f`, `%z`, `%Z` for no-microsecond/no-timezone widgets), since it adds noise and implies broader format support than the widget provides. — Keeps widget docs accurate to the actual format-support contract; over-listing excluded codes misleads users about capabilities.

## File-Specific Rules

### `docs/ref/contrib/auth.txt`

<!-- rule:1437 -->
- In `docs/ref/contrib/auth.txt`, document `is_superuser` as: 'Boolean. Treats this user as having all permissions without assigning any permission to it in particular.' — Matches how `ModelBackend` actually grants superusers blanket access without per-permission rows — prevents readers from assuming superusers need explicit permissions.

### `docs/ref/contrib/gis/install/postgis.txt`

<!-- rule:6017 -->
- Use real Debian/Ubuntu package names in `docs/ref/contrib/gis/install/postgis.txt`; list `postgresql-x`, `postgresql-x-postgis-3`, `postgresql-server-dev-x`, and `python3-psycopg3` instead of generic or upstream placeholders. — Readers copy-paste these commands on Debian/Ubuntu, so placeholder or upstream-derived names produce install failures; distro package names differ from upstream ones.

### `docs/ref/contrib/gis/measure.txt`

<!-- rule:1839 -->
- Split units in `docs/ref/contrib/gis/measure.txt` into per-category tables (e.g., area, distance) and list every known alias in each unit's `Full name or alias(es)` column — a single shared table buries units under unrelated categories and silently drops the alternate names users search for. — Without per-category tables and complete alias columns, the measure reference files unrelated units under one heading and omits alternate names, so a grep-style lookup for any non-canonical unit name returns nothing and users cannot find the unit they need.

### `docs/ref/contrib/humanize.txt`

<!-- rule:2565 -->
- Doc every `humanize` filter in `docs/ref/contrib/humanize.txt` with the `apnumber` pattern — a `Converts ... Otherwise, returns ...` sentence listing all accepted input types (integers, string ints) plus what unsupported inputs return, followed by an `Examples:` list showing converted and pass-through values (negatives, non-integers) — verify each example against the implementation and skip input types the filter doesn't accept (e.g. floats for `intword`), so readers get an accurate contract

### `docs/ref/contrib/sitemaps.txt`

<!-- rule:5263 -->
- In `docs/ref/contrib/sitemaps.txt`, document the sitemap API with concrete types and object shapes — vague docs mislead users and hide supported inputs: — Precise types and shapes tell users what they can actually pass to `Sitemap.items()` and `extra_context`; wrong or vague descriptions cause silent misconfiguration (e.g. returning a list instead of a `QuerySet`, or expecting URL strings in `extra_context`). Extra parentheses in Sphinx roles render incorrectly, and impl-mismatched descriptions drift from behavior users will hit at runtime.
  - State `QuerySet` (not "sequence") as a supported `Sitemap.items()` return type.
  - Describe the `sitemaps` context var as a list of objects with `location`/`lastmod` attributes, not plain URLs.
  - Show the `'sitemaps'` `extra_context` value as a dict or `Sitemap` instance, not the `sitemap` view.
  - Use Sphinx `:meth:`/`:attr:` roles without trailing `()` — Sphinx adds parentheses automatically.
  - Keep method/attr descriptions matching the impl (e.g. `get_latest_lastmod` returns `lastmod` if not callable, else `None`).

### `docs/ref/databases.txt`

<!-- rule:3272 -->
- In `docs/ref/databases.txt`, use `utf8mb4` and `utf8mb4_*` collations (e.g. `utf8mb4_general_ci`, `utf8mb4_unicode_ci`) in MySQL examples instead of deprecated `utf8` aliases. When the surrounding prose still holds true, update the charset names in place rather than deleting the paragraph — keeps guidance intact while removing misleading, deprecated aliases. — Using `utf8` in MySQL examples is not just outdated naming — it aliases `utf8mb3`, which cannot store 4-byte characters such as emoji, so the rule prevents readers from copying schema definitions that silently reject valid data, while updating names in place avoids losing still-correct explanatory prose.
<!-- rule:6379 -->
- In `docs/ref/databases.txt`, spell out MySQL isolation-level behavior: default `REPEATABLE READ` gives repeatable reads while writes run under `READ COMMITTED`. — Stating only that older MySQL versions "don't default to `READ COMMITTED`" leaves readers guessing; naming the actual DB-level default (`REPEATABLE READ`) matches what the backend really does.
<!-- rule:329 -->
- In `docs/ref/databases.txt` SQLite `OPTIONS`/`init_command` examples, use durability-safe PRAGMAs (e.g. `PRAGMA journal_mode=WAL;`, `PRAGMA synchronous=3;`), never `PRAGMA synchronous=0;`; link "Pragma options" to https://www.sqlite.org/pragma.html — copy-pasted examples shouldn't risk corruption. — Users copy-paste these examples directly into their Django `DATABASES` settings, so unsafe PRAGMAs like `synchronous=0` can silently corrupt real databases; keeping the example durability-safe and the PRAGMA reference link accurate keeps the docs trustworthy.
<!-- rule:4861 -->
- In `docs/ref/databases.txt` (Oracle), document each connection-string option by naming its receiving field (e.g. `NAME`), the conditions that make it valid (`HOST`/`PORT` empty), and every supported format (full DSN and Easy Connect) — partial docs send users to the wrong field or format, producing misconfigured connections. — Connection-string options like Oracle's DSN/Easy Connect are ambiguous unless the reader knows which setting field consumes the string, when that field applies, and which formats are accepted. Documenting only one format or omitting the validity conditions causes users to pass an Easy Connect string to a field expecting a full DSN (or set `HOST`/`PORT` alongside it), which silently misconfigures the connection.

### `docs/ref/django-admin.txt`

<!-- rule:32 -->
- `docs/ref/django-admin.txt`: name each option's exact effect, and write 'ignored by <command>' for accepted no-ops — vague labels like 'header comments' or 'not supported' mislead users about what a flag actually does — Vague terms hide what a flag suppresses, and 'not supported' wrongly implies an error instead of silent no-op behavior.
<!-- rule:3481 -->
- Describe exclusion options as *preventing* apps/models from being loaded/processed, and show `app_label.ModelName` syntax — "excluded" is ambiguous about what is actually skipped, and users need the exact argument form to use the option correctly. — Clarifies semantics and gives users the exact argument form they need to invoke the option.
<!-- rule:5864 -->
- In `docs/ref/django-admin.txt`, document `--parallel` and `DJANGO_TEST_PROCESSES` together, presenting `DJANGO_TEST_PROCESSES` as independently enabling parallel test execution — prevents docs implying the env var only complements the flag rather than standing alone. — Users reading either entry need to know both mechanisms for enabling/adjusting parallel test processes; documenting them separately would obscure that `DJANGO_TEST_PROCESSES` works without `--parallel`.

### `docs/ref/forms/widgets.txt`

<!-- rule:2864 -->
- In `docs/ref/forms/widgets.txt` under `TelInput`, cite `django-phonenumber-field` as a 'such as' example for server-side phone validation — `TelInput` is client-side only, so users need a pointer for validation, and 'such as' avoids implying Django endorses it. — `TelInput` only provides client-side input hints, so readers looking for actual phone-number validation need to be pointed at a third-party package for the server side. Framing the reference as a 'such as' example keeps the docs from reading as an official Django endorsement of `django-phonenumber-field`.

### `docs/ref/request-response.txt`

<!-- rule:2914 -->
- In `docs/ref/request-response.txt`, match each `HttpRequest` content-negotiation method's description to its return contract: `accepts()` is a `True`/`False` predicate, while `get_preferred_type()` returns a value from the supplied list or `None` — mismatched wording makes users write code against the wrong return type. — The docs file `docs/ref/request-response.txt` is the reference users consult before calling these APIs; describing a predicate as if it returned a value (or vice versa) leads to broken `if`/`is None` checks in user code.

### `docs/ref/settings.txt`

<!-- rule:6167 -->
- In `STORAGES` docs (`docs/ref/settings.txt`), don't imply uploads need a `"default"` key — custom storages can handle them without one. — Readers may add a redundant or incorrect `"default"` entry; the `STORAGES` setting allows uploads via any configured alias.
<!-- rule:3472 -->
- Use Python `ssl` terminology for TLS certificate settings in `docs/ref/settings.txt`, naming the certificate type (e.g. SMTP client authentication) and listing required companion settings — Users cross-reference the Python `ssl` docs and expect client vs. server certs to be distinguished. Require a separate `*_SSL_KEYFILE` rather than documenting an embedded key in `*_SSL_CERTFILE` — the Python `ssl` API takes them separately, and embedded keys leak into shared cert-chain files. For unsupported cases (server CA / self-signed trust), point users to `SSL_CERT_DIR`/`SSL_CERT_FILE` instead of the client-only `*_SSL_CERTFILE`/`*_SSL_KEYFILE` settings, which silently won't do what they expect. Omit third-party library internals unless they're needed to configure the setting.

### `docs/ref/templates/builtins.txt`

<!-- rule:1662 -->
- In `docs/ref/templates/builtins.txt`, write routine operator/semantic notes as plain paragraphs placed after the `if` tag discussion and before the operator list, not as admonition boxes — reserving boxes for real warnings keeps the reference scannable. — Admonition boxes lose their signal when used for routine notes, and cross-operator behavior scattered across individual operator entries is hard to find; centralizing it in 'Complex expressions' makes multi-operator caveats discoverable.
  - Put cross-operator behavior notes (e.g. comparisons can't be chained) in the 'Complex expressions' section of `docs/ref/templates/builtins.txt`, not under individual operator entries — readers find multi-operator caveats in one predictable place.
<!-- rule:2874 -->
- In `docs/ref/templates/builtins.txt` `urlize`/`urlizetrunc` examples, use unconverting TLDs (`.eu`, `.de`, e.g. `djangocon.eu`) for URLs meant to show *no* link — bare `.com` domains get auto-linked and would contradict the example — `urlize` auto-converts bare `.com` domains, so using one in a "not converted" example would produce output that contradicts the documented behavior.

<!-- /braindump -->