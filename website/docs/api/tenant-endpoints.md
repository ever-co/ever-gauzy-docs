---
sidebar_position: 21
---

# Tenant Endpoints

Manage tenants, tenant settings, and tenant API keys. Tenants are the top-level isolation boundary in Ever Gauzy — all data is scoped to a tenant.

## Base Paths

| Resource       | Path                  |
| -------------- | --------------------- |
| Tenant         | `/api/tenant`         |
| Tenant Setting | `/api/tenant-setting` |
| Tenant API Key | `/api/tenant-api-key` |

## Tenant

### Get Current Tenant

Retrieves the tenant for the currently authenticated user.

```
GET /api/tenant
Authorization: Bearer {token}
```

**Response** `200 OK`:

```json
{
  "id": "uuid",
  "name": "My Company",
  "logo": "https://...",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Create Tenant

Creates a new tenant. The user who creates the tenant is assigned the `SUPER_ADMIN` role. A user can only create one tenant — if the user already has a `tenantId` or `roleId`, a `400 Bad Request` is returned.

```
POST /api/tenant
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "New Company",
  "logo": "https://..."
}
```

**Response** `201 Created`.

### Update Tenant

Updates the current tenant. Requires `SUPER_ADMIN` role.

```
PUT /api/tenant
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Updated Company Name"
}
```

**Response** `202 Accepted`.

### Delete Tenant

Deletes the current tenant. Requires `SUPER_ADMIN` role. This is a destructive operation that removes all organization data.

```
DELETE /api/tenant
Authorization: Bearer {token}
```

**Response** `200 OK`.

## Tenant Settings

Tenant settings store global configuration values for a tenant (e.g., date format, currency, file storage provider).

### Get Tenant Settings

```
GET /api/tenant-setting
Authorization: Bearer {token}
```

### Update Tenant Settings

```
POST /api/tenant-setting
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "SETTING_KEY",
  "value": "setting_value"
}
```

## Tenant API Keys

Tenant API keys provide programmatic access to the API without user authentication. See [Tenant API Keys](../security/tenant-api-keys) for security details.

### List API Keys

```
GET /api/tenant-api-key
Authorization: Bearer {token}
```

### Create API Key

```
POST /api/tenant-api-key
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "CI/CD Integration Key",
  "expiresAt": "2025-12-31T00:00:00.000Z"
}
```

### Delete API Key

```
DELETE /api/tenant-api-key/:id
Authorization: Bearer {token}
```

## Data Model

```typescript
interface ITenant {
  id: string;
  name: string;
  logo?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ITenantSetting {
  id: string;
  name: string;
  value: string;
  tenantId: string;
}

interface ITenantApiKey {
  id: string;
  name: string;
  apiKey: string; // Hashed in DB
  tenantId: string;
  expiresAt?: Date;
}
```

## Permissions

| Action                 | Required Role/Permission           |
| ---------------------- | ---------------------------------- |
| Get tenant             | Authenticated user                 |
| Create tenant          | Authenticated (no existing tenant) |
| Update/Delete tenant   | `SUPER_ADMIN`                      |
| Manage tenant settings | `SUPER_ADMIN`                      |
| Manage API keys        | `SUPER_ADMIN`                      |

## Related Pages

- [Multi-Tenancy Architecture](../architecture/multi-tenancy) — how tenant isolation works
- [Tenant Isolation Security](../security/tenant-isolation) — security model
- [Tenant API Keys](../security/tenant-api-keys) — API key authentication
