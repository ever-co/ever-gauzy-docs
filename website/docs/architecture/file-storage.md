---
sidebar_position: 9
---

# File Storage

File storage architecture supporting multiple providers for screenshots, documents, and assets.

## Storage Providers

| Provider                | Enum Value     | Use Case                      |
| ----------------------- | -------------- | ----------------------------- |
| **Local**               | `LOCAL`        | Development, self-hosted      |
| **AWS S3**              | `S3`           | Production cloud storage      |
| **Wasabi**              | `WASABI`       | S3-compatible, cost-effective |
| **Cloudinary**          | `CLOUDINARY`   | Image optimization & CDN      |
| **DigitalOcean Spaces** | `DIGITALOCEAN` | S3-compatible                 |

## Configuration

```bash
# Storage provider selection
FILE_PROVIDER=LOCAL                  # LOCAL | S3 | WASABI | CLOUDINARY | DIGITALOCEAN

# Local storage
FILE_LOCAL_PATH=./apps/api/assets

# AWS S3
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_REGION=us-east-1
AWS_S3_BUCKET=gauzy-files
S3_FORCE_PATH_STYLE=false

# Wasabi (S3-compatible)
WASABI_ACCESS_KEY_ID=your-key
WASABI_SECRET_ACCESS_KEY=your-secret
WASABI_REGION=us-east-1
WASABI_SERVICE_URL=https://s3.wasabisys.com
WASABI_S3_BUCKET=gauzy-files

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud
CLOUDINARY_API_KEY=your-key
CLOUDINARY_API_SECRET=your-secret

# DigitalOcean Spaces
DIGITALOCEAN_ACCESS_KEY_ID=your-key
DIGITALOCEAN_SECRET_ACCESS_KEY=your-secret
DIGITALOCEAN_REGION=nyc3
DIGITALOCEAN_S3_BUCKET=gauzy-files
DIGITALOCEAN_SERVICE_URL=https://nyc3.digitaloceanspaces.com
```

## Architecture

```
Upload Request
  │
  ├── FileStorageFactory
  │     ├── Selects provider based on FILE_PROVIDER
  │     └── Returns provider-specific storage instance
  │
  ├── Provider Instance
  │     ├── upload(file) → URL
  │     ├── download(key) → Buffer
  │     ├── delete(key) → void
  │     └── getSignedUrl(key) → URL
  │
  └── Response with file URL
```

## Stored File Types

| Type           | Usage               |  Typical Size  |
| -------------- | ------------------- | :------------: |
| Screenshots    | Time tracking proof |   50-500 KB    |
| Profile images | Employee avatars    |   10-200 KB    |
| Documents      | Resumes, contracts  | 100 KB - 10 MB |
| Invoice PDFs   | Generated invoices  |   50-500 KB    |
| Exports        | Data export files   |    1-100 MB    |

## Related Pages

- [Architecture Overview](./overview) — system architecture
- [Environment Variables](../development/environment-variables) — full config reference
- [Desktop Timer](../desktop/desktop-timer) — screenshot capture
