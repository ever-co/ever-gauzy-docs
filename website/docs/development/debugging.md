---
sidebar_position: 7
---

# Debugging

Tips and tools for debugging Ever Gauzy applications.

## API Debugging

### VS Code Launch Configurations

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug API",
      "type": "node",
      "request": "launch",
      "runtimeArgs": ["--inspect"],
      "program": "${workspaceFolder}/dist/apps/api/main.js",
      "envFile": "${workspaceFolder}/.env",
      "sourceMaps": true
    }
  ]
}
```

### Logging

```bash
# Enable verbose logging
DB_LOGGING=true
LOG_LEVEL=debug
```

NestJS logger levels:

- `error` — errors only
- `warn` — warnings and errors
- `log` — standard logs
- `debug` — debug messages
- `verbose` — all messages

### API Health Check

```bash
curl http://localhost:3000/api/health
```

## Frontend Debugging

### Angular DevTools

Install the Angular DevTools browser extension for:

- Component tree inspection
- Change detection profiling
- Dependency injection debugging

### Source Maps

Development builds include source maps by default:

```bash
yarn start:gauzy  # Includes source maps
```

## Database Debugging

### Query Logging

```bash
DB_LOGGING=query    # Log all queries
DB_LOGGING=error    # Log only errors
DB_LOGGING=schema   # Log schema changes
DB_LOGGING=true     # Log everything
```

### pgAdmin / DBeaver

Connect to your database with a GUI tool for direct query inspection.

## Related Pages

- [Development Guide](./development-guide)
- [Troubleshooting](../desktop/troubleshooting) — desktop issues
