# Sofia Core Index — Unified Export Surface

## Purpose
The Sofia Core Index provides a single, stable entrypoint for the entire Sofia Core backend.  
It exposes all engines, the pipeline integrator, the public API handler, and version metadata.

## Files

| File                        | Purpose                                  |
|-----------------------------|------------------------------------------|
| `sofia_core_index_spec.json` | Declares indexed modules and metadata   |
| `sofia_core_index.ts`        | Implements unified export logic         |
| `sofia_core_index.test.ts`   | Validates exposure and structure        |

## Exported Object
`SofiaCore` — contains all modules and version info
