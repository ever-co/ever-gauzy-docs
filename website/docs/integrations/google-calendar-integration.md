---
sidebar_position: 13
---

# Google Calendar Integration

Sync events, appointments, and meetings between Gauzy and Google Calendar.

## Overview

The Google Calendar integration enables:

- Sync employee appointments to Google Calendar
- Import calendar events as time entries
- Availability based on calendar

## Setup

### 1. Google Cloud Console

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a project or select existing
3. Enable **Google Calendar API**
4. Create OAuth credentials
5. Add authorized redirect URI: `{API_BASE_URL}/api/integration/google-calendar/callback`

### 2. Configure

```
GOOGLE_CALENDAR_CLIENT_ID=your-client-id
GOOGLE_CALENDAR_CLIENT_SECRET=your-client-secret
GOOGLE_CALENDAR_CALLBACK_URL=http://localhost:3000/api/integration/google-calendar/callback
```

### 3. Connect

1. Navigate to **Integrations** → **Google Calendar**
2. Click **Connect**
3. Authorize Google Calendar access
4. Select calendars to sync

## Synced Data

| Google Calendar | Gauzy                 | Direction      |
| --------------- | --------------------- | -------------- |
| Events          | Employee Appointments | Google → Gauzy |
| Busy times      | Availability          | Google → Gauzy |
| Meeting invites | Event Types           | Bidirectional  |

## Related Pages

- [Google OAuth](../authentication/social-auth) — Google auth setup
- [Employee Availability](../api/employee-availability-endpoints) — availability API
- [Event Scheduling](../features/event-scheduling) — scheduling features
