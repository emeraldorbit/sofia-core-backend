/**
 * Sofia Core Runtime - Modulation Bridge Integration
 * 
 * Integrates the Modulation Bridge Triad into the Sofia Core runtime,
 * providing unified access to continuum bridging, signature filtering,
 * and identity modulation capabilities.
 */

import { bridgeState } from './continuum_bridge/continuum_bridge';
import { filterSignature } from './signature_filter/signature_filter';
import { modulateIdentity } from './identity_modulator/identity_modulator';

/**
 * Modulation Bridge - Unified interface for the triad
 * 
 * Provides orchestration continuity, identity filtering,
 * and adaptive modulation through a single integration point.
 */
export const modulationBridge = {
  bridgeState,
  filterSignature,
  modulateIdentity,
};
