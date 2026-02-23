---
sidebar_position: 4
---

# Browser Extension

Browser extensions for tracking website visits and active tabs during time tracking.

## Supported Browsers

| Browser     | Status                      |
| ----------- | --------------------------- |
| **Chrome**  | ✅ Supported                |
| **Firefox** | ✅ Supported                |
| **Edge**    | ✅ Supported (Chrome-based) |

## Features

- **URL tracking** — records websites visited during tracking
- **Tab activity** — tracks active tab and time spent
- **Integration** — works with Desktop Timer for combined tracking
- **Privacy controls** — configurable URL filtering

## How It Works

```
Active Tab Change → Extension records URL + timestamp
                         │
                    Tab switch detected
                         │
                    Duration calculated
                         │
                    Activity sent to API
                         │
               Visible in Reports → "Apps & URLs"
```

## Data Captured

| Data       | Description                   |
| ---------- | ----------------------------- |
| `url`      | Page URL                      |
| `title`    | Page/tab title                |
| `duration` | Time on page (seconds)        |
| `date`     | Timestamp                     |
| `type`     | `URL` (vs `APP` from desktop) |

## Privacy

- URLs can be excluded by pattern
- Data only sent when timer is active
- Employee can view their own URL data
- Manager access is configurable

## Installation

### Chrome / Edge

1. Download extension package
2. Navigate to `chrome://extensions`
3. Enable "Developer mode"
4. Click "Load unpacked"
5. Select extension folder

## Related Pages

- [Desktop Timer](./desktop-timer) — desktop tracking
- [Activity Tracking](../features/activity-tracking) — URL/app reports
