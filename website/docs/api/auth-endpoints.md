---
sidebar_position: 20
---

# Auth & Email Verification Endpoints

Authentication, registration, password management, and email verification endpoints.

## Base Path

```
/api/auth
```

## Authentication

### Login

```
POST /api/auth/login
```

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "your-password"
}
```

**Response `200 OK`:**

```json
{
  "user": { "id": "uuid", "email": "user@example.com", "name": "John" },
  "token": "jwt-access-token",
  "refresh_token": "jwt-refresh-token"
}
```

### Register

```
POST /api/auth/register
```

**Request Body:**

```json
{
  "user": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "SecureP@ss123"
  },
  "password": "SecureP@ss123",
  "confirmPassword": "SecureP@ss123"
}
```

### Refresh Token

```
POST /api/auth/refresh-token
```

**Request Body:**

```json
{
  "refresh_token": "jwt-refresh-token"
}
```

### Check Auth

```
GET /api/auth/check
Authorization: Bearer {token}
```

Validates the current JWT token.

## Password Management

### Request Password Reset

```
POST /api/auth/reset-password
```

**Request Body:**

```json
{
  "email": "user@example.com"
}
```

### Change Password

```
POST /api/auth/change-password
Authorization: Bearer {token}
```

**Request Body:**

```json
{
  "currentPassword": "old-password",
  "newPassword": "new-password",
  "confirmPassword": "new-password"
}
```

## Email Verification

### Send Verification Email

```
POST /api/auth/email/verify/resend-verification-code
Authorization: Bearer {token}
```

### Verify Email

```
POST /api/auth/email/verify/code
```

**Request Body:**

```json
{
  "email": "user@example.com",
  "code": 123456
}
```

## Email Check

### Check Email Availability

```
POST /api/email-check/validate
```

**Request Body:**

```json
{
  "email": "check@example.com"
}
```

## Email Reset

### Request Email Change

```
POST /api/email-reset/request-change
Authorization: Bearer {token}
```

**Request Body:**

```json
{
  "email": "new@example.com"
}
```

### Verify Email Change

```
POST /api/email-reset/verify
Authorization: Bearer {token}
```

## Social Auth

### Google OAuth

```
GET /api/auth/google
GET /api/auth/google/callback
```

### GitHub OAuth

```
GET /api/auth/github
GET /api/auth/github/callback
```

### Microsoft OAuth

```
GET /api/auth/microsoft
GET /api/auth/microsoft/callback
```

### Facebook OAuth

```
GET /api/auth/facebook
GET /api/auth/facebook/callback
```

## Security

- Passwords require minimum 8 characters, uppercase, lowercase, number, special character
- Failed login attempts are rate-limited
- JWT tokens have configurable expiration
- Refresh tokens are single-use
- Email verification codes expire after 10 minutes

## Related Pages

- [JWT Authentication](../authentication/jwt-authentication) — JWT details
- [Social Auth](../authentication/social-auth) — OAuth providers
- [Password Security](../security/password-security) — password policies
