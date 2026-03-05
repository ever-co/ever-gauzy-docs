---
sidebar_position: 76
---

# Custom Branding

White-label and customize the Gauzy application branding.

## Customizable Elements

| Element      | Location               | Description              |
| ------------ | ---------------------- | ------------------------ |
| Logo         | Header, login, favicon | Company logo             |
| App Name     | Title bar, emails      | Application name         |
| Colors       | Theme                  | Primary/secondary colors |
| Login Page   | Auth screens           | Custom background/text   |
| Email Header | Email templates        | Custom header image      |

## Logo Configuration

### Web App

```env
# Custom logo URL
GAUZY_CLOUD_APP_LOGO=https://your-domain.com/logo.png
```

### In Angular

```typescript
// environments/environment.ts
export const environment = {
  GAUZY_CLOUD_APP: {
    LOGO: "assets/images/custom-logo.svg",
    NAME: "Your Company Platform",
  },
};
```

## Theme Customization

Modify the NbTheme variables:

```scss
// Custom theme
$nb-themes: nb-register-theme(
  (
    color-primary-500: #YOUR_COLOR,
    color-success-500: #YOUR_SUCCESS,
    color-info-500: #YOUR_INFO,
  ),
  default,
  default
);
```

## Login Page

Customize the login screen:

1. Replace background image in `assets/images/`
2. Update login page text in translation files
3. Add custom CSS if needed

## Email Branding

1. Go to **Settings** → **Email Templates**
2. Edit header template
3. Add your logo and brand colors
4. Save

## Related Pages

- [Theme Customization](../frontend/theme-customization-deep-dive) — themes
- [Email Templates](./email-templates-deep-dive) — email templates
- [Organization Settings](./organization-settings) — org config
