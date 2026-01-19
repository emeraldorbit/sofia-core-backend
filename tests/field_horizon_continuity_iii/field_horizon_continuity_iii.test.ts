import { continueHorizonStateIII } from '../../supabase/sofia_core/field_horizon_continuity_iii/field_horizon_continuity_iii';

describe('field_horizon_continuity_iii', () => {
  test('continues horizon-III using continuer', () => {
    const continuer = (x: string) => `${x}::continued3`;
    const result = continueHorizonStateIII('mapped3', continuer);
    expect(result.continuous).toBe(true);
    expect(result.value).toBe('mapped3::continued3');
  });

  test('continues numeric horizon-III', () => {
    const continuer = (x: number) => x + 300;
    const result = continueHorizonStateIII(10, continuer);
    expect(result.continuous).toBe(true);
    expect(result.value).toBe(310);
  });
});
