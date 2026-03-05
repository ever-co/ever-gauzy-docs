---
sidebar_position: 9
---

# Public Endpoint Data Exposure

How to prevent information leaks through TypeORM relation loading in public API endpoints.

:::warning
Public endpoints (decorated with `@Public()`) bypass authentication entirely. Any data exposed through these endpoints is accessible to **anyone** with a valid shareable link. Careful control of TypeORM relations is essential to prevent unintended data exposure.
:::

## The Problem

TypeORM allows callers to specify which entity relations to load via query parameters. For example, an endpoint for a public invoice might accept:

```
GET /api/public/invoice/{id}/{token}?relations[]=invoiceItems&relations[]=toContact
```

If the `relations` parameter accepts **arbitrary strings**, a caller can request deeply nested relations that the endpoint was never designed to expose:

```
GET /api/public/invoice/{id}/{token}?relations[]=payments&relations[]=payments.employee&relations[]=payments.employee.user
```

Even if the endpoint uses a `select` clause to restrict columns on _intended_ relations, any **additional** relations not covered by the `select` clause will return **all their columns** — including sensitive internal data like employee personal information, payment details, or internal notes.

## The Solution: Enum-Based Relation Whitelists

Every public endpoint DTO that accepts a `relations` parameter must use an **enum-based whitelist** validated with `class-validator`. This ensures that only explicitly approved relations can be loaded.

### Pattern

```typescript
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, TransformFnParams } from "class-transformer";
import { IsEnum, IsOptional } from "class-validator";

// 1. Define an enum with ONLY the safe relations
export enum PublicInvoiceRelationEnum {
  "tenant" = "tenant",
  "organization" = "organization",
  "fromOrganization" = "fromOrganization",
  "toContact" = "toContact",
  "invoiceItems" = "invoiceItems",
  "invoiceItems.employee" = "invoiceItems.employee",
  "invoiceItems.employee.user" = "invoiceItems.employee.user",
  "invoiceItems.project" = "invoiceItems.project",
  "invoiceItems.product" = "invoiceItems.product",
  "invoiceItems.expense" = "invoiceItems.expense",
  "invoiceItems.task" = "invoiceItems.task",
}

// 2. Use the enum in the DTO with @IsEnum validation
export class PublicInvoiceQueryDTO {
  @ApiPropertyOptional({ type: () => String, enum: PublicInvoiceRelationEnum })
  @IsOptional()
  @Transform(({ value }: TransformFnParams) =>
    value ? value.map((element: string) => element.trim()) : [],
  )
  @IsEnum(PublicInvoiceRelationEnum, { each: true })
  readonly relations: string[] = [];
}
```

### Key Rules

1. **Never extend `RelationsQueryDTO` in public endpoints** — `RelationsQueryDTO` accepts arbitrary string arrays with no validation, which is fine for authenticated internal endpoints but dangerous for public ones.

2. **The whitelist must match the `select` clause** — every relation in the enum must have a corresponding `select` entry in the service that constrains which columns are returned. If a relation is in the enum but not in the `select`, it will return all columns.

3. **Use `{ each: true }` on `@IsEnum`** — since `relations` is an array, the `each: true` option tells class-validator to validate each element individually.

4. **Always pair with `@UseValidationPipe({ whitelist: true })`** — this strips unknown properties from the request object, providing defense-in-depth.

## The `select` Clause

Along with the relation whitelist, the service must define a `select` clause that constrains which columns are returned for each relation:

```typescript
return await this.repository.findOneOrFail({
  select: {
    // Only return safe columns for each relation
    tenant: {
      name: true,
      logo: true,
    },
    organization: {
      name: true,
      officialName: true,
      brandColor: true,
    },
    invoiceItems: {
      id: true,
      description: true,
      quantity: true,
      price: true,
      employee: {
        id: true,
        user: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  },
  where: {
    /* ... */
  },
  ...(relations ? { relations } : {}),
});
```

:::caution
If you add a new relation to the enum whitelist, **you must also** add corresponding `select` constraints in the service. A whitelisted relation without `select` constraints will expose all columns of that entity.
:::

## Current Public Endpoints

| Endpoint                                         | DTO                          | Whitelist Enum              |
| ------------------------------------------------ | ---------------------------- | --------------------------- |
| `GET /api/public/invoice/:id/:token`             | `PublicInvoiceQueryDTO`      | `PublicInvoiceRelationEnum` |
| `GET /api/public/employee/:id`                   | `PublicEmployeeQueryDTO`     | `EmployeeRelationEnum`      |
| `GET /api/public/team/:profile_link/:id`         | `PublicTeamQueryDTO`         | `PublicTeamRelationEnum`    |
| `GET /api/public/organization/:profile_link/:id` | `PublicOrganizationQueryDTO` | `OrganizationRelationEnum`  |
| `GET /api/estimate-email/validate`               | `FindEstimateEmailQueryDTO`  | `EstimateEmailRelationEnum` |

## Checklist for New Public Endpoints

When creating a new public endpoint that loads entity relations:

- [ ] **Define an enum** listing only the relations safe for public exposure
- [ ] **Validate with `@IsEnum`** using `{ each: true }` on the `relations` array
- [ ] **Add `select` constraints** in the service for every whitelisted relation
- [ ] **Do not extend `RelationsQueryDTO`** — create a standalone DTO
- [ ] **Apply `@UseValidationPipe({ whitelist: true })`** on the controller method
- [ ] **Review nested relations** — if you whitelist `invoiceItems.employee`, also check what `employee` exposes and add appropriate `select` constraints

## Related Pages

- [Security Overview](./security-overview) — architecture and guards
- [Data Protection](./data-protection) — classification and handling
- [API Overview](../api/overview) — REST API conventions
