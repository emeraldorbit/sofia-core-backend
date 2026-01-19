export type GenerationIIIState<T> = {
  generated: boolean;
  value: T;
};

export function generateFieldStateIII<T>(
  seed: T,
  generator: (value: T) => T
): GenerationIIIState<T> {
  const value = generator(seed);
  return {
    generated: true,
    value,
  };
}
