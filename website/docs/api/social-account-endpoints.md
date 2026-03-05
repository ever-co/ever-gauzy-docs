---
sidebar_position: 48
---

# Social Account Endpoints

Manage linked social/OAuth accounts for users.

## Base Path

```
/api/social-account
```

## Endpoints

### List Social Accounts

```
GET /api/social-account
Authorization: Bearer {token}
```

Returns all linked social accounts for the current user.

### Link Social Account

```
POST /api/social-account
Authorization: Bearer {token}
```

```json
{
  "provider": "google",
  "providerId": "google-user-id",
  "providerAccountId": "account-id"
}
```

### Unlink Social Account

```
DELETE /api/social-account/:id
Authorization: Bearer {token}
```

## Supported Providers

| Provider  | OAuth Flow |
| --------- | ---------- |
| Google    | OAuth 2.0  |
| GitHub    | OAuth 2.0  |
| Facebook  | OAuth 2.0  |
| Twitter   | OAuth 1.0a |
| LinkedIn  | OAuth 2.0  |
| Microsoft | OAuth 2.0  |

## Related Pages

- [Auth Endpoints](./auth-endpoints) — authentication
- [SSO/SAML Integration](../integrations/sso-saml-integration) — SSO setup
