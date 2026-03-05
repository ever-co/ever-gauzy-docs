---
sidebar_position: 36
---

# Invite Endpoints

Manage user and employee invitations — send, accept, resend, and track invitations.

## Base Path

```
/api/invite
```

## Endpoints

### List Invites

```
GET /api/invite
Authorization: Bearer {token}
```

### Get Invite by ID

```
GET /api/invite/:id
Authorization: Bearer {token}
```

### Get Invite by Token (Public)

Validates an invitation token without authentication.

```
GET /api/invite/validate/:email/:token
```

### Send Invite

```
POST /api/invite
Authorization: Bearer {token}
Content-Type: application/json

{
  "emailIds": ["user1@example.com", "user2@example.com"],
  "roleId": "role-uuid",
  "organizationId": "uuid",
  "invitedById": "user-uuid",
  "startedWorkOn": "2024-03-01",
  "appliedDate": "2024-03-01",
  "departmentIds": ["dept-uuid"],
  "teamIds": ["team-uuid"]
}
```

### Accept Invite

```
POST /api/invite/accept
Content-Type: application/json

{
  "email": "user@example.com",
  "token": "invite-token",
  "password": "SecureP@ssw0rd",
  "user": {
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

### Resend Invite

```
POST /api/invite/resend
Authorization: Bearer {token}
Content-Type: application/json

{
  "inviteId": "invite-uuid"
}
```

### Delete Invite

```
DELETE /api/invite/:id
Authorization: Bearer {token}
```

## Invite Statuses

| Status     | Description                        |
| ---------- | ---------------------------------- |
| `INVITED`  | Invitation sent, awaiting response |
| `ACCEPTED` | Invitation accepted by user        |
| `REJECTED` | Invitation rejected                |
| `EXPIRED`  | Invitation has expired             |

## Data Model

```typescript
interface IInvite {
  id: string;
  email: string;
  token: string;
  status: InviteStatusEnum;
  expireDate?: Date;
  actionDate?: Date;

  // Relations
  roleId: string;
  role?: IRole;
  invitedById?: string;
  organizationId: string;
  tenantId: string;
  departments?: IOrganizationDepartment[];
  teams?: IOrganizationTeam[];
  projects?: IOrganizationProject[];
}
```

## Related Pages

- [Registration & Onboarding](../authentication/registration-and-onboarding) — onboarding flow
- [User Endpoints](./user-endpoints) — user management
- [Employee Endpoints](./employee-endpoints) — employee management
