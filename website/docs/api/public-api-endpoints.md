---
sidebar_position: 33
---

# Public API Endpoints

Public endpoints that bypass authentication, providing read-only access to shared resources like public invoices, employee profiles, organizations, and teams.

## Security Notice

> ⚠️ **Important**: Public endpoints use enum-based whitelists for relations to prevent unauthorized data exposure. Only explicitly allowed relations can be loaded. See [Public Endpoint Data Exposure](../security/public-endpoint-data-exposure) for details.

## Endpoints

### Public Invoice

Retrieve an invoice by a shared token without authentication.

```
GET /api/public/invoice/:id/:token
```

**Query Parameters:**

| Parameter   | Type  | Description                                                                                                                                            |
| ----------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `relations` | array | Allowed: `fromOrganization`, `toContact`, `invoiceItems`, `invoiceItems.product`, `invoiceItems.expense`, `invoiceItems.task`, `invoiceItems.employee` |

**Response** `200 OK`:

```json
{
  "id": "uuid",
  "invoiceNumber": "INV-001",
  "totalValue": 5000,
  "currency": "USD",
  "invoiceDate": "2024-01-15",
  "dueDate": "2024-02-15",
  "status": "SENT",
  "fromOrganization": { "name": "My Company" },
  "toContact": { "name": "Client Corp" },
  "invoiceItems": [...]
}
```

### Public Employee

View a publicly shared employee profile.

```
GET /api/public/employee/:id
```

### Public Organization

View a publicly shared organization profile.

```
GET /api/public/organization/:profileLink
```

### Public Team

View a publicly shared team.

```
GET /api/public/team/:profileLink
```

## Allowed Relations (Whitelisted)

Each public endpoint has a strict whitelist of allowed relations to prevent information disclosure:

| Endpoint            | Allowed Relations                                                 |
| ------------------- | ----------------------------------------------------------------- |
| Public Invoice      | `fromOrganization`, `toContact`, `invoiceItems`, `invoiceItems.*` |
| Public Employee     | `skills`, `user` (limited fields)                                 |
| Public Organization | `contact`, `skills`, `awards`                                     |
| Public Team         | `members`, `projects`                                             |

## Related Pages

- [Public Endpoint Data Exposure](../security/public-endpoint-data-exposure) — security analysis
- [Invoice Endpoints](./invoice-endpoints) — full invoice API
- [API Security Best Practices](../security/api-security-best-practices) — security patterns
