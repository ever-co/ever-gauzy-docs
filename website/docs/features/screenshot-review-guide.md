---
sidebar_position: 84
---

# Screenshot Review Guide

Review and manage employee screenshots from time tracking.

## Overview

When screenshot tracking is enabled, the system captures periodic screenshots during active work sessions. These can be reviewed for transparency and productivity insights.

## Configuration

### Organization Level

1. Go to **Settings** → **Time Tracking**
2. Configure:
   - **Screenshot capture**: On/Off
   - **Screenshot interval**: 1-10 minutes
   - **Blur screenshots**: On/Off (privacy mode)
   - **Allow delete**: Whether employees can delete screenshots

### Per-Employee Override

1. Open employee profile → **Settings**
2. Override organization defaults per employee

## Reviewing Screenshots

### Gallery View

1. Go to **Time Tracking** → **Screenshots**
2. Filter by:
   - Employee
   - Date range
   - Project/task
3. View screenshots in gallery or timeline layout

### Timeline View

Shows screenshots alongside:

- Active time percentage
- Window titles/app names
- Mouse/keyboard activity levels

## Screenshot Details

| Data Point     | Available          |
| -------------- | ------------------ |
| Timestamp      | ✅                 |
| Screen capture | ✅ (blur optional) |
| Active window  | ✅ (optional)      |
| Activity level | ✅                 |
| Project/Task   | ✅                 |
| Employee       | ✅                 |

## Privacy Controls

| Setting             | Effect                         |
| ------------------- | ------------------------------ |
| Disable screenshots | No captures at all             |
| Blur mode           | Screenshots are blurred        |
| Employee delete     | Employee can delete own        |
| Activity only       | Activity % without screenshots |

## Data Retention

```env
SCREENSHOT_RETENTION_DAYS=90
```

Screenshots older than the retention period are automatically deleted.

## Related Pages

- [Time Tracking](./time-tracking) — tracking overview
- [Activity Tracking](./activity-tracking) — activity levels
- [GDPR Compliance](../security/compliance-gdpr) — data protection
