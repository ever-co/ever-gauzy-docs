---
sidebar_position: 8
---

# Documents Settings

Organization defaults, the category catalog, storage, and the deployment settings an administrator controls.

## Overview

Open **Settings → Documents**. The screen needs the `DOCS_MANAGE` permission and is organized as four cards:

1. **AI knowledge status** — what this deployment can actually do
2. **Organization defaults** — what new documents inherit
3. **Storage** — how much of the quota is in use
4. **Categories** — the category catalog

## AI Knowledge Status

A read-only report of the deployment's capabilities, so you know why AI features behave the way they do before changing anything else.

| Line                            | Meaning                                                                     |
| ------------------------------- | --------------------------------------------------------------------------- |
| **Vector search is available**  | Meaning-based search is working                                             |
| **Vector search is unavailable** | Answers fall back to keyword search                                        |
| **An embedding provider is configured** | Documents can be prepared for AI answers                            |
| **No embedding provider is configured** | Documents cannot be indexed — AI answers will not work              |
| **Embedding model**             | The model currently in use                                                  |

If either line shows a warning, see [Environment Settings](#environment-settings-for-administrators) below.

## Organization Defaults

Three settings that apply to newly created documents in this organization.

| Setting                                  | Effect                                                                  |
| ---------------------------------------- | ----------------------------------------------------------------------- |
| **Add uploads to AI knowledge by default** | Pre-selects the AI knowledge option on the upload dialog               |
| **Classify with AI**                     | Default for the upload dialog's own **Classify with AI** toggle, which suggests categories, tags, and a summary. Uploaders can override it per batch |
| **Visibility**                           | Whether new documents start as Organization or Private                  |

:::tip
Setting **Visibility** to **Private** by default suits organizations handling sensitive material — documents then start closed and are opened deliberately, rather than the other way round.
:::

## Storage

Shows how much storage the organization's documents occupy, with a progress bar and a warning as you approach the limit.

Two things people are often surprised by:

- **Archived files still count.** As the hint says, the usage figure "counts every uploaded file, including archived ones — their bytes still exist."
- **When the limit is reached, new uploads are rejected.** They are not silently truncated.

If the organization has no quota, the card simply reports total usage instead.

## The Category Catalog

Categories are the curated taxonomy used to classify documents (and what AI classification chooses from). Each organization starts with eleven:

**Invoice · Contract · Report · Policy · Customer List · Expense · HR · Legal · Meeting Notes · Specification · Other**

The table lists each category with its color, description, and how many documents use it. You can:

| Action     | Notes                                                                          |
| ---------- | ------------------------------------------------------------------------------ |
| **New category** | Add one of your own with a name, color, and description                  |
| **Edit**   | Rename, recolor, or describe any category, including the built-in ones          |
| **Merge into…** | Move every document into another category and remove this one              |
| **Delete** | Only available for categories you created                                       |

Built-in categories are marked **System**. They can be renamed and merged but not deleted, so classification never breaks because a category vanished underneath it.

:::note
Keep the catalog small and meaningful. AI classification picks from this list, and a catalog of eighty near-identical categories produces worse suggestions than one of a dozen clear ones.
:::

## Environment Settings for Administrators

The Documents hub works with no configuration at all: files upload, their text is read out, and they become searchable. Everything below is optional tuning applied when the platform starts, and all of it ships commented out.

:::warning
**AI features are on by default**, and it is safe to leave them on with no provider configured — the AI stages are additionally gated on a provider having credentials, so nothing is attempted until one exists. Set `GAUZY_DOCS_AI_ENABLED=false` to keep them off even where a provider IS configured. Documents reuses the platform's AI chat providers, including per-tenant keys.
:::

### AI and Knowledge

| Variable                                   | Default                  | Controls                                                                    |
| ------------------------------------------ | ------------------------ | --------------------------------------------------------------------------- |
| `GAUZY_DOCS_AI_ENABLED`                    | `true`                   | Master switch for classification, summaries, and embeddings                 |
| `GAUZY_DOCS_OCR_ENABLED`                   | `true`                   | Reads scanned PDFs and images — **one model call per page**                 |
| `GAUZY_DOCS_OCR_MAX_PAGES`                 | `20`                     | Page ceiling per document, so one large scan cannot run away                |
| `GAUZY_DOCS_CLASSIFY_MODEL`                | AI chat default model    | Model used to classify documents                                            |
| `GAUZY_DOCS_EMBEDDING_MODEL`               | `text-embedding-3-small` | Model used to prepare documents for AI answers                              |
| `GAUZY_DOCS_EMBEDDING_DIMS`                | `1536`                   | Vector dimensions — must match the storage column                           |
| `GAUZY_DOCS_EMBED_BATCH_SIZE`              | `64`                     | How many passages are embedded per request                                  |
| `GAUZY_DOCS_CLASSIFY_SAMPLE_CHARS`         | `4000`                   | How much of a document is sampled for classification                        |
| `GAUZY_DOCS_VECTOR_STORE`                  | best available           | Pins the search backend; degrades to keyword search when unavailable        |
| `GAUZY_DOCS_RETRIEVAL_TOPK_MAX`            | `12`                     | Maximum passages returned for one question                                  |
| `GAUZY_DOCS_CHUNK_TOKENS`                  | `512`                    | Size of each passage                                                        |
| `GAUZY_DOCS_CHUNK_OVERLAP_TOKENS`          | `64`                     | Overlap between neighbouring passages                                       |
| `GAUZY_DOCS_AUTO_REINDEX_ON_MODEL_CHANGE`  | `false`                  | Re-prepare every document when the embedding model changes                  |
| `GAUZY_DOCS_RETRIEVAL_LOG_ENABLED`         | `true`                   | Logs query length, result counts, and latency — never the query text        |

Meaning-based search needs PostgreSQL with vector support. On other databases, or when that support is missing, retrieval falls back to keyword search automatically and the settings screen reports it.

:::warning
Leave `GAUZY_DOCS_AUTO_REINDEX_ON_MODEL_CHANGE` off unless you mean it. Changing the embedding model re-prepares every document in the deployment, which costs real money at your AI provider.
:::

### Uploads and Processing

| Variable                              | Default                | Controls                                                         |
| ------------------------------------- | ---------------------- | ---------------------------------------------------------------- |
| `GAUZY_DOCS_MAX_FILE_SIZE`            | `52428800` (50 MB)     | Maximum size of a single uploaded file                           |
| `GAUZY_DOCS_MAX_EXTRACTED_CHARS`      | `5000000`              | Cap on how much text is stored per document                      |
| `GAUZY_DOCS_MAX_BINARY_BYTES`         | `10485760` (10 MB)     | Cap on a page's stored editing data                              |
| `GAUZY_DOCS_QUEUE_CONCURRENCY`        | `2`                    | How many documents are processed at once per server              |
| `GAUZY_DOCS_STUCK_THRESHOLD_MINUTES`  | `30`                   | How long before a stalled document is picked up again            |

### Storage and Versions

| Variable                               | Default | Controls                                                              |
| -------------------------------------- | ------- | --------------------------------------------------------------------- |
| `GAUZY_DOCS_ORG_QUOTA_BYTES`           | `0`     | Default storage quota per organization; `0` means unlimited            |
| `GAUZY_DOCS_VERSION_DEBOUNCE_MINUTES`  | `10`    | Minimum minutes between automatic version snapshots while editing      |

A per-organization quota overrides the deployment default.

### Inbound Email Capture (Advanced)

Documents emailed to a per-organization address can land in the hub for review. This is off unless it is explicitly enabled **and** a webhook secret is set. Captured documents always go through review first and are never added to AI knowledge automatically.

| Variable                                  | Default              | Controls                                     |
| ----------------------------------------- | -------------------- | -------------------------------------------- |
| `GAUZY_DOCS_INBOUND_EMAIL_ENABLED`        | `true`               | Master switch for inbound capture            |
| `GAUZY_DOCS_INBOUND_DOMAIN`               | unset                | Domain used for capture addresses            |
| `GAUZY_DOCS_INBOUND_WEBHOOK_SECRET`       | unset                | Shared secret used to sign inbound messages  |
| `GAUZY_DOCS_INBOUND_MAX_MESSAGE_BYTES`    | `26214400` (25 MB)   | Maximum size of one inbound message          |

:::note
The defaults above are the values that apply when a variable is left unset. The sample environment file shows illustrative values on some of these lines; because those lines are commented out, they are examples rather than the effective defaults.
:::

## Turning Documents On or Off

The hub is governed by the **Documents** feature. Administrators enable or disable it per organization in **Settings → Features**. When it is off, the sidebar entry disappears and the older Organization Documents and Help Center pages behave exactly as they always have — see [Migrating from the Legacy Pages](./migrating-from-legacy).

## Related Pages

- [Documents Overview](./overview) — what the hub is
- [AI Knowledge](./ai-knowledge) — what the AI settings actually change
- [Sharing & Permissions](./sharing-and-permissions) — who can reach this screen
- [Migrating from the Legacy Pages](./migrating-from-legacy) — the feature flag and import
- [Configuration](../../getting-started/configuration) — platform-wide environment settings
