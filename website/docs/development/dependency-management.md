---
sidebar_position: 20
---

# Dependency Management

Managing NPM dependencies, security auditing, and version strategies.

## Package Manager

Ever Gauzy uses **Yarn Classic (v1)** for dependency management. All lock files use `yarn.lock`.

## Adding Dependencies

```bash
# Add to a specific package
yarn workspace @gauzy/core add lodash

# Add as dev dependency
yarn workspace @gauzy/core add -D @types/lodash

# Add to root (affects all packages)
yarn add -W some-global-tool
```

## Version Strategies

| Strategy    | Notation | Description        |
| ----------- | -------- | ------------------ |
| Exact       | `1.2.3`  | Exact version only |
| Patch range | `~1.2.3` | Allows `1.2.x`     |
| Minor range | `^1.2.3` | Allows `1.x.x`     |

**Recommendation:** Use exact versions (`1.2.3`) for critical dependencies, caret (`^`) for utilities.

## Security Audit

```bash
# Run security audit
yarn audit

# Fix vulnerabilities
yarn audit fix
```

## Dependency Updates

```bash
# Check for outdated packages
yarn outdated

# Interactive upgrade
npx npm-check-updates -i
```

## Private Registry Packages

Internal packages from Verdaccio:

```
@ever-co/ui-core
@ever-co/common
@gauzy/contracts
@gauzy/plugin-*
```

See [Private Registry](../devops/private-registry) for configuration.

## Related Pages

- [Monorepo Navigation](./monorepo-navigation) — repo structure
- [Private Registry](../devops/private-registry) — Verdaccio
