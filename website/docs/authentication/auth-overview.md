---
sidebar_position: 1
---

# Authentication Overview

Ever Gauzy uses a comprehensive authentication system built on **Passport.js** with multiple strategies, supporting both traditional and social login flows.

## Authentication Flow

```mermaid
graph LR
    A["Client<br/>(Browser / Desktop)"] --> B["Login Request"]
    B --> C["Passport Strategy<br/>(Validate)"]
    C --> D["JWT Token Issued"]
    D --> E["Stored Client Side"]
```

## Login Methods

| Method               | Strategy                   | Description                 |
| -------------------- | -------------------------- | --------------------------- |
| **Email + Password** | `passport-local`           | Traditional credentials     |
| **Magic Sign-In**    | Custom                     | Passwordless via email code |
| **Google OAuth**     | `passport-google-oauth20`  | Sign in with Google         |
| **GitHub OAuth**     | `passport-github2`         | Sign in with GitHub         |
| **Facebook OAuth**   | `passport-facebook`        | Sign in with Facebook       |
| **Twitter OAuth**    | `passport-twitter`         | Sign in with Twitter        |
| **LinkedIn OAuth**   | `passport-linkedin-oauth2` | Sign in with LinkedIn       |
| **Microsoft OAuth**  | `passport-microsoft`       | Sign in with Microsoft      |

## Token Types

| Token                        | Purpose                   | Lifetime                   |
| ---------------------------- | ------------------------- | -------------------------- |
| **Access Token (JWT)**       | API authentication        | Short-lived (configurable) |
| **Refresh Token**            | Obtain new access tokens  | Long-lived (configurable)  |
| **Password Reset Token**     | One-time password reset   | Short-lived                |
| **Email Verification Token** | Confirm email ownership   | Short-lived                |
| **Invite Token**             | User/candidate invitation | Configurable expiry        |
| **Magic Code**               | Passwordless login        | 5 minutes                  |

## Security Features

### Password Hashing

Passwords are hashed using **bcrypt** with a configurable salt rounds:

```typescript
const hashedPassword = await bcrypt.hash(password, 12);
```

### JWT Configuration

Configure JWT behavior via environment variables:

```bash
JWT_SECRET=your-secret-key
JWT_TOKEN_EXPIRATION_TIME=86400          # 24 hours (seconds)
JWT_REFRESH_TOKEN_SECRET=your-refresh-secret
JWT_REFRESH_TOKEN_EXPIRATION_TIME=604800  # 7 days (seconds)
```

### Rate Limiting

Authentication endpoints are rate-limited to prevent brute-force attacks:

```bash
THROTTLE_ENABLED=true
THROTTLE_TTL=60000      # 1 minute window
THROTTLE_LIMIT=60000    # Max requests per window
```

### Account Lockout

After multiple failed login attempts, accounts can be temporarily locked.

## Guard Architecture

Guards are applied per-controller or per-route:

```typescript
// Public route (no auth required)
@Public()
@Post('login')
async login() { /* ... */ }

// Authenticated + specific role
@UseGuards(TenantPermissionGuard, RoleGuard)
@Roles(RolesEnum.ADMIN)
@Get('admin-only')
async adminOnly() { /* ... */ }

// Authenticated + specific permission
@UseGuards(TenantPermissionGuard, PermissionGuard)
@Permissions(PermissionsEnum.EMPLOYEES_EDIT)
@Post('employee')
async createEmployee() { /* ... */ }
```

## Related Pages

- [JWT Authentication](./jwt-authentication) — token lifecycle details
- [Social Auth](./social-auth) — OAuth provider setup
- [Roles & Permissions](./roles-and-permissions) — RBAC model
- [Registration & Onboarding](./registration-and-onboarding) — user creation flows
