import spec from './package_spec.json';
import * as index from '../sofia_core_index/sofia_core_index';

export const packageMetadata = {
  name: spec.package.name,
  version: spec.package.version,
  description: spec.package.description,
  maintainer: spec.maintainer
};

export const exportsMap = {
  engines: index.engines,
  pipeline: index.pipeline,
  api: index.api,
  metadata: index.metadata
};

export function getEntrypoint() {
  return spec.package.entrypoint;
}

export function getExports() {
  return exportsMap;
}
