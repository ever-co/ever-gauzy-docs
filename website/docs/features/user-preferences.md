---
sidebar_position: 60
---

# User Preferences

Customize personal settings and UI preferences.

## Available Preferences

| Preference       | Options                        | Description              |
| ---------------- | ------------------------------ | ------------------------ |
| Language         | en, es, fr, de, etc.           | UI language              |
| Theme            | Light, Dark, Cosmic, Corporate | Color theme              |
| Date Format      | MM/DD/YYYY, DD/MM/YYYY, etc.   | Date display format      |
| Time Format      | 12h, 24h                       | Time display format      |
| Component Layout | TABLE, CARD, GRID              | Default view layout      |
| Timezone         | System timezones               | User timezone            |
| Notifications    | Per-event toggles              | Notification preferences |

## Saving Preferences

Preferences are saved per-user via:

```
PUT /api/user/:id/preferred-language
PUT /api/user/:id/preferred-component-layout
```

## Theme Selection

1. Click your **avatar** in the top right
2. Select **Theme**
3. Choose: Light, Dark, Cosmic, or Corporate
4. Theme is applied immediately and persisted

## Notification Preferences

1. Go to **Profile** → **Settings**
2. Toggle notifications per event type
3. Configure email digest frequency

## Related Pages

- [User Endpoints](../api/user-endpoints) — user API
- [Theme Customization](../frontend/theme-customization-deep-dive) — theming
