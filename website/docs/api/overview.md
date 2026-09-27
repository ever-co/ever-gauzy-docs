---
sidebar_position: 1
---

# API Overview

The Ever Gauzy API is a RESTful HTTP API built with NestJS. It provides comprehensive endpoints for all platform features, with auto-generated OpenAPI (Swagger) documentation.

## Base URL

| Environment           | API Base URL                    | Swagger UI                      | API Docs                        |
| --------------------- | ------------------------------- | ------------------------------- | ------------------------------- |
| **Local Development** | `http://localhost:3000/api`     | `http://localhost:3000/swg`     | `http://localhost:3000/docs`    |
| **Demo**              | `https://apidemo.gauzy.co/api`  | `https://apidemo.gauzy.co/swg`  | `https://apidemo.gauzy.co/docs` |
| **Staging**           | `https://apistage.gauzy.co/api` | `https://apistage.gauzy.co/swg` | —                               |
| **Production**        | `https://api.gauzy.co/api`      | `https://api.gauzy.co/swg`      | `https://api.gauzy.co/docs`     |

All endpoints are prefixed with `/api/`.

## Authentication

Most API endpoints require a valid JWT token. Obtain one via the login endpoint:

```bash
# Login
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@ever.co",
  "password": "admin"
}
```

Response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "...",
    "email": "admin@ever.co",
    "tenantId": "...",
    "role": { "name": "SUPER_ADMIN" }
  }
}
```

Use the token in subsequent requests:

```bash
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

### Public Endpoints

Endpoints decorated with `@Public()` bypass authentication:

| Endpoint                        | Method | Purpose                  |
| ------------------------------- | ------ | ------------------------ |
| `/api/auth/login`               | POST   | User login               |
| `/api/auth/register`            | POST   | Public user registration |
| `/api/auth/reset-password`      | POST   | Password reset           |
| `/api/auth/request-password`    | POST   | Password reset request   |
| `/api/auth/{provider}/callback` | GET    | Social OAuth callbacks   |
| `/api/health`                   | GET    | Health check             |

## Request Format

### Content Type

All request and response bodies use JSON:

```
Content-Type: application/json
Accept: application/json
```

### Request Headers

| Header            | Required             | Description                                 |
| ----------------- | -------------------- | ------------------------------------------- |
| `Authorization`   | Yes (most endpoints) | `Bearer {jwt_token}`                        |
| `Content-Type`    | Yes (POST/PUT/PATCH) | `application/json`                          |
| `Tenant-Id`       | Optional             | Override tenant for cross-tenant operations |
| `Organization-Id` | Optional             | Specify organization context                |
| `Language`        | Optional             | Preferred language for i18n responses       |

## Response Format

### Success Responses

```json
// Single entity
{
  "id": "uuid",
  "name": "Example",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}

// Paginated collection
{
  "items": [...],
  "total": 100
}
```

### Error Responses

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request"
}
```

## HTTP Status Codes

| Code  | Description           | When Used                       |
| ----- | --------------------- | ------------------------------- |
| `200` | OK                    | Successful GET, PUT, PATCH      |
| `201` | Created               | Successful POST                 |
| `204` | No Content            | Successful DELETE               |
| `400` | Bad Request           | Validation error, invalid input |
| `401` | Unauthorized          | Missing or invalid JWT token    |
| `403` | Forbidden             | Insufficient permissions        |
| `404` | Not Found             | Resource not found              |
| `409` | Conflict              | Duplicate resource              |
| `429` | Too Many Requests     | Rate limit exceeded             |
| `500` | Internal Server Error | Unexpected server error         |

## API Modules

The API is organized into the following endpoint groups:

### Core

| Module                                       | Base Path           | Description                    |
| -------------------------------------------- | ------------------- | ------------------------------ |
| [Authentication](/api/authentication-endpoints) | `/api/auth`         | Login, register, OAuth, tokens |
| [User](/api/employee-endpoints)                 | `/api/user`         | User profile and settings      |
| [Employee](/api/employee-endpoints)             | `/api/employee`     | Employee management            |
| [Organization](/api/organization-endpoints)     | `/api/organization` | Organization CRUD              |

### HRM

| Module                                     | Base Path               | Description                       |
| ------------------------------------------ | ----------------------- | --------------------------------- |
| [Time Tracking](/api/time-tracking-endpoints) | `/api/timesheet`        | Time logs, timesheets, activities |
| [Time Off](/api/employee-endpoints)           | `/api/time-off-request` | Leave requests                    |
| [Employee Awards](/api/employee-endpoints)    | `/api/employee-award`   | Employee awards                   |
| [Employee Levels](/api/employee-endpoints)    | `/api/employee-level`   | Employee levels                   |

### ERP

| Module                          | Base Path       | Description        |
| ------------------------------- | --------------- | ------------------ |
| [Invoices](/api/invoice-endpoints) | `/api/invoices` | Invoice management |
| [Expenses](/api/expense-endpoints) | `/api/expense`  | Expense tracking   |
| [Payments](/api/invoice-endpoints) | `/api/payment`  | Payment records    |
| [Income](/api/expense-endpoints)   | `/api/income`   | Income tracking    |

### PM

| Module                          | Base Path                    | Description        |
| ------------------------------- | ---------------------------- | ------------------ |
| [Tasks](/api/task-endpoints)       | `/api/tasks`                 | Task management    |
| [Projects](/api/project-endpoints) | `/api/organization-projects` | Project management |
| [Sprints](/api/project-endpoints)  | `/api/organization-sprint`   | Sprint management  |
| [Goals](/api/task-endpoints)       | `/api/goals`                 | Goals and KPIs     |

### CRM

| Module                             | Base Path                   | Description        |
| ---------------------------------- | --------------------------- | ------------------ |
| [Contacts](/api/candidate-endpoints)  | `/api/organization-contact` | Contact management |
| [Pipelines](/api/candidate-endpoints) | `/api/pipelines`            | Sales pipelines    |
| [Deals](/api/candidate-endpoints)     | `/api/deals`                | Deal management    |

### ATS

| Module                              | Base Path                  | Description                |
| ----------------------------------- | -------------------------- | -------------------------- |
| [Candidates](/api/candidate-endpoints) | `/api/candidate`           | Candidate management       |
| [Interviews](/api/candidate-endpoints) | `/api/candidate-interview` | Interview scheduling       |
| [Invite](/api/candidate-endpoints)     | `/api/invite`              | User/candidate invitations |

### Integrations

| Module                                  | Base Path                  | Description            |
| --------------------------------------- | -------------------------- | ---------------------- |
| [Integrations](/api/integration-endpoints) | `/api/integration`         | Integration management |
| [GitHub](/api/integration-endpoints)       | `/api/integration/github`  | GitHub integration     |
| [Upwork](/api/integration-endpoints)       | `/api/integrations/upwork` | Upwork integration     |

## Rate Limiting

The API enforces rate limiting to prevent abuse:

```bash
# Default configuration
THROTTLE_ENABLED=true
THROTTLE_TTL=60000      # 1 minute window
THROTTLE_LIMIT=60000    # Max requests per window
```

When rate limited, the API returns `429 Too Many Requests`.

## CORS

Cross-Origin Resource Sharing is configured to allow:

- Localhost ports (development)
- Production domains (`*.gauzy.co`, `*.ever.co`)
- Custom domains via CORS configuration

## Swagger / OpenAPI

The interactive Swagger UI at `/swg` allows you to:

1. Browse all available endpoints
2. View request/response schemas
3. Try endpoints directly (with authentication)
4. Download the OpenAPI spec as JSON (`/swg-json`)

### Importing into API Tools

- **Postman**: Import from `http://localhost:3000/swg-json`
- **Insomnia**: Import OpenAPI spec from Swagger JSON
- **VS Code REST Client**: Use Swagger-generated examples

## Related Pages

- [REST API](/api/rest-api) — detailed REST conventions
- [GraphQL API](/api/graphql-api) — GraphQL endpoint
- [Pagination & Filtering](/api/pagination-and-filtering) — query patterns
- [Error Handling](/api/error-handling) — error response details
- [Authentication Endpoints](/api/authentication-endpoints) — login and auth flows
