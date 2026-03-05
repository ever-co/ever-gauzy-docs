---
sidebar_position: 1
---

# Tutorial: Getting Started Step by Step

A comprehensive walkthrough to set up Ever Gauzy from scratch.

## Prerequisites

- Node.js 20+
- Yarn 1.x (Classic)
- PostgreSQL 14+ (or SQLite for quick start)
- Git

## Step 1: Clone the Repository

```bash
git clone https://github.com/ever-co/ever-gauzy.git
cd ever-gauzy
```

## Step 2: Install Dependencies

```bash
yarn install
```

This installs all dependencies for the entire monorepo (API, webapp, desktop apps, and all packages).

## Step 3: Configure Environment

Copy the sample environment file:

```bash
cp .env.sample .env
```

Edit `.env` with your settings:

```env
# Database (SQLite for quick start)
DB_TYPE=sqlite
DB_NAME=gauzy.sqlite3

# JWT Secrets (generate unique values)
JWT_SECRET=change-this-to-a-random-string
JWT_REFRESH_SECRET=change-this-too

# Server URLs
API_BASE_URL=http://localhost:3000
CLIENT_BASE_URL=http://localhost:4200
```

## Step 4: Start the API Server

```bash
yarn start:api
```

Wait for the message: `Listening at http://localhost:3000`

The first startup will:

- Create the database schema
- Run seed data (demo organization, admin user)
- Start the REST and GraphQL APIs

## Step 5: Start the Web App

In a new terminal:

```bash
yarn start
```

Open [http://localhost:4200](http://localhost:4200) in your browser.

## Step 6: Log In

Use the default admin credentials:

| Field    | Value           |
| -------- | --------------- |
| Email    | `admin@ever.co` |
| Password | `admin`         |

## Step 7: Explore

After login, you'll see the dashboard. Explore:

1. **Dashboard** — overview widgets
2. **Tasks** — task management
3. **Time Tracking** — start tracking time
4. **Employees** — manage team members
5. **Projects** — create projects
6. **Settings** — configure your organization

## Next Steps

- [Setting Up Your First Organization](./first-organization-tutorial)
- [Creating Your First Project](./first-project-tutorial)
- [Time Tracking Quickstart](./time-tracking-quickstart)

## Related Pages

- [Development Guide](../development/development-guide) — advanced setup
- [Environment Variables](../devops/environment-variables) — all config options
- [Production Deployment](../devops/production-deployment) — production setup
