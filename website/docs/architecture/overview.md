---
sidebar_position: 1
---

# Architecture Overview

Ever Gauzy is built as a modern, full-stack TypeScript monorepo using enterprise-grade frameworks. This document provides a high-level view of the platform's architecture.

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        Client Layer                                     │
│                                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌────────────┐  │
│  │  Angular UI  │  │ Desktop App  │  │Desktop Timer │  │  Ever      │  │
│  │  (Web SPA)   │  │  (Electron)  │  │  (Electron)  │  │  Teams     │  │
│  │  Port: 4200  │  │  Embedded    │  │  Standalone  │  │ (React/RN) │  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └─────┬──────┘  │
│         │                 │                 │                 │          │
│         └─────────────────┴────────┬────────┴─────────────────┘          │
│                                    │ HTTP / WebSocket                    │
├────────────────────────────────────┼────────────────────────────────────┤
│                        Server Layer│                                     │
│                                    ▼                                     │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                    NestJS API Server (Port: 3000)                │   │
│  │                                                                  │   │
│  │  ┌────────┐ ┌────────┐ ┌──────────┐ ┌──────┐ ┌──────────────┐  │   │
│  │  │  Auth  │ │  CQRS  │ │ REST API │ │ GQL  │ │ MCP Server   │  │   │
│  │  │ Guards │ │Commands│ │ Swagger  │ │(WIP) │ │ (AI Tools)   │  │   │
│  │  └────────┘ └────────┘ └──────────┘ └──────┘ └──────────────┘  │   │
│  │                                                                  │   │
│  │  ┌────────┐ ┌──────────┐ ┌──────────┐ ┌─────────────────────┐  │   │
│  │  │Modules │ │ Plugins  │ │Event Bus │ │   Job Scheduler     │  │   │
│  │  │ (Core) │ │ System   │ │ (CQRS)   │ │   (Bull/Redis)      │  │   │
│  │  └────────┘ └──────────┘ └──────────┘ └─────────────────────┘  │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                    │                                     │
├────────────────────────────────────┼────────────────────────────────────┤
│                       Data Layer   │                                     │
│                                    ▼                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐  ┌──────────┐  │
│  │ TypeORM  │  │ MikroORM │  │   Knex   │  │  Redis  │  │OpenSearch│  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬────┘  └────┬─────┘  │
│       │              │              │              │            │        │
│  ┌────┴──────────────┴──────────────┴──┐    ┌─────┴──┐   ┌────┴─────┐  │
│  │  PostgreSQL / MySQL / SQLite        │    │ Cache  │   │  Search  │  │
│  └─────────────────────────────────────┘    └────────┘   └──────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```

## Architectural Layers

### 1. Client Layer

The client layer consists of multiple application types, all consuming the same API:

| Application            | Technology                     | Package Location     | Purpose                             |
| ---------------------- | ------------------------------ | -------------------- | ----------------------------------- |
| **Web UI**             | Angular 19+, Nebular/ngx-admin | `apps/gauzy`         | Primary web interface               |
| **Desktop App**        | Electron + Angular             | `apps/desktop`       | All-in-one desktop application      |
| **Desktop Timer**      | Electron + Angular             | `apps/desktop-timer` | Time tracking & activity monitoring |
| **Desktop Server**     | Electron + NestJS              | `apps/server`        | Self-hosted API server              |
| **API Server Desktop** | Electron + NestJS              | `apps/api-server`    | API-only server deployment          |
| **Ever Teams**         | React/Next.js + React Native   | External repo        | Modern PM/Task interface            |

### 2. API Layer (NestJS)

The backend is a NestJS application following **CQRS** (Command Query Responsibility Segregation) patterns:

- **Controllers** — handle HTTP requests, validate inputs, route to handlers
- **Commands/Queries** — encapsulate business logic via the CQRS pattern
- **Services** — core business logic and data access
- **Guards** — authentication and authorization (JWT, Roles, Permissions, Tenant)
- **Interceptors** — request/response transformation, logging
- **Pipes** — input validation and transformation (class-validator)
- **Modules** — NestJS dependency injection containers

### 3. Data Layer

The platform uses a **Multi-ORM** architecture supporting:

- **TypeORM** — primary ORM with extensive entity definitions, repositories, and migrations
- **MikroORM** — alternative ORM with its own repositories and entity metadata
- **Knex** — raw SQL query builder for complex queries and migrations

All three ORMs connect to the same database and share entity definitions through a shared **Multi-ORM decorator** system.

### 4. Infrastructure Layer

- **PostgreSQL** — primary production database
- **SQLite** — lightweight development/demo database
- **Redis** — caching, session store, and job queue
- **OpenSearch** — full-text search indexing
- **MinIO/S3** — file and image storage
- **Cube** — analytics and BI semantic layer
- **Zipkin/OTEL** — distributed tracing

## Key Architecture Patterns

### Multi-Tenant Architecture

Every entity in the system is scoped to a **tenant**. The `TenantBaseEntity` base class provides:

- Automatic `tenantId` injection on create/update
- Automatic `tenantId` filtering on read queries
- Cross-tenant access prevention at the ORM level

See [Multi-Tenancy](./multi-tenancy) for details.

### Plugin Architecture

The platform supports **dynamic plugins** for extending functionality:

```typescript
@Module({})
export class PluginModule {
  static forRoot(plugins: Type<any>[]): DynamicModule {
    return {
      module: PluginModule,
      imports: plugins,
    };
  }
}
```

Plugins can add: entities, controllers, services, commands, and event handlers. See [Plugin System](./plugin-system).

### CQRS Pattern

Business logic is organized into Commands (write) and Queries (read):

```
Controller → CommandBus/QueryBus → Handler → Service → Repository
```

This pattern enables:

- Clear separation of read and write operations
- Event-driven side effects
- Easier testing through handler isolation

### Event Bus

The platform uses NestJS `@nestjs/cqrs` events for inter-module communication:

```typescript
// Publishing an event
this.eventBus.publish(new EmployeeCreatedEvent(employee));

// Handling an event in another module
@EventHandler(EmployeeCreatedEvent)
export class EmployeeCreatedHandler {
  handle(event: EmployeeCreatedEvent) {
    /* ... */
  }
}
```

### Request Context

A `RequestContext` utility provides access to the current request context throughout the application:

```typescript
// Access current user, tenant, and organization
const tenantId = RequestContext.currentTenantId();
const userId = RequestContext.currentUserId();
const orgId = RequestContext.currentOrganizationId();
```

## Data Flow

### Typical API Request Flow

```
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐     ┌────────┐
│ Client   │────▶│ Guard   │────▶│ Pipe    │────▶│Handler  │────▶│Service │
│ Request  │     │ (Auth)  │     │ (Valid) │     │ (CQRS)  │     │        │
└─────────┘     └─────────┘     └─────────┘     └─────────┘     └───┬────┘
                                                                     │
                                                                     ▼
                                                               ┌────────────┐
                                                               │ Repository │
                                                               │ (ORM)      │
                                                               └─────┬──────┘
                                                                     │
                                                                     ▼
                                                               ┌────────────┐
                                                               │  Database  │
                                                               └────────────┘
```

1. **Guard**: Validates JWT token, checks roles/permissions, resolves tenant
2. **Pipe**: Validates request body against DTO (Data Transfer Object) classes
3. **Handler**: Executes business logic via CQRS command/query handler
4. **Service**: Performs data access, integrations, and business rules
5. **Repository**: Issues database queries through the active ORM

### Guard Chain

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   JWT Auth   │────▶│   Tenant     │────▶│    Role      │────▶│  Permission  │
│    Guard     │     │   Resolve    │     │    Guard     │     │    Guard     │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
```

## Deployment Models

| Model                  | Components                    | Best For                      |
| ---------------------- | ----------------------------- | ----------------------------- |
| **SaaS**               | Cloud-hosted API + UI         | Multi-tenant production       |
| **Self-Hosted**        | Docker or bare metal          | Private infrastructure        |
| **Desktop Server**     | Electron app hosting API      | Small teams, individuals      |
| **Desktop All-in-One** | Full platform in single app   | Personal use                  |
| **Client-Server**      | Separate API server + clients | Teams with centralized server |

## Related Pages

- [Monorepo Structure](./monorepo-structure) — NX workspace organization
- [Technology Stack](./technology-stack) — all technologies used
- [Backend Architecture](./backend-architecture) — NestJS internals
- [Frontend Architecture](./frontend-architecture) — Angular UI
- [Multi-ORM Architecture](./multi-orm-architecture) — TypeORM, MikroORM, Knex
- [Plugin System](./plugin-system) — extending the platform
- [Multi-Tenancy](./multi-tenancy) — tenant isolation
- [Design Principles](./design-principles) — core philosophy
