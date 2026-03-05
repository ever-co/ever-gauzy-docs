---
sidebar_position: 51
---

# Language Endpoints

Manage available languages for organizations.

## Base Path

```
/api/language
```

## Endpoints

### List Languages

```
GET /api/language
Authorization: Bearer {token}
```

**Response:**

```json
{
  "items": [
    { "id": "uuid", "name": "English", "code": "en", "is_system": true },
    { "id": "uuid", "name": "Spanish", "code": "es", "is_system": true }
  ],
  "total": 30
}
```

### Create Language

```
POST /api/language
Authorization: Bearer {token}
```

```json
{
  "name": "Japanese",
  "code": "ja",
  "description": "Japanese language",
  "color": "#FF0000"
}
```

### Update Language

```
PUT /api/language/:id
Authorization: Bearer {token}
```

### Delete Language

```
DELETE /api/language/:id
Authorization: Bearer {token}
```

## System Languages

System languages are seeded automatically and cannot be deleted. They include:

- English (en)
- Spanish (es)
- French (fr)
- German (de)
- Portuguese (pt)
- Russian (ru)
- Chinese (zh)
- Arabic (ar)
- And more...

## Related Pages

- [Organization Languages](../features/organization-languages) — org language config
- [i18n](../frontend/i18n) — frontend translations
