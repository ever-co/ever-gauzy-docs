---
sidebar_position: 25
---

# Mobile App Overview

Ever Gauzy mobile applications and support.

## Available Mobile Apps

### Gauzy Teams (Mobile)

A companion app for team management and time tracking.

| Platform | Status    | Framework    |
| -------- | --------- | ------------ |
| iOS      | Available | React Native |
| Android  | Available | React Native |

### Key Features

- **Time Tracking** — Start/stop timer from mobile
- **Task Management** — View and update tasks
- **Screenshots** — View tracked screenshots
- **Team Status** — See who's online
- **Notifications** — Push notifications for mentions and approvals

## Progressive Web App (PWA)

The Gauzy web app can be installed as a PWA:

1. Open the web app in a mobile browser
2. Tap **Add to Home Screen**
3. The app icon appears on your home screen
4. Works offline with cached data

See [PWA Setup](../frontend/pwa-setup) for configuration details.

## API Access from Mobile

All mobile features use the same REST API. See [API Quickstart](../tutorials/api-quickstart-tutorial).

## Mobile-Specific Considerations

| Feature           | Mobile           | Desktop                |
| ----------------- | ---------------- | ---------------------- |
| Time Tracking     | ✅ Timer only    | ✅ Timer + screenshots |
| Screenshots       | ❌ View only     | ✅ Capture + view      |
| Activity Tracking | ❌ Not supported | ✅ Full tracking       |
| Task Management   | ✅ Basic CRUD    | ✅ Full features       |
| Reports           | ✅ Summary views | ✅ Full reports        |

## Related Pages

- [PWA Setup](../frontend/pwa-setup) — PWA configuration
- [Desktop Timer](../desktop/desktop-timer) — desktop features
- [API Overview](../api/overview) — API reference
