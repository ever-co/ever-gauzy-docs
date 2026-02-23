---
sidebar_position: 9
---

# OAuth App Authorization (Server-to-Server)

For third-party integrations, an OAuth 2.0-style authorization code flow is supported for server-to-server communication.

## Authorization Code Generation

- Codes are **HMAC-SHA256 signed** with a `codeSecret` (versioned format: `v1.<payload>.<signature>`).
- Codes contain: `jti`, `userId`, `tenantId`, `clientId`, `redirectUri`, `scope`, `exp`.
- Single-use enforcement via **Redis `GETDEL`** (atomic get-and-delete, race-condition safe).
- Codes are short-lived with configurable TTL.
- Pending requests are cached in Redis with automatic expiry.

## Token Exchange

- **Timing-safe** client secret comparison (`timingSafeEqual`).
- **Redirect URI validation** against allowlist.
- **Single-use codes** — already-used codes are rejected (`Authorization code already used`).
- Signature and expiry are validated before any token exchange.

## Flow Diagram

```mermaid
sequenceDiagram
    participant App as Third-Party App
    participant Server as Gauzy API
    participant Redis
    App->>Server: GET /oauth/authorize (clientId, redirectUri, scope)
    Server->>Redis: Cache pending request (auto-expiry)
    Server->>App: Redirect with authorization code (HMAC-SHA256 signed)
    App->>Server: POST /oauth/token (code, clientId, clientSecret, redirectUri)
    Server->>Redis: GETDEL code (atomic, single-use)
    Server->>Server: Verify signature, expiry, client secret (timingSafeEqual)
    Server->>App: Access token + refresh token
```

## Related Pages

- [Token Lifecycle](./token-lifecycle) — JWT token management
- [Authentication Flows](./authentication-flows) — user-facing auth flows
- [Security Overview](./security-overview) — architecture overview
