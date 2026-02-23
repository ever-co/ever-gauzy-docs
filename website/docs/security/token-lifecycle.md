---
sidebar_position: 7
---

# Token Lifecycle

Detailed documentation on JWT token structure, validation strategies, token rotation, and revocation.

## JWT Payload Structure

Access tokens include the following claims for context-aware authorization:

| Claim            | Description                                  |
| ---------------- | -------------------------------------------- |
| `id`             | User ID                                      |
| `tenantId`       | Current tenant scope                         |
| `organizationId` | Current organization context                 |
| `employeeId`     | Linked employee ID (if applicable)           |
| `role`           | User's role name                             |
| `permissions`    | Array of enabled permissions                 |
| `ipAddress`      | Client IP at token issuance (device binding) |
| `userAgent`      | Client User-Agent at token issuance          |

Refresh tokens carry a subset: `id`, `email`, `tenantId`, `organizationId`, `role`, `ipAddress`, `userAgent`.

## JWT Configuration

| Token Type         | Environment Variable            | Expiry                                               |
| ------------------ | ------------------------------- | ---------------------------------------------------- |
| Access Token       | `JWT_SECRET`                    | Configurable via `JWT_TOKEN_EXPIRATION_TIME`         |
| Refresh Token      | `JWT_REFRESH_TOKEN_SECRET`      | Configurable via `JWT_REFRESH_TOKEN_EXPIRATION_TIME` |
| Email Verification | `JWT_VERIFICATION_TOKEN_SECRET` | `JWT_VERIFICATION_TOKEN_EXPIRATION_TIME`             |

:::warning
The application will **fail to start** if `JWT_SECRET`, `JWT_REFRESH_TOKEN_SECRET`, or `JWT_VERIFICATION_TOKEN_SECRET` are missing or use insecure default values.
:::

## JWT Validation Strategy (`JwtStrategy`)

The `JwtStrategy` performs **defense-in-depth** validation beyond standard JWT signature checks:

1. **Employee cross-validation** — If the token contains an `employeeId`, the strategy verifies the employee still exists and belongs to the claimed user.
2. **Organization membership** — If the token contains an `organizationId`, the strategy validates the user is still a member of that organization.
3. **User existence** — The user is re-fetched from the database with tenant and role relations to ensure the account is still active.

## Refresh Token Strategy (`JwtRefreshTokenStrategy`)

The refresh token strategy adds an additional **identity reconciliation check**:

1. Extracts the refresh token from the request body.
2. Validates it via `RefreshTokenService.verify()` (which checks inactivity timeouts).
3. **Cross-checks** the `userId` from the JWT payload against the `userId` from the verified token record — preventing token substitution attacks.
4. Fetches and returns the full user object only after both checks pass.

## Scoped Token Service (CQRS)

Both access and refresh tokens are managed by a **Scoped Token Service** backed by CQRS commands and queries:

| Operation             | Description                                      |
| --------------------- | ------------------------------------------------ |
| `createToken`         | Generates a new token with configurable metadata |
| `rotateToken`         | Atomically revokes old token and issues new one  |
| `revokeToken`         | Revokes a specific token with reason tracking    |
| `revokeAllUserTokens` | Revokes all tokens of a given type for a user    |
| `validateToken`       | Validates token with optional inactivity check   |
| `getActiveTokens`     | Lists active tokens for a user                   |

## Token Rotation

When refresh tokens are rotated:

1. The old token is **validated** (including inactivity check).
2. If invalid, an `UnauthorizedException` is thrown.
3. The old token is **atomically revoked** and a new token is issued.
4. Organization context is preserved across rotations.

## Logout

Logout performs **parallel revocation** of all active tokens:

1. Removes the stored refresh token from the user record.
2. Revokes the refresh token via `RefreshTokenService`.
3. Revokes the current access token via `AccessTokenService`.

All three operations run concurrently via `Promise.allSettled()`. Individual failures are logged but do not block the logout flow.

## Related Pages

- [Authentication Flows](./authentication-flows) — login, magic code, workspace switching
- [Password Security](./password-security) — hashing, policy, reset flow
- [JWT Authentication](../authentication/jwt-authentication) — token usage and storage
- [Security Overview](./security-overview) — architecture overview
