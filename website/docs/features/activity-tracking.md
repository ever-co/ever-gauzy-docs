---
sidebar_position: 5
---

# Activity Tracking

Activity tracking captures screenshots, application usage, and website visits to provide productivity insights.

## Features

| Feature            | Source            | Privacy Controls                    |
| ------------------ | ----------------- | ----------------------------------- |
| **Screenshots**    | Desktop Timer     | Configurable frequency, blur option |
| **App Tracking**   | Desktop Timer     | Which apps are used                 |
| **URL Tracking**   | Browser Extension | Websites visited                    |
| **Activity Level** | Desktop Timer     | Keyboard/mouse activity %           |

## Screenshots

### How It Works

1. Desktop Timer captures a screenshot at configured intervals
2. Screenshot is uploaded to the server (or local storage)
3. Thumbnail is generated for quick preview
4. Screenshots are associated with time slots

### Configuration

| Setting                  | Default | Description                      |
| ------------------------ | ------- | -------------------------------- |
| `screenshotFrequency`    | 10 min  | Minutes between captures         |
| `randomScreenshot`       | false   | Randomize timing within interval |
| `isScreenshotEnabled`    | true    | Enable/disable screenshots       |
| `allowScreenshotCapture` | true    | Allow capture at org level       |

### Screenshot Storage

Screenshots can be stored in:

| Storage                 | Configuration                | Use Case                      |
| ----------------------- | ---------------------------- | ----------------------------- |
| **Local filesystem**    | `FILE_PROVIDER=LOCAL`        | Self-hosted, single server    |
| **AWS S3**              | `FILE_PROVIDER=S3`           | Cloud, scalable storage       |
| **Wasabi**              | `FILE_PROVIDER=WASABI`       | S3-compatible, cost-effective |
| **Cloudinary**          | `FILE_PROVIDER=CLOUDINARY`   | Image optimization            |
| **DigitalOcean Spaces** | `FILE_PROVIDER=DIGITALOCEAN` | Simple cloud storage          |

### Privacy Controls

- **Blur screenshots** — Managers see activity but not content
- **Delete screenshots** — Employees can delete individual screenshots
- **Disable tracking** — Employees can pause screenshot capture
- **View own screenshots** — Employees can review their own captures

## Application Tracking

Records which applications are used during tracked time:

| Data          | Description              |
| ------------- | ------------------------ |
| `title`       | Application window title |
| `description` | Application name         |
| `date`        | Timestamp                |
| `duration`    | Time spent (seconds)     |
| `type`        | APP or URL               |

## Activity Levels

Activity is measured through keyboard and mouse events within each 10-minute time slot:

### Calculation

```
activity_percentage = (keyboard_events + mouse_events) / max_expected_events × 100
```

### Reporting

Activity reports show:

- Daily activity timeline
- Average activity per project
- Activity distribution across time slots
- Top applications used
- Most visited websites

## Related Pages

- [Time Tracking](./time-tracking) — timer and time log management
- [Timesheets](./timesheets) — timesheet approval
- [Employee Management](./employee-management) — tracking settings
