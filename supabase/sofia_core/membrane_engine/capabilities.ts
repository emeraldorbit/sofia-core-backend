/**
 * capabilities.ts
 * Capability declaration for membrane_engine
 */

import { EngineCapabilities } from '../sofia_core_application_shell/app_shell_capabilities';

export const capabilities: EngineCapabilities = {
  provides: [
    'context-permeability-control',
    'membrane-tightening',
    'drift-aware-boundaries'
  ],
  consumes: [
    'deviation-analysis',
    'drift-detection'
  ]
};
