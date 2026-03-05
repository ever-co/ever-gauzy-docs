---
sidebar_position: 1
---

# Unit Testing Guide

Write effective unit tests for Ever Gauzy services, controllers, and utilities.

## Setup

Gauzy uses **Jest** as the test framework. Tests are colocated with source files:

```
src/
├── employee/
│   ├── employee.service.ts
│   ├── employee.service.spec.ts    ← unit test
│   ├── employee.controller.ts
│   └── employee.controller.spec.ts
```

## Running Tests

```bash
# Run all tests
yarn test

# Run tests for a specific package
yarn test --project=@gauzy/core

# Run in watch mode
yarn test --watch

# With coverage
yarn test --coverage
```

## Writing a Service Test

```typescript
import { Test, TestingModule } from "@nestjs/testing";
import { EmployeeService } from "./employee.service";
import { TypeOrmEmployeeRepository } from "./repository/type-orm-employee.repository";

describe("EmployeeService", () => {
  let service: EmployeeService;
  let mockRepo: jest.Mocked<TypeOrmEmployeeRepository>;

  beforeEach(async () => {
    mockRepo = {
      findOne: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      delete: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeService,
        {
          provide: TypeOrmEmployeeRepository,
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<EmployeeService>(EmployeeService);
  });

  describe("findById", () => {
    it("should return an employee by ID", async () => {
      const employee = { id: "uuid", firstName: "John" };
      mockRepo.findOne.mockResolvedValue(employee as any);

      const result = await service.findOneByIdString("uuid");
      expect(result).toEqual(employee);
      expect(mockRepo.findOne).toHaveBeenCalledWith({
        where: { id: "uuid" },
      });
    });

    it("should throw if employee not found", async () => {
      mockRepo.findOne.mockResolvedValue(null);
      await expect(service.findOneByIdString("bad-id")).rejects.toThrow();
    });
  });
});
```

## Writing a Controller Test

```typescript
describe("EmployeeController", () => {
  let controller: EmployeeController;
  let service: jest.Mocked<EmployeeService>;

  beforeEach(async () => {
    service = {
      findAll: jest.fn(),
      create: jest.fn(),
    } as any;

    const module = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [{ provide: EmployeeService, useValue: service }],
    }).compile();

    controller = module.get(EmployeeController);
  });

  it("should return paginated employees", async () => {
    service.findAll.mockResolvedValue({ items: [], total: 0 });
    const result = await controller.findAll({});
    expect(result.total).toBe(0);
  });
});
```

## Best Practices

| Practice           | Description                        |
| ------------------ | ---------------------------------- |
| Test one thing     | Each test case tests one behavior  |
| Descriptive names  | `should return 404 when not found` |
| Arrange-Act-Assert | Clear test structure               |
| Mock external deps | Database, HTTP, services           |
| Test edge cases    | Null, empty, boundary values       |

## Related Pages

- [E2E Testing Guide](./e2e-testing) — integration tests
- [Test Fixtures & Factories](./test-fixtures) — test data
- [Code Coverage](./code-coverage) — coverage reports
