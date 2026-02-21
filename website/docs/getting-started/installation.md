---
sidebar_position: 3
---

# Installation

Detailed installation instructions for all platforms and configurations.

## System Requirements

### Minimum Requirements

| Component      | Requirement                              |
| -------------- | ---------------------------------------- |
| **Node.js**    | LTS v22.x or v24.x                       |
| **Yarn**       | v1.22.x                                  |
| **RAM**        | 4 GB (8 GB recommended)                  |
| **Disk Space** | 2 GB for source + dependencies           |
| **OS**         | Windows 10+, macOS 10.15+, Ubuntu 20.04+ |

### Production Requirements

| Component      | Requirement              |
| -------------- | ------------------------ |
| **PostgreSQL** | v14+ (v16.x recommended) |
| **Redis**      | v6+                      |
| **Node.js**    | LTS v22.x                |
| **Docker**     | v20+ with Compose v2.20+ |

## Step-by-Step Installation

### 1. Install Node.js

Download and install the LTS version from [nodejs.org](https://nodejs.org/en/download).

Verify installation:

```bash
node --version   # Should output v22.x or later
npm --version    # Should output 10.x or later
```

:::tip
Use [nvm](https://github.com/nvm-sh/nvm) (Linux/macOS) or [nvm-windows](https://github.com/coreybutler/nvm-windows) to manage multiple Node.js versions. The repository includes an `.nvmrc` file.
:::

### 2. Install Yarn

```bash
npm install -g yarn
yarn --version   # Should output 1.22.x
```

### 3. Clone the Repository

```bash
git clone https://github.com/ever-co/ever-gauzy.git
cd ever-gauzy
```

### 4. Bootstrap the Project

```bash
yarn bootstrap
```

This command:

- Installs all NPM dependencies across the monorepo
- Links local packages via Lerna
- Bootstraps the NX workspace
- Runs any necessary postinstall scripts

:::note
First-time bootstrap takes 5–15 minutes depending on your network speed and machine. Subsequent runs are faster due to caching.
:::

### 5. Configure Environment

Copy the sample environment file:

```bash
cp .env.sample .env
```

Key settings to review:

```bash
# ORM and Database
DB_ORM=typeorm                # Options: typeorm | mikro-orm
DB_TYPE=better-sqlite3        # Options: sqlite | better-sqlite3 | postgres | mysql

# API and UI URLs
API_BASE_URL=http://localhost:3000
CLIENT_BASE_URL=http://localhost:4200

# JWT (change in production!)
JWT_SECRET=secretKey
JWT_REFRESH_TOKEN_SECRET=refreshSecretKey
```

See the [Configuration](./configuration) guide for all available options.

### 6. Set Up Git Hooks (Optional)

If you plan to contribute:

```bash
yarn prepare:husky
```

This installs Husky pre-commit hooks for code formatting and lint checks.

### 7. Start the Platform

```bash
yarn start
```

This concurrently starts:

- **API Server** at http://localhost:3000
- **Angular Web UI** at http://localhost:4200

### 8. Access the Platform

Open [http://localhost:4200](http://localhost:4200) and log in:

- **Super Admin**: `admin@ever.co` / `admin`
- **Employee**: `employee@ever.co` / `123456`

## Database Setup

### SQLite (Default — Development/Demo)

No additional setup required. SQLite is used by default with `DB_TYPE=better-sqlite3`.

The database file is created automatically at `./gauzy.sqlite3`.

### PostgreSQL (Recommended for Production)

1. **Install PostgreSQL** v14+ (v16.x recommended):
   - **macOS**: `brew install postgresql@16`
   - **Ubuntu**: `sudo apt install postgresql-16`
   - **Windows**: Download from [postgresql.org](https://www.postgresql.org/download/windows/)

2. **Create database and user:**

```sql
CREATE USER gauzy WITH PASSWORD 'gauzy_password';
CREATE DATABASE gauzy OWNER gauzy;
GRANT ALL PRIVILEGES ON DATABASE gauzy TO gauzy;
```

3. **Update `.env`:**

```bash
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=gauzy
DB_USER=gauzy
DB_PASS=gauzy_password
```

### MySQL (Alternative)

1. **Install MySQL** v8.0+

2. **Create database:**

```sql
CREATE DATABASE gauzy CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'gauzy'@'localhost' IDENTIFIED BY 'gauzy_password';
GRANT ALL PRIVILEGES ON gauzy.* TO 'gauzy'@'localhost';
FLUSH PRIVILEGES;
```

3. **Update `.env`:**

```bash
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_NAME=gauzy
DB_USER=gauzy
DB_PASS=gauzy_password
```

## Optional Services

### Redis

Redis is recommended for production caching. Without it, Gauzy uses in-memory caching.

```bash
# Install
# macOS: brew install redis
# Ubuntu: sudo apt install redis-server

# Update .env
REDIS_ENABLED=true
REDIS_URL=redis://localhost:6379
```

### OpenSearch

OpenSearch provides full-text search capabilities. Without it, Gauzy uses database-level search.

See the [Docker Compose](../deployment/docker-compose) guide for the easiest OpenSearch setup.

### MinIO (S3-Compatible Storage)

For production file storage. Without it, files are stored on the local filesystem.

```bash
FILE_PROVIDER=S3
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=gauzy
```

### Email (SMTP)

Configure SMTP for email features (invitations, password reset, etc.):

```bash
MAIL_FROM_ADDRESS=gauzy@your-domain.com
MAIL_HOST=smtp.gmail.com
MAIL_PORT=465
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
```

## Platform-Specific Notes

### Windows

- Use PowerShell or Windows Terminal (not cmd.exe)
- If you encounter `EPERM` or symlink errors, enable Developer Mode in Windows Settings
- Some native modules may require [Visual Studio Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/)

### macOS

- Xcode Command Line Tools are required: `xcode-select --install`
- On Apple Silicon (M1/M2/M3), all dependencies should work natively

### Linux

- Build essentials are required: `sudo apt install build-essential`
- Python 3 may be needed for some native modules: `sudo apt install python3`

## Useful Commands

| Command              | Description                             |
| -------------------- | --------------------------------------- |
| `yarn start`         | Start API + UI                          |
| `yarn start:api`     | Start API only                          |
| `yarn start:ui`      | Start UI only                           |
| `yarn seed`          | Seed database with initial data         |
| `yarn seed:all`      | Seed with extensive demo data (~10 min) |
| `yarn build`         | Build all projects                      |
| `yarn test`          | Run tests                               |
| `yarn lint`          | Run linter                              |
| `yarn bootstrap`     | Install deps & bootstrap workspace      |
| `yarn prepare:husky` | Set up Git hooks                        |

## Next Steps

- **[Configuration](./configuration)** — detailed environment variable reference
- **[Demo & Testing](./demo-and-testing)** — explore the demo environment
- **[Docker Setup](../deployment/docker-setup)** — containerized deployment
