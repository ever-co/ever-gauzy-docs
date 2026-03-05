---
sidebar_position: 17
---

# Dependency Management

Managing dependencies in the Gauzy monorepo.

## Package Manager

Gauzy uses **Yarn Classic (1.x)** for dependency management:

```bash
# Install all dependencies
yarn install

# Add a dependency to root
yarn add package-name

# Add to a specific workspace
yarn workspace @gauzy/api add package-name
```

## Workspace Structure

Dependencies are defined at:

| Level    | `package.json` Location   | Purpose                |
| -------- | ------------------------- | ---------------------- |
| Root     | `./package.json`          | Dev tools, shared deps |
| Apps     | `apps/*/package.json`     | App-specific deps      |
| Packages | `packages/*/package.json` | Library deps           |

## Common Issues

### Hoisting Conflicts

```bash
# If you get version conflicts
yarn install --check-files

# Force clean install
rm -rf node_modules
yarn install
```

### Peer Dependency Warnings

```bash
# Ignore peer dependency warnings for known issues
yarn install --ignore-optional
```

## Dependency Audit

```bash
# Check for vulnerabilities
yarn audit

# Check for outdated packages
yarn outdated

# Update a specific package
yarn upgrade package-name@latest
```

## Lockfile Management

- **Always commit `yarn.lock`** — ensures reproducible builds
- **Never manually edit `yarn.lock`** — use yarn commands
- **Resolve merge conflicts** — use `yarn install --force`

## Private Registry

For private packages, configure Verdaccio:

```bash
# .npmrc
@ever-co:registry=https://packages.ever.co/
//packages.ever.co/:_authToken=${VERDACCIO_TOKEN}
```

See [Private Registry Configuration](../deployment/private-registry) for details.

## Related Pages

- [Monorepo Guide](./monorepo-guide) — workspace layout
- [Development Guide](../development/development-guide) — setup
- [CI/CD Pipeline](../deployment/ci-cd/cicd-pipeline-guide) — CI
