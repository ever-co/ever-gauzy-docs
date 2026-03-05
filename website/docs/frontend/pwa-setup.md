---
sidebar_position: 20
---

# PWA (Progressive Web App) Setup

Configure Ever Gauzy as a Progressive Web App.

## Overview

A PWA provides:

- Offline access to cached pages
- Install to home screen
- Push notifications
- Background sync

## Angular PWA Setup

### 1. Add Service Worker

```bash
ng add @angular/pwa --project=gauzy
```

This generates:

- `manifest.webmanifest`
- `ngsw-config.json`
- Service worker registration in `app.module.ts`

### 2. Configure Manifest

```json
{
  "name": "Ever Gauzy",
  "short_name": "Gauzy",
  "theme_color": "#3366FF",
  "background_color": "#FFFFFF",
  "display": "standalone",
  "scope": "/",
  "start_url": "/",
  "icons": [
    {
      "src": "assets/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "assets/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### 3. Cache Strategy

```json
{
  "index": "/index.html",
  "assetGroups": [
    {
      "name": "app",
      "installMode": "prefetch",
      "resources": {
        "files": ["/favicon.ico", "/index.html", "/*.css", "/*.js"]
      }
    },
    {
      "name": "assets",
      "installMode": "lazy",
      "resources": {
        "files": ["/assets/**"]
      }
    }
  ],
  "dataGroups": [
    {
      "name": "api",
      "urls": ["/api/**"],
      "cacheConfig": {
        "maxSize": 100,
        "maxAge": "5m",
        "strategy": "freshness"
      }
    }
  ]
}
```

### 4. Build for Production

```bash
yarn build --configuration production
```

## Testing

```bash
# Serve built app (service workers only work over HTTPS or localhost)
npx http-server dist/apps/gauzy -p 8080
```

## Related Pages

- [Frontend Architecture](./frontend-architecture) — architecture
- [Production Deployment](../devops/production-deployment) — deployment
