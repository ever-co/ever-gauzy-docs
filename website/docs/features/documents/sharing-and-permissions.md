---
sidebar_position: 7
---

# Sharing & Permissions

Who can see a document, who can change it, and how to share something private with specific people.

## Overview

Access to a document is decided by two things working together:

1. **Your role's permissions** — what you may do with documents in general
2. **The document's visibility** — who that particular document is for

Sharing sits on top as an additive overlay: it can grant access to a private document, and it never takes access away.

## Visibility

Every document is either visible to the organization or private.

| Visibility       | Who can open it                                                        |
| ---------------- | ---------------------------------------------------------------------- |
| **Organization** | Everyone in the organization who can read documents                     |
| **Private**      | The creator, administrators, and the people or teams it is shared with  |

Change it from the document's detail panel. The hint in the UI says it plainly: "Private documents are visible to you, admins and people you share them with".

Visibility is **not inherited** — putting a private document inside a public folder does not make it public, and vice versa. Navigating *to* a document does still depend on being able to see the folders above it.

An organization-wide default for new documents can be set in **Settings → Documents**.

## Sharing a Private Document

Sharing only applies to **private** documents. If a document is visible to the whole organization there is nothing to grant, and the share dialog says so:

> This document is visible to the whole organization, so sharing adds nothing. Switch it to Private to share it with specific people or teams.

To share:

1. Open the document and click **Share**
2. Choose **Person** or **Team**
3. Pick exactly one person or one team
4. Choose the access level
5. Click **Add**

| Access level    | Grants                                                       |
| --------------- | ------------------------------------------------------------ |
| **Can view**    | Opening, previewing, and downloading the document            |
| **Can comment** | Viewing, plus commenting once document comments arrive        |
| **Can edit**    | Viewing plus changing the document                            |

Two limits are worth knowing:

- **"Can edit" is not a permission grant.** As the dialog notes, it "only takes effect for people who also have permission to edit documents". Sharing cannot give somebody an ability their role does not have.
- **Only the document's creator or an administrator can share it.**

Use **Remove access** to revoke a share at any time.

:::note
Comment threads on documents are not available yet — the **Can comment** level is in place ready for them. For now, treat it as equivalent to **Can view**.
:::

## The `DOCS_*` Permissions

Seven permissions control the Documents hub. They can be adjusted per role in **Settings → Roles & Permissions**.

| Permission        | Allows                                                                                    |
| ----------------- | ----------------------------------------------------------------------------------------- |
| `DOCS_READ`       | Browse the tree, search, open documents, download files                                   |
| `DOCS_CREATE`     | Create folders and pages, upload files, duplicate documents                                |
| `DOCS_UPDATE`     | Edit documents, move, rename, archive, share, link records, correct extracted text         |
| `DOCS_DELETE`     | Delete archived documents                                                                  |
| `DOCS_MANAGE`     | Open Documents settings, manage the category catalog, run the legacy import                |
| `DOCS_REVIEW`     | Approve and reject documents in the review queue                                            |
| `DOCS_AI_IMPORT`  | Import documents into AI knowledge, exclude them, and re-index                              |

## Default Role Matrix

This is what each role gets out of the box.

| Role            | READ | CREATE | UPDATE | DELETE | MANAGE | REVIEW | AI IMPORT |
| --------------- | :--: | :----: | :----: | :----: | :----: | :----: | :-------: |
| **Super Admin** |  ✅  |   ✅   |   ✅   |   ✅   |   ✅   |   ✅   |       ✅       |
| **Admin**       |  ✅  |   ✅   |   ✅   |   ✅   |   ✅   |   ✅   |       ✅       |
| **Manager**     |  ✅  |   ✅   |   ✅   |   ✅   |   ❌   |   ✅   |       ✅       |
| **Employee**    |  ✅  |   ✅   |   ✅   |   ❌   |   ❌   |   ❌   |       ❌       |
| **Data Entry**  |  ✅  |   ✅   |   ✅   |   ❌   |   ❌   |   ❌   |       ❌       |
| **Viewer**      |  ✅  |   ❌   |   ❌   |   ❌   |   ❌   |   ❌   |       ❌       |
| **Candidate**   |  ❌  |   ❌   |   ❌   |   ❌   |   ❌   |   ❌   |       ❌       |
| **Interviewer** |  ❌  |   ❌   |   ❌   |   ❌   |   ❌   |   ❌   |       ❌       |

A few consequences of these defaults:

- **Employees can write.** The hub is not read-only for staff — they can create pages, upload files, and edit what they own.
- **Managers can review and delete but cannot administer.** A manager cannot change the category catalog or the organization defaults; that stays with administrators.
- **Candidates and interviewers see nothing.** Documents does not appear in their sidebar at all.

:::tip
These are defaults, not fixed rules. Roles are editable in **Settings → Roles & Permissions**, and custom roles can be given any combination of the seven.
:::

## Related Pages

- [Documents Overview](./overview) — where each screen lives
- [Reviews & Approvals](./reviews-and-approvals) — what `DOCS_REVIEW` unlocks
- [AI Knowledge](./ai-knowledge) — what `DOCS_AI_IMPORT` unlocks
- [Settings](./settings) — what `DOCS_MANAGE` unlocks
- [Custom Roles & Permissions](../custom-roles-permissions) — editing roles
