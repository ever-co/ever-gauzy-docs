---
sidebar_position: 29
---

# Comment & Mention Endpoints

Manage comments, @mentions, and reactions on entities (tasks, projects, etc.).

## Base Paths

| Resource  | Path            |
| --------- | --------------- |
| Comments  | `/api/comment`  |
| Mentions  | `/api/mention`  |
| Reactions | `/api/reaction` |

## Comment Endpoints

### List Comments

```
GET /api/comment
Authorization: Bearer {token}
```

**Query Parameters:**

| Parameter   | Type   | Description                           |
| ----------- | ------ | ------------------------------------- |
| `entity`    | string | Entity type (e.g., `Task`, `Project`) |
| `entityId`  | string | ID of the parent entity               |
| `relations` | array  | Relations to include                  |

### Get Comment by ID

```
GET /api/comment/:id
Authorization: Bearer {token}
```

### Create Comment

```
POST /api/comment
Authorization: Bearer {token}
Content-Type: application/json

{
  "entity": "Task",
  "entityId": "task-uuid",
  "comment": "This looks great! Let's proceed with the implementation.",
  "members": ["employee-uuid-1"],
  "parentId": null
}
```

**Response** `201 Created`.

### Update Comment

```
PUT /api/comment/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "comment": "Updated comment text",
  "editedAt": "2024-03-15T10:00:00.000Z"
}
```

### Delete Comment

```
DELETE /api/comment/:id
Authorization: Bearer {token}
```

## Mention Endpoints

### List Mentions

```
GET /api/mention
Authorization: Bearer {token}
```

### Create Mention

```
POST /api/mention
Authorization: Bearer {token}
Content-Type: application/json

{
  "entityId": "comment-uuid",
  "entity": "Comment",
  "mentionedUserId": "user-uuid"
}
```

## Reaction Endpoints

### List Reactions

```
GET /api/reaction
Authorization: Bearer {token}
```

### Add Reaction

```
POST /api/reaction
Authorization: Bearer {token}
Content-Type: application/json

{
  "entity": "Comment",
  "entityId": "comment-uuid",
  "emoji": "👍"
}
```

### Remove Reaction

```
DELETE /api/reaction/:id
Authorization: Bearer {token}
```

## Data Model

```typescript
interface IComment {
  id: string;
  entity: string;
  entityId: string;
  comment: string;
  actorType?: ActorTypeEnum;
  resolved?: boolean;
  resolvedAt?: Date;
  editedAt?: Date;

  // Relations
  parentId?: string;
  parent?: IComment;
  replies?: IComment[];
  members?: IEmployee[];
  creatorId?: string;
  tenantId: string;
  organizationId: string;
}

interface IMention {
  id: string;
  entityId: string;
  entity: string;
  mentionedUserId: string;
  mentionById?: string;
  parentEntityId?: string;
  parentEntityType?: string;
}

interface IReaction {
  id: string;
  entity: string;
  entityId: string;
  emoji: string;
  creatorId: string;
}
```

## Related Pages

- [Comments & Mentions Feature](../features/comments-and-mentions) — feature guide
- [Reactions Feature](../features/reactions) — emoji reactions
- [Task Endpoints](./task-endpoints) — tasks with comments
