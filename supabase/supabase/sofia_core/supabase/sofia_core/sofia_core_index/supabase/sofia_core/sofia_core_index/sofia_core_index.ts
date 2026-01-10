import indexSpec from './sofia_core_index_spec.json';

import * as resonance_engine from '../resonance_engine/resonance_engine_runtime';
import * as identity_filter from '../identity_filter/identity_filter_runtime';
import * as coherence_engine from '../coherence_engine/coherence_engine_runtime';
import * as deviation_engine from '../deviation_engine/deviation_engine_runtime';
import * as alignment_engine from '../alignment_engine/alignment_engine_runtime';
import * as output_sealer from '../output_sealer/output_sealer_runtime';

import { runPipeline } from '../pipeline_integrator/pipeline_integrator_runtime';
import { handleSofiaRequest } from '../sofia_api/sofia_api_runtime';

export const engines = {
  resonance_engine,
  identity_filter,
  coherence_engine,
  deviation_engine,
  alignment_engine,
  output_sealer
};

export const pipeline = runPipeline;
export const api = handleSofiaRequest;

export const metadata = {
  version: indexSpec.metadata.version,
  maintainer: indexSpec.metadata.maintainer
};
