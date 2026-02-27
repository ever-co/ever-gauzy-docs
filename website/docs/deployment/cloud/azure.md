---
sidebar_position: 3
---

# Azure

Deploy Ever Gauzy on Microsoft Azure using Azure Kubernetes Service (AKS), Azure Database for PostgreSQL, and Blob Storage.

## Recommended Architecture

| Component     | Azure Service                     |
| ------------- | --------------------------------- |
| API Server    | AKS or Azure Container Apps       |
| Web App       | AKS or Azure Static Web Apps      |
| Database      | Azure Database for PostgreSQL     |
| File Storage  | Azure Blob Storage                |
| Load Balancer | Azure Load Balancer / App Gateway |
| DNS           | Azure DNS                         |
| Secrets       | Azure Key Vault                   |
| Cache         | Azure Cache for Redis             |

## AKS Deployment

Azure Kubernetes Service provides a managed Kubernetes environment. See the [Kubernetes](../kubernetes) page for general K8s manifests and Helm charts — the same configuration works on AKS.

### Create an AKS Cluster

```bash
# Create resource group
az group create --name gauzy-rg --location eastus

# Create AKS cluster
az aks create \
  --resource-group gauzy-rg \
  --name gauzy-aks \
  --node-count 2 \
  --node-vm-size Standard_D2s_v3 \
  --enable-managed-identity \
  --generate-ssh-keys

# Get credentials
az aks get-credentials --resource-group gauzy-rg --name gauzy-aks
```

### Deploy with Helm

```bash
# Install using the project Helm charts
helm install gauzy .deploy/k8s/helm/gauzy \
  --namespace gauzy \
  --create-namespace \
  --set api.image.tag=latest \
  --set webapp.image.tag=latest \
  --set postgresql.enabled=false \
  --set externalDatabase.host=gauzy-db.postgres.database.azure.com
```

## Azure Database for PostgreSQL

```bash
# Create a Flexible Server instance
az postgres flexible-server create \
  --resource-group gauzy-rg \
  --name gauzy-db \
  --location eastus \
  --admin-user gauzy_admin \
  --admin-password your-secure-password \
  --sku-name Standard_D2ds_v4 \
  --storage-size 128 \
  --version 16 \
  --yes

# Allow AKS subnet access
az postgres flexible-server firewall-rule create \
  --resource-group gauzy-rg \
  --name gauzy-db \
  --rule-name AllowAKS \
  --start-ip-address 10.0.0.0 \
  --end-ip-address 10.0.255.255
```

## Azure Blob Storage

```bash
# Create storage account
az storage account create \
  --name gauzystorage \
  --resource-group gauzy-rg \
  --location eastus \
  --sku Standard_LRS

# Create container for uploads
az storage container create \
  --name uploads \
  --account-name gauzystorage
```

### Environment Variables

```bash
# Database (Azure PostgreSQL)
DB_TYPE=postgres
DB_HOST=gauzy-db.postgres.database.azure.com
DB_PORT=5432
DB_NAME=gauzy
DB_USER=gauzy_admin
DB_PASS=your-secure-password
DB_SSL_MODE=true

# File Storage (Azure Blob — S3-compatible via Azurite or use wasabi/S3 adapter)
FILE_PROVIDER=S3
AWS_ACCESS_KEY_ID=your-storage-key
AWS_SECRET_ACCESS_KEY=your-storage-secret
AWS_S3_BUCKET=uploads
AWS_S3_ENDPOINT=https://gauzystorage.blob.core.windows.net
```

## Azure Container Apps (Alternative)

For a simpler, serverless container deployment without managing Kubernetes:

```bash
# Create Container Apps environment
az containerapp env create \
  --name gauzy-env \
  --resource-group gauzy-rg \
  --location eastus

# Deploy API
az containerapp create \
  --name gauzy-api \
  --resource-group gauzy-rg \
  --environment gauzy-env \
  --image ghcr.io/ever-co/gauzy-api:latest \
  --target-port 3000 \
  --ingress external \
  --min-replicas 1 \
  --max-replicas 5 \
  --cpu 1.0 \
  --memory 2.0Gi

# Deploy Web App
az containerapp create \
  --name gauzy-webapp \
  --resource-group gauzy-rg \
  --environment gauzy-env \
  --image ghcr.io/ever-co/gauzy-webapp:latest \
  --target-port 4200 \
  --ingress external \
  --min-replicas 1 \
  --max-replicas 3
```

## Related Pages

- [Kubernetes](../kubernetes) — K8s manifests and Helm charts (work on AKS)
- [Deployment Overview](../deployment-overview)
- [SSL & Domains](../ssl-and-domains)
