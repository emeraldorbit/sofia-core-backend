import { focusFieldPeakII } from '../../supabase/sofia_core/field_focus_ii/field_focus_ii';

describe('field_focus_ii', () => {
  test('focuses second-order peak using focusFn', () => {
    const focusFn = (x: number) => x * 10;
    const result = focusFieldPeakII(3, focusFn);
    expect(result.focused).toBe(true);
    expect(result.value).toBe(30);
  });

  test('focuses second-order peak from numeric state', () => {
    const focusFn = (x: number) => x * 2.5;
    const result = focusFieldPeakII(8, focusFn);
    expect(result.focused).toBe(true);
    expect(result.value).toBe(20);
  });

  test('focuses second-order peak from string state', () => {
    const focusFn = (x: string) => `focused2:${x}`;
    const result = focusFieldPeakII('peak2', focusFn);
    expect(result.focused).toBe(true);
    expect(result.value).toBe('focused2:peak2');
  });

  test('focuses second-order peak from array state', () => {
    const focusFn = (x: number[]) => x.filter(n => n > 1);
    const result = focusFieldPeakII([1, 2, 3, 4], focusFn);
    expect(result.focused).toBe(true);
    expect(result.value).toEqual([2, 3, 4]);
  });

  test('focuses second-order peak from object state', () => {
    const focusFn = (x: { intensity: number }) => ({ intensity: x.intensity * 5 });
    const result = focusFieldPeakII({ intensity: 10 }, focusFn);
    expect(result.focused).toBe(true);
    expect(result.value).toEqual({ intensity: 50 });
  });

  test('focuses second-order peak with identity focusFn', () => {
    const focusFn = (x: string) => x;
    const result = focusFieldPeakII('FOCUS_II', focusFn);
    expect(result.focused).toBe(true);
    expect(result.value).toBe('FOCUS_II');
  });
});
