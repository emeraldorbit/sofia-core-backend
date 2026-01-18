import { extendFieldContinuumIII } from '../../supabase/sofia_core/field_continuum_extension_iii/field_continuum_extension_iii';

describe('field_continuum_extension_iii', () => {
  test('extends third-order continuum', () => {
    const extender = (x: number) => x * 3;
    const result = extendFieldContinuumIII(20, extender);
    expect(result.extended).toBe(true);
    expect(result.value).toBe(60);
  });

  test('extends string continuum', () => {
    const extender = (x: string) => `${x}::extended3`;
    const result = extendFieldContinuumIII('stable3', extender);
    expect(result.extended).toBe(true);
    expect(result.value).toBe('stable3::extended3');
  });
});
