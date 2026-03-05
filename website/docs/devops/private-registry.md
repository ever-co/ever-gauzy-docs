---
sidebar_position: 6
---

# Private Registry (Verdaccio)

Configure a private npm registry using Verdaccio for managing internal packages.

## Overview

Ever Gauzy uses [Verdaccio](https://verdaccio.org/) as a private npm registry at `packages.ever.co` for distributing internal packages securely.

## Registry URL

```
https://registry.npmjs.org  →  https://packages.ever.co
```

## Docker Configuration

Add the following to Dockerfiles that run `yarn install`:

```dockerfile
ARG VERDACCIO_TOKEN
ENV VERDACCIO_TOKEN=${VERDACCIO_TOKEN}

RUN echo "//packages.ever.co/:_authToken=${VERDACCIO_TOKEN}" > .npmrc && \
    echo "@ever-co:registry=https://packages.ever.co" >> .npmrc && \
    echo "always-auth=true" >> .npmrc
```

## GitHub Actions

Configure in CI/CD workflows:

```yaml
- name: Configure private registry
  run: |
    echo "//packages.ever.co/:_authToken=${{ secrets.VERDACCIO_TOKEN }}" >> .npmrc
    echo "@ever-co:registry=https://packages.ever.co" >> .npmrc
    echo "always-auth=true" >> .npmrc
```

## Token Management

| Item       | Description                     |
| ---------- | ------------------------------- |
| Token Name | `VERDACCIO_TOKEN`               |
| Token Type | Long-lived authentication token |
| Storage    | GitHub Secrets                  |
| Scope      | Organization-level              |

## Troubleshooting

### 401 Unauthorized

If you get 401 errors when downloading tarballs:

1. Ensure `always-auth=true` is set in `.npmrc`
2. Verify the token is not expired
3. Check that the token has read access to the packages

## Related Pages

- [Production Deployment](./production-deployment) — deployment guide
- [Environment Variables](./environment-variables) — configuration reference
