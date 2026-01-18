import { projectDominionIII } from '../../supabase/sofia_core/field_dominion_projection_iii/field_dominion_projection_iii';

describe('field_dominion_projection_iii', () => {
  test('projects third-order dominion', () => {
    const fn = (x: number) => x * 4;
    const result = projectDominionIII(50, fn);
    expect(result.projected).toBe(true);
    expect(result.value).toBe(200);
  });

  test('projects string dominion', () => {
    const fn = (x: string) => `proj3:${x}`;
    const result = projectDominionIII('auth3', fn);
    expect(result.projected).toBe(true);
    expect(result.value).toBe('proj3:auth3');
  });
});
