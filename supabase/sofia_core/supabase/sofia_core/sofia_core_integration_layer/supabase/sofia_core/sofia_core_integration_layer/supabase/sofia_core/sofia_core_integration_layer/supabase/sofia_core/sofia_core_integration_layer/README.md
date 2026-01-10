# Sofia Core Integration Layer — Application Binding

## Purpose
The Integration Layer connects the Sofia Core Frontend Bridge to real application environments.  
It provides helper functions that allow UI components, services, and external systems to invoke Sofia Core cleanly and consistently.

## Modules

| File                     | Purpose                                               |
|--------------------------|-------------------------------------------------------|
| `integration_spec.json`  | Defines integration capabilities and configuration     |
| `integration_runtime.ts` | Implements integration helpers and binding logic       |
| `integration.test.ts`    | Validates integration behavior and helper exposure     |

## Exposed Helpers
- **integrateAPI(input, context)** — calls the Sofia API through the frontend bridge  
- **integratePipeline(input, context)** — runs the governance pipeline directly  
- **getIntegrationHelpers()** — exposes all integration utilities  
- **integrationMetadata** — version and maintainer information  

## Role in the Architecture
This layer is the final connective tissue between Sofia Core and any external environment.  
It ensures stable invocation, context handling, and helper exposure for real-world usage.

## Maintainer
Emerald Estates® — Sofia Core Governance
