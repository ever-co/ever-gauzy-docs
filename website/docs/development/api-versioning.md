---
sidebar_position: 11
---

# API Versioning

API versioning strategy, deprecation policies, and migration guidance.

## Current Version

The Ever Gauzy API is currently **unversioned** — all endpoints are served at `/api/`.

```
https://api.yourdomain.com/api/employee
```

## Versioning Strategy

When breaking changes are introduced, the API will adopt **URI-based versioning**:

```
https://api.yourdomain.com/api/v1/employee
https://api.yourdomain.com/api/v2/employee
```

## NestJS Versioning Support

```typescript
app.enableVersioning({
  type: VersioningType.URI,
  defaultVersion: "1",
});
```

### Per-Controller Versioning

```typescript
@Controller({ path: "employee", version: "2" })
export class EmployeeV2Controller {
  // v2 endpoints
}
```

### Per-Endpoint Versioning

```typescript
@Get()
@Version('1')
findAllV1() { ... }

@Get()
@Version('2')
findAllV2() { ... }
```

## Deprecation Policy

| Phase            | Duration | Action                               |
| ---------------- | :------: | ------------------------------------ |
| **Announcement** |    —     | Release notes, docs update           |
| **Deprecated**   | 6 months | Sunset header added, warnings logged |
| **Removed**      |    —     | Endpoint returns 410 Gone            |

### Deprecation Headers

```http
Sunset: Sat, 01 Jun 2025 00:00:00 GMT
Deprecation: true
Link: <https://docs.gauzy.co/migration>; rel="successor-version"
```

## GraphQL Versioning

GraphQL APIs evolve through field-level deprecation:

```graphql
type Employee {
  name: String @deprecated(reason: "Use firstName and lastName")
  firstName: String
  lastName: String
}
```

## Related Pages

- [API Overview](../api/overview)
- [REST API](../api/rest-api)
- [Error Handling](../api/error-handling) — error response format
