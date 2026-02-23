---
sidebar_position: 8
---

# Frontend Testing

Testing strategies for the Angular frontend.

## Testing Stack

| Tool                | Purpose                 |
| ------------------- | ----------------------- |
| **Jest**            | Unit test runner        |
| **Angular TestBed** | Component testing       |
| **Spectator**       | Test helpers (optional) |
| **Cypress**         | E2E testing             |

## Unit Tests

### Component Testing

```typescript
describe("DashboardComponent", () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [HttpClientTestingModule, TranslateModule.forRoot()],
      providers: [
        { provide: EmployeesService, useValue: mockEmployeesService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
```

### Service Testing

```typescript
describe("EmployeesService", () => {
  let service: EmployeesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmployeesService],
    });
    service = TestBed.inject(EmployeesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it("should fetch employees", () => {
    service.getAll().subscribe((result) => {
      expect(result.items.length).toBe(2);
    });

    const req = httpMock.expectOne("/api/employee");
    expect(req.request.method).toBe("GET");
    req.flush({ items: [{}, {}], total: 2 });
  });
});
```

## Running Tests

```bash
# Run all tests
yarn test

# Run specific project tests
npx nx test gauzy

# Run with coverage
npx nx test gauzy --coverage

# Watch mode
npx nx test gauzy --watch
```

## E2E Tests

```bash
# Run Cypress
npx nx e2e gauzy-e2e
```

## Related Pages

- [Frontend Overview](./frontend-overview)
- [Development Guide](../development/testing) — backend testing
