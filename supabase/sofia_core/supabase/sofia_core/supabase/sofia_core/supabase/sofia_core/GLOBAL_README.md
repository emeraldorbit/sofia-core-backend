# Sofia Core — Global System Overview

## Purpose
This document provides the complete, top-level description of the Sofia Core system.  
It unifies every subsystem, layer, and architectural component into a single authoritative reference.

---

## What Sofia Core Is
Sofia Core is a multi-layered reasoning, governance, and identity engine designed for application integration.  
It includes:

- semantic engines  
- governance pipeline  
- API layer  
- packaging and distribution layers  
- frontend bridge  
- integration layer  
- application shell  
- universal bootstrap  

---

## Architectural Layers

### 1. Engines Layer
- resonance_engine  
- identity_filter  
- coherence_engine  
- deviation_engine  
- alignment_engine  
- output_sealer  

### 2. Pipeline Layer
- pipeline_integrator  

### 3. API Layer
- sofia_api  

### 4. Index Layer
- sofia_core_index  

### 5. Manifest Layer
- sofia_core_manifest  

### 6. Package Layer
- sofia_core_package  

### 7. Distribution Layer
- sofia_core_distribution  

### 8. Frontend Bridge
- sofia_core_frontend_bridge  

### 9. Integration Layer
- sofia_core_integration_layer  

### 10. Application Shell
- sofia_core_application_shell  

### 11. Universal Bootstrap
- sofia_core_bootstrap.ts  

---

## Initialization
Applications initialize Sofia Core using:

```ts
import { bootstrapSofiaCore } from './sofia_core_bootstrap';

const sofia = bootstrapSofiaCore({ app: 'example' });
