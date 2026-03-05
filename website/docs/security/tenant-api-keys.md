---
sidebar_position: 6
---

# Tenant API Keys

Programmatic API access using tenant-scoped API keys.

## Overview

Tenant API Keys provide an alternative to JWT authentication for machine-to-machine communication. Each key is scoped to a specific tenant.

## Creating API Keys

```
POST /api/tenant-api-key
Authorization: Bearer {admin-token}
Content-Type: application/json

{
  "name": "CI/CD Integration",
  "expiresAt": "2025-12-31T00:00:00.000Z"
}
```

## Using API Keys

Include the API key in the `X-API-Key` header:

```
GET /api/employee
X-API-Key: {api-key}
```

## Key Properties

| Property   | Description                   |
| ---------- | ----------------------------- |
| Name       | Human-readable key identifier |
| API Key    | The secret key (shown once)   |
| Expires At | Optional expiration date      |
| Tenant     | Scoped to creating tenant     |

## Security Considerations

| Practice      | Recommendation                |
| ------------- | ----------------------------- |
| Key storage   | Store as environment variable |
| Rotation      | Rotate quarterly              |
| Expiration    | Always set expiration dates   |
| Minimum scope | Create purpose-specific keys  |
| Revocation    | Delete immediately if leaked  |

## Related Pages

- [Tenant Endpoints](../api/tenant-endpoints) — tenant API
- [API Security Best Practices](./api-security-best-practices) — API security
- [Secret Management](./secret-management) — managing secrets
