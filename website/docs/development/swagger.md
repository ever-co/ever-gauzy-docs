---
sidebar_position: 9
---

# API Documentation (Swagger)

Auto-generated API documentation using Swagger/OpenAPI.

## Accessing Swagger UI

When the API is running, Swagger UI is available at:

```
http://localhost:3000/swg
```

## Configuration

```bash
# Enable/disable Swagger
SWAGGER_ENABLED=true
```

## Swagger Setup

```typescript
const config = new DocumentBuilder()
  .setTitle("Ever Gauzy API")
  .setDescription("Ever Gauzy Platform API Documentation")
  .setVersion("1.0")
  .addBearerAuth()
  .addTag("Auth", "Authentication endpoints")
  .addTag("Employee", "Employee management")
  .addTag("Organization", "Organization management")
  .addTag("TimeTracking", "Time tracking endpoints")
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup("swg", app, document);
```

## Decorating Controllers

```typescript
@ApiTags('Employee')
@ApiBearerAuth()
@Controller('/employee')
export class EmployeeController {
  @Get()
  @ApiOperation({ summary: 'Get all employees' })
  @ApiResponse({ status: 200, description: 'Employee list' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll() { ... }
}
```

## DTO Documentation

```typescript
export class CreateEmployeeDTO {
  @ApiProperty({ description: "First name", example: "John" })
  @IsString()
  firstName: string;

  @ApiProperty({ description: "Last name", example: "Doe" })
  @IsString()
  lastName: string;

  @ApiPropertyOptional({ description: "Bill rate" })
  @IsOptional()
  @IsNumber()
  billRateValue?: number;
}
```

## OpenAPI Spec Export

```bash
# Export OpenAPI JSON spec
curl http://localhost:3000/swg-json > openapi.json
```

## Related Pages

- [API Overview](../api/overview)
- [REST API](../api/rest-api)
