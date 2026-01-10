# Sofia Core Index — Unified Export Surface

## Purpose
The Sofia Core Index provides a single, stable entrypoint for the entire Sofia Core backend.  
It exposes all engines, the pipeline integrator, the public API handler, and version metadata.

## Modules

| File                          | Purpose                                           |
|------------------------------|---------------------------------------------------|
| `sofia_core_index_spec.json` | Defines what the index must expose                |
| `sofia_core_index.ts`        | Implements the unified export surface             |
| `sofia_core_index.test.ts`   | Validates index behavior and exported interfaces  |

## Exposed Components
- **engines** — all governance engines (resonance, identity, coherence, deviation, alignment, sealing)  
- **pipeline** — the full governance pipeline executor  
- **api** — the public Sofia API handler  
- **metadata** — version and maintainer information  

## Role in the System
This layer is the top of the Sofia Core backend.  
Everything above it — apps, services, clients — imports from here.

## Maintainer
Emerald Estates® — Sofia Core Governance
