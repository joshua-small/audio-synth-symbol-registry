# Open Audio and Synthesis Symbol Registry

An evidence-led, open registry for stable audio and synthesis symbols.

## Status

Registry release: **0.4.2**\
Schema release: **0.4.0**\
Tooling release: **0.8.0**\
Artwork release: **not yet published**  
Standards status: **Unicode preparatory research only. No submission has been made.**

The project begins with a reviewable semantic registry and evidence corpus. It does not claim that any symbol will be encoded in Unicode.

## Initial scope

The active research set is deliberately narrow:

- High-pass filter
- Low-pass filter
- Band-pass filter
- Band-stop filter
- Low-shelf filter
- High-shelf filter

These are candidate semantic entries, not proposed Unicode characters. A compact axis-less response curve may be documented as a representative rendering. Axis-bearing response graphs are illustrative variants unless evidence establishes a distinct semantic need.

Potential later work includes bell/peak, all-pass, tilt, waveform, routing, dynamics, polarity, phantom power, and other audio or synthesis symbol families. Each requires separate evidence review.

## Interchange model

Each entry has an ASCII identifier, human-readable name, aliases or related terms, text fallback, accessibility speech label, evidence references, confidence, open questions, and optional neutral original artwork.

```text
ID: asr:filter.high-pass
Text fallback: HPF
Speech: high-pass filter
```

An `asr:` identifier is provisional while a record is `evidence-collecting` or `registry-candidate`. It becomes permanent at `registry-accepted`. The identifier and text fallback are portable. A rendered glyph is optional and must not carry undefined semantic information.

See the [experimental interchange prototype](docs/interchange-prototype.md) for a runnable demonstration using all six current records.

## What this is not

- A catalog of vendor UI screenshots
- A replacement for IEC, ISO, AES, MIDI, OSC, SMuFL, or Unicode
- A claim that a visual drawing alone is a character
- A Unicode emoji proposal
- A private-use-area encoding scheme

## Versioning

This repository follows [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html). Registry data, schema, artwork, and tooling have independent version metadata. A registry release may include records at any status; the accepted repertoire is the `registry-accepted` subset. See [docs/versioning.md](docs/versioning.md).

[`registry/registry-metadata.json`](registry/registry-metadata.json) is authoritative for the registry, schema, assessment, artwork, and tooling artifact versions. Repository validation checks this README's registry release against that metadata.

## Licensing

See [LICENSES.md](LICENSES.md). Registry data and original neutral SVGs are CC0-1.0, tooling is Apache-2.0, and prose documentation is CC-BY-4.0.

## Repository layout

| Path | Purpose |
| --- | --- |
| `registry/` | Canonical machine-readable records and schema |
| `evidence/` | Source ledger, provenance, and review notes |
| `artwork/` | Original neutral SVG reference artwork |
| `docs/` | Decisions, methodology, accessibility, and proposal preparation |
| `tooling/` | Validation and generation tools |
| `tests/` | Schema and data validation |

## Standards path

The project will build a public evidence corpus before preparing any external submission to Unicode's Script Encoding Working Group. The unresolved question is whether this repertoire represents stable characters needed for public plain-text interchange rather than primarily UI graphics.

- [Unicode character proposal FAQ](https://www.unicode.org/faq/char_proposal.html)
- [Unicode Script Encoding Working Group guidelines](https://sew.unicode.org/guidelines)
- [Unicode symbol submission guidance](https://unicode.org/pending/symbol-guidelines.html)
- [Unicode pipeline](https://www.unicode.org/alloc/Pipeline.html)

See the [Unicode proposal critical-path audit](docs/unicode-proposal-critical-path-audit.md) for the current requirements map, evidence gaps, and internal work priorities. Formal proposal status remains `HOLD`.

Adjacent communities and projects:

- [SMuFL](https://www.smufl.org/)
- [SMuFL contribution process](https://www.smufl.org/contribute/)
- [FontAudio](https://github.com/fefanto/fontaudio)

See the [synergistic applications roadmap](docs/synergistic-applications-roadmap.md) for a conservative comparison of registry-first interchange, typography, AES, ISO/IEC, SMuFL, Unicode, emoji, and future-family paths.

## Participate

Read [CONTRIBUTING.md](CONTRIBUTING.md), [GOVERNANCE.md](GOVERNANCE.md), [AGENTS.md](AGENTS.md), and the [decision log](docs/decision-log.md) before contributing evidence, artwork, or candidate entries.
