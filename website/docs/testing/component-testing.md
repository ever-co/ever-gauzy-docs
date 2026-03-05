---
sidebar_position: 4
---

# Frontend Component Testing

Test Angular components with TestBed and Spectator.

## Setup

Gauzy uses **Karma + Jasmine** for frontend component tests:

```bash
yarn ng test --project gauzy
```

## Writing Component Tests

```typescript
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TaskListComponent } from "./task-list.component";
import { TaskService } from "../services/task.service";
import { of } from "rxjs";

describe("TaskListComponent", () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let mockTaskService: jasmine.SpyObj<TaskService>;

  beforeEach(async () => {
    mockTaskService = jasmine.createSpyObj("TaskService", ["getAll"]);
    mockTaskService.getAll.and.returnValue(of({ items: [], total: 0 }));

    await TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      providers: [{ provide: TaskService, useValue: mockTaskService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should display tasks", () => {
    mockTaskService.getAll.and.returnValue(
      of({
        items: [{ id: "1", title: "Test Task", status: "TODO" }],
        total: 1,
      }),
    );
    component.ngOnInit();
    fixture.detectChanges();

    const element = fixture.nativeElement;
    expect(element.querySelector(".task-title").textContent).toContain(
      "Test Task",
    );
  });

  it("should call service on refresh", () => {
    component.refresh();
    expect(mockTaskService.getAll).toHaveBeenCalled();
  });
});
```

## Testing Templates

```typescript
it("should show empty state when no tasks", () => {
  component.tasks = [];
  fixture.detectChanges();
  const el = fixture.nativeElement.querySelector(".empty-state");
  expect(el).toBeTruthy();
});

it("should render correct number of task rows", () => {
  component.tasks = [
    { id: "1", title: "Task 1" },
    { id: "2", title: "Task 2" },
  ];
  fixture.detectChanges();
  const rows = fixture.nativeElement.querySelectorAll(".task-row");
  expect(rows.length).toBe(2);
});
```

## Testing Pipes

```typescript
describe("TimeFormatPipe", () => {
  const pipe = new TimeFormatPipe();

  it("should format seconds to HH:MM:SS", () => {
    expect(pipe.transform(3661)).toBe("01:01:01");
  });

  it("should handle zero", () => {
    expect(pipe.transform(0)).toBe("00:00:00");
  });
});
```

## Related Pages

- [Unit Testing Guide](./unit-testing) — backend unit tests
- [Angular Module Architecture](../frontend/angular-module-architecture) — frontend structure
