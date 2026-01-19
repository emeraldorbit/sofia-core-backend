export type GenesisIIIState<T> = {
  continued: boolean;
  value: T;
};

export function continueGenesisIII<T>(
  generationIII: T,
  continuer: (value: T) => T
): GenesisIIIState<T> {
  const value = continuer(generationIII);
  return {
    continued: true,
    value,
  };
}
