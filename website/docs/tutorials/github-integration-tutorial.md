---
sidebar_position: 11
---

# Tutorial: GitHub Integration Setup

Connect your GitHub repositories with Gauzy for issue and commit tracking.

## Step 1: Create GitHub App

1. Go to **GitHub** → **Settings** → **Developer settings** → **GitHub Apps**
2. Click **New GitHub App**
3. Configure:
   - **Name**: `Gauzy Integration`
   - **Homepage URL**: Your Gauzy URL
   - **Callback URL**: `{API_BASE_URL}/api/integration/github/callback`
   - **Webhook URL**: `{API_BASE_URL}/api/integration/github/webhook`
4. Permissions:
   - Issues: Read & Write
   - Pull requests: Read
   - Contents: Read
   - Metadata: Read
5. Click **Create GitHub App**
6. Generate a private key

## Step 2: Configure Gauzy

Add to your `.env`:

```env
GAUZY_GITHUB_CLIENT_ID=your-app-client-id
GAUZY_GITHUB_CLIENT_SECRET=your-secret
GAUZY_GITHUB_WEBHOOK_SECRET=your-webhook-secret
GAUZY_GITHUB_APP_ID=12345
GAUZY_GITHUB_APP_NAME=gauzy-integration
GAUZY_GITHUB_APP_PRIVATE_KEY=base64-encoded-key
GAUZY_GITHUB_CALLBACK_URL=http://localhost:3000/api/integration/github/callback
```

## Step 3: Install on Repository

1. In Gauzy, go to **Integrations** → **GitHub**
2. Click **Connect**
3. Authorize the GitHub App
4. Select repositories to sync
5. Click **Install**

## Step 4: Map Projects

1. After connecting, go to **Integrations** → **GitHub** → **Settings**
2. Map GitHub repositories to Gauzy projects
3. Configure sync options:
   - Sync issues → tasks
   - Sync commits → activity
   - Sync labels → tags

## Step 5: Verify

- Create an issue in GitHub → appears as a task in Gauzy
- Commit with issue reference → linked in activity

## Related Pages

- [GitHub Integration](../integrations/github-integration) — feature guide
- [Integration Endpoints](../api/integration-endpoints) — API
- [Custom Integrations](../integrations/custom-integrations) — build your own
