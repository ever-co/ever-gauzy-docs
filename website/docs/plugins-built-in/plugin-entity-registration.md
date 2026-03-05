---
sidebar_position: 14
---

# Plugin Entity Registration

Register custom database entities from plugins.

## Dynamic Entity Registration

Plugins can add entities to the Gauzy schema without modifying core code:

```typescript
import { TypeOrmModule } from "@nestjs/typeorm";
import { MikroOrmModule } from "@mikro-orm/nestjs";

@Module({
  imports: [
    TypeOrmModule.forFeature([MyPluginEntity]),
    MikroOrmModule.forFeature([MyPluginEntity]),
  ],
  providers: [MyPluginService],
})
export class MyPluginModule {}
```

## Defining Plugin Entities

```typescript
import { MultiORMEntity, MultiORMColumn, MultiORMManyToOne } from "@gauzy/core";
import { TenantOrganizationBaseEntity } from "@gauzy/core";

@MultiORMEntity("my_plugin_data")
export class MyPluginEntity extends TenantOrganizationBaseEntity {
  @MultiORMColumn()
  name: string;

  @MultiORMColumn({ nullable: true })
  description?: string;

  @MultiORMManyToOne(() => Employee)
  employee?: Employee;

  @MultiORMColumn({ nullable: true })
  employeeId?: string;
}
```

## Migration for Plugin Entities

Generate a migration for the new entity:

```bash
yarn typeorm migration:generate -n AddMyPluginTable
```

This creates:

```typescript
export class AddMyPluginTable1709635260000 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "my_plugin_data" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "tenantId" uuid NOT NULL,
        "organizationId" uuid NOT NULL,
        "name" varchar NOT NULL,
        "description" varchar,
        "employeeId" uuid,
        PRIMARY KEY ("id")
      )
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "my_plugin_data"`);
  }
}
```

## Related Pages

- [Plugin Dev Quickstart](./plugin-dev-quickstart) — getting started
- [Plugin Lifecycle](./plugin-lifecycle) — lifecycle hooks
- [Entity Inheritance](../architecture/entity-inheritance) — base entities
