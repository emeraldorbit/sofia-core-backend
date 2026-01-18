/**
 * Generation-II state representing second-order generative output.
 */
export type GenerationIIState<T> = {
  generated: boolean;
  value: T;
};

/**
 * Generate new second-order field structures from origin-II.
 */
export function generateFieldStateII<T>(
  originII: T,
  generator: (value: T) => T
): GenerationIIState<T> {
  const value = generator(originII);
  return {
    generated: true,
    value,
  };
}
