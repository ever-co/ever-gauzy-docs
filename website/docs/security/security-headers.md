---
sidebar_position: 15
---

# Security Headers Reference

Complete list of recommended security headers for production deployments.

## Recommended Headers

```nginx
# Prevent MIME-type sniffing
add_header X-Content-Type-Options "nosniff" always;

# Prevent clickjacking
add_header X-Frame-Options "SAMEORIGIN" always;

# XSS Protection (legacy browsers)
add_header X-XSS-Protection "1; mode=block" always;

# HSTS - force HTTPS
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;

# Referrer Policy
add_header Referrer-Policy "strict-origin-when-cross-origin" always;

# Permissions Policy
add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;

# Content Security Policy
add_header Content-Security-Policy "default-src 'self'; script-src 'self'" always;
```

## Header Reference

| Header                      | Value                             | Purpose                 |
| --------------------------- | --------------------------------- | ----------------------- |
| `X-Content-Type-Options`    | `nosniff`                         | Prevent MIME sniffing   |
| `X-Frame-Options`           | `SAMEORIGIN`                      | Prevent clickjacking    |
| `X-XSS-Protection`          | `1; mode=block`                   | Legacy XSS filter       |
| `Strict-Transport-Security` | `max-age=63072000`                | Force HTTPS             |
| `Referrer-Policy`           | `strict-origin-when-cross-origin` | Control referrer        |
| `Permissions-Policy`        | `camera=(), microphone=()`        | Restrict features       |
| `Content-Security-Policy`   | (see CSP guide)                   | Control content sources |

## NestJS Helmet

```typescript
import helmet from "helmet";
app.use(helmet());
```

Helmet sets most headers automatically.

## Testing

Test your headers at:

- [SecurityHeaders.com](https://securityheaders.com)
- [Mozilla Observatory](https://observatory.mozilla.org)

## Related Pages

- [Content Security Policy](./content-security-policy) — CSP details
- [CORS Configuration](./cors-configuration) — CORS setup
- [SSL Certificates](../devops/ssl-certificate-management) — SSL/TLS
