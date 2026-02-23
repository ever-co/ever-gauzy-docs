---
sidebar_position: 8
---

# CQRS & Event Handlers

Command Query Responsibility Segregation pattern in Ever Gauzy.

## Overview

Ever Gauzy uses the NestJS CQRS module for separating write operations (commands) from read operations (queries).

## Commands

### Defining a Command

```typescript
export class AuthRegisterCommand implements ICommand {
  constructor(public readonly input: IUserRegistrationInput) {}
}
```

### Command Handler

```typescript
@CommandHandler(AuthRegisterCommand)
export class AuthRegisterHandler implements ICommandHandler<AuthRegisterCommand> {
  constructor(private readonly authService: AuthService) {}

  async execute(command: AuthRegisterCommand): Promise<IUser> {
    return this.authService.register(command.input);
  }
}
```

### Dispatching Commands

```typescript
@Controller("/auth")
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post("register")
  async register(@Body() input: RegisterUserDTO) {
    return this.commandBus.execute(new AuthRegisterCommand(input));
  }
}
```

## Queries

```typescript
// Query
export class GetEmployeeQuery implements IQuery {
  constructor(public readonly id: string) {}
}

// Handler
@QueryHandler(GetEmployeeQuery)
export class GetEmployeeHandler implements IQueryHandler<GetEmployeeQuery> {
  async execute(query: GetEmployeeQuery): Promise<IEmployee> {
    return this.employeeService.findOneByIdString(query.id);
  }
}
```

## Events

```typescript
// Event
export class EmployeeCreatedEvent {
  constructor(public readonly employee: IEmployee) {}
}

// Event Handler
@EventsHandler(EmployeeCreatedEvent)
export class EmployeeCreatedHandler implements IEventHandler<EmployeeCreatedEvent> {
  handle(event: EmployeeCreatedEvent) {
    // Send welcome email, update analytics, etc.
  }
}
```

## When to Use

| Pattern                 | Use When                                   |
| ----------------------- | ------------------------------------------ |
| **Direct service call** | Simple CRUD                                |
| **Command**             | Complex write operations with side effects |
| **Query**               | Complex read with multiple data sources    |
| **Event**               | Triggering background or async work        |

## Related Pages

- [Architecture Overview](../architecture/overview)
- [Development Guide](./development-guide)
