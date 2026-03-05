---
sidebar_position: 48
---

# Contacts Management

Manage business contacts (customers, clients, leads, vendors, and partners) with full CRM capabilities.

## Overview

The Contacts module is the foundation of Gauzy's CRM — manage relationships with all external parties.

## Contact Types

| Type     | Description                 |
| -------- | --------------------------- |
| Customer | Paying customers            |
| Client   | Active client relationships |
| Lead     | Prospective customers       |
| Vendor   | Suppliers and vendors       |
| Partner  | Business partners           |

## Contact Properties

| Property      | Description          |
| ------------- | -------------------- |
| Name          | Contact/company name |
| Contact Type  | Type of relationship |
| Primary Email | Main email address   |
| Primary Phone | Main phone number    |
| Budget        | Client budget        |
| Budget Type   | Hours or Cost        |
| Members       | Assigned employees   |
| Tags          | Categorization tags  |
| Notes         | Free-text notes      |
| Image         | Avatar/logo          |

## Contact Views

- **Table View** — sortable list with key columns
- **Card View** — visual grid of contact cards
- **Map View** — geographic location view

## Contact → Project Linking

Each contact can be associated with:

- Multiple projects
- Invoices and payments
- Sales pipeline deals

## Permissions

| Action | Required Permission |
| ------ | ------------------- |
| View   | `ORG_CONTACT_VIEW`  |
| Edit   | `ORG_CONTACT_EDIT`  |

## API Reference

See [Contact Endpoints](../api/contact-endpoints) for the API documentation.

## Related Pages

- [Sales Pipelines](./sales-pipelines) — deal tracking
- [Invoicing](./invoicing) — generate invoices for contacts
- [Project Management](./project-management) — contact-linked projects
