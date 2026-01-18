/**
 * Field Wave - Oscillatory Field Stabilization
 * Part of the Field Stabilization Triad for Sofia Core
 * 
 * Generates oscillatory field patterns.
 * Produces amplitude-based waveforms with frequency-driven
 * oscillation for dynamic field behavior.
 */

/**
 * Generate oscillatory wave pattern
 * Creates sine wave based on amplitude and frequency
 * 
 * @param amplitude - Wave amplitude
 * @param frequency - Number of samples in the wave
 * @returns Array of wave values
 */
export function generateWave(
  amplitude: number,
  frequency: number
): Array<number> {
  const wave = [];
  for (let i = 0; i < frequency; i++) {
    wave.push(Math.sin((i / frequency) * Math.PI * 2) * amplitude);
  }
  return wave;
}
