---
sidebar_position: 6
---

# API Changelog

Track breaking changes and version updates to the Ever Gauzy API.

## Versioning Policy

The Ever Gauzy API follows semantic versioning. Breaking changes are documented here and announced in release notes.

## Latest Changes

### v0.x → v1.0 (Upcoming)

**Breaking Changes:**

- Relation whitelisting enforced on all public endpoints
- UUID validation added to all ID parameters
- Deprecated `findOneById` in favor of `findOneByIdString`

**New Endpoints:**

- `POST /api/auth/email/verify/code` — email verification
- `GET /api/daily-plan` — daily plans
- `GET /api/organization-sprint` — sprint management
- `GET /api/comment` — comments system
- `GET /api/entity-subscription` — subscriptions
- `GET /api/screening-task` — screening tasks

**Deprecated Endpoints:**

- `GET /api/tags/getByName` → use query filters instead

### Security Updates

- Enum-based relation whitelisting on public invoice/estimate endpoints
- `UUIDValidationPipe` applied to all `:id` parameters
- Rate limiting on authentication endpoints

## Migration Guide

When upgrading between major versions:

1. Review breaking changes above
2. Update API client calls
3. Test with new validation rules
4. Check deprecated endpoint usage

## Related Pages

- [API Overview](../api/overview) — API reference
- [Error Handling](../api/error-handling) — error responses
- [Release Process](../development/release-process) — versioning
