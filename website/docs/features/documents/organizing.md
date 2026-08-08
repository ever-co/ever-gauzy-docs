---
sidebar_position: 3
---

# Organizing Documents

Structure the tree, classify with categories and tags, and find anything again with search and filters.

## Overview

The Documents page has three parts: the **tree** on the left, the **list** in the middle (as a table or as cards), and a **detail panel** for whatever you select. The tree is the structure; categories, tags, and filters are how you cut across it.

## The Folder Tree

The tree sidebar shows three sections:

| Section           | Contents                                     |
| ----------------- | -------------------------------------------- |
| **All documents** | The full tree, starting at the root          |
| **Favorites**     | Documents you have starred                   |
| **Recents**       | Documents you opened recently                |

Folders load their children as you expand them, so a large tree stays fast. You can collapse the whole sidebar to give the list more room; the choice is remembered on your device.

Right-click (or use the "…" button on) any node for its menu:

**New folder · New page · Upload here · Rename · Move… · Duplicate · Duplicate with children · Copy link · Archive · Restore · Delete**

**Copy link** puts a direct link to that document on your clipboard — handy for chat messages and task descriptions.

## Moving and Re-Parenting

Two ways to move something:

- **Drag it** in the tree onto its new parent
- Open **Move…** from the node menu, search for the destination folder, and click **Move here**

A document can never be moved into its own subtree — the tree refuses the drop and the dialog explains why. Moving a folder takes everything inside it along.

## Categories vs Tags

Both classify a document, but they are not the same thing and they are managed differently.

| | **Categories** | **Tags** |
| --- | --- | --- |
| Purpose | Curated business taxonomy | Free-form labelling |
| Managed by | Administrators, in **Settings → Documents** | Anyone, inline |
| Scope | The Documents hub | The whole platform |
| Examples | Invoice, Contract, Policy, HR, Legal | `q4`, `urgent`, `client-acme` |
| Set automatically | Yes, when AI classification is on | No — AI suggests, but never creates tags |

In short: **categories classify, tags label**. Use categories to answer "what kind of document is this?" and tags for anything else.

## Favorites

Click the star on a document to add it to **Favorites**. Favorites use the platform-wide favorites system, so they behave like favorites everywhere else in Gauzy.

## Archiving, and Archive Before Delete

Archiving takes a document out of everyday view without destroying anything. Archived documents keep their content, their links, and their history — they are simply filtered out by default and excluded from AI answers.

- **Archive** a document from its node menu or detail panel
- Archiving a **folder** archives everything inside it
- **Restore** puts it back

Deleting is deliberately a two-step action: **a document must be archived before it can be deleted.** The delete button only appears once a document is archived. This makes accidental one-click destruction of a folder tree impossible.

When you delete a folder that still has contents, you choose what happens to them:

| Option                                       | Result                                        |
| -------------------------------------------- | --------------------------------------------- |
| **Delete everything inside it**              | The folder and its whole subtree are removed   |
| **Keep children and move them up one level** | Only the folder goes; its contents are promoted |

## Search

The search box sits above the list, with a toggle for what it searches:

| Mode         | Searches                                                   |
| ------------ | ---------------------------------------------------------- |
| **Names**    | Document names only — fast, matches as you type            |
| **Content**  | The text read out of files, plus the content of pages       |

Content search needs a slightly longer query than name search — type at least three characters before it runs.

### Keeping a Document Out of Content Search

Each file has a **Searchable content** switch in its detail panel. Turn it off and only the name, categories, and tags will match — the content is skipped. This is the right control for a document that should stay in the hub but must not surface in content search or AI answers.

## Filters

The filter bar narrows the list. Everything combines.

**Presets** — one-click starting points:

| Preset                | Shows                                          |
| --------------------- | ---------------------------------------------- |
| **All**               | Everything (the default)                       |
| **Needs review**      | Documents waiting for a human                  |
| **Not in AI knowledge** | Documents that are not part of AI answers    |
| **Archived**          | Archived documents                             |

**Facets** — multi-select, each showing a live count of matching documents: Kind, Status, Knowledge, Source, Category, Tag.

**Date ranges** — filter by **Created** or **Updated**.

**Clear all** resets everything back to the default view.

### Sharing a Filtered View

The filters live in the page address. Once you have the view you want, copy the URL from your browser and send it to a colleague — they will open the same filtered list, subject to their own permissions. Bookmarking works the same way.

### Saved Views

**Saved views** store the current filter set under a name so you can jump back to it. As the dialog says, saved views are kept **on this device only** — they do not follow you to another browser and cannot be shared with colleagues. Use the URL for that.

## Table and Cards

Switch the list between **Table** and **Cards** with the view toggle. Table view is denser and sortable; cards view is easier to scan for files with previews. Your choice is remembered.

## Bulk Actions

Select several documents with their checkboxes and a bulk bar appears. Available actions:

| Action                       | Notes                                             |
| ---------------------------- | ------------------------------------------------- |
| **Archive** / **Unarchive**  | Same rules as archiving one document               |
| **Set categories**           | Replaces each document's full category set         |
| **Add tags** / **Remove tags** | Adds or removes without touching other tags      |
| **Move**                     | Requires you to pick a destination folder          |
| **Import to knowledge** / **Exclude from knowledge** | See [AI Knowledge](./ai-knowledge) |
| **Approve** / **Reject**     | See [Reviews & Approvals](./reviews-and-approvals) |
| **Delete**                   | Only affects documents that are already archived   |

Bulk actions run per document and report back how many succeeded and how many failed, with a copyable report of anything that did not work.

## Related Pages

- [Documents Overview](./overview) — the three kinds of item
- [Uploading Files](./uploading-files) — getting files in
- [Settings](./settings) — managing the category catalog
- [Tags & Labels](../tags-and-labels) — the platform-wide tag system
- [Bulk Operations](../bulk-operations) — bulk actions elsewhere in Gauzy
