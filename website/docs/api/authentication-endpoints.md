---
sidebar_position: 4
---

# Authentication Endpoints

Complete reference for the authentication API endpoints.

## Login

### Email/Password Login

```http
POST /api/auth/login
Content-Type: application/json
```

**Request Body:**

```json
{
  "email": "admin@ever.co",
  "password": "admin"
}
```

**Response (200 OK):**

```json
{
  "user": {
    "id": "...",
    "email": "admin@ever.co",
    "firstName": "Admin",
    "lastName": "User",
    "tenantId": "...",
    "role": {
      "id": "...",
      "name": "SUPER_ADMIN"
    }
  },
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Magic Sign-In (Passwordless)

**Step 1 — Request magic code:**

```http
POST /api/auth/send-magic-code
Content-Type: application/json

{
  "email": "user@example.com",
  "appMagicSignUrl": "https://app.gauzy.co/#/auth/magic-sign-in",
  "appName": "Gauzy"
}
```

**Step 2 — Verify magic code:**

```http
POST /api/auth/magic-sign-in
Content-Type: application/json

{
  "email": "user@example.com",
  "code": "123456"
}
```

Response: same format as email/password login.

## Registration

### Public Registration

```http
POST /api/auth/register
Content-Type: application/json

{
  "user": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com"
  },
  "password": "securePassword123"
}
```

:::note
Public registration creates a user without a tenant. The user must then create a tenant via `POST /api/tenant` to complete onboarding.
:::

### Admin-Initiated Registration

```http
POST /api/auth/register
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "user": {
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane@example.com",
    "role": { "id": "role-uuid" },
    "tenant": { "id": "tenant-uuid" }
  },
  "password": "securePassword123",
  "organizationId": "org-uuid"
}
```

## Token Management

### Refresh Token

```http
POST /api/auth/refresh-token
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response (200 OK):**

```json
{
  "token": "new-access-token...",
  "refreshToken": "new-refresh-token..."
}
```

## Password Management

### Request Password Reset

```http
POST /api/auth/request-password
Content-Type: application/json

{
  "email": "user@example.com"
}
```

Sends a password reset email with a reset link.

### Reset Password

```http
POST /api/auth/reset-password
Content-Type: application/json

{
  "token": "reset-token-from-email",
  "password": "newSecurePassword123",
  "confirmPassword": "newSecurePassword123"
}
```

### Change Password (Authenticated)

```http
POST /api/auth/change-password
Authorization: Bearer {token}
Content-Type: application/json

{
  "currentPassword": "oldPassword",
  "newPassword": "newPassword",
  "confirmPassword": "newPassword"
}
```

## Email Verification

### Send Verification Email

```http
POST /api/auth/email/verify/send-verification-code
Authorization: Bearer {token}
```

### Confirm Email

```http
POST /api/auth/email/verify
Content-Type: application/json

{
  "token": "verification-token",
  "email": "user@example.com"
}
```

## Social OAuth

### Initiate OAuth Flow

Redirect the user to the provider's authorization URL:

| Provider      | Endpoint                  |
| ------------- | ------------------------- |
| **Google**    | `GET /api/auth/google`    |
| **GitHub**    | `GET /api/auth/github`    |
| **Facebook**  | `GET /api/auth/facebook`  |
| **Twitter**   | `GET /api/auth/twitter`   |
| **LinkedIn**  | `GET /api/auth/linkedin`  |
| **Microsoft** | `GET /api/auth/microsoft` |

### OAuth Callback

After the user authorizes, the provider redirects to:

```
GET /api/auth/{provider}/callback?code={auth_code}
```

The server exchanges the code for tokens and returns a JWT:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
  "user": { ... }
}
```

## Current User

### Get Current User Profile

```http
GET /api/user/me
Authorization: Bearer {token}
```

**Response (200 OK):**

```json
{
  "id": "...",
  "email": "admin@ever.co",
  "firstName": "Admin",
  "lastName": "User",
  "tenantId": "...",
  "roleId": "...",
  "role": {
    "name": "SUPER_ADMIN",
    "rolePermissions": [...]
  },
  "employee": { ... }
}
```

## Error Responses

| Status | Error             | When                                 |
| ------ | ----------------- | ------------------------------------ |
| `400`  | Bad Request       | Invalid credentials format           |
| `401`  | Unauthorized      | Wrong email/password, expired token  |
| `403`  | Forbidden         | Account disabled, email not verified |
| `404`  | Not Found         | Email not registered                 |
| `429`  | Too Many Requests | Rate limit exceeded                  |
