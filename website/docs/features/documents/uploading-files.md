---
sidebar_position: 2
---

# Uploading Files

Get PDFs, spreadsheets, contracts, and scans into the Documents hub, and understand what happens to them afterwards.

## Overview

There are three ways to upload:

- **Drag & drop** — drop files anywhere on the Documents page. A hint appears as soon as you start dragging.
- **Upload button** — click **Upload** in the page header.
- **Upload here** — right-click any folder in the tree and choose **Upload here** to preselect the destination.

You can upload **up to 10 files at once**, and each file may be up to **50 MB** by default. Administrators can lower or raise the size limit for a deployment — see [Settings](./settings).

## The Upload Dialog

Before the upload starts you can set everything the files should inherit:

| Field                 | Description                                                                    |
| --------------------- | ------------------------------------------------------------------------------ |
| **Destination folder** | Where the files land in the tree — defaults to the folder you were browsing     |
| **Categories**        | Categories applied to every file in this batch                                  |
| **Tags**              | Tags applied to every file in this batch                                        |
| **Add to AI knowledge** | Make these documents available to AI-powered answers                          |
| **Visibility**        | Organization or Private                                                         |

Each file gets its own progress row. If one fails, the rest continue — use **Retry** on the failed row, or **Clear finished** to tidy up the list.

:::note
Whether uploads are automatically classified by AI is an organization-wide setting, not a per-upload choice. An administrator controls it in **Settings → Documents**.
:::

## Supported File Types

Uploads are checked by inspecting the file's actual content, not just its extension. A file whose content does not match its extension is rejected with "This file's content doesn't match its extension".

| Format                | Extensions            |
| --------------------- | --------------------- |
| PDF                   | `.pdf`                |
| Word                  | `.docx`               |
| Excel                 | `.xlsx`               |
| PowerPoint            | `.pptx`               |
| OpenDocument Text     | `.odt`                |
| OpenDocument Spreadsheet | `.ods`             |
| CSV                   | `.csv`                |
| Plain text            | `.txt`                |
| Markdown              | `.md`                 |
| HTML                  | `.html`, `.htm`       |
| Images                | `.png`, `.jpg`, `.jpeg`, `.webp`, `.gif` |

:::warning
SVG files and other XML-based markup are never accepted, in any form. They can carry active content that would run in a colleague's browser, so the hub rejects them outright rather than trying to clean them.
:::

## What Happens During Processing

Every uploaded file moves through a short lifecycle. The current stage is shown as a badge in the table and in the detail panel.

| Status         | Meaning                                                                  |
| -------------- | ------------------------------------------------------------------------ |
| **Processing** | The file is stored and its text is being read out                        |
| **Ready**      | Processing finished — the file is searchable and can be previewed        |
| **Failed**     | The text could not be read; the file itself is safe and still downloadable |

Reading the text out is what makes content search and AI answers possible. It works for:

**PDF · Word (`.docx`) · Excel (`.xlsx`) · CSV · plain text · Markdown · HTML**

Other accepted formats — PowerPoint, OpenDocument files, and images — upload and store correctly, but their text cannot be read yet. They finish as **Failed** and go to the review queue so somebody notices. The file itself is intact: it can be downloaded, previewed, linked, categorized, and tagged like any other.

:::tip
A **Failed** status only ever means "the text could not be read". It never means the file was lost or damaged.
:::

## When Extraction Fails

Open the document and use the detail panel:

1. **Retry** — re-runs processing. Useful after a transient problem.
2. **Edit extracted text** — type or paste the text yourself (see below).
3. Do nothing — the file stays usable as a plain attachment.

A failed file is flagged **Needs review** with the reason **Extraction failed**, so it turns up in the [review queue](./reviews-and-approvals) instead of quietly disappearing.

## Correcting Extracted Text

Scans, unusual layouts, and multi-column PDFs can produce messy text. Because search and AI answers read that text, it is worth fixing.

1. Open the document's detail panel
2. Click **Edit extracted text**
3. Correct the text — the dialog reminds you that "search and AI answers use this text"
4. Click **Save & re-index**

Once you have edited the text by hand it is protected: re-running processing will not silently overwrite your corrections.

## Storage

Uploads count against the organization's storage quota if one is set. Archived files still count — their bytes still exist. Administrators can see current usage in **Settings → Documents**.

## Related Pages

- [Documents Overview](./overview) — what the hub is
- [Organizing Documents](./organizing) — folders, categories, search
- [Reviews & Approvals](./reviews-and-approvals) — the review queue
- [AI Knowledge](./ai-knowledge) — adding documents to AI answers
- [Settings](./settings) — size limits and storage quota
