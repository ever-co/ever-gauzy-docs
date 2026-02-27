---
sidebar_position: 2
---

# DigitalOcean

Deploy Ever Gauzy on DigitalOcean using Droplets, Managed Databases, and Spaces.

## Recommended Architecture

| Component     | DigitalOcean Service    |
| ------------- | ----------------------- |
| API Server    | Droplet or App Platform |
| Web App       | Droplet or App Platform |
| Database      | Managed PostgreSQL      |
| File Storage  | Spaces (S3-compatible)  |
| Load Balancer | DO Load Balancer        |
| DNS           | DO DNS                  |

## Quick Setup

### 1. Create Managed Database

```bash
doctl databases create gauzy-db \
  --engine pg \
  --version 16 \
  --size db-s-1vcpu-2gb \
  --region nyc1
```

### 2. Create Droplet

```bash
doctl compute droplet create gauzy-server \
  --image docker-20-04 \
  --size s-2vcpu-4gb \
  --region nyc1 \
  --ssh-keys your-key-id
```

### 3. Create Spaces Bucket

```bash
doctl spaces create gauzy-storage \
  --region nyc3
```

### 4. Deploy with Docker Compose

SSH into the droplet and run:

```bash
# Clone deployment configs
git clone https://github.com/ever-co/ever-gauzy.git
cd ever-gauzy/.deploy/docker-compose

# Configure environment
cp .env.sample .env
# Edit .env with your managed DB credentials and Spaces config

# Start services
docker compose up -d
```

## Environment Configuration

```bash
# Database (Managed PostgreSQL)
DB_TYPE=postgres
DB_HOST=your-managed-db-host.db.ondigitalocean.com
DB_PORT=25060
DB_NAME=gauzy
DB_USER=gauzy
DB_PASS=your-db-password
DB_SSL_MODE=true

# File Storage (DO Spaces)
FILE_PROVIDER=WASABI  # S3-compatible
AWS_ACCESS_KEY_ID=your-spaces-key
AWS_SECRET_ACCESS_KEY=your-spaces-secret
AWS_S3_BUCKET=gauzy-storage
AWS_REGION=nyc3
AWS_S3_ENDPOINT=https://nyc3.digitaloceanspaces.com
```

## App Platform

For managed deployments, use DigitalOcean App Platform:

1. Connect your GitHub repository
2. Configure build and run commands
3. Add environment variables
4. Deploy

## Related Pages

- [Deployment Overview](../deployment-overview)
- [Docker Compose](../docker/docker-compose)
- [SSL & Domains](../ssl-and-domains)
