---
sidebar_position: 11
---

# Contribution Guide

How to contribute to the Ever Gauzy project.

## Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork locally
3. **Create** a feature branch from `develop`
4. **Make** your changes
5. **Submit** a Pull Request

## Development Setup

```bash
git clone https://github.com/YOUR_USERNAME/ever-gauzy.git
cd ever-gauzy
yarn install
yarn start:api     # Terminal 1
yarn start          # Terminal 2
```

## Branch Naming

```
feature/SHORT-DESCRIPTION
bugfix/SHORT-DESCRIPTION
hotfix/SHORT-DESCRIPTION
docs/SHORT-DESCRIPTION
```

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add employee avatar upload
fix: resolve time logging timezone bug
docs: add API quickstart tutorial
refactor: extract time service from controller
```

## Pull Request Process

1. Ensure CI passes (lint, test, build)
2. Add/update tests for changes
3. Update documentation if needed
4. Request review from maintainers
5. Address feedback
6. PR is merged into `develop`

## Code Style

- Follow existing patterns
- Use TypeScript strict mode
- DTOs for all API input validation
- Multi-ORM decorators for entities
- Permissions guards on all endpoints

## Areas for Contribution

| Area          | Description               |
| ------------- | ------------------------- |
| Bug fixes     | Fix reported issues       |
| Features      | New features from roadmap |
| Documentation | Improve/add docs          |
| i18n          | Translation improvements  |
| Tests         | Add/improve test coverage |
| Performance   | Optimization work         |

## Related Pages

- [Git Workflow](../development/git-workflow) — branching model
- [Code Review Checklist](../development/code-review-checklist) — PR review
- [Development Guide](../development/development-guide) — setup guide
