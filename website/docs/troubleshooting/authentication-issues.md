---
sidebar_position: 3
---

# Authentication Troubleshooting

Resolve login, JWT, and OAuth issues.

## Invalid Credentials

**Symptom:** `401 Unauthorized` on login

**Fixes:**

1. Verify email and password are correct
2. Check if user account is active
3. Verify the user exists in the database
4. Check `BCRYPT_SALT_ROUNDS` hasn't changed

## JWT Token Expired

**Symptom:** `401` after some time

**Fix:** The token has expired. Refresh it or increase expiration:

```
JWT_TOKEN_EXPIRATION_TIME=86400  # 24 hours
```

## Refresh Token Invalid

**Symptom:** `401` on token refresh

**Fixes:**

1. Tokens are single-use; don't retry with spent tokens
2. Check `JWT_REFRESH_SECRET` matches the signing secret
3. Verify `JWT_REFRESH_EXPIRATION_TIME` hasn't passed

## Social Auth Callback Error

**Symptom:** OAuth login redirects to error page

**Fixes:**

1. Verify callback URL matches in OAuth provider settings
2. Check `GOOGLE_CALLBACK_URL` / `GITHUB_CALLBACK_URL` is correct
3. Ensure client secret hasn't been rotated

## Password Reset Failed

**Symptom:** `Password Reset Failed` error

**Fixes:**

1. Password must meet complexity requirements (8+ chars, uppercase, lowercase, number, special char)
2. Check SMTP is configured for reset emails
3. Verify the reset token hasn't expired

## Can't Login After Deploy

**Symptom:** All users get 401 after deployment

**Fix:** `JWT_SECRET` must be the same across deployments. If changed, all existing tokens become invalid. Users must re-login.

## Related Pages

- [Auth Endpoints](../api/auth-endpoints) — auth API
- [JWT Authentication](../authentication/jwt-authentication) — JWT details
- [Password Security](../security/password-security) — password policies
