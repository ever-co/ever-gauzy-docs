---
sidebar_position: 2
---

# Grafana Dashboards

Visualize Gauzy metrics with Grafana.

## Setup

### Docker Compose

```yaml
grafana:
  image: grafana/grafana:latest
  environment:
    GF_SECURITY_ADMIN_PASSWORD: admin
  ports:
    - "3001:3000"
  volumes:
    - grafana-data:/var/lib/grafana
```

### Connect to Prometheus

1. Open Grafana at `http://localhost:3001`
2. Go to **Settings** → **Data Sources**
3. Add **Prometheus**
4. URL: `http://prometheus:9090`
5. Click **Save & Test**

## Recommended Dashboards

### API Performance

| Panel        | Query                                                                     |
| ------------ | ------------------------------------------------------------------------- |
| Request Rate | `rate(http_requests_total[5m])`                                           |
| Avg Latency  | `histogram_quantile(0.5, rate(http_request_duration_seconds_bucket[5m]))` |
| P99 Latency  | `histogram_quantile(0.99, ...)`                                           |
| Error Rate   | `rate(http_requests_total{status=~"5.."}[5m])`                            |

### System Health

| Panel              | Query                       |
| ------------------ | --------------------------- |
| Memory Usage       | `nodejs_heap_size_bytes`    |
| Active Connections | `active_connections`        |
| CPU Usage          | `process_cpu_seconds_total` |

### Business Metrics

| Panel          | Query                                                                  |
| -------------- | ---------------------------------------------------------------------- |
| Active Timers  | `timer_active_count`                                                   |
| Jobs Processed | `rate(background_jobs_total[5m])`                                      |
| DB Query Time  | `histogram_quantile(0.95, rate(db_query_duration_seconds_bucket[5m]))` |

## Alerting

Configure alerts in Grafana:

```yaml
- alert: HighErrorRate
  expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.1
  for: 5m
  labels:
    severity: critical
  annotations:
    summary: High 5xx error rate
```

## Related Pages

- [Prometheus Metrics](./prometheus-metrics) — metric collection
- [Sentry Error Tracking](./sentry-error-tracking) — error monitoring
