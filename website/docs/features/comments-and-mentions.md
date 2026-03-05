---
sidebar_position: 33
---

# Comments & Mentions

A rich commenting system with @mention support for discussions on tasks, projects, and other entities.

## Overview

Gauzy provides a full-featured commenting system that enables:

- Threaded discussions on any entity (tasks, projects, etc.)
- @mention colleagues to notify them
- Rich text formatting
- Comment resolution workflow
- Activity tracking for all comments

## Adding Comments

1. Open any task or entity detail view
2. Scroll to the comments section
3. Type your comment in the editor
4. Use `@` to mention team members
5. Click **Submit**

## Threading

Comments support parent-child threading:

- Reply to specific comments to create threads
- Threads can be collapsed/expanded
- Each reply notifies the original commenter

## @Mentions

Type `@` followed by a name to mention someone:

- Mentioned users receive a notification
- Mentions link to user profiles
- Mentions are tracked in the Mention entity for auditing

## Comment Resolution

| Status       | Description                     |
| ------------ | ------------------------------- |
| **Open**     | Active discussion               |
| **Resolved** | Discussion resolved by a member |

Comments can be marked as resolved with:

- Resolution timestamp
- ID of the user who resolved

## Actor Types

| Type     | Description               |
| -------- | ------------------------- |
| `User`   | Comment from a human user |
| `System` | Automated system comment  |

## API Reference

See [Comment & Mention Endpoints](../api/comment-mention-endpoints) for the complete API documentation.

## Related Pages

- [Reactions](./reactions) — emoji reactions on comments
- [Entity Subscriptions](./entity-subscriptions) — subscribe for comment notifications
- [Task Management](./task-management) — tasks with comments
