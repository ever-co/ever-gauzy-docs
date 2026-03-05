---
sidebar_position: 31
---

# Image Asset Endpoints

Upload and manage image assets (avatars, logos, screenshots, documents).

## Base Path

```
/api/image-assets
```

## Endpoints

### List Image Assets

```
GET /api/image-assets
Authorization: Bearer {token}
```

### Get Image Asset by ID

```
GET /api/image-assets/:id
Authorization: Bearer {token}
```

### Upload Image

```
POST /api/image-assets/upload/{folder}
Authorization: Bearer {token}
Content-Type: multipart/form-data

file: <binary>
```

**Path Parameters:**

| Parameter | Description                                             |
| --------- | ------------------------------------------------------- |
| `folder`  | Storage folder name (e.g., `profile_pictures`, `logos`) |

**Response** `201 Created`:

```json
{
  "id": "uuid",
  "name": "screenshot.png",
  "url": "https://storage.example.com/profile_pictures/screenshot.png",
  "thumb": "https://storage.example.com/profile_pictures/screenshot_thumb.png",
  "width": 1920,
  "height": 1080,
  "size": 245678,
  "isFeatured": false
}
```

### Delete Image Asset

```
DELETE /api/image-assets/:id
Authorization: Bearer {token}
```

## File Storage Providers

The upload destination depends on the configured storage provider:

| Provider         | Environment Variable            | Description              |
| ---------------- | ------------------------------- | ------------------------ |
| **Local**        | `FILE_PROVIDER=LOCAL`           | Local filesystem storage |
| **S3**           | `FILE_PROVIDER=S3`              | Amazon S3 / compatible   |
| **Wasabi**       | `FILE_PROVIDER=WASABI`          | Wasabi Cloud Storage     |
| **Cloudinary**   | `FILE_PROVIDER=CLOUDINARY`      | Cloudinary CDN           |
| **DigitalOcean** | `FILE_PROVIDER=DIGITALOCEAN_S3` | DO Spaces                |

## Data Model

```typescript
interface IImageAsset {
  id: string;
  name: string;
  url: string;
  thumb?: string;
  width?: number;
  height?: number;
  size?: number;
  isFeatured?: boolean;
  externalProviderId?: string;
  storageProvider?: FileStorageProviderEnum;
  organizationId?: string;
  tenantId: string;
}
```

## Related Pages

- [File Storage Architecture](../architecture/file-storage) — storage providers
- [File Storage Providers](../advanced/file-storage-providers) — provider configuration
