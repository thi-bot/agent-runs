<!-- braindump: rules extracted from PR review patterns -->

# wagtail/admin/templates/wagtailadmin/ Guidelines

## Code Style

<!-- rule:2060 -->
- In `wagtail/admin/templates/wagtailadmin/`, set `<html>` `lang`/`dir` via `{% get_current_language as LANGUAGE_CODE %}` and `{% get_current_language_bidi as LANGUAGE_BIDI %}` (after `{% load i18n %}`) — never hardcode `lang="en"` or add a `|default` fallback, since `get_current_language` already falls back to `settings.LANGUAGE_CODE` and hardcoding breaks RTL/i18n for non-English admins. — Ensures correct rendering for translated and RTL locales without duplicated fallback logic.
<!-- rule:1359 -->
- Reuse the existing `message` panel styling conventions for admin notification/dialog panels — apply a state class on the container (e.g., `.w-dialog` when `message_heading`/`message_icon_name` is present) so close-button/icon colours override to `grey-600` — keeps new variants (e.g., `home/upgrade_notification.html`) visually consistent. — The admin UI has a well-established message styling pattern (`.w-dialog`, `grey-600` close-button/icon overrides, forced-colors bottom borders on success/warning/error). New panel variants that invent their own colours or skip the forced-colors border diverge visually and break for users with high-contrast settings. Anchoring to the existing classes keeps upgrades/dialogs looking like every other Wagtail admin message.
  Add forced-colors styling (e.g., bottom border) matching existing success/warning/error messages — keeps new panels accessible in high-contrast mode.
<!-- rule:1007 -->
- Pass avatar data (`user.id`, `username`, URL) explicitly into shared partials like `user_avatar.html` / `header.html` from the real user object — template tags inside shared partials and denormalized/annotated fields break when callers lack that context — Shared partials get included from many admin views where the template context differs; deriving avatar data inside the partial via tags or relying on annotated fields silently fails or renders stale/inconsistent values depending on the caller. Explicitly resolving from the actual user object keeps the partial's inputs obvious and reliable across `wagtail/admin/templates/wagtailadmin` callers.
<!-- rule:2359 -->
- In `wagtailadmin` side-panel/status templates (`shared/side_panels/includes/status/locale.html`, `scheduled_pages/panel.html`) and multilingual listings, read locale from the view-provided `locale` context, not `object.locale` — the latter is unset on initial load for snippets. — Consolidates a recurring template pattern into one place. Preserves specific template paths and the `{% i18n_enabled %}`/`translations`/`object.pk` guards, which are the actionable, project-specific parts an assistant needs to apply the rule correctly across sibling templates.
  - Render "Available in X locales" only when `object.pk` is set and `translations` is non-empty — avoids showing status for unsaved or untranslated objects.
  - Show locale labels only when `{% i18n_enabled as show_locale_labels %}` and the object has a `locale` — i18n may be disabled.
<!-- rule:1211 -->
- Keep SVG icon `<path>` attributes on a single line — matches existing icons and avoids noisy diffs from IDE auto-wrapping. — Directory contains a uniform, hand-maintained icon set; multi-line attribute wrapping diverges from every existing file and creates churn whenever an editor reformats them.
<!-- rule:3011 -->
- Use `<text>` (not `<path>`) for lettering in SVGs under `wagtail/admin/templates/wagtailadmin/icons/` — path glyphs blur on resize; anchor it to the `viewBox` via `transform`/`x`/`y` so it stays aligned. — Path-based lettering becomes blurry when the SVG is scaled and is less crisp at normal size, while `<text>` renders cleanly. Positioning it explicitly against the `viewBox` keeps alignment correct if icon size or `viewBox` changes later — unanchored text drifts.

## API Design

<!-- rule:1145 -->
- Toggle sortable headers in Wagtail admin listing templates: repeated clicks flip asc/desc, reverse direction prefixes the `ordering` query param with `-`, and the arrow icon (up/down) reflects current direction — keeps sort state predictable for users. — Users expect a click on a sorted header to invert the list; emitting the leading `-` on `ordering` is the Wagtail convention Django's `Orderable`/admin views already parse, so inventing a different reverse syntax silently breaks ordering. Reflecting direction in the icon gives instant feedback about which way the list is sorted.
<!-- rule:3030 -->
- Keep `description` as its own param/element on `wagtail/admin/templates/wagtailadmin/shared/header.html` and `shared/dialog/dialog.html`, rendered as body text outside the heading (`div`/`p`) — renaming it to `subtitle` or reusing it for title-adjacent text breaks callers and loses the heading/description split. — Consistent, predictable API across shared dialog/header components so existing callers don't break.
<!-- rule:2967 -->
- Keep `wagtail/admin/templates/wagtailadmin/reports/` templates generic over log-entry records — don't `isinstance`-branch or unpack instance-specific properties. Need per-type display? Add one overridable hook on the shared base record (a method returning a template component, or a `display_label` property defaulting to current behavior) and call that from the template instead. — Preserves the directory path, the `isinstance`/subclass concern, the base-record hook options (`display_label`, template-component method), and default-to-existing-behavior guidance — the most project-specific parts. Frames the why around extensibility and additive changes rather than a rule mandate.
    Rendering logic tied to concrete log-entry subclasses forces every new entry type to touch the report templates; a single base-record hook keeps new types additive and lets third-party models extend display without forking Wagtail.

## General

<!-- rule:405 -->
- 
<!-- rule:2602 -->
- Gate provider-specific copy in `account.html` and `settings_panels/avatar.html` behind the active-provider check (e.g. `avatar_choice`) — unconditional mentions confuse users who never enabled that provider. — Third-party provider names, terms, and setup instructions are irrelevant (and misleading) to users who haven't selected that provider; conditionally rendering them keeps the default UI neutral while preserving guidance for the active provider, including tooltip notes about auto-imported assets.

<!-- /braindump -->