<!-- braindump: rules extracted from PR review patterns -->

# docs/releases/ Guidelines

## Documentation

<!-- rule:2942 -->
- Describe bugs in `docs/releases/*.txt` release notes by root cause + enumerate all user-visible symptoms with concrete thresholds — readers hitting the same bug through a different path must recognize themselves; a single repro path or vague wording hides applicability. — Release notes are how affected users confirm the bug matches their case. Describing only one symptom or using imprecise language leaves users with other manifestations unaware the fix applies to them.
<!-- rule:3385 -->
- In template-syntax release notes, name the new construct, block, and template in prose; cover both direct overrides and `{% extends '...' %}` inheritors — inheritors never see the parent's code example and may miss the new behavior. Explain permissiveness changes and update contradicting reference docs. — Older templates can silently gain or break behavior when syntax becomes more permissive; naming the block and template in prose lets inherited-template users find the change, and syncing reference docs prevents contradictory guidance.
<!-- rule:2915 -->
- In `docs/releases/*.txt`, name protocols/headers explicitly (e.g., HTTP `Accept`), not vague terms like 'client preference' — precision pinpoints exactly what behavior changed — Release notes are an API contract surface: users read `docs/releases/*.txt` to decide whether to upgrade. Vague phrasing like 'client preference' hides the actual protocol-level change, and describing a change the code doesn't perform (missing `protocol_version` set, unhandled HTTP/1.1 `Content-Length`) causes debugging churn when users rely on the notes.
  - Verify each documented change is implemented (`protocol_version`, HTTP/1.1 `Content-Length`) — notes that don't match shipped code mislead API consumers
<!-- rule:5637 -->
- Write `all intermediate directories` instead of `parents` in `docs/releases` notes — `parents` is ambiguous about which directories need permissions on the path (e.g. a Django installation path) — Release notes for filesystem permission bugfixes must make it clear that access requires permissions on every directory along the path — phrasing like `parents` leaves users unsure whether a single parent or every intermediate directory is meant, causing confusion when they hit the bug being documented.
<!-- rule:2943 -->
- Scope release-note claims and fixes in `docs/releases/*.txt` to the confirmed affected field/backend — widening to all fields that share an underlying representation before the broader failure is reproduced overstates the fix's reach and adds complexity it hasn't earned. — Release notes are read as a record of what actually broke and was fixed; claims that outrun the reproduced evidence mislead users into upgrading for bugs that were never confirmed, and the code churn to support them is rarely justified.
<!-- rule:3319 -->
- Reference patches in `docs/releases/*` with the full 40-char SHA via `:commit:` — verify each version's hash against its own patch commit. — Reused, abbreviated, or copied-from-neighbor hashes produce wrong or broken patch links in release and security notes, misleading users about what actually shipped.

<!-- /braindump -->