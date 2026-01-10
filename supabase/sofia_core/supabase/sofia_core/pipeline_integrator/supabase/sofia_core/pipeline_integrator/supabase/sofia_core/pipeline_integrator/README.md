# Pipeline Integrator — Sofia Core Governance

## Purpose
The Pipeline Integrator orchestrates the entire Sofia Core governance chain.  
It executes each engine in the correct order, passes context between them, halts on failure when required, and delivers the final output to the Output Sealer.

## Modules

| File                              | Purpose                                                   |
|----------------------------------|-----------------------------------------------------------|
| `pipeline_integrator_spec.json`  | Defines engine order and orchestration rules              |
| `pipeline_integrator_runtime.ts` | Executes the full engine pipeline                         |
| `pipeline_integrator.test.ts`    | Validates pipeline behavior and failure handling          |

## Pipeline Logic
- Executes engines in defined order  
- Validates engine availability  
- Propagates output between stages  
- Halts pipeline on failure when enabled  
- Logs pipeline events when configured  

## Activation
Once all modules are committed and tests pass, the Pipeline Integrator becomes the central orchestrator of Sofia Core’s governance system.

## Maintainer
Emerald Estates® — Sofia Core Governance
