---
sidebar_position: 18
---

<!-- markdownlint-disable MD013 MD043 -->

# Inbox

The Gauzy **Inbox** brings together everything addressed to a user: questions, approvals, escalations and notices, with
each user's own read, archive and snooze state. It is a general Gauzy feature and works without Ever Works; the
[Ever Works integration](../integrations/ever-works-integration.md) is its first source: questions and approvals of Ever
Works agents land here, and a reply in Gauzy goes back to Ever Works and resumes the agent.

:::info Off by default
The Inbox is loaded only when the operator sets `GAUZY_INBOX_ENABLED=true` (exactly). Without it there is no route, no
table and no menu entry, and the app looks exactly as before.
:::

## Switch it on

| Variable                         | What it does                                                                                                                          |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `GAUZY_INBOX_ENABLED=true`       | Loads the Inbox: the `/api/inbox` routes, its tables (migrations for PostgreSQL, MySQL, SQLite), the menu entry and the header badge. |
| `GAUZY_INBOX_EMAIL_ENABLED=true` | Also loads the Inbox's email features (provider accounts; mailboxes and inbound email follow). Needs `GAUZY_INBOX_ENABLED=true`.      |
| `EMAIL_PROVIDER_<NAME>_ENABLED`  | Each email provider plugin (Resend, Postmark, Mailgun, SendGrid, Amazon SES) has its own switch.                                      |
| `ENCRYPTION_KEY`                 | A base64-encoded 32-byte key; email provider credentials are stored encrypted with it.                                                |

Turning it on grants, in every tenant, `INBOX_VIEW`, `INBOX_MAILBOX_MANAGE` and `INBOX_MAILBOX_READ_ALL` to the
_Super Admin_ and _Admin_ roles, and `INBOX_VIEW` to _Manager_ and _Employee_. With the email features off, every
email still goes out over SMTP exactly as before.

## Using the Inbox

Open **Inbox** (`/pages/inbox`); the bell in the header shows your unread count (read every minute, and at once after
you change an item).

- **Tabs:** All, Decisions (open questions, approvals and escalations), Email, **Notifications**, Snoozed and Archived.
  _Notifications_ are Gauzy's own employee notifications, shown here for the first time in the web app.
- **Filters:** kind, source, unread only, and text search.
- **Question:** pick one of the options (the recommended one is highlighted) or answer in your own words. When the
  question asks for a reason, the answer needs text.
- **Approval:** Approve or Reject, with a note.
- **Escalation:** what was tried, the decision needed and the confidence, with a note that resolves it.
- **Notice:** read-only.
- **Per item:** mark read or unread, archive or unarchive, snooze (an hour, until tomorrow, until next week, or wake it
  now), and open the linked task, project or agent.

Your read, archive and snooze state is yours alone: on an item shared by several people, each has their own.

## Items from Ever Works

With the [Ever Works integration](../integrations/ever-works-integration.md) on, the questions, approvals, escalations
and notices Ever Works addresses to a person arrive in that person's Gauzy Inbox, linked to the task, project and agent
they are about.

- An item reaches you only once your Ever Works account is paired with your Gauzy employee (**Integrations → Ever
  Works → Mapping → People**). Until then it waits and is tried again every hour, so it arrives within an hour of the
  pairing.
- **Replies are sent at once**, as you, and resume the agent's work in Ever Works. If the item was already decided in
  Ever Works, Gauzy says so and shows the answer Ever Works holds.
- Read / unread and archive follow to Ever Works; snoozing stays in Gauzy.

The integration also uses the Inbox for its own notices to the admin who connected it (`source` _System_):

- **Needs re-authentication** — the integration key was revoked or expired; enter a new one in the sync settings.
- **Dead letter** — a change could not be synced after repeated attempts; the notice names the latest record.

A repeat of the same notice updates it and marks it unread again rather than adding a new one.

## Real time

When an item is created, the Inbox announces `inbox_item.created` on the platform's event stream. The event is
**addressed**: the subscription surface delivers it only to the item's recipients, never to other users of the tenant.
It carries the item's id, kind, source, status and priority — never its title, body or answer — so a client that
hears about an item reads it through the Inbox API. GraphQL clients holding `EVENT_OUTBOX_VIEW` subscribe with
`subscription { events(names: ["inbox_item.created"]) { eventId data } }`; a typed field for every Inbox user is planned.
The web app keeps its one-minute badge refresh.

## API

All routes are under `/api/inbox` and need `INBOX_VIEW`. The recipient is always the signed-in user, taken from the
credential and never from a parameter.

| Method | Path                   | What                                                                                                                        |
| ------ | ---------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| GET    | `/items`               | My items, newest first: `?tab=all\|decisions\|email\|snoozed\|archived`, `kind`, `source`, `unread`, `q`, `cursor`, `limit` |
| GET    | `/items/counts`        | `{ unread, decisionsOpen, byMailbox }` — what the header badge shows                                                        |
| GET    | `/items/:id`           | One of my items, with my state                                                                                              |
| POST   | `/items/:id/reply`     | `{ text?, optionId? }` — answered by the item's source at once (its refusal reaches you)                                    |
| PATCH  | `/items/:id/state`     | `{ isRead?, isArchived?, snoozedUntil? }` — my state only                                                                   |
| POST   | `/items/mark-all-read` | `{ tab? }`                                                                                                                  |

## See also

- [Ever Works integration](../integrations/ever-works-integration.md)
- [Email integration](../integrations/email-integration.md)
