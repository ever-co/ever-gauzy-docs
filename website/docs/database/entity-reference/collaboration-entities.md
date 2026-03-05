---
sidebar_position: 13
---

# Collaboration Entities

Entities for comments, mentions, reactions, favorites, entity subscriptions, resource links, and shared entities.

## Comment

| Column         | Type     | Description              |
| -------------- | -------- | ------------------------ |
| `entity`       | string   | Target entity type       |
| `entityId`     | UUID     | Target entity ID         |
| `comment`      | string   | Comment text (HTML)      |
| `actorType`    | enum?    | `User` or `System`       |
| `resolved`     | boolean? | Resolved flag            |
| `resolvedAt`   | Date?    | Resolution timestamp     |
| `resolvedById` | UUID?    | FK to resolver           |
| `editedAt`     | Date?    | Last edit timestamp      |
| `parentId`     | UUID?    | FK to parent (threading) |
| `creatorId`    | UUID?    | FK to creator            |

**Relations:** `parent` (ManyToOne Comment), `replies` (OneToMany Comment), `members` (ManyToMany Employee)

## Mention

| Column             | Type    | Description              |
| ------------------ | ------- | ------------------------ |
| `entityId`         | UUID    | Target entity ID         |
| `entity`           | string  | Entity type              |
| `mentionedUserId`  | UUID    | FK to mentioned user     |
| `mentionById`      | UUID?   | FK to user who mentioned |
| `parentEntityId`   | UUID?   | FK to parent entity      |
| `parentEntityType` | string? | Parent entity type       |

## Reaction

| Column      | Type   | Description     |
| ----------- | ------ | --------------- |
| `entity`    | string | Entity type     |
| `entityId`  | UUID   | Entity ID       |
| `emoji`     | string | Emoji character |
| `creatorId` | UUID   | FK to creator   |

## Favorite

| Column       | Type   | Description    |
| ------------ | ------ | -------------- |
| `entity`     | string | Entity type    |
| `entityId`   | UUID   | Entity ID      |
| `employeeId` | UUID   | FK to employee |

## EntitySubscription

| Column       | Type   | Description       |
| ------------ | ------ | ----------------- |
| `entity`     | string | Entity type       |
| `entityId`   | UUID   | Entity ID         |
| `type`       | enum   | Subscription type |
| `employeeId` | UUID   | FK to subscriber  |

## ResourceLink

| Column      | Type   | Description        |
| ----------- | ------ | ------------------ |
| `entity`    | string | Parent entity type |
| `entityId`  | UUID   | Parent entity ID   |
| `title`     | string | Link title         |
| `url`       | string | Link URL           |
| `creatorId` | UUID?  | FK to creator      |

## SharedEntity

Entity sharing records for collaborative access.

| Column       | Type   | Description                |
| ------------ | ------ | -------------------------- |
| `entity`     | string | Shared entity type         |
| `entityId`   | UUID   | Shared entity ID           |
| `employeeId` | UUID   | FK to shared-with employee |

## Related Pages

- [Comment & Mention Endpoints](../../api/comment-mention-endpoints) — API reference
- [Favorite Endpoints](../../api/favorite-endpoints) — favorites API
- [Entity Subscription Endpoints](../../api/entity-subscription-endpoints) — subscriptions API
