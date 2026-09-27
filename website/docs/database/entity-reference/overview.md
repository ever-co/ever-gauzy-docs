---
sidebar_position: 1
---

# Entity Reference Overview

This section documents all database entities in the Ever Gauzy platform. Entities are organized by domain and include field definitions, relationships, and inheritance hierarchy.

## Entity Inheritance

All entities inherit from a base hierarchy:

```mermaid
classDiagram
    class BaseEntity {
        +id: string
        +createdAt: Date
        +updatedAt: Date
        +isActive: boolean
        +isArchived: boolean
    }
    class TenantBaseEntity {
        +tenantId: string
        +tenant: Tenant
    }
    class TenantOrganizationBaseEntity {
        +organizationId: string
        +organization: Organization
    }
    BaseEntity <|-- TenantBaseEntity
    TenantBaseEntity <|-- TenantOrganizationBaseEntity
```

Most entities extend `TenantOrganizationBaseEntity`, inheriting automatic tenant and organization scoping.

## Entity Index by Domain

### Core

| Entity                                           | Table             | Description            |
| ------------------------------------------------ | ----------------- | ---------------------- |
| [User](/database/entity-reference/core-entities#user)                     | `user`            | User accounts          |
| [Tenant](/database/entity-reference/core-entities#tenant)                 | `tenant`          | Top-level isolation    |
| [Organization](/database/entity-reference/core-entities#organization)     | `organization`    | Business units         |
| [Role](/database/entity-reference/core-entities#role)                     | `role`            | User roles             |
| [RolePermission](/database/entity-reference/core-entities#rolepermission) | `role_permission` | Permission assignments |

### Employees

| Entity                                                 | Table              | Description            |
| ------------------------------------------------------ | ------------------ | ---------------------- |
| [Employee](/database/entity-reference/employee-entities#employee)               | `employee`         | Employee records       |
| [EmployeeAward](/database/entity-reference/employee-entities#employeeaward)     | `employee_award`   | Awards and recognition |
| [EmployeeLevel](/database/entity-reference/employee-entities#employeelevel)     | `employee_level`   | Seniority levels       |
| [EmployeeSetting](/database/entity-reference/employee-entities#employeesetting) | `employee_setting` | Per-employee settings  |

### Time Tracking

| Entity                                            | Table        | Description           |
| ------------------------------------------------- | ------------ | --------------------- |
| [TimeLog](/database/entity-reference/time-tracking-entities#timelog)       | `time_log`   | Time entries          |
| [TimeSlot](/database/entity-reference/time-tracking-entities#timeslot)     | `time_slot`  | 10-min activity slots |
| [Timesheet](/database/entity-reference/time-tracking-entities#timesheet)   | `timesheet`  | Weekly timesheets     |
| [Screenshot](/database/entity-reference/time-tracking-entities#screenshot) | `screenshot` | Activity screenshots  |
| [Activity](/database/entity-reference/time-tracking-entities#activity)     | `activity`   | App/URL activities    |

### Tasks & Projects

| Entity                                                             | Table                  | Description      |
| ------------------------------------------------------------------ | ---------------------- | ---------------- |
| [Task](/database/entity-reference/task-project-entities#task)                               | `task`                 | Work items       |
| [OrganizationProject](/database/entity-reference/task-project-entities#organizationproject) | `organization_project` | Projects         |
| [OrganizationSprint](/database/entity-reference/task-project-entities#organizationsprint)   | `organization_sprint`  | Agile sprints    |
| [DailyPlan](/database/entity-reference/task-project-entities#dailyplan)                     | `daily_plan`           | Daily work plans |

### Financial

| Entity                                                | Table          | Description            |
| ----------------------------------------------------- | -------------- | ---------------------- |
| [Invoice](/database/entity-reference/invoice-payment-entities#invoice)         | `invoice`      | Invoices and estimates |
| [InvoiceItem](/database/entity-reference/invoice-payment-entities#invoiceitem) | `invoice_item` | Line items             |
| [Payment](/database/entity-reference/invoice-payment-entities#payment)         | `payment`      | Payment records        |
| [Expense](/database/entity-reference/expense-income-entities#expense)          | `expense`      | Business expenses      |
| [Income](/database/entity-reference/expense-income-entities#income)            | `income`       | Revenue entries        |

### CRM & ATS

| Entity                            | Table                  | Description       |
| --------------------------------- | ---------------------- | ----------------- |
| [Contact](/database/entity-reference/crm-entities)         | `organization_contact` | Business contacts |
| [Pipeline](/database/entity-reference/crm-entities)        | `pipeline`             | Sales pipelines   |
| [Deal](/database/entity-reference/crm-entities)            | `deal`                 | Sales deals       |
| [Candidate](/database/entity-reference/candidate-entities) | `candidate`            | Job candidates    |

### Products & Inventory

| Entity                                         | Table             | Description      |
| ---------------------------------------------- | ----------------- | ---------------- |
| [Product](/database/entity-reference/product-inventory-entities)        | `product`         | Products         |
| [ProductVariant](/database/entity-reference/product-inventory-entities) | `product_variant` | Product variants |
| [Warehouse](/database/entity-reference/product-inventory-entities)      | `warehouse`       | Warehouses       |

### Collaboration

| Entity                               | Table      | Description          |
| ------------------------------------ | ---------- | -------------------- |
| [Comment](/database/entity-reference/collaboration-entities)  | `comment`  | Comments on entities |
| [Mention](/database/entity-reference/collaboration-entities)  | `mention`  | @mentions            |
| [Reaction](/database/entity-reference/collaboration-entities) | `reaction` | Emoji reactions      |
| [Favorite](/database/entity-reference/collaboration-entities) | `favorite` | Bookmarked entities  |

## Multi-ORM Support

All entities are decorated for both TypeORM and MikroORM using the `MultiORMEntity` decorator:

```typescript
@MultiORMEntity("table_name")
export class MyEntity extends TenantOrganizationBaseEntity {
  @MultiORMColumn()
  name: string;
}
```

See [Multi-ORM Architecture](/architecture/multi-orm-architecture) and [Multi-ORM Entities](/database/multi-orm-entities) for details.
