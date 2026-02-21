---
sidebar_position: 1
---

# Security Overview

Security architecture and best practices for Ever Gauzy deployments.

## Security Layers

```
Client Request
  │
  ├── 1. TLS/SSL Encryption (HTTPS)
  ├── 2. Rate Limiting (Throttle Guard)
  ├── 3. Authentication (JWT / OAuth)
  ├── 4. Authorization (RBAC + Permissions)
  ├── 5. Input Validation (class-validator)
  ├── 6. Tenant Isolation (TenantAwareCrudService)
  └── 7. Data Sanitization (class-transformer)
```

## Authentication Security

- **bcrypt** password hashing (10+ rounds)
- **JWT** with short-lived access tokens
- **Refresh tokens** for token renewal
- **OAuth 2.0** for social authentication
- **Email verification** for new accounts

## Authorization Security

- **Role-Based Access Control (RBAC)** with 6 default roles
- **Fine-grained permissions** (100+ permission types)
- **Guard chain**: AuthGuard → TenantPermissionGuard → RoleGuard
- **Organization-scoped** permissions

## Data Security

- **Tenant isolation** at the database query level
- **Input validation** with DTOs and decorators
- **SQL injection** prevention via parameterized queries
- **XSS prevention** via output encoding
- **CORS** configuration

## Infrastructure Security

- **TLS/SSL** for all connections
- **Environment variables** for secrets (never in code)
- **Docker** with non-root users
- **Database SSL** for production connections
- **Secret management** via environment or vaults

## Related Pages

- [Data Protection](./data-protection) — GDPR, data handling
- [Rate Limiting](./rate-limiting) — API throttling
- [Audit Logging](./audit-logging) — activity logs
- [Authentication](../authentication/auth-overview) — auth details
- [Roles & Permissions](../authentication/roles-and-permissions) — RBAC
