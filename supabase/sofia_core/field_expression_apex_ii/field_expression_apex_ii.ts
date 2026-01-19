/**
 * Field Expression Apex II - Second-Order Highest-Order Apex Expression
 * Part of the Field Apex-II Triad for Sofia Core
 * 
 * Expresses the second-order apex-II signal outward.
 * Accepts second-order focused states, applies apex-expression logic,
 * and produces a second-order apex expression state.
 * Represents "the second-order field expresses its highest form".
 * This is the system's second-order apex-expression layer.
 */

/**
 * Second-order apex expression state representing highest-order signal
 */
export type ApexExpressionIIState<T> = {
  expressed: boolean;
  value: T;
};

/**
 * Express second-order apex state outward
 * Applies apex-expression logic and produces second-order apex expression state
 * 
 * @param focusII - Second-order focused state to express as highest-order signal
 * @param expressFn - Function that expresses focused-II state as apex-II signal
 * @returns Second-order apex expression state with expressed=true and expressed value
 */
export function expressApexIIState<T>(
  focusII: T,
  expressFn: (value: T) => T
): ApexExpressionIIState<T> {
  const value = expressFn(focusII);
  return {
    expressed: true,
    value,
  };
}
