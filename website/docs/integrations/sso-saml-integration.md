---
sidebar_position: 15
---

# SSO / SAML Integration

Configure Single Sign-On with SAML 2.0 identity providers.

## Overview

Gauzy supports SSO through SAML 2.0 and OAuth2 providers for enterprise authentication.

## SAML 2.0 Setup

### 1. Identity Provider Configuration

Configure your IdP (Okta, Azure AD, OneLogin, etc.) with:

| Setting        | Value                                                    |
| -------------- | -------------------------------------------------------- |
| SSO URL        | `{API_BASE_URL}/api/auth/saml/callback`                  |
| Entity ID      | `{API_BASE_URL}/api/auth/saml/metadata`                  |
| Name ID Format | `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress` |

### 2. Gauzy Configuration

```
SAML_ISSUER=your-entity-id
SAML_CALLBACK_URL=http://localhost:3000/api/auth/saml/callback
SAML_ENTRY_POINT=https://idp.example.com/sso/saml
SAML_CERT=your-idp-certificate
```

### Attribute Mapping

| SAML Attribute | Gauzy Field  |
| -------------- | ------------ |
| `email`        | User email   |
| `firstName`    | First name   |
| `lastName`     | Last name    |
| `groups`       | Role mapping |

## OAuth2 SSO

For OAuth2-based SSO, use the built-in social auth providers:

- **Google** — Google Workspace SSO
- **Microsoft** — Azure AD / Entra ID
- **GitHub** — GitHub Organizations

See [Social Auth](../authentication/social-auth) for OAuth setup.

## Enterprise SSO Features

| Feature                   | Description                      |
| ------------------------- | -------------------------------- |
| Just-in-time provisioning | Auto-create users on first login |
| Role mapping              | Map IdP groups to Gauzy roles    |
| Forced SSO                | Disable password login           |
| Multi-provider            | Multiple SSO providers           |

## Related Pages

- [Social Auth](../authentication/social-auth) — OAuth2 providers
- [LDAP Integration](./ldap-integration) — directory services
- [Tenant Isolation](../security/tenant-isolation) — multi-tenant SSO
