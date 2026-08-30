# Experimental interchange prototype

This prototype demonstrates how software can exchange the current registry records without depending on a font, a Unicode assignment, a Private Use Area code point, or a particular renderer.

It is an experiment, not a published interchange standard or compatibility promise. The four canonical ASCII IDs are provisional while their records remain `evidence-collecting`.

## Identity and presentation

The canonical identity is the registry ID. Text, speech, and an optional asset reference are presentation choices resolved from or alongside that ID:

| Canonical ID | Plain-text fallback | Speech label |
| --- | --- | --- |
| `asr:filter.low-pass` | `LPF` | `low-pass filter` |
| `asr:filter.high-pass` | `HPF` | `high-pass filter` |
| `asr:filter.band-pass` | `BPF` | `band-pass filter` |
| `asr:filter.band-stop` | `BSF` | `band-stop filter` |

An application can store or transmit:

```json
[
  { "id": "asr:filter.low-pass" },
  { "id": "asr:filter.high-pass" }
]
```

The prototype resolves those IDs to data already present in the registry:

```json
[
  {
    "id": "asr:filter.low-pass",
    "text": "LPF",
    "speech": "low-pass filter"
  },
  {
    "id": "asr:filter.high-pass",
    "text": "HPF",
    "speech": "high-pass filter"
  }
]
```

A renderer may supply its own asset mapping:

```json
{
  "asr:filter.low-pass": "app://theme/filter-low-pass.svg"
}
```

The returned `asset_ref` is optional presentation metadata. It does not replace the ID, alter semantics, imply registry approval of an asset, or require the referenced resource to exist outside the consuming application.

## Run the prototype

Install dependencies and validate the repository:

```sh
npm ci
npm test
```

Resolve IDs as structured JSON:

```sh
npm run interchange -- asr:filter.low-pass asr:filter.high-pass
```

Request the registry text fallbacks or speech labels:

```sh
npm run interchange -- --format text asr:filter.low-pass asr:filter.high-pass
npm run interchange -- --format speech asr:filter.low-pass asr:filter.high-pass
```

Supply an application-owned asset map:

```sh
npm run interchange -- --asset-map ./asset-map.json asr:filter.low-pass
```

Unknown IDs and unsupported formats fail explicitly. No glyph substitution is attempted.

## Boundaries

- No PUA value or Unicode lookalike is canonical interchange.
- No artwork or font is included.
- The prototype covers only the four current records.
- It does not change record status, semantics, aliases, or the project's Unicode `HOLD`.
- The JSON shown here is an example payload, not a versioned schema.
- A future stable protocol, schema, resolver contract, or asset URI policy would require separate compatibility and governance review.
