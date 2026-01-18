import { continueDominionIII } from '../../supabase/sofia_core/field_dominion_continuity_iii/field_dominion_continuity_iii';

describe('field_dominion_continuity_iii', () => {
  test('continues third-order dominion', () => {
    const fn = (x: number) => x - 5;
    const result = continueDominionIII(200, fn);
    expect(result.continuous).toBe(true);
    expect(result.value).toBe(195);
  });

  test('continues string dominion', () => {
    const fn = (x: string) => `${x}::cont3`;
    const result = continueDominionIII('proj3', fn);
    expect(result.continuous).toBe(true);
    expect(result.value).toBe('proj3::cont3');
  });
});
