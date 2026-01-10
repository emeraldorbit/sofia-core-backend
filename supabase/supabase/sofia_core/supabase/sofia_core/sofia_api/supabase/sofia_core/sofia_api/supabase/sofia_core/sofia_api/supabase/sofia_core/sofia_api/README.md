# Sofia API — Public Interface for Sofia Core

## Purpose
The Sofia API exposes the full Sofia Core governance pipeline as a clean, stable, external interface.  
It validates incoming requests, invokes the pipeline integrator, and returns the final sealed output.

## Modules

| File                     | Purpose                                           |
|--------------------------|---------------------------------------------------|
| `sofia_api_spec.json`    | Defines API contract, schema, and error model     |
| `sofia_api_runtime.ts`   | Implements request handling and pipeline wrapper  |
| `sofia_api.test.ts`      | Validates API behavior and error handling         |

## API Behavior
- Validates request schema  
- Ensures pipeline integrity  
- Invokes the full engine chain  
- Returns final sealed output  
- Provides structured error responses  

## Request Schema
- `input_text`: string  
- `context`: object  

## Response Schema
- `final_output`: string  
- `engine_trace`: object  

## Maintainer
Emerald Estates® — Sofia Core Governance
