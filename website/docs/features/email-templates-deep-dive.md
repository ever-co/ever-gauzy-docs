---
sidebar_position: 71
---

# Email Templates Deep Dive

Customize and manage transactional email templates.

## Overview

Gauzy sends transactional emails for:

- Welcome emails
- Password resets
- Timesheet approvals
- Invoice notifications
- Team invitations
- Task assignments

## Template Engine

Templates use **Handlebars** syntax:

```html
<h1>Welcome to {{organizationName}}, {{firstName}}!</h1>
<p>Your account has been created. Click below to get started:</p>
<a href="{{loginUrl}}">Login to Gauzy</a>
```

## Available Templates

| Template              | Trigger              |
| --------------------- | -------------------- |
| `welcome-user`        | New user created     |
| `invite-user`         | Team invitation      |
| `password-reset`      | Password request     |
| `timesheet-submitted` | Timesheet submitted  |
| `timesheet-approved`  | Timesheet approved   |
| `timesheet-denied`    | Timesheet denied     |
| `invoice-sent`        | Invoice emailed      |
| `payment-received`    | Payment confirmation |
| `task-assigned`       | Task assignment      |

## Customizing Templates

1. Go to **Settings** → **Email Templates**
2. Select template to edit
3. Modify the HTML and subject line
4. Use variables: `{{firstName}}`, `{{organizationName}}`, `{{link}}`
5. Preview and save

## Template Variables

| Variable               | Available In           |
| ---------------------- | ---------------------- |
| `{{firstName}}`        | All templates          |
| `{{lastName}}`         | All templates          |
| `{{email}}`            | All templates          |
| `{{organizationName}}` | All templates          |
| `{{link}}`             | Password reset, invite |
| `{{amount}}`           | Invoice, payment       |
| `{{invoiceNumber}}`    | Invoice templates      |

## SMTP Configuration

```env
MAIL_FROM_ADDRESS=noreply@your-domain.com
MAIL_HOST=smtp.your-provider.com
MAIL_PORT=587
MAIL_USERNAME=your-username
MAIL_PASSWORD=your-password
```

## Related Pages

- [Email History Endpoints](../api/email-history-endpoints) — email API
- [Notification System](./notification-system) — notifications
