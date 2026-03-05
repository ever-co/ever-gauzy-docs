---
sidebar_position: 40
---

# Monitoring Dashboards

Set up monitoring dashboards for Gauzy deployments.

## Grafana Dashboards

### API Overview Dashboard

| Panel               | Query                                          |
| ------------------- | ---------------------------------------------- |
| Request Rate        | `rate(http_requests_total[5m])`                |
| Response Time (P50) | `histogram_quantile(0.5, ...)`                 |
| Response Time (P99) | `histogram_quantile(0.99, ...)`                |
| Error Rate          | `rate(http_requests_total{status=~"5.."}[5m])` |
| Active Connections  | `pg_stat_activity_count`                       |

### Application Health

| Panel         | Metric                                     |
| ------------- | ------------------------------------------ |
| CPU Usage     | `container_cpu_usage_seconds`              |
| Memory Usage  | `container_memory_usage_bytes`             |
| Pod Count     | `kube_deployment_status_replicas`          |
| Restart Count | `kube_pod_container_status_restarts_total` |
| Redis Memory  | `redis_used_memory`                        |

### Business Metrics

| Panel              | Source                     |
| ------------------ | -------------------------- |
| Active Users       | Custom app metric          |
| Time Tracked Today | Custom app metric          |
| Active Timers      | WebSocket connection count |
| Tasks Completed    | Custom event counter       |

## Alert Rules

| Alert              | Condition           | Severity |
| ------------------ | ------------------- | -------- |
| High Error Rate    | > 5% 5xx responses  | Critical |
| High Latency       | P99 > 5s            | Warning  |
| Pod Restart        | > 3 restarts / 5min | Critical |
| High Memory        | > 90% memory usage  | Warning  |
| DB Connection Pool | > 80% connections   | Warning  |

## Dashboard Provisioning

```yaml
# kubernetes/grafana/dashboards.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: gauzy-dashboards
data:
  api-overview.json: |
    { ... }
```

## Related Pages

- [Health Checks](../observability/health-checks) — health monitoring
- [Alerting](../observability/alerting) — alert configuration
- [Prometheus Metrics](../observability/prometheus-metrics) — metrics
