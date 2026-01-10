# Deviation Engine — Sofia Core Governance

## Purpose
The Deviation Engine regulates Sofia’s contextual variance, ensuring responses stay within safe, intentional deviation bands while still allowing creativity, abstraction, and adaptive expression.

## Modules

| File                           | Purpose                                                   |
|-------------------------------|-----------------------------------------------------------|
| `deviation_engine_spec.json`  | Defines deviation bounds and preferred variance bands     |
| `deviation_engine_runtime.ts` | Enforces deviation rules and flat‑response rejection      |
| `deviation_engine.test.ts`    | Validates enforcement logic and boundary correctness      |

## Enforcement Logic
- Validates deviation within global min/max  
- Validates deviation within the preferred band  
- Rejects flat responses when flagged  
- Logs deviation events when enabled  

## Activation
Once all modules are committed and tests pass, the Deviation Engine becomes active within Sofia Core’s output pipeline.

## Maintainer
Emerald Estates® — Sofia Core Governance
