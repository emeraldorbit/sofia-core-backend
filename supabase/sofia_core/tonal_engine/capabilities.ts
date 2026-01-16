/**
 * capabilities.ts
 * Capability declaration for tonal_engine
 */

import { EngineCapabilities } from '../sofia_core_application_shell/app_shell_capabilities';

export const capabilities: EngineCapabilities = {
  provides: [
    'tone-modulation',
    'emotional-expression',
    'stylistic-consistency'
  ],
  consumes: [
    'deviation-analysis',
    'identity-validation',
    'persona-boundary-enforcement'
  ]
};
