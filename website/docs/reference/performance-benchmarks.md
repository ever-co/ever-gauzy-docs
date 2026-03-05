---
sidebar_position: 14
---

# Performance Benchmarks

Expected performance baselines for Ever Gauzy deployments.

## API Benchmarks

Tests run with k6 against a PostgreSQL-backed instance with 4GB RAM, 2 CPUs.

### Response Times (P95)

| Endpoint             | P95 Latency | Throughput |
| -------------------- | ----------- | ---------- |
| `GET /api/health`    | < 10ms      | 5000 req/s |
| `GET /api/employee`  | < 100ms     | 500 req/s  |
| `GET /api/task`      | < 150ms     | 400 req/s  |
| `GET /api/time-log`  | < 200ms     | 300 req/s  |
| `POST /api/task`     | < 200ms     | 200 req/s  |
| `POST /api/time-log` | < 250ms     | 200 req/s  |
| `GET /api/report/*`  | < 500ms     | 50 req/s   |

### Database Queries

| Query Type             | P95 Time |
| ---------------------- | -------- |
| Simple SELECT          | < 5ms    |
| JOIN (2 tables)        | < 20ms   |
| JOIN (3+ tables)       | < 50ms   |
| Aggregate (COUNT, SUM) | < 100ms  |
| Full-text search       | < 200ms  |

## Resource Requirements

### Minimum

| Resource | Value  | Supports    |
| -------- | ------ | ----------- |
| CPU      | 1 core | < 10 users  |
| RAM      | 2 GB   | Small data  |
| Disk     | 10 GB  | Basic usage |

### Recommended

| Resource | Value   | Supports      |
| -------- | ------- | ------------- |
| CPU      | 4 cores | 50-100 users  |
| RAM      | 8 GB    | Medium data   |
| Disk     | 100 GB  | Full features |

### Enterprise

| Resource | Value    | Supports     |
| -------- | -------- | ------------ |
| CPU      | 8+ cores | 500+ users   |
| RAM      | 16+ GB   | Large data   |
| Disk     | 500+ GB  | Full history |

## Optimization Tips

1. Enable Redis caching
2. Use PostgreSQL connection pooling
3. Enable query result caching
4. Use CDN for static assets
5. Scale horizontally for high concurrency

## Related Pages

- [Load Testing](../devops/load-testing) — testing guide
- [Performance Issues](../troubleshooting/performance-issues) — optimization
- [Scaling & HA](../devops/scaling) — scaling strategies
