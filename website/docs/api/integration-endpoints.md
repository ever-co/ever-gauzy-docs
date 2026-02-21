---
sidebar_position: 13
---

# Integration Endpoints

API endpoints for managing third-party integrations.

## Integration Management

### List Available Integration Types

```http
GET /api/integration-type
Authorization: Bearer {token}
```

### List Active Integrations

```http
GET /api/integration?where[organizationId]={org-id}
Authorization: Bearer {token}
```

**Response (200 OK):**

```json
{
  "items": [
    {
      "id": "...",
      "name": "GitHub",
      "isActive": true,
      "entitySettings": [...],
      "organizationId": "...",
      "integration": {
        "name": "GitHub",
        "imgSrc": "github.svg"
      }
    }
  ],
  "total": 3
}
```

### Create Integration

```http
POST /api/integration
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "GitHub",
  "integrationId": "github-type-uuid",
  "organizationId": "org-uuid"
}
```

## GitHub Integration

### Install GitHub App

```http
POST /api/integration/github/install
Authorization: Bearer {token}
Content-Type: application/json

{
  "installation_id": "12345",
  "organizationId": "org-uuid"
}
```

### List GitHub Repositories

```http
GET /api/integration/github/repositories?integrationId={integration-id}
Authorization: Bearer {token}
```

### Sync GitHub Issues

```http
POST /api/integration/github/sync-issues
Authorization: Bearer {token}
Content-Type: application/json

{
  "integrationId": "integration-uuid",
  "repository": "owner/repo-name"
}
```

### GitHub Webhook

```http
POST /api/integration/github/webhook
X-GitHub-Event: {event-type}
X-Hub-Signature-256: {signature}
```

## Upwork Integration

### Connect Upwork Account

```http
POST /api/integrations/upwork/token
Authorization: Bearer {token}
Content-Type: application/json

{
  "accessToken": "upwork-access-token",
  "accessTokenSecret": "upwork-token-secret",
  "organizationId": "org-uuid"
}
```

### Sync Upwork Work Diary

```http
POST /api/integrations/upwork/sync-contracts
Authorization: Bearer {token}
Content-Type: application/json

{
  "integrationId": "integration-uuid",
  "dateRange": {
    "start": "2024-01-01",
    "end": "2024-01-31"
  }
}
```

## HubStaff Integration

### Connect HubStaff

```http
POST /api/integrations/hubstaff/token
Authorization: Bearer {token}
Content-Type: application/json

{
  "accessToken": "hubstaff-access-token",
  "refreshToken": "hubstaff-refresh-token",
  "organizationId": "org-uuid"
}
```

### Sync HubStaff Activities

```http
POST /api/integrations/hubstaff/sync-activities
Authorization: Bearer {token}
Content-Type: application/json

{
  "integrationId": "integration-uuid",
  "dateRange": {
    "start": "2024-01-01",
    "end": "2024-01-31"
  }
}
```

## Integration Settings

### Get Integration Settings

```http
GET /api/integration-setting?where[integrationId]={integration-id}
Authorization: Bearer {token}
```

### Update Integration Setting

```http
PUT /api/integration-setting/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "settingsName": "sync_frequency",
  "settingsValue": "30"
}
```

## Entity Settings (Integration-Entity Mapping)

### Get Entity Settings

```http
GET /api/integration-entity-setting?where[integrationId]={integration-id}
Authorization: Bearer {token}
```

### Update Entity Setting

```http
PUT /api/integration-entity-setting/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "entity": "Project",
  "sync": true
}
```

## Supported Integrations

| Integration      | Status    | Sync Direction |
| ---------------- | --------- | -------------- |
| **GitHub**       | ✅ Active | Bi-directional |
| **Upwork**       | ✅ Active | Import         |
| **HubStaff**     | ✅ Active | Import         |
| **Jira**         | ✅ Active | Bi-directional |
| **Zapier**       | ✅ Active | Webhook-based  |
| **Make.com**     | ✅ Active | Webhook-based  |
| **ActivePieces** | ✅ Active | Webhook-based  |

## Required Permissions

| Endpoint                         | Permission         |
| -------------------------------- | ------------------ |
| `GET /api/integration`           | `INTEGRATION_VIEW` |
| `POST /api/integration`          | `INTEGRATION_EDIT` |
| `POST /api/integration/github/*` | `INTEGRATION_EDIT` |
