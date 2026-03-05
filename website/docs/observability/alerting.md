---
sidebar_position: 6
---

# Application Alerting

Configure alerts for critical application events.

## Alert Channels

| Channel   | Configuration      |
| --------- | ------------------ |
| Email     | SMTP configuration |
| Slack     | Webhook URL        |
| PagerDuty | Integration key    |
| Discord   | Webhook URL        |

## Recommended Alerts

### Critical

| Alert           | Condition               | Action         |
| --------------- | ----------------------- | -------------- |
| API Down        | Health check fails 3min | Page on-call   |
| Database Down   | No DB connection        | Page on-call   |
| High Error Rate | 5xx > 5% for 5min       | Page on-call   |
| Disk Full       | Disk > 90%              | Alert ops team |

### Warning

| Alert             | Condition             | Action        |
| ----------------- | --------------------- | ------------- |
| High Latency      | P99 > 2s for 10min    | Notify team   |
| Memory Usage High | > 80% for 15min       | Investigate   |
| Queue Backlog     | > 1000 pending jobs   | Scale workers |
| SSL Expiring      | Certificate < 14 days | Renew cert    |

### Info

| Alert               | Condition             | Action |
| ------------------- | --------------------- | ------ |
| Deployment Complete | New version deployed  | Verify |
| Backup Complete     | Daily backup finished | Log    |

## Grafana Alerting

```yaml
groups:
  - name: gauzy-alerts
    rules:
      - alert: APIHighErrorRate
        expr: rate(http_requests_total{status=~"5.."}[5m]) / rate(http_requests_total[5m]) > 0.05
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "API error rate > 5%"
```

## Related Pages

- [Grafana Dashboards](./grafana-dashboards) — dashboards
- [Prometheus Metrics](./prometheus-metrics) — metrics
- [Health Checks](./health-checks) — health monitoring
