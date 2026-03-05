---
sidebar_position: 7
---

# Status Codes Reference

Standard HTTP status codes returned by the Ever Gauzy API.

## Success Codes

| Code | Status     | Description                  | Endpoints        |
| ---- | ---------- | ---------------------------- | ---------------- |
| 200  | OK         | Request successful           | GET, PUT, DELETE |
| 201  | Created    | Resource created             | POST             |
| 204  | No Content | Successful, no response body | DELETE           |

## Client Error Codes

| Code | Status            | Description               | Common Cause      |
| ---- | ----------------- | ------------------------- | ----------------- |
| 400  | Bad Request       | Validation error          | Invalid input     |
| 401  | Unauthorized      | Missing/invalid JWT       | Expired token     |
| 403  | Forbidden         | Insufficient permissions  | Wrong role        |
| 404  | Not Found         | Resource doesn't exist    | Wrong ID / tenant |
| 409  | Conflict          | Duplicate resource        | Email in use      |
| 422  | Unprocessable     | Semantic validation error | Business rule     |
| 429  | Too Many Requests | Rate limit exceeded       | Too many calls    |

## Server Error Codes

| Code | Status              | Description                  |
| ---- | ------------------- | ---------------------------- |
| 500  | Internal Error      | Unexpected server error      |
| 502  | Bad Gateway         | Upstream service unavailable |
| 503  | Service Unavailable | Server overloaded            |
| 504  | Gateway Timeout     | Upstream service timeout     |

## Error Response Format

```json
{
  "statusCode": 400,
  "message": ["email must be an email", "name should not be empty"],
  "error": "Bad Request"
}
```

## Related Pages

- [Error Handling](../api/error-handling) — error handling patterns
- [Error Handling Architecture](../architecture/error-handling-architecture) — server-side
