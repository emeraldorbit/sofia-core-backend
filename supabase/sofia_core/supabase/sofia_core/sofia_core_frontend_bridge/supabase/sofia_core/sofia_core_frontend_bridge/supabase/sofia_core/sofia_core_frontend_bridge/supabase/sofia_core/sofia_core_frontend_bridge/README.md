# Sofia Core Frontend Bridge — Callable Interface Layer

## Purpose
The Frontend Bridge exposes the Sofia Core backend to any interface or application.  
It provides a clean, stable, and context-aware way to invoke the API and pipeline.

## Modules

| File                       | Purpose                                           |
|---------------------------|---------------------------------------------------|
| `frontend_bridge_spec.json`  | Defines the callable surface and capabilities     |
| `frontend_bridge_runtime.ts` | Implements the frontend wrapper and context flow  |
| `frontend_bridge.test.ts`    | Validates invocation, metadata, and context logic |

## Exposed Functions
- **callSofiaAPI(input, context)** — invokes the full Sofia API handler  
- **callPipelineDirectly(input, context)** — runs the governance pipeline directly  
- **metadata** — version and maintainer information  

## Role in the Architecture
This layer is the bridge between the backend and any UI, service, or client.  
It ensures consistent invocation, context injection, and stable integration.

## Maintainer
Emerald Estates® — Sofia Core Governance
