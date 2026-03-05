---
sidebar_position: 6
---

# Mocking Strategies

Effective mocking patterns for Gauzy tests.

## Repository Mocking

```typescript
const mockRepository = {
  findOne: jest.fn(),
  find: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  count: jest.fn(),
  createQueryBuilder: jest.fn(() => ({
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    getMany: jest.fn().mockResolvedValue([]),
    getCount: jest.fn().mockResolvedValue(0),
  })),
};
```

## Service Mocking

```typescript
const mockEmployeeService = {
  findAll: jest.fn().mockResolvedValue({ items: [], total: 0 }),
  findOneByIdString: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

// In module
providers: [{ provide: EmployeeService, useValue: mockEmployeeService }];
```

## HTTP Mocking

```typescript
// Angular HTTP testing
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";

let httpMock: HttpTestingController;

it("should fetch employees", () => {
  service.getEmployees().subscribe((data) => {
    expect(data.length).toBe(2);
  });

  const req = httpMock.expectOne("/api/employee");
  req.flush([{ id: "1" }, { id: "2" }]);
});
```

## Request Context Mocking

```typescript
const mockRequest = {
  user: { id: "user-uuid", tenantId: "tenant-uuid" },
  headers: { authorization: "Bearer token" },
};

const mockRequestContext = {
  currentTenantId: jest.fn().mockReturnValue("tenant-uuid"),
  currentUserId: jest.fn().mockReturnValue("user-uuid"),
};
```

## When to Mock vs. Use Real

| Use Mock               | Use Real                    |
| ---------------------- | --------------------------- |
| External HTTP APIs     | Database (in integration)   |
| Email services         | Validation pipes            |
| File storage providers | DTO transformations         |
| Payment gateways       | Business logic calculations |

## Related Pages

- [Unit Testing Guide](./unit-testing) — unit tests
- [Test Fixtures](./test-fixtures) — test data
- [Testing Guards](./testing-guards) — guard tests
