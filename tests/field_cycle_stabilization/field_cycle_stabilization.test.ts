import { stabilizeFieldCycle } from '../../supabase/sofia_core/field_cycle_stabilization/field_cycle_stabilization';

describe('field_cycle_stabilization', () => {
  test('stabilizes cycle using stabilizer', () => {
    const stabilizer = (x: number) => x + 1;
    const result = stabilizeFieldCycle(9, stabilizer);
    expect(result.stabilized).toBe(true);
    expect(result.value).toBe(10);
  });

  test('stabilizes string cycle', () => {
    const stabilizer = (x: string) => `${x}::stable`;
    const result = stabilizeFieldCycle('genesis', stabilizer);
    expect(result.stabilized).toBe(true);
    expect(result.value).toBe('genesis::stable');
  });

  test('stabilizes numeric cycle with multiplication', () => {
    const stabilizer = (x: number) => x * 2;
    const result = stabilizeFieldCycle(5, stabilizer);
    expect(result.stabilized).toBe(true);
    expect(result.value).toBe(10);
  });

  test('stabilizes object cycle', () => {
    const stabilizer = (x: { state: string }) => ({ state: x.state, stable: true });
    const result = stabilizeFieldCycle({ state: 'genesis' }, stabilizer);
    expect(result.stabilized).toBe(true);
    expect(result.value).toEqual({ state: 'genesis', stable: true });
  });

  test('stabilizes cycle with identity stabilizer', () => {
    const stabilizer = (x: string[]) => x;
    const result = stabilizeFieldCycle(['a', 'b'], stabilizer);
    expect(result.stabilized).toBe(true);
    expect(result.value).toEqual(['a', 'b']);
  });
});
