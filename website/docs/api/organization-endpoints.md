---
sidebar_position: 6
---

# Organization Endpoints

API endpoints for organization management, departments, teams, and settings.

## Organization CRUD

### List Organizations

```http
GET /api/organization?take=10&skip=0
Authorization: Bearer {token}
```

**Response (200 OK):**

```json
{
  "items": [
    {
      "id": "...",
      "name": "Ever Technologies",
      "currency": "USD",
      "defaultValueDateType": "TODAY",
      "isActive": true,
      "totalEmployees": 25,
      "tenantId": "..."
    }
  ],
  "total": 3
}
```

### Get Organization by ID

```http
GET /api/organization/{id}?relations[]=contact
Authorization: Bearer {token}
```

### Create Organization

```http
POST /api/organization
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "New Division",
  "currency": "USD",
  "defaultValueDateType": "TODAY",
  "imageUrl": "https://example.com/logo.png"
}
```

### Update Organization

```http
PUT /api/organization/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Updated Division Name",
  "officialName": "Updated Division Official Name LLC"
}
```

### Delete Organization

```http
DELETE /api/organization/{id}
Authorization: Bearer {token}
```

## Departments

### List Departments

```http
GET /api/organization-department?where[organizationId]={org-id}
Authorization: Bearer {token}
```

### Create Department

```http
POST /api/organization-department
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Engineering",
  "organizationId": "org-uuid"
}
```

## Teams

### List Teams

```http
GET /api/organization-team?where[organizationId]={org-id}
Authorization: Bearer {token}
```

### Create Team

```http
POST /api/organization-team
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Backend Team",
  "organizationId": "org-uuid",
  "members": [
    { "id": "employee-uuid-1", "role": 0 },
    { "id": "employee-uuid-2", "role": 1 }
  ]
}
```

### Team Join Request

```http
POST /api/organization-team-join-request
Authorization: Bearer {token}
Content-Type: application/json

{
  "organizationTeamId": "team-uuid",
  "organizationId": "org-uuid"
}
```

## Projects

### List Projects

```http
GET /api/organization-projects?where[organizationId]={org-id}
Authorization: Bearer {token}
```

### Create Project

```http
POST /api/organization-projects
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Gauzy Platform",
  "organizationId": "org-uuid",
  "membersCount": 10,
  "billing": "RATE",
  "currency": "USD"
}
```

## Vendors

### List Vendors

```http
GET /api/organization-vendors?where[organizationId]={org-id}
Authorization: Bearer {token}
```

## Employment Types

### List Employment Types

```http
GET /api/organization-employment-type
Authorization: Bearer {token}
```

## Organization Documents

### List Documents

```http
GET /api/organization-document?where[organizationId]={org-id}
Authorization: Bearer {token}
```

### Upload Document

```http
POST /api/organization-document
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Employee Handbook",
  "documentUrl": "https://...",
  "organizationId": "org-uuid"
}
```

## Organization Settings

Key organization-level settings managed through the Organization entity:

| Setting                | Type    | Description                                    |
| ---------------------- | ------- | ---------------------------------------------- |
| `currency`             | string  | Default currency (USD, EUR, etc.)              |
| `defaultValueDateType` | enum    | Date type: TODAY, END_OF_MONTH                 |
| `startWeekOn`          | enum    | Week start day                                 |
| `bonusType`            | enum    | Bonus calculation: PROFIT_BASED, REVENUE_BASED |
| `bonusPercentage`      | number  | Default bonus percentage                       |
| `timeZone`             | string  | Organization timezone                          |
| `regionCode`           | string  | Region/country code                            |
| `fiscalStartDate`      | date    | Fiscal year start                              |
| `fiscalEndDate`        | date    | Fiscal year end                                |
| `invitesAllowed`       | boolean | Allow user invitations                         |
| `inviteExpiryPeriod`   | number  | Invitation expiry days                         |

## Required Permissions

| Endpoint                       | Permission                    |
| ------------------------------ | ----------------------------- |
| `GET /api/organization`        | `ORG_VIEW` (or member of org) |
| `POST /api/organization`       | `ORG_EDIT` (Admin+)           |
| `PUT /api/organization/:id`    | `ORG_EDIT`                    |
| `DELETE /api/organization/:id` | `SUPER_ADMIN` only            |
