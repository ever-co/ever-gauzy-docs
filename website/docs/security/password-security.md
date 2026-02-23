---
sidebar_position: 8
---

# Password Security

Password hashing algorithms, policy enforcement, and secure password reset flows.

## Hashing Algorithms

Passwords are hashed using **scrypt** (default) with transparent fallback to **bcrypt** for legacy hashes. The `PasswordHashService` supports:

- **Progressive migration**: On login, legacy bcrypt hashes are automatically re-hashed to scrypt.
- **Strategy pattern**: Multiple hashing strategies coexist; the service auto-selects the correct one for verification.

## Password Policy

Passwords must meet the following requirements (enforced via `class-validator`):

- Minimum **8 characters**
- At least **1 uppercase** letter
- At least **1 lowercase** letter
- At least **1 number**
- At least **1 special character**

## Password Reset Flow

- Reset tokens are **purpose-scoped JWTs** with a `purpose: 'password-reset'` claim and **10-minute expiry**.
- All existing reset records for a user are **invalidated** when a new reset is requested.
- Reset records are **deleted** after successful password change.
- Responses do not reveal whether the email exists (prevents user enumeration).
- Rate limited: **3 requests per 60 seconds**.

:::warning
The password reset endpoint never reveals whether an email exists in the system — both existing and non-existing emails receive the same response.
:::

## Related Pages

- [Authentication Flows](./authentication-flows) — login flow with progressive hash migration
- [Token Lifecycle](./token-lifecycle) — JWT token details
- [Rate Limiting](./rate-limiting) — per-endpoint limits
- [Security Overview](./security-overview) — architecture overview
