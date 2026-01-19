import { mapHorizonStateIII } from '../../supabase/sofia_core/field_horizon_mapping_iii/field_horizon_mapping_iii';

describe('field_horizon_mapping_iii', () => {
  test('maps expansion-III using mapper', () => {
    const mapper = (x: number[]) => x.map(v => v * 2);
    const result = mapHorizonStateIII([1, 2], mapper);
    expect(result.mapped).toBe(true);
    expect(result.value).toEqual([2, 4]);
  });

  test('maps string expansion-III', () => {
    const mapper = (x: string) => `mapped3:${x}`;
    const result = mapHorizonStateIII('expanded3', mapper);
    expect(result.mapped).toBe(true);
    expect(result.value).toBe('mapped3:expanded3');
  });
});
