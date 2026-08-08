---
sidebar_position: 9
---

# Migrating from the Legacy Pages

What happens to Organization Documents and the Help Center when the Documents hub is switched on, and how to bring their content across.

## Overview

The Documents hub replaces two older areas:

- **Organization Documents** — a flat list of document names and links
- **Help Center** and the **Knowledge Base** — categorized articles

Nothing about them is removed. Their data stays where it is, their APIs keep responding, and no content is deleted at any point in this process. What changes is where people are sent in the interface, and that is controlled by a switch you own.

## Both Keep Working

Until an administrator enables the Documents feature for an organization, absolutely nothing changes:

- Organization Documents and Help Center appear in the sidebar as before
- Their pages behave exactly as they always have
- The Documents hub does not appear at all

This is the default state. Enabling Documents is a deliberate act, and it can be reversed.

## The Feature Flag

The hub is governed by the **Documents** feature, toggled per organization in **Settings → Features**.

| Feature state | Sidebar shows                                   | Legacy pages                                        |
| ------------- | ----------------------------------------------- | ---------------------------------------------------- |
| **Off**       | Organization Documents, Help Center              | Work normally                                        |
| **On**        | Documents                                        | Redirect to the Documents hub                        |
| **Off again** | Organization Documents, Help Center              | Work normally again — nothing was lost               |

Because it is per organization, a multi-organization deployment can pilot the hub with one team before rolling it out everywhere.

## Redirect Behavior

Once Documents is enabled, opening a legacy Organization Documents or Help Center URL takes you to the Documents hub instead. Old links in emails, tasks, and bookmarks keep working rather than landing on a dead page — you simply arrive at the new home.

The legacy route that used to open the "add document" dialog opens the Documents upload dialog instead, so that habit survives too.

:::note
Redirects change navigation only. The legacy data is untouched, and turning the feature off restores the original pages immediately.
:::

## Importing Legacy Content

Redirects move people. Importing moves content. It is a separate step, and one you should always rehearse first.

The import is run by an administrator holding `DOCS_MANAGE`:

```bash
# Dry run — reads, maps, validates, writes NOTHING (this is the default)
POST /api/plugins/docs/migrations/import-legacy
{ "dryRun": true }

# Real run — requires dryRun to be set explicitly to false
POST /api/plugins/docs/migrations/import-legacy
{ "dryRun": false }

# Optionally limit the sources
POST /api/plugins/docs/migrations/import-legacy
{ "dryRun": false, "sources": ["organization-document"] }

# Undo a run
POST /api/plugins/docs/migrations/import-legacy/rollback
```

:::tip
**Dry run is the default.** Calling the import without asking for a real run gives you the complete report — everything that would be created, skipped, or flagged — with no changes made. Read that report before running it for real.
:::

Both runs return the same report: how many items were **scanned**, **created**, **skipped**, and **failed**, plus any **warnings**.

### What Maps to What

| Legacy item                       | Becomes                                        | Notes                                                              |
| --------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------ |
| The organization documents list    | A folder named **Organization Documents**       | Created once, as the home for the imported list                    |
| An organization document          | A **file**                                      | The existing stored file is reused — nothing is copied or re-uploaded |
| A document with no file           | A file marked **Failed**, flagged for review    | Warned about in the report                                          |
| A document that was only a link   | A file flagged for review                       | Warned about, so somebody can attach the real file                  |
| A help center base or category     | A **folder**                                    | Icon, color, description, and ordering are carried over            |
| A help center article              | A **page**                                      | Content is converted for the new editor                            |
| A draft article                    | A page marked **Needs review**                  | Drafts are not silently published                                  |
| A private article or category      | A **Private** document                          | Warned about — see below                                            |
| An orphaned article or category    | Parked in a **Help Center (recovered)** folder  | Nothing is dropped because its parent was missing                   |
| Article revisions                  | Version history entries                         | Counted separately in the report                                    |

Everything imports as **not in AI knowledge**. The import never puts anything into AI answers on your behalf.

Duplicate names are given a numbered suffix rather than overwriting each other.

:::warning
Privacy is now enforced. In the Help Center, marking an article private mostly affected how it was displayed. In the Documents hub, **Private** genuinely restricts who can open a document. Anything that was private comes across as Private and is flagged in the report — review those items so nobody loses access to something they need.
:::

### Running It Twice Is Safe

The import is idempotent. Re-running it only brings across legacy items that do not already have an imported copy. Archived and deleted copies count as existing, so a second run will not resurrect something you deliberately removed. If a run is already in progress for an organization, a second request is refused rather than allowed to overlap.

### Rolling Back

The rollback removes the documents a migration created. It is deliberately conservative:

- Imported documents that have been **edited since the import** are left alone
- Imported folders that now contain **non-imported** documents are left alone
- Nothing physical is deleted — file storage is untouched, and the legacy tables are never modified

A forced rollback overrides the first two rails. Even then it does not delete anything that was not created by the migration; documents that ended up inside a removed folder are moved up to the top of the tree instead.

:::note
The import and rollback are run against the API today. A screen for this in **Settings → Documents** is planned for a later release.
:::

## Suggested Rollout

1. Enable **Documents** for one organization
2. Run the import as a **dry run** and read the report
3. Fix anything obviously wrong in the legacy data, then dry run again
4. Run it for real
5. Review everything flagged **Needs review**, especially items that became Private
6. Decide, document by document, what belongs in [AI knowledge](./ai-knowledge)
7. Repeat for the remaining organizations

## Related Pages

- [Documents Overview](./overview) — what replaces the legacy pages
- [Settings](./settings) — the feature toggle and organization defaults
- [Reviews & Approvals](./reviews-and-approvals) — clearing what the import flagged
- [Organization Documents](../organization-documents) — the legacy list
- [Help Center](../help-center) — the legacy customer-facing help center
- [Knowledge Base](../knowledge-base) — the legacy internal knowledge base
