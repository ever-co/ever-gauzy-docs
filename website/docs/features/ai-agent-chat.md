---
sidebar_position: 94
---

# AI Agent Chat

An embedded AI assistant that answers questions about your workspace data and helps you operate the platform — browsing pages, filling forms, and submitting them with your explicit approval.

## Overview

The AI Agent Chat lives in a collapsible sidebar between the navigation menu and the page content, giving the platform a three-column layout:

```text
┌────────┬──────────────┬──────────────────────┐
│  Menu  │   AI Chat    │        Canvas        │
│        │  (sidebar)   │   (platform pages)   │
└────────┴──────────────┴──────────────────────┘
```

| Aspect           | Details                                                          |
| ---------------- | ---------------------------------------------------------------- |
| **Availability** | Users with the `AI_CHAT_ACCESS` permission, when an AI provider is configured |
| **Toggle**       | Robot icon in the navigation sidebar (next to the logo)          |
| **Position**     | Dockable to either side of the canvas                            |
| **Size**         | Drag the divider to resize; maximize to full width; detach into a separate browser window |
| **Collapse**     | Press `Escape` to collapse the sidebar                           |
| **State**        | Open/collapsed state, position, and width are remembered across sessions |
| **History**      | Conversations are saved per user and can be reopened or deleted  |

:::note
If the chat icon does not appear in the header, either your role lacks the `AI_CHAT_ACCESS` permission or no AI provider has been configured for your tenant/server. See [AI Chat Plugin](../plugins-built-in/ai-chat-plugin) for configuration.
:::

## What It Can Do

### Answer questions about your data

Ask about tasks, projects, employees, time tracking, invoices, contacts, time off, and more:

- "Which tasks assigned to me are overdue?"
- "How many hours did the design team track last week?"
- "Show me unpaid invoices for Acme Corp."

The agent queries the Gauzy API **as you** — it can only ever see data that your own user role and organization membership allow. Answers are always limited to what you could see yourself in the UI.

### Open platform pages next to the chat

The agent can navigate the canvas (the main content area) to any platform page while the conversation stays open — for example, "open the time tracking report" or "take me to the new invoice form".

### Read and fill forms — you approve

On the currently open page, the agent can:

1. **Read** the form and its current values
2. **Fill** fields based on your instructions
3. **Submit** the form — but **only after you click Approve** in the chat

:::caution
Any action that modifies data — submitting a form, creating, updating, or deleting a record — always pauses and asks for your approval in the chat before it executes. Nothing is written on your behalf without an explicit click on **Approve**.
:::

### Attach files and discuss them

Two ways to bring a document into the conversation:

- **Attach a file** (paperclip icon) — the file is uploaded into the [Documents](./documents/overview) hub (source: *Chat*), so it exists as a regular document from that moment, and it is attached to your next message.
- **Choose from the library** (folder icon) — search and pick any document you already have in Documents.

Attached documents appear as chips on your message; the assistant reads them with its document tools, in your own permission scope, and can quote and cite them. A freshly uploaded file may need a moment of processing before its text is readable — the assistant will say so and you can simply ask again.

:::note
Attaching requires the Documents feature and, for uploads, the permission to create documents. Without Documents, a basic attach still works but the assistant can only see the file's name.
:::

### Voice dictation

The microphone icon in the chat input records speech and transcribes it into the message box — a recording panel above the input shows the elapsed time and offers **Cancel**, **Done**, and an optional auto-send toggle. Dictation requires a configured provider with speech support (currently OpenAI).

## Playground

A dedicated playground page is available at `/pages/playground` for experimenting with the configured AI providers and models before (or alongside) using the embedded chat.

## Permissions

| Permission         | Grants                                                             |
| ------------------ | ------------------------------------------------------------------ |
| `AI_CHAT_ACCESS`   | Use the AI Agent Chat sidebar and playground                       |
| `AI_CHAT_SETTINGS` | Configure per-tenant AI provider API keys (Settings → AI Providers) |

Permissions are assigned per role — see [Custom Roles & Permissions](./custom-roles-permissions).

## Security Model

- The agent calls the Gauzy REST API with **your own JWT** — role-based access control and tenant isolation always apply.
- Read-only questions run directly; **mutating tools require in-chat approval**.
- Provider API keys are stored encrypted on the server and are never exposed to the browser.

## Related Pages

- [AI Chat Plugin](../plugins-built-in/ai-chat-plugin) — providers, configuration, self-hosting, and architecture
- [Custom Roles & Permissions](./custom-roles-permissions)
- [Permissions Reference](../reference/permissions-reference)
