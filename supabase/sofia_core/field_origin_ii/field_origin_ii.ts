/**
 * Origin-II state representing second-order origin reinstatement.
 */
export type OriginIIState<T> = {
  origin: boolean;
  value: T;
};

/**
 * Return field to its second-order origin seed.
 */
export function returnToOriginII<T>(
  horizonII: T,
  originator: (value: T) => T
): OriginIIState<T> {
  const value = originator(horizonII);
  return {
    origin: true,
    value,
  };
}
