---
sidebar_position: 30
---

# Email Template Endpoints

Manage email templates, custom SMTP configurations, and email sending history.

## Base Paths

| Resource        | Path                  |
| --------------- | --------------------- |
| Email Templates | `/api/email-template` |
| Custom SMTP     | `/api/smtp`           |
| Email History   | `/api/email-history`  |

## Email Template Endpoints

### List Templates

```
GET /api/email-template
Authorization: Bearer {token}
```

### Get Template by ID

```
GET /api/email-template/:id
Authorization: Bearer {token}
```

### Find Template by Name & Language

```
GET /api/email-template/find
Authorization: Bearer {token}
```

**Query Parameters:**

| Parameter      | Type   | Description                |
| -------------- | ------ | -------------------------- |
| `name`         | string | Template name              |
| `languageCode` | string | Language code (e.g., `en`) |

### Create Template

```
POST /api/email-template
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "WELCOME_USER",
  "languageCode": "en",
  "mjml": "<mjml>...</mjml>",
  "hbs": "<p>Welcome {{name}}!</p>",
  "organizationId": "uuid"
}
```

### Update Template

```
PUT /api/email-template/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "hbs": "<p>Updated template content</p>"
}
```

### Delete Template

```
DELETE /api/email-template/:id
Authorization: Bearer {token}
```

## Custom SMTP Endpoints

### Get SMTP Configuration

```
GET /api/smtp
Authorization: Bearer {token}
```

### Validate SMTP Configuration

```
POST /api/smtp/validate
Authorization: Bearer {token}
Content-Type: application/json

{
  "host": "smtp.gmail.com",
  "port": 587,
  "secure": false,
  "username": "user@gmail.com",
  "password": "app-password"
}
```

### Save SMTP Configuration

```
POST /api/smtp
Authorization: Bearer {token}
Content-Type: application/json

{
  "host": "smtp.gmail.com",
  "port": 587,
  "secure": false,
  "username": "user@gmail.com",
  "password": "app-password",
  "fromAddress": "no-reply@mycompany.com",
  "organizationId": "uuid"
}
```

## Email History Endpoints

### List Email History

```
GET /api/email-history
Authorization: Bearer {token}
```

### Get Email History Count

```
GET /api/email-history/count
Authorization: Bearer {token}
```

## Built-in Templates

| Template Name        | Purpose                    |
| -------------------- | -------------------------- |
| `WELCOME_USER`       | New user welcome email     |
| `PASSWORD_RESET`     | Password reset request     |
| `INVITE_EMPLOYEE`    | Employee invitation        |
| `INVITE_USER`        | User invitation            |
| `TIME_OFF_APPROVED`  | Time off request approved  |
| `TIME_OFF_REJECTED`  | Time off request rejected  |
| `INVOICE`            | Invoice email              |
| `ESTIMATE`           | Estimate email             |
| `EMAIL_VERIFICATION` | Email address verification |

## Data Model

```typescript
interface IEmailTemplate {
  id: string;
  name: string;
  languageCode: string;
  mjml?: string;
  hbs: string;
  organizationId?: string;
  tenantId: string;
}

interface ICustomSmtp {
  id: string;
  host: string;
  port: number;
  secure: boolean;
  username: string;
  password: string;
  fromAddress?: string;
  isValidate?: boolean;
  organizationId?: string;
  tenantId: string;
}

interface IEmailHistory {
  id: string;
  name: string;
  content: string;
  email: string;
  status?: EmailStatusEnum;
  organizationId?: string;
  tenantId: string;
}
```

## Related Pages

- [Email Templates Feature](../features/email-templates) — template management guide
- [Custom SMTP Feature](../features/custom-smtp) — SMTP configuration guide
- [Email System](../advanced/email-system) — architecture deep dive
