---
sidebar_position: 12
---

# Plugin Development Quickstart

Create a custom plugin for Ever Gauzy in 10 minutes.

## Prerequisites

- Node.js 20+
- Gauzy development environment set up
- Understanding of NestJS modules

## Step 1: Generate Plugin Skeleton

```bash
mkdir packages/plugins/my-awesome-plugin
cd packages/plugins/my-awesome-plugin
```

Create the file structure:

```
my-awesome-plugin/
├── src/
│   ├── index.ts
│   ├── my-awesome-plugin.module.ts
│   ├── my-awesome-plugin.service.ts
│   └── my-awesome-plugin.controller.ts
├── package.json
└── tsconfig.json
```

## Step 2: Define the Module

```typescript
// src/my-awesome-plugin.module.ts
import { Module } from "@nestjs/common";
import { MyAwesomeService } from "./my-awesome-plugin.service";
import { MyAwesomeController } from "./my-awesome-plugin.controller";

@Module({
  controllers: [MyAwesomeController],
  providers: [MyAwesomeService],
  exports: [MyAwesomeService],
})
export class MyAwesomePluginModule {}
```

## Step 3: Create a Service

```typescript
// src/my-awesome-plugin.service.ts
import { Injectable } from "@nestjs/common";

@Injectable()
export class MyAwesomeService {
  getHello(): string {
    return "Hello from My Awesome Plugin!";
  }
}
```

## Step 4: Add a Controller

```typescript
// src/my-awesome-plugin.controller.ts
import { Controller, Get } from "@nestjs/common";
import { MyAwesomeService } from "./my-awesome-plugin.service";

@Controller("my-awesome")
export class MyAwesomeController {
  constructor(private readonly service: MyAwesomeService) {}

  @Get()
  hello() {
    return this.service.getHello();
  }
}
```

## Step 5: Register the Plugin

Add to `packages/core/src/app.module.ts`:

```typescript
import { MyAwesomePluginModule } from "@gauzy/plugin-my-awesome";

@Module({
  imports: [
    // ... other modules
    MyAwesomePluginModule,
  ],
})
export class AppModule {}
```

## Step 6: Test

```bash
yarn start:api
curl http://localhost:3000/api/my-awesome
# → "Hello from My Awesome Plugin!"
```

## Next Steps

- Add entities — [Plugin Entity Registration](./plugin-entity-registration)
- Add lifecycle hooks — [Plugin Lifecycle](./plugin-lifecycle)
- Test your plugin — [Plugin Testing](./plugin-testing)

## Related Pages

- [Plugin Overview](./overview) — plugin system
- [Plugin API Reference](./plugin-api-reference) — full API
