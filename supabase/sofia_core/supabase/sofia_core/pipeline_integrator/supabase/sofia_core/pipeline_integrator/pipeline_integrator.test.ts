import { runPipeline } from './pipeline_integrator_runtime';

describe('Pipeline Integrator Runtime', () => {
  const mockEngines = {
    resonance_engine: jest.fn((output, ctx) => output),
    identity_filter: jest.fn((output, ctx) => output),
    coherence_engine: jest.fn((output, ctx) => output),
    deviation_engine: jest.fn((output, ctx) => output),
    alignment_engine: jest.fn((output, ctx) => output),
    output_sealer: jest.fn((output, ctx) => output)
  };

  test('runs full pipeline successfully', () => {
    const context = { engines_passed: true };
    const result = runPipeline('Final output', context, mockEngines);
    expect(result).toBe('Final output');
  });

  test('halts pipeline if an engine fails', () => {
    const failingEngines = {
      ...mockEngines,
      coherence_engine: jest.fn(() => null)
    };

    const context = { engines_passed: true };
    const result = runPipeline('Final output', context, failingEngines);
    expect(result).toBeNull();
  });

  test('propagates modified output through pipeline', () => {
    const modifyingEngines = {
      ...mockEngines,
      identity_filter: jest.fn(() => 'Modified output')
    };

    const context = { engines_passed: true };
    const result = runPipeline('Initial output', context, modifyingEngines);
    expect(result).toBe('Modified output');
  });
});
