---
sidebar_position: 1
---

# Prometheus Metrics

Expose application metrics for Prometheus scraping.

## Setup

### 1. Install Dependencies

```bash
yarn workspace @gauzy/api add prom-client
```

### 2. Configure Metrics Endpoint

The API exposes metrics at `/api/metrics`:

```
GET /api/metrics
```

Returns Prometheus-compatible text:

```
# HELP http_requests_total Total HTTP requests
# TYPE http_requests_total counter
http_requests_total{method="GET",status="200"} 1543
http_requests_total{method="POST",status="201"} 234

# HELP http_request_duration_seconds HTTP request duration
# TYPE http_request_duration_seconds histogram
http_request_duration_seconds_bucket{le="0.1"} 1200
http_request_duration_seconds_bucket{le="0.5"} 1500
```

### 3. Prometheus Configuration

```yaml
# prometheus.yml
scrape_configs:
  - job_name: "gauzy-api"
    scrape_interval: 15s
    metrics_path: /api/metrics
    static_configs:
      - targets: ["api:3000"]
```

## Available Metrics

| Metric                          | Type      | Description                  |
| ------------------------------- | --------- | ---------------------------- |
| `http_requests_total`           | Counter   | Total HTTP requests          |
| `http_request_duration_seconds` | Histogram | Request latency              |
| `active_connections`            | Gauge     | Active WebSocket connections |
| `db_query_duration_seconds`     | Histogram | Database query time          |
| `timer_active_count`            | Gauge     | Active timers                |
| `background_jobs_total`         | Counter   | Background jobs processed    |
| `nodejs_heap_size_bytes`        | Gauge     | Node.js memory usage         |

## Docker Compose with Prometheus

```yaml
prometheus:
  image: prom/prometheus:latest
  volumes:
    - ./prometheus.yml:/etc/prometheus/prometheus.yml
  ports:
    - "9090:9090"
```

## Related Pages

- [Grafana Dashboards](./grafana-dashboards) — visualization
- [Health Check Endpoints](./health-checks) — health monitoring
- [Performance Troubleshooting](../troubleshooting/performance-issues) — performance
