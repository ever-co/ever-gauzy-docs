---
sidebar_position: 3
---

# Upwork Integration

Import Upwork contracts, time logs, and freelancer data into Ever Gauzy.

## Features

- **Contract import** — sync active Upwork contracts
- **Time log import** — import tracked hours from Upwork
- **Freelancer mapping** — map Upwork freelancers to Gauzy employees
- **Earnings tracking** — track Upwork earnings and expenses
- **Screenshot import** — import Upwork activity screenshots

## Setup

### 1. Create Upwork API Keys

1. Go to [Upwork Developer Portal](https://www.upwork.com/developer/keys/apply)
2. Create a new API application
3. Note the Consumer Key and Secret

### 2. Configure Environment

```bash
UPWORK_API_KEY=your-consumer-key
UPWORK_API_SECRET=your-consumer-secret
UPWORK_REDIRECT_URL=https://api.yourdomain.com/api/integration/upwork/callback
```

### 3. Authorize in Gauzy

1. Navigate to **Settings → Integrations → Upwork**
2. Click **Connect to Upwork**
3. Authorize the application
4. Select contracts to sync

## Sync Operations

| Data        | Direction | Frequency |
| ----------- | :-------: | :-------: |
| Contracts   |  Import   |  Manual   |
| Time logs   |  Import   |  Hourly   |
| Screenshots |  Import   |  Hourly   |
| Earnings    |  Import   |   Daily   |

## Data Mapping

| Upwork     | Gauzy               |
| ---------- | ------------------- |
| Contract   | Employee assignment |
| Work diary | TimeLog             |
| Screenshot | Screenshot          |
| Earnings   | Income              |

## Related Pages

- [Integrations Overview](./integrations-overview)
- [Time Tracking](../features/time-tracking)
