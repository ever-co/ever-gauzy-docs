---
sidebar_position: 45
---

# DTO Design Patterns

Data Transfer Object patterns for validation and transformation.

## Overview

Every API endpoint uses DTOs (Data Transfer Objects) for:

- Input validation
- Data transformation
- Type safety
- Documentation (Swagger)

## Creating a DTO

```typescript
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsEnum,
  IsUUID,
} from "class-validator";
import { Transform } from "class-transformer";

export class CreateEmployeeDTO {
  @ApiProperty({ description: "First name" })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  firstName: string;

  @ApiProperty({ description: "Last name" })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: "Email address" })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ description: "Phone number" })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ enum: ["ACTIVE", "INACTIVE"] })
  @IsEnum(["ACTIVE", "INACTIVE"])
  status: string;
}
```

## Validation Decorators

| Decorator           | Purpose                |
| ------------------- | ---------------------- |
| `@IsString()`       | Must be string         |
| `@IsNotEmpty()`     | Cannot be empty        |
| `@IsEmail()`        | Valid email format     |
| `@IsUUID()`         | Valid UUID             |
| `@IsEnum()`         | Must be in enum values |
| `@IsOptional()`     | Field is optional      |
| `@IsDateString()`   | Valid ISO date string  |
| `@Min()` / `@Max()` | Number range           |
| `@Length()`         | String length range    |
| `@ValidateNested()` | Validate nested object |

## Relation Whitelisting

For security, always whitelist allowed relations:

```typescript
import { IsOptional, IsEnum } from "class-validator";

export enum AllowedRelations {
  USER = "user",
  ORGANIZATION = "organization",
}

export class FindEmployeeQueryDTO {
  @IsOptional()
  @IsEnum(AllowedRelations, { each: true })
  relations?: AllowedRelations[];
}
```

## DTO Inheritance

```typescript
// Create
export class CreateTaskDTO { ... }

// Update (all fields optional)
export class UpdateTaskDTO extends PartialType(CreateTaskDTO) {}

// Query (with pagination)
export class FindTaskQueryDTO extends IntersectionType(
  PaginationParams,
  PickType(CreateTaskDTO, ['status'] as const),
) {}
```

## Related Pages

- [Guard System](./guard-system) — guards
- [Request Lifecycle](./request-lifecycle) — request flow
- [API Overview](../api/overview) — API reference
