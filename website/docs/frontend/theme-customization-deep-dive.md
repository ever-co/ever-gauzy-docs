---
sidebar_position: 18
---

# Theme Customization Deep Dive

Advanced theme customization for the Gauzy Angular frontend.

## Theme Architecture

Gauzy uses [Nebular](https://akveo.github.io/nebular/) as the UI framework with customizable themes.

## Available Themes

| Theme     | Class Name  | Description         |
| --------- | ----------- | ------------------- |
| Light     | `default`   | White/gray light UI |
| Dark      | `dark`      | Dark mode           |
| Cosmic    | `cosmic`    | Blue-purple dark    |
| Corporate | `corporate` | Professional light  |

## Custom Theme Variables

```scss
$nb-themes: nb-register-theme(
  (
    // Brand colors
    color-primary-100: #f2f6ff,
    color-primary-500: #3366ff,
    color-primary-900: #002885,

    // Background
    background-basic-color-1: #ffffff,
    background-basic-color-2: #f7f9fc,

    // Text
    text-basic-color: #222b45,
    text-hint-color: #8f9bb3,

    // Fonts
    font-family-primary: "Inter, sans-serif",

    // Borders
    border-radius: 0.5rem,

    // Sidebar
    sidebar-width: 16rem,
    sidebar-background-color: #f7f9fc
  ),
  default,
  default
);
```

## Dynamic Theme Switching

```typescript
@Injectable()
export class ThemeService {
  constructor(private themeService: NbThemeService) {}

  switchTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
    localStorage.setItem("theme", themeName);
  }

  getCurrentTheme(): string {
    return localStorage.getItem("theme") || "default";
  }
}
```

## CSS Custom Properties

Override CSS variables for quick styling:

```css
:root {
  --primary-color: #3366ff;
  --sidebar-bg: #f7f9fc;
  --card-border-radius: 8px;
}
```

## Custom Logo & Branding

Replace the logo in:

- `apps/gauzy/src/assets/images/logos/`
- Configure in **Settings** → **Organization** → **Logo**

## Related Pages

- [Theming](./theming) — basic theming guide
- [Frontend Architecture](./frontend-architecture) — architecture overview
