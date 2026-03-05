---
sidebar_position: 22
---

# Code Scaffolding & Generation

Generate boilerplate code for new modules, entities, and services.

## NestJS CLI

```bash
# Generate a new module
npx nest generate module my-feature

# Generate a controller
npx nest generate controller my-feature

# Generate a service
npx nest generate service my-feature

# Generate a full CRUD resource
npx nest generate resource my-feature
```

## NX Generators

```bash
# Generate a new library
npx nx generate @nx/nest:library my-lib

# Generate a new Angular component
npx nx generate @nx/angular:component my-component --project=gauzy
```

## Manual Module Template

For a standard Gauzy module, create these files:

```
packages/core/src/lib/my-feature/
├── my-feature.module.ts
├── my-feature.controller.ts
├── my-feature.service.ts
├── my-feature.entity.ts
├── dto/
│   ├── create-my-feature.dto.ts
│   └── update-my-feature.dto.ts
├── commands/
│   ├── my-feature.create.command.ts
│   └── handlers/
│       └── my-feature.create.handler.ts
└── repository/
    ├── type-orm-my-feature.repository.ts
    └── mikro-orm-my-feature.repository.ts
```

## Related Pages

- [Development Guide](./development-guide) — dev setup
- [Monorepo Navigation](./monorepo-navigation) — file locations
- [CQRS Handlers](../advanced/cqrs-handlers) — command patterns
