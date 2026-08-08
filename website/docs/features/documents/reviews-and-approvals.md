---
sidebar_position: 6
---

# Reviews & Approvals

The review queue is where documents that need a human decision wait — and the reason AI-derived content never quietly becomes a source of truth.

## Overview

Most documents never need reviewing. Some do: a scan whose text could not be read, a file the classifier was unsure about, or content the AI itself wrote. Rather than let those slip into search results and AI answers unnoticed, the hub flags them and puts them in one place.

Open it from **Documents → Review queue**. You need the `DOCS_REVIEW` permission to act there; anyone can see that a document is flagged, because it carries a **Needs review** badge and a banner:

> **This document needs review** — It stays out of AI answers until someone approves it.

## What Puts a Document Into Review

| Reason                  | What happened                                                              |
| ----------------------- | -------------------------------------------------------------------------- |
| **Extraction failed**   | The file's text could not be read, so nothing can search or summarize it    |
| **Low confidence**      | AI classification was unsure about what this document is                    |
| **AI generated**        | The content was produced by AI rather than written by a person              |
| **Requested manually**  | Somebody asked for a human to look at it                                    |

The queue shows the reason as a badge on each row, along with the confidence score where there is one, so you can triage the obvious cases quickly.

## Reviewing

Each row gives you the document's name, why it is flagged, its source, its categories, and when it changed. From there:

1. Click the info button to open the **details**, or the eye to **preview** the file
2. Decide
3. Click **Approve** or **Reject**

**Reject** offers an optional reason. Recording why something was rejected is worth the extra few seconds — the next person to open the document will see it.

You can also select multiple rows and use **Approve** or **Reject** from the bulk bar.

## Requesting a Review

Anyone who can edit a document can send it for review: open the detail panel and click **Request review**. An optional reason can be attached.

> The document moves to the review queue and stays out of AI answers until someone approves it.

This is the only way into the queue when AI features are switched off, and it is genuinely useful on its own — flagging a policy that looks out of date, or a contract nobody has confirmed is the signed copy.

## The Rule That Matters

**AI-derived content that has not been approved stays out of AI answers.**

Concretely:

| State                                                        | Used in AI answers |
| ------------------------------------------------------------ | ------------------ |
| Waiting for review because it was **AI generated**            | ❌                 |
| Waiting for review because of **low confidence**              | ❌                 |
| **Rejected** for any reason                                   | ❌                 |
| **Approved**                                                  | ✅                 |
| Waiting for review because extraction failed or somebody asked | ✅ *               |

\* These two reasons flag a document for human attention without cutting it off — a manually flagged document that is already in AI knowledge keeps working while it waits, and a document whose text could not be read has nothing to contribute either way.

The point of the rule is to stop a machine's guess becoming a machine's evidence. If AI wrote something, or AI was unsure what something was, a person decides before it can shape the next answer.

:::note
Approving a document does not import it into AI knowledge. The two are separate decisions — see [AI Knowledge](./ai-knowledge).
:::

## Related Pages

- [AI Knowledge](./ai-knowledge) — importing, excluding, and what is excluded
- [Uploading Files](./uploading-files) — fixing failed extraction
- [Sharing & Permissions](./sharing-and-permissions) — who holds `DOCS_REVIEW`
- [Approval Workflows](../approval-workflows) — approvals elsewhere in Gauzy
