---
sidebar_position: 2
---

# Coding Standards

Code style and conventions for the Ever Gauzy codebase.

## TypeScript

### General Rules

- Use `strict: true` in tsconfig
- Prefer `const` over `let`; avoid `var`
- Use `async/await` over raw Promises
- Interface names start with `I` (e.g., `IEmployee`)
- Enum names are PascalCase, values are UPPER_SNAKE_CASE

### Naming Conventions

| Element   | Convention     | Example               |
| --------- | -------------- | --------------------- |
| Class     | PascalCase     | `EmployeeService`     |
| Interface | I + PascalCase | `IEmployee`           |
| Function  | camelCase      | `findEmployeeById`    |
| Variable  | camelCase      | `employeeCount`       |
| Constant  | UPPER_SNAKE    | `MAX_RETRY_COUNT`     |
| Enum      | PascalCase     | `EmployeeStatus`      |
| File      | kebab-case     | `employee.service.ts` |

### Import Order

```typescript
// 1. Node.js built-ins
import { join } from "path";

// 2. External packages
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

// 3. Internal packages (@gauzy/*)
import { IEmployee } from "@gauzy/contracts";
import { TenantAwareCrudService } from "@gauzy/core";

// 4. Relative imports
import { Employee } from "./employee.entity";
```

## NestJS Patterns

### Service Pattern

```typescript
@Injectable()
export class EmployeeService extends TenantAwareCrudService<Employee> {
  constructor(
    readonly typeOrmRepo: TypeOrmEmployeeRepository,
    readonly mikroOrmRepo: MikroOrmEmployeeRepository,
  ) {
    super(typeOrmRepo, mikroOrmRepo);
  }
}
```

### Controller Pattern

```typescript
@ApiTags("Employee")
@UseGuards(AuthGuard("jwt"), TenantPermissionGuard)
@Controller("/employee")
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  @Permissions(PermissionsEnum.ORG_EMPLOYEES_VIEW)
  async findAll(@Query() params: PaginationParams<Employee>) {
    return this.employeeService.findAll(params);
  }
}
```

## Linting

```bash
# Run ESLint
yarn lint

# Fix auto-fixable issues
yarn lint --fix
```

## Formatting

Prettier with project defaults:

- Single quotes
- Trailing commas
- Tab width: 4 (most files)
- Print width: 140

## Related Pages

- [Development Guide](./development-guide)
- [Contributing](./contributing)
