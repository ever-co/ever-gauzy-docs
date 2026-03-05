---
sidebar_position: 13
---

# Knowledge Base Plugin

In-app knowledge base with categorized articles for self-service support.

## Overview

The Knowledge Base plugin provides a structured help center within the application:

- **Categories** — organize articles by topic
- **Articles** — searchable help content
- **Authors** — track article contributors

## Features

| Feature         | Description                     |
| --------------- | ------------------------------- |
| Article editor  | Rich text article editing       |
| Categories      | Hierarchical topic organization |
| Search          | Full-text article search        |
| Draft/Published | Article lifecycle management    |
| Multilingual    | Articles in multiple languages  |

## API

- `GET /api/knowledge-base` — list categories
- `GET /api/knowledge-base/:id` — get category
- `POST /api/knowledge-base` — create category
- `GET /api/knowledge-base-article` — list articles
- `POST /api/knowledge-base-article` — create article

## Related Pages

- [Plugin Development Guide](../plugin-development-guide) — build custom plugins
