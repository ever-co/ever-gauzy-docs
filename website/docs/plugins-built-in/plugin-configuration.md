---
sidebar_position: 15
---

# Plugin Configuration

Configure plugin settings and environment variables.

## Configuration Pattern

```typescript
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: "MY_PLUGIN_CONFIG",
      useFactory: (config: ConfigService) => ({
        apiKey: config.get("MY_PLUGIN_API_KEY"),
        endpoint: config.get("MY_PLUGIN_ENDPOINT", "https://api.default.com"),
        enabled: config.get("MY_PLUGIN_ENABLED", "true") === "true",
      }),
      inject: [ConfigService],
    },
    MyPluginService,
  ],
})
export class MyPluginModule {}
```

## Using Configuration

```typescript
@Injectable()
export class MyPluginService {
  constructor(
    @Inject("MY_PLUGIN_CONFIG")
    private readonly config: MyPluginConfig,
  ) {}

  async process() {
    if (!this.config.enabled) return;

    const response = await fetch(this.config.endpoint, {
      headers: { Authorization: `Bearer ${this.config.apiKey}` },
    });
  }
}
```

## Environment Variables

```env
# Plugin-specific env vars
MY_PLUGIN_API_KEY=your-api-key
MY_PLUGIN_ENDPOINT=https://api.example.com
MY_PLUGIN_ENABLED=true
```

## Validation

```typescript
import { IsString, IsUrl, IsBoolean } from "class-validator";

export class MyPluginConfigDTO {
  @IsString()
  apiKey: string;

  @IsUrl()
  endpoint: string;

  @IsBoolean()
  enabled: boolean;
}
```

## Related Pages

- [Plugin Dev Quickstart](./plugin-dev-quickstart) — getting started
- [Plugin Lifecycle](./plugin-lifecycle) — lifecycle hooks
- [Configuration System](../architecture/configuration-system) — config overview
