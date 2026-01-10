# Sofia Core — Master Index

## Purpose
This document provides a complete architectural map of the Sofia Core backend.  
It links every subsystem, describes their roles, and defines the full governance pipeline.

---

## Subsystems

### 1. Resonance Engine
- Purpose: Establishes semantic resonance and meaning‑field stability.
- Directory: `resonance_engine/`

### 2. Identity Filter
- Purpose: Ensures persona, tone, and identity consistency.
- Directory: `identity_filter/`

### 3. Coherence Engine
- Purpose: Enforces logical, structural, and narrative coherence.
- Directory: `coherence_engine/`

### 4. Deviation Engine
- Purpose: Detects drift, hallucinations, and off‑spec behavior.
- Directory: `deviation_engine/`

### 5. Alignment Engine
- Purpose: Harmonizes all upstream engines into global alignment.
- Directory: `alignment_engine/`

### 6. Output Sealer
- Purpose: Finalizes, formats, and locks validated outputs.
- Directory: `output_sealer/`

### 7. Pipeline Integrator
- Purpose: Orchestrates the entire engine chain in defined order.
- Directory: `pipeline_integrator/`

---

## Execution Flow

1. resonance_engine  
2. identity_filter  
3. coherence_engine  
4. deviation_engine  
5. alignment_engine  
6. output_sealer  
7. pipeline_integrator (orchestrates all of the above)

---

## Maintainer
Emerald Estates® — Sofia Core Governance
