---
sidebar_position: 4
---

# Kubernetes

Deploy Ever Gauzy on Kubernetes for scalable, production-grade deployments.

## Architecture

```
Ingress Controller
├── /api  → API Service (Deployment, 2+ replicas)
└── /     → Webapp Service (Deployment, 2+ replicas)

Internal:
├── PostgreSQL (StatefulSet or managed)
├── Redis (StatefulSet or managed)
└── MinIO / S3 (Object storage)
```

## Helm Charts

The project includes Helm charts in `.deploy/k8s/`:

```bash
helm install gauzy .deploy/k8s/helm/gauzy \
  --namespace gauzy \
  --create-namespace \
  --set api.image.tag=latest \
  --set webapp.image.tag=latest \
  --set postgresql.enabled=true
```

## Kubernetes Manifests

### Namespace

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: gauzy
```

### API Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: gauzy-api
  namespace: gauzy
spec:
  replicas: 2
  selector:
    matchLabels:
      app: gauzy-api
  template:
    metadata:
      labels:
        app: gauzy-api
    spec:
      containers:
        - name: api
          image: ghcr.io/ever-co/gauzy-api:latest
          ports:
            - containerPort: 3000
          envFrom:
            - secretRef:
                name: gauzy-secrets
            - configMapRef:
                name: gauzy-config
          livenessProbe:
            httpGet:
              path: /api/health
              port: 3000
            initialDelaySeconds: 30
            periodSeconds: 10
          readinessProbe:
            httpGet:
              path: /api/health
              port: 3000
            initialDelaySeconds: 15
            periodSeconds: 5
          resources:
            requests:
              memory: "512Mi"
              cpu: "250m"
            limits:
              memory: "2Gi"
              cpu: "1000m"
```

### Service

```yaml
apiVersion: v1
kind: Service
metadata:
  name: gauzy-api
  namespace: gauzy
spec:
  selector:
    app: gauzy-api
  ports:
    - port: 3000
      targetPort: 3000
  type: ClusterIP
```

### Ingress

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: gauzy-ingress
  namespace: gauzy
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  tls:
    - hosts:
        - api.gauzy.co
        - app.gauzy.co
      secretName: gauzy-tls
  rules:
    - host: api.gauzy.co
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: gauzy-api
                port:
                  number: 3000
    - host: app.gauzy.co
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: gauzy-webapp
                port:
                  number: 4200
```

### Secrets

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: gauzy-secrets
  namespace: gauzy
type: Opaque
stringData:
  DB_PASS: secure-password
  JWT_SECRET: your-jwt-secret
  JWT_REFRESH_TOKEN_SECRET: your-refresh-secret
```

## Scaling

```bash
# Scale API
kubectl scale deployment gauzy-api -n gauzy --replicas=4

# Auto-scaling
kubectl autoscale deployment gauzy-api -n gauzy \
  --min=2 --max=10 --cpu-percent=70
```

## Related Pages

- [Deployment Overview](./deployment-overview)
- [Docker Setup](./docker-setup)
- [SSL & Domains](./ssl-and-domains)
