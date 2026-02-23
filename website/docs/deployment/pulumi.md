---
sidebar_position: 8
---

# Pulumi

Infrastructure as Code using Pulumi with TypeScript for deploying Ever Gauzy.

## Why Pulumi

- **TypeScript** — same language as the platform codebase
- **Type safety** — compile-time infrastructure validation
- **Real programming** — loops, conditions, functions
- **Multi-cloud** — AWS, GCP, Azure, DigitalOcean

## Directory Structure

```
.deploy/pulumi/
├── Pulumi.yaml          # Project configuration
├── Pulumi.prod.yaml     # Production stack config
├── index.ts             # Main infrastructure code
├── package.json         # Dependencies
└── tsconfig.json        # TypeScript config
```

## Quick Start

```bash
cd .deploy/pulumi

# Install dependencies
yarn install

# Login to Pulumi
pulumi login

# Create stack
pulumi stack init production

# Preview changes
pulumi preview

# Deploy
pulumi up

# Destroy
pulumi destroy
```

## Example

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

// Database
const db = new aws.rds.Instance("gauzy-db", {
  engine: "postgres",
  engineVersion: "16",
  instanceClass: "db.t3.medium",
  allocatedStorage: 50,
  dbName: "gauzy",
  username: "gauzy_admin",
  password: pulumi.secret("secure-password"),
  storageEncrypted: true,
});

// S3 for file storage
const bucket = new aws.s3.Bucket("gauzy-uploads", {
  acl: "private",
  versioning: { enabled: true },
});

// ECS Cluster
const cluster = new aws.ecs.Cluster("gauzy-cluster");

// Export outputs
export const dbEndpoint = db.endpoint;
export const bucketName = bucket.id;
```

## Related Pages

- [Terraform](./terraform) — alternative IaC
- [AWS Deployment](./aws-deployment)
- [Deployment Overview](./deployment-overview)
