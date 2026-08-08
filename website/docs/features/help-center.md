---
sidebar_position: 59
---

# Help Center

Build a customer-facing help center.

:::important
**Superseded by the Documents hub.** The Help Center has been consolidated into [Documents](./documents/overview), where categories become folders and articles become pages in one searchable tree — alongside uploaded files, review, and optional AI knowledge.

This page continues to work exactly as described below until an administrator enables the Documents feature for your organization. When they do, this area redirects to the hub, and its categories and articles can be imported — see [Migrating from the Legacy Pages](./documents/migrating-from-legacy). Nothing is deleted at any point.
:::

## Overview

The Help Center provides:

- Organized article categories
- Searchable content
- Public and private articles
- Multi-language support

## Setup

### Create Categories

1. Go to **Help Center** → **Categories**
2. Add categories:
   - Getting Started
   - Account & Billing
   - Time Tracking
   - Invoicing
   - Troubleshooting

### Write Articles

1. Go to **Help Center** → **Articles**
2. Click **New Article**
3. Write using the rich text editor
4. Set:
   - Category
   - Privacy (public/private)
   - Language
5. Publish

## Content Organization

```mermaid
graph TB
    HC[Help Center]
    HC --> C1[Getting Started]
    HC --> C2[Account & Billing]
    HC --> C3[Features]
    C1 --> A1[Quick Start Guide]
    C1 --> A2[First Setup]
    C2 --> A3[Billing FAQ]
    C3 --> A4[Time Tracking Guide]
    C3 --> A5[Invoice Guide]
```

## Multi-Language

Articles can be translated:

1. Open an article
2. Click **Translations**
3. Add translation for each language
4. Save

## API

Help center content is accessible via the Knowledge Base API.

## Related Pages

- [Documents Overview](./documents/overview) — the hub that supersedes this page
- [Migrating from the Legacy Pages](./documents/migrating-from-legacy) — importing articles into the hub
- [Knowledge Base](./knowledge-base) — internal knowledge
- [Comments & Mentions](./comments-and-mentions) — collaboration
