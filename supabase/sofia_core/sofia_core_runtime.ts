/**
 * Sofia Core Runtime - Modulation Bridge Integration
 * 
 * Integrates the Modulation Bridge Triad and Final Modulation Triad
 * into the Sofia Core runtime, providing unified access to:
 * - Continuum bridging, signature filtering, and identity modulation
 * - Dynamic continuity shaping, cross-system identity bridging, and semantic filtering
 */

import { bridgeState } from './continuum_bridge/continuum_bridge';
import { filterSignature } from './signature_filter/signature_filter';
import { modulateIdentity } from './identity_modulator/identity_modulator';
import { modulateContinuity } from './continuum_modulator/continuum_modulator';
import { bridgeSignature } from './signature_bridge/signature_bridge';
import { filterIdentity } from './identity_filter/identity_filter';

/**
 * Modulation Bridge - Unified interface for the first triad
 * 
 * Provides orchestration continuity, identity filtering,
 * and adaptive modulation through a single integration point.
 */
export const modulationBridge = {
  bridgeState,
  filterSignature,
  modulateIdentity,
};

/**
 * Final Modulation Triad - Unified interface for the second triad
 * 
 * Provides runtime-aware continuity shaping, cross-system identity coherence,
 * and semantic identity filtering through a single integration point.
 */
export const finalModulationTriad = {
  modulateContinuity,
  bridgeSignature,
  filterIdentity,
};
