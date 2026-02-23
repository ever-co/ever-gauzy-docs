---
sidebar_position: 4
---

# Backend Architecture

The Ever Gauzy backend is built on **NestJS**, a progressive Node.js framework for building efficient, scalable server-side applications using TypeScript.

## NestJS Foundation

NestJS provides the architectural backbone with:

- **Dependency Injection (DI)** — module-based inversion of control container
- **Decorators** — declarative metadata for routes, guards, pipes, and more
- **Middleware Pipeline** — composable request/response processing
- **Platform Agnostic** — runs on Express or Fastify (Gauzy uses Express)

## Module Organization

The backend is organized into well-defined NestJS modules within `packages/core/src/lib/`:

### Core Modules

```
packages/core/src/lib/
├── auth/               # Authentication (login, register, social OAuth)
├── user/               # User management
├── tenant/             # Tenant management and onboarding
├── role/               # Role definitions (SUPER_ADMIN, ADMIN, EMPLOYEE, etc.)
├── role-permission/    # Role-permission mappings
├── organization/       # Organization CRUD and settings
├── employee/           # Employee profiles, statistics, awards
├── shared/             # Shared utilities, validators, base entities
├── core/               # Core module registration
└── bootstrap/          # Application bootstrapping
```

### Feature Modules

```
packages/core/src/lib/
├── time-tracking/      # Time logs, timesheets, activity tracking, screenshots
├── tasks/              # Task management with statuses, priorities, sizes
├── organization-project/       # Project management
├── organization-sprint/        # Sprint management
├── organization-project-module/ # Project modules
├── invoice/            # Invoice generation and management
├── expense/            # Expense tracking
├── payment/            # Payment processing
├── income/             # Income records
├── candidate/          # Applicant tracking
├── pipeline/           # Sales pipelines
├── contact/            # Contact/lead management
├── goal/               # Goals and objectives
├── goal-kpi/           # Key Performance Indicators
├── reports/            # Reporting and analytics
└── ... (148 modules total)
```

### Infrastructure Modules

```
packages/core/src/lib/
├── database/           # Database connection and configuration
├── graphql/            # GraphQL schema and resolvers
├── health/             # Health check endpoints
├── logger/             # Logging configuration
├── i18n/               # Internationalization
├── email-send/         # Email dispatch
├── email-template/     # Email templates (Handlebars)
├── export-import/      # Data export/import
├── image-asset/        # Image/file management
├── throttler/          # Rate limiting
├── event-bus/          # Event bus integration
└── integration/        # Third-party integration base
```

## CQRS Pattern

The backend extensively uses **Command Query Responsibility Segregation (CQRS)**:

### Commands (Write Operations)

```typescript
// Command definition
export class CreateEmployeeCommand {
  constructor(public readonly input: IEmployeeCreateInput) {}
}

// Command handler
@CommandHandler(CreateEmployeeCommand)
export class CreateEmployeeHandler
  implements ICommandHandler<CreateEmployeeCommand>
{
  constructor(private readonly employeeService: EmployeeService) {}

  async execute(command: CreateEmployeeCommand): Promise<IEmployee> {
    const { input } = command;
    return this.employeeService.create(input);
  }
}
```

### Queries (Read Operations)

```typescript
// Query definition
export class FindEmployeesQuery {
  constructor(public readonly options: FindManyOptions<Employee>) {}
}

// Query handler
@QueryHandler(FindEmployeesQuery)
export class FindEmployeesHandler implements IQueryHandler<FindEmployeesQuery> {
  constructor(private readonly employeeService: EmployeeService) {}

  async execute(query: FindEmployeesQuery): Promise<IPagination<IEmployee>> {
    return this.employeeService.findAll(query.options);
  }
}
```

### Controller Integration

```typescript
@Controller("employee")
@UseGuards(TenantPermissionGuard)
export class EmployeeController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Permissions(PermissionsEnum.EMPLOYEES_EDIT)
  async create(@Body() entity: CreateEmployeeDTO): Promise<IEmployee> {
    return this.commandBus.execute(new CreateEmployeeCommand(entity));
  }

  @Get()
  @Permissions(PermissionsEnum.EMPLOYEES_VIEW)
  async findAll(
    @Query() options: PaginationParams,
  ): Promise<IPagination<IEmployee>> {
    return this.queryBus.execute(new FindEmployeesQuery(options));
  }
}
```

## Guard Architecture

Guards enforce security at the controller level. They execute in order:

### 1. Authentication Guard (`AuthGuard`)

Validates the JWT token and attaches the authenticated user to the request:

```typescript
@UseGuards(AuthGuard('jwt'))
```

The `@Public()` decorator bypasses authentication for specific endpoints (e.g., registration, login).

### 2. Tenant Permission Guard (`TenantPermissionGuard`)

Combines tenant resolution with permission checking:

- Resolves the tenant from the authenticated user
- Sets `RequestContext.currentTenantId()`
- Validates the user has the required permissions

```typescript
@UseGuards(TenantPermissionGuard)
```

### 3. Role Guard (`RoleGuard`)

Restricts access based on user roles:

```typescript
@Roles(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN)
@UseGuards(RoleGuard)
```

### 4. Permission Guard (`PermissionGuard`)

Fine-grained permission checking:

```typescript
@Permissions(PermissionsEnum.EMPLOYEES_EDIT)
@UseGuards(PermissionGuard)
```

### Guard Hierarchy

```
SUPER_ADMIN
  └── ADMIN
       └── DATA_ENTRY
            └── EMPLOYEE
                 └── CANDIDATE
                      └── VIEWER
```

## Service Layer

Services contain the core business logic and data access patterns:

### Base Service

Most services extend `CrudService<T>`:

```typescript
@Injectable()
export class EmployeeService extends CrudService<Employee> {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {
    super(employeeRepository);
  }

  // CrudService provides: findAll, findOneByIdString, create, update, delete
  // Custom methods add domain-specific logic
}
```

### Tenant-Aware Services

Services extending `TenantAwareCrudService` automatically scope all queries by `tenantId`:

```typescript
@Injectable()
export class ProjectService extends TenantAwareCrudService<OrganizationProject> {
  // All findAll/findOne/create/update/delete operations
  // are automatically filtered by the current tenant
}
```

## Request Context

The `RequestContext` provides a thread-safe way to access request-scoped data anywhere in the application:

```typescript
// Get current tenant
const tenantId = RequestContext.currentTenantId();

// Get current user
const userId = RequestContext.currentUserId();
const user = RequestContext.currentUser();

// Get current organization
const orgId = RequestContext.currentOrganizationId();

// Get current role
const roleId = RequestContext.currentRoleId();
```

## API Documentation

### Swagger (OpenAPI)

The API automatically generates Swagger documentation:

- **URL**: `http://localhost:3000/swg`
- **JSON Spec**: `http://localhost:3000/swg-json`
- **API Docs** (Compodoc): `http://localhost:3000/docs`

### API Versioning

The API uses URL-based versioning:

- Current: `/api/` (v1 implicit)
- All endpoints are prefixed with `/api/`

## Error Handling

The platform uses NestJS exception filters with standard HTTP exceptions:

```typescript
throw new NotFoundException("Employee not found");
throw new BadRequestException("Invalid input");
throw new ForbiddenException("Insufficient permissions");
throw new UnauthorizedException("Token expired");
```

Custom exceptions extend `HttpException` with structured error responses.

## Middleware Pipeline

```
Request → Logger Middleware → Auth Guard → Tenant Guard → Permission Guard
       → Validation Pipe → Controller → Command/Query Handler → Service
       → Response Interceptor → Response
```

## Related Pages

- [Architecture Overview](./overview) — high-level system design
- [Multi-ORM Architecture](./multi-orm-architecture) — database abstraction layer
- [Plugin System](./plugin-system) — extending backend functionality
- [Event Bus](./event-bus) — inter-module communication
