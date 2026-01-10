import spec from './app_shell_spec.json';
import { getIntegrationHelpers } from '../sofia_core_integration_layer/integration_runtime';

let initialized = false;

export const appShellMetadata = {
  version: spec.metadata.version,
  maintainer: spec.metadata.maintainer
};

export function initializeSofiaAppShell(context: object = {}) {
  if (!spec.application_shell.auto_initialize) {
    throw new Error('Auto-initialization disabled in spec');
  }

  const helpers = getIntegrationHelpers();

  initialized = true;

  return {
    initialized,
    context,
    helpers
  };
}

export function getAppEntry() {
  if (!spec.application_shell.expose_app_entry) {
    throw new Error('Application entry not exposed');
  }

  return {
    initializeSofiaAppShell,
    appShellMetadata
  };
}
