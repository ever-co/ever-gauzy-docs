---
sidebar_position: 36
---

# Container Security

Secure Docker containers for production deployments.

## Base Image Selection

```dockerfile
# Use minimal, non-root images
FROM node:20-alpine AS runtime
RUN addgroup -g 1001 gauzy && adduser -u 1001 -G gauzy -s /bin/sh -D gauzy
USER gauzy
```

## Security Hardening

### Read-Only Filesystem

```yaml
securityContext:
  readOnlyRootFilesystem: true
  runAsNonRoot: true
  runAsUser: 1001
  allowPrivilegeEscalation: false
  capabilities:
    drop: ["ALL"]
```

### Resource Limits

```yaml
resources:
  limits:
    cpu: "2"
    memory: "2Gi"
  requests:
    cpu: "500m"
    memory: "512Mi"
```

## Image Scanning

```bash
# Scan with Trivy
trivy image ghcr.io/ever-co/gauzy-api:latest

# Scan with Docker Scout
docker scout cves ghcr.io/ever-co/gauzy-api:latest
```

## Best Practices

| Practice           | Description                   |
| ------------------ | ----------------------------- |
| Multi-stage builds | Minimize image size           |
| .dockerignore      | Exclude secrets, dev files    |
| No root            | Run as non-root user          |
| Pin versions       | Use exact image tags          |
| Scan regularly     | CI/CD vulnerability scanning  |
| Limit capabilities | Drop ALL, add only needed     |
| Read-only FS       | Prevent runtime file writes   |
| Health checks      | Container-level health probes |

## Related Pages

- [Docker Multi-Stage Optimization](./docker-optimization) — build optimization
- [Kubernetes Deployment](../deployment/kubernetes/kubernetes-deployment) — K8s
- [Vulnerability Scanning](../security/vulnerability-scanning) — scanning
