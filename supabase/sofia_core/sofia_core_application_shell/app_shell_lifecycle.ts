/**
 * app_shell_lifecycle.ts
 * Engine lifecycle manager for Sofia Core Application Shell.
 * Handles loading, initialization, and state management of engines.
 */

import manifest from './app_shell_manifest.json';
import { 
  getContext, 
  registerEngineInContext, 
  getEngineFromContext 
} from './app_shell_context';

export interface EngineDescriptor {
  name: string;
  version: string;
  path: string;
  registration_key: string;
  description: string;
  dependencies: string[];
  enabled: boolean;
}

export interface EngineLifecycleState {
  loaded: boolean;
  initialized: boolean;
  error: string | null;
}

const engineStates = new Map<string, EngineLifecycleState>();

/**
 * Gets all engine descriptors from the manifest
 */
export function getEngineDescriptors(): Record<string, EngineDescriptor> {
  return manifest.engines as Record<string, EngineDescriptor>;
}

/**
 * Gets a specific engine descriptor
 */
export function getEngineDescriptor(name: string): EngineDescriptor {
  const descriptors = getEngineDescriptors();
  
  if (!descriptors[name]) {
    throw new Error(`Engine descriptor not found for: ${name}`);
  }
  
  return descriptors[name];
}

/**
 * Validates engine dependencies are met
 */
function validateDependencies(descriptor: EngineDescriptor): void {
  for (const dep of descriptor.dependencies) {
    const depState = engineStates.get(dep);
    
    if (!depState) {
      throw new Error(
        `Missing dependency '${dep}' for engine '${descriptor.name}'`
      );
    }
    
    if (!depState.loaded) {
      throw new Error(
        `Dependency '${dep}' not loaded for engine '${descriptor.name}'`
      );
    }
  }
}

/**
 * Loads an engine dynamically
 */
export async function loadEngine(name: string): Promise<any> {
  const descriptor = getEngineDescriptor(name);
  
  if (!descriptor.enabled) {
    throw new Error(`Engine '${name}' is disabled in manifest`);
  }
  
  // Check if already loaded
  if (engineStates.has(name) && engineStates.get(name)!.loaded) {
    return getEngineFromContext(name);
  }
  
  // Validate dependencies first
  validateDependencies(descriptor);
  
  // Initialize state
  engineStates.set(name, {
    loaded: false,
    initialized: false,
    error: null
  });
  
  try {
    // For now, we'll register a placeholder since dynamic imports
    // need actual module paths. In a real implementation, this would
    // use dynamic import: const engine = await import(descriptor.path);
    const enginePlaceholder = {
      name: descriptor.name,
      version: descriptor.version,
      descriptor
    };
    
    registerEngineInContext(name, enginePlaceholder);
    
    const state = engineStates.get(name)!;
    state.loaded = true;
    
    return enginePlaceholder;
  } catch (error) {
    const state = engineStates.get(name)!;
    state.error = error instanceof Error ? error.message : String(error);
    throw error;
  }
}

/**
 * Initializes a loaded engine
 */
export function initializeEngine(name: string, initConfig: any = {}): any {
  const state = engineStates.get(name);
  
  if (!state) {
    throw new Error(`Engine '${name}' not loaded. Call loadEngine() first.`);
  }
  
  if (!state.loaded) {
    throw new Error(`Engine '${name}' failed to load: ${state.error}`);
  }
  
  if (state.initialized) {
    return getEngineFromContext(name);
  }
  
  try {
    const engine = getEngineFromContext(name);
    
    // If engine has an initialize method, call it
    if (engine.initialize && typeof engine.initialize === 'function') {
      engine.initialize(initConfig);
    }
    
    state.initialized = true;
    return engine;
  } catch (error) {
    state.error = error instanceof Error ? error.message : String(error);
    throw error;
  }
}

/**
 * Loads all enabled engines in dependency order
 */
export async function loadAllEngines(): Promise<Map<string, any>> {
  const descriptors = getEngineDescriptors();
  const loaded = new Map<string, any>();
  const toLoad = new Set(
    Object.keys(descriptors).filter(name => descriptors[name].enabled)
  );
  
  // Simple dependency resolution: keep loading until all are loaded
  while (toLoad.size > 0) {
    const before = toLoad.size;
    
    for (const name of Array.from(toLoad)) {
      const descriptor = descriptors[name];
      
      // Check if all dependencies are loaded
      const depsLoaded = descriptor.dependencies.every(dep => loaded.has(dep));
      
      if (depsLoaded) {
        try {
          const engine = await loadEngine(name);
          loaded.set(name, engine);
          toLoad.delete(name);
        } catch (error) {
          console.error(`Failed to load engine '${name}':`, error);
          toLoad.delete(name); // Remove to avoid infinite loop
        }
      }
    }
    
    // If no progress was made, we have circular dependencies or missing deps
    if (toLoad.size === before && toLoad.size > 0) {
      const remaining = Array.from(toLoad).join(', ');
      throw new Error(
        `Cannot resolve dependencies for engines: ${remaining}`
      );
    }
  }
  
  return loaded;
}

/**
 * Gets the lifecycle state of an engine
 */
export function getEngineState(name: string): EngineLifecycleState | null {
  return engineStates.get(name) || null;
}

/**
 * Gets all engine states
 */
export function getAllEngineStates(): Map<string, EngineLifecycleState> {
  return new Map(engineStates);
}

/**
 * Resets lifecycle state (useful for testing)
 */
export function resetLifecycleState(): void {
  engineStates.clear();
}
