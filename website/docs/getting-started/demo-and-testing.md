---
sidebar_position: 5
---

# Demo & Testing

Explore the Ever Gauzy Platform through our demo environment or set up your own testing instance.

## Online Demo

The official Ever Gauzy demo is available at **[demo.gauzy.co](https://demo.gauzy.co)**.

### Demo Credentials

| Role            | Email              | Password | Capabilities                          |
| --------------- | ------------------ | -------- | ------------------------------------- |
| **Super Admin** | `admin@ever.co`    | `admin`  | Full system access, all organizations |
| **Employee**    | `employee@ever.co` | `123456` | Employee view, time tracking, tasks   |

### Demo Notes

- Demo database **resets daily** with each deployment from the `develop` branch
- Demo runs the latest development features (may include experimental functionality)
- Data you enter will be lost on the next deployment cycle
- The demo is intended for exploration only — not for production testing

## SaaS Platform

The production SaaS environment is available at **[app.gauzy.co](https://app.gauzy.co)**.

:::warning
The SaaS platform is currently in **Alpha** stage. Use it cautiously and expect potential data resets during the alpha period.
:::

## Staging Environment

The staging environment is used for pre-release testing:

| Service         | URL                       |
| --------------- | ------------------------- |
| **Staging UI**  | https://stage.gauzy.co    |
| **Staging API** | https://apistage.gauzy.co |

- Built from the `stage` branch via CI/CD
- Used to validate releases before production deployment
- Desktop app pre-releases can be configured to connect to the Stage API

## Setting Up a Local Test Environment

### Quick Demo with Docker

```bash
git clone https://github.com/ever-co/ever-gauzy.git
cd ever-gauzy
docker-compose -f docker-compose.demo.yml up
```

Open [http://localhost:4200](http://localhost:4200) and log in with demo credentials.

### Full Test Environment

For a more complete testing setup with PostgreSQL and all infrastructure:

```bash
# Start infrastructure services
docker-compose -f docker-compose.infra.yml up -d

# Start API and UI
yarn start
```

### Database Seeding

#### Initial Seed (Automatic)

On first API start with an empty database, initial seed data is created automatically, including:

- Default Super Admin user (`admin@ever.co`)
- Default Employee user (`employee@ever.co`)
- Sample organization with basic configuration
- Default roles and permissions
- Feature flag settings

#### Manual Seed

Re-seed the database at any time:

```bash
# Standard seed (basic data)
yarn seed

# Full demo seed (extensive fake data — ~10 minutes)
yarn seed:all
```

:::warning
`yarn seed` and `yarn seed:all` will reset your database. Unsafe for production!
:::

### Seed Data Contents

The full seed (`yarn seed:all`) generates:

| Category          | Data Generated                                     |
| ----------------- | -------------------------------------------------- |
| **Users**         | Admin, employees, candidates with various roles    |
| **Organizations** | Multiple organizations with departments and teams  |
| **Employees**     | Employee profiles with skills, rates, and settings |
| **Projects**      | Sample projects with tasks and milestones          |
| **Time Tracking** | Time logs, timesheets, and activity data           |
| **Financial**     | Invoices, expenses, payments, income records       |
| **CRM**           | Contacts, leads, deals, and pipeline stages        |
| **HR**            | Time-off policies, equipment, and employee awards  |

## Testing the API

### Swagger UI

Access the interactive API documentation at:

- **Local**: http://localhost:3000/swg
- **Demo**: https://apidemo.gauzy.co/swg
- **Production**: https://api.gauzy.co/swg

### API Documentation

Full API documentation (Compodoc-generated) is available at:

- **Demo**: https://apidemo.gauzy.co/docs
- **Production**: https://api.gauzy.co/docs

### Testing with cURL

```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@ever.co", "password": "admin"}'

# Use the returned token for subsequent requests
curl http://localhost:3000/api/user/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Testing with Postman

1. Import the Swagger spec from `http://localhost:3000/swg-json`
2. Set up an environment variable for `baseUrl` = `http://localhost:3000`
3. Use the Login endpoint to obtain a JWT token
4. Add the token to the Authorization header for all requests

## E2E Testing

The `apps/gauzy-e2e` project contains end-to-end tests:

```bash
# Run E2E tests
yarn e2e
```

## Desktop Application Testing

### Server App

1. Download from [gauzy.co/downloads](https://gauzy.co/downloads) or build locally
2. Run Setup Wizard → select SQLite for quick testing
3. Server starts API on `http://127.0.0.1:3000` and serves UI on `http://localhost:4200`

### Desktop App

1. Download and install
2. Can run independently (embedded API + SQLite) or connect to external Gauzy Server
3. Includes full UI + Timer functionality

### Desktop Timer

1. Download and install
2. Must connect to Gauzy Server API (`http://127.0.0.1:3000/api`)
3. Log in as an employee user for time tracking features

## Useful Links

| Resource            | URL                                            |
| ------------------- | ---------------------------------------------- |
| **Demo**            | https://demo.gauzy.co                          |
| **SaaS**            | https://app.gauzy.co                           |
| **Staging**         | https://stage.gauzy.co                         |
| **API Docs**        | https://api.gauzy.co/docs                      |
| **Swagger**         | https://api.gauzy.co/swg                       |
| **Downloads**       | https://gauzy.co/downloads                     |
| **GitHub Releases** | https://github.com/ever-co/ever-gauzy/releases |
