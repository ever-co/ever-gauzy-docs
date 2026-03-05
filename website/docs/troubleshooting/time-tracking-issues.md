---
sidebar_position: 7
---

# Time Tracking Troubleshooting

Resolve time tracking, timer, and timesheet issues.

## Timer Won't Start

**Fixes:**

1. Check the employee has the `TIME_TRACKER` permission
2. Verify a project/task is selected (if required by org settings)
3. Check the desktop app is connected to the API
4. Verify the employee account is active

## Time Not Syncing

**Symptom:** Desktop timer shows time but API doesn't

**Fixes:**

1. Check internet connectivity
2. Verify `API_BASE_URL` in desktop app settings
3. Check API logs for sync errors
4. Restart the desktop app

## Screenshots Not Capturing

**Fixes:**

1. Check screenshot feature is enabled in org settings
2. Verify screen recording permissions (macOS: System Preferences → Privacy)
3. Check screenshot storage provider is configured

## Timesheet Approval Issues

**Fixes:**

1. Verify approver has `CAN_APPROVE_TIMESHEET` permission
2. Check timesheet status is `PENDING`
3. Verify timesheet period covers the correct dates

## Duplicate Time Entries

**Cause:** Timer started multiple times.

**Fix:** Stop and delete duplicate entries, then restart timer.

## Related Pages

- [Time Tracking](../features/time-tracking) — feature guide
- [Time Tracking Endpoints](../api/time-tracking-endpoints) — API reference
- [Desktop Timer](../desktop/desktop-timer) — desktop app
