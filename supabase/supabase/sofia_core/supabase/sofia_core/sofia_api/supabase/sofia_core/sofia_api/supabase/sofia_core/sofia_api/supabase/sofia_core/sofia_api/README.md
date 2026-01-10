# Sofia Core API Layer

## Purpose
This module handles all external requests to Sofia Core.  
It validates input, routes requests to the pipeline, and returns structured output.

## Files

| File                  | Purpose                                  |
|-----------------------|------------------------------------------|
| `sofia_api_spec.json` | Defines API behavior and metadata        |
| `sofia_api_runtime.ts`| Implements request handling logic        |
| `sofia_api.test.ts`   | Validates API behavior and output        |

## Entry Function
- `handleSofiaRequest(input: object): object` — processes a request and returns structured output

## Maintainer
Emerald Estates® — Sofia Core Governance
