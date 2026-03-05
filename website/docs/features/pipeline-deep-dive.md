---
sidebar_position: 83
---

# Sales Pipeline Deep Dive

Track deals through configurable sales pipelines.

## Pipeline Stages

```mermaid
graph LR
    Lead[Lead] --> Qualified[Qualified]
    Qualified --> Proposal[Proposal]
    Proposal --> Negotiation[Negotiation]
    Negotiation --> Won[Won/Lost]
```

## Creating Pipelines

1. Go to **Sales** → **Pipelines**
2. Click **Add Pipeline**
3. Add stages:
   - Stage name
   - Win probability (%)
   - Stage order
4. Save

## Managing Deals

### Create Deal

1. Open a pipeline
2. Click **Add Deal** in any stage
3. Fill in:
   - Title
   - Client (Contact)
   - Value and currency
   - Probability
   - Expected close date
   - Assigned member

### Move Deals

Drag and drop deals between stages on the board view.

## Pipeline Analytics

| Metric               | Description                 |
| -------------------- | --------------------------- |
| Total pipeline value | Sum of all active deals     |
| Win rate             | Deals won / total closed    |
| Average deal size    | Avg value of won deals      |
| Sales cycle          | Avg days from lead to close |
| Stage conversion     | % moving to next stage      |

## Deal Fields

| Field       | Type     | Required |
| ----------- | -------- | -------- |
| Title       | String   | ✅       |
| Client      | Contact  | ❌       |
| Value       | Number   | ❌       |
| Currency    | Enum     | ❌       |
| Probability | Number   | ❌       |
| Close Date  | Date     | ❌       |
| Stage       | Pipeline | ✅       |

## Related Pages

- [CRM Overview](./crm-overview) — CRM features
- [Contacts Management](./contacts-management) — contacts
- [Pipeline Endpoints](../api/pipeline-deal-endpoints) — API
