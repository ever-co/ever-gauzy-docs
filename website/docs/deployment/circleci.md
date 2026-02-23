---
sidebar_position: 11
---

# CircleCI

CircleCI pipelines for building, testing, and deploying the API and webapp.

## Configuration

Located at `.circleci/config.yml`.

## Pipeline Stages

```
1. Install Dependencies → yarn install
2. Lint → ESLint checks
3. Build → NX build api, webapp
4. Test → Unit tests, E2E tests
5. Docker → Build and push images
6. Deploy → Deploy to staging/production
```

## Key Jobs

| Job                 | Purpose                             |
| ------------------- | ----------------------------------- |
| `install-deps`      | Install and cache node_modules      |
| `lint`              | Run ESLint across affected projects |
| `build-api`         | Build NestJS API                    |
| `build-webapp`      | Build Angular webapp                |
| `test`              | Run unit tests                      |
| `docker-build`      | Build Docker images                 |
| `deploy-staging`    | Deploy to staging environment       |
| `deploy-production` | Deploy to production                |

## Caching

CircleCI caches for faster builds:

```yaml
- restore_cache:
    keys:
      - yarn-deps-{{ checksum "yarn.lock" }}
      - yarn-deps-

- save_cache:
    key: yarn-deps-{{ checksum "yarn.lock" }}
    paths:
      - node_modules
      - ~/.cache/yarn
```

## Environment Variables

Configure in CircleCI project settings:

| Variable                | Purpose                     |
| ----------------------- | --------------------------- |
| `DOCKER_USERNAME`       | Container registry username |
| `DOCKER_PASSWORD`       | Container registry password |
| `NX_CLOUD_ACCESS_TOKEN` | NX remote caching           |
| `STAGING_SSH_KEY`       | SSH key for staging deploy  |

## Workflow Filters

```yaml
workflows:
  build-and-deploy:
    jobs:
      - build-api:
          filters:
            branches:
              only: [main, develop]
      - deploy-staging:
          requires: [build-api, build-webapp]
          filters:
            branches:
              only: develop
      - deploy-production:
          requires: [build-api, build-webapp]
          filters:
            branches:
              only: main
```

## Related Pages

- [CI/CD Overview](./ci-cd-overview)
- [GitHub Actions](./github-actions)
