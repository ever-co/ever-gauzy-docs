---
sidebar_position: 8
---

# Transaction Management

Handle database transactions for data consistency.

## TypeORM Transactions

### Using QueryRunner

```typescript
async transferFunds(fromId: string, toId: string, amount: number) {
  const queryRunner = this.dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    await queryRunner.manager.decrement(Account, { id: fromId }, 'balance', amount);
    await queryRunner.manager.increment(Account, { id: toId }, 'balance', amount);

    await queryRunner.commitTransaction();
  } catch (err) {
    await queryRunner.rollbackTransaction();
    throw err;
  } finally {
    await queryRunner.release();
  }
}
```

### Using @Transaction Decorator

```typescript
@Transaction()
async createInvoiceWithItems(
  @TransactionManager() manager: EntityManager,
  dto: CreateInvoiceDTO
) {
  const invoice = await manager.save(Invoice, dto);
  const items = dto.items.map(item => ({
    ...item,
    invoiceId: invoice.id,
  }));
  await manager.save(InvoiceItem, items);
  return invoice;
}
```

### Using EntityManager

```typescript
await this.dataSource.transaction(async (manager) => {
  const employee = await manager.save(Employee, employeeData);
  const user = await manager.save(User, {
    ...userData,
    employeeId: employee.id,
  });
  return { employee, user };
});
```

## Transaction Isolation Levels

| Level            | Dirty Read | Non-Repeatable | Phantom |
| ---------------- | ---------- | -------------- | ------- |
| READ UNCOMMITTED | ✅         | ✅             | ✅      |
| READ COMMITTED   | ❌         | ✅             | ✅      |
| REPEATABLE READ  | ❌         | ❌             | ✅      |
| SERIALIZABLE     | ❌         | ❌             | ❌      |

```typescript
await this.dataSource.transaction("SERIALIZABLE", async (manager) => {
  // Strictest isolation
});
```

## Best Practices

- Keep transactions short
- Avoid long-running queries inside transactions
- Handle deadlocks with retry logic
- Use the lowest isolation level that ensures correctness

## Related Pages

- [Database Schema](./schema-overview) — schema
- [Query Builder](./query-builder) — complex queries
- [Connection Pooling](./connection-pooling) — pool management
