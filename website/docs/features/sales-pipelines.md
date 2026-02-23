---
sidebar_position: 8
---

# Sales Pipelines

Sales pipelines help track deals through customizable stages from initial contact to close.

## Pipeline Structure

```
Pipeline: "Enterprise Sales"
├── Stage 1: Lead           (0%)
├── Stage 2: Qualified      (20%)
├── Stage 3: Proposal       (40%)
├── Stage 4: Negotiation    (60%)
├── Stage 5: Verbal Commit  (80%)
└── Stage 6: Closed Won     (100%)
```

## Pipeline Features

### Customizable Stages

- Define unlimited stages per pipeline
- Set probability percentages per stage
- Drag-and-drop deal movement
- Color-coded stage indicators

### Deal Management

Each deal in a pipeline tracks:

| Field              | Description            |
| ------------------ | ---------------------- |
| **Contact**        | Associated client/lead |
| **Value**          | Deal monetary value    |
| **Probability**    | Win probability (%)    |
| **Expected Close** | Anticipated close date |
| **Stage**          | Current pipeline stage |
| **Owner**          | Assigned sales rep     |

### Pipeline Metrics

| Metric                   | Description             |
| ------------------------ | ----------------------- |
| **Total Pipeline Value** | Sum of all deal values  |
| **Weighted Value**       | Value × probability     |
| **Conversion Rate**      | Deals won / total deals |
| **Average Deal Size**    | Mean deal value         |
| **Sales Velocity**       | Average time to close   |

## Multiple Pipelines

Create separate pipelines for different sales processes:

- Enterprise deals
- SMB sales
- Partnerships
- Renewals

## Permissions

| Action                | Permission      |
| --------------------- | --------------- |
| View pipelines        | `PIPELINE_VIEW` |
| Create/edit pipelines | `PIPELINE_EDIT` |

## Related Pages

- [CRM Overview](./crm-overview)
- [Contacts Management](./contacts-management)
