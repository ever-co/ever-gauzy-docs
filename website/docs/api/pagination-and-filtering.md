---
sidebar_position: 14
---

# Pagination & Filtering

All list endpoints in the Ever Gauzy API support pagination, sorting, filtering, and relation loading through query parameters.

## Pagination

### Parameters

| Parameter | Type   | Default | Description                             |
| --------- | ------ | ------- | --------------------------------------- |
| `take`    | number | 10      | Number of records to return (page size) |
| `skip`    | number | 0       | Number of records to skip (offset)      |

### Example

```http
GET /api/employee?take=25&skip=50
Authorization: Bearer {token}
```

Returns records 51–75.

### Response Format

All paginated endpoints return:

```json
{
  "items": [...],
  "total": 150
}
```

- `items` — array of entities for the requested page
- `total` — total count of matching records (for calculating page count)

### Calculate Total Pages

```
totalPages = Math.ceil(total / take)
currentPage = Math.floor(skip / take) + 1
```

## Sorting

### Order Parameters

Use `order[field]=ASC|DESC`:

```http
GET /api/employee?order[createdAt]=DESC&order[firstName]=ASC
```

### Multiple Sort Fields

Multiple sort fields are applied in order:

```http
GET /api/tasks?order[priority]=ASC&order[dueDate]=ASC&order[title]=ASC
```

## Filtering

### Where Conditions

Use `where[field]=value` for exact matches:

```http
GET /api/employee?where[isActive]=true&where[organizationId]=org-uuid
```

### Nested Filtering

For related entity fields:

```http
GET /api/tasks?where[project][name]=Gauzy
```

### Organization & Tenant

Most endpoints automatically filter by the current tenant. You can additionally filter by organization:

```http
GET /api/employee?where[organizationId]=org-uuid
```

## Relations

### Loading Relations

Use `relations[]=name` to eager-load related entities:

```http
GET /api/employee?relations[]=user&relations[]=organization&relations[]=tags
```

### Nested Relations

```http
GET /api/employee?relations[]=user.role&relations[]=organization.contact
```

### Common Relations

| Entity        | Available Relations                              |
| ------------- | ------------------------------------------------ |
| **Employee**  | `user`, `organization`, `tags`, `skills`         |
| **Task**      | `project`, `creator`, `members`, `teams`, `tags` |
| **Time Log**  | `employee`, `project`, `task`, `timeSlots`       |
| **Invoice**   | `toContact`, `fromOrganization`, `invoiceItems`  |
| **Candidate** | `user`, `source`, `interview`, `skills`          |

## Date Range Filtering

Many endpoints support date range parameters:

```http
GET /api/timesheet/time-log?startDate=2024-01-01&endDate=2024-01-31
```

| Parameter   | Format   | Description         |
| ----------- | -------- | ------------------- |
| `startDate` | ISO 8601 | Start of date range |
| `endDate`   | ISO 8601 | End of date range   |

## Search

### Text Search

Some endpoints support full-text search:

```http
GET /api/employee?search=John
```

### Tag Filtering

Filter by tags:

```http
GET /api/tasks?tags[]=frontend&tags[]=urgent
```

## Query Builder Syntax

For complex queries, the API supports a query builder syntax via the request body on POST endpoints:

```http
POST /api/employee/search
Authorization: Bearer {token}
Content-Type: application/json

{
  "findInput": {
    "where": {
      "isActive": true,
      "organizationId": "org-uuid"
    },
    "relations": ["user", "organization"],
    "order": { "createdAt": "DESC" },
    "take": 25,
    "skip": 0
  }
}
```

## Limitations

- Maximum `take` value: **50** (configurable per endpoint)
- Maximum relation depth: **3 levels**
- Default `take` when not specified: **10**

## Best Practices

1. **Always paginate** — never request all records without `take`
2. **Load only needed relations** — reduce response payload
3. **Use server-side filtering** — filter via query params, not client-side
4. **Cache page counts** — `total` is expensive for large datasets
5. **Use date ranges** — for time-based data, always specify date boundaries
