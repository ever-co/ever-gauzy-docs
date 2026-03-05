---
sidebar_position: 26
---

# Contact Endpoints

Manage organization contacts — customers, vendors, leads, and other business contacts used across the CRM module.

## Base Path

```
/api/organization-contact
```

## Endpoints

### List Contacts (Paginated)

```
GET /api/organization-contact/pagination
Authorization: Bearer {token}
```

### Find All Contacts

```
GET /api/organization-contact
Authorization: Bearer {token}
```

### Get Contact by ID

```
GET /api/organization-contact/:id
Authorization: Bearer {token}
```

### Create Contact

```
POST /api/organization-contact
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Acme Corporation",
  "contactType": "CUSTOMER",
  "primaryEmail": "info@acme.com",
  "primaryPhone": "+1-555-0123",
  "organizationId": "uuid",
  "imageUrl": "https://...",
  "budget": 50000,
  "budgetType": "HOURS",
  "members": [{ "id": "employee-uuid" }],
  "tags": [{ "id": "tag-uuid" }]
}
```

### Update Contact

```
PUT /api/organization-contact/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Updated Contact Name",
  "primaryEmail": "new@email.com"
}
```

### Delete Contact

```
DELETE /api/organization-contact/:id
Authorization: Bearer {token}
```

## Contact Types

| Type       | Description          |
| ---------- | -------------------- |
| `CUSTOMER` | Paying customer      |
| `CLIENT`   | Client relationship  |
| `LEAD`     | Prospective customer |
| `VENDOR`   | Supplier or vendor   |
| `PARTNER`  | Business partner     |

## Data Model

```typescript
interface IOrganizationContact {
  id: string;
  name: string;
  contactType: ContactType;
  primaryEmail?: string;
  primaryPhone?: string;
  imageUrl?: string;
  budget?: number;
  budgetType?: OrganizationContactBudgetTypeEnum;
  notes?: string;

  // Relations
  organizationId: string;
  members?: IEmployee[];
  projects?: IOrganizationProject[];
  invoices?: IInvoice[];
  tags?: ITag[];
  tenantId: string;
}
```

## Permissions

| Action          | Required Permission                  |
| --------------- | ------------------------------------ |
| View contacts   | `ALL_ORG_VIEW` or `ORG_CONTACT_VIEW` |
| Create contacts | `ALL_ORG_EDIT` or `ORG_CONTACT_EDIT` |
| Update contacts | `ALL_ORG_EDIT` or `ORG_CONTACT_EDIT` |
| Delete contacts | `ALL_ORG_EDIT` or `ORG_CONTACT_EDIT` |

## Related Pages

- [CRM Overview](../features/crm-overview) — CRM feature documentation
- [Pipeline & Deal Endpoints](./pipeline-deal-endpoints) — sales pipelines
- [Contacts Management](../features/contacts-management) — feature guide
