# AGENTS.md

Instructions for Codex and other agents working in this repository.

## Operating principle

Humans own intent and authority. Agents execute approved work, produce reviewable evidence, and never infer authority from an open Issue, an open pull request, or silence.

Proceed autonomously for routine implementation, research, validation, documentation, and review inside the established scope. Stop only for a real decision or authorization gate, not for ordinary mechanical work.

## Source of truth

- Registry semantics and evidence live in `registry/` and `evidence/`.
- Durable project decisions live in `docs/decision-log.md`.
- GitHub Issues track work; pull requests carry review evidence.
- Trello tracks project planning and cross-repository research.
- A chat instruction from Joshua is valid authorization when it is clearly responsive to a stated Human Review question. Record the resulting decision in the PR and decision log before merging or releasing.

## Versioning

Follow [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html) and `docs/versioning.md`.

Do not create a release or tag, change the compatibility policy, redefine a stable ID, or make an incompatible schema change without human authorization.

## Human review gates

Create a Human Review section in the pull request and pause merge only when work requires a decision about:

- Registry scope, a new semantic family, canonical identifier, canonical name, alias that changes semantic interpretation, or status promotion to `registry-accepted`
- Unicode, ISO, IEC, AES, SMuFL, vendor, community, or other external-standard position, outreach, submission, endorsement, or attribution claim
- Licensing, contributor agreement, copyright, trademark, or reuse of third-party material
- Public release, publication, governance change, security boundary, credentials, spending, destructive action, or account access
- Ambiguous, undocumented, contradicted, or unresolved behavior that materially affects semantics or interoperability

Routine evidence additions, typo corrections, tests, tools, documentation, and backwards-compatible schema work do not require human approval unless they trigger a gate above.

## Pull request protocol

For each nontrivial pull request:

1. Run relevant validation and record exact results and omissions.
2. Obtain an independent agent review when practical.
3. Add an `## Agent Report - YYYY-MM-DDTHH:MM:SS-07:00` section or comment with scope, evidence, validation, and limitations.
4. If a gate applies, add:

   ```md
   ## Human Review

   ### HR-001: Short decision question
   - Decision needed:
   - Recommendation:
   - Alternatives:
   - Consequence of each choice:
   - Merge status: blocked pending authorization
   ```

5. When Joshua answers in chat or on GitHub, add a dated PR comment summarizing the authorization, update `docs/decision-log.md` if it is durable, and then continue.
6. If no Human Review item remains and checks pass, agents may merge without waiting for ceremonial approval.

Use ISO 8601 timestamps with an explicit numeric UTC offset. Prefer Joshua's currently configured local timezone when available.

## Evidence and artwork

Separate observed fact, interpretation, open question, and recommendation. Preserve counterevidence. Use direct, durable sources where possible.

Do not copy, trace, or imply permission to use vendor, standards-body, or third-party artwork. Reference artwork must be original, neutral, editable SVG, and linked to an approved semantic record.

Do not claim Unicode encoding or proposal status without a documented decision and evidence.

## Focus and handoff

Keep changes focused. Do not silently rewrite unrelated work. Before finishing, review the complete diff, validate the affected paths, and state what was not validated.

If an action is blocked by an unavailable integration, report the exact capability gap and continue all safe work that does not require it.
