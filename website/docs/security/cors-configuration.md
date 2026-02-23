---
sidebar_position: 5
---

# CORS Configuration

Cross-Origin Resource Sharing settings for the API.

## Allowed Headers

CORS is configured in the application bootstrap with explicit allowed headers:

```
Authorization, Language, Tenant-Id, Organization-Id,
X-Requested-With, X-Auth-Token, X-HTTP-Method-Override,
Content-Type, Content-Language, Accept, Accept-Language, Observe
```

## Configuration

```typescript
app.enableCors({
  origin: configService.get("CLIENT_BASE_URL"),
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  allowedHeaders: [
    "Authorization",
    "Language",
    "Tenant-Id",
    "Organization-Id",
    "X-Requested-With",
    "X-Auth-Token",
    "X-HTTP-Method-Override",
    "Content-Type",
    "Content-Language",
    "Accept",
    "Accept-Language",
    "Observe",
  ],
});
```

## Environment Variables

```bash
# Allowed origins (comma-separated for multiple)
ALLOWED_ORIGINS=https://app.gauzy.co,https://demo.gauzy.co,https://stage.gauzy.co
```

:::important
For production deployments, set the `ALLOWED_ORIGINS` environment variable to a comma-separated list of allowed origins. Wildcard origins are not used when credentials are enabled.
:::

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
