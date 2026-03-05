---
sidebar_position: 55
---

# Proposal Endpoints

Manage sales proposals for clients.

## Base Path

```
/api/proposal
```

## Endpoints

### List Proposals

```
GET /api/proposal
Authorization: Bearer {token}
```

**Query Parameters:**

| Parameter        | Type   | Description                     |
| ---------------- | ------ | ------------------------------- |
| `page`           | number | Page number                     |
| `limit`          | number | Items per page                  |
| `status`         | string | DRAFT, SENT, ACCEPTED, REJECTED |
| `organizationId` | string | Organization filter             |

### Create Proposal

```
POST /api/proposal
Authorization: Bearer {token}
```

```json
{
  "jobPostUrl": "https://example.com/job",
  "valueDate": "2025-03-05",
  "jobPostContent": "Full-stack developer position",
  "proposalContent": "We propose to deliver...",
  "status": "SENT",
  "organizationContactId": "contact-uuid"
}
```

### Update Proposal

```
PUT /api/proposal/:id
Authorization: Bearer {token}
```

### Delete Proposal

```
DELETE /api/proposal/:id
Authorization: Bearer {token}
```

## Proposal Statuses

| Status   | Description     |
| -------- | --------------- |
| DRAFT    | Not yet sent    |
| SENT     | Sent to client  |
| ACCEPTED | Client accepted |
| REJECTED | Client rejected |

## Related Pages

- [Proposals Management](../features/proposals-management) — feature
- [Contact Endpoints](./contact-endpoints) — contacts API
