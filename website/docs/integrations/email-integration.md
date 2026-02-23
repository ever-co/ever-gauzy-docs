---
sidebar_position: 7
---

# Email Integration

Email configuration for notifications, invitations, and transactional messages.

## Email Providers

| Provider     | Configuration        |
| ------------ | -------------------- |
| **SMTP**     | Standard SMTP server |
| **SendGrid** | SendGrid API         |
| **Mailgun**  | Mailgun API          |

## Configuration

### SMTP

```bash
MAIL_FROM_ADDRESS=noreply@yourdomain.com
MAIL_HOST=smtp.yourdomain.com
MAIL_PORT=587
MAIL_USERNAME=your-email@yourdomain.com
MAIL_PASSWORD=your-email-password
```

### SendGrid

```bash
MAIL_FROM_ADDRESS=noreply@yourdomain.com
SENDGRID_API_KEY=SG.your-sendgrid-api-key
```

## Transactional Emails

| Email                  | Trigger                   |
| ---------------------- | ------------------------- |
| **Welcome**            | User registration         |
| **Email Verification** | Account creation          |
| **Password Reset**     | Password reset request    |
| **Invitation**         | Employee/user invite      |
| **Timesheet Reminder** | Timesheet submission due  |
| **Timesheet Approved** | Timesheet approved        |
| **Invoice Sent**       | Invoice emailed to client |

## Email Templates

Templates are located in the API assets directory:

```
packages/core/src/lib/email-template/
├── templates/
│   ├── welcome/
│   ├── invite/
│   ├── password-reset/
│   ├── email-verification/
│   └── invoice/
```

Templates support:

- **Handlebars** syntax for dynamic content
- **Organization branding** (logo, colors)
- **Multi-language** support

## Related Pages

- [Integrations Overview](./integrations-overview)
- [Registration & Onboarding](../authentication/registration-and-onboarding)
