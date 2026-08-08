---
sidebar_position: 5
---

# AI Knowledge

Let the AI assistant answer questions from your own documents — deliberately, one document at a time.

## Overview

Every document in the hub is searchable. Only the documents you **import into AI knowledge** can be used by the AI assistant to answer questions.

That distinction is the whole point of the feature. Uploading a file puts it in the hub; importing it into knowledge is a separate, explicit, reversible decision. Nothing is ever added to AI knowledge automatically without someone choosing it.

:::warning
**AI features are turned off by default.** Classification, summaries, and AI answers only work once an administrator enables them for the deployment **and** an AI provider is configured. Until then, uploads still have their text read out and stay fully searchable — you simply get keyword search instead of AI answers. See [Settings](./settings).
:::

## Uploaded vs Imported

| | **Uploaded only** | **Imported into AI knowledge** |
| --- | --- | --- |
| Stored in the hub | ✅ | ✅ |
| Found by name search | ✅ | ✅ |
| Found by content search | ✅ | ✅ |
| Used by the AI assistant to answer questions | ❌ | ✅ |

The **Knowledge** badge on each document tells you where it stands:

| Badge                 | Meaning                                                   |
| --------------------- | --------------------------------------------------------- |
| **Not in knowledge**  | Present in the hub, never imported                        |
| **Queued**            | Waiting to be processed for AI knowledge                  |
| **Indexing**          | Being prepared right now                                  |
| **In AI knowledge**   | Available to the assistant                                |
| **Indexing failed**   | Something went wrong — try importing again                |
| **Excluded**          | Deliberately opted out                                    |

## Importing a Document

1. Open the document and expand the detail panel
2. Switch on **In AI knowledge** (or use **Import to AI knowledge**)

The document is prepared in the background — its text is split into passages so that the assistant can quote the right part of a long file rather than the whole thing. The badge moves to **In AI knowledge** when it is ready.

You can also select many documents at once and use **Import to knowledge** from the bulk bar.

:::tip
Administrators can make **Add to AI knowledge** the default for new uploads in **Settings → Documents**, so a team that wants everything answerable does not have to remember to flip the switch each time.
:::

## Excluding a Document

Turn the switch off, or use **Exclude from AI knowledge**. The document's prepared passages are deleted and it stops contributing to answers immediately. The document itself, its file, its history, and its links are untouched — only its participation in AI answers ends.

Use this for anything confidential enough that it should not surface in an answer to a colleague's question, even if that colleague could open the document directly.

## Re-Indexing

If a document's content changes — you corrected its extracted text, or edited a page substantially — use **Re-index** in the detail panel to prepare it again. Documents whose content has not actually changed are skipped, so re-indexing is cheap and safe to repeat.

## Automatic Categorization and Summaries

When AI is enabled, each uploaded file is also read once for classification. That produces:

- **Categories** — one to three suggestions from the organization's category catalog, added to whatever you set yourself. Categories you chose are never removed.
- **An AI summary** — a sentence or two describing what the document is, shown in the detail panel. **Regenerate summary** re-runs it.
- **Suggested tags** — proposals only. The assistant never creates tags on its own.
- **A confidence score** — how sure the classifier was.

If confidence is low, the document is sent to the [review queue](./reviews-and-approvals) instead of being trusted silently.

## How the Assistant Uses Documents

When you ask the AI assistant a question, it can search your organization's imported documents and read the relevant passages before answering. Two things are worth knowing:

- **Your permissions apply.** The assistant searches as *you*. It can never surface a document you would not be allowed to open — private documents you have no access to simply are not there.
- **Answers point back at the source.** Retrieved passages carry their location — heading, page number, or spreadsheet sheet — so an answer can be traced to the document it came from and checked.

Search combines meaning-based and keyword matching where the deployment supports it. Where it does not, it falls back to keyword search automatically; administrators can see which mode is active in **Settings → Documents**.

## What Keeps a Document Out of Answers

A document is excluded from AI answers if **any** of these is true:

- It is not imported into AI knowledge, or its import has not finished
- It is **Excluded**
- Its **Searchable content** switch is off
- It is archived or deleted
- It was **rejected** in review
- It is AI-derived content still waiting for review — see below
- The person asking would not be allowed to open it

### The Review Safety Rule

Content that the AI produced or classified with low confidence does **not** feed back into AI answers until a human approves it. That closes the loop where a machine's guess becomes a machine's source of truth. Full detail in [Reviews & Approvals](./reviews-and-approvals).

## Related Pages

- [Reviews & Approvals](./reviews-and-approvals) — the review queue and the safety rule
- [Settings](./settings) — enabling AI, the category catalog, knowledge status
- [Uploading Files](./uploading-files) — correcting the text AI answers rely on
- [Sharing & Permissions](./sharing-and-permissions) — who may import documents
