---
sidebar_position: 16
---

# Nginx Reverse Proxy Setup

Configure Nginx as a reverse proxy for Ever Gauzy.

## Basic Configuration

```nginx
upstream gauzy_api {
    server 127.0.0.1:3000;
}

upstream gauzy_webapp {
    server 127.0.0.1:4200;
}

server {
    listen 80;
    server_name api.example.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.example.com;

    ssl_certificate /etc/letsencrypt/live/api.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.example.com/privkey.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";

    # File upload size
    client_max_body_size 50M;

    # API proxy
    location / {
        proxy_pass http://gauzy_api;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # WebSocket support
    location /socket.io {
        proxy_pass http://gauzy_api;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
    }

    # Health check
    location /health {
        proxy_pass http://gauzy_api/api/health;
    }
}

server {
    listen 443 ssl http2;
    server_name app.example.com;

    ssl_certificate /etc/letsencrypt/live/app.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/app.example.com/privkey.pem;

    location / {
        proxy_pass http://gauzy_webapp;
        proxy_set_header Host $host;
    }
}
```

## SSL with Let's Encrypt

```bash
sudo certbot --nginx -d api.example.com -d app.example.com
```

## Rate Limiting

```nginx
http {
    limit_req_zone $binary_remote_addr zone=api:10m rate=60r/m;

    server {
        location /api/ {
            limit_req zone=api burst=20 nodelay;
        }
    }
}
```

## Related Pages

- [Production Deployment](../devops/production-deployment) — deployment guide
- [SSL & Domains](./ssl-and-domains) — SSL configuration
