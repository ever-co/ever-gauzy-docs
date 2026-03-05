---
sidebar_position: 17
---

# OAuth2 & Social Auth Flows

Configure social login and OAuth2 authentication.

## Supported Providers

| Provider  | Strategy  | Status   |
| --------- | --------- | -------- |
| Google    | OAuth2    | Built-in |
| GitHub    | OAuth2    | Built-in |
| Facebook  | OAuth2    | Built-in |
| Twitter   | OAuth1.1a | Built-in |
| Microsoft | OAuth2    | Built-in |
| LinkedIn  | OAuth2    | Built-in |

## OAuth2 Flow

```mermaid
sequenceDiagram
    User->>App: Click "Login with Google"
    App->>Google: Redirect to /oauth/authorize
    Google->>User: Login & consent screen
    User->>Google: Approve
    Google->>App: Redirect with auth code
    App->>Google: Exchange code for tokens
    Google-->>App: Access token + profile
    App->>App: Create/link user account
    App-->>User: JWT token
```

## Configuration

```env
# Google
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback

# GitHub
GITHUB_CLIENT_ID=your-client-id
GITHUB_CLIENT_SECRET=your-client-secret
GITHUB_CALLBACK_URL=http://localhost:3000/api/auth/github/callback

# Facebook
FACEBOOK_CLIENT_ID=your-app-id
FACEBOOK_CLIENT_SECRET=your-app-secret
FACEBOOK_CALLBACK_URL=http://localhost:3000/api/auth/facebook/callback
```

## Implementation

```typescript
@UseGuards(AuthGuard('google'))
@Get('google')
async googleAuth() {}

@UseGuards(AuthGuard('google'))
@Get('google/callback')
async googleAuthCallback(@Req() req) {
  return this.authService.socialLogin(req.user, 'google');
}
```

## Related Pages

- [JWT Deep Dive](./jwt-deep-dive) — token management
- [SSO with SAML](../integrations/sso-saml) — enterprise SSO
- [Authentication API](../api/authentication-endpoints) — auth API
