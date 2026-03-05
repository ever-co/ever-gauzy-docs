---
sidebar_position: 1
---

# Common Build Errors

Troubleshoot common build errors in the Ever Gauzy monorepo.

## `ERROR: Module not found`

**Cause:** Missing or out-of-sync dependencies.

**Fix:**

```bash
# Clean and reinstall
rm -rf node_modules
yarn install
```

## `ERROR: Cannot find module '@gauzy/contracts'`

**Cause:** Internal packages not built.

**Fix:**

```bash
# Build dependencies first
yarn nx build contracts
yarn nx build common
```

## `Angular CLI version mismatch`

**Cause:** Global and local Angular CLI versions differ.

**Fix:**

```bash
npx ng version  # Check versions
npm install -g @angular/cli@latest  # Update global
```

## `Heap out of memory`

**Cause:** TypeScript compilation consuming too much memory.

**Fix:**

```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=8192"
yarn build
```

## `TypeORM: Entity not found`

**Cause:** Entity not registered in module.

**Fix:** Ensure entity is imported in the module's `TypeOrmModule.forFeature()`:

```typescript
@Module({
  imports: [TypeOrmModule.forFeature([MyEntity])],
})
```

## `MikroORM: Cannot read properties of undefined`

**Cause:** MikroORM 6.x stricter metadata validation.

**Fix:** Use conditional decorators based on `DB_ORM`. See [Custom Entity Fields](../advanced/custom-entity-fields).

## NX Build Cache Issues

```bash
# Clear NX cache
npx nx reset

# Rebuild without cache
npx nx build api --skip-nx-cache
```

## Related Pages

- [Development Guide](../development/development-guide) — getting started
- [Monorepo Navigation](../development/monorepo-navigation) — repo structure
