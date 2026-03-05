---
sidebar_position: 3
---

# API Integration Testing

Test API endpoints with real HTTP requests and database operations.

## Overview

Integration tests verify that services, repositories, and controllers work together correctly by testing the full request/response cycle.

## Setup

```typescript
import { Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";

describe("Task API Integration", () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: "sqlite",
          database: ":memory:",
          entities: [
            /* entities */
          ],
          synchronize: true,
        }),
        TaskModule,
        AuthModule,
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    // Seed and get token
    token = await seedAdminAndGetToken(app);
  });
});
```

## Testing CRUD Operations

```typescript
describe("CRUD lifecycle", () => {
  let taskId: string;

  it("CREATE - should create a task", async () => {
    const res = await request(app.getHttpServer())
      .post("/api/task")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Integration Test Task", status: "TODO" })
      .expect(201);

    taskId = res.body.id;
    expect(taskId).toBeDefined();
  });

  it("READ - should find the task", async () => {
    const res = await request(app.getHttpServer())
      .get(`/api/task/${taskId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(res.body.title).toBe("Integration Test Task");
  });

  it("UPDATE - should update the task", async () => {
    await request(app.getHttpServer())
      .put(`/api/task/${taskId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ status: "IN_PROGRESS" })
      .expect(200);
  });

  it("DELETE - should delete the task", async () => {
    await request(app.getHttpServer())
      .delete(`/api/task/${taskId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});
```

## Testing Pagination

```typescript
it("should paginate results", async () => {
  const res = await request(app.getHttpServer())
    .get("/api/task?page=1&limit=5")
    .set("Authorization", `Bearer ${token}`)
    .expect(200);

  expect(res.body.items.length).toBeLessThanOrEqual(5);
  expect(res.body.total).toBeDefined();
});
```

## Testing Validation

```typescript
it("should reject invalid data", async () => {
  await request(app.getHttpServer())
    .post("/api/task")
    .set("Authorization", `Bearer ${token}`)
    .send({ title: "" }) // invalid: empty title
    .expect(400);
});
```

## Related Pages

- [Unit Testing Guide](./unit-testing) — unit tests
- [E2E Testing Guide](./e2e-testing) — E2E tests
- [Test Fixtures](./test-fixtures) — test data
