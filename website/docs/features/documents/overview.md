---
sidebar_position: 1
---

# Documents Overview

A central hub for every document in your organization — uploaded files, wiki pages written in the platform, and the folders that hold them.

## Overview

**Documents** appears as a top-level entry in the main sidebar, directly below **Dashboards**. Everything lives in a single tree that belongs to the organization, so a file uploaded by Finance and a policy page written by HR sit side by side and are found by the same search.

The hub gives you:

- One tree of folders, pages, and files — no separate silos per department
- Search by name **or** by the text inside a file
- Categories, tags, favorites, and filters to slice the tree any way you need
- A review queue for anything that needs a human to look at it
- Optional AI knowledge, so the assistant can answer questions from your own documents

Documents is organization-scoped. The project, team, employee, and date selectors in the page header do not apply to it.

## The Three Kinds of Item

Everything in the hub is a document. What it can do depends on its kind.

| Kind       | What it is                                       | Can contain children | Created by                        |
| ---------- | ------------------------------------------------ | -------------------- | --------------------------------- |
| **Folder** | A container used to structure the tree            | ✅                   | **New folder** in the tree menu   |
| **Page**   | A wiki-style page written in the built-in editor  | ✅                   | **New page**                      |
| **File**   | An uploaded binary — PDF, spreadsheet, image, etc. | ❌                   | **Upload**, or drag & drop        |

Pages can hold children just like folders, so a "Handbook" page can own the sections beneath it without needing a wrapper folder.

## What Every Document Carries

| Property           | Description                                                              |
| ------------------ | ------------------------------------------------------------------------ |
| **Name**           | Title of the folder, page, or file (an emoji icon can be added to pages)  |
| **Categories**     | Entries from the organization's category catalog — a curated taxonomy     |
| **Tags**           | Free-form platform tags, shared with the rest of Gauzy                    |
| **Status**         | Processing lifecycle of an uploaded file: Processing, Ready, or Failed    |
| **Knowledge**      | Whether the document is part of the organization's AI knowledge           |
| **Review**         | Whether a human still needs to look at it                                 |
| **Visibility**     | Organization or Private                                                   |
| **Source**         | How it arrived: Upload, Editor, Import, System, and so on                 |
| **Linked records** | Business records this document is attached to                             |

## Linking Documents to Business Records

A contract is more useful when it hangs off the invoice it backs. Any document can be linked to records elsewhere in the platform:

| Record type  | Typical use                                     |
| ------------ | ----------------------------------------------- |
| **Invoice**  | Signed contract, purchase order, receipt        |
| **Task**     | Specification, design file, acceptance criteria |
| **Project**  | Statement of work, architecture notes           |
| **Team**     | Team charter, working agreements                |
| **Employee** | Offer letter, certification, review notes       |
| **Contact**  | NDA, proposal, customer correspondence          |

To link a record:

1. Open the document and expand the detail panel
2. Find **Linked records** and click **Link a record**
3. Choose the record type, search for the record, and confirm

Links are two-way references — removing a link never deletes the document or the record.

## Where Things Happen

| Screen                             | What you do there                                            | Needed permission |
| ---------------------------------- | ------------------------------------------------------------ | ----------------- |
| **Documents**                      | Browse the tree, search, filter, upload, open documents       | `DOCS_READ`       |
| **Documents → Review queue**       | Approve or reject documents waiting on a human                | `DOCS_REVIEW`     |
| **Settings → Documents**           | Organization defaults, category catalog, storage, AI status   | `DOCS_MANAGE`     |

## Relationship to the Rest of the Platform

Documents reuses the platform rather than duplicating it — the same tags, the same favorites, the same file storage, and the same permission system you already use elsewhere. It also supersedes two older areas:

- **Organization Documents** — the flat list of document links
- **Help Center** and the **Knowledge Base** — categorized articles

Both keep working, and their content can be imported into the hub. See [Migrating from the Legacy Pages](./migrating-from-legacy).

:::note
The Documents hub is controlled by a feature flag. If you do not see it in the sidebar, an administrator has not enabled it for your organization yet.
:::

## Related Pages

- [Uploading Files](./uploading-files) — drag & drop, supported types, processing
- [Organizing Documents](./organizing) — folders, categories, tags, search, filters
- [Writing Pages](./writing-pages) — the page editor, versions, export
- [AI Knowledge](./ai-knowledge) — grounding assistant answers in your documents
- [Sharing & Permissions](./sharing-and-permissions) — visibility and the `DOCS_*` permissions
- [Tags & Labels](../tags-and-labels) — the platform-wide tag system
- [Favorites](../favorites) — the platform-wide favorites system
