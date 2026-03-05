---
sidebar_position: 38
---

# GitHub Actions Caching

Optimize CI/CD build times with caching strategies.

## Dependency Caching

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: 20
    cache: "yarn"

# Or manual caching
- uses: actions/cache@v4
  with:
    path: node_modules
    key: ${{ runner.os }}-modules-${{ hashFiles('yarn.lock') }}
    restore-keys: |
      ${{ runner.os }}-modules-
```

## NX Build Cache

```yaml
- uses: actions/cache@v4
  with:
    path: .nx/cache
    key: ${{ runner.os }}-nx-${{ hashFiles('yarn.lock') }}-${{ github.sha }}
    restore-keys: |
      ${{ runner.os }}-nx-${{ hashFiles('yarn.lock') }}-
      ${{ runner.os }}-nx-
```

## Docker Layer Caching

```yaml
- uses: docker/build-push-action@v5
  with:
    cache-from: type=gha
    cache-to: type=gha,mode=max
```

## Cache Strategy Table

| Asset           | Key Based On      | TTL    |
| --------------- | ----------------- | ------ |
| node_modules    | yarn.lock hash    | 7 days |
| NX cache        | yarn.lock + SHA   | 7 days |
| Docker layers   | Dockerfile + deps | Auto   |
| Build artifacts | Source hash       | 1 day  |

## Impact

| Without Cache  | With Cache   | Savings |
| -------------- | ------------ | ------- |
| ~8 min install | ~30s restore | ~93%    |
| ~10 min build  | ~2 min       | ~80%    |
| ~5 min Docker  | ~1 min       | ~80%    |

## Related Pages

- [CI/CD Pipeline](../deployment/ci-cd/cicd-pipeline-guide) — CI setup
- [CI Test Pipeline](../testing/ci-test-pipeline) — test CI
- [Docker Optimization](./docker-optimization) — Docker builds
