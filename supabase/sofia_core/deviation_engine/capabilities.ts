/**
 * capabilities.ts
 * Capability declaration for deviation_engine
 */

import { EngineCapabilities } from '../sofia_core_application_shell/app_shell_capabilities';

export const capabilities: EngineCapabilities = {
  provides: [
    'deviation-analysis',
    'drift-detection',
    'stability-scoring',
    'alert-thresholds'
  ],
  consumes: []
};
