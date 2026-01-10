# Sofia Core Distribution — Final System Layer

## Purpose
The Sofia Core Distribution layer defines how the entire backend architecture is delivered as a complete, unified system.  
It sits above the package, index, manifest, API, pipeline, and engine layers.

## Contents
- `distribution_manifest.json` — authoritative declaration of the full distribution  
- Subsystem list  
- Entrypoint mapping  
- Compatibility metadata  
- Governance strictness  

## Role in the Architecture
This is the highest-level declaration in the Sofia Core backend.  
It tells external systems:

- what Sofia Core contains  
- how it should be loaded  
- what version it is  
- which subsystems are active  
- what compatibility guarantees exist  

## Maintainer
Emerald Estates® — Sofia Core Governance
