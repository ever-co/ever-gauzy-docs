---
sidebar_position: 10
---

# Design Principles

The Ever Gauzy platform is built on five core design principles that guide all architectural and implementation decisions.

## Core Principles

### 1. Flexible

Ever Gauzy is both a **"one-size-fits-all" solution** and a **framework** that is easy to extend and customize.

- **Out-of-the-box**: Provides complete ERP/CRM/HRM functionality for immediate use
- **Customizable**: Every aspect can be tailored to specific business needs
- **Configuration-driven**: Feature toggles, environment variables, and runtime settings control behavior
- **Multi-deployment**: Runs as SaaS, self-hosted, desktop app, or CLI server

### 2. Modular

The **core** modules encapsulate common functionality, while the modular architecture is supported by **plugins**.

- **NestJS Modules**: Each feature is a self-contained NestJS module
- **Plugin Architecture**: Third-party integrations, analytics, and features are separate plugins
- **Lazy Loading**: Angular frontend uses lazy loading for optimal performance
- **Package Boundaries**: Clear separation via `@gauzy/*` packages in the monorepo

### 3. Extensible

The architecture allows you to **extend platform functionality** and **replace default behaviors**.

- **Custom Entities**: Add new database tables via plugin entities
- **Custom Endpoints**: Add new API routes via plugin controllers
- **Event Handlers**: React to platform events without modifying core code
- **Custom Guards**: Implement custom authorization logic
- **Theming**: Replace the entire UI theme via Nebular's Eva Design System

### 4. Scalable

Built on top of **enterprise-level frameworks** (NestJS & Angular) and designed to be **Cloud Native**:

- **Horizontal Scaling**: Stateless API server with Redis for session/cache
- **Kubernetes**: Native support for Kubernetes deployments
- **Docker**: Multi-stage Docker builds for optimized images
- **Connection Pooling**: Database pool management for high concurrency
- **Task Caching**: NX-based build caching for development efficiency

### 5. Type-Safe

Full-stack **TypeScript** with comprehensive API contracts:

- **Shared Contracts**: `@gauzy/contracts` provides TypeScript interfaces shared between frontend and backend
- **REST OpenAPI**: Auto-generated Swagger documentation at `/swg`
- **GraphQL** (WIP): Type-safe GraphQL schema
- **DTO Validation**: `class-validator` decorators for runtime type checking
- **Multi-ORM Types**: Consistent type definitions across TypeORM, MikroORM, and Knex

## Transparency & Fairness

Beyond technical principles, Gauzy is built on the philosophy of **transparency and fairness** in business operations:

### Transparency

- Share important business metrics with customers, employees, and contractors
- Open salary information and compensation transparency
- Time tracking data shared with all stakeholders
- Equipment and resource sharing between employees
- Company announcements and project updates visible to all

### Fairness

- **Profit-based bonuses**: Employees receive bonuses based on company profits from their work
- **Revenue-based bonuses**: Alternative model based on gross income generated
- **Monthly recalculation**: Bonuses recalculated monthly, not annually
- **Skill-based progression**: Direct correlation between skill growth and compensation
- **Open billing**: Client billing strictly based on time tracking and public price lists

### Bonus Calculation Models

| Model             | Description                                             | Use Case                           |
| ----------------- | ------------------------------------------------------- | ---------------------------------- |
| **Profit-Based**  | Bonuses = share of company profits from employee's work | Tech agencies with project billing |
| **Revenue-Based** | Bonuses = share of gross income from employee's work    | High-margin services               |
| **Mixed**         | Combination of fixed salary + profit/revenue share      | Hybrid compensation                |

## Architectural Decisions

### Why NestJS?

- Enterprise-ready module system
- Built-in dependency injection
- Decorator-based programming model
- First-class TypeScript support
- Large ecosystem of plugins and integrations
- CQRS pattern support out of the box

### Why Angular?

- Strong typing and IDE support
- Component-based architecture
- Dependency injection aligns with NestJS
- Mature ecosystem for enterprise applications
- Nebular/ngx-admin provides rich admin UI components

### Why Multi-ORM?

- **Flexibility**: Choose the best ORM for each use case
- **Migration Path**: Gradually migrate from TypeORM to MikroORM
- **Performance**: Use Knex for performance-critical queries
- **Developer Choice**: Teams can work with their preferred ORM

### Why Monorepo (NX)?

- **Shared code**: Contracts, utilities, and types used across all apps
- **Atomic changes**: Multi-project changes in a single commit
- **Dependency graph**: NX visualizes and manages inter-project dependencies
- **Build caching**: Dramatically reduces CI build times
- **Consistent tooling**: Same build, test, and lint commands everywhere

## Related Pages

- [Architecture Overview](./overview) — high-level system design
- [Technology Stack](./technology-stack) — all technologies used
- [Multi-Tenancy](./multi-tenancy) — tenant isolation and data scoping
- [Plugin System](./plugin-system) — extensibility through plugins
