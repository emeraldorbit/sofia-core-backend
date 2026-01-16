/**
 * capabilities.ts
 * Capability declaration for identity_filter
 */

import { EngineCapabilities } from '../sofia_core_application_shell/app_shell_capabilities';

export const capabilities: EngineCapabilities = {
  provides: [
    'identity-validation',
    'persona-boundary-enforcement',
    'constraint-checking'
  ],
  consumes: [
    'deviation-analysis',
    'drift-detection'
  ]
};
