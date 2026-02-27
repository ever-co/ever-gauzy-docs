---
sidebar_position: 7
---

# Terraform

Infrastructure as Code (IaC) for deploying Ever Gauzy using Terraform.

## Directory Structure

```
.deploy/terraform/
├── main.tf           # Provider and module config
├── variables.tf      # Input variables
├── outputs.tf        # Output values
├── terraform.tfvars  # Variable values
├── modules/
│   ├── networking/   # VPC, subnets, security groups
│   ├── database/     # RDS PostgreSQL
│   ├── compute/      # ECS/EC2 instances
│   ├── storage/      # S3 buckets
│   └── cdn/          # CloudFront distribution
```

## Quick Start

```bash
cd .deploy/terraform

# Initialize Terraform
terraform init

# Preview changes
terraform plan

# Apply infrastructure
terraform apply

# Destroy infrastructure
terraform destroy
```

## Example Configuration

```hcl
# main.tf
provider "aws" {
  region = var.aws_region
}

module "networking" {
  source = "./modules/networking"
  vpc_cidr = "10.0.0.0/16"
  environment = var.environment
}

module "database" {
  source = "./modules/database"
  vpc_id = module.networking.vpc_id
  subnet_ids = module.networking.private_subnet_ids
  db_name = "gauzy"
  db_username = var.db_username
  db_password = var.db_password
  instance_class = "db.t3.medium"
}

module "compute" {
  source = "./modules/compute"
  vpc_id = module.networking.vpc_id
  subnet_ids = module.networking.private_subnet_ids
  api_image = "ghcr.io/ever-co/gauzy-api:latest"
  webapp_image = "ghcr.io/ever-co/gauzy-webapp:latest"
  db_host = module.database.endpoint
}
```

## Variables

```hcl
# variables.tf
variable "aws_region" {
  default = "us-east-1"
}

variable "environment" {
  default = "production"
}

variable "db_username" {
  sensitive = true
}

variable "db_password" {
  sensitive = true
}
```

## State Management

Store Terraform state remotely:

```hcl
terraform {
  backend "s3" {
    bucket = "gauzy-terraform-state"
    key    = "production/terraform.tfstate"
    region = "us-east-1"
    encrypt = true
  }
}
```

## Related Pages

- [AWS](./cloud/aws) — AWS services reference
- [Pulumi](./pulumi) — alternative IaC in TypeScript
- [Deployment Overview](./deployment-overview)
