# Open Audio and Synthesis Symbol Registry

An evidence-led, open registry for stable audio and synthesis symbols.

## Status

Registry release: **0.1.0**  
Schema release: **0.1.0**  
Standards status: **Unicode preparatory research only. No submission has been made.**

The project begins with a reviewable semantic registry and evidence corpus. It does not claim that any symbol will be encoded in Unicode.

## Initial scope

The initial research set is deliberately narrow:

- High-pass filter
- Low-pass filter
- Band-pass filter
- Band-stop filter

These are candidate semantic entries, not proposed Unicode characters. A compact axis-less response curve may be documented as a representative rendering. Axis-bearing response graphs are illustrative variants unless evidence establishes a distinct semantic need.

Potential later work includes shelving, bell/peak, all-pass, tilt, waveform, routing, dynamics, polarity, phantom power, and other audio or synthesis symbol families. Each requires separate evidence review.

## Interchange model

Each entry has a durable ASCII identifier, human-readable name, aliases, text fallback, accessibility speech label, evidence references, and optional neutral original artwork.

```text
ID: asr:filter.high-pass
Text fallback: HPF
Speech: high-pass filter
```

The identifier and text fallback are portable. A rendered glyph is optional and must not carry undefined semantic information.

## What this is not

- A catalog of vendor UI screenshots
- A replacement for IEC, ISO, AES, MIDI, OSC, SMuFL, or Unicode
- A claim that a visual drawing alone is a character
- A Unicode emoji proposal
- A private-use-area encoding scheme

## Versioning

This repository follows [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html). The registry, schema, artwork package, and tooling are versioned independently. See [docs/versioning.md](docs/versioning.md).

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

The project will build a public evidence corpus before deciding whether to make a preliminary inquiry to Unicode's Symbol and Emoji Subcommittee. The unresolved question is whether this repertoire represents stable plain-text communication needs rather than primarily UI graphics.

- [Unicode character proposal FAQ](https://www.unicode.org/faq/char_proposal.html)
- [Unicode Symbol and Emoji Subcommittee guidelines](https://sew.unicode.org/guidelines)
- [Unicode symbol submission guidance](https://unicode.org/pending/symbol-guidelines.html)
- [Unicode pipeline](https://www.unicode.org/alloc/Pipeline.html)

Adjacent communities and projects:

- [SMuFL](https://www.smufl.org/)
- [SMuFL contribution process](https://www.smufl.org/contribute/)
- [FontAudio](https://github.com/fefanto/fontaudio)

## Participate

Read [CONTRIBUTING.md](CONTRIBUTING.md), [GOVERNANCE.md](GOVERNANCE.md), and the [decision log](docs/decision-log.md) before contributing evidence, artwork, or candidate entries.
