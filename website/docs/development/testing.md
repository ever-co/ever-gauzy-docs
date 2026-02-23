---
sidebar_position: 3
---

# Testing

Testing strategies for the Ever Gauzy backend.

## Testing Stack

| Tool                 | Purpose                    |
| -------------------- | -------------------------- |
| **Jest**             | Unit and integration tests |
| **Supertest**        | HTTP endpoint testing      |
| **TestBed (NestJS)** | Module-level testing       |

## Unit Tests

### Service Testing

```typescript
describe("EmployeeService", () => {
  let service: EmployeeService;
  let mockRepo: jest.Mocked<Repository<Employee>>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        EmployeeService,
        {
          provide: getRepositoryToken(Employee),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(EmployeeService);
    mockRepo = module.get(getRepositoryToken(Employee));
  });

  it("should return all employees", async () => {
    const employees = [{ id: "1", firstName: "John" }];
    mockRepo.find.mockResolvedValue(employees as Employee[]);

    const result = await service.findAll();
    expect(result).toEqual(employees);
  });
});
```

### Controller Testing

```typescript
describe("EmployeeController", () => {
  let controller: EmployeeController;
  let service: jest.Mocked<EmployeeService>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [
        { provide: EmployeeService, useValue: { findAll: jest.fn() } },
      ],
    }).compile();

    controller = module.get(EmployeeController);
    service = module.get(EmployeeService);
  });
});
```

## Integration Tests (E2E)

```typescript
describe("Employee API (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it("GET /api/employee", () => {
    return request(app.getHttpServer())
      .get("/api/employee")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.items).toBeDefined();
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
```

## Running Tests

```bash
# Run all tests
yarn test

# Run specific project
npx nx test api

# Watch mode
npx nx test api --watch

# Coverage report
npx nx test api --coverage
```

## Related Pages

- [Development Guide](./development-guide)
- [Frontend Testing](../frontend/testing)
