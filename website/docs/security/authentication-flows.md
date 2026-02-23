---
sidebar_position: 6
---

# Authentication Flows

Detailed documentation of all authentication flows, including login, passwordless sign-in, workspace switching, and social account linking.

## Login (`POST /auth/login`)

The standard email/password login flow includes several security hardening measures:

1. Fetches **all** users matching the email (multi-tenant support).
2. Performs **constant-time password comparison** (`timingSafeEqual`) — prevents timing attacks.
3. **Progressive hash migration** — Legacy bcrypt hashes are automatically re-hashed to scrypt on successful login.
4. Validates employee status (active, not archived).
5. Returns `null` (generic `UnauthorizedException`) if no match — **prevents user enumeration**.
6. Generates both access and refresh tokens on success.

:::warning
The login endpoint never reveals whether an email exists in the system. Failed attempts always return a generic `UnauthorizedException`.
:::

## Workspace Sign-In by Email/Password (`POST /auth/signin.email.password`)

1. Validates email + password against all matching user records.
2. Returns **workspace list** (multi-tenant) instead of direct login.
3. User selects a workspace, then signs in with a workspace-scoped JWT.
4. Rate limited: **5 requests per 60 seconds**.

## Workspace Sign-In by Social (`POST /auth/signin.email.social`)

1. Validates the OAuth token against the provider's API (Google, GitHub, Twitter, Facebook).
2. Looks up linked social accounts to find matching users.
3. Returns workspace list for selection.
4. Rate limited: **5 requests per 60 seconds**.

## Magic Code Sign-In (`POST /auth/signin.email` → `POST /auth/signin.email/confirm`)

Magic login codes provide passwordless authentication using cryptographically secure codes:

1. Generates a **CSPRNG magic code** (`crypto.randomInt()`, 8-char alphanumeric, 36⁸ ≈ 2.8T combinations).
2. Sends the code via email.
3. User confirms with the code; code is **invalidated after first use**.
4. Configurable expiry via `MAGIC_CODE_EXPIRATION_TIME`.
5. Rate limited: **3 requests per 60 seconds** (send), **5 requests per 60 seconds** (confirm).

### Magic Code Security Properties

- **`crypto.randomInt()`** (CSPRNG) — not `Math.random()`
- **8-character alphanumeric** codes (36⁸ ≈ 2.8 trillion combinations)
- **Configurable expiration** via `MAGIC_CODE_EXPIRATION_TIME` (seconds)
- **Single-use**: Codes are invalidated after first successful verification
- **Per-user scoping**: Codes are set individually per user record
- Magic codes and links are **never logged** in server output

## Workspace Sign-In by Token (`POST /auth/signin.workspace`)

1. Validates the short-lived workspace JWT.
2. Checks user/employee status (active, not archived).
3. Generates new access + refresh tokens with full organization context.
4. Updates `lastLoginAt` timestamp.
5. Rate limited: **5 requests per 60 seconds**.

## Social Account Linking (`POST /auth/signup.link.account`)

1. Validates the OAuth token against the provider.
2. Links the social account to the authenticated user.
3. Rate limited: **3 requests per 60 seconds** (stricter).

## Workspace Switching (`POST /auth/switch-workspace`)

1. Validates the user has access to the target workspace/tenant.
2. Verifies user and employee status in the target context.
3. Generates new tokens scoped to the target workspace.
4. Authenticated endpoint (requires valid JWT).

## Organization Switching (`POST /auth/switch-organization`)

1. Validates the user has an active `UserOrganization` record for the target.
2. Verifies employee status in the target organization.
3. Generates new tokens scoped to the target organization.
4. Authenticated endpoint (requires valid JWT).

## Email Verification

- Verification codes are validated against expiration timestamps.
- Codes are **invalidated** after successful use (cannot be reused).
- Already-verified emails are rejected with a clear error.

## OAuth / Social Login Security

Supported providers: **Google**, **GitHub**, **Twitter/X**, **Facebook**.

- OAuth tokens are **validated server-side** against each provider's API before granting access.
- Social accounts are linked to users via a dedicated `SocialAccountService`.
- Email addresses from OAuth providers are verified before creating or linking accounts.
- The `POST /auth/signup.provider.social` endpoint checks if a user exists by social ID before signup (rate limited: 5/min).

## Related Pages

- [Token Lifecycle](./token-lifecycle) — JWT payload, validation, rotation
- [Password Security](./password-security) — hashing, policy, reset flow
- [Rate Limiting](./rate-limiting) — per-endpoint limits
- [Security Overview](./security-overview) — architecture overview
- [Social Auth Setup](../authentication/social-auth) — OAuth provider configuration
