---
sidebar_position: 4
---

# Writing Pages

Author wiki-style pages directly in the platform, with autosave, version history, and export.

## Overview

A **page** is a document you write rather than upload. Pages support headings, lists, tables, task lists, callouts, images, attachments, mentions, and math — and, like folders, they can contain child documents, so a handbook page can own its own sections.

To create one:

1. Click **New page** in the page header, or **New page** in a folder's tree menu
2. Give it a name (you can also pick an emoji icon for it)
3. Start typing

## The Editor

The editor is block-based. Start a new line and the placeholder tells you what to do: **Type '/' for commands…**

### The Slash Menu

Type `/` anywhere to insert a block. Commands are grouped:

| Group        | Commands                                                                  |
| ------------ | ------------------------------------------------------------------------- |
| **Basic**    | Text, Heading 1, Heading 2, Heading 3, Quote, Divider, Code block          |
| **Lists**    | Bullet list, Numbered list, Task list                                      |
| **Media**    | Image, Attachment, Video, Embed, Table                                     |
| **Advanced** | Callout, Warning callout, Toggle, Emoji, Math formula, Mention, Link document |

Keep typing after the `/` to filter the list.

### Formatting

Select any text and a formatting bar appears: **Bold, Italic, Underline, Strikethrough, Inline code, Add link, Highlight, Text color**, and **Turn into** for converting a block into a different one. Text alignment, subscript, and superscript are available too, and code blocks are syntax-highlighted.

### Tables

Insert a table from the slash menu — it starts as a 3 × 3 grid with a header row. Click into it and a table toolbar offers: add or delete rows and columns, toggle the header row or header column, merge cells, split a cell, and delete the table. Columns can be resized by dragging.

### Task Lists

**Task list** blocks give you checkboxes you can tick inline — useful for onboarding checklists and runbooks that people work through as they read.

### Callouts

Two callout styles are available — a neutral **Callout** for asides and a **Warning callout** for things that must not be missed.

### Images and Attachments

Insert an **Image** or **Attachment** from the slash menu, or simply **drag a file into the page** or paste it from the clipboard. Uploads show their progress inline and can be retried if they fail. An attachment block can be downloaded directly or opened in Documents.

### Mentions and Document Links

| Trigger | Inserts                                                        |
| ------- | -------------------------------------------------------------- |
| `@`     | A mention of a colleague                                       |
| `+`     | A link to another document in the hub                          |
| `:`     | An emoji                                                       |

Document links keep pages connected — a policy page can point at the contract it derives from without anyone hunting through the tree.

### Math

The **Math formula** block renders mathematical notation, for formulas in finance, engineering, or compensation documentation.

### Table of Contents

The **Contents** panel builds a live table of contents from your headings and scrolls the page when you click an entry. If a page has no headings yet, the panel tells you so.

### Info Panel

The **Info** panel reports word count, character count, estimated read time, and when the page was last updated. A **Full width** toggle widens the writing area, and there is a switch to show invisible characters when whitespace matters.

## Autosave

You never press Save. The editor saves as you type and shows its state next to the title:

| Indicator             | Meaning                                                        |
| --------------------- | -------------------------------------------------------------- |
| **Saving…**           | A save is in flight                                            |
| **Saved**             | Everything is stored                                           |
| **Offline — retrying** | The connection dropped; your work is queued and will be sent   |
| **Save failed**       | The save could not be completed — use **Retry**                |

If you try to navigate away with unsaved changes, the editor warns you first.

### If Someone Else Edited the Same Page

Should the page change elsewhere while you were writing, the editor tells you rather than silently overwriting anything, and offers two ways out:

- **Reload latest** — take the other version and discard your local changes
- **Keep mine as copy** — save your work as a separate copy so nothing is lost

## Locking a Page

Use **Lock** to freeze a finished page. A locked page shows the banner "This page is locked — viewing only" and cannot be edited until someone unlocks it. This is the right tool for a signed policy or an approved process description.

## Version History

Pages are snapshotted automatically as they are edited — by default no more often than every 10 minutes, so history stays readable. You can also force a snapshot at a meaningful moment with **Save version now**.

Open **Version history** to see the list. From there you can:

1. Select a version to preview it
2. Check that it is the one you want
3. Click **Restore** and confirm

Restoring is non-destructive: the current content is snapshotted first, so a restore can itself be undone. The confirmation says as much — "A new version will be created on top."

## Duplicating and Moving

- **Duplicate** copies a page. **Duplicate with children** copies its whole subtree.
- **Move…** re-parents a page anywhere in the tree.

A duplicated page starts fresh: it is not part of AI knowledge and carries no review state, versions, or shares from the original.

## Export

| Action              | Result                                                            |
| ------------------- | ----------------------------------------------------------------- |
| **Copy as Markdown** | Puts the page on your clipboard as Markdown                       |
| **Export Markdown** | Downloads the page as a `.md` file                                |
| **Print / PDF**     | Opens the print dialog — choose "Save as PDF" there to get a PDF   |

## Related Pages

- [Documents Overview](./overview) — the three kinds of item
- [Organizing Documents](./organizing) — moving, archiving, and finding pages
- [Sharing & Permissions](./sharing-and-permissions) — who can edit a page
- [AI Knowledge](./ai-knowledge) — making a page answerable by the assistant
- [Comments & Mentions](../comments-and-mentions) — mentions elsewhere in Gauzy
