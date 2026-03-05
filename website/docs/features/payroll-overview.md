---
sidebar_position: 80
---

# Payroll Overview

Payroll calculation and management in Ever Gauzy.

## Features

| Feature         | Description                |
| --------------- | -------------------------- |
| Salary tracking | Base salary per employee   |
| Hourly rates    | Rate-based compensation    |
| Bonus payments  | One-time bonus entries     |
| Deductions      | Tax, insurance, benefits   |
| Pay periods     | Monthly, bi-weekly, weekly |
| Multi-currency  | Pay in any currency        |

## Configuration

### Employee Pay

1. Go to **Employees** → select employee → **Payroll**
2. Configure:
   - Pay type: Salary or Hourly
   - Amount and currency
   - Billing rate (for client billing)
   - Pay period

### Pay Types

| Type       | Calculation           |
| ---------- | --------------------- |
| Salary     | Fixed monthly amount  |
| Hourly     | Hours × rate          |
| Commission | Percentage of revenue |
| Mixed      | Base + commission     |

## Payroll Calculation

```
Gross Pay = Base Salary + Overtime + Bonuses
Net Pay = Gross Pay - Deductions - Taxes

For hourly:
Gross Pay = (Regular Hours × Rate) + (Overtime Hours × Rate × 1.5)
```

## Reports

| Report            | Description              |
| ----------------- | ------------------------ |
| Payroll Summary   | Total costs per period   |
| Employee Earnings | Per-employee breakdown   |
| Department Costs  | Cost by department       |
| Overtime Report   | Overtime hours and costs |

## Related Pages

- [Employee Management](./employee-management) — employees
- [Income Management](./income-management) — revenue
- [Accounting Overview](./accounting-overview) — finance
