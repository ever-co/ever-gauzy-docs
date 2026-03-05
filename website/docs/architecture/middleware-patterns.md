---
sidebar_position: 46
---

# Middleware Patterns

NestJS middleware used for request processing.

## Overview

Middleware executes before route handlers and guards. Gauzy uses middleware for:

- Request logging
- CORS configuration
- Request context setup
- Rate limiting
- Request body parsing

## Global Middleware

```typescript
// main.ts
app.use(helmet());
app.use(compression());
app.enableCors({
  origin: process.env.CLIENT_BASE_URL,
  credentials: true,
});
```

## Request Logging Middleware

```typescript
@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    res.on("finish", () => {
      const duration = Date.now() - start;
      console.log(`${req.method} ${req.url} ${res.statusCode} ${duration}ms`);
    });
    next();
  }
}
```

## Request Context Middleware

Sets up tenant and user context for each request:

```typescript
@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const requestContext = new RequestContext(req, res);
    RequestContext.setCurrentContext(requestContext);
    next();
  }
}
```

## Applying Middleware

```typescript
@Module({})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestLoggerMiddleware, RequestContextMiddleware)
      .forRoutes("*");
  }
}
```

## Middleware vs Guards vs Interceptors

| Component    | Executes         | Access To        | Use Case          |
| ------------ | ---------------- | ---------------- | ----------------- |
| Middleware   | Before all       | req, res, next   | Logging, CORS     |
| Guards       | After middleware | ExecutionContext | Auth, permissions |
| Interceptors | Around handler   | CallHandler      | Transform, cache  |

## Related Pages

- [Request Lifecycle](./request-lifecycle) — full flow
- [Guard System](./guard-system) — guards
- [Interceptor Patterns](./interceptor-patterns) — interceptors
