---
sidebar_position: 27
---

# Error Handling Architecture

Standardized error handling patterns across the API layer.

## Global Exception Filter

All unhandled exceptions are caught by the global exception filter:

```typescript
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      statusCode: status,
      message: this.getErrorMessage(exception),
      timestamp: new Date().toISOString(),
    });
  }
}
```

## Standard Error Responses

### 400 Bad Request

Validation errors return field-level details:

```json
{
  "statusCode": 400,
  "message": ["email must be an email", "name should not be empty"],
  "error": "Bad Request"
}
```

### 401 Unauthorized

```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

### 403 Forbidden

Missing permissions:

```json
{
  "statusCode": 403,
  "message": "You do not have permission to access this resource"
}
```

### 404 Not Found

```json
{
  "statusCode": 404,
  "message": "Record not found"
}
```

### 409 Conflict

Duplicate records:

```json
{
  "statusCode": 409,
  "message": "Email already in use"
}
```

### 429 Too Many Requests

Rate limiting:

```json
{
  "statusCode": 429,
  "message": "ThrottlerException: Too Many Requests"
}
```

## Custom Exceptions

```typescript
// Usage in services
throw new NotFoundException("Employee not found");
throw new ForbiddenException("Insufficient permissions");
throw new ConflictException("Email already exists");
throw new BadRequestException("Invalid date range");
```

## Error Logging

All 5xx errors are logged with full stack traces. 4xx errors are logged at `warn` level.

## Related Pages

- [Request Lifecycle](./request-lifecycle) — request flow
- [API Error Handling](../api/error-handling) — client error handling
