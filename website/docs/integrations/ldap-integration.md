---
sidebar_position: 16
---

# LDAP / Active Directory Integration

Authenticate users against LDAP or Microsoft Active Directory.

## Overview

LDAP integration enables:

- User authentication against corporate directory
- Auto-provisioning of user accounts
- Role mapping from LDAP groups
- Periodic sync of user attributes

## Configuration

```
LDAP_ENABLED=true
LDAP_URL=ldap://ldap.example.com:389
LDAP_BIND_DN=cn=admin,dc=example,dc=com
LDAP_BIND_CREDENTIALS=admin-password
LDAP_SEARCH_BASE=ou=users,dc=example,dc=com
LDAP_SEARCH_FILTER=(uid={{username}})
```

### Active Directory

```
LDAP_URL=ldap://ad.example.com:389
LDAP_BIND_DN=CN=ServiceAccount,OU=ServiceAccounts,DC=corp,DC=example,DC=com
LDAP_SEARCH_BASE=OU=Employees,DC=corp,DC=example,DC=com
LDAP_SEARCH_FILTER=(sAMAccountName={{username}})
```

## Attribute Mapping

| LDAP Attribute    | Gauzy Field   |
| ----------------- | ------------- |
| `mail`            | email         |
| `givenName`       | firstName     |
| `sn`              | lastName      |
| `memberOf`        | role (mapped) |
| `telephoneNumber` | phone         |

## Group-to-Role Mapping

```
LDAP_ROLE_MAPPING_ADMIN=CN=GauzyAdmins,OU=Groups,DC=example,DC=com
LDAP_ROLE_MAPPING_MANAGER=CN=GauzyManagers,OU=Groups,DC=example,DC=com
LDAP_ROLE_MAPPING_EMPLOYEE=CN=GauzyUsers,OU=Groups,DC=example,DC=com
```

## Related Pages

- [SSO/SAML Integration](./sso-saml-integration) — SSO setup
- [User Management](../admin/user-role-management) — user admin
