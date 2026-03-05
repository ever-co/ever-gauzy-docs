---
sidebar_position: 14
---

# Email & Notification Entities

Entities for email templates, email history, custom SMTP, employee notifications, and broadcasts.

## EmailTemplate

| Column         | Type    | Description                |
| -------------- | ------- | -------------------------- |
| `name`         | string  | Template identifier        |
| `languageCode` | string  | Language code (e.g., `en`) |
| `mjml`         | string? | MJML source                |
| `hbs`          | string  | Handlebars HTML template   |

## EmailHistory

| Column    | Type   | Description             |
| --------- | ------ | ----------------------- |
| `name`    | string | Template name used      |
| `content` | string | Rendered email content  |
| `email`   | string | Recipient email address |
| `status`  | enum?  | Delivery status         |

## CustomSmtp

| Column        | Type     | Description               |
| ------------- | -------- | ------------------------- |
| `host`        | string   | SMTP host                 |
| `port`        | number   | SMTP port                 |
| `secure`      | boolean  | Use TLS                   |
| `username`    | string   | SMTP username             |
| `password`    | string   | SMTP password (encrypted) |
| `fromAddress` | string?  | From email address        |
| `isValidate`  | boolean? | Validation status         |

## EmployeeNotification

| Column        | Type    | Description         |
| ------------- | ------- | ------------------- |
| `title`       | string  | Notification title  |
| `description` | string? | Notification body   |
| `isRead`      | boolean | Read status         |
| `entity`      | string? | Related entity type |
| `entityId`    | UUID?   | Related entity ID   |
| `employeeId`  | UUID    | FK to employee      |

## EmployeeNotificationSetting

| Column                | Type    | Description               |
| --------------------- | ------- | ------------------------- |
| `assignTask`          | boolean | Notify on task assignment |
| `unassignTask`        | boolean | Notify on unassignment    |
| `createdTask`         | boolean | Notify on task creation   |
| `mentionedInComment`  | boolean | Notify on @mention        |
| `commentOnTask`       | boolean | Notify on task comment    |
| `statusChangeForTask` | boolean | Notify on status change   |
| `employeeId`          | UUID    | FK to employee            |

## Broadcast

Organization-wide broadcast messages.

| Column        | Type    | Description     |
| ------------- | ------- | --------------- |
| `title`       | string  | Broadcast title |
| `description` | string? | Message body    |
| `type`        | enum?   | Broadcast type  |

## Related Pages

- [Email Template Endpoints](../../api/email-template-endpoints) — API reference
- [Email Templates Feature](../../features/email-templates) — template management
- [Employee Notifications](../../features/employee-notifications) — notification settings
