---
sidebar_position: 7
---

# Plugins & Integrations System

Ever Gauzy uses a modular **plugins & integrations architecture** that allows extending the platform with new features, integrations, entities, and UI components without modifying the core codebase.

There are 2 ways to extend the platform:

1. **Plugins** / **Integrations** from the codebase repository (`/packages/plugins` folder). We can call those as **built-in plugins** or **built-in integrations**. See plugins-built-in document for more details.

2. **Plugins** / **Integrations** from the marketplace (added into the platform from NPM packages or Zip files). We can call those as **marketplace plugins** or **marketplace integrations**. See plugins-marketplace document for more details.

## Related Pages

- [Backend Architecture](./backend-architecture) — NestJS module system
- [Integrations Overview](../integrations/integrations-overview) — integration configuration
- [Event Bus](./event-bus) — plugin event communication
