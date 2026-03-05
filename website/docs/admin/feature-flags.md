---
sidebar_position: 4
---

# Feature Flags Management

Enable, disable, and configure platform features per tenant or organization.

## Overview

Feature flags allow administrators to control which features are available to users. Features can be toggled at the tenant or organization level.

## Accessing Feature Flags

Navigate to **Settings** → **Feature Toggles**

## Built-in Features

| Feature Code            | Description           | Default |
| ----------------------- | --------------------- | ------- |
| `FEATURE_DASHBOARD`     | Main dashboard        | ✅      |
| `FEATURE_TIME_TRACKING` | Time tracking module  | ✅      |
| `FEATURE_EXPENSE`       | Expense tracking      | ✅      |
| `FEATURE_INVOICE`       | Invoicing module      | ✅      |
| `FEATURE_ESTIMATE`      | Estimates             | ✅      |
| `FEATURE_PROPOSAL`      | Proposals             | ✅      |
| `FEATURE_JOB`           | Job board             | ✅      |
| `FEATURE_CONTACT`       | CRM contacts          | ✅      |
| `FEATURE_GOAL`          | Goals & OKRs          | ✅      |
| `FEATURE_PIPELINE`      | Sales pipelines       | ✅      |
| `FEATURE_PROJECT`       | Project management    | ✅      |
| `FEATURE_TASK`          | Task management       | ✅      |
| `FEATURE_SPRINT`        | Sprint management     | ✅      |
| `FEATURE_TEAM`          | Team management       | ✅      |
| `FEATURE_EMPLOYEE`      | Employee management   | ✅      |
| `FEATURE_ORGANIZATION`  | Organization settings | ✅      |

## Toggling Features

### Per Tenant

Super admins can toggle features for entire tenants:

1. Navigate to **Settings** → **Feature Toggles**
2. Toggle features on/off
3. Changes affect all organizations in the tenant

### Per Organization

Organization admins can toggle features within their org (if tenant allows it):

1. Navigate to **Organization Settings** → **Features**
2. Toggle features on/off

## API Reference

See [Feature Toggle Endpoints](../api/feature-toggle-endpoints) for the API documentation.

## Related Pages

- [Admin Dashboard](./admin-dashboard) — dashboard overview
- [System Settings](./system-settings) — system configuration
