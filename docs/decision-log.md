# Decision Log

Use ISO 8601 timestamps with an explicit numeric UTC offset.

| ID | Date | Status | Decision | Revisit trigger |
| --- | --- | --- | --- | --- |
| D-001 | 2026-08-29T14:59:17-07:00 | Accepted | Start with high-pass, low-pass, band-pass, and band-stop filter responses. | New evidence shows a core member is unstable or missing. |
| D-002 | 2026-08-29T14:59:17-07:00 | Accepted | Treat axis-bearing response graphs as illustrative variants, not independent registry entries. | Repeated standalone use establishes a distinct semantic identity. |
| D-003 | 2026-08-29T14:59:17-07:00 | Accepted | Build an open registry and evidence corpus before pursuing Unicode submission. | Evidence packet and review support a preliminary Unicode inquiry. |
| D-004 | 2026-08-29T14:59:17-07:00 | Accepted | Keep broader audio and synthesis symbols in a separately reviewed future-scope backlog. | A family meets the registry evidence threshold. |
| D-005 | 2026-08-29T14:59:17-07:00 | Accepted | Do not use PUA assignments as canonical identifiers or imply Unicode encoding. | A separate, clearly experimental interoperability use case is approved. |
| D-006 | 2026-08-29T15:33:43-07:00 | Accepted | Use GitHub for registry source and review; use Trello for project planning and reports. | Tool capabilities or project workflow materially change. |
| D-007 | 2026-08-29T15:41:23-07:00 | Accepted | Version the registry, schema, artwork package, and tooling with Semantic Versioning 2.0.0. | Release practice exposes a needed refinement. |

## Entry template

```md
## D-XXX: Short decision title

- Date: YYYY-MM-DDTHH:MM:SS-07:00
- Status: Proposed | Accepted | Superseded | Rejected
- Owner: @username
- Decision:
- Evidence:
- Counterevidence or objections:
- Alternatives considered:
- Consequences:
- Revisit trigger:
```
