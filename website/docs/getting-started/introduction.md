---
sidebar_position: 1
---

# Introduction

[Ever® Gauzy™](https://gauzy.co) is an **Open-Source Business Management Platform** designed for Collaborative, On-Demand, and Sharing Economies. It unifies multiple enterprise-grade modules into a single, cohesive platform:

- **Enterprise Resource Planning** (ERP) — invoicing, expenses, payments, inventory
- **Customer Relationship Management** (CRM) — contacts, leads, sales pipelines, deals
- **Human Resource Management** (HRM) — employee management, onboarding, awards
- **Applicant Tracking System** (ATS) — candidates, interviews, hiring workflows
- **Work & Project Management** (PM) — projects, tasks, sprints, goals, KPIs
- **Time Tracking & Productivity** — time logs, timesheets, activity monitoring, screenshots

## Why "Gauzy"?

The name "Gauzy" comes from the concept of **transparency**. The platform was originally created to enable fair and transparent profit sharing between an IT agency and its employees. Over time, it evolved into a comprehensive business management solution.

**Core values:**

- **Transparency** — share business metrics, compensation, and time tracking with stakeholders
- **Fairness** — fair employee compensation through profit-based and revenue-based bonus calculations
- **Open Source** — fully open-source with community and enterprise editions

## Key Highlights

| Feature                   | Description                                                               |
| ------------------------- | ------------------------------------------------------------------------- |
| **Full-Stack TypeScript** | Node.js/NestJS backend, Angular frontend                                  |
| **Multi-ORM Support**     | TypeORM, MikroORM, and Knex for maximum database flexibility              |
| **Multi-Database**        | SQLite (dev/demo), PostgreSQL, MySQL, MariaDB, and more                   |
| **Multi-Tenant**          | Built-in tenant isolation with automatic scoping                          |
| **Desktop Apps**          | Electron-based Desktop App, Timer, and Server for Windows/macOS/Linux     |
| **Cloud Native**          | Docker, Kubernetes, Terraform, and Pulumi support                         |
| **Plugin Architecture**   | Extensible with modular plugins for integrations and custom functionality |
| **MCP Server**            | AI-powered interactions via Model Context Protocol with 323+ tools        |
| **Headless APIs**         | REST (OpenAPI/Swagger) and GraphQL APIs for headless operation            |
| **Multi-Language**        | i18n support with Crowdin integration for 10+ languages                   |
| **Theming**               | Dark, Light, Corporate, Material, and custom themes                       |

## Platform Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     Ever Gauzy Platform                         │
├──────────────────────┬──────────────────────────────────────────┤
│   Angular Frontend   │              Desktop Apps                │
│   (Web UI on :4200)  │  (Electron: Desktop, Timer, Server)     │
├──────────────────────┴──────────────────────────────────────────┤
│                    NestJS API Server (:3000)                     │
│  ┌──────────┬───────────┬──────────┬───────────┬──────────────┐ │
│  │   Auth   │  Modules  │ Plugins  │  GraphQL  │  REST API    │ │
│  │  Guards  │  (Core)   │ System   │ Endpoint  │  Swagger     │ │
│  └──────────┴───────────┴──────────┴───────────┴──────────────┘ │
├──────────────────────────────────────────────────────────────────┤
│              ORM Layer (TypeORM / MikroORM / Knex)               │
├──────────────────────────────────────────────────────────────────┤
│    SQLite (dev)  │  PostgreSQL (prod)  │  MySQL  │  Others      │
└──────────────────┴─────────────────────┴─────────┴──────────────┘
```

## Use Cases

### Who Should Use Gauzy?

- **IT Service Companies / Agencies** — track employee time, calculate profit-based bonuses, manage client billing
- **Small to Medium Businesses** — all-in-one ERP/CRM/HRM for daily operations
- **Freelancers & Contractors** — time tracking, invoicing, and client management
- **Remote Teams** — activity monitoring, desktop timer, and team collaboration
- **Startups** — project management, recruitment (ATS), and goal tracking
- **Open Source Projects** — free hosting and licensing for qualifying non-profit/open-source projects

### Industries

- Software Development & IT Services
- Consulting & Professional Services
- Marketing & Creative Agencies
- Education & Non-Profits
- Any business requiring time tracking, HR, and financial management

## Ecosystem

Ever® Gauzy™ is part of the larger [Ever® Platform](https://ever.co) ecosystem:

| Product                                                     | Description                                                                                |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| **[Ever® Gauzy™](https://gauzy.co)**                        | Business Management Platform (this project)                                                |
| **[Ever® Teams™](https://github.com/ever-co/ever-teams)**   | Work & Project Management — React/Next.js + React Native frontend connecting to Gauzy APIs |
| **[Ever® Demand™](https://github.com/ever-co/ever-demand)** | On-Demand & Delivery Platform                                                              |

## Links

- **Website**: https://gauzy.co
- **SaaS**: https://app.gauzy.co (Alpha)
- **Demo**: https://demo.gauzy.co
- **Downloads**: https://gauzy.co/downloads
- **API Docs**: https://api.gauzy.co/docs
- **Swagger**: https://api.gauzy.co/swg
- **GitHub**: https://github.com/ever-co/ever-gauzy
- **Wiki**: https://github.com/ever-co/ever-gauzy/wiki
- **Discord**: https://discord.gg/hKQfn4j
- **Slack**: https://join.slack.com/t/gauzy/shared_invite/enQtNzc5MTA5MDUwODg2LTI0MGEwYTlmNWFlNzQzMzBlOWExNTk0NzAyY2IwYWYwMzZjMTliYjMwNDI3NTJmYmM4MDQ4NDliMDNiNDY1NWU

## Next Steps

- **[Quick Start](./quick-start)** — get Gauzy running in minutes with Docker or manually
- **[Installation](./installation)** — detailed installation guide for all platforms
- **[Configuration](./configuration)** — configure environment variables, database, and services
- **[Architecture Overview](../architecture/overview)** — understand how Gauzy is built
