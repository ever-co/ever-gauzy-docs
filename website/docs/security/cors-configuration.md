---
sidebar_position: 5
---

# CORS Configuration

Cross-Origin Resource Sharing settings for the API.

## Configuration

```typescript
app.enableCors({
  origin: configService.get("CLIENT_BASE_URL"),
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "Tenant-Id", "Language"],
});
```

## Environment Variables

```bash
# Allowed origins (comma-separated for multiple)
CLIENT_BASE_URL=https://app.yourdomain.com
```

## Production Setup

For production, restrict CORS to your domains:

```typescript
app.enableCors({
  origin: ["https://app.yourdomain.com", "https://admin.yourdomain.com"],
  credentials: true,
});
```

## Development

For development, allow all origins:

```typescript
app.enableCors({
  origin: true, // Allow all origins
  credentials: true,
});
```

## Related Pages

- [Security Overview](./security-overview)
- [Deployment Overview](../deployment/deployment-overview) — production config
