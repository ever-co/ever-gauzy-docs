---
sidebar_position: 5
---

# Email Delivery Problems

Troubleshoot email sending failures.

## Emails Not Sending

**Check SMTP configuration:**

```
MAIL_FROM_ADDRESS=noreply@example.com
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_USERNAME=your-username
MAIL_PASSWORD=your-password
```

## Connection Timeout

**Symptom:** `ECONNREFUSED` or `ETIMEDOUT`

**Fixes:**

1. Verify SMTP host and port
2. Check firewall rules allow outbound port 587/465
3. Try port 465 (SSL) vs 587 (TLS)

## Authentication Failed

**Fixes:**

1. Check username/password
2. For Gmail: enable "Less secure app access" or use App Passwords
3. For Office 365: use OAuth2 app registration

## Custom SMTP Per Organization

Organizations can configure separate SMTP via **Settings** → **Custom SMTP**. See [Custom SMTP](../features/custom-smtp).

## Testing Email

Use a test service like [Mailtrap](https://mailtrap.io/) during development:

```
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your-mailtrap-user
MAIL_PASSWORD=your-mailtrap-pass
```

## Related Pages

- [Email Template Endpoints](../api/email-template-endpoints) — email API
- [Custom SMTP](../features/custom-smtp) — per-org SMTP
