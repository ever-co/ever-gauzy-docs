---
sidebar_position: 12
---

# SSL & Domains

Configure SSL certificates and custom domains for Ever Gauzy deployments.

## SSL Options

| Method                 | Best For         | Auto-Renew |
| ---------------------- | ---------------- | :--------: |
| **Let's Encrypt**      | Most deployments |     ✅     |
| **Cloudflare**         | CDN + SSL        |     ✅     |
| **AWS ACM**            | AWS deployments  |     ✅     |
| **Custom Certificate** | Enterprise       |     ❌     |

## Let's Encrypt with Nginx

### Using Certbot

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d api.yourdomain.com -d app.yourdomain.com

# Auto-renew (cron)
sudo certbot renew --dry-run
```

### Nginx Configuration

```nginx
server {
    listen 443 ssl http2;
    server_name api.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/api.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

server {
    listen 443 ssl http2;
    server_name app.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/app.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/app.yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:4200;
        proxy_set_header Host $host;
    }
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name api.yourdomain.com app.yourdomain.com;
    return 301 https://$host$request_uri;
}
```

## Kubernetes with cert-manager

```yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: admin@yourdomain.com
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
      - http01:
          ingress:
            class: nginx
```

## DNS Configuration

### Required DNS Records

| Record | Name                 | Value            |
| ------ | -------------------- | ---------------- |
| A      | `api.yourdomain.com` | Server IP        |
| A      | `app.yourdomain.com` | Server IP        |
| CNAME  | `www.yourdomain.com` | `yourdomain.com` |

### Cloudflare DNS

1. Add domain to Cloudflare
2. Update nameservers at registrar
3. Add A/CNAME records
4. Enable "Full (strict)" SSL mode

## Environment Variables

```bash
# API
API_BASE_URL=https://api.yourdomain.com

# Frontend
CLIENT_BASE_URL=https://app.yourdomain.com
```

## Related Pages

- [Deployment Overview](./deployment-overview)
- [Docker Compose](./docker/docker-compose) — with Nginx proxy
- [Kubernetes](./kubernetes) — with cert-manager
