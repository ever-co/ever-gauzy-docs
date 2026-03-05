---
sidebar_position: 39
---

# GraphQL API Overview

Using the Gauzy GraphQL API alongside the REST API.

## Endpoint

```
POST /graphql
```

GraphQL Playground: `http://localhost:3000/graphql`

## Authentication

Include JWT token in the request headers:

```json
{
  "Authorization": "Bearer YOUR_TOKEN"
}
```

## Example Queries

### Fetch Employees

```graphql
query {
  employees(
    filter: { organizationId: "org-uuid", isActive: true }
    paging: { limit: 10, offset: 0 }
  ) {
    edges {
      node {
        id
        user {
          firstName
          lastName
          email
        }
        startedWorkOn
        isActive
      }
    }
    totalCount
  }
}
```

### Fetch Tasks

```graphql
query {
  tasks(
    filter: { projectId: "project-uuid", status: "TODO" }
    sorting: [{ field: createdAt, direction: DESC }]
  ) {
    edges {
      node {
        id
        title
        status
        priority
        assignees {
          id
          user {
            firstName
            lastName
          }
        }
      }
    }
    totalCount
  }
}
```

## Mutations

### Create Task

```graphql
mutation {
  createOneTask(
    input: {
      task: {
        title: "New Task via GraphQL"
        status: "TODO"
        priority: "HIGH"
        projectId: "project-uuid"
        organizationId: "org-uuid"
        tenantId: "tenant-uuid"
      }
    }
  ) {
    id
    title
    status
  }
}
```

### Update Employee

```graphql
mutation {
  updateOneEmployee(
    input: { id: "employee-uuid", update: { isActive: false } }
  ) {
    id
    isActive
  }
}
```

## Subscriptions

```graphql
subscription {
  timerStatusChanged {
    employeeId
    running
    duration
  }
}
```

## GraphQL vs REST

| Feature        | GraphQL                | REST                |
| -------------- | ---------------------- | ------------------- |
| Data fetching  | Client specifies shape | Fixed responses     |
| Over-fetching  | No                     | Common              |
| Under-fetching | No                     | Requires joins      |
| Typing         | Strong schema          | OpenAPI/Swagger     |
| Caching        | More complex           | Standard HTTP cache |

## Related Pages

- [API Overview](../api/overview) — REST API
- [Pagination & Filtering](../api/pagination-and-filtering) — query patterns
