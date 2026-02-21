---
sidebar_position: 4
---

# HubStaff Integration

Import HubStaff time tracking data, activities, and screenshots.

## Features

- **Organization import** — sync HubStaff organizations
- **Project import** — import projects and tasks
- **Time log import** — sync tracked hours
- **Activity import** — keyboard/mouse activity data
- **Screenshot import** — import HubStaff screenshots

## Setup

```bash
HUBSTAFF_CLIENT_ID=your-client-id
HUBSTAFF_CLIENT_SECRET=your-client-secret
HUBSTAFF_REDIRECT_URL=https://api.yourdomain.com/api/integration/hubstaff/callback
```

### Authorization

1. Navigate to **Settings → Integrations → HubStaff**
2. Click **Connect to HubStaff**
3. Authorize via OAuth
4. Select organizations and projects to sync

## Sync Operations

| Data          | Direction | Mapping              |
| ------------- | :-------: | -------------------- |
| Organizations |  Import   | → Organization       |
| Projects      |  Import   | → Project            |
| Activities    |  Import   | → TimeLog + TimeSlot |
| Screenshots   |  Import   | → Screenshot         |
| Members       |  Import   | → Employee           |

## Related Pages

- [Integrations Overview](./integrations-overview)
- [Time Tracking](../features/time-tracking)
