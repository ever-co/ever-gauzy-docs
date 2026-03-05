---
sidebar_position: 50
---

# Employee Phone Endpoints

Manage employee phone numbers.

## Base Path

```
/api/employee-phone
```

## Endpoints

### List Employee Phones

```
GET /api/employee-phone
Authorization: Bearer {token}
```

### Add Phone Number

```
POST /api/employee-phone
Authorization: Bearer {token}
```

```json
{
  "employeeId": "uuid",
  "phoneNumber": "+1234567890",
  "phoneType": "MOBILE"
}
```

### Update Phone

```
PUT /api/employee-phone/:id
Authorization: Bearer {token}
```

### Delete Phone

```
DELETE /api/employee-phone/:id
Authorization: Bearer {token}
```

## Phone Types

| Type   | Description  |
| ------ | ------------ |
| MOBILE | Mobile phone |
| WORK   | Work phone   |
| HOME   | Home phone   |
| FAX    | Fax number   |

## Related Pages

- [Employee Endpoints](./employee-endpoints) — employee API
- [Employee Sub-Resource Endpoints](./employee-sub-resource-endpoints) — sub-resources
