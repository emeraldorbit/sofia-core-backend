import { synthesizeFieldContinuumIII } from '../../supabase/sofia_core/field_continuum_synthesis_iii/field_continuum_synthesis_iii';

describe('field_continuum_synthesis_iii', () => {
  test('synthesizes third-order continuum', () => {
    const synthesizer = (x: number[]) => x.reduce((a, b) => a + b, 0);
    const result = synthesizeFieldContinuumIII([10, 20, 30], synthesizer);
    expect(result.synthesized).toBe(true);
    expect(result.value).toBe(60);
  });

  test('synthesizes string continuum', () => {
    const synthesizer = (x: string) => `synth3:${x}`;
    const result = synthesizeFieldContinuumIII('extended3', synthesizer);
    expect(result.synthesized).toBe(true);
    expect(result.value).toBe('synth3:extended3');
  });
});
