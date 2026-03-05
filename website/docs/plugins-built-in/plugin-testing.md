---
sidebar_position: 16
---

# Plugin Testing

Test your custom Gauzy plugins.

## Unit Testing Plugins

```typescript
import { Test, TestingModule } from "@nestjs/testing";
import { MyPluginService } from "./my-plugin.service";

describe("MyPluginService", () => {
  let service: MyPluginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MyPluginService,
        {
          provide: "MY_PLUGIN_CONFIG",
          useValue: {
            apiKey: "test-key",
            endpoint: "https://test.api.com",
            enabled: true,
          },
        },
      ],
    }).compile();

    service = module.get(MyPluginService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should process data", async () => {
    const result = await service.process({ input: "test" });
    expect(result).toBeDefined();
  });
});
```

## Integration Testing

```typescript
describe("MyPlugin Integration", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule, MyPluginModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it("should register plugin endpoint", async () => {
    await request(app.getHttpServer()).get("/api/my-plugin/status").expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
```

## Mocking External Services

```typescript
const mockExternalApi = {
  fetchData: jest.fn().mockResolvedValue({ success: true }),
  sendNotification: jest.fn().mockResolvedValue(true),
};

// In module
providers: [{ provide: ExternalApiService, useValue: mockExternalApi }];
```

## Related Pages

- [Plugin Dev Quickstart](./plugin-dev-quickstart) — getting started
- [Unit Testing Guide](../testing/unit-testing) — unit tests
- [E2E Testing Guide](../testing/e2e-testing) — E2E tests
