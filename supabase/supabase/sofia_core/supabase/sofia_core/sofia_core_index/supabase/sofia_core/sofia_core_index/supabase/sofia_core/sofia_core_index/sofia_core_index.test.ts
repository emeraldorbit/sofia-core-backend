import * as index from './sofia_core_index';

describe('Sofia Core Index', () => {
  test('exports all engines', () => {
    expect(index.engines).toBeDefined();
    expect(typeof index.engines.resonance_engine).toBe('object');
    expect(typeof index.engines.identity_filter).toBe('object');
    expect(typeof index.engines.coherence_engine).toBe('object');
    expect(typeof index.engines.deviation_engine).toBe('object');
    expect(typeof index.engines.alignment_engine).toBe('object');
    expect(typeof index.engines.output_sealer).toBe('object');
  });

  test('exports pipeline function', () => {
    expect(typeof index.pipeline).toBe('function');
  });

  test('exports API handler', () => {
    expect(typeof index.api).toBe('function');
  });

  test('includes version metadata', () => {
    expect(index.metadata).toBeDefined();
    expect(typeof index.metadata.version).toBe('string');
    expect(typeof index.metadata.maintainer).toBe('string');
  });
});
