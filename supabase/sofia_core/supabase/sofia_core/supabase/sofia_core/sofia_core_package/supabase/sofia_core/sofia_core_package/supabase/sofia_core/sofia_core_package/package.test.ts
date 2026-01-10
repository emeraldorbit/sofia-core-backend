import { packageMetadata, getEntrypoint, getExports } from './package_runtime';
import spec from './package_spec.json';

describe('Sofia Core Package', () => {
  test('package metadata matches spec', () => {
    expect(packageMetadata.name).toBe(spec.package.name);
    expect(packageMetadata.version).toBe(spec.package.version);
    expect(packageMetadata.description).toBe(spec.package.description);
  });

  test('entrypoint is correctly exposed', () => {
    expect(getEntrypoint()).toBe(spec.package.entrypoint);
  });

  test('exports map contains required keys', () => {
    const exportsMap = getExports();
    expect(exportsMap.engines).toBeDefined();
    expect(exportsMap.pipeline).toBeDefined();
    expect(exportsMap.api).toBeDefined();
    expect(exportsMap.metadata).toBeDefined();
  });
});
