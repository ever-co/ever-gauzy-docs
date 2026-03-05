---
sidebar_position: 1
---

# SQLite to PostgreSQL Migration

Migrate your Gauzy database from SQLite to PostgreSQL for production.

## Why Migrate?

| Feature         | SQLite         | PostgreSQL       |
| --------------- | -------------- | ---------------- |
| Concurrency     | Single write   | Multi-user       |
| Performance     | Small datasets | Large datasets   |
| Scalability     | Limited        | Highly scalable  |
| Features        | Basic          | Full SQL support |
| Backup          | File copy      | pg_dump, PITR    |
| Recommended for | Development    | Production       |

## Migration Steps

### 1. Set Up PostgreSQL

```bash
# Install PostgreSQL
sudo apt install postgresql

# Create database and user
sudo -u postgres createuser gauzy
sudo -u postgres createdb gauzy -O gauzy
sudo -u postgres psql -c "ALTER USER gauzy PASSWORD 'your-password';"
```

### 2. Export SQLite Data

```bash
# Use the Gauzy export tool
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3000/api/export/all \
  -o gauzy-data-export.json
```

### 3. Update Configuration

Change `.env`:

```diff
- DB_TYPE=sqlite
- DB_NAME=gauzy.sqlite3
+ DB_TYPE=postgres
+ DB_HOST=localhost
+ DB_PORT=5432
+ DB_NAME=gauzy
+ DB_USER=gauzy
+ DB_PASS=your-password
```

### 4. Start API (Creates Schema)

```bash
yarn start:api
```

TypeORM will create all tables automatically on first start.

### 5. Import Data

```bash
curl -X POST -H "Authorization: Bearer $TOKEN" \
  -F "file=@gauzy-data-export.json" \
  http://localhost:3000/api/import/all
```

### 6. Verify

- Check all tables have data
- Test login and basic operations
- Verify time logs and invoices

## Related Pages

- [Database Connection Issues](../troubleshooting/database-issues) — troubleshooting
- [Environment Variables](../devops/environment-variables) — DB config
