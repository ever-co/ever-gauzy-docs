---
sidebar_position: 11
---

# Content Security Policy (CSP)

Configure Content Security Policy headers for XSS protection.

## Overview

CSP is a security header that prevents XSS attacks by specifying which sources of content are trusted.

## Configuration

### Nginx CSP Header

```nginx
add_header Content-Security-Policy "
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: https: blob:;
  connect-src 'self' wss: https:;
  frame-src 'self';
  object-src 'none';
  base-uri 'self';
";
```

### Helmet.js (NestJS)

```typescript
import helmet from "helmet";

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      connectSrc: ["'self'", "wss:", "https:"],
      objectSrc: ["'none'"],
    },
  }),
);
```

## Directives Reference

| Directive     | Controls               | Recommended              |
| ------------- | ---------------------- | ------------------------ |
| `default-src` | Fallback for all types | `'self'`                 |
| `script-src`  | JavaScript sources     | `'self'`                 |
| `style-src`   | CSS sources            | `'self' 'unsafe-inline'` |
| `img-src`     | Image sources          | `'self' data: https:`    |
| `connect-src` | XHR/WebSocket/fetch    | `'self' wss:`            |
| `font-src`    | Web font sources       | `'self' fonts.gstatic`   |
| `object-src`  | Plugins, embeds        | `'none'`                 |

## Related Pages

- [Security Headers](./security-headers) — all headers
- [CORS Configuration](./cors-configuration) — CORS setup
- [XSS Prevention](./xss-prevention) — XSS protection
