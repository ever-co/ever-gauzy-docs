---
sidebar_position: 33
---

# Multi-Currency Support

Configure and use multiple currencies across your organization.

## Overview

Ever Gauzy supports multi-currency operations for:

- Invoicing in different currencies
- Employee salaries and payments
- Expense tracking
- Income recording

## Configuration

### Organization Default Currency

1. Go to **Settings** → **Organization**
2. Set **Default Currency** (e.g., USD, EUR, GBP)
3. All new records will use this currency by default

### Available Currencies

Gauzy ships with 160+ currencies seeded from ISO 4217. See [Country & Currency Endpoints](../api/country-currency-endpoints).

## Currency in Invoices

When creating invoices, you can select any currency:

- Invoice total and items are in the selected currency
- Payments can be recorded in different currencies
- Exchange rate is noted at the time of payment

## Currency in Employee Management

- **Salary** — can be set in any currency
- **Recurring Expenses** — per-currency tracking
- **Bonuses** — currency-specific

## Multi-Currency Reports

Reports aggregate data in the organization's default currency. If data exists in multiple currencies, conversion is noted.

## Related Pages

- [Country & Currency Endpoints](../api/country-currency-endpoints) — currency API
- [Invoice Endpoints](../api/invoice-endpoints) — invoicing
- [Organization Setup](../admin/organization-setup) — org config
