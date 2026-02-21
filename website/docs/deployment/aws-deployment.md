---
sidebar_position: 6
---

# AWS Deployment

Deploy Ever Gauzy on Amazon Web Services using ECS, RDS, and S3.

## Recommended Architecture

| Component     | AWS Service            |
| ------------- | ---------------------- |
| API Server    | ECS Fargate or EC2     |
| Web App       | S3 + CloudFront or ECS |
| Database      | RDS PostgreSQL         |
| File Storage  | S3                     |
| Load Balancer | ALB                    |
| DNS           | Route 53               |
| Secrets       | Secrets Manager        |
| Cache         | ElastiCache Redis      |

## ECS Fargate Setup

### Task Definition

```json
{
  "family": "gauzy-api",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "1024",
  "memory": "2048",
  "containerDefinitions": [
    {
      "name": "gauzy-api",
      "image": "ghcr.io/ever-co/gauzy-api:latest",
      "portMappings": [{ "containerPort": 3000, "protocol": "tcp" }],
      "environment": [
        { "name": "DB_TYPE", "value": "postgres" },
        {
          "name": "DB_HOST",
          "value": "gauzy-db.cluster-xxx.region.rds.amazonaws.com"
        }
      ],
      "secrets": [
        {
          "name": "DB_PASS",
          "valueFrom": "arn:aws:secretsmanager:region:account:secret:gauzy/db-pass"
        },
        {
          "name": "JWT_SECRET",
          "valueFrom": "arn:aws:secretsmanager:region:account:secret:gauzy/jwt"
        }
      ],
      "healthCheck": {
        "command": [
          "CMD-SHELL",
          "curl -f http://localhost:3000/api/health || exit 1"
        ],
        "interval": 30,
        "timeout": 5,
        "retries": 3
      }
    }
  ]
}
```

### RDS Configuration

```bash
# Create PostgreSQL instance
aws rds create-db-instance \
  --db-instance-identifier gauzy-db \
  --engine postgres \
  --engine-version 16 \
  --db-instance-class db.t3.medium \
  --master-username gauzy_admin \
  --master-user-password your-secure-password \
  --allocated-storage 50 \
  --storage-encrypted
```

### S3 File Storage

```bash
# .env
FILE_PROVIDER=S3
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_BUCKET=gauzy-uploads
AWS_REGION=us-east-1
```

## Static Hosting (Web App)

Host the Angular webapp on S3 + CloudFront:

```bash
# Build webapp
yarn build:prod:webapp

# Upload to S3
aws s3 sync dist/apps/gauzy/ s3://gauzy-webapp/ --delete

# Create CloudFront distribution
aws cloudfront create-distribution \
  --origin-domain-name gauzy-webapp.s3.amazonaws.com
```

## Related Pages

- [Deployment Overview](./deployment-overview)
- [Terraform](./terraform) — IaC for AWS
- [SSL & Domains](./ssl-and-domains)
