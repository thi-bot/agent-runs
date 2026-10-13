<!-- braindump: rules extracted from PR review patterns -->

# wagtail/images/ Guidelines

## API Design

<!-- rule:2969 -->
- In Wagtail admin duplicate-detection views (`wagtail/images/views/images.py`, `wagtail/images/views/multiple.py`), when an upload is flagged as a duplicate, surface a direct link/button to a filtered listing of the matches, and scope both the matches and that listing to objects the current user has `choose` permission for — otherwise users see false "duplicate" dead-ends or leak objects they can't act on. — A dead-end duplicate warning forces users to hunt manually; an unfiltered match list both misleads (matches they can't select) and leaks existence/permissions of objects they can't `choose`.
<!-- rule:2994 -->
- Default Wagtail rendition regeneration commands to purge-then-regenerate, not get-or-create — `get_rendition()` reuses an existing DB row even when the underlying file is missing, so only deleting the row forces the file to be rebuilt. — Accessors like `get_rendition()` short-circuit on an existing DB row, so the get-or-create path silently preserves broken or empty files; as a default for management commands in this directory (and future derived-asset regeneration commands), deleting the row + file guarantees regeneration. Applies to Wagtail image rendition mgmt commands only.

## Error Handling

<!-- rule:1912 -->
- Dispatch on `output_format` first in `wagtail/images/models.py`/`image_operations.py`, then check `hasattr(willow, 'save_as_<format>')` inside the branch — keeps the dispatch table complete and lets unsupported formats fall through to a warning instead of being silently dropped. — Compressed four related requirements into short imperative bullets, preserving Willow-specific identifiers (`save_as_heic`/`save_as_heif`, `hasattr(willow, 'save_as_<format>')`, `output_format`, PNG, and the two Wagtail image module files) and adding one-line why's: AttributeError risk, silent format changes, and dispatch readability.
  - Call Willow's documented `save_as_<format>` methods exactly as named (e.g., `save_as_heic`, not `save_as_heif`) — Willow does not aliases these, so guessing the name raises `AttributeError` at save time.
  - When a requested Willow format is unavailable, fall back to a known-good format such as PNG and emit a warning naming both the requested format and the fallback — otherwise users see a silently different output format and can't diagnose it.
  - Do not fold the `hasattr(willow, ...)` capability check into the format-branch condition — keeping it inside the branch preserves the fallback path and keeps the dispatch logic readable.
<!-- rule:2411 -->
- Compute the effective pixel cap in Wagtail image validation as `min(WAGTAILIMAGES_MAX_IMAGE_PIXELS, PILImage.MAX_IMAGE_PIXELS)` (ignoring `None`) — the setting should only ever tighten, never loosen, Pillow's DecompressionBomb guard. — Pillow's protection is a security floor; treating the Wagtail setting as an override in either direction would let a high `WAGTAILIMAGES_MAX_IMAGE_PIXELS` disable the bomb guard and open a DoS vector.

## General

<!-- rule:827 -->
- Project rules for `wagtail/images` (image filters, settings, multi-format output functions): — Per-format quality keys prevent cross-format mis-tuning; separate parameters avoid silently inheriting a sibling's tuning; Willow-aligned defaults keep output predictable.
  - Resolve encoding quality from the setting for the image's *actual* format — `WAGTAILIMAGES_JPEG_QUALITY`, `WAGTAILIMAGES_AVIF_QUALITY`, `WAGTAILIMAGES_WEBP_QUALITY` — since a single generic quality value silently mis-tunes every other encoder.
  - Give each format its own parameters and defaults (`avif-quality` in the AVIF branch, a JXL-appropriate quality in the JXL branch); copying a sibling format's option key or tuned default corrupts the new branch's output.
  - Default these to the underlying Willow encoder defaults (80/85) unless there's a documented reason to deviate — keeps Wagtail's output aligned with what the encoder was tuned for.
<!-- rule:2202 -->
- Test `Wagtail` admin image thumbnails with both tall and wide aspect ratios — mixed sizes overflow or collapse table cells and misalign adjacent text, which only shows up when one dimension dominates. — This applies to preview/table-cell templates under the Wagtail image admin templates directory, not globally.
<!-- rule:835 -->
- In `wagtail/images/` extension lists and lookup mappings, prefix extension values with a leading dot (e.g. `".jpg"`) and insert new entries into default lists like `WAGTAILIMAGES_EXTENSIONS` in their expected position — tests assert on the default extension ordering, so appending will break them. — Lookup mappings expect dotted extensions, and tests assert on `WAGTAILIMAGES_EXTENSIONS` order, so appending new entries silently breaks them.

## File-Specific Rules

### `wagtail/images/__init__.py`

<!-- rule:1417 -->
- Follow the `get_upload_to` / `get_rendition_upload_to` pattern for settings-backed helpers in `wagtail/images/__init__.py`: accept an optional `instance` arg, delegate to an instance method when given, else read the global setting with a fallback — lets subclasses override per-instance without global state. — Preserves backwards-compatible module-level API while allowing instance-level (e.g. per-storage) overrides via subclassing.

### `wagtail/images/blocks.py`

<!-- rule:1619 -->
- In `ImageBlock` (`wagtail/images/blocks.py`), pass the alt text through unchanged (including `None`) and raise `StructBlockValidationError` when it's missing while `decorative` is false — Preserves the invalid state so it stays detectable by `StructBlockValidationError`; substituting `""` would silently swallow a real authoring error and defeat the validation contract.
  - Substitute `""` for alt text only when `decorative` is true — masking a missing alt in the non-decorative case hides an invalid state that validation is meant to surface

### `wagtail/images/models.py`

<!-- rule:923 -->
- Keep `get_rendition` and `get_renditions` in `wagtail/images/models.py` behaviorally in sync — when adding input validation or `Filter` handling to one, mirror it in the other or extract a shared helper; divergent handling makes bulk and single retrieval accept different inputs, surprising callers. Update each method's docstring to list accepted inputs (e.g., spec strings and `Filter` instances for `get_renditions()`). — Prevents the bulk and single rendition APIs from drifting apart, keeps documented inputs matching actual behavior.

<!-- /braindump -->