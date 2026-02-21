---
sidebar_position: 3
---

# Social Authentication (OAuth)

Ever Gauzy supports social login via OAuth 2.0 with multiple providers. This allows users to sign in using their existing accounts.

## Supported Providers

| Provider      | Strategy                   | Environment Variable Prefix |
| ------------- | -------------------------- | --------------------------- |
| **Google**    | `passport-google-oauth20`  | `GOOGLE_`                   |
| **GitHub**    | `passport-github2`         | `GITHUB_`                   |
| **Facebook**  | `passport-facebook`        | `FACEBOOK_`                 |
| **Twitter**   | `passport-twitter`         | `TWITTER_`                  |
| **LinkedIn**  | `passport-linkedin-oauth2` | `LINKEDIN_`                 |
| **Microsoft** | `passport-microsoft`       | `MICROSOFT_`                |

## OAuth Flow

```
User clicks "Sign in with Google"
         │
         ▼
┌─────────────────────┐
│ Redirect to Google  │
│ /api/auth/google    │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ Google shows consent │
│ screen               │
└─────────┬───────────┘
          │ User approves
          ▼
┌─────────────────────────────────────┐
│ Google redirects to callback URL    │
│ /api/auth/google/callback?code=xxx  │
└─────────┬───────────────────────────┘
          │
          ▼
┌─────────────────────────────────────┐
│ Server exchanges code for tokens    │
│ Fetches user profile from Google    │
│ Creates or links user account       │
│ Issues JWT tokens                   │
└─────────┬───────────────────────────┘
          │
          ▼
┌─────────────────────────────────────┐
│ Redirect to frontend with JWT tokens│
│ {baseUrl}/#/sign-in/success?jwt=xxx │
└─────────────────────────────────────┘
```

## Configuration

### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create/select a project
3. Navigate to **APIs & Services → Credentials**
4. Create **OAuth 2.0 Client ID**
5. Add authorized redirect URIs: `http://localhost:3000/api/auth/google/callback`

```bash
# .env
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback
```

### GitHub OAuth

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new **OAuth App**
3. Set callback URL: `http://localhost:3000/api/auth/github/callback`

```bash
# .env
GAUZY_GITHUB_OAUTH_CLIENT_ID=your-github-client-id
GAUZY_GITHUB_OAUTH_CLIENT_SECRET=your-github-client-secret
GAUZY_GITHUB_OAUTH_CALLBACK_URL=http://localhost:3000/api/auth/github/callback
```

### Facebook OAuth

1. Go to [Facebook Developers](https://developers.facebook.com)
2. Create a new app
3. Add the **Facebook Login** product
4. Set redirect URI: `http://localhost:3000/api/auth/facebook/callback`

```bash
# .env
FACEBOOK_CLIENT_ID=your-facebook-app-id
FACEBOOK_CLIENT_SECRET=your-facebook-app-secret
FACEBOOK_CALLBACK_URL=http://localhost:3000/api/auth/facebook/callback
FACEBOOK_GRAPH_VERSION=v6.0
```

### Twitter OAuth

```bash
# .env
TWITTER_CLIENT_ID=your-twitter-api-key
TWITTER_CLIENT_SECRET=your-twitter-api-secret
TWITTER_CALLBACK_URL=http://localhost:3000/api/auth/twitter/callback
```

### LinkedIn OAuth

```bash
# .env
LINKEDIN_CLIENT_ID=your-linkedin-client-id
LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret
LINKEDIN_CALLBACK_URL=http://localhost:3000/api/auth/linkedin/callback
```

### Microsoft OAuth

```bash
# .env
MICROSOFT_CLIENT_ID=your-microsoft-app-id
MICROSOFT_CLIENT_SECRET=your-microsoft-client-secret
MICROSOFT_CALLBACK_URL=http://localhost:3000/api/auth/microsoft/callback
MICROSOFT_RESOURCE=https://graph.microsoft.com
MICROSOFT_TENANT=common
```

## Feature Flags

Social login providers can be enabled/disabled:

```bash
# .env
FEATURE_SOCIAL_LOGIN_GOOGLE=true
FEATURE_SOCIAL_LOGIN_GITHUB=true
FEATURE_SOCIAL_LOGIN_FACEBOOK=true
FEATURE_SOCIAL_LOGIN_TWITTER=false
FEATURE_SOCIAL_LOGIN_LINKEDIN=true
FEATURE_SOCIAL_LOGIN_MICROSOFT=true
```

## User Linking

### New User

If no account exists with the OAuth email:

1. A new User record is created
2. Profile picture from provider is stored
3. User is sent to the onboarding flow (create tenant)
4. JWT tokens are issued

### Existing User

If an account with the OAuth email already exists:

1. The OAuth profile is linked to the existing user
2. JWT tokens are issued
3. User is redirected to the dashboard

## Callback URL Pattern

All callback URLs follow the pattern:

```
{API_BASE_URL}/api/auth/{provider}/callback
```

| Environment    | Example                                          |
| -------------- | ------------------------------------------------ |
| **Local**      | `http://localhost:3000/api/auth/google/callback` |
| **Production** | `https://api.gauzy.co/api/auth/google/callback`  |

:::important
Make sure the callback URLs in your provider console **exactly match** the URLs configured in `.env`.
:::

## Frontend Integration

The frontend triggers social login by navigating to the provider endpoint:

```typescript
// In Angular component
loginWithGoogle(): void {
  window.location.href = `${environment.apiBaseUrl}/api/auth/google`;
}
```

After successful authentication, the server redirects back to the frontend with JWT tokens as query parameters.

## Related Pages

- [Auth Overview](./auth-overview) — authentication architecture
- [JWT Authentication](./jwt-authentication) — token management
- [Configuration](../getting-started/configuration) — all environment variables
