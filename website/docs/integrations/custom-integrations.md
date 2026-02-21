---
sidebar_position: 8
---

# Custom Integrations

Build custom integrations using Gauzy's plugin system and API.

## Plugin-Based Integrations

Create a NestJS module that registers as an integration:

```typescript
@Module({
  imports: [IntegrationModule],
  providers: [CustomIntegrationService],
  controllers: [CustomIntegrationController],
})
export class PluginCustomIntegrationModule {}
```

### Integration Entity

Register your integration type:

```typescript
const integration = await this.integrationTypeService.create({
  name: "Custom Service",
  groupName: "Custom",
  order: 100,
  icon: "custom-icon",
  redirectUrl: "/integrations/custom/setup",
});
```

## API-Based Integrations

### REST API

Use the standard REST API to build external integrations:

```bash
# Create time log from external system
POST /api/timesheet/time-log
Authorization: Bearer <token>
Content-Type: application/json

{
  "startedAt": "2024-01-15T09:00:00Z",
  "stoppedAt": "2024-01-15T10:00:00Z",
  "source": "BROWSER_EXTENSION",
  "projectId": "project-uuid",
  "taskId": "task-uuid"
}
```

### GraphQL API

```graphql
mutation CreateTimeLog($input: TimeLogCreateInput!) {
  createTimeLog(input: $input) {
    id
    duration
    startedAt
    stoppedAt
  }
}
```

### Webhooks

Subscribe to events via the webhook system:

```bash
POST /api/integration/webhook
{
  "url": "https://your-service.com/webhook",
  "events": ["time_log.created", "task.updated"],
  "secret": "your-webhook-secret"
}
```

## MCP Integration

For AI-powered integrations, use the [MCP Server](../mcp-server/mcp-overview):

- 323+ available tools
- OAuth 2.0 authentication
- HTTP, WebSocket, and Stdio transports

## Related Pages

- [Integrations Overview](./integrations-overview)
- [API Overview](../api/overview) — REST and GraphQL API
- [MCP Server](../mcp-server/mcp-overview) — AI integration
