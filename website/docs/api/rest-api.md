---
sidebar_position: 2
---

# REST API

The Ever Gauzy REST API follows standard HTTP conventions with OpenAPI 3.0 (Swagger) documentation auto-generated from NestJS decorators.

## Conventions

### URL Structure

```
{base_url}/api/{resource}
{base_url}/api/{resource}/{id}
{base_url}/api/{resource}/{id}/{sub-resource}
```

### HTTP Methods

| Method   | Purpose          | Idempotent | Request Body |
| -------- | ---------------- | ---------- | ------------ |
| `GET`    | Read resource(s) | ✅         | No           |
| `POST`   | Create resource  | ❌         | Yes          |
| `PUT`    | Full update      | ✅         | Yes          |
| `PATCH`  | Partial update   | ✅         | Yes          |
| `DELETE` | Remove resource  | ✅         | No           |

### Resource Naming

- Resources use **kebab-case**: `/api/time-off-request`, `/api/organization-project`
- Resource names are **nouns**, not verbs: `/api/employees` not `/api/getEmployees`
- Sub-resources express relationships: `/api/employee/{id}/statistics`

## CRUD Operations

### Create (POST)

```bash
POST /api/employee
Authorization: Bearer {token}
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "startedWorkOn": "2024-01-01",
  "userId": "user-uuid",
  "organizationId": "org-uuid"
}
```

Response: `201 Created`

```json
{
  "id": "employee-uuid",
  "firstName": "John",
  "lastName": "Doe",
  "startedWorkOn": "2024-01-01T00:00:00.000Z",
  "tenantId": "tenant-uuid",
  "organizationId": "org-uuid",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Read One (GET)

```bash
GET /api/employee/{id}
Authorization: Bearer {token}
```

Response: `200 OK`

```json
{
  "id": "employee-uuid",
  "firstName": "John",
  "lastName": "Doe"
}
```

### Read Many (GET)

```bash
GET /api/employee?take=10&skip=0&order[createdAt]=DESC
Authorization: Bearer {token}
```

Response: `200 OK`

```json
{
  "items": [
    { "id": "...", "firstName": "John", "lastName": "Doe" },
    { "id": "...", "firstName": "Jane", "lastName": "Smith" }
  ],
  "total": 42
}
```

### Update (PUT/PATCH)

```bash
PUT /api/employee/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Updated"
}
```

Response: `200 OK`

### Delete (DELETE)

```bash
DELETE /api/employee/{id}
Authorization: Bearer {token}
```

Response: `200 OK` or `204 No Content`

## Query Parameters

### Pagination

| Parameter | Type   | Default | Description                 |
| --------- | ------ | ------- | --------------------------- |
| `take`    | number | 10      | Number of records to return |
| `skip`    | number | 0       | Number of records to skip   |

### Ordering

```
GET /api/employee?order[createdAt]=DESC&order[firstName]=ASC
```

### Relations

Load related entities:

```
GET /api/employee?relations[]=user&relations[]=organization
```

### Filtering

```
GET /api/employee?where[isActive]=true&where[organizationId]=org-uuid
```

## DTO Validation

Request bodies are validated against **Data Transfer Object** (DTO) classes using `class-validator`:

```typescript
export class CreateEmployeeDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  startedWorkOn?: string;

  @ApiProperty()
  @IsUUID()
  userId: string;
}
```

If validation fails, the API returns `400 Bad Request` with details:

```json
{
  "statusCode": 400,
  "message": ["firstName must be a string", "firstName should not be empty"],
  "error": "Bad Request"
}
```

## Swagger Documentation

### Accessing Swagger

Navigate to `http://localhost:3000/swg` for the interactive Swagger UI.

### Swagger JSON

Download the OpenAPI specification:

```bash
curl http://localhost:3000/swg-json > openapi.json
```

### Decorators Used

The API uses NestJS Swagger decorators to generate documentation:

```typescript
@ApiTags('Employee')
@ApiOperation({ summary: 'Create a new employee' })
@ApiResponse({ status: 201, description: 'Employee created', type: Employee })
@ApiResponse({ status: 400, description: 'Validation error' })
@ApiBearerAuth()
```

## Related Pages

- [API Overview](./overview) — getting started with the API
- [GraphQL API](./graphql-api) — GraphQL alternative
- [Pagination & Filtering](./pagination-and-filtering) — detailed query patterns
- [Error Handling](./error-handling) — error response details
