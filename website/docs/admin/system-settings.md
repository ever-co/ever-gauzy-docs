---
sidebar_position: 2
---

# System Settings

Configure global system settings for your Ever Gauzy instance.

## Accessing Settings

Navigate to **Settings** from the sidebar.

## Setting Categories

### General

| Setting           | Description               |
| ----------------- | ------------------------- |
| Organization Name | Default organization name |
| Date Format       | Display date format       |
| Time Zone         | Default time zone         |
| Currency          | Default currency          |
| Start Week On     | First day of work week    |

### Time Tracking

| Setting              | Description                    |
| -------------------- | ------------------------------ |
| Time Format          | 12-hour or 24-hour             |
| Auto Pause/Resume    | Auto-pause on idle             |
| Idle Time Threshold  | Minutes before idle detection  |
| Screenshot Frequency | Screenshot interval (minutes)  |
| Allow Manual Time    | Enable manual time entry       |
| Allow Time Deletion  | Enable time log deletion       |
| Force Timer          | Require timer for time logging |

### Email

| Setting            | Description             |
| ------------------ | ----------------------- |
| SMTP Configuration | Custom email server     |
| Email Templates    | Customize email content |
| From Address       | Default sender address  |

### File Storage

| Setting          | Description             |
| ---------------- | ----------------------- |
| Storage Provider | LOCAL, S3, Wasabi, etc. |
| Max File Size    | Upload size limit       |

### Integrations

| Setting  | Description          |
| -------- | -------------------- |
| GitHub   | GitHub integration   |
| GitLab   | GitLab integration   |
| Jira     | Jira integration     |
| Hubstaff | Hubstaff time import |
| Upwork   | Upwork integration   |

## Related Pages

- [Admin Dashboard](./admin-dashboard) — dashboard overview
- [Environment Variables](../devops/environment-variables) — env config
- [Custom SMTP](../features/custom-smtp) — email delivery
