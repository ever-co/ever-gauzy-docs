---
sidebar_position: 3
---

# Query Builder Patterns

Use TypeORM query builder for complex queries.

## Basic Query Builder

```typescript
const employees = await this.employeeRepository
  .createQueryBuilder("employee")
  .leftJoinAndSelect("employee.user", "user")
  .where("employee.organizationId = :orgId", { orgId })
  .andWhere("employee.tenantId = :tenantId", { tenantId })
  .andWhere("employee.isActive = :isActive", { isActive: true })
  .orderBy("user.firstName", "ASC")
  .skip(skip)
  .take(take)
  .getManyAndCount();
```

## Filtering Patterns

### Dynamic Filters

```typescript
const qb = this.taskRepository.createQueryBuilder("task");

if (filters.status) {
  qb.andWhere("task.status = :status", { status: filters.status });
}
if (filters.projectId) {
  qb.andWhere("task.projectId = :projectId", { projectId: filters.projectId });
}
if (filters.search) {
  qb.andWhere("task.title ILIKE :search", { search: `%${filters.search}%` });
}
```

### Date Range

```typescript
qb.andWhere("timeLog.startedAt BETWEEN :start AND :end", {
  start: new Date("2025-01-01"),
  end: new Date("2025-12-31"),
});
```

### IN Clause

```typescript
qb.andWhere("task.status IN (:...statuses)", {
  statuses: ["TODO", "IN_PROGRESS"],
});
```

## Aggregate Queries

```typescript
// Total hours per employee
const result = await this.timeLogRepository
  .createQueryBuilder("timeLog")
  .select("timeLog.employeeId", "employeeId")
  .addSelect("SUM(timeLog.duration)", "totalDuration")
  .where("timeLog.tenantId = :tenantId", { tenantId })
  .groupBy("timeLog.employeeId")
  .getRawMany();
```

## Subqueries

```typescript
const subQuery = this.taskRepository
  .createQueryBuilder("t")
  .select("t.projectId")
  .where("t.status = :status", { status: "DONE" });

const projects = await this.projectRepository
  .createQueryBuilder("project")
  .where(`project.id IN (${subQuery.getQuery()})`)
  .setParameters(subQuery.getParameters())
  .getMany();
```

## Related Pages

- [Database Schema](./schema-overview) — schema overview
- [Database Indexing](./indexing-strategy) — optimize queries
- [Repository Pattern](../architecture/repository-pattern) — repository architecture
