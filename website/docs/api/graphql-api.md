---
sidebar_position: 3
---

# GraphQL API

Ever Gauzy provides a **GraphQL API** alongside the REST API, offering a flexible, type-safe query language for frontend clients.

:::info
The GraphQL API is currently a **Work-In-Progress (WIP)**. The REST API is the primary production API. GraphQL coverage is being expanded incrementally.
:::

## Endpoint

| Environment | GraphQL Endpoint                   | GraphQL Playground                 |
| ----------- | ---------------------------------- | ---------------------------------- |
| **Local**   | `http://localhost:3000/graphql`    | `http://localhost:3000/graphql`    |
| **Demo**    | `https://apidemo.gauzy.co/graphql` | `https://apidemo.gauzy.co/graphql` |

## Architecture

The GraphQL layer is built with `@nestjs/graphql` (Apollo Server):

```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│ GraphQL  │────▶│ Resolver │────▶│ Service  │────▶│Repository│
│ Request  │     │          │     │          │     │          │
└──────────┘     └──────────┘     └──────────┘     └──────────┘
```

### Code-First Approach

Gauzy uses the **code-first** approach where GraphQL schema is generated from TypeScript classes:

```typescript
// Object Type
@ObjectType()
export class Employee {
  @Field(() => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field({ nullable: true })
  startedWorkOn?: Date;
}

// Resolver
@Resolver(() => Employee)
export class EmployeeResolver {
  constructor(private readonly employeeService: EmployeeService) {}

  @Query(() => [Employee])
  async employees(): Promise<Employee[]> {
    return this.employeeService.findAll();
  }

  @Mutation(() => Employee)
  async createEmployee(
    @Args("input") input: CreateEmployeeInput,
  ): Promise<Employee> {
    return this.employeeService.create(input);
  }
}
```

## Example Queries

### Query Employees

```graphql
query {
  employees {
    id
    firstName
    lastName
    startedWorkOn
    user {
      email
    }
    organization {
      name
    }
  }
}
```

### Query with Variables

```graphql
query GetEmployee($id: ID!) {
  employee(id: $id) {
    id
    firstName
    lastName
    skills {
      name
    }
  }
}
```

### Mutation

```graphql
mutation CreateEmployee($input: CreateEmployeeInput!) {
  createEmployee(input: $input) {
    id
    firstName
    lastName
  }
}
```

## Authentication

GraphQL requests require the same JWT authentication as REST:

```bash
POST /graphql
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "query": "query { employees { id firstName } }"
}
```

## GraphQL Playground

When running in development mode, the GraphQL Playground is available at the `/graphql` endpoint. It provides:

- Interactive query editor
- Schema exploration
- Auto-completion
- Documentation browser
- Request history

## Configuration

```typescript
// app.module.ts
GraphQLModule.forRoot<ApolloDriverConfig>({
  driver: ApolloDriver,
  autoSchemaFile: true, // Code-first schema generation
  playground: process.env.NODE_ENV !== "production",
  introspection: true,
  context: ({ req, res }) => ({ req, res }),
});
```

## REST vs GraphQL

| Feature            | REST                     | GraphQL                       |
| ------------------ | ------------------------ | ----------------------------- |
| **Maturity**       | ✅ Production-ready      | ⚠️ Work-in-progress           |
| **Coverage**       | ✅ All endpoints         | ⚠️ Partial coverage           |
| **Documentation**  | ✅ Swagger UI            | ✅ Playground                 |
| **Data fetching**  | Fixed response shape     | Client-defined response shape |
| **Over-fetching**  | Possible                 | Eliminated                    |
| **Under-fetching** | Multiple requests needed | Single request                |
| **Caching**        | HTTP caching             | Apollo Client caching         |

## Related Pages

- [REST API](./rest-api) — primary REST API documentation
- [API Overview](./overview) — general API information
