---
sidebar_position: 2
---

# Data Protection

Data handling practices, GDPR compliance, and privacy controls.

## Data Classification

| Classification | Examples               | Protection                           |
| -------------- | ---------------------- | ------------------------------------ |
| **Critical**   | Passwords, JWT secrets | Encrypted, never logged              |
| **Sensitive**  | PII, email, phone      | Encrypted at rest, access controlled |
| **Internal**   | Time logs, projects    | Tenant-isolated                      |
| **Public**     | Organization name      | No restrictions                      |

## GDPR Compliance

### Data Subject Rights

| Right                      | Implementation                |
| -------------------------- | ----------------------------- |
| **Right to Access**        | Export user data via API      |
| **Right to Rectification** | Edit profile endpoints        |
| **Right to Erasure**       | Account deletion with cascade |
| **Right to Portability**   | Data export in JSON/CSV       |
| **Right to Restriction**   | Account deactivation          |

### Data Minimization

- Collect only necessary information
- Default to Optional for non-critical fields
- Configurable screenshot retention periods
- Auto-cleanup of expired data

## Encryption

### At Rest

| Data         | Method                            |
| ------------ | --------------------------------- |
| Passwords    | bcrypt (10+ rounds)               |
| Database     | TDE (Transparent Data Encryption) |
| File storage | S3 server-side encryption         |

### In Transit

| Channel              | Method   |
| -------------------- | -------- |
| API requests         | TLS 1.2+ |
| Database connections | SSL      |
| WebSocket            | WSS      |

## Data Retention

| Data Type        |   Default Retention   |
| ---------------- | :-------------------: |
| Screenshots      |     Configurable      |
| Activity logs    |       12 months       |
| Time logs        |      Indefinite       |
| Audit logs       |       24 months       |
| Deleted accounts | 30 days (soft delete) |

## Related Pages

- [Security Overview](./security-overview)
- [Tenant Filtering](../database/tenant-filtering) — data isolation
