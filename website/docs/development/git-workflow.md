---
sidebar_position: 17
---

# Git Workflow & Branching Strategy

Git branching model and contribution workflow for Ever Gauzy.

## Branching Model

```mermaid
gitgraph
    commit id: "Initial"
    branch develop
    checkout develop
    commit id: "Feature A"
    branch feature/task-view
    commit id: "Task view WIP"
    commit id: "Task view done"
    checkout develop
    merge feature/task-view
    branch release/1.0
    commit id: "Release prep"
    checkout main
    merge release/1.0 tag: "v1.0.0"
    checkout develop
    merge release/1.0
```

## Branch Naming

| Branch Type   | Pattern                 | Example                  |
| ------------- | ----------------------- | ------------------------ |
| Feature       | `feature/{description}` | `feature/daily-plans`    |
| Bugfix        | `fix/{description}`     | `fix/timer-not-stopping` |
| Hotfix        | `hotfix/{description}`  | `hotfix/security-patch`  |
| Release       | `release/{version}`     | `release/1.5.0`          |
| Documentation | `docs/{description}`    | `docs/api-reference`     |

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(task): add daily plan feature
fix(timer): resolve timer not stopping on idle
docs(api): add employee endpoint docs
chore(deps): upgrade NestJS to v10
refactor(auth): simplify JWT validation
test(employee): add unit tests for employee service
```

## Pull Request Process

1. Create feature branch from `develop`
2. Implement changes with tests
3. Open PR targeting `develop`
4. Wait for CI checks to pass
5. Request review from 1-2 reviewers
6. Address review comments
7. Squash merge into `develop`

## CI Checks

| Check         | Description              |
| ------------- | ------------------------ |
| Build         | `yarn build` succeeds    |
| Lint          | `yarn lint` passes       |
| Unit Tests    | `yarn test` passes       |
| E2E Tests     | Playwright tests pass    |
| Code Coverage | Coverage meets threshold |

## Related Pages

- [Contributing](./contributing) — contribution guide
- [Coding Standards](./coding-standards) — code style
- [Release Process](./release-process) — how releases work
