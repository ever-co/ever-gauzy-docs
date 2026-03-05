---
sidebar_position: 12
---

# Changelog Plugin

Automatically track and log changes to entities in an audit trail.

## Overview

The Changelog plugin provides entity-level change tracking — recording who changed what, when, and what the previous values were.

## How It Works

The plugin intercepts entity save operations and creates `ActivityLog` records with:

- Changed entity type and ID
- Action type (created, updated, deleted)
- Updated fields and their previous/new values
- Actor (user or system)

## Configuration

The plugin is enabled by default. Configure via environment variables:

| Variable            | Description               | Default |
| ------------------- | ------------------------- | ------- |
| `CHANGELOG_ENABLED` | Enable/disable the plugin | `true`  |

## Usage

Once enabled, all entity changes are automatically logged. View the changelog:

1. Navigate to any entity detail page
2. Click the **History** / **Changelog** tab
3. View the chronological list of changes

## Related Pages

- [Activity Log Endpoints](../api/activity-log-endpoints) — API reference
- [Audit Logging](../security/audit-logging) — security auditing
