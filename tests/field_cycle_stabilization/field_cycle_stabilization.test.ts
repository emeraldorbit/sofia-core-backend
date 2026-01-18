import { stabilizeFieldCycle } from '../../supabase/sofia_core/field_cycle_stabilization/field_cycle_stabilization';

describe('field_cycle_stabilization', () => {
  test('stabilizes cycle using stabilizer', () => {
    const stabilizer = (x: number) => x + 1;
    const result = stabilizeFieldCycle(9, stabilizer);
    expect(result.stabilized).toBe(true);
    expect(result.value).toBe(10);
  });

  test('stabilizes string cycle', () => {
    const stabilizer = (x: string) => `${x}:stabilized`;
    const result = stabilizeFieldCycle('genesis', stabilizer);
    expect(result.stabilized).toBe(true);
    expect(result.value).toBe('genesis:stabilized');
  });

  test('stabilizes array cycle', () => {
    const stabilizer = (x: number[]) => [...x, 0];
    const result = stabilizeFieldCycle([1, 2, 3], stabilizer);
    expect(result.stabilized).toBe(true);
    expect(result.value).toEqual([1, 2, 3, 0]);
  });

  test('stabilizes object cycle', () => {
    const stabilizer = (x: { state: string }) => ({ ...x, cycle: 'stable' });
    const result = stabilizeFieldCycle({ state: 'genesis' }, stabilizer);
    expect(result.stabilized).toBe(true);
    expect(result.value).toEqual({ state: 'genesis', cycle: 'stable' });
  });

  test('stabilizes cycle with identity stabilizer', () => {
    const stabilizer = (x: boolean) => x;
    const result = stabilizeFieldCycle(true, stabilizer);
    expect(result.stabilized).toBe(true);
    expect(result.value).toBe(true);
  });
});
