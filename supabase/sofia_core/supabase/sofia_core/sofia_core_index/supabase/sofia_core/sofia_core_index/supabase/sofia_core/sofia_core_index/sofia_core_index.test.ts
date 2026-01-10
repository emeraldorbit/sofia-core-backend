import { SofiaCore } from './sofia_core_index';

test('SofiaCore exposes all modules', () => {
  expect(SofiaCore.deviation_engine).toBeDefined();
  expect(SofiaCore.identity_filter).toBeDefined();
  expect(SofiaCore.membrane_engine).toBeDefined();
  expect(SofiaCore.tonal_engine).toBeDefined();
  expect(SofiaCore.sofia_api).toBeDefined();
  expect(SofiaCore.version).toBe('1.0.0');
});
