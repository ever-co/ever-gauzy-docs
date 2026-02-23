---
sidebar_position: 5
---

# Employee Endpoints

API endpoints for employee management, profiles, and statistics.

## Employee CRUD

### List Employees

```http
GET /api/employee?take=10&skip=0&relations[]=user&relations[]=organization
Authorization: Bearer {token}
```

**Response (200 OK):**

```json
{
  "items": [
    {
      "id": "...",
      "firstName": "John",
      "lastName": "Doe",
      "billRateValue": 50,
      "billRateCurrency": "USD",
      "startedWorkOn": "2024-01-01T00:00:00.000Z",
      "isActive": true,
      "user": { "id": "...", "email": "john@example.com" },
      "organization": { "id": "...", "name": "Engineering" }
    }
  ],
  "total": 42
}
```

### Get Employee by ID

```http
GET /api/employee/{id}
Authorization: Bearer {token}
```

### Create Employee

```http
POST /api/employee
Authorization: Bearer {token}
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "startedWorkOn": "2024-01-01",
  "billRateValue": 50,
  "billRateCurrency": "USD",
  "userId": "user-uuid",
  "organizationId": "org-uuid"
}
```

### Update Employee

```http
PUT /api/employee/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Updated",
  "billRateValue": 60
}
```

### Delete Employee

```http
DELETE /api/employee/{id}
Authorization: Bearer {token}
```

## Employee Statistics

### Get Employee Statistics

```http
GET /api/employee/{id}/statistics
Authorization: Bearer {token}
```

**Response:** aggregated time tracking, income, and expense data for the employee.

### Get Working Statistics

```http
GET /api/employee/statistics/months
Authorization: Bearer {token}
```

Returns monthly aggregated working hours, income, and bonuses.

## Employee Levels

### List Employee Levels

```http
GET /api/employee-level
Authorization: Bearer {token}
```

### Create Employee Level

```http
POST /api/employee-level
Authorization: Bearer {token}
Content-Type: application/json

{
  "level": "Senior Developer",
  "organizationId": "org-uuid"
}
```

## Employee Awards

### List Awards

```http
GET /api/employee-award?where[employeeId]={employee-id}
Authorization: Bearer {token}
```

### Create Award

```http
POST /api/employee-award
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Employee of the Month",
  "year": "2024",
  "employeeId": "employee-uuid",
  "organizationId": "org-uuid"
}
```

## Employee Settings

### Get Employee Settings

```http
GET /api/employee-setting?where[employeeId]={employee-id}
Authorization: Bearer {token}
```

### Update Employee Settings

```http
PUT /api/employee-setting/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "isTrackingEnabled": true,
  "isScreenshotEnabled": true,
  "screenshotFrequency": 10,
  "trackOnSleep": false
}
```

## Employee Recurring Expenses

### List Recurring Expenses

```http
GET /api/employee-recurring-expense?where[employeeId]={employee-id}
Authorization: Bearer {token}
```

### Create Recurring Expense

```http
POST /api/employee-recurring-expense
Authorization: Bearer {token}
Content-Type: application/json

{
  "employeeId": "employee-uuid",
  "categoryName": "Internet",
  "value": 50,
  "currency": "USD",
  "startDate": "2024-01-01",
  "organizationId": "org-uuid"
}
```

## Required Permissions

| Endpoint                           | Permission       |
| ---------------------------------- | ---------------- |
| `GET /api/employee`                | `EMPLOYEES_VIEW` |
| `POST /api/employee`               | `EMPLOYEES_EDIT` |
| `PUT /api/employee/:id`            | `EMPLOYEES_EDIT` |
| `DELETE /api/employee/:id`         | `EMPLOYEES_EDIT` |
| `GET /api/employee/:id/statistics` | `EMPLOYEES_VIEW` |
