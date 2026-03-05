---
sidebar_position: 5
---

# Test Fixtures & Factories

Create and manage test data for consistent, reliable tests.

## Factory Pattern

Create reusable factories for entity generation:

```typescript
// factories/employee.factory.ts
import { faker } from "@faker-js/faker";

export const createMockEmployee = (overrides = {}) => ({
  id: faker.string.uuid(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  startedWorkOn: faker.date.past().toISOString(),
  isActive: true,
  tenantId: faker.string.uuid(),
  organizationId: faker.string.uuid(),
  ...overrides,
});

export const createMockTask = (overrides = {}) => ({
  id: faker.string.uuid(),
  title: faker.lorem.sentence(4),
  description: faker.lorem.paragraph(),
  status: "TODO",
  priority: "MEDIUM",
  ...overrides,
});
```

## Using Factories

```typescript
describe("EmployeeService", () => {
  it("should calculate total hours", () => {
    const employee = createMockEmployee({ isActive: true });
    const timeLogs = [
      createMockTimeLog({ employeeId: employee.id, duration: 3600 }),
      createMockTimeLog({ employeeId: employee.id, duration: 7200 }),
    ];

    const total = service.calculateTotalHours(timeLogs);
    expect(total).toBe(3); // 10800 seconds = 3 hours
  });
});
```

## Database Seeding for Tests

```typescript
// test/seed.ts
export async function seedTestData(connection: Connection) {
  const tenant = await connection.getRepository(Tenant).save({
    name: "Test Tenant",
  });

  const organization = await connection.getRepository(Organization).save({
    name: "Test Org",
    tenantId: tenant.id,
  });

  const user = await connection.getRepository(User).save({
    email: "test@ever.co",
    tenantId: tenant.id,
    hash: await bcrypt.hash("test123", 10),
  });

  return { tenant, organization, user };
}
```

## Fixture Files

For static test data, use JSON fixtures:

```json
// fixtures/employees.json
[
  { "firstName": "John", "lastName": "Doe", "email": "john@test.co" },
  { "firstName": "Jane", "lastName": "Smith", "email": "jane@test.co" }
]
```

## Related Pages

- [Unit Testing Guide](./unit-testing) — unit tests
- [Database Seeding](../database/database-seeding) — production seeding
- [Mocking Strategies](./mocking-strategies) — mocking patterns
