---
sidebar_position: 45
---

# Custom SMTP

Configure custom SMTP servers for email delivery.

## Overview

By default, Gauzy uses the system email provider. You can configure a custom SMTP server per tenant or organization for branded email delivery.

## Configuration

### Via UI

1. Navigate to **Settings** → **Custom SMTP**
2. Enter SMTP server details
3. Click **Validate** to test the connection
4. Save the configuration

### SMTP Settings

| Setting      | Description           | Example           |
| ------------ | --------------------- | ----------------- |
| Host         | SMTP server hostname  | `smtp.gmail.com`  |
| Port         | SMTP port             | `587`             |
| Secure       | Use TLS/SSL           | `true` or `false` |
| Username     | SMTP username         | `user@gmail.com`  |
| Password     | SMTP password/app key | `app-password`    |
| From Address | Sender email address  | `no-reply@co.com` |

### Common Providers

| Provider   | Host                         | Port | Secure |
| ---------- | ---------------------------- | ---- | ------ |
| Gmail      | `smtp.gmail.com`             | 587  | false  |
| Outlook    | `smtp-mail.outlook.com`      | 587  | false  |
| SendGrid   | `smtp.sendgrid.net`          | 587  | false  |
| Amazon SES | `email-smtp.*.amazonaws.com` | 587  | true   |
| Mailgun    | `smtp.mailgun.org`           | 587  | false  |

## Validation

Before saving, always validate the SMTP connection:

1. Click **Validate** in the SMTP settings panel
2. A test email is sent to verify connectivity
3. If validation fails, check credentials and firewall rules

## API Reference

See [Email Template Endpoints](../api/email-template-endpoints) for the SMTP API documentation.

## Related Pages

- [Email Templates](./email-templates) — template customization
- [Employee Notifications](./employee-notifications) — notification delivery
