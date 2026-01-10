# Resonance Engine — Sofia Core Governance

## Purpose
The Resonance Engine regulates Sofia’s harmonic stability by managing **amplitude**, **coherence**, and **dissonance rejection**.  
It ensures that reasoning remains phase‑locked, rhythmically consistent, and free from destabilizing oscillations.

## Modules

| File                           | Purpose                                                   |
|-------------------------------|-----------------------------------------------------------|
| `resonance_engine_spec.json`  | Defines amplitude and coherence thresholds                |
| `resonance_engine_runtime.ts` | Enforces resonance rules and dissonance rejection         |
| `resonance_engine.test.ts`    | Validates enforcement logic and boundary correctness      |

## Enforcement Logic
- Validates amplitude within defined min/max  
- Validates coherence within defined min/max  
- Rejects dissonance when flagged  
- Logs resonance events when enabled  

## Activation
Once all modules are committed and tests pass, the Resonance Engine becomes active within Sofia Core’s output pipeline.

## Maintainer
Emerald Estates® — Sofia Core Governance
