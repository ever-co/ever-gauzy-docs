# Registration & Onboarding Flow

This document describes how user registration and tenant onboarding work in the Ever Gauzy platform.

## Overview

Registration and onboarding are two separate processes:

1. **Registration** creates a bare user account (no role, no tenant)
2. **Onboarding** creates a tenant, assigns roles, and sets up the organization

The public registration endpoint (`POST /api/auth/register`) is shared across multiple scenarios — from public self-signup to admin-initiated user creation.

## Registration Scenarios

### Scenario 1: Public Self-Registration

A new user visits the platform for the first time and registers via the UI.

**Frontend flow:**
- User navigates to `/auth/register`
- Fills in: full name, email, password, confirm password, accepts terms
- `NgxRegisterComponent` (extends Nebular `NbRegisterComponent`) calls `AuthStrategy.register()`

**API call:**
```
POST /api/auth/register
{
  "password": "...",
  "confirmPassword": "...",
  "user": {
    "firstName": "...",
    "lastName": "...",
    "email": "...",
    "preferredLanguage": "en"
  }
}
```

**Backend processing:**
1. `AuthController.register()` dispatches `AuthRegisterCommand`
2. `AuthRegisterHandler.execute()` checks for SUPER_ADMIN role (not present here, so skipped)
3. `AuthService.register()` creates the user with `roleId=NULL`, `tenantId=NULL`
4. Returns the created user

**After registration:**
- `AuthStrategy.register()` auto-logs in the user via `this.login()`
- Frontend redirects to `/` which redirects to `/pages`
- `PagesComponent` / `UserResolver` detects `user.tenantId === null`
- Redirects to `/onboarding/tenant` (see Onboarding section below)

**Key files:**
- UI: `packages/ui-auth/src/lib/components/register/register.component.ts`
- Auth strategy: `packages/ui-core/core/src/lib/services/auth/auth-strategy.service.ts` (lines 114-163)
- Controller: `packages/core/src/lib/auth/auth.controller.ts` (lines 123-140)
- Handler: `packages/core/src/lib/auth/commands/handlers/auth.register.handler.ts`
- Service: `packages/core/src/lib/auth/auth.service.ts` (lines 664-756)

### Scenario 2: Workspace Creation Flow

A newer self-contained registration flow used by the public layout UI plugin.

**Frontend flow:**
- User goes through the workspace creation wizard
- First verifies email via magic code
- Then fills in name + password + organization details
- `WorkspaceAuthService.onboardUser()` orchestrates the entire process

**API calls (sequential):**
1. `POST /api/auth/register` — creates user (no role, no tenant)
2. `POST /api/auth/login` — logs in, gets JWT
3. `POST /api/tenant` — creates tenant + assigns SUPER_ADMIN role
4. `GET /api/user/me` — fetches updated user
5. `POST /api/auth/refresh-token` — refreshes JWT with tenant/role claims
6. `POST /api/organization` — creates the organization

**Key files:**
- Workspace service: `packages/ui-core/core/src/lib/services/workspace/workspace-auth.service.ts` (lines 59-169)
- Workspace UI: `packages/plugins/public-layout-ui/src/lib/components/workspace-actions/workspace-create/workspace-create.component.ts`

### Scenario 3: Admin Creates User in Dashboard

An authenticated admin creates a user from the dashboard user management dialog.

**Frontend flow:**
- Admin opens user management dialog (`UserMutationComponent`)
- Fills in: name, email, password, role (dropdown), tags, avatar
- `BasicInfoFormComponent.createUser()` calls `authService.register()` with full details

**API call:**
```
POST /api/auth/register
Authorization: Bearer <admin-jwt>
{
  "password": "...",
  "confirmPassword": "...",
  "organizationId": "<uuid>",
  "createdByUserId": "<admin-user-uuid>",
  "featureAsEmployee": true,
  "user": {
    "firstName": "...",
    "lastName": "...",
    "email": "...",
    "role": { "id": "<role-uuid>", "name": "VIEWER", ... },
    "tenant": { "id": "<tenant-uuid>", ... },
    "tags": [...]
  }
}
```

**Backend processing:**
1. `AuthRegisterHandler` checks if role is SUPER_ADMIN — if so, verifies `createdByUserId` belongs to an existing SUPER_ADMIN
2. `AuthService.register()` creates user with the specified role and tenant
3. If `featureAsEmployee` is true, also creates an Employee record
4. If `organizationId` is provided, adds user to that organization

**Key files:**
- Form component: `packages/ui-core/shared/src/lib/user/forms/basic-info/basic-info-form.component.ts` (lines 180-249)
- User mutation: `packages/ui-core/shared/src/lib/user/user-mutation/user-mutation.component.ts`

### Scenario 4: Desktop Apps

Desktop apps (timer, agent) do NOT support registration. The register method in desktop `AuthStrategy` is a stub that returns failure. Users are redirected to the web app to register.

**Key file:** `packages/desktop-ui-lib/src/lib/auth/services/auth-strategy.service.ts` (lines 79-85)

### Scenario 5: Invite Acceptance

When a user accepts an invite, the invite handler calls `authService.register()` directly — bypassing the controller and command handler entirely.

**Flow:**
1. Invite is created by admin with a specific role and organization
2. User clicks invite link, fills in password
3. Invite acceptance handler creates the user via `authService.register()` with role, tenant, and organization from the invite record

**Key files:**
- `packages/core/src/lib/invite/commands/handlers/invite.accept-user.handler.ts`
- `packages/core/src/lib/invite/commands/handlers/invite.accept-employee.handler.ts`
- `packages/core/src/lib/invite/commands/handlers/invite.accept-candidate.handler.ts`
- `packages/core/src/lib/invite/commands/handlers/invite.accept-organization-contact.handler.ts`

### Scenario 6: Cloud Migration

The `GauzyCloudService` can migrate users to a remote Gauzy Cloud instance by calling `POST /api/auth/register` on the remote server.

**Key file:** `packages/core/src/lib/gauzy-cloud/gauzy-cloud.service.ts` (lines 27-33)

## Tenant Onboarding

After public registration (Scenarios 1 & 2), the user has no tenant or role. The onboarding process creates these.

### Legacy Onboarding Flow (Scenario 1)

**Frontend:**
- `PagesComponent` detects `user.tenantId === null` → redirects to `/onboarding/tenant`
- `OnboardingResolver` confirms user has no tenant → loads `TenantOnboardingComponent`
- User fills in organization details
- `TenantOnboardingComponent.onboardUser()` executes:

**Steps:**
1. `POST /api/tenant` — calls `TenantService.onboardTenant()`
2. `GET /api/user/me` — fetch updated user
3. `POST /api/organization` — create organization
4. Refresh JWT token
5. Optionally register as employee
6. Redirect to `/onboarding/complete`

**Key files:**
- Pages redirect: `apps/gauzy/src/app/pages/pages.component.ts` (lines 66-70, 393-397)
- User resolver: `packages/ui-core/core/src/lib/resolvers/user.resolver.ts` (lines 26-28)
- Onboarding resolver: `packages/ui-core/core/src/lib/resolvers/onboarding.resolver.ts`
- Onboarding component: `packages/plugins/onboarding-ui/src/lib/components/tenant-onboarding/tenant-onboarding.component.ts` (lines 56-85)

### What `TenantService.onboardTenant()` Does

This is where the SUPER_ADMIN role gets assigned. Located at `packages/core/src/lib/tenant/tenant.service.ts` (lines 41-73):

1. **Creates the tenant** in the database
2. **Creates ALL roles** for the new tenant (SUPER_ADMIN, ADMIN, DATA_ENTRY, EMPLOYEE, CANDIDATE, MANAGER, VIEWER, INTERVIEWER) via `TenantRoleBulkCreateCommand`
3. **Initializes tenant defaults** (features, task statuses, task sizes, task priorities, issue types, settings)
4. **Finds the SUPER_ADMIN role** for the new tenant
5. **Updates the user** with the new tenant AND the SUPER_ADMIN role

**Guard:** The `POST /api/tenant` endpoint (`TenantController.create()`) checks:
```typescript
if (user.tenantId || user.roleId) {
    throw new BadRequestException('Tenant already exists');
}
```
This ensures only a fresh user (no existing tenant or role) can create a new tenant.

### Workspace Onboarding Flow (Scenario 2)

The `WorkspaceAuthService.onboardUser()` performs the same steps but in a single orchestrated flow — register, login, create tenant, refresh token, create organization — all sequentially from the frontend.

## The `AuthService.register()` Method

Located at `packages/core/src/lib/auth/auth.service.ts` (lines 664-756). This is the shared backend method used by all registration scenarios.

**Steps:**
1. Determine tenant from `input.user.tenant` (or from `createdByUserId` if provided)
2. Create user entity with `...input.user` spread + tenant + hashed password
3. If `featureAsEmployee` — create Employee record
4. If `inviteId` — auto-verify email
5. Fetch user with role relation
6. If `organizationId` — add user to organization
7. If `isImporting` — create import record
8. If email not verified — send verification email
9. Publish `AccountRegistrationEvent`
10. Send welcome email

## Role Hierarchy

Defined in `packages/contracts/src/lib/role.model.ts`:

| Role | Description |
|------|-------------|
| `SUPER_ADMIN` | Bypasses all tenant and organization permission guards. Full system access. |
| `ADMIN` | Tenant-level admin. Can manage users, roles, organizations within their tenant. |
| `MANAGER` | Organization-level management capabilities. |
| `DATA_ENTRY` | Data entry permissions. |
| `EMPLOYEE` | Standard employee access. |
| `CANDIDATE` | Limited access for job candidates. |
| `VIEWER` | Read-only access. |
| `INTERVIEWER` | Interview-related access. |

Each tenant gets its own set of roles with unique auto-generated UUIDs. Roles are created during tenant onboarding via `RoleService.createBulk()`.

## DTO Structure

### Registration DTOs

```
RegisterUserDTO
  ├── password: string (required)
  ├── confirmPassword: string (required, must match password)
  └── user: CreateUserDTO (required, validated nested)
        ├── email: string (required, from UserEmailDTO)
        ├── firstName?: string (optional)
        ├── lastName?: string (optional)
        ├── imageUrl?: string (optional)
        ├── preferredLanguage?: LanguagesEnum (optional)
        ├── roleId?: string (optional, from PartialType(RoleFeatureDTO))
        └── role?: IRole (optional, from PartialType(RoleFeatureDTO))
```

The `IUserRegistrationInput` interface also includes top-level fields that are not declared on the DTO class but may be passed via `...input` spread:
- `organizationId?: string`
- `createdByUserId?: string`
- `featureAsEmployee?: boolean`
- `inviteId?: string`
- `isImporting?: boolean`
- `sourceId?: string`

## Validation

### `IsRoleShouldExist` Validator

Located at `packages/core/src/lib/shared/validators/constraints/role-should-exist.constraint.ts`.

Validates that a `roleId` or `role` object references an existing role within the current tenant. Uses `RequestContext.currentTenantId()` to scope the query.

Used by:
- `RoleFeatureDTO` — inherited by `CreateUserDTO` (via `PartialType`)
- `CreateRolePermissionDTO`
- `CreateInviteDTO` (via `IntersectionType` with `RoleFeatureDTO`)

## Security Considerations

### The `@Public()` Decorator

The registration endpoint uses `@Public()` which bypasses the global `AuthGuard`. This means:
- No JWT verification occurs automatically
- `RequestContext.currentTenantId()` returns `undefined`
- `RequestContext.currentUserId()` returns `undefined`
- But `RequestContext.currentToken()` still extracts the Bearer token if one is provided in the Authorization header

### Privileged Fields

When calling the register endpoint, certain fields carry security implications:
- `user.roleId` / `user.role` — determines the user's access level
- `user.tenant` / `user.tenantId` — determines which tenant the user belongs to
- `createdByUserId` — influences tenant assignment logic
- `organizationId` — adds user to a specific organization

These fields should only be accepted from authenticated, authorized callers (ADMIN or SUPER_ADMIN).

### SUPER_ADMIN Guard

The `AuthRegisterHandler` includes a check: if the target role is SUPER_ADMIN, the `createdByUserId` must reference an existing SUPER_ADMIN user. This prevents unauthorized SUPER_ADMIN creation even from authenticated admin callers.
