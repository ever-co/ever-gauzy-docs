---
sidebar_position: 35
---

# Auto-Scaling Guide

Configure auto-scaling for Ever Gauzy deployments.

## Kubernetes Horizontal Pod Autoscaler

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: gauzy-api-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: gauzy-api
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 80
```

## Scaling Strategies

| Strategy       | Trigger              | Best For          |
| -------------- | -------------------- | ----------------- |
| CPU-based      | CPU > 70%            | Compute-heavy API |
| Memory-based   | Memory > 80%         | Data processing   |
| Request-based  | RPS > threshold      | Traffic spikes    |
| Custom metrics | Queue depth, latency | Advanced scaling  |

## Database Connection Scaling

When scaling API pods, adjust connection pool:

```
max_connections = (replicas × pool_size) + buffer
```

| Replicas | Pool/Pod | Max DB Connections |
| -------- | -------- | ------------------ |
| 2        | 20       | 50                 |
| 5        | 20       | 110                |
| 10       | 20       | 210                |

## Docker Swarm Scaling

```bash
docker service scale gauzy-api=5
```

## Related Pages

- [Scaling & HA](./scaling) — scaling overview
- [Load Testing](./load-testing) — performance testing
- [Performance Benchmarks](../reference/performance-benchmarks) — benchmarks
