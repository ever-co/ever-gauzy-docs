---
sidebar_position: 5
---

# Event Types Reference

Complete list of events and entity action types in Gauzy.

## Activity Log Action Types

| Action Type | Description             |
| ----------- | ----------------------- |
| `CREATED`   | Entity was created      |
| `UPDATED`   | Entity was updated      |
| `DELETED`   | Entity was soft-deleted |
| `ARCHIVED`  | Entity was archived     |
| `RESTORED`  | Entity was restored     |

## Entity Types

| Entity Type           | Description          |
| --------------------- | -------------------- |
| `Organization`        | Organization changes |
| `Employee`            | Employee changes     |
| `Task`                | Task updates         |
| `OrganizationProject` | Project updates      |
| `TimeLog`             | Time log entries     |
| `Timesheet`           | Timesheet approvals  |
| `Invoice`             | Invoice lifecycle    |
| `Payment`             | Payment updates      |
| `Expense`             | Expense changes      |
| `Income`              | Income changes       |
| `Contact`             | Contact updates      |
| `Deal`                | Deal stage changes   |
| `Candidate`           | Candidate updates    |
| `Equipment`           | Equipment changes    |

## WebSocket Events

| Event              | Direction       | Description         |
| ------------------ | --------------- | ------------------- |
| `timer-started`    | Server → Client | Timer started       |
| `timer-stopped`    | Server → Client | Timer stopped       |
| `screenshot-taken` | Server → Client | Screenshot captured |
| `notification`     | Server → Client | New notification    |
| `task-updated`     | Server → Client | Task changed        |
| `employee-online`  | Server → Client | Employee status     |

## CQRS Events

| Event                  | Description         |
| ---------------------- | ------------------- |
| `TaskCreatedEvent`     | Task created        |
| `TaskUpdatedEvent`     | Task updated        |
| `TimerStartedEvent`    | Timer started       |
| `TimerStoppedEvent`    | Timer stopped       |
| `ScreenshotTakenEvent` | Screenshot captured |
| `InvoiceSentEvent`     | Invoice emailed     |
| `PaymentReceivedEvent` | Payment recorded    |

## Related Pages

- [WebSocket Architecture](../architecture/websocket-realtime) — real-time events
- [Activity Log Endpoints](../api/activity-log-endpoints) — log querying
- [CQRS Handlers](../advanced/cqrs-handlers) — command/query patterns
