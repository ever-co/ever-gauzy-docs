---
sidebar_position: 78
---

# Custom SMTP Deep Dive

Configure custom SMTP settings for email delivery.

## Configuration

### Environment Variables

```env
MAIL_FROM_ADDRESS=noreply@your-company.com
MAIL_HOST=smtp.your-provider.com
MAIL_PORT=587
MAIL_USERNAME=your-smtp-username
MAIL_PASSWORD=your-smtp-password
```

### NestJS Mailer Configuration

```typescript
MailerModule.forRootAsync({
  useFactory: (config: ConfigService) => ({
    transport: {
      host: config.get("MAIL_HOST"),
      port: config.get("MAIL_PORT", 587),
      secure: config.get("MAIL_PORT") === 465,
      auth: {
        user: config.get("MAIL_USERNAME"),
        pass: config.get("MAIL_PASSWORD"),
      },
    },
    defaults: {
      from: `"${config.get("APP_NAME", "Gauzy")}" <${config.get("MAIL_FROM_ADDRESS")}>`,
    },
  }),
  inject: [ConfigService],
});
```

## Popular SMTP Providers

| Provider      | Host                            | Port | Notes            |
| ------------- | ------------------------------- | ---- | ---------------- |
| Gmail         | smtp.gmail.com                  | 587  | App password req |
| SendGrid      | smtp.sendgrid.net               | 587  | API key as pass  |
| AWS SES       | email-smtp.region.amazonaws.com | 587  | IAM credentials  |
| Mailgun       | smtp.mailgun.org                | 587  | Domain verified  |
| Microsoft 365 | smtp.office365.com              | 587  | Modern auth      |

## Testing SMTP

```bash
# Test via CLI
echo "Test" | mail -s "Test" -S smtp=smtp://smtp.example.com:587 user@example.com

# Or use the Gauzy admin panel:
# Settings → Email → Test Connection
```

## Troubleshooting

| Issue              | Solution                         |
| ------------------ | -------------------------------- |
| Connection timeout | Check firewall rules             |
| Auth failed        | Verify credentials, app password |
| TLS errors         | Use port 587 with STARTTLS       |
| Emails in spam     | Configure SPF, DKIM, DMARC       |
| Rate limiting      | Use dedicated SMTP service       |

## DNS Records

For deliverability, configure:

```
# SPF
v=spf1 include:_spf.google.com ~all

# DKIM
selector._domainkey.your-domain.com

# DMARC
_dmarc.your-domain.com  v=DMARC1; p=quarantine; rua=mailto:admin@your-domain.com
```

## Related Pages

- [Email Templates](./email-templates-deep-dive) — templates
- [Notification System](./notification-system) — notifications
- [Environment Variables](../reference/environment-variables) — all env vars
