---
sidebar_position: 14
---

# XSS and CSRF Prevention

Protect against Cross-Site Scripting and Cross-Site Request Forgery.

## XSS Prevention

### Server-Side

1. **Input sanitization** — all user input is sanitized via DTOs
2. **Output encoding** — template engines auto-encode
3. **Content-Security-Policy** — restrict script sources

```typescript
// class-validator on DTOs
@IsString()
@MaxLength(255)
@Transform(({ value }) => sanitizeHtml(value))
title: string;
```

### Client-Side (Angular)

Angular auto-escapes all template bindings:

```html
<!-- Safe: auto-escaped -->
<p>{{ userInput }}</p>

<!-- Dangerous: bypasses sanitization -->
<div [innerHTML]="userInput"></div>
```

Use Angular's `DomSanitizer` for trusted HTML:

```typescript
this.sanitizer.bypassSecurityTrustHtml(trustedHtml);
```

## CSRF Prevention

### Token-Based

For cookie-based auth, use CSRF tokens:

```typescript
app.use(csurf({ cookie: true }));
```

### JWT Alternative

Gauzy primarily uses JWTs in the Authorization header, which is inherently CSRF-proof since:

- Tokens are in headers, not cookies
- Browsers don't auto-attach Authorization headers

## Security Checklist

- [x] Angular template auto-escaping
- [x] Server-side input validation
- [x] CSP headers configured
- [x] JWT-based auth (CSRF-resistant)
- [x] HttpOnly cookies for refresh tokens
- [x] SameSite cookie attribute

## Related Pages

- [Content Security Policy](./content-security-policy) — CSP configuration
- [Security Headers](./security-headers) — all security headers
- [Input Validation](./input-validation) — server validation
