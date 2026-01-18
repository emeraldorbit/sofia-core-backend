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
import { orchestrate } from './orchestration_engine/orchestration_engine';
import { bridgeSemantics } from './semantic_bridge/semantic_bridge';
import { synthesizeSignature } from './signature_synthesizer/signature_synthesizer';
import { modulateSemantics } from './semantic_modulator/semantic_modulator';
import { routeSignature } from './signature_router/signature_router';
import { synthesizeIdentity } from './identity_synthesizer/identity_synthesizer';

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

/**
 * Orchestration Synthesis Triad - Unified interface for the third triad
 * 
 * Provides runtime coordination, semantic linking, and dynamic identity synthesis
 * through a single integration point for orchestration layer capabilities.
 */
export const orchestrationSynthesis = {
  orchestrate,
  bridgeSemantics,
  synthesizeSignature,
};

/**
 * Semantic Modulation Triad - Unified interface for the fourth triad
 * 
 * Provides dynamic meaning shaping, identity routing, and expressive synthesis
 * through a single integration point for semantic modulation capabilities.
 */
export const semanticModulation = {
  modulateSemantics,
  routeSignature,
  synthesizeIdentity,
};
