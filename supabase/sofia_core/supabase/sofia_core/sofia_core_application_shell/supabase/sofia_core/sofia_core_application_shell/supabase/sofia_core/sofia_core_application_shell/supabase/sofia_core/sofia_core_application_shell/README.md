# Sofia Core Application Shell — Full Application Binding Layer

## Purpose
The Application Shell provides the final layer that allows full applications to load, initialize, and interact with Sofia Core.  
It wraps the Integration Layer and exposes a clean entrypoint for any UI, service, or runtime environment.

## Modules

| File                    | Purpose                                                |
|-------------------------|--------------------------------------------------------|
| `app_shell_spec.json`   | Defines initialization and application‑level behavior   |
| `app_shell_runtime.ts`  | Implements initialization, lifecycle, and entrypoint    |
| `app_shell.test.ts`     | Validates initialization and entrypoint exposure        |

## Exposed Functions
- **initializeSofiaAppShell(context)** — initializes Sofia Core for an application  
- **getAppEntry()** — exposes the application entrypoint and metadata  
- **appShellMetadata** — version and maintainer information  

## Role in the Architecture
This is the outermost binding layer of the Sofia Core backend.  
It ensures that any application can load Sofia Core with consistent initialization, lifecycle management, and helper exposure.

## Maintainer
Emerald Estates® — Sofia Core Governance
