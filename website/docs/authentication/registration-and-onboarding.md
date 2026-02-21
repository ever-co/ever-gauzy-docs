---
sidebar_position: 5
---

# Registration & Onboarding

Comprehensive documentation of all user registration and tenant onboarding flows in the Ever Gauzy platform.

## Registration Scenarios

There are **six distinct registration scenarios**, each with different inputs, authorization requirements, and outcomes:

| Scenario                           | Who Initiates      | Auth Required |   Tenant Created   |
| ---------------------------------- | ------------------ | :-----------: | :----------------: |
| 1. Public Self-Registration        | Visitor            |      ❌       | After registration |
| 2. Workspace Creation (Onboarding) | Registered User    | ✅ (partial)  |         ✅         |
| 3. Admin Creates User              | Organization Admin |      ✅       |         ❌         |
| 4. Desktop App Registration        | Desktop User       |      ❌       |   ✅ (combined)    |
| 5. Invite Acceptance               | Invited User       |      ❌       |         ❌         |
| 6. Social OAuth Registration       | Visitor            |  ❌ (OAuth)   |    After login     |

---

## Scenario 1: Public Self-Registration

A visitor registers with email and password via the public registration form.

### Flow

```
Visitor fills form → POST /api/auth/register → User created (no tenant)
                                                      │
                                                      ▼
                                              Redirect to onboarding
                                              (Scenario 2)
```

### API Call

```http
POST /api/auth/register
Content-Type: application/json

{
  "user": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com"
  },
  "password": "securePassword123",
  "confirmPassword": "securePassword123"
}
```

### What Happens

1. `AuthController.register()` receives the request (public endpoint)
2. `AuthService.register()` creates a new `User` entity
3. Password is hashed with bcrypt
4. No tenant, role, or employee is assigned yet
5. Email verification is sent (if configured)
6. JWT tokens are returned

---

## Scenario 2: Workspace Creation (Onboarding)

After public registration, the user creates their workspace (tenant).

### Flow

```
Authenticated user → POST /api/tenant → Tenant created
                                              │
                                              ▼
                                         Default roles created
                                         User gets SUPER_ADMIN
                                         Employee record created
```

### API Call

```http
POST /api/tenant
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "My Company"
}
```

### What Happens

1. `TenantController.create()` validates user has no tenant yet
2. `TenantService.onboardTenant()` executes:
   - Creates the `Tenant` entity
   - Creates all default roles (SUPER_ADMIN, ADMIN, EMPLOYEE, etc.)
   - Assigns SUPER_ADMIN role to the user
   - Updates user with `tenantId` and `roleId`
   - Initializes default tenant settings
3. User is now a SUPER_ADMIN of their new workspace

---

## Scenario 3: Admin Creates User

An admin creates a new user within their existing tenant and organization.

### Flow

```
Admin → POST /api/auth/register → User created with tenant + role + organization
                                         │
                                         ▼
                                    Employee record created
                                    (if featureAsEmployee = true)
```

### API Call

```http
POST /api/auth/register
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "user": {
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane@example.com",
    "role": { "id": "employee-role-uuid" },
    "tenant": { "id": "tenant-uuid" }
  },
  "password": "securePassword123",
  "organizationId": "org-uuid",
  "featureAsEmployee": true,
  "createdByUserId": "admin-user-uuid"
}
```

### What Happens

1. `AuthService.register()` detects admin context (tenant + role provided)
2. User is created with the specified role and tenant
3. Employee record is created (if `featureAsEmployee: true`)
4. User is linked to the specified organization
5. The `createdByUserId` is recorded for audit

---

## Scenario 4: Desktop App Registration

Desktop apps combine registration and tenant creation in a single step.

### Flow

```
Desktop form → POST /api/auth/register → User + Tenant + Employee created
```

The desktop app sends a combined registration that includes tenant details, streamlining the onboarding process.

---

## Scenario 5: Invite Acceptance

A user accepts an invitation from an organization admin.

### Flow

```
User receives email → Clicks invite link → POST /api/invite/validate
                                                    │
                                                    ▼
                                          Invite validated
                                                    │
                                                    ▼
                                          POST /api/invite/accept
                                                    │
                                                    ▼
                                          User created with:
                                          - Invite's role
                                          - Invite's tenant
                                          - Invite's organization
```

### API Calls

**Step 1 — Validate invite:**

```http
POST /api/invite/validate
Content-Type: application/json

{
  "email": "invited@example.com",
  "token": "invite-token-from-email"
}
```

**Step 2 — Accept invite:**

```http
POST /api/invite/accept
Content-Type: application/json

{
  "email": "invited@example.com",
  "token": "invite-token",
  "password": "chosenPassword123",
  "user": {
    "firstName": "Invited",
    "lastName": "User"
  }
}
```

### What Happens

1. `InviteAcceptUserHandler` validates the invite token
2. Calls `AuthService.register()` with the invite's role, tenant, and organization
3. User is created with the pre-assigned context
4. Employee record is created
5. Invite status is updated to `ACCEPTED`

---

## Scenario 6: Social OAuth Registration

A user signs in with a social provider for the first time.

### Flow

```
User clicks "Sign in with Google" → OAuth flow → Profile fetched
                                                       │
                                                       ▼
                                               No existing user?
                                                       │
                                                       ▼
                                               User created
                                               (no tenant)
                                                       │
                                                       ▼
                                               Redirect to onboarding
                                               (Scenario 2)
```

---

## Role Assignment

### Default Roles Created Per Tenant

| Role        | Created By Default |   Can Self-Register    |
| ----------- | :----------------: | :--------------------: |
| SUPER_ADMIN |         ✅         |    Only first user     |
| ADMIN       |         ✅         | ❌ (assigned by admin) |
| DATA_ENTRY  |         ✅         | ❌ (assigned by admin) |
| EMPLOYEE    |         ✅         |    ✅ (via invite)     |
| CANDIDATE   |         ✅         |      ✅ (via ATS)      |
| VIEWER      |         ✅         | ❌ (assigned by admin) |

### Role Validation

The `RoleShouldExistConstraint` validator ensures:

- The assigned role exists within the current tenant
- Cross-tenant role assignment is prevented
- Only valid role IDs are accepted

## Configuration

```bash
# Allow public registration
FEATURE_REGISTRATION=true

# Allow Super Admin role creation
ALLOW_SUPER_ADMIN_ROLE=true

# Invite expiry (days)
INVITE_EXPIRY_PERIOD=7

# Require email verification
EMAIL_VERIFICATION_REQUIRED=false
```

## Related Pages

- [Auth Overview](./auth-overview) — authentication architecture
- [Roles & Permissions](./roles-and-permissions) — RBAC model
- [Multi-Tenancy](../architecture/multi-tenancy) — tenant lifecycle
- [Social Auth](./social-auth) — OAuth provider configuration
