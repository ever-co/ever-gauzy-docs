---
sidebar_position: 3
---

# File Storage Providers

Configure and use different file storage backends.

## Overview

Gauzy supports multiple file storage providers for uploads (images, documents, screenshots):

| Provider     | `FILE_PROVIDER` value | Description            |
| ------------ | --------------------- | ---------------------- |
| Local        | `LOCAL`               | Local filesystem       |
| Amazon S3    | `S3`                  | Amazon S3 / compatible |
| Wasabi       | `WASABI`              | Wasabi Cloud Storage   |
| Cloudinary   | `CLOUDINARY`          | Cloudinary CDN         |
| DigitalOcean | `DIGITALOCEAN_S3`     | DigitalOcean Spaces    |

## Provider Configuration

### Local Storage

```
FILE_PROVIDER=LOCAL
```

Files are stored in the `apps/api/public/` directory.

### Amazon S3

```
FILE_PROVIDER=S3
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket
```

### Wasabi

```
FILE_PROVIDER=WASABI
WASABI_ACCESS_KEY_ID=your-key
WASABI_SECRET_ACCESS_KEY=your-secret
WASABI_REGION=us-east-1
WASABI_SERVICE_URL=https://s3.wasabisys.com
WASABI_S3_BUCKET=your-bucket
```

### Cloudinary

```
FILE_PROVIDER=CLOUDINARY
CLOUDINARY_API_KEY=your-key
CLOUDINARY_API_SECRET=your-secret
CLOUDINARY_CLOUD_NAME=your-cloud
```

## Provider Selection in Code

```typescript
import { FileStorageProviderEnum } from "@gauzy/contracts";

// The active provider is determined by FILE_PROVIDER env var
const provider = FileStorageProviderEnum[process.env.FILE_PROVIDER];
```

## Production Recommendation

For production deployments, always use an external storage provider (S3, Wasabi, or Cloudinary) to:

- Support horizontal scaling (multiple API instances)
- Ensure data persistence across container restarts
- Enable CDN delivery for better performance
- Simplify backup strategies

## Related Pages

- [Image Asset Endpoints](../api/image-asset-endpoints) — upload API
- [Environment Variables](../devops/environment-variables) — configuration
