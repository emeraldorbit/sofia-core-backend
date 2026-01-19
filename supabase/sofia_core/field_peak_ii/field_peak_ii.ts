/**
 * Field Peak II - Second-Order Apex Peak Formation
 * Part of the Field Apex-II Triad for Sofia Core
 * 
 * Forms the second-order peak from dominion-II states.
 * Accepts second-order dominion states, applies peak-formation logic,
 * and produces a second-order peak field state.
 * Represents "the second-order field reaches maximum coherence and intensity".
 * This is the system's second-order apex-formation layer.
 */

/**
 * Second-order peak state representing maximum coherence and intensity
 */
export type FieldPeakIIState<T> = {
  peaked: boolean;
  value: T;
};

/**
 * Form second-order field peak with maximum coherence
 * Applies peak-formation logic and produces second-order peak state
 * 
 * @param dominionII - Second-order dominion state to concentrate into peak
 * @param peakFn - Function that concentrates dominion-II state into peak configuration
 * @returns Second-order peak state with peaked=true and peak value
 */
export function formFieldPeakII<T>(
  dominionII: T,
  peakFn: (value: T) => T
): FieldPeakIIState<T> {
  const value = peakFn(dominionII);
  return {
    peaked: true,
    value,
  };
}
