---
sidebar_position: 6
---

# Contributing

How to contribute to the Ever Gauzy project.

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork
3. Create a feature branch
4. Make changes
5. Run tests and lint
6. Submit a pull request

## Branch Naming

| Prefix      | Purpose          |
| ----------- | ---------------- |
| `feat/`     | New feature      |
| `fix/`      | Bug fix          |
| `docs/`     | Documentation    |
| `refactor/` | Code refactoring |
| `test/`     | Adding tests     |
| `chore/`    | Maintenance      |

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(employee): add skill management endpoint
fix(time-tracking): resolve idle detection on macOS
docs(api): add pagination examples
refactor(core): simplify tenant filtering logic
```

## Pull Request Checklist

- [ ] Code follows coding standards
- [ ] Tests added for new features
- [ ] Existing tests pass
- [ ] Lint passes
- [ ] Documentation updated
- [ ] PR description explains changes

## Development Workflow

```bash
# Create feature branch
git checkout -b feat/my-feature

# Make changes
# ...

# Run lint
yarn lint

# Run tests
yarn test

# Commit
git commit -m "feat(module): description"

# Push
git push origin feat/my-feature

# Create PR on GitHub
```

## Related Pages

- [Development Guide](./development-guide) — setup and tooling
- [Coding Standards](./coding-standards) — code style
- [Testing](./testing) — test strategies
