# Constraint Engine — Sofia Core Governance

## Purpose
The Constraint Engine enforces Sofia’s **non‑negotiable boundaries**:  
safety, identity integrity, output‑format rules, and operational hard stops.  
It overrides all other engines when a violation is detected.

## Modules

| File                            | Purpose                                                    |
|--------------------------------|------------------------------------------------------------|
| `constraint_engine_spec.json`  | Defines safety, identity, and format constraint rules      |
| `constraint_engine_runtime.ts` | Enforces constraints and rejects violations at runtime     |
| `constraint_engine.test.ts`    | Validates enforcement logic and boundary correctness       |

## Enforcement Logic
- Validates safety within defined min/max  
- Enforces identity‑lock when enabled  
- Enforces output‑format rules  
- Rejects any violation when hard‑stop mode is active  
- Logs constraint events when enabled  

## Activation
Once all modules are committed and tests pass, the Constraint Engine becomes active within Sofia Core’s output pipeline.

## Maintainer
Emerald Estates® — Sofia Core Governance
