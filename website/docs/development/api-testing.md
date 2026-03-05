---
sidebar_position: 16
---

# API Testing Guide

Test API endpoints using Jest, Supertest, and HTTP clients.

## Setup

```typescript
// test/setup.ts
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as request from "supertest";
import { AppModule } from "../src/app.module";

let app: INestApplication;
let authToken: string;

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleRef.createNestApplication();
  await app.init();

  // Login for auth token
  const res = await request(app.getHttpServer())
    .post("/api/auth/login")
    .send({ email: "admin@ever.co", password: "admin" });
  authToken = res.body.token;
});
```

## Test Patterns

### CRUD Tests

```typescript
describe("Task CRUD", () => {
  let taskId: string;

  test("POST /api/task - Create", async () => {
    const res = await request(app.getHttpServer())
      .post("/api/task")
      .set("Authorization", `Bearer ${authToken}`)
      .send({ title: "Test Task", status: "TODO" })
      .expect(201);

    taskId = res.body.id;
    expect(res.body.title).toBe("Test Task");
  });

  test("GET /api/task/:id - Read", async () => {
    const res = await request(app.getHttpServer())
      .get(`/api/task/${taskId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .expect(200);

    expect(res.body.id).toBe(taskId);
  });

  test("PUT /api/task/:id - Update", async () => {
    await request(app.getHttpServer())
      .put(`/api/task/${taskId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({ title: "Updated Task" })
      .expect(200);
  });

  test("DELETE /api/task/:id - Delete", async () => {
    await request(app.getHttpServer())
      .delete(`/api/task/${taskId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .expect(200);
  });
});
```

### Permission Tests

```typescript
test("should deny access without proper permission", async () => {
  await request(app.getHttpServer())
    .delete("/api/organization/some-id")
    .set("Authorization", `Bearer ${viewerToken}`)
    .expect(403);
});
```

### Tenant Isolation Tests

```typescript
test("should not access other tenant data", async () => {
  await request(app.getHttpServer())
    .get(`/api/task/${otherTenantTaskId}`)
    .set("Authorization", `Bearer ${authToken}`)
    .expect(404);
});
```

## Related Pages

- [Testing Strategy](./testing-strategy) — testing overview
- [API Overview](../api/overview) — API reference
