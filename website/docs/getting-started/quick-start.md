---
sidebar_position: 2
---

# Quick Start

Get Ever Gauzy running in minutes. Choose your preferred method below.

## Option 1: Docker Compose (Recommended for Demos)

The fastest way to try Gauzy is using Docker Compose with our pre-built images.

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop) or Docker Engine with [Docker Compose](https://docs.docker.com/compose/install/) v2.20+

### Steps

1. **Clone the repository:**

```bash
git clone https://github.com/ever-co/ever-gauzy.git
cd ever-gauzy
```

2. **Start the demo environment:**

```bash
docker-compose -f docker-compose.demo.yml up
```

This starts the minimal configuration: **API server**, **Web UI**, and **SQLite database**.

3. **Open in your browser:**

Navigate to [http://localhost:4200](http://localhost:4200)

4. **Log in:**

| User            | Email              | Password |
| --------------- | ------------------ | -------- |
| **Super Admin** | `admin@ever.co`    | `admin`  |
| **Employee**    | `employee@ever.co` | `123456` |

:::tip
The demo Docker Compose uses pre-built images from the `master` branch. No local build required!
:::

### Docker Compose Variants

| File                       | Purpose                  | Infrastructure                             |
| -------------------------- | ------------------------ | ------------------------------------------ |
| `docker-compose.demo.yml`  | Quick demo/exploration   | API + Web UI + SQLite                      |
| `docker-compose.yml`       | Minimal production       | API + Web UI + PostgreSQL + full infra     |
| `docker-compose.build.yml` | Build everything locally | Full platform build (slow!)                |
| `docker-compose.infra.yml` | Infrastructure only      | PostgreSQL, Redis, OpenSearch, MinIO, etc. |

### Full Infrastructure Stack

The production and build Docker Compose files include:

- **[PostgreSQL](https://www.postgresql.org)** — Primary database
- **[Pgweb](https://github.com/sosedoff/pgweb)** — PostgreSQL web client (http://localhost:8081)
- **[OpenSearch](https://opensearch.org)** — Search engine
- **[OpenSearch Dashboards](https://opensearch.org)** — Search visualization (http://localhost:5601)
- **[Dejavu](https://github.com/appbaseio/dejavu)** — OpenSearch web UI (http://localhost:1358)
- **[MinIO](https://min.io)** — S3-compatible object storage
- **[Jitsu](https://jitsu.com)** — Data ingestion engine
- **[Redis](https://redis.io)** — In-memory caching
- **[Cube](https://cube.dev)** — Analytics/BI semantic layer (http://localhost:4000)
- **[Zipkin](https://zipkin.io)** — Distributed tracing

## Option 2: Manual Setup (Development)

For active development and full control over the environment.

### Prerequisites

- **[Node.js](https://nodejs.org)** — LTS version (v22.x or v24.x recommended)
- **[Yarn](https://yarnpkg.com)** — v1.22.x (`npm i -g yarn`)

### Steps

1. **Clone the repository:**

```bash
git clone https://github.com/ever-co/ever-gauzy.git
cd ever-gauzy
```

2. **Install dependencies and bootstrap:**

```bash
yarn bootstrap
```

:::note
This installs all NPM packages across the monorepo and bootstraps the Lerna/Nx workspace. It may take several minutes on first run.
:::

3. **Configure environment (optional):**

Copy and edit the sample environment file:

```bash
cp .env.sample .env
```

The defaults work for local development with SQLite. See the [Configuration](./configuration) guide for customization.

4. **Start API and UI:**

```bash
yarn start
```

This starts both the API server and Angular UI concurrently:

- **API**: http://localhost:3000/api
- **Swagger**: http://localhost:3000/swg
- **Web UI**: http://localhost:4200

5. **Log in:**

| User            | Email              | Password |
| --------------- | ------------------ | -------- |
| **Super Admin** | `admin@ever.co`    | `admin`  |
| **Employee**    | `employee@ever.co` | `123456` |

:::info
On first start, the database is automatically seeded with initial data (users, sample organizations, etc.). You can re-seed at any time with `yarn seed` or generate extensive fake data with `yarn seed:all`.
:::

## Option 3: Desktop Applications

Download pre-built desktop applications for your operating system.

### Available Applications

| Application                    | Description                                                                          |
| ------------------------------ | ------------------------------------------------------------------------------------ |
| **Ever® Gauzy™ Server**        | API server + SQLite/PostgreSQL, serves Web UI. Best for small-medium orgs.           |
| **Ever® Gauzy™ Desktop App**   | All-in-one: UI + API + SQLite + Timer. Best for personal use or client-server setup. |
| **Ever® Gauzy™ Desktop Timer** | Time & activity tracking with screenshots. Best for employees/contractors.           |

### Download

- **Official**: [gauzy.co/downloads](https://gauzy.co/downloads)
- **GitHub Releases**: [github.com/ever-co/ever-gauzy/releases](https://github.com/ever-co/ever-gauzy/releases)

### Setup

1. Download and install for your OS (Windows/macOS/Linux)
2. Run the Setup Wizard with default settings
3. Log in with `admin@ever.co` / `admin` (Server/Desktop App) or `employee@ever.co` / `123456` (Timer)

:::tip
If using Gauzy Server, connect Desktop apps to the API at `http://127.0.0.1:3000/api`.
:::

## What's Next?

- **[Installation Guide](./installation)** — detailed platform-specific instructions
- **[Configuration](./configuration)** — customize database, email, storage, and more
- **[Demo & Testing](./demo-and-testing)** — explore the demo environment and test features
- **[Architecture Overview](../architecture/overview)** — understand the platform internals
