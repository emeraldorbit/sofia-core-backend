import { extendFieldContinuum } from '../../supabase/sofia_core/field_continuum_extension/field_continuum_extension';

describe('field_continuum_extension', () => {
  test('extends continuum using extender', () => {
    const extender = (x: string) => `${x}::ext`;
    const result = extendFieldContinuum('cycle', extender);
    expect(result.extended).toBe(true);
    expect(result.value).toBe('cycle::ext');
  });

  test('extends numeric continuum', () => {
    const extender = (x: number) => x * 2;
    const result = extendFieldContinuum(5, extender);
    expect(result.extended).toBe(true);
    expect(result.value).toBe(10);
  });

  test('extends array continuum', () => {
    const extender = (x: string[]) => [...x, 'extended'];
    const result = extendFieldContinuum(['a', 'b'], extender);
    expect(result.extended).toBe(true);
    expect(result.value).toEqual(['a', 'b', 'extended']);
  });

  test('extends object continuum', () => {
    const extender = (x: { cycle: string }) => ({ ...x, arc: 'long' });
    const result = extendFieldContinuum({ cycle: 'stable' }, extender);
    expect(result.extended).toBe(true);
    expect(result.value).toEqual({ cycle: 'stable', arc: 'long' });
  });

  test('extends continuum with identity extender', () => {
    const extender = (x: number[]) => x;
    const result = extendFieldContinuum([1, 2, 3], extender);
    expect(result.extended).toBe(true);
    expect(result.value).toEqual([1, 2, 3]);
  });
});
