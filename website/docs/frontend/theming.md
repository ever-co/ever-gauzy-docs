---
sidebar_position: 4
---

# Theming

UI theming and customization using Nebular and CSS custom properties.

## Theme System

Ever Gauzy uses Nebular's theming system with customizable themes:

### Available Themes

| Theme         | Description           |
| ------------- | --------------------- |
| `gauzy-light` | Light theme (default) |
| `gauzy-dark`  | Dark theme            |
| `default`     | Nebular default       |
| `cosmic`      | Nebular cosmic        |
| `corporate`   | Nebular corporate     |

## Theme Switching

```typescript
// In component
constructor(private themeService: NbThemeService) {}

switchTheme(name: string): void {
  this.themeService.changeTheme(name);
}
```

## Customization

### CSS Custom Properties

```scss
// Override Nebular variables
$nb-themes: nb-register-theme(
  (
    color-primary-default: #3366ff,
    color-success-default: #00d68f,
    color-info-default: #0095ff,
    color-warning-default: #ffaa00,
    color-danger-default: #ff3d71,

    font-family-primary: "Inter, sans-serif",
    font-family-secondary: "Inter, sans-serif",

    layout-background-color: #f7f9fc,
    card-background-color: #ffffff,
    header-background-color: #ffffff,
    sidebar-background-color: #ffffff,
  ),
  gauzy-light,
  default
);
```

### Branding

Organization-level branding via environment variables:

```bash
GAUZY_CLOUD_APP=gauzy
PLATFORM_LOGO=assets/images/logos/logo.svg
PLATFORM_PRIVACY_URL=https://ever.co/privacy
PLATFORM_TOS_URL=https://ever.co/tos
```

## Responsive Layout

```
Desktop (1200px+):  Sidebar + Content
Tablet (768-1199px): Collapsible sidebar + Content
Mobile (<768px):     Bottom nav + Full content
```

## Related Pages

- [Frontend Overview](./frontend-overview)
- [i18n](./i18n)
