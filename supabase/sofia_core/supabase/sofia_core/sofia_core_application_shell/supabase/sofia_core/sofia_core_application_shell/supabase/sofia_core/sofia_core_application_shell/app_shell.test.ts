import { initializeSofiaAppShell, getAppEntry, appShellMetadata } from './app_shell_runtime';
import spec from './app_shell_spec.json';

describe('Sofia Core Application Shell', () => {
  test('metadata matches spec', () => {
    expect(appShellMetadata.version).toBe(spec.metadata.version);
    expect(appShellMetadata.maintainer).toBe(spec.metadata.maintainer);
  });

  test('initialization works', () => {
    const result = initializeSofiaAppShell({ test: true });
    expect(result.initialized).toBe(true);
    expect(result.context).toBeDefined();
    expect(result.helpers).toBeDefined();
  });

  test('app entry is exposed', () => {
    const entry = getAppEntry();
    expect(entry.initializeSofiaAppShell).toBeDefined();
    expect(entry.appShellMetadata).toBeDefined();
  });
});
