---
sidebar_position: 3
---

# Frequently Asked Questions

Common questions about Ever Gauzy.

## General

### What is Ever Gauzy?

Ever Gauzy is an open-source business management platform that includes time tracking, project management, invoicing, CRM, HR management, and more. It's built with NestJS (backend), Angular (frontend), and supports PostgreSQL/SQLite databases.

### Is Ever Gauzy free?

Yes! Ever Gauzy is open-source under the AGPL-3.0 license. You can self-host it for free. Commercial licenses are also available.

### What's the difference between Ever Gauzy and Ever Teams?

Ever Gauzy is the full business management platform. Ever Teams is a focused team collaboration and time tracking app built on top of the Gauzy API.

## Technical

### Which databases are supported?

- **PostgreSQL** (recommended for production)
- **SQLite** (development only)
- Multi-ORM support (TypeORM and MikroORM)

### What Node.js version is required?

Node.js 20 or later.

### Can I use Docker?

Yes! Docker images are available at `ghcr.io/ever-co/gauzy-api` and `ghcr.io/ever-co/gauzy-webapp`. See [Production Deployment](../devops/production-deployment).

### How do I upgrade?

1. Pull latest Docker images (or git pull)
2. Run database migrations: `yarn typeorm migration:run`
3. Restart services

## Features

### Can I track time offline?

Yes, the desktop app supports offline time tracking. Data syncs when connection is restored.

### How do I customize invoice templates?

Go to **Settings** → **Accounting Templates**. Use the MJML/Handlebars editor. See [Accounting Templates](../api/accounting-template-endpoints).

### Can I integrate with GitHub/Jira?

Yes! Gauzy supports integrations with GitHub, GitLab, Jira, Hubstaff, Upwork, and more. See [Integrations](../integrations/integrations-overview).

### How does multi-tenancy work?

Each tenant is a separate workspace with its own data, isolated at the database row level. See [Multi-Tenancy](../architecture/multi-tenancy).

## Deployment

### What are the minimum system requirements?

- 2GB RAM for the API server
- 1 CPU core
- 10GB disk space
- PostgreSQL 14+
- Redis 6+ (for scalable deployments)

### Can I deploy on shared hosting?

Not easily. Gauzy requires Node.js runtime, a PostgreSQL database, and ideally Redis. Use a VPS, cloud VM, or container platform.

## Related Pages

- [Getting Started](../getting-started/getting-started) — quick start guide
- [Production Deployment](../devops/production-deployment) — deployment
- [Architecture Overview](../architecture/overview) — system architecture
