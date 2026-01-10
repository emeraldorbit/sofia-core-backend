# Sofia Core — Release Notes v1.0.1

## Overview
Version 1.0.1 introduces the full integration of the Deviation Engine, completing the triad of implementation, specification, and testing required for stable system‑wide reasoning.

This release finalizes Issue #2 and establishes deviation tracking as a first‑class signal within the Sofia Core pipeline.

---

## Key Additions

### 1. Deviation Engine
A new foundational engine responsible for:
- drift measurement  
- directional analysis  
- alert thresholds  
- stability scoring  
- event history tracking  

This engine provides quantitative signals consumed by:
- membrane_engine  
- identity_filter  
- tonal_engine  

### 2. Full Specification
`deviation_engine_spec.json` defines:
- inputs  
- state fields  
- outputs  
- thresholds  
- behavioral rules  

### 3. Test Suite
`deviation_engine.test.ts` validates:
- deviation updates  
- direction detection  
- alert triggering  
- stability scoring  
- history event structure  
- compute() output integrity  

### 4. Global Registration
The engine is now registered in:
`supabase/sofia_core/sofia_core_index.ts`

under the key:
`deviation_engine`

### 5. Documentation Updates
Both `GLOBAL_README.md` and `MASTER_INDEX.md` now include:
- engine description  
- features  
- file structure  
- registration details  

---

## Impact
This release strengthens the internal coherence of Sofia Core by introducing a stable, quantitative drift signal that other engines can rely on.  
It also completes the structural requirements for engine lifecycle consistency: implementation → spec → tests → registration → documentation.

---

## Version
**Current Version:** 1.0.1  
**Previous Version:** 1.0.0  
