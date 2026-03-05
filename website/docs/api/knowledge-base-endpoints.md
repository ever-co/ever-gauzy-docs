---
sidebar_position: 60
---

# Knowledge Base Endpoints

Manage knowledge base articles and categories.

## Base Path

```
/api/knowledge-base
```

## Article Endpoints

### List Articles

```
GET /api/knowledge-base/article
Authorization: Bearer {token}
```

### Create Article

```
POST /api/knowledge-base/article
Authorization: Bearer {token}
```

```json
{
  "name": "How to Track Time",
  "data": "<h1>Time Tracking Guide</h1><p>Follow these steps...</p>",
  "categoryId": "category-uuid",
  "privacy": "PUBLIC",
  "index": 1
}
```

### Update Article

```
PUT /api/knowledge-base/article/:id
Authorization: Bearer {token}
```

### Delete Article

```
DELETE /api/knowledge-base/article/:id
Authorization: Bearer {token}
```

## Category Endpoints

### List Categories

```
GET /api/knowledge-base/category
Authorization: Bearer {token}
```

### Create Category

```
POST /api/knowledge-base/category
Authorization: Bearer {token}
```

```json
{
  "name": "Getting Started",
  "description": "Beginner guides",
  "icon": "book-outline",
  "color": "#3366FF"
}
```

## Article Privacy

| Value   | Description       |
| ------- | ----------------- |
| PUBLIC  | Visible to all    |
| PRIVATE | Organization only |

## Related Pages

- [Knowledge Base](../features/knowledge-base) — feature guide
- [Help Center](../features/help-center) — help center
