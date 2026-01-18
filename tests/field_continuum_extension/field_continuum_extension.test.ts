import { extendFieldContinuum } from '../../supabase/sofia_core/field_continuum_extension/field_continuum_extension';

describe('field_continuum_extension', () => {
  test('extends continuum using extender', () => {
    const extender = (x: string) => `${x}::ext`;
    const result = extendFieldContinuum('cycle', extender);
    expect(result.extended).toBe(true);
    expect(result.value).toBe('cycle::ext');
  });

  test('extends numeric continuum', () => {
    const extender = (x: number) => x + 50;
    const result = extendFieldContinuum(10, extender);
    expect(result.extended).toBe(true);
    expect(result.value).toBe(60);
  });

  test('extends array continuum', () => {
    const extender = (x: number[]) => [...x, ...x];
    const result = extendFieldContinuum([1, 2], extender);
    expect(result.extended).toBe(true);
    expect(result.value).toEqual([1, 2, 1, 2]);
  });

  test('extends object continuum', () => {
    const extender = (x: { cycle: string }) => ({ cycle: x.cycle, extended: 'yes' });
    const result = extendFieldContinuum({ cycle: 'stable' }, extender);
    expect(result.extended).toBe(true);
    expect(result.value).toEqual({ cycle: 'stable', extended: 'yes' });
  });

  test('extends continuum with identity extender', () => {
    const extender = (x: string) => x;
    const result = extendFieldContinuum('stable-cycle', extender);
    expect(result.extended).toBe(true);
    expect(result.value).toBe('stable-cycle');
  });
});
