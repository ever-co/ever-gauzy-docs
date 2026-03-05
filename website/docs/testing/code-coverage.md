---
sidebar_position: 7
---

# Code Coverage

Track and improve test coverage across the codebase.

## Running Coverage

```bash
# Full coverage report
yarn test --coverage

# Coverage for specific package
yarn test --project=@gauzy/core --coverage

# Open HTML report
open coverage/lcov-report/index.html
```

## Coverage Targets

| Component       | Target | Description            |
| --------------- | ------ | ---------------------- |
| Services        | 80%+   | Business logic         |
| Controllers     | 70%+   | Request handling       |
| DTOs/Validators | 90%+   | Input validation       |
| Utilities       | 90%+   | Helper functions       |
| Guards          | 80%+   | Auth/permissions       |
| Interceptors    | 70%+   | Cross-cutting concerns |

## Jest Coverage Config

```json
{
  "coverageDirectory": "./coverage",
  "coveragePathIgnorePatterns": [
    "/node_modules/",
    "/dist/",
    "spec.ts$",
    "/migrations/"
  ],
  "coverageReporters": ["text", "lcov", "json-summary"],
  "coverageThresholds": {
    "global": {
      "branches": 60,
      "functions": 70,
      "lines": 75,
      "statements": 75
    }
  }
}
```

## CI Integration

```yaml
- name: Run Tests with Coverage
  run: yarn test --coverage --ci

- name: Upload Coverage
  uses: codecov/codecov-action@v4
  with:
    token: ${{ secrets.CODECOV_TOKEN }}
    files: ./coverage/lcov.info
```

## Related Pages

- [Unit Testing Guide](./unit-testing) — unit tests
- [CI Test Pipeline](./ci-test-pipeline) — CI setup
