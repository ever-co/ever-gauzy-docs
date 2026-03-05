---
sidebar_position: 36
---

# Interceptor Patterns

Cross-cutting concerns handled through NestJS interceptors.

## Active Interceptors

| Interceptor                  | Purpose                     |
| ---------------------------- | --------------------------- |
| `TransformInterceptor`       | Standardize response format |
| `ActivityLogInterceptor`     | Audit trail for mutations   |
| `LazyTransactionInterceptor` | Transaction management      |
| `TimeoutInterceptor`         | Request timeout handling    |
| `CacheInterceptor`           | Response caching            |

## TransformInterceptor

Wraps all responses in a standard format:

```typescript
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
  T,
  Response<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => ({
        data,
        statusCode: context.switchToHttp().getResponse().statusCode,
        timestamp: new Date().toISOString(),
      })),
    );
  }
}
```

## ActivityLogInterceptor

Records entity changes for audit:

```typescript
@Injectable()
export class ActivityLogInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const before = this.captureState(request);

    return next.handle().pipe(
      tap((result) => {
        this.logActivity({
          action: request.method,
          entity: this.getEntityName(context),
          before,
          after: result,
          userId: request.user?.id,
        });
      }),
    );
  }
}
```

## TimeoutInterceptor

```typescript
@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      timeout(30000), // 30 second timeout
      catchError((err) => {
        if (err instanceof TimeoutError) {
          throw new RequestTimeoutException();
        }
        throw err;
      }),
    );
  }
}
```

## Applying Interceptors

```typescript
// Global
app.useGlobalInterceptors(new TransformInterceptor());

// Controller-level
@UseInterceptors(CacheInterceptor)
@Controller('employee')
export class EmployeeController {}

// Method-level
@UseInterceptors(ActivityLogInterceptor)
@Put(':id')
async update() {}
```

## Related Pages

- [Guard System](./guard-system) — guards
- [Request Lifecycle](./request-lifecycle) — full request flow
- [Audit Logging](./audit-logging) — audit trail
