---
sidebar_position: 44
---

# Email Templates

Customize system email notifications using Handlebars templates.

## Overview

Gauzy uses a template engine for all outgoing emails. Each template is stored in the database and can be customized per tenant and language.

## Template Technology

| Component      | Description                       |
| -------------- | --------------------------------- |
| **MJML**       | Responsive email markup framework |
| **Handlebars** | Template variable interpolation   |

## Built-in Templates

| Template             | Trigger                    |
| -------------------- | -------------------------- |
| `WELCOME_USER`       | New user registration      |
| `PASSWORD_RESET`     | Password reset request     |
| `INVITE_EMPLOYEE`    | Employee invitation sent   |
| `INVITE_USER`        | User invitation sent       |
| `TIME_OFF_APPROVED`  | Time-off request approved  |
| `TIME_OFF_REJECTED`  | Time-off request rejected  |
| `INVOICE`            | Invoice sent to contact    |
| `ESTIMATE`           | Estimate sent to contact   |
| `EMAIL_VERIFICATION` | Email address verification |

## Customizing Templates

1. Navigate to **Settings** → **Email Templates**
2. Select the template to customize
3. Edit the Handlebars HTML
4. Preview the rendered output
5. Save changes

## Template Variables

Templates use Handlebars syntax for dynamic content:

```handlebars
<h1>Welcome, {{name}}!</h1>
<p>Your organization <strong>{{organizationName}}</strong> is ready.</p>
<a href="{{host}}/auth/login">Log in now</a>
```

Common variables:

| Variable               | Description          |
| ---------------------- | -------------------- |
| `{{name}}`             | Recipient name       |
| `{{email}}`            | Recipient email      |
| `{{organizationName}}` | Organization name    |
| `{{host}}`             | Application host URL |
| `{{token}}`            | Security token       |

## Multi-language Support

Templates support multiple languages — each template can have versions for each locale.

## API Reference

See [Email Template Endpoints](../api/email-template-endpoints) for the API documentation.

## Related Pages

- [Custom SMTP](./custom-smtp) — email delivery configuration
- [Employee Notifications](./employee-notifications) — notification settings
