<!-- braindump: rules extracted from PR review patterns -->

# Coding Guidelines

Also see directory-specific guidelines:

- [wagtailio/static/sass/AGENTS.md](wagtailio/static/sass/AGENTS.md)

## Code Style

<!-- rule:57 -->
- Render icons via the shared `patterns/components/icon/icon.html` component with the `icon` name (plus optional `classes`/`variant`) instead of inline `<svg>` markup — keeps sizing, colour and accessibility behaviour consistent across templates, and means a single change updates every usage. — These three points are one behaviour: icon rendering flows through the shared component and the shared sprite. Inlining `<svg>` bypasses the component's sizing/variant logic, so icons drift visually and stop tracking project-wide styling changes. Duplicate `<symbol>`s in `svg_sprites.html` create ambiguous lookups where the component may pick a stale or wrong shape. Together the rules keep a single source of truth for icons, which matters because icon markup is copy-pasted across many templates in `wagtailio`, `patterns/`, and the general project templates.
  - Before adding an icon, reuse an existing `<symbol>` from `patterns/includes/svg_sprites.html`; only add a new `<symbol>` when the icon is genuinely new or visually distinct — duplicate symbols bloat the sprite and silently diverge.
  - Keep exactly one canonical `<symbol>` per icon in `patterns/includes/svg_sprites.html`, remove duplicates, and make sure the `variant` values stay compatible with what `icon.html` renders — otherwise the component resolves to the wrong symbol or none at all.
<!-- rule:100 -->
- Delete dead code in the same change that orphans it — apply fixes to all similar occurrences, remove obsolete files, stale comments, and no-op code. When a change removes the last reference to a Wagtail `template`/partial/static asset (e.g. via a page/model `template` attribute change or layout migration), or a `StreamField`/`StreamBlock` child block becomes unused, delete the file and block definition then. Never mark dead blocks with placeholder `group="DO NOT USE"` or `# to be removed` comments. — Dead templates, unused blocks, and placeholder groups accumulate silently and mislead future readers into thinking the code is still wired up; deleting them in the same change keeps the Wagtail template/block inventories honest and prevents orphaned assets from lingering indefinitely.
<!-- rule:121 -->
- Use the `inset` shorthand instead of separate `top`/`right`/`bottom`/`left` in Sass/CSS positioning — Applied consistently across `wagtailio/static/sass` (e.g. `components/`, `layout/`), `inset` keeps offset edits atomic — changing one value can't leave a stale `top`/`left` pair behind.
<!-- rule:94 -->
- Merge selectors with identical declaration blocks; drop redundant declarations — duplicated CSS bloats bundle size and drifts out of sync. — A property already set by an ancestor selector, an earlier rule in the same file, the base selector state (e.g. inside `:hover`), or the same selector outside an `@include media-query(...)` block never needs restating — repeat copies silently diverge when one is edited, so the stale value wins the cascade.
<!-- rule:86 -->
- Reuse shared components (`patterns/components/author/author.html`, `icon.html`, `hero.html`, `streamfields/cta/cta.html`) instead of inlining or forking — drifted copies miss shared fixes — Prevents markup duplication and the divergence it causes: forked templates skip upstream fixes and inlined markup can't be updated centrally. The StreamField conventions keep `blocks.py` `Meta.template` references in sync with on-disk templates so nested blocks render correctly.
  - Extend a component with a `variant`/parameter or add a sibling component for new cases — keeps every call site consistent and upgradeable
  - Under `patterns/components/streamfields/`, give each block its own `{block_name}/` dir with `{block_name}.html` + matching `.yaml` — no duplicate `*_block.html`/`cta_block.html` wrappers
  - Keep every Wagtail `Meta.template` (including nested child blocks) pointing at the current path — stale paths silently break block rendering
<!-- rule:71 -->
- Place code in the module matching its scope: feature-specific code (models, page types, blocks, templates) goes in the dedicated feature app, not `core`/`navigation`; cross-cutting shared definitions (enums, choices, shared types) go in `core`; narrow utilities stay in the utility module — prevents feature-specific code leaking into shared modules, which couples unrelated apps and bloats `core` — Shared modules like `core`, `navigation`, and any catch-all `utils/` packages should hold only truly cross-cutting code; putting feature code there creates hidden dependencies between apps and makes the shared layer change for unrelated reasons.
<!-- rule:101 -->
- Collapse redundant shorthand values to their shortest valid form (`padding: 15px 0 0`, not `15px 0 0 0`), drop units on zero (`0`), and use single spaces between values. Shorter shorthands stay readable and match the existing `wagtailio/static/sass` and `wagtailio/static/css` style, so diffs stay focused on real changes rather than formatting noise. — CSS/SCSS shorthand accepts trailing redundant values, unitless zeros, and arbitrary whitespace, but the repo's stylesheets are written in the shortest valid form. Following that convention keeps diffs meaningful and avoids churn from cosmetic rewrites across `wagtailio/static/sass` and `wagtailio/static/css`.
<!-- rule:41 -->
- Fetch once and test the value — use `if obj := Model.objects.first():` instead of `.exists()` followed by `.first()` — An existence check plus a separate fetch doubles the DB round-trip, and the object can be deleted between the two calls, so `.first()`/indexing on a row that was just confirmed raises `DoesNotExist`/`IndexError`; binding with the walrus operator keeps the single fetched object in scope inside the block.
<!-- rule:107 -->
- In SCSS/CSS, use `selector {`, no space before `;`, no blank lines inside blocks, one trailing newline — but blank-line separate nested at-rules like `@include media-query(...)` from preceding declarations. Indent closing braces and nested rules to their opening level. Consistent whitespace keeps diffs minimal and nesting depth scannable. — The blank-line-around-media-query rule is the non-obvious part: it visually groups responsive overrides apart from base declarations, so readers can tell at a glance which styles apply unconditionally.
<!-- rule:67 -->
- Format HTML tags with one space between attributes and no space before `>` — keeps templates diff-clean and consistent with the surrounding markup style — Inconsistent spacing in HTML tags (e.g., `<tag attr1 attr2 >` or missing space between attributes) creates noisy diffs and diverges from the formatting used across the templates tree. Enforcing `<tag attr1 attr2>` keeps any HTML template in the repo visually uniform and avoids reformatting churn when editing existing files.
<!-- rule:177 -->
- Format Django/Wagtail template delimiters with single inner spaces: `{{ variable }}` and `{% tag %}` — consistent whitespace keeps templates diffable and readable across `wagtailio/services`, `wagtailio/core`, and `wagtailio/project_styleguide`. — Prevents noisy diffs and merge churn from whitespace-only changes; a single convention across the repo makes template review predictable.
<!-- rule:36 -->
- Ensure every file (including HTML templates and other text files) ends with a single trailing newline. — POSIX trailing-newline compliance avoids Git 'No newline at end of file' warnings and diff noise.
<!-- rule:91 -->
- Keep layout/alignment (`margin: 0 auto`) out of shared classes in `wagtailio/static/sass/components/`; override in the consuming context instead — keeps components reusable across the pattern library and pages — When a shared component hardcodes its own positioning, every other consumer inherits that layout and must fight it. Put pattern-library-only display overrides in an inline `<style>` in the matching template, and instance-specific overrides in modifiers.
<!-- rule:90 -->
- Apply the shared `grid` class from `static/sass/components/_grid.scss` to any component/pattern container that should align to the page layout grid — including StreamField/component blocks rendered inside page templates — instead of relying on component-specific classes or full-width fallbacks; note this in the front-end developer docs. — The rule spans Sass (`static/sass/components/_grid.scss`), reusable pattern/component templates (`patterns/components/...`, including StreamFields), and front-end docs — a cross-cutting layout convention, not a single-file rule.
  Why: reusable components in `patterns/components/` (e.g. the quotes component) drift off the page grid when they carry only local classes or span full width, so aligning via the shared `grid` class keeps them consistent with the surrounding layout and documents the expectation for future components.
<!-- rule:112 -->
- Update CSS selectors and modifier classes (e.g. `.space-heading--2026`) when swapping a component's root element (e.g. `<div>` → `<h1>`) for semantic/accessibility reasons — new tags carry browser-default margins that silently break intended layout unless reset. — Semantic HTML swaps often change computed default styles. If you change a template's root element in `wagtailio/roadmap`, `wagtailio/services`, or `project_styleguide` templates but leave the CSS selectors targeting the old tag, styles won't apply. Modifier classes like `.space-heading--2026` need explicit margin resets to preserve spacing.
<!-- rule:52 -->
- Reference compiled JS/CSS bundles with `{% manifest 'path' %}` (not `{% static %}`), and add `manifest` to the template's `{% load %}`. — `{% static %}` points at unhashed source paths that don't exist after the frontend build; `{% manifest %}` resolves the hashed filenames recorded in the build manifest, so assets actually load. Omitting `manifest` from `{% load %}` raises a `TemplateSyntaxError` at render time.
<!-- rule:115 -->
- Set `pointer-events: none` on decorative icons/overlays inside interactive controls (e.g., modal close buttons) so events reach the parent control; skip it on elements hidden via `display: none`, where it's redundant. — Nested decorative elements without `pointer-events: none` can swallow clicks and break the parent button/control; adding it to `display: none` elements adds noise with no behavioral effect.
<!-- rule:48 -->
- Omit `type` attributes that HTML5 already implies in templates — skip `type="text/css"` on `<link rel="stylesheet">` and `type="text/javascript"` on `<script>`. These are the spec defaults, so writing them adds noise to `base.html`-style templates without changing browser behavior. — HTML5 defaults `<style>`/`<link>` to CSS and `<script>` to JavaScript, so the explicit `type` is redundant markup that bloats templates like `wagtailio/templates/base.html` and `wagtailio/project_styleguide/templates/base.html` while conveying no extra meaning.
<!-- rule:168 -->
- Match the existing file's indentation for new/changed lines; if `.editorconfig` conflicts, update `.editorconfig` to match the codebase — reformatting whole files creates noisy diffs that obscure real changes and break blame history. — Reformatting existing files to satisfy `.editorconfig` produces massive noise diffs, hides the actual logic changes, and destroys useful `git blame` history. Updating `.editorconfig` instead aligns tooling with reality and prevents the conflict from recurring.
<!-- rule:123 -->
- Extend the most specific parent template (e.g. `base_space_page.html`, not a bare base) and override only the blocks that differ — duplicating shared blocks makes pages silently diverge when the parent changes; if you intentionally duplicate a template's behavior, comment why. — Page templates in `wagtailio/project_styleguide/templates/patterns/` (e.g. `pages/showcase_page/showcase_page.html`) inherit from shared structures like `base_space_page.html`; re-copying those blocks means later edits to the parent never reach the page, producing inconsistent layout or spacing that's hard to trace.
<!-- rule:114 -->
- Style icons consistently — use the same sizing scale as equivalent icons and apply identical transforms/orientation to every icon in repeated sets; vary only for intentional design choices — Prevents mismatched sizing and flip/rotate inconsistencies from breaking the visual rhythm of repeated icon sets and drifting from `wagtailio/static/sass/components/` conventions. The consistency rationale: users notice subtle icon misalignment, and unintentional variation looks like a bug. If variation is intentional, document it. Missing: explicit class names or exact sizing scale values from the SCSS components — add those if available for stronger guidance. No bad/good code examples provided, so omitted. Given Scope spans multiple components and template-rendered sets, bullet is best placed in root AGENTS.md per the placement rationale. Note that the user also asks me to preserve project-specific refs — `wagtailio/static/sass/components/` is preserved as the anchor path. The mention of 'SCSS' and 'template-rendered icon sets' are captured via 'sizing scale' and 'repeated sets' language.
<!-- rule:193 -->
- In CSS resets, target only elements that have browser-default styles to reset, and verify selectors match the rendered element and aren't overridden by specificity or stylesheet import order — Resets aimed at unstyled elements are dead code, and selectors defeated by higher specificity or later-loaded stylesheets silently fail — check both so the reset actually applies
<!-- rule:82 -->
- Keep site-wide scripts in root `base.html` (or a non-overridable include), never inside child-overridable blocks like `{% block extra_js %}` — child templates overriding the block would silently drop them — The two halves correct opposite mistakes. Putting global scripts inside an overridable block makes them disappear the moment any child template overrides that block, breaking analytics, polyfills, or shared UI scripts on that page with no error. Putting page-specific scripts in the shared base bloats every page with unused JS.
  Keep page-specific scripts in page-specific templates, not shared base/pattern-library templates — otherwise every page inheriting the base loads scripts it doesn't need
<!-- rule:142 -->
- Order mixins before concrete bases in class inheritance, and drop bases already inherited via a mixin (e.g. don't list `StructBlock` if a mixin already derives from it). — Python MRO is resolved left-to-right, so putting mixins first ensures their overrides (e.g. block `__init__` tweaks in `wagtailio/core/blocks.py`) win over the concrete base, and removing redundant bases avoids MRO conflicts and confusing duplicate definitions in `wagtailio/core/models/pages.py` style hierarchies.
<!-- rule:113 -->
- Express guaranteed-exclusive conditions directly in the branch: use `if`/`else` (or `elif`) when consuming the invariant, never a second `if` that re-checks the complementary condition — duplicated checks let the two branches drift apart. — A second `if` re-derives an invariant that is already guaranteed to hold, so the two complementary branches can silently diverge (one updated, one forgotten). A single combined XOR check keeps both invalid states on the same code path.
  When validating, collapse both-invalid states (both set / neither set) into one combined check like `operator.xor(bool(a), bool(b))` or `bool(a) is bool(b)` instead of separate `if not a and not b` / `if a and b` branches — makes the XOR invariant explicit and keeps the two failure modes handled identically.
<!-- rule:30 -->
- In Wagtail page models, declare `parent_page_types` and `subpage_types` at the top of the class body, before `template`, fields, and panels — hierarchy constraints are the first thing readers need; keep them out of sight and they get missed. Comment non-obvious constraints like `max_count` or a restricted `parent_page_types` so others don't silently delete them. — Page hierarchy is the most load-bearing decision in a Wagtail page model; burying `parent_page_types`/`subpage_types` below fields and panels hides it from reviewers. Inline comments on `max_count` and tight `parent_page_types` values record why a page is restricted, since removing them looks harmless but breaks site structure.
<!-- rule:144 -->
- Set explicit pixel dimensions on icon elements — exact design-spec size (e.g., `34x34px`, equal width/height) for styled icons, and pixel `sizes` on favicon `<link>` (e.g., `sizes="32x32"`) — `sizes="any"` forces browsers to infer scale and can pick the wrong asset or render icons at inconsistent dimensions — explicit pixel values keep icons matching the design spec across templates and stylesheets.
<!-- rule:156 -->
- For Wagtail `ModelAdminGroup`/viewset labels and icons, pick singular, semantically distinct names — e.g. `Taxonomy` not `Taxonomies`, and `form`/`tasks` icons over Page icons like `doc-full-inverse` or `folder-open-inverse`. This keeps the admin menu unambiguous: plural model-group labels read as collections and Page-style icons visually collide with Wagtail's built-in Page landmarks. — 
<!-- rule:181 -->
- Run `djhtml` on new HTML/Django templates before committing — prevents noisy formatting diffs and keeps templates consistent across apps — Formatting new HTML/Django templates with `djhtml` (or the project's configured template formatter) before committing prevents noisy formatting diffs and keeps templates consistent across all apps.
<!-- rule:228 -->
- Gate email-only elements (`unsubscribe`/preference links, ESP merge tags, "view this email online") behind the existing rendering-context flag (`email`/`web` or `page.preview`) in shared MJML templates, applying the condition at every occurrence — keeps the web version from exposing links it can't fulfill without forking the template. — The web render of a shared newsletter template can't service unsubscribe/preference links or resolve ESP merge tags, so leaving them in produces broken links and leaked template syntax. Reusing the rendering-context flag on each occurrence preserves a single template source; duplicating the template or patching only one site causes the email and web versions to drift on future edits.
<!-- rule:148 -->
- **Don't** filter featured posts inline in the chronological loop via `post in featured_posts` (e.g. in `blog_index_page.html`). Render the featured subset as its own section, or use explicit interleaving/spacing logic. Membership tests hide the featured section order and break when the same post is curated twice or featured posts change; an explicit section or N-th interleave keeps render order deterministic and debuggable. — Prevents ambiguous/duplicated featured rendering in `blog_index_page.html` and keeps the featured section order explicit and change-safe when `featured_posts` is edited in the Wagtail admin.
<!-- rule:97 -->
- Use `align-items: flex-start` to align flex children at the cross-axis start, never `flex-basis: start`. — `flex-basis` only accepts main-axis sizing values (lengths, percentages, `auto`, `content`), so `flex-basis: start` is invalid and silently ignored, leaving the layout unaligned.
<!-- rule:96 -->
- Don't declare `flex-grow`, `flex-shrink`, or `flex-basis` alongside a `flex` shorthand on the same selector — the individual props silently override the shorthand's other values, so editing one leaves the other stale and flex behavior diverges from what the shorthand reads as. — In component styles, a `flex` shorthand sets all three sub-properties at once. Adding a separate `flex-grow`/`flex-shrink`/`flex-basis` declaration on the same selector overrides just that piece, so the effective flex behavior no longer matches what the shorthand visually communicates — a frequent source of layout bugs when someone tweaks the shorthand and forgets the override.
<!-- rule:122 -->
- This seems to be a request to rephrase a rule, but the instruction content (the transformation guidelines) is mixed with the rule to be transformed. I'll interpret it as: rephrase the given CSS positioning rule into a format suitable for AGENTS.md. — Without an explicit `position: relative` on the component root, an absolutely positioned child's containing block defaults to the nearest positioned ancestor or the viewport, so the child escapes the component's bounds and breaks unrelated layouts. This is especially error-prone with BEM component roots since the root class is the natural anchor point.
  ---
  Set `position: relative` on a component's root selector when it has absolutely positioned children — establishes the containing block so those children anchor to the component instead of an ancestor, preventing layout bugs in BEM blocks like `.foo` that wrap `.foo__child`.
<!-- rule:224 -->
- Tile large repeating backgrounds with a small square (e.g., 60px) via `background-size` + `background-repeat: repeat` in `::before` rules (e.g., `.template-wagtail-space-index-page`, `.template-wagtail-space-page`) — shrinks asset payload without changing the rendered look. — Shipping a full-size background image bloats static assets for no visual gain; a tiled small square produces the same result at a fraction of the bytes.
<!-- rule:220 -->
- Declare each htmx attribute (e.g. `hx-swap`) once per element — duplicate attributes conflict, and only the first survives. — HTMX 读取属性时，重复的 `hx-*` 会产生冲突：浏览器只保留每个名称的第一次出现，因此重复的 `hx-swap`（或其他 htmx 属性）会静默丢弃第二个值。同理，链接如果没有 `hx-get`/`hx-post`，htmx 根本不会发送请求，点击只会像普通导航一样沿着 `href` 跳转——只有在祖先元素上设置了 `hx-boost="true"` 时，htmx 才会接管，此时子链接上重复声明 `hx-get` 会与 boost 行为冲突。
  - Include an `hx-get`/`hx-post` to trigger the request — a bare `href` isn't enough for htmx to intercept the click.
  - Under an ancestor with `hx-boost="true"`, omit `hx-get` on descendant links — htmx already boosts them, so the extra attribute would conflict.
<!-- rule:58 -->
- Reserve `patterns/includes/svg_sprites.html` for icons used site-wide — put page- or section-specific icons in an external SVG or a local template. The shared sprite is rendered globally, so one-off icons there bloat every page load. — `patterns/includes/svg_sprites.html` is rendered on every page; adding single-use icons to it forces every user to download icons they never see. Local SVG files or section templates keep the global sprite lean while still co-locating icons with the markup that uses them.
<!-- rule:83 -->
- Load page JS from a static file, not an inline `<script>` — inline blocks violate the project CSP — The project enforces a Content Security Policy that disallows inline JavaScript; embedding `<script>` in a template silently breaks the page at runtime.
<!-- rule:214 -->
- Wrap adjacent body text and decorative icons/illustrations in separate containers with `display: flex`; avoid `inset` or absolute offsets — hardcoded positioning overlaps at some viewports, while flex adapts each element to its container. Inside the relevant `@include media-query(...)`, use `flex-direction: column` to stack the icon below the text on mobile. — Hardcoded CSS offsets (e.g. `inset`, `absolute`) break when viewport or container widths change, causing the icon to overlap adjacent text; flexbox sizes each element to its container instead. A `flex-direction: column` override in the mobile `@include media-query(...)` keeps the icon readable below the text rather than crowding it.
<!-- rule:84 -->
- Use fictional or pun-based names in `project_styleguide` YAML fixtures — never the real names shown in design mockups, since these fixtures render into the published styleguide and would leak real people's PII into shipped output (e.g. `project_styleguide/templates/patterns/components/author/author.yaml`). — The styleguide fixtures double as published demo content; copying a real name from a mockup turns a design detail into permanently shipped PII that's expensive to scrub once indexed or cached.
<!-- rule:146 -->
- Center flex-wrapped lists that leave unbalanced trailing whitespace — Mixing `justify-content: flex-start` with `flex-wrap` makes the final row hug one edge while earlier rows fill the width, so short lists look lopsided. Use `justify-content: center` in the mobile/default styles where the imbalance appears. The component SCSS rule text was not provided in the prompt; if it exists, append it verbatim here.
<!-- rule:104 -->
- Serve static image assets (e.g. under `static/img/`) as WebP, compressed with an image optimizer (Squoosh CLI/Web UI) before committing, when it substantially reduces file size and no PNG-specific feature is required; for tiny icon renditions (e.g. `max-100x100`) treat WebP conversion as an optional optimization, and add `format-webp` to Wagtail `{% image %}` tags when byte savings are worthwhile. — WebP typically cuts image bytes well below PNG/JPEG, so shipping optimized WebP under `static/img/` and adding `format-webp` to Wagtail `{% image %}` tags speeds page loads; skip conversion only when PNG-specific features (transparency hints, lossless previews) are needed or savings are negligible on tiny `max-100x100` icons, where extra processing offers little benefit.
<!-- rule:29 -->
- Define `TextChoices`/enum choice classes in a dedicated `choices.py`, not inline in `models.py` — keeps model modules schema-focused and lets choices be imported without pulling in model definitions. — Colocating choice classes in `choices.py` avoids circular-import pain and keeps `models.py` readable as a schema file; consumers (forms, serializers, tests) can import choices cheaply without triggering model loading.
<!-- rule:198 -->
- Reuse existing CSS classes for text styling instead of hardcoded `font-size` values or redundant `<b>`/`<i>` tags — keeps typography consistent across `static/sass/components/` and `project_styleguide/templates/patterns/components/` — Hardcoded sizes and presentational tags bypass the styleguide, causing drift from the design system.
<!-- rule:132 -->
- Mark table header cells as `<th>` (even image/logo headers) and data cells as `<td>` — keeps generated and template tables accessible and semantically consistent with the pattern-library template. — Screen readers and the pattern-library template rely on `<th>` to identify headers; a StreamField table generator that only emits `<td>` silently breaks that semantics, so the generator must support `<th>` header rows.
<!-- rule:126 -->
- Use `{# ... #}` for template dev notes, not `<!-- -->` — HTML comments ship in rendered page output — HTML comments are emitted into the rendered output that users and search engines see; Django's `{# ... #}` comments strip out at render time. Applies to every `.html` template in the repo (e.g. under `wagtailio/project_styleguide/templates/`), not just one app directory.
<!-- rule:155 -->
- Don't add ARIA `role`s that duplicate native HTML semantics; avoid `aria-roledescription` unless documented — Redundant roles and undocumented `aria-roledescription` confuse assistive tech and diverge from native semantics, the same inconsistency flagged in `wagtailio` templates.
<!-- rule:60 -->
- Don't hard-code `fill` (or other presentational colour) attributes in SVG sprite `<symbol>` markup — set colours in Sass/SCSS and apply via CSS selectors so a single symbol can be themed and recoloured without editing markup. — SVG color attributes baked into `<symbol>` markup lock the sprite to one hardcoded color, so themes cannot override it and any color change requires editing markup. Keeping presentation in Sass/SCSS lets CSS selectors (including CSS custom properties and theme scopes) control the sprite's appearance everywhere it's used.
<!-- rule:145 -->
- Give interactive icons a 24x24px tap target via padding or `min-width`/`min-height` — smaller glyphs are unusably hard to tap on touch screens — Icon glyphs are often rendered at 16–20px, which falls below the 24x24px minimum reliable tap target; padding or `min-width`/`min-height` around the glyph preserves the icon's visual size while making it reliably tappable.
<!-- rule:143 -->
- Define shared `StructValue` subclasses above the mixin and assign via `value_class` on the mixin — consumers inherit it, never redeclare — Keeps a single source of truth for the value class across every block model using the mixin; redeclaring in each block risks drift between structurally identical value types and breaks `isinstance` checks against the mixin's declared class.

## API Design

<!-- rule:129 -->
- Group related Wagtail admin `panels` fields into `MultiFieldPanel`s with human-readable headings (append `(read-only)` for read-only groups) — flat `FieldPanel` lists obscure the intended authoring flow and force editors to guess at field relationships. — Applies to any Wagtail model/snippet admin definition (e.g. `wagtailio/core/models/pages.py`, `wagtailio/core/models/snippets.py`, `wagtailio/roadmap/models.py`), so it belongs at project scope rather than a single directory. Structured panels make the admin self-documenting for editors; unresolved ambiguity around credential fields causes runtime integration breakage.
  - Order fields within each panel by intended authoring sequence, and keep content fields separate from external service/credential fields — mixing them invites misconfiguration of integrations.
  - Use `help_text` to explain editorial constraints or choices — labels alone don't convey why a field exists or when to change it.
<!-- rule:131 -->
- Set `blank=True`/`required=False` only when a field is genuinely optional; omit it on required fields so Django form validation enforces requiredness — prevents editors submitting empty values that contradict the model's semantics. — Keeps model structure authoritative: optional fields stay open to editors, required fields are enforced by forms rather than validated downstream.
<!-- rule:31 -->
- Author Wagtail `StructBlock`/`StreamField` blocks generically so they survive entity-type changes: — Keeps blocks reusable when the allowed entity type changes and catches invalid link/CTA combinations at validation time.
    - Use neutral field names (e.g. `page`) and messages (e.g. 'You must specify a page or a URL.') — tied to the block, not the currently allowed entity type.
    - Use block-level kwargs `required`/`help_text`, not Django model-field args like `null`.
    - On blocks with optional alternative fields (link targets, CTA fields) — and their sibling block classes with the same layout — add block-level `clean()` to enforce at least one target, at most one alternative, and companion labels like CTA `text` when a target is set — catches invalid combinations at validation time instead of silently accepting them.
<!-- rule:99 -->
- Assign `template=` only to the outermost `StreamBlock`; render each nested block via its own dedicated template. Parent/page templates should `{% include %}` or call the block — never iterate child data or branch on `{% if block.block_type == ... %}` / `{% elif %}`. — Keeps block changes local: adding a new block type doesn't force edits to every parent template, and inline `block_type` branches drift out of sync with the Python block definitions.
<!-- rule:18 -->
- Reuse project mixins (`SocialMediaMixin`, `HeroMixin`) for shared fields/behavior in Wagtail Page models — reimplementing them lets fields diverge and breaks code expecting the mixin. — Validation for mixin-provided fields belongs in the mixin itself, not duplicated across each model's `clean()`, so checks change in one place. If a model intentionally departs from a mixin, migrate the still-needed fields directly into the model — partial inheritance leaves half-populated fields.
<!-- rule:227 -->
- Declare `StreamField` fields without `use_json_field=True` (default in Wagtail 6.0+) or `null=True` — use `blank=True` for optional input; `null=True` risks a DB/ORM mismatch since `StreamField` stores `[]`, never `NULL`. — Wagtail 6.0+ already defaults `use_json_field` to `True`, so passing it adds noise that misleads readers into thinking it's required. `StreamField` serializes an empty value as `[]`, so `null=True` lets the ORM and DB disagree about emptiness and breaks `blank=True`-style form validation; `blank=True` is the correct way to permit empty input.
<!-- rule:6 -->
- Use `ForeignKey` + matching chooser panel (e.g. `VideoChooserPanel`) for a single fixed media item, not `StreamField` — a `StreamField` obscures the one expected value and complicates `content_panels` — Establishes a consistent Wagtail content-modeling convention across the repo (e.g. `navigation/models.py`, `core/models/pages.py`, `project_styleguide/templates/`), so editors get the right editing UI, previews, and ordering behavior, and models stay simple enough to maintain.
  - Use `StreamField` for repeatable or editor-arranged blocks (e.g. CTAs), not fixed fields — editors need to add, remove, and reorder without a schema change
  - Use snippets, not settings models with `StreamField`s, for content needing staging or preview — settings models bypass Wagtail's revision/preview workflow
  - Default to `models.Model` unless parent/child or snippet-chooser relations require `ClusterableModel` — extra model machinery adds migration and admin overhead for no benefit
<!-- rule:19 -->
- Match `CharField.max_length` and field type to real content — prevents silent truncation and wasted DB storage; count multi-codepoint emoji when sizing single-char fields, and use `TextField` (or multi-line widget) for multi-line data like code snippets. — Defaulting to 255 or using `CharField` for multi-line content causes truncation bugs, over-allocates storage, and mismatches the editing UI. Sizing single-codepoint fields naively also under-counts emoji/unicode that occupy multiple codepoints, so realistic maximums and multi-codepoint awareness keep DB constraints aligned with actual user input.
<!-- rule:56 -->
- Keep Django models the single source of truth: expose computable values via `@property` instead of storing them, and don't re-implement model validation in views or templates — Duplicating derived values or invariants in consumers like `sitewide_alert/views.py` lets stored data drift from what views render or check, so bugs surface only when the two disagree.
<!-- rule:35 -->
- Match model relationship field type and options to real ownership: `models.CASCADE` for children owned by a parent page, a plain `ForeignKey` unless multiple relations are truly needed, and a semantic `related_name` (not `page`/`model`). — Prevents orphaned child rows that outlive their parent page, avoids over-engineered multi-relation fields, and keeps `related_name` reverse accessors meaningful instead of ambiguous across the wagtailio models.
<!-- rule:167 -->
- Expose editor-facing booleans (e.g., `loop`) only for per-instance block behaviors — fixed behaviors belong in `help_text` — A `BooleanBlock`/checkbox for an always-on or fixed behavior misleads editors into thinking they can toggle it, adds dead UI to the Wagtail editor, and complicates the block's data model with a field that never varies. Reserve booleans for genuinely variable options like looping, and document immutable behavior in the block/field `help_text`.
<!-- rule:9 -->
- Store icon/emoji choices as stable string IDs (e.g., CLDR names like `"thumbs up"`), not raw UTF-8 glyphs — Decouples the data model from rendering — front-end can swap emoji glyphs or image assets without a migration, and avoids UTF-8/encoding issues in the DB and API.
<!-- rule:229 -->
- When counting usages via Wagtail's `ReferenceIndex`, deduplicate with `.values('content_type_id', 'object_id').distinct()` before aggregating `Count` — otherwise a parent object referencing the same target multiple times inflates the usage count. — A single parent (e.g. a Page or Image) can hold several `ReferenceIndex` rows pointing at the same `object_id`, and a plain `Count` aggregation sums all of them. Collapsing to distinct `(content_type_id, object_id)` pairs first makes the count reflect unique referencing objects, not raw rows — keeping usage totals intuitive and matching what editors expect to see in report views.
<!-- rule:62 -->
- Use `update_or_create` in Django commands syncing external API records — create/delete-only silently drops edits to mutable fields. Accept per-record query cost until volume warrants batching. — External records change over time; create/delete-only logic leaves stale data in mutable fields. Per-record overhead is fine for small datasets, batch only when scale demands it.
<!-- rule:169 -->
- Render promoted results in `wagtailio/search` templates with `{% get_search_promotions %}`, loading `wagtailsearchpromotions_tags` and reusing the standard search result partial — promoted picks are filtered out of the main results loop to avoid duplicates, so this is the only place they appear, and reusing the partial keeps their markup in sync with normal results. — Promoted/editor's picks are deliberately excluded from the main search results to prevent duplicates; without a separate render via `{% get_search_promotions %}` they vanish entirely, and skipping the tag load or the shared partial causes template errors or divergent result markup.
<!-- rule:85 -->
- Make CTA labels editable `CharBlock` fields (e.g. `link_title`) — never hard-code them in StreamField templates — Hard-coded labels in `wagtailio/project_styleguide/templates/patterns/components/streamfields/` force content editors to file code changes for copy edits; define the field on the block in `wagtailio/features/blocks.py`, render `{{ value.link_title }}`, and fall back to a default label when empty so editors retain control.
<!-- rule:210 -->
- Keep model-level data helpers free of UI sentinels like `"All"` — add default/sentinel choices in `get_context()` instead — Model helpers that bake in presentation defaults (see `wagtailio/showcase/models.py`) become unusable for callers that need the raw computed collection, and force UI concerns into the data layer.

## Naming

<!-- rule:119 -->
- Name blocks, templates, and attributes after the generic role or request behavior they serve — not visual details or frontend libraries (e.g., `VideoBlock`, not `LoopingVideoBlock`; `ajax_template`, not `htmx_template`). — Couples model/API naming to frontend library choices (e.g., htmx) and visual styling — library swaps and restyles then cascade into model fields and {% include %} references across the project.
  Name reusable card templates in `patterns/components/streamfields/cards/` for their card role, not a specific element (`logo_card_block`); when renaming or moving one, update every `{% include %}` and related path (e.g., `card_list_block.html`).
  Role-based names keep models and the public API decoupled from implementation details, so swapping a frontend library or restyling a component doesn't force renames across models and templates.
<!-- rule:77 -->
- Name pattern templates descriptively in `snake_case` under `patterns/components/`, mirroring related `static/sass/` paths (e.g. `patterns/atoms/icons/` ↔ `static/sass/atoms/icons.scss`), and split distinct variants into separate files (e.g. `button.html` for `<button>` vs. `button-link.html` for styled anchors) instead of overloading one include. — Descriptive, path-aligned names make templates findable next to their styles, and one-variant-per-template keeps includes from accumulating conditional branches that are hard to reason about or override.
<!-- rule:39 -->
- Prefer names denoting the specific domain concept or structural role over generic/inherited terms — e.g. `is_link_required` not `is_required`, `RoadmapItem`/`MilestoneItem` not `Item`. — Generic names collide across unrelated modules and lose meaning when a subclass overrides an inherited property, forcing readers to jump to the base class. Name environment-backed credentials in `settings/base.py` for their specific purpose/scope rather than generically (no bare `{SERVICE}_ACCESS_TOKEN`) — settings are referenced far from where they're defined, so the name is the only context a reader gets.
<!-- rule:68 -->
- Use fully spelled-out, correctly spelled variable names, even for short-lived locals — avoid abbreviations (`curr_row` → `current_row`) and single letters like `e`, which reads as an exception variable (`except Exception as e`). — Abbreviated or single-letter locals force readers to re-derive meaning from context; `e` in particular collides with the established `except Exception as e` pattern and misleads reviewers scanning for error handling.
<!-- rule:162 -->
- Drop the `Snippet` suffix on `@register_snippet` models — use the plain domain name (`FooterMenu`, `MainMenu`, `MainMenuItem`) so class names track the domain concept, not Wagtail's delivery mechanism, which the decorator already signals. — The decorator already marks the mechanism, so the suffix is redundant and leaks Wagtail internals into the domain vocabulary; keeping names mechanism-agnostic also means renaming a model to/from a page doesn't force a rename and update to every FK reference.
<!-- rule:3 -->
- Write domain structure to `ds_config.py`, never into `Settings` subclasses — these are the single interface for every environment, so tenant differences (directories, storage paths, secrets) stay per-deployment instead of hard-coded into the shared class. Each compile/seal operation stores all resolved config in `Settings._compiled_config`, letting a `RECOMPILE` refresh values and give tenant-specific config a single source of truth. — Any AI assistant working anywhere in the repo must not add environment-specific paths, buckets, or credentials to `Settings` subclasses. `ds_config.py` is the one per-environment interface; `_compiled_config` is the one cache that `RECOMPILE` can fully re-resolve.
<!-- rule:136 -->
- Don't repurpose `value.logo` for semantically different UI (`value.logo` as an author avatar) — use a field named for the rendered element, or extract a dedicated template/component for the variant; keeps field semantics predictable across templates — Fields named for one thing (`value.logo`) are read as that thing by every template touching them; overloading them for a different visual (author avatar) silently breaks expectations when either the field or the UI changes, and prevents the distinct variant from evolving on its own.
<!-- rule:209 -->
- Name private model helpers that return a computed collection `_get_<noun>()`, not `_filter_<noun>()` — reserve `_filter_*` for methods that narrow a queryset by criteria, so callers can tell retrieval from filtering at a glance. — 

## Config

<!-- rule:10 -->
- Pass an explicit minimal `features` allowlist to every `RichText` field and rich-text `StreamField` block (e.g. `p`, `a`, `ul`, `li`, `link`, `document`) — omitting it enables full formatting, and invalid names like `br` (an HTML tag, not a Wagtail feature) raise config errors. — Wagtail's `features` list is a strict allowlist of registered feature names, so a raw HTML tag such as `br` fails validation; a minimal explicit list also keeps stored rich-text HTML consistent across `wagtailio/packages/models.py`, `wagtailio/core/blocks.py`, `wagtailio/showcase/models.py`, and `wagtailio/core/models/pages.py`.
  - Use a plain-text block/field (e.g. `CharBlock`) where only plain text is needed — avoids stray markup and editor confusion in content that never needs formatting.
<!-- rule:215 -->
- Use only `panels` options supported by the pinned Wagtail version and effective in that field/model context. — No-op copies like `classname="collapsible"` (e.g., carried over from `wagtailio/navigation/models.py` into other models) mislead readers, and options unsupported on the pinned version can break admin rendering.
<!-- rule:173 -->
- Add every user-facing content field (`body`, `intro`, `fine_print`) to Wandtail `search_fields` as an `index.SearchField`, and dedupe — content fields not registered (or registered twice) silently drop out of site search — New content fields are easy to forget when adding to the model, which leaves them unsearchable to users; duplicate `index.SearchField` entries cause redundant indexing.
<!-- rule:117 -->
- Use explicit sizing in pattern library templates/YAML fixtures when previewing components — arbitrary or clipped dimensions cause review discrepancies against the design spec. — The styleguide/pattern-library artifacts (streamfield/card templates and their YAML fixtures) are what reviewers compare against the design. Approximate or auto dimensions clip components and produce visual diffs that get blamed on the component, not the fixture.
<!-- rule:217 -->
- Customize panels on project page models or via Wagtail hooks, never mutate `Page.content_panels`/`Page.promote_panels`. — Wagtail's `Page.content_panels` and `Page.promote_panels` are shared class attributes inherited by all page models. Mutating them at import time (e.g. in `wagtail_hooks.py`) silently applies the change to every page type in the project and any third-party app — order-dependent, hard to trace, and surprising when unrelated pages gain or lose panels. Defining panels on the specific page model, or applying them through a Wagtail hook, keeps the customization scoped to where it's intended.
  - Those are class-level lists shared by every `Page` subclass, so import-time patching leaks panel changes into unrelated page types and other apps.
<!-- rule:185 -->
- Mirror the `{% cache %}` tag's `vary_on` dims in manual `save()` invalidation — mismatched keys serve stale fragments. Include request-dependent flags like `request.is_preview` from the start, since retrofitting them later leaves those variants uninvalidated. For boolean dims, clear the `False` (non-preview) variant and invalidate every variant that could be served. — Django fragment caches are keyed by exact `vary_on` dimensions, so invalidation from a model's `save()` only hits fragments whose key matches the template tag's. Missing a dimension (especially `request.is_preview`) means preview and committed variants drift independently, serving stale content to one audience.
<!-- rule:53 -->
- Emit hashed bundle filenames from the frontend build and point `django-manifest-loader` at the Webpack manifest — templates like `templates/base.html` resolve assets by name, so stale filenames break rendering in production. Configure separate dev/prod behavior (e.g., manifest vs. dev server) to keep `collectstatic` and local hot-reload both working. — Hash-based cache busting only works if Django can map logical asset names to their hashed filenames; mismatched build output and loader config causes missing-asset errors in production while dev workflows (hot reload, static serving) depend on the alternate behavior.

## Error Handling

<!-- rule:44 -->
- Always pass `timeout=` to `requests` calls, call `response.raise_for_status()`, and wrap in `try`/`except` for `requests` exceptions — Without a timeout, a hung remote (e.g. an upstream API in `wagtailio/packages/views.py` or a webhook in `wagtailio/areweheadlessyet/signal_handlers.py`) blocks the worker indefinitely. `raise_for_status()` catches 4xx/5xx that `response.ok` checks often miss, and the `try`/`except` turns `Timeout`/`ConnectionError` into handled failures instead of 500s in management commands like those under `wagtailio/areweheadlessyet/management/commands/`.
<!-- rule:0 -->
- Write descriptive validation errors and phrase the fix, not internal identifiers — drop `class` names like `StructBlock` from user-facing messages, since users can't act on them. — User-facing messages that leak internal names (e.g. `StructBlock`) leave editors with no corrective path, and partially-updated phrasing in a single module (`wagtailio/core/blocks.py`) makes it unclear which convention is current, so new code copies the stale variant.
  - When rewording one validation message, update every analogous message in the same file (e.g. across all `StructBlock`/`clean` validators in `wagtailio/core/blocks.py`) — mixed phrasing in one module signals an inconsistent, half-finished migration.
<!-- rule:66 -->
- In `StructBlock.clean()`, raise `StructBlockValidationError(block_errors={'field': ErrorList([...])})`; use the `non_field_errors` key for cross-field checks — the struct/stream block machinery silently swallows plain `ValidationError`, so the error never reaches the user. — Wagtail's struct/stream block machinery catches plain `ValidationError` and discards it, so `clean()` failures disappear silently and users see no feedback; `StructBlockValidationError` with per-field `ErrorList` values propagates errors to the correct fields.
<!-- rule:225 -->
- Wrap related multi-step DB writes (repeated `update_or_create`, M2M `.add()`, processing loops) in a single `django.db.transaction.atomic` block — a mid-run failure (e.g., a later API error) then rolls back every write from that run instead of leaving partial or inconsistent data. — Multi-step write sequences without a transaction can partially commit: if a later step raises, earlier `update_or_create`/`.add()` calls stay committed and leave the run half-applied. Wrapping the whole sequence in `django.db.transaction.atomic` makes the run all-or-nothing.
<!-- rule:160 -->
- Read optional context settings like `wagtailio/project_styleguide/pattern_contexts.py`: wrap lookups in `try/except (KeyError, AttributeError)`, `None`-check before nested attribute/related-manager access, and on missing settings return the tag's initialized default (e.g. `menus = []`), never an empty `{}`. — Unconfigured or optional settings would otherwise raise `KeyError`/`AttributeError` mid-render or collapse to `{}`, so templates always receive a consistent context shape and don't silently break.
<!-- rule:43 -->
- Fire-and-forget webhooks (`wagtailio/settings/production.py`): negligible timeout, sync call, catch the timeout — an unreachable hook must never stall or break the triggering request — Fire-and-forget requests whose response is discarded still block the triggering request if the remote is slow or unreachable, and a background thread makes that failure silent and harder to reason about. Using a tiny timeout keeps the wait bounded, calling synchronously avoids thread lifecycle issues, and explicitly catching the timeout exception stops an unreachable deploy hook or webhook from surfacing an uncaught error in the request that fired it.
<!-- rule:42 -->
- Use `Model.objects.first()` for optional singleton lookups instead of `.get()` or direct singleton access — `.get()` raises `DoesNotExist` when no instance exists, crashing consumers like Wagtail context modifiers that should tolerate an absent setting. Guard the return against `None` so callers can skip the missing setting or fall back to defaults. — Optional singletons like site settings may legitimately have no row; `.get()` and direct access raise `DoesNotExist`, breaking Wagtail context modifiers that should degrade gracefully. Checking for `None` lets consumers skip the absent setting or supply defaults rather than erroring.

## Documentation

<!-- rule:190 -->
- For Django model fields, set an explicit human-readable `verbose_name` rather than relying on auto-generated labels; capitalize acronyms correctly (e.g., `cta` → `CTA`) and keep labels of related fields consistent in style. Follow the project's existing i18n convention for model labels—do not wrap model labels/verbose names in `gettext_lazy` unless translation is applied consistently across comparable parts of the project. — All validated evidence is inside the wagtailio Django project, across multiple model modules. The rule is a project-level Django model field convention, not tied to a single file and not a cross-file synchronization rule. Placing it in wagtailio/AGENTS.md keeps it discoverable for any assistant editing models under that tree without making it an over-broad repository-root rule.

Placement rationale note: keep backticks around code identifiers (`verbose_name`, `gettext_lazy`, `wagtailio/AGENTS.md`) and format the output as markdown bullets.
<!-- rule:125 -->
- Write template comments for non-developers, not devs — describe user-visible behavior, since CMS editors read these files — Template files are read by content editors, not developers, so comments describing user-visible behavior and real edge cases are the only ones that help. Comments that echo the markup (like `{# title #}` above `{% if page.title %}`) or describe unused approaches go stale and misrepresent rendering.
  - Don't restate self-documenting code (`{# title #}` above `{% if page.title %}`) or narrate alternatives you didn't use — stale narration misleads editors about what actually renders
  - Document only special cases that can actually occur — comments on impossible branches are noise editors can't act on
<!-- rule:1 -->
- Update comments in `wagtailio/settings/dev.py` and `wagtailio/settings/base.py` to match reality: add brief scope notes (e.g. `local-only`, `dev-only`) above non-obvious overrides, and delete or rewrite comments naming deployment details, client apps, or hosting platforms the project doesn't use — stale setting comments mislead everyone reading the config. — Stale setting comments mislead readers about what config actually does.

## Imports

<!-- rule:75 -->
- Keep `{% load %}` declarations accurate in every template — load a custom tag library before using its tags/filters, and drop `{% load %}` lines once their tags are no longer referenced. — Using a tag without its `{% load %}` raises `TemplateSyntaxError` at render time; stale loads add noise and can mask which libraries a template actually depends on.
<!-- rule:218 -->
- Enable ruff/isort `force-sort-within-sections` — sorts `import x` and `from x import y` alphabetically together — Manually reordering generated files like Django migrations is wasted churn that reappears on regeneration; a shared linter config enforces consistent alphabetical ordering across every third-party import section regardless of import style.
<!-- rule:226 -->
- Import Wagtail built-ins explicitly from `wagtail.*.models` (e.g., `from wagtail.images.models import Image`) — local `.models` modules only re-export project-specific classes, so relying on them for built-ins raises `NameError`. — Local `.models` packages in this project only define project-specific classes. Wagtail built-in models like `Image`, `Page`, or `Rendition` are not re-exported there, so a bare `from .models import Image` fails at runtime; always import them from their canonical `wagtail.*.models` path to keep dependencies explicit and avoid `NameError`.

## Dependencies

<!-- rule:55 -->
- Prefer `wagtail-font-awesome-svg` and Wagtail system fonts over bundled font assets — remove `webpack.config.js` font loaders and their `package.json` deps, since bundled fonts bloat builds and duplicate icons Wagtail already serves — Bundling raw font assets duplicates what Wagtail's system font and `wagtail-font-awesome-svg` already provide, inflating build output and adding pointless webpack loader/dependency maintenance in `webpack.config.js` and `package.json`; when touching font or icon handling, prefer the maintained Wagtail integrations and delete the now-unnecessary loaders and deps.
<!-- rule:200 -->
- Make data migrations reversible: pass a real `reverse_code` instead of `migrations.RunPython.noop`, and pass `migrations.RunSQL.noop` as `reverse_sql` for forward-only `RunSQL` — `noop` is fine only when reversal is impossible (e.g. a sibling migration drops the model/table). — `noop` reversals silently break `migrate <app> <earlier>` and force manual DB surgery; a real `reverse_code` keeps every migrations directory rollback-safe.
<!-- rule:183 -->
- Serve web font assets (including variable fonts) as `woff2` in production, not `.ttf` or `truetype-variations` — `woff2` compresses far better, so shipping raw `.ttf` bloat slows page loads. — `woff2` offers substantially better compression than `.ttf`/`truetype-variations`, and browsers that support variable fonts all support `woff2` variable fonts, so the legacy formats only add weight to production bundles.

## General

<!-- rule:130 -->
- Add a `<component>.html` + paired `.yaml` fixture under `styleguide/` for every template/component change — keeps pattern-library previews in sync so components never ship undocumented. — Styleguide previews and `.yaml` context fixtures are the de-facto manual test surface; drift means reviewers and AI assistants can't see how a component renders or which variables it expects.
<!-- rule:202 -->
- Rename a StreamField block in one pass: update all matches across `wagtailio/core/blocks.py`, `wagtailio/services/blocks.py`, templates, and nested blocks, then add a StreamField data migration — persisted JSON keys on the old block name, so partial renames silently break live pages — StreamField stores each block's type name as a JSON key in the database, so renaming a block without updating every definition and migrating persisted content leaves existing pages unresolvable.

## Topic Guides

Check these when working in specific areas:

- **[Accessibility and Semantic Markup](agent_docs/accessibility-and-semantics.md)**: When writing or reviewing HTML markup, components, and interactive styling for a11y
- **[Wagtail/Django Template Rendering](agent_docs/wagtail-template-rendering.md)**: When writing Wagtail/Django templates that render model content
- **[Documentation and Comments](agent_docs/documentation.md)**: When writing or reviewing documentation, README setup steps, help text, or inline comments
- **[Project Configuration, CI, and Environments](agent_docs/project-config.md)**: When setting up or changing project configuration, CI, or environment/deployment settings

## File-Specific Rules

### `**/Dockerfile`

<!-- rule:2 -->
- Combine `COPY`/`RUN` in `**/Dockerfile`: chain with `&&`, delete temp files in same layer — fewer layers shrink images and speed pulls. — fewer layers shrink images and speed pulls.

### `**/apps.py`

<!-- rule:24 -->
- Name `AppConfig` subclasses in `apps.py` as `<AppName>Config` using CamelCase — matches the app/package name and mirrors the project's model class naming. — Keeps `AppConfig` discovery predictable across apps: Django's dotted-path lookup and cross-references like `INSTALLED_APPS` stay readable and consistent with model classes.

### `README.md`

<!-- rule:223 -->
- Sync the `README.md` Deployment section with the real automated pipeline — document hosting provider and branch→environment mapping, remove stale manual deploy commands. — The Deployment section is the first place contributors look before shipping, so stale manual steps there cause failed or conflicting deploys.

### `blocking.js`

<!-- rule:203 -->
- In `blocking.js`, stateful toggle buttons need a dynamic `aria-label` naming the next action (e.g., `'Change to Dark Theme'`), set both on page load and after each click. — A static label leaves screen-reader users unable to tell what the toggle will do — describing the next action makes the stored state audible, and initializing it on load keeps the label honest when the saved theme differs from the HTML default.

### `docker-compose.yml`

<!-- rule:34 -->
- In `docker-compose.yml` dev services, override the start command with a keep-alive no-op (e.g., `tail -f /dev/null`) and keep `healthcheck` blocks intact. — Lets developers run the app and one-off management commands (e.g., `migrate`, `test`) directly against the running container instead of via `docker-compose up`; preserving `healthcheck` lets `docker compose run --wait`-style flows wait for dependencies to be ready.

### `package.json`

<!-- rule:51 -->
- Declare language/compiler packages in `devDependencies` explicitly (e.g. add `typescript` when `ts-loader` targets `.ts`/`.tsx` globs) rather than relying on a loader or plugin to pull them in transitively — transitive deps shift between releases, causing sudden "cannot find module" build failures. — Only direct dependencies are guaranteed stable across upgrades; transitive versions can change underfoot and silently break the build tooling or lint/format scripts.

### `pyproject.toml`

<!-- rule:184 -->
- Swap `fabric3` for `fabric`/`invoke` in `pyproject.toml` (or apply the interim fix from mathiasertl/fabric#57) — `fabric3` is incompatible with Python 3.10 — The dev dependency `fabric3` breaks under Python 3.10, so leaving it in place prevents the dev environment from installing or running on modern interpreters.
<!-- rule:37 -->
- Replace `pyproject.toml` `authors` placeholders (`"Your Name <you@example.com>"`, empty strings, `TODO`) with real contacts before committing — placeholder metadata ships to PyPI; use `hello@wagtail.org` for `wagtailio` — Template contact info and `TODO` markers end up in published wheels/sdists, so users can't actually reach the maintainers; using the real project address (e.g. `hello@wagtail.org` for `wagtailio`) keeps published metadata accurate.

### `wagtailio/roadmap/views.py`

<!-- rule:208 -->
- In `wagtailio/roadmap/views.py`, query milestones with `milestones(first: 20, orderBy: {field: DUE_DATE, direction: ASC})` and no `states` arg — drop the `import_all` parameter and conditional `CLOSED` state branch. — The `import_all` flag and conditional `CLOSED` filter split one bounded list query into multiple code paths, so which milestones appear depends on caller-supplied state instead of a single deterministic ordering. A lone ordered limit keeps the query predictable and bounded.

### `wagtailio/static/js/main.js`

<!-- rule:149 -->
- In `main.js`, only register site-wide components in `DOMContentLoaded` — extract page-specific `initComponent` calls into a page bundle included by that page's template, and delete unused calls — keeps page-specific JS out of the bundle every page loads and stops dead callbacks from running where they aren't needed. — Anything initialized from `main.js` ships and executes on every page. Page-specific components bloating that list slow down unrelated pages and run setup code that has nothing to do on them. Moving them to a per-page bundle loaded from the relevant template (and removing `initComponent` calls you no longer need) keeps the shared bundle minimal and each page's JS scoped to what it actually renders.

<!-- /braindump -->