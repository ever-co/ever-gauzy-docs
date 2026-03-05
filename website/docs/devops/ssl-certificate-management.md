---
sidebar_position: 34
---

# SSL Certificate Management

Configure and manage SSL/TLS certificates.

## Let's Encrypt with Certbot

### Install

```bash
sudo apt install certbot python3-certbot-nginx
```

### Obtain Certificate

```bash
sudo certbot --nginx -d gauzy.example.com -d api.gauzy.example.com
```

### Auto-Renewal

Certbot installs a cron job automatically:

```bash
# Verify auto-renewal
sudo certbot renew --dry-run
```

## Nginx SSL Configuration

```nginx
server {
    listen 443 ssl http2;
    server_name api.gauzy.example.com;

    ssl_certificate /etc/letsencrypt/live/api.gauzy.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.gauzy.example.com/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
    ssl_prefer_server_ciphers off;

    # HSTS
    add_header Strict-Transport-Security "max-age=63072000" always;

    location / {
        proxy_pass http://localhost:3000;
    }
}
```

## Certificate Monitoring

| Tool              | Description                 |
| ----------------- | --------------------------- |
| Certbot Timer     | Auto-renew via systemd/cron |
| SSL Labs          | Security grade check        |
| UptimeRobot       | Expiry monitoring           |
| Custom Prometheus | `ssl_cert_expires_in_days`  |

## Wildcard Certificates

```bash
sudo certbot certonly --dns-cloudflare \
  -d "*.gauzy.example.com" \
  --dns-cloudflare-credentials ~/.secrets/cloudflare.ini
```

## Related Pages

- [Nginx Reverse Proxy](../deployment/nginx-reverse-proxy) — proxy setup
- [Security Headers](../security/security-headers) — HSTS and more
