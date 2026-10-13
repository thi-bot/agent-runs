<!-- braindump: rules extracted from PR review patterns -->

# django/core/management/ Guidelines

## Error Handling

<!-- rule:4014 -->
- In `TemplateCommand` (`django/core/management/templates.py`), validate `startapp`/`startproject` target directory names as importable modules and raise `CommandError` on conflicts (e.g. `os`) — prevents shadowing stdlib/site-packages modules on import — A project/app named `os` or `sys` shadows the real module at import time, so the user's code silently breaks or fails to import; checking before `os.makedirs` (even when the directory already exists, since the shadowing risk is the same) catches this at command time. Only skip the check when the caller explicitly opts into the namespace-package/overlay case (empty package spec), where no top-level module is created.
<!-- rule:5943 -->
- For outbound downloads in `django/core/management/` code, use `urllib.request.build_opener(addheaders=[('User-agent', 'Django/%s' % get_version())])` and call `opener.open(url)` — `urlretrieve` or bare `urlopen(Request(...))` skip the Django User-Agent that upstream servers and logs expect. — Identifies Django to remote servers and keeps download behavior consistent across management commands. Wrap the download and subsequent file-write in `OSError` handling so network/filesystem failures surface through Django management command error conventions instead of leaking raw tracebacks.

## API Design

<!-- rule:4990 -->
- In Django management commands, treat each `--ignore`/`--exclude` value as a complete literal path/name and match it against the full candidate path (e.g. `dirpath`), like `makemessages --ignore` — don't split on commas (use `[dir.strip() for dir in options['exclusions']]`), so directory names containing commas stay usable. — Splitting on commas silently breaks any directory whose name contains a comma, and matching against path components rather than the full candidate path diverges from `makemessages --ignore` semantics — inconsistent behavior across management commands will confuse users.
<!-- rule:3760 -->
- Recurse into `_SubParsersAction.choices` when introspecting parsers in `django/core/management`, treating each `_SubParsersAction` as a container and yielding only leaf actions — `parser._actions` alone omits subparser args, and yielding the sub-parser's `dest` would inject a bogus CLI option (breaks `call_command`). — `call_command` builds its kwargs from parser actions; missing subparser-level args silently drops valid options, while exposing the `_SubParsersAction.dest` as if it were an option breaks callers. Handling nested subparsers recursively (test at least two levels deep) keeps introspection correct as command trees grow.

## General

<!-- rule:1981 -->
- Inject only models from installed apps into the shell namespace; keep extra imports opt-in — hardcoded convenience imports in `django/core/management/commands/shell.py` burden every user and can't be removed without breaking them. Route them through `SHELL_IMPORTS`/`SHELL_DEFAULT_IMPORT`, or override `get_namespace()` in `django/core/management/helper.py` for preprocessing. — The default shell namespace is shared by all users; hardcoding non-model imports pollutes it for everyone and creates backwards-compat hazards when removing them later. The opt-in mechanism lets consumers pay the cost only when they want it.

## File-Specific Rules

### `django/core/management/__init__.py`

<!-- rule:685 -->
- In `ManagementUtility.execute`/`fetch_command` (`django/core/management/__init__.py`), defer `ImproperlyConfigured` output and `sys.exit(1)` until after command resolution and close-match suggestions run — otherwise `Did you mean ...?` hints are lost whenever settings are misconfigured — Ordering matters here: raising or exiting on settings errors too early skips close-match suggestions that users rely on. Pushing the error onto `self.settings_exception` lets dispatch emit it at the right moment, and exempting `startproject`/`startapp`/`makemessages` keeps project-bootstrapping commands working without configured settings.
  - Store settings errors on `self.settings_exception` in dispatch instead of printing from `BaseCommand.execute()` — keeps error ordering under `ManagementUtility`'s control
  - Only emit settings errors for commands outside the no-settings set (`startproject`, `startapp`, `makemessages`) — those must run before a settings module exists

### `django/core/management/base.py`

<!-- rule:5875 -->
- Name `BaseCommand` CLI-arg suppression hooks `suppressed_*` (e.g. `suppressed_arguments`, `suppressed_base_arguments`) and default them to empty `set()` in `django/core/management/base.py` — never `disabled_*` lists. The `suppressed_*` prefix is greppable and self-documenting, and `set()` gives O(1) membership checks plus automatic dedupe when subclasses contribute overlapping opt-outs; list-based `disabled_*` invites duplicate entries and linear scans. — Naming these hooks `disabled_*` lists would diverge from Django's established `BaseCommand` convention of `suppressed_*` attributes defaulting to `set()`, breaking greppability and subclass overrides while reintroducing linear membership scans and silent duplicate opt-out entries that the set-based form prevents.
<!-- rule:5876 -->
- Suppress inherited CLI args with `help=argparse.SUPPRESS`; centralize the filtering in `add_base_argument` (`django/core/management/base.py`) — Keeps shared subcommand help clean without a separate `name` parameter — scan dash-prefixed option strings in `*args` and stop at the first non-option argument; document that positional args are unsupported.

### `django/core/management/color.py`

<!-- rule:5400 -->
- In `django/core/management/color.py`, detect Windows VT support with a runtime `ctypes` check of `ENABLE_VIRTUAL_TERMINAL_PROCESSING` for the active console, not the Windows Registry — registry/env flags can be globally enabled while the current terminal lacks VT, so trusting them emits garbled escape codes. — Checking the active console at runtime prevents Django from emitting raw ANSI escape codes as literal garbage when Windows global/registry or environment flags claim VT support is enabled but the terminal the process is actually attached to does not honor it.

### `django/core/management/templates.py`

<!-- rule:5183 -->
- Gate app-only template context keys like `app_python_path` on `app_or_project == 'app'` using conditional dict unpacking in `django/core/management/templates.py` — keeps app-specific variables out of project templates, so each template type only sees context it can actually use. — Passing app-only keys unconditionally pollutes project template context with variables that don't apply, which can mislead template authors and break rendering paths that assume a variable's presence implies a matching template type.

### `django/core/management/utils.py`

<!-- rule:6247 -->
- Name parsing helpers after every label type they accept — e.g. `parse_apps_and_model_labels` in `django/core/management/utils.py`, not `parse_model_labels`. — Callers reading the name immediately see that both app labels and model labels are valid inputs, so they don't wrongly assume only model labels are supported or pass the wrong identifier form.

<!-- /braindump -->