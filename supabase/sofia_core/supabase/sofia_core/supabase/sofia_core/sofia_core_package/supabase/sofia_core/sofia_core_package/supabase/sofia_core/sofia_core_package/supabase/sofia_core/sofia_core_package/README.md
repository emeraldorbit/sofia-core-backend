# Sofia Core Package — Distribution Layer

## Purpose
The Sofia Core Package defines how the entire Sofia Core backend is exposed as an installable, importable module.  
It binds the unified index to package metadata, ensuring compatibility and stable exports.

## Modules

| File                | Purpose                                           |
|---------------------|---------------------------------------------------|
| `package_spec.json` | Defines package metadata and export structure     |
| `package_runtime.ts`| Implements the package export surface             |
| `package.test.ts`   | Validates package behavior and metadata           |

## Exposed Components
- **engines** — all governance engines  
- **pipeline** — full execution chain  
- **api** — public request handler  
- **metadata** — version and maintainer info  

## Role in the System
This layer is the bridge between Sofia Core’s internal architecture and any external environment that imports it.

## Maintainer
Emerald Estates® — Sofia Core Governance
