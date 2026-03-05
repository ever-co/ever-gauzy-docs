---
sidebar_position: 25
---

# Deal Endpoints

Manage sales deals within pipeline stages.

## Base Path

```
/api/deals
```

## Endpoints

### List Deals

```
GET /api/deals
Authorization: Bearer {token}
```

**Query Parameters:**

| Parameter   | Type   | Description       |
| ----------- | ------ | ----------------- |
| `stageId`   | UUID   | Filter by stage   |
| `page`      | number | Page number       |
| `limit`     | number | Items per page    |
| `relations` | string | Include relations |

### Get Deal by ID

```
GET /api/deals/:id
Authorization: Bearer {token}
```

### Create Deal

```
POST /api/deals
Authorization: Bearer {token}
```

**Request Body:**

```json
{
  "title": "Enterprise License — Acme Corp",
  "probability": 75,
  "stageId": "stage-uuid",
  "clientId": "contact-uuid"
}
```

### Update Deal

```
PUT /api/deals/:id
Authorization: Bearer {token}
```

### Delete Deal

```
DELETE /api/deals/:id
Authorization: Bearer {token}
```

## Data Model

```typescript
interface IDeal {
  id: string;
  title: string;
  probability?: number;
  stageId: string;
  stage?: IPipelineStage;
  clientId?: string;
  client?: IOrganizationContact;
  createdByUserId?: string;
  organizationId: string;
  tenantId: string;
}
```

## Related Pages

- [Pipeline & Deal Endpoints](./pipeline-deal-endpoints) — pipeline management
- [Contact Endpoints](./contact-endpoints) — CRM contacts
- [Sales Pipelines](../features/sales-pipelines) — feature guide
