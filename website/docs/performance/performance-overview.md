---
sidebar_position: 1
---

# Performance Overview

Performance optimization strategies and monitoring for Ever Gauzy.

## Key Metrics

| Metric                  | Target  |
| ----------------------- | ------- |
| API Response Time (p95) | < 500ms |
| API Response Time (p50) | < 200ms |
| Database Query Time     | < 100ms |
| Page Load Time          | < 3s    |
| Time to Interactive     | < 5s    |

## Performance Architecture

```
Client
  │
  ├── CDN (Static Assets)
  ├── Browser Caching
  │
API Server
  ├── Response Caching (Redis)
  ├── Connection Pooling (DB)
  ├── Lazy Loading (Modules)
  │
Database
  ├── Query Optimization
  ├── Indexing Strategy
  └── Connection Pooling
```

## Related Pages

- [Database Optimization](/performance/database-optimization) — query tuning
- [Caching](/performance/caching) — Redis and response caching
- [Monitoring](/performance/monitoring) — Sentry, health checks
- [Frontend Performance](/performance/frontend-performance) — Angular optimizations
