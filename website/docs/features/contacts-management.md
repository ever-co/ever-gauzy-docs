---
sidebar_position: 7
---

# Contacts Management

Manage organization contacts including clients, leads, and customers.

## Contact Entity

| Field          | Type       | Description            |
| -------------- | ---------- | ---------------------- |
| `name`         | string     | Contact/company name   |
| `contactType`  | enum       | LEAD, CLIENT, CUSTOMER |
| `primaryEmail` | string     | Main email address     |
| `primaryPhone` | string     | Main phone number      |
| `imageUrl`     | string     | Contact avatar/logo    |
| `budget`       | number     | Annual budget          |
| `budgetType`   | enum       | QUARTERLY, ANNUAL      |
| `members`      | Employee[] | Assigned team members  |
| `projects`     | Project[]  | Associated projects    |

## Contact Lifecycle

```
Lead → Qualified → Client → Customer
 │         │         │
 └─ Lost   └─ Lost   └─ Churned
```

## Features

### Contact Profiles

- Company details and addresses
- Multiple email addresses and phone numbers
- Social media links
- Contact notes and tags
- Document attachments

### Contact-Project Linking

Contacts can be linked to projects, enabling:

- Billing association per contact
- Project cost tracking per client
- Invoice generation from contact

### Member Assignment

Assign employees as account managers:

- Primary contact person
- Sales representative
- Project manager

## Permissions

| Action               | Permission         |
| -------------------- | ------------------ |
| View contacts        | `ORG_CONTACT_VIEW` |
| Create/edit contacts | `ORG_CONTACT_EDIT` |

## Related Pages

- [CRM Overview](./crm-overview)
- [Sales Pipelines](./sales-pipelines)
- [Invoicing](./invoicing) — billing contacts
