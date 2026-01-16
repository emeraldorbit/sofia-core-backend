/**
 * capabilities.ts
 * Capability declaration for sofia_api
 */

import { EngineCapabilities } from '../sofia_core_application_shell/app_shell_capabilities';

export const capabilities: EngineCapabilities = {
  provides: [
    'public-api',
    'request-handling',
    'response-formatting'
  ],
  consumes: []
};
