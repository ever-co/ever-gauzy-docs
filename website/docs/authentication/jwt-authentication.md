---
sidebar_position: 2
---

# JWT Authentication

Detailed documentation on how JWT (JSON Web Token) authentication works in the Ever Gauzy platform.

## How JWT Works

```
┌─────────┐  POST /auth/login     ┌──────────┐
│  Client  │ ───────────────────▶  │  Server   │
│          │  {email, password}    │           │
│          │                       │  Validate │
│          │  ◀──────────────────  │  & Sign   │
│          │  {token, refreshToken}│  JWT      │
│          │                       └──────────┘
│          │
│          │  GET /api/employee         ┌──────────┐
│          │  Authorization: Bearer xxx ▶│  Server   │
│          │  ◀──────────────────       │  Verify   │
│          │  {data}                    │  JWT &    │
└─────────┘                            │  Return   │
                                       └──────────┘
```

## Token Structure

A Gauzy JWT access token contains:

```json
{
  "id": "user-uuid",
  "email": "user@example.com",
  "tenantId": "tenant-uuid",
  "employeeId": "employee-uuid",
  "role": "ADMIN",
  "iat": 1704067200,
  "exp": 1704153600
}
```

### Claims

| Claim        | Description                            |
| ------------ | -------------------------------------- |
| `id`         | User ID                                |
| `email`      | User email                             |
| `tenantId`   | User's tenant ID                       |
| `employeeId` | Associated employee ID (if applicable) |
| `role`       | User's role name                       |
| `iat`        | Issued at (Unix timestamp)             |
| `exp`        | Expiry (Unix timestamp)                |

## Configuration

### Environment Variables

```bash
# JWT secret for signing access tokens
JWT_SECRET=your-very-secure-secret-key

# Access token expiration in seconds (default: 24 hours)
JWT_TOKEN_EXPIRATION_TIME=86400

# Refresh token secret
JWT_REFRESH_TOKEN_SECRET=your-refresh-token-secret

# Refresh token expiration in seconds (default: 7 days)
JWT_REFRESH_TOKEN_EXPIRATION_TIME=604800
```

:::warning
Always use strong, unique secrets in production. Never commit secrets to version control.
:::

## Token Lifecycle

### 1. Obtain Tokens

```bash
# Login request
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@ever.co",
  "password": "admin"
}
```

Response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
  "user": { ... }
}
```

### 2. Use Access Token

Include the access token in Authorization header:

```bash
GET /api/employee
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

### 3. Refresh Token

When the access token expires, use the refresh token to get a new pair:

```bash
POST /api/auth/refresh-token
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

Response:

```json
{
  "token": "new-access-token",
  "refreshToken": "new-refresh-token"
}
```

### 4. Token Expiry Flow

```
Time ──────────────────────────────────────────▶

│◀──── Access Token Valid (24h) ────▶│
│                                     │
│  Normal API calls with token        │ Token expires → 401
│                                     │
│                                     │◀── Refresh ──▶ New tokens
│                                     │
│◀──────── Refresh Token Valid (7d) ──────────────────▶│
│                                                       │
│ Refresh token expires → User must re-login            │
```

## Passport Strategy

The JWT strategy validates tokens on every authenticated request:

```typescript
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get("JWT_SECRET"),
    });
  }

  async validate(payload: JwtPayload): Promise<IUser> {
    const { id, tenantId } = payload;
    const user = await this.userService.findOneById(id);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
```

## Token Storage

### Web Application

Tokens are stored in:

- **Local Storage** — persists across browser sessions
- **Session Storage** — cleared when browser is closed

### Desktop Application

Tokens are stored using:

- **Electron Store** — secure, encrypted local storage
- **Keychain/Credential Manager** — OS-level secure storage

### Best Practices

| Approach          | Security          | UX                     |
| ----------------- | ----------------- | ---------------------- |
| Local Storage     | ⚠️ XSS vulnerable | ✅ Persistent sessions |
| Session Storage   | ✅ Session-scoped | ⚠️ Lost on close       |
| HTTP-Only Cookies | ✅ XSS protected  | ✅ Automatic           |
| Electron Store    | ✅ Encrypted      | ✅ Native              |

## Error Responses

| Error                 | Status | Description                 |
| --------------------- | ------ | --------------------------- |
| Missing token         | `401`  | No Authorization header     |
| Invalid token         | `401`  | Token signature invalid     |
| Expired token         | `401`  | Token past `exp` time       |
| User not found        | `401`  | Token user deleted/disabled |
| Refresh token expired | `401`  | Must re-authenticate        |

## Related Pages

- [Auth Overview](./auth-overview) — authentication architecture
- [Social Auth](./social-auth) — OAuth provider setup
- [API Overview](../api/overview) — using tokens with the API
