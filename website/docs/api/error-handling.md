---
sidebar_position: 15
---

# Error Handling

How the Ever Gauzy API handles errors and how to interpret error responses.

## Error Response Format

All error responses follow a consistent structure:

```json
{
  "statusCode": 400,
  "message": "Error description",
  "error": "Bad Request"
}
```

For validation errors, `message` may be an array:

```json
{
  "statusCode": 400,
  "message": [
    "firstName must be a string",
    "firstName should not be empty",
    "email must be an email"
  ],
  "error": "Bad Request"
}
```

## HTTP Status Codes

### Client Errors (4xx)

| Code    | Name                 | Description                        | Common Cause                       |
| ------- | -------------------- | ---------------------------------- | ---------------------------------- |
| **400** | Bad Request          | Invalid request body or parameters | Validation failure, malformed JSON |
| **401** | Unauthorized         | Authentication required or failed  | Missing/invalid JWT token          |
| **403** | Forbidden            | Authenticated but not authorized   | Insufficient role/permissions      |
| **404** | Not Found            | Resource does not exist            | Wrong ID, deleted resource         |
| **405** | Method Not Allowed   | Wrong HTTP method                  | Using GET instead of POST          |
| **409** | Conflict             | Duplicate or conflicting resource  | Unique constraint violation        |
| **422** | Unprocessable Entity | Valid syntax but semantic error    | Business logic violation           |
| **429** | Too Many Requests    | Rate limit exceeded                | Too many API calls                 |

### Server Errors (5xx)

| Code    | Name                  | Description                      |
| ------- | --------------------- | -------------------------------- |
| **500** | Internal Server Error | Unexpected server error          |
| **502** | Bad Gateway           | Upstream service unavailable     |
| **503** | Service Unavailable   | Server overloaded or maintenance |

## Common Error Scenarios

### Authentication Errors

**Invalid credentials:**

```json
{
  "statusCode": 401,
  "message": "Incorrect email or password",
  "error": "Unauthorized"
}
```

**Expired token:**

```json
{
  "statusCode": 401,
  "message": "Token has expired",
  "error": "Unauthorized"
}
```

**Missing token:**

```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

### Permission Errors

**Insufficient permissions:**

```json
{
  "statusCode": 403,
  "message": "You do not have permission to access this resource",
  "error": "Forbidden"
}
```

**Wrong tenant:**

```json
{
  "statusCode": 403,
  "message": "You do not have access to this tenant",
  "error": "Forbidden"
}
```

### Validation Errors

**Missing required field:**

```json
{
  "statusCode": 400,
  "message": ["name should not be empty", "name must be a string"],
  "error": "Bad Request"
}
```

**Invalid UUID:**

```json
{
  "statusCode": 400,
  "message": ["organizationId must be a UUID"],
  "error": "Bad Request"
}
```

### Not Found Errors

**Resource not found:**

```json
{
  "statusCode": 404,
  "message": "Record not found",
  "error": "Not Found"
}
```

### Conflict Errors

**Duplicate entry:**

```json
{
  "statusCode": 409,
  "message": "Email already exists",
  "error": "Conflict"
}
```

## Error Handling in NestJS

The backend uses NestJS built-in exception classes:

```typescript
// 400
throw new BadRequestException("Invalid input");

// 401
throw new UnauthorizedException("Token expired");

// 403
throw new ForbiddenException("Insufficient permissions");

// 404
throw new NotFoundException("Employee not found");

// 409
throw new ConflictException("Email already exists");
```

## Retry Strategy

For transient errors (5xx, network timeouts), implement exponential backoff:

```javascript
async function apiCallWithRetry(url, options, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.status >= 500)
        throw new Error(`Server error: ${response.status}`);
      return response;
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise((resolve) =>
        setTimeout(resolve, Math.pow(2, i) * 1000),
      );
    }
  }
}
```

### When to Retry

| Error              | Retry? | Notes              |
| ------------------ | ------ | ------------------ |
| `400` Bad Request  | ❌     | Fix the request    |
| `401` Unauthorized | ❌     | Re-authenticate    |
| `403` Forbidden    | ❌     | Check permissions  |
| `404` Not Found    | ❌     | Check resource ID  |
| `409` Conflict     | ❌     | Resolve conflict   |
| `429` Rate Limited | ✅     | Wait and retry     |
| `500` Server Error | ✅     | Retry with backoff |
| `502` Bad Gateway  | ✅     | Retry with backoff |
| `503` Unavailable  | ✅     | Retry with backoff |
