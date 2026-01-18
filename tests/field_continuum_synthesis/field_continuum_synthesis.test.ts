import { synthesizeFieldContinuum } from '../../supabase/sofia_core/field_continuum_synthesis/field_continuum_synthesis';

describe('field_continuum_synthesis', () => {
  test('synthesizes continuum using synthesizer', () => {
    const synthesizer = (x: number[]) => x.reduce((a, b) => a + b, 0);
    const result = synthesizeFieldContinuum([1, 2, 3], synthesizer);
    expect(result.synthesized).toBe(true);
    expect(result.value).toBe(6);
  });

  test('synthesizes string continuum', () => {
    const synthesizer = (x: string) => `unified:${x}`;
    const result = synthesizeFieldContinuum('extended', synthesizer);
    expect(result.synthesized).toBe(true);
    expect(result.value).toBe('unified:extended');
  });

  test('synthesizes array continuum', () => {
    const synthesizer = (x: string[]) => x.join('-');
    const result = synthesizeFieldContinuum(['cycle1', 'cycle2', 'cycle3'], synthesizer);
    expect(result.synthesized).toBe(true);
    expect(result.value).toBe('cycle1-cycle2-cycle3');
  });

  test('synthesizes object continuum', () => {
    const synthesizer = (x: { extended: string }) => ({ ...x, unified: true });
    const result = synthesizeFieldContinuum({ extended: 'continuum' }, synthesizer);
    expect(result.synthesized).toBe(true);
    expect(result.value).toEqual({ extended: 'continuum', unified: true });
  });

  test('synthesizes continuum with identity synthesizer', () => {
    const synthesizer = (x: boolean[]) => x;
    const result = synthesizeFieldContinuum([true, false, true], synthesizer);
    expect(result.synthesized).toBe(true);
    expect(result.value).toEqual([true, false, true]);
  });
});
