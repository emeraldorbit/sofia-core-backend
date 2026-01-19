import { expressApexIIState } from '../../supabase/sofia_core/field_expression_apex_ii/field_expression_apex_ii';

describe('field_expression_apex_ii', () => {
  test('expresses second-order apex state using expressFn', () => {
    const expressFn = (x: number) => x * 10;
    const result = expressApexIIState(3, expressFn);
    expect(result.expressed).toBe(true);
    expect(result.value).toBe(30);
  });

  test('expresses second-order apex state from numeric state', () => {
    const expressFn = (x: number) => x * 2.5;
    const result = expressApexIIState(8, expressFn);
    expect(result.expressed).toBe(true);
    expect(result.value).toBe(20);
  });

  test('expresses second-order apex state from string state', () => {
    const expressFn = (x: string) => `apex2:${x}`;
    const result = expressApexIIState('focused2', expressFn);
    expect(result.expressed).toBe(true);
    expect(result.value).toBe('apex2:focused2');
  });

  test('expresses second-order apex state from array state', () => {
    const expressFn = (x: number[]) => x.map(n => n * 2);
    const result = expressApexIIState([1, 2, 3], expressFn);
    expect(result.expressed).toBe(true);
    expect(result.value).toEqual([2, 4, 6]);
  });

  test('expresses second-order apex state from object state', () => {
    const expressFn = (x: { intensity: number }) => ({ intensity: x.intensity * 10 });
    const result = expressApexIIState({ intensity: 5 }, expressFn);
    expect(result.expressed).toBe(true);
    expect(result.value).toEqual({ intensity: 50 });
  });

  test('expresses second-order apex state with identity expressFn', () => {
    const expressFn = (x: string) => x;
    const result = expressApexIIState('APEX_II', expressFn);
    expect(result.expressed).toBe(true);
    expect(result.value).toBe('APEX_II');
  });
});
