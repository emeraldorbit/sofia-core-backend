# Sofia Core — Master Index

## Purpose  
This document provides a complete architectural map of the Sofia Core backend.  
It links every subsystem, describes their roles, and defines the full governance pipeline.

---

## Subsystems

1. **Sofia API**  
   - **Purpose**: Handles public API requests and responses.  
   - **Directory**: `sofia_api/`

2. **Sofia Core Index**  
   - **Purpose**: Unified export surface for all modules.  
   - **Directory**: `sofia_core_index/`

3. **Deviation Engine**  
   - **Purpose**: Detects semantic drift and alignment errors.  
   - **Directory**: `deviation_engine/`

4. **Identity Filter**  
   - **Purpose**: Ensures persona, tone, and identity consistency.  
   - **Directory**: `identity_filter/`

5. **Membrane Engine**  
   - **Purpose**: Manages conversational boundaries and semantic flow.  
   - **Directory**: `membrane_engine/`

6. **Tonal Engine**  
   - **Purpose**: Modulates emotional tone and resonance.  
   - **Directory**: `tonal_engine/`

7. **Pipeline Integrator**  
   - **Purpose**: Orchestrates the entire engine chain in defined order.  
   - **Directory**: `pipeline_integrator/`

8. **Application Shell**  
   - **Purpose**: Provides runtime container and lifecycle hooks.  
   - **Directory**: `sofia_core_application_shell/`

9. **Distribution Layer**  
   - **Purpose**: Handles deployment, packaging, and release logic.  
   - **Directory**: `sofia_core_distribution/`

10. **Frontend Bridge**  
    - **Purpose**: Connects backend logic to frontend interfaces.  
    - **Directory**: `sofia_core_frontend_bridge/`

---

## Execution Flow

1. `sofia_api`  
2. `identity_filter`  
3. `deviation_engine`  
4. `membrane_engine`  
5. `tonal_engine`  
6. `pipeline_integrator`  
7. `sofia_core_index`  
8. `sofia_core_application_shell`  
9. `sofia_core_distribution`  
10. `sofia_core_frontend_bridge`

---

## Maintainer  
**Emerald Estates® — Sofia Core Governance**
