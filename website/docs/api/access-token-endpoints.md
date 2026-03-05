---
sidebar_position: 41
---

# Access Token Endpoints

Manage API access tokens for programmatic access.

## Base Path

```
/api/access-token
```

## Endpoints

### List Tokens

```
GET /api/access-token
Authorization: Bearer {token}
```

Returns all access tokens for the current user/tenant.

### Create Token

```
POST /api/access-token
Authorization: Bearer {token}
```

**Body:**

```json
{
  "name": "CI/CD Token",
  "expiresAt": "2026-12-31T00:00:00Z",
  "scopes": ["read:employees", "write:tasks"]
}
```

**Response:**

```json
{
  "id": "uuid",
  "name": "CI/CD Token",
  "token": "gzy_xxxxxxxxxxxxxxxxxxxx",
  "expiresAt": "2026-12-31T00:00:00Z"
}
```

> **Note:** The `token` value is only shown once at creation time. Store it securely.

### Revoke Token

```
DELETE /api/access-token/:id
Authorization: Bearer {token}
```

### Update Token

```
PUT /api/access-token/:id
Authorization: Bearer {token}
```

```json
{
  "name": "Updated Name",
  "expiresAt": "2027-06-30T00:00:00Z"
}
```

## Token Usage

Use access tokens as Bearer tokens:

```bash
curl -H "Authorization: Bearer gzy_xxxxxxxxxxxxxxxxxxxx" \
  https://api.example.com/api/employee
```

## Token Scopes

| Scope              | Description                |
| ------------------ | -------------------------- |
| `read:employees`   | Read employee data         |
| `write:employees`  | Modify employee data       |
| `read:tasks`       | Read tasks                 |
| `write:tasks`      | Create/modify tasks        |
| `read:timesheets`  | Read time entries          |
| `write:timesheets` | Create/modify time entries |
| `admin`            | Full admin access          |

## Related Pages

- [Auth Endpoints](./auth-endpoints) — JWT authentication
- [API Overview](./overview) — API reference
