---
sidebar_position: 10
---

# CI Test Pipeline

Configure tests in the CI/CD pipeline.

## GitHub Actions Test Workflow

```yaml
name: Test Suite

on:
  pull_request:
    branches: [develop, main]
  push:
    branches: [develop]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [20.x]

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: "yarn"

      - run: yarn install --frozen-lockfile

      - name: Run Unit Tests
        run: yarn test --ci --coverage

      - name: Upload Coverage
        uses: codecov/codecov-action@v4
        with:
          token: ${{ secrets.CODECOV_TOKEN }}

  e2e-tests:
    runs-on: ubuntu-latest
    needs: unit-tests

    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_DB: gauzy_test
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: test
        ports:
          - 5432:5432

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20.x
          cache: "yarn"

      - run: yarn install --frozen-lockfile

      - name: Run E2E Tests
        run: yarn test:e2e
        env:
          DB_TYPE: postgres
          DB_HOST: localhost
          DB_PORT: 5432
          DB_NAME: gauzy_test
          DB_USER: postgres
          DB_PASS: test
```

## Test Matrix

| Stage      | Runs On       | Depends On | Timeout |
| ---------- | ------------- | ---------- | ------- |
| Lint       | ubuntu-latest | —          | 5 min   |
| Unit Tests | ubuntu-latest | Lint       | 15 min  |
| E2E Tests  | ubuntu-latest | Unit Tests | 30 min  |
| Build      | ubuntu-latest | E2E Tests  | 20 min  |

## Caching

```yaml
- uses: actions/cache@v4
  with:
    path: |
      node_modules
      .nx/cache
    key: ${{ runner.os }}-modules-${{ hashFiles('yarn.lock') }}
```

## Related Pages

- [CI/CD Pipeline Guide](../deployment/ci-cd/cicd-pipeline-guide) — full CI/CD
- [Code Coverage](./code-coverage) — coverage tracking
- [Git Workflow](../development/git-workflow) — branching model
