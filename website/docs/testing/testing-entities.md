---
sidebar_position: 9
---

# Testing Database Entities

Test entity relationships, validators, and custom logic.

## Testing Entity Validation

```typescript
import { validate } from "class-validator";
import { CreateEmployeeDTO } from "./create-employee.dto";

describe("CreateEmployeeDTO", () => {
  it("should validate with correct data", async () => {
    const dto = new CreateEmployeeDTO();
    dto.firstName = "John";
    dto.lastName = "Doe";
    dto.startedWorkOn = new Date().toISOString();

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it("should fail without required fields", async () => {
    const dto = new CreateEmployeeDTO();
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it("should reject invalid email", async () => {
    const dto = new CreateEmployeeDTO();
    dto.firstName = "John";
    dto.email = "not-an-email";

    const errors = await validate(dto);
    const emailError = errors.find((e) => e.property === "email");
    expect(emailError).toBeDefined();
  });
});
```

## Testing Entity Relations

```typescript
describe("Employee Entity Relations", () => {
  let connection: Connection;

  beforeAll(async () => {
    connection = await createConnection({
      type: "sqlite",
      database: ":memory:",
      entities: [Employee, User, Organization, Tenant],
      synchronize: true,
    });
  });

  it("should cascade save user relation", async () => {
    const employee = new Employee();
    employee.user = new User();
    employee.user.email = "cascade@test.co";

    const saved = await connection.getRepository(Employee).save(employee);
    expect(saved.user.id).toBeDefined();
  });
});
```

## Testing Subscribers

```typescript
describe("EmployeeSubscriber", () => {
  it("should trigger beforeInsert", async () => {
    const subscriber = new EmployeeSubscriber();
    const entity = new Employee();

    await subscriber.beforeInsert({ entity } as any);
    expect(entity.createdAt).toBeDefined();
  });
});
```

## Related Pages

- [Entity Inheritance](../architecture/entity-inheritance) — base entities
- [TypeORM Migrations](../database/typeorm-migrations) — migrations
- [Test Fixtures](./test-fixtures) — test data
