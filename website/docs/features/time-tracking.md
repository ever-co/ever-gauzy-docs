---
sidebar_position: 3
---

# Time Tracking

Ever Gauzy provides multiple time tracking methods to accommodate different workflows and preferences.

## Tracking Methods

| Method                | Source              | Auto-Screenshot | Best For                        |
| --------------------- | ------------------- | :-------------: | ------------------------------- |
| **Desktop Timer**     | `DESKTOP`           |       ✅        | Daily tracking with screenshots |
| **Web Timer**         | `WEB_TIMER`         |       ❌        | Quick tracking from browser     |
| **Manual Entry**      | `WEB_TIMER`         |       ❌        | Retroactive time logging        |
| **Browser Extension** | `BROWSER_EXTENSION` |       ❌        | Tab-based tracking              |
| **Integration**       | `HUBSTAFF`/`UPWORK` |       ✅        | Imported from external tools    |

## Desktop Timer

The Gauzy Desktop Timer is an Electron-based application that provides:

### Features

- **One-click timer** — start/stop with project and task selection
- **Screenshot capture** — periodic screenshots at configurable intervals
- **Activity tracking** — keyboard and mouse activity percentage
- **App tracking** — applications used during tracking
- **URL tracking** — websites visited (browser extension)
- **Idle detection** — detects and handles idle time
- **System tray** — runs in background with tray icon
- **Offline support** — tracks time when disconnected, syncs later

### Timer Flow

```
Select Project & Task → Start Timer → Tracking Active
                                           │
                                    ┌──────┴──────┐
                                    │  Every 10min │
                                    │  Screenshot  │
                                    │  Activity %  │
                                    └──────┬──────┘
                                           │
                                    Stop Timer → Time Log Created
                                                 Time Slots Created
                                                 Screenshots Saved
```

### Time Slots

Time is recorded in **10-minute time slots**:

| Field         | Description                   |
| ------------- | ----------------------------- |
| `startedAt`   | Slot start time               |
| `duration`    | Duration in seconds (max 600) |
| `keyboard`    | Keyboard activity count       |
| `mouse`       | Mouse activity count          |
| `overall`     | Overall activity percentage   |
| `screenshots` | Associated screenshot records |

## Web Timer

Available in the web UI at **Time Tracker** section:

1. Select organization, project, and task
2. Click **Start** to begin tracking
3. Optionally add a description
4. Click **Stop** when done
5. Time log is created and visible in timesheets

## Manual Time Entry

For logging time retroactively:

1. Navigate to **Time Tracker → Add Time**
2. Select date, start/end times
3. Choose project and task
4. Add description and billable status
5. Submit — creates a time log with `logType: MANUAL`

## Time Log Data Model

```typescript
interface ITimeLog {
  id: string;
  startedAt: Date;
  stoppedAt: Date;
  duration: number; // Seconds
  logType: TimeLogType; // TRACKED | MANUAL | IDLE | RESUMED
  source: TimeLogSourceEnum; // DESKTOP | WEB_TIMER | MOBILE | etc.
  description?: string;
  isBillable: boolean;
  isRunning: boolean;

  // Relations
  employeeId: string;
  projectId?: string;
  taskId?: string;
  organizationId: string;
  tenantId: string;
  timeSlots: ITimeSlot[];
}
```

## Idle Handling

The Desktop Timer detects idle periods:

1. **Idle detection** — triggered after configurable idle threshold
2. **Idle prompt** — asks user what to do with idle time
3. **Options:**
   - Keep idle time (tracked as `IDLE` log type)
   - Remove idle time (deletes the idle period)
   - Resume from idle (`RESUMED` log type)

## Activity Levels

Activity is calculated from keyboard and mouse events:

| Level        | Percentage | Indicator |
| ------------ | :--------: | --------- |
| **High**     |  75–100%   | 🟢 Green  |
| **Medium**   |   50–74%   | 🟡 Yellow |
| **Low**      |   25–49%   | 🟠 Orange |
| **Very Low** |   0–24%    | 🔴 Red    |

## Configuration

### Employee Settings

```json
{
  "isTrackingEnabled": true,
  "isScreenshotEnabled": true,
  "screenshotFrequency": 10,
  "trackOnSleep": false,
  "randomScreenshot": false
}
```

### Organization Settings

```json
{
  "allowManualTime": true,
  "allowModifyTime": true,
  "allowDeleteTime": true,
  "requireReason": false,
  "requireProject": true,
  "requireTask": false
}
```

## Related Pages

- [Timesheets](./timesheets) — timesheet approval
- [Activity Tracking](./activity-tracking) — screenshots and activities
- [Time Tracking Endpoints](../api/time-tracking-endpoints) — API reference
- [Desktop Timer](../desktop/desktop-timer) — desktop application
