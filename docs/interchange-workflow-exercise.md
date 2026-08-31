# Six-record interchange workflow exercise

This bounded exercise applies the experimental resolver to repository-owned examples. It evaluates current behavior; it does not define a payload schema, stable protocol, compatibility promise, or adoption claim.

## Examples

The fixtures in `examples/interchange-workflows/` cover:

| Fixture | Purpose | Deliberate distinction |
| --- | --- | --- |
| `mix-note.json` | Exchange terse production instructions while retaining semantic IDs | Low shelf is not high-pass; high shelf is not low-pass |
| `issue-report.json` | Report absent visual assets without losing identity or accessible output | Band-pass remains distinct from band-stop |
| `structured-metadata.json` | Carry application parameters beside, not inside, registry identity | Gain sign does not redefine shelf identity |
| `accessible-output.json` | Verify visible fallbacks and spoken labels against registry records | Text and speech are distinct presentation channels |
| `partial-asset-map.json` | Support the examples with only two of six asset references | Missing assets do not remove ID, text, or speech |

Every workflow fixture is marked `non_normative`. The supporting asset map contains only ID-to-reference pairs because the resolver rejects non-string map values. All fields other than `id`, plus every asset reference, are application-owned examples rather than proposed registry fields.

## Reproducible observations

Run `npm test` to repeat the assertions. Run `npm run interchange -- <IDs...>` to inspect resolver output.

| Check | Result | Limitation |
| --- | --- | --- |
| Canonical-ID round trip | All six exact ASCII IDs survive JSON serialization, parsing, and resolver lookup unchanged | This tests repository fixtures, not transport stacks or third-party implementations |
| Fallback resolution | All six IDs resolve to the record-owned fallback; shelves emit `LOW SHELF` and `HIGH SHELF`, never unsupported abbreviations | Resolution demonstrates implementation behavior, not external usage |
| Shelf/pass distinction | Four adjacent shelf/pass concepts retain four distinct IDs, fallbacks, and speech labels | No user-recognition claim follows |
| Unknown ID | `asr:filter.not-a-record` fails explicitly | There is no extension or negotiation mechanism |
| Absent assets | With two mapped assets, all six outputs retain ID, text, and speech; four omit `asset_ref` | The prototype does not fetch or verify asset existence |
| Speech/text mismatch | All six records intentionally use different visible and spoken strings | Host software remains responsible for preventing duplicate or misleading announcements |
| Discoverability | IDs are discoverable in the six-record table and `registry/symbols/`; the CLI requires the caller to supply an ID | There is no CLI listing/search command or registry discovery service |

The compact all-record measurements below count JavaScript string length. All measured strings are ASCII, so these counts are also Unicode scalar-value and UTF-8 byte counts for the strings themselves.

| Representation | Characters |
| --- | ---: |
| Six IDs joined with one space | 125 |
| Six fallbacks joined with one space | 36 |
| Six speech labels joined with comma-space | 106 |
| Compact JSON resolver output | 440 |

Individual values:

| ID | ID chars | Fallback | Fallback chars | Speech | Speech chars |
| --- | ---: | --- | ---: | --- | ---: |
| `asr:filter.band-pass` | 20 | `BPF` | 3 | `band-pass filter` | 16 |
| `asr:filter.band-stop` | 20 | `BSF` | 3 | `band-stop filter` | 16 |
| `asr:filter.high-pass` | 20 | `HPF` | 3 | `high-pass filter` | 16 |
| `asr:filter.high-shelf` | 21 | `HIGH SHELF` | 10 | `high-shelf filter` | 17 |
| `asr:filter.low-pass` | 19 | `LPF` | 3 | `low-pass filter` | 15 |
| `asr:filter.low-shelf` | 20 | `LOW SHELF` | 9 | `low-shelf filter` | 16 |

No token count is reported. The repository pins neither a tokenizer nor a model/version, and provider tokenization can change. A number produced from an unpinned local approximation would not be reproducible enough to support the stated comparison.

## Findings

Canonical IDs are the resolver's only input identity and the path this exercise round-trips across every example. Fallbacks are shorter, but this prototype emits them as presentation strings and does not accept them as resolver inputs. Speech is more verbose than visible fallback text and carries accessible wording. In the partial-map test, absent asset references do not remove identity, text, or speech; the prototype does not fetch or validate the referenced resources.

The examples also expose two limitations. First, callers need prior knowledge of an ID; documentation and source inspection are the only current discovery paths. Second, explicit failure on unknown IDs prevents silent substitution but offers no version negotiation or extension handling. These are appropriate observations for later experimentation, not authorization to create a stable protocol.

## Boundaries

- No Private Use Area value, font, Unicode lookalike, or glyph substitution is introduced.
- No telemetry, external deployment, participant activity, or adoption measurement occurred.
- No asset is accepted, published, fetched, or validated by this exercise.
- No record semantics, identifier, name, alias, fallback, speech label, status, or project position changes.
- No payload or resolver behavior is declared stable.
