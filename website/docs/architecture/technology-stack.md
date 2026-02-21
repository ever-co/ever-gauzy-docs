---
sidebar_position: 3
---

# Technology Stack

A complete reference of all technologies, frameworks, and tools used in the Ever Gauzy Platform.

## Core Technologies

### Languages

| Technology     | Version       | Usage                                                     |
| -------------- | ------------- | --------------------------------------------------------- |
| **TypeScript** | 5.x           | Full-stack — backend, frontend, desktop, shared contracts |
| **JavaScript** | ES2022+       | Build scripts, configuration                              |
| **SCSS/Sass**  | Module system | Stylesheets (migrated to `@use`/`@forward`)               |
| **HTML5**      | Standard      | Angular templates                                         |

### Runtime

| Technology   | Version           | Usage                          |
| ------------ | ----------------- | ------------------------------ |
| **Node.js**  | LTS v22.x / v24.x | Backend runtime, build tooling |
| **Electron** | Latest            | Desktop application runtime    |

## Backend

### Framework

| Technology                       | Role                                                   |
| -------------------------------- | ------------------------------------------------------ |
| **[NestJS](https://nestjs.com)** | Primary backend framework (modules, DI, guards, pipes) |
| **Express.js**                   | HTTP server (via NestJS adapter)                       |
| **@nestjs/cqrs**                 | Command/Query Responsibility Segregation               |
| **@nestjs/swagger**              | OpenAPI/Swagger documentation generation               |
| **@nestjs/graphql**              | GraphQL API (WIP)                                      |
| **@nestjs/schedule**             | Cron jobs and task scheduling                          |
| **@nestjs/throttler**            | Rate limiting                                          |
| **@nestjs/passport**             | Authentication strategies                              |

### ORM & Database

| Technology                           | Role                                                      |
| ------------------------------------ | --------------------------------------------------------- |
| **[TypeORM](https://typeorm.io)**    | Primary ORM — entities, repositories, migrations          |
| **[MikroORM](https://mikro-orm.io)** | Alternative ORM — stricter metadata, unit of work pattern |
| **[Knex.js](https://knexjs.org)**    | SQL query builder — raw queries, complex migrations       |
| **PostgreSQL**                       | Primary production database                               |
| **MySQL/MariaDB**                    | Supported alternative database                            |
| **SQLite / better-sqlite3**          | Development and demo database                             |

### Authentication

| Technology                   | Role                                |
| ---------------------------- | ----------------------------------- |
| **Passport.js**              | Authentication middleware           |
| **jsonwebtoken**             | JWT token generation and validation |
| **bcrypt**                   | Password hashing                    |
| **passport-jwt**             | JWT authentication strategy         |
| **passport-google-oauth20**  | Google OAuth                        |
| **passport-facebook**        | Facebook OAuth                      |
| **passport-github2**         | GitHub OAuth                        |
| **passport-twitter**         | Twitter OAuth                       |
| **passport-linkedin-oauth2** | LinkedIn OAuth                      |
| **passport-microsoft**       | Microsoft OAuth                     |

### Utilities

| Technology            | Role                                    |
| --------------------- | --------------------------------------- |
| **class-validator**   | DTO validation decorators               |
| **class-transformer** | Object transformation and serialization |
| **moment.js / luxon** | Date/time manipulation                  |
| **uuid**              | UUID generation                         |
| **nodemailer**        | Email sending                           |
| **handlebars**        | Email template rendering                |
| **multer**            | File upload handling                    |
| **sharp**             | Image processing                        |
| **csv-parser**        | CSV file parsing                        |
| **xlsx**              | Excel file handling                     |

## Frontend

### Framework

| Technology                                          | Role                                     |
| --------------------------------------------------- | ---------------------------------------- |
| **[Angular](https://angular.io)**                   | Frontend SPA framework (v19+)            |
| **[Nebular](https://akveo.github.io/nebular/)**     | UI component library (Eva Design System) |
| **[ngx-admin](https://akveo.github.io/ngx-admin/)** | Admin dashboard template                 |
| **RxJS**                                            | Reactive programming for Angular         |
| **NgRx**                                            | State management (select modules)        |
| **Angular Router**                                  | Client-side routing                      |
| **Angular Forms**                                   | Reactive and template-driven forms       |

### UI Libraries

| Technology           | Role                                            |
| -------------------- | ----------------------------------------------- |
| **Angular CDK**      | Component development kit                       |
| **ng2-smart-table**  | Data tables with sorting, filtering, pagination |
| **ngx-charts**       | Chart and data visualization                    |
| **ng2-file-upload**  | File upload components                          |
| **@ngx-translate**   | Internationalization (i18n)                     |
| **ngx-color-picker** | Color selection                                 |
| **ngx-quill**        | Rich text editor                                |
| **fullcalendar**     | Calendar component                              |
| **leaflet**          | Interactive maps                                |

### Styling

| Technology                | Role                           |
| ------------------------- | ------------------------------ |
| **SCSS**                  | Preprocessor stylesheets       |
| **Bootstrap**             | Base grid system and utilities |
| **Eva Design System**     | Design tokens via Nebular      |
| **CSS Custom Properties** | Theme variables                |

## Desktop Applications

| Technology                                 | Role                                          |
| ------------------------------------------ | --------------------------------------------- |
| **[Electron](https://www.electronjs.org)** | Desktop app shell (Main + Renderer processes) |
| **electron-builder**                       | App packaging and distribution                |
| **electron-updater**                       | Auto-update mechanism                         |
| **electron-log**                           | Desktop app logging                           |
| **screenshot-desktop**                     | Activity screenshot capture                   |
| **active-win**                             | Active window detection                       |
| **electron-store**                         | Local configuration storage                   |

## Build & Development Tools

### Monorepo Management

| Technology                        | Role                                                        |
| --------------------------------- | ----------------------------------------------------------- |
| **[NX](https://nx.dev)**          | Monorepo workspace orchestration, dependency graph, caching |
| **[Lerna](https://lerna.js.org)** | Multi-package management and publishing                     |
| **Yarn**                          | Package manager (v1.22.x Classic)                           |

### Build Tools

| Technology      | Role                                 |
| --------------- | ------------------------------------ |
| **Webpack**     | Module bundler (Angular & NestJS)    |
| **Angular CLI** | Angular build toolchain              |
| **ng-packagr**  | Angular library packaging            |
| **ts-node**     | TypeScript execution for scripts     |
| **cross-env**   | Cross-platform environment variables |

### Code Quality

| Technology      | Role                          |
| --------------- | ----------------------------- |
| **ESLint**      | JavaScript/TypeScript linting |
| **Prettier**    | Code formatting               |
| **Husky**       | Git hooks                     |
| **lint-staged** | Pre-commit lint checks        |
| **Commitlint**  | Commit message conventions    |

### Testing

| Technology    | Role                      |
| ------------- | ------------------------- |
| **Jest**      | Unit testing framework    |
| **Cypress**   | End-to-end testing        |
| **Spectator** | Angular testing utilities |
| **supertest** | HTTP API testing          |

## Infrastructure & DevOps

### Containerization

| Technology                           | Role                                    |
| ------------------------------------ | --------------------------------------- |
| **[Docker](https://www.docker.com)** | Container runtime                       |
| **Docker Compose**                   | Local multi-container orchestration     |
| **Docker Hub**                       | Image registry (ghcr.io and Docker Hub) |

### Orchestration

| Technology                              | Role                                 |
| --------------------------------------- | ------------------------------------ |
| **[Kubernetes](https://kubernetes.io)** | Container orchestration (production) |
| **Helm**                                | Kubernetes package management        |

### Infrastructure as Code

| Technology                                | Role                                |
| ----------------------------------------- | ----------------------------------- |
| **[Pulumi](https://www.pulumi.com)**      | Infrastructure as Code (TypeScript) |
| **[Terraform](https://www.terraform.io)** | Infrastructure as Code (HCL)        |

### Cloud Providers

| Provider         | Usage                                            |
| ---------------- | ------------------------------------------------ |
| **DigitalOcean** | Primary cloud (App Platform, Spaces, Kubernetes) |
| **AWS**          | S3 storage, optional deployment                  |
| **Azure**        | Optional deployment                              |
| **Heroku**       | Optional deployment                              |
| **Others**       | Linode, Vultr, OVH, Scaleway, CIVO, CoreWeave    |

### CI/CD

| Technology         | Role                                                 |
| ------------------ | ---------------------------------------------------- |
| **GitHub Actions** | Primary CI/CD (build, test, release, desktop builds) |
| **CircleCI**       | Secondary CI/CD pipeline                             |
| **NX Cloud**       | Distributed task caching                             |

## Monitoring & Analytics

| Technology                                    | Role                                            |
| --------------------------------------------- | ----------------------------------------------- |
| **[Sentry](https://sentry.io)**               | Error tracking and performance monitoring       |
| **[PostHog](https://posthog.com)**            | Product analytics                               |
| **[Jitsu](https://jitsu.com)**                | Data ingestion and event tracking               |
| **[Cube](https://cube.dev)**                  | Analytics semantic layer, BI dashboards         |
| **[OpenTelemetry](https://opentelemetry.io)** | Distributed tracing (Zipkin, Jaeger, Honeycomb) |
| **PM2 / Keymetrics**                          | Node.js process management and monitoring       |

## Search

| Technology                               | Role                               |
| ---------------------------------------- | ---------------------------------- |
| **[OpenSearch](https://opensearch.org)** | Full-text search engine            |
| **OpenSearch Dashboards**                | Search analytics and visualization |

## Feature Management

| Technology                               | Role                       |
| ---------------------------------------- | -------------------------- |
| **[Unleash](https://www.getunleash.io)** | Feature flags and toggles  |
| **Custom Feature Toggles**               | `.env`-based feature flags |

## AI & MCP

| Technology                       | Role                      |
| -------------------------------- | ------------------------- |
| **Model Context Protocol (MCP)** | AI assistant integration  |
| **OAuth 2.0 (MCP Auth)**         | MCP authentication server |
| **JWKS/RS256**                   | Token validation for MCP  |

## Communication

| Technology                               | Role                         |
| ---------------------------------------- | ---------------------------- |
| **[Chatwoot](https://www.chatwoot.com)** | Customer support chat widget |
| **Nodemailer**                           | Email sending (SMTP)         |
| **Handlebars**                           | Email templating             |
