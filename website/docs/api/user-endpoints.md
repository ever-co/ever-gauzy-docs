---
sidebar_position: 22
---

# User Endpoints

Manage user accounts, profiles, preferences, and user-organization associations.

## Base Path

```
/api/user
```

## Endpoints

### Get Current User (Me)

Retrieves the currently authenticated user's profile.

```
GET /api/user/me
Authorization: Bearer {token}
```

**Query Parameters:**

| Parameter   | Type   | Description                                                         |
| ----------- | ------ | ------------------------------------------------------------------- |
| `relations` | string | Comma-separated relations to include (e.g., `role,tenant,employee`) |

**Allowed Relations:** `role`, `tenant`, `employee`, `candidate`, `tags`

**Response** `200 OK`:

```json
{
  "id": "uuid",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "imageUrl": "https://...",
  "preferredLanguage": "en",
  "preferredComponentLayout": "TABLE",
  "role": { "id": "uuid", "name": "ADMIN" },
  "tenant": { "id": "uuid", "name": "My Company" },
  "employee": { "id": "uuid" }
}
```

### Find User by Email

```
GET /api/user/email/:email
Authorization: Bearer {token}
```

### List Users (Paginated)

```
GET /api/user/pagination
Authorization: Bearer {token}
```

**Query Parameters:**

| Parameter   | Type   | Description           |
| ----------- | ------ | --------------------- |
| `page`      | number | Page number (1-based) |
| `limit`     | number | Items per page        |
| `where`     | object | Filter conditions     |
| `relations` | array  | Relations to include  |

### Find All Users

```
GET /api/user
Authorization: Bearer {token}
```

### Find User by ID

```
GET /api/user/:id
Authorization: Bearer {token}
```

### Get User Count

```
GET /api/user/count
Authorization: Bearer {token}
```

### Create User

```
POST /api/user
Authorization: Bearer {token}
Content-Type: application/json

{
  "email": "newuser@example.com",
  "firstName": "Jane",
  "lastName": "Doe",
  "roleId": "uuid",
  "hash": "password_hash"
}
```

**Response** `201 Created`.

### Update User

```
PUT /api/user/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "firstName": "Updated Name",
  "imageUrl": "https://new-avatar.png"
}
```

### Update Preferred Language

```
PUT /api/user/preferred-language
Authorization: Bearer {token}
Content-Type: application/json

{
  "preferredLanguage": "fr"
}
```

### Update Preferred Component Layout

```
PUT /api/user/preferred-component-layout
Authorization: Bearer {token}
Content-Type: application/json

{
  "preferredComponentLayout": "CARDS_GRID"
}
```

Available layouts: `TABLE`, `CARDS_GRID`, `SPRINT_VIEW`

### Delete User

```
DELETE /api/user/:id
Authorization: Bearer {token}
```

**Response** `200 OK`.

### Factory Reset

Resets the entire system to its initial state. Requires `SUPER_ADMIN` role.

```
GET /api/user/reset
Authorization: Bearer {token}
```

> ⚠️ **Warning**: This removes all data and re-seeds the database. Use with extreme caution.

## Data Model

```typescript
interface IUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  hash?: string;
  imageUrl?: string;
  preferredLanguage?: string;
  preferredComponentLayout?: ComponentLayoutStyleEnum;
  thirdPartyId?: string;

  // Relations
  roleId?: string;
  role?: IRole;
  tenantId?: string;
  tenant?: ITenant;
  employee?: IEmployee;
  candidate?: ICandidate;
  tags?: ITag[];
}
```

## Permissions

| Action                  | Permission Required      |
| ----------------------- | ------------------------ |
| Get own profile (`/me`) | Authenticated user       |
| List/find users         | `ORG_USERS_VIEW`         |
| Create user             | `ORG_USERS_EDIT`         |
| Update user             | `ORG_USERS_EDIT` or self |
| Delete user             | `ORG_USERS_EDIT`         |
| Factory reset           | `SUPER_ADMIN`            |

## Related Pages

- [Authentication Endpoints](./authentication-endpoints) — login and registration
- [Employee Endpoints](./employee-endpoints) — employee management
- [Role & Permission Endpoints](./role-permission-endpoints) — role management
