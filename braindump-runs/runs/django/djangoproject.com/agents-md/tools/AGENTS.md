<!-- braindump: rules extracted from PR review patterns -->

# tools/ Guidelines

## Code Style

<!-- rule:338 -->
- Format multi-attribute SVG elements with one attribute per line and consistent indentation — keeps Jinja conditionals and diffs readable — Multi-attribute SVG elements, Jinja conditionals, and inline text styling are hard to diff and review; consistent line-per-attribute layout, comment-annotated conditional branches, and typography-based CSS classes make template changes easier to scan and keep visual styles reusable regardless of semantic intent.
  - Annotate conditional blocks in SVG templates with HTML comments naming the rendered element or role — makes `{% if %}`/`{% else %}` branches scannable
  - Style text in `tools/template.svg.jinja` via named CSS classes in the `<style>` block, chosen by visual typography (not semantic role) — visual reuse across semantically different elements
<!-- rule:347 -->
- In SVG timeline templates (e.g., `tools/template.svg.jinja`), bar `<rect>` elements must explicitly set `stroke="{{ colors.<bar_type> }}"` (matching the bar's type color, such as `colors.mainstream` for mainstream/extended-release bars) and a fixed `stroke-width` (e.g., `2`) — do not rely on fill alone to distinguish bars from the background. — The rule targets SVG timeline templates, with the evidence pointing to the `tools` directory (tools/template.svg.jinja). The phrasing 'e.g.' implies a class of timeline templates rather than a single file, so a directory-scoped AGENTS.md in `tools/` covers all such templates and is more findable for AI assistants working in that directory. It is narrower than root but broader than a single file, matching both the SVG-template-specific nature and the preference for broader placement when uncertai

## General

<!-- rule:337 -->
- In SVG/chart templates like `tools/template.svg.jinja`, position elements relative to an anchor or content region plus shared config offsets (`padding_top`, `legend_padding`) — never precomputed absolutes, hardcoded spacing, or bottom-edge anchoring. — Keeps spacing configurable and prevents legends from overlapping axis labels when layout shifts.
<!-- rule:331 -->
- Begin every standalone `tools/` script with a module docstring covering purpose, a `Usage:` line, each CLI arg with a concrete example value, and a `Behavior` section noting outputs — these scripts are run ad-hoc, so the docstring is the only place callers learn how to invoke them correctly. — tools/ scripts are run directly from the shell rather than imported, so nothing in the code path surfaces their interface; without an in-file docstring users must read the source to discover required arguments like `<YYYY-MM>` or where output lands, which leads to misinvocation and stray files.

## File-Specific Rules

### `tools/generate_release_roadmap.py`

<!-- rule:342 -->
- Keep SVG layout tunables (`pixels_per_year`, `bar_height`, `bar_v_spacing`, `legend_box_size`, `legend_padding`, `font_size`) as `CONFIG` entries in `tools/generate_release_roadmap.py` rather than inline literals — co-tuned values stay in one place, so adjusting one (e.g. bumping `font_size` to `18` for readability) keeps the roadmap visually consistent. — Layout values like bar height, spacing, and font size only look right relative to each other; scattering them inline makes them drift out of sync and makes global restyling error-prone.

<!-- /braindump -->