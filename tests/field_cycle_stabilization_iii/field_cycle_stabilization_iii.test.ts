import { stabilizeFieldCycleIII } from '../../supabase/sofia_core/field_cycle_stabilization_iii/field_cycle_stabilization_iii';

describe('field_cycle_stabilization_iii', () => {
  test('stabilizes third-order cycle', () => {
    const stabilizer = (x: number) => x + 300;
    const result = stabilizeFieldCycleIII(10, stabilizer);
    expect(result.stabilized).toBe(true);
    expect(result.value).toBe(310);
  });

  test('stabilizes string cycle', () => {
    const stabilizer = (x: string) => `${x}::stable3`;
    const result = stabilizeFieldCycleIII('gen2', stabilizer);
    expect(result.stabilized).toBe(true);
    expect(result.value).toBe('gen2::stable3');
  });
});
