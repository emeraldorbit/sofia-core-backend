import { formFieldPeakII } from '../../supabase/sofia_core/field_peak_ii/field_peak_ii';

describe('field_peak_ii', () => {
  test('forms second-order peak using peakFn', () => {
    const peakFn = (x: number) => x * 10;
    const result = formFieldPeakII(3, peakFn);
    expect(result.peaked).toBe(true);
    expect(result.value).toBe(30);
  });

  test('forms second-order peak from numeric state', () => {
    const peakFn = (x: number) => x * 2.5;
    const result = formFieldPeakII(8, peakFn);
    expect(result.peaked).toBe(true);
    expect(result.value).toBe(20);
  });

  test('forms second-order peak from string state', () => {
    const peakFn = (x: string) => `peak2:${x}`;
    const result = formFieldPeakII('dominion2', peakFn);
    expect(result.peaked).toBe(true);
    expect(result.value).toBe('peak2:dominion2');
  });

  test('forms second-order peak from array state', () => {
    const peakFn = (x: number[]) => [...x, Math.max(...x) * 2];
    const result = formFieldPeakII([1, 2, 3], peakFn);
    expect(result.peaked).toBe(true);
    expect(result.value).toEqual([1, 2, 3, 6]);
  });

  test('forms second-order peak from object state', () => {
    const peakFn = (x: { intensity: number }) => ({ intensity: x.intensity * 10 });
    const result = formFieldPeakII({ intensity: 5 }, peakFn);
    expect(result.peaked).toBe(true);
    expect(result.value).toEqual({ intensity: 50 });
  });

  test('forms second-order peak with identity peakFn', () => {
    const peakFn = (x: string) => x;
    const result = formFieldPeakII('PEAK_II', peakFn);
    expect(result.peaked).toBe(true);
    expect(result.value).toBe('PEAK_II');
  });
});
