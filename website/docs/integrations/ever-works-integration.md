---
sidebar_position: 20
---

<!-- markdownlint-disable MD013 MD043 -->

# Ever Works Integration

Two-way sync between an Ever Gauzy tenant and an [Ever Works](https://ever.works) tenant. Once an organization is
connected, what Ever Works agents work on shows up in Gauzy (and, through Gauzy, in Plane and Ever Teams), and — for
the record types set to sync to Ever Works (see [What syncs](#what-syncs)) — what people do in Gauzy is visible to agents
and people in Ever Works.

:::info Off by default
The integration ships with Gauzy but is **not loaded** unless the operator switches it on
(`EVER_WORKS_ENABLED=true`, see [Before you start](#before-you-start)). Without it there is no route, no table, no
timer and no outbound request.
:::

## What syncs

Each Gauzy organization is mapped to one Ever Works organization. Per record type you choose the direction on the
**Entities and directions** tab; the defaults are below.

| Ever Works  | Gauzy                                        | Default direction  | Other choices                |
| ----------- | -------------------------------------------- | ------------------ | ---------------------------- |
| Members     | People (employees)                           | Suggest            | Off                          |
| Agents      | Employees of kind **agent**                  | Ever Works → Gauzy | Off                          |
| Teams       | Teams                                        | Both ways          | One way (either side), off   |
| Works       | Projects                                     | Link only          | Off                          |
| Missions    | Strategic initiatives                        | Ever Works → Gauzy | Both ways, off               |
| Goals       | Goals and key results                        | Both ways          | One way (either side), off   |
| Ideas       | Tasks of the **Idea** issue type             | Both ways          | One way (either side), off   |
| Tasks       | Tasks (comments, watchers, linked issues …)  | Both ways          | One way (either side), off   |
| Inbox items | [Inbox](../plugins-built-in/inbox-plugin.md) | Ever Works → Gauzy | Off (replies always go back) |

What each one carries:

- **People.** An Ever Works member is paired with a Gauzy employee on the **People** tab. A verified, matching email
  is only a _suggestion_ that an admin confirms; nothing is paired silently.
- **Agents.** Every Ever Works agent of the mapped organization becomes a Gauzy employee of kind _agent_: no login,
  no invite, no welcome email, and left out of payroll and seat counts. Agents are managed by Ever Works, so a Gauzy
  edit to an agent is not pushed.
- **Teams.** Name, emoji and members (the lead is the team manager). Existing teams are paired on the **Teams** tab
  (same-name suggestions, or "create on the other side"); teams created later pair on their own.
- **Projects ↔ works.** Pairs are made on the **Projects** tab. For a pair, the work's name, description, website,
  repository, status, members and teams are written to the project. A Gauzy project can be created in Ever Works as a
  repo-less work on request.
- **Tasks.** Title, description (Markdown ↔ rich text), status, priority, labels ↔ tags, parent, teams, assignees
  (agents included), watchers, blockers and relations, due and start dates, the estimate, and task chat ↔ comments.
  Each Gauzy task links to its Ever Works page and, once there is one, its pull request.
- **Ideas.** An Ever Works idea is a Gauzy task of the organization's _Idea_ issue type in the "Ever Works — Ideas"
  project. Accepting and building an idea stay in Ever Works.
- **Goals.** An Ever Works goal is a Gauzy goal; its criteria, metric and Definition of Done become key results, and
  key result values are sent back as samples.
- **Missions ↔ strategic initiatives.** Paired on the **Initiatives ↔ Missions** tab. A Gauzy initiative is sent to
  Ever Works only when missions sync both ways.
- **Inbox.** Questions, approvals, escalations and notices addressed to a paired person arrive in their Gauzy Inbox;
  a reply in Gauzy answers in Ever Works and resumes the agent. See [Inbox](../plugins-built-in/inbox-plugin.md).

Knowledge-base documents ↔ Gauzy Docs is planned and not part of this version.

### Rules that always apply

- **Private records never sync.** A record its owner keeps private in Ever Works is not offered to Gauzy, and one that
  turns private stops syncing (both records are kept).
- **Team or organization scope.** A record on an Ever Works team is team-scoped on both sides (the Gauzy task,
  project, goal or initiative belongs to the paired team); a record on no team is organization-scoped. The same rule
  applies from Gauzy to Ever Works. A Gauzy record whose team is not paired yet waits until it is.
- **No autonomous spend.** What Gauzy creates in Ever Works never starts work on its own: goals are created as drafts,
  missions as paused, and ideas are never built from Gauzy.
- **Nothing is hard-deleted.** A task deleted in Ever Works is soft-deleted in Gauzy; a task deleted in Gauzy is
  cancelled in Ever Works with a comment. Either way the pair stops syncing.
- **Attribution.** A change from Ever Works is written in Gauzy as the paired person or agent (otherwise as the admin
  who connected). A change made in Gauzy is sent to Ever Works as the paired Ever Works user when there is one.
- **Conflicts.** Each side is compared with its own last-synced value. When both sides changed the same field, the
  later edit wins and the other value is kept in the sync log (and, for a description, as a comment). Ever Works'
  workflow gates have the last word on task status: a move Ever Works refuses is put back in Gauzy, with a comment
  saying why.

## Before you start

These are operator settings of the Gauzy API (`.env`). Only the exact value `true` switches a flag on; anything else
keeps it off (an unexpected value is logged once).

| Variable                                 | What it does                                                                                                                  |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `EVER_WORKS_ENABLED=true`                | Loads the integration (API and worker). Off by default.                                                                       |
| `EVER_WORKS_API_URL`                     | The Ever Works API the connect form offers, e.g. `https://api.ever.works/api`. Optional.                                      |
| `EVER_WORKS_APP_URL`                     | The Ever Works web app, e.g. `https://app.ever.works`, for the "create a key" link. Optional.                                 |
| `ENCRYPTION_KEY`                         | A base64-encoded 32-byte key; the integration key and webhook secret are stored encrypted with it.                            |
| `API_BASE_URL`                           | The public HTTPS address of the Gauzy API, where Ever Works delivers webhooks.                                                |
| `EVER_WORKS_SYNC_LOOP=off`               | Keeps one process out of the sync loop (it still serves the API).                                                             |
| `EVER_WORKS_HEALTH_CHECK=off`            | Keeps one process out of the daily key check.                                                                                 |
| `EVER_WORKS_WEBHOOK_REQUESTS_PER_MINUTE` | Per-process limit of the public webhook route (default 1200).                                                                 |
| `GAUZY_INBOX_ENABLED=true`               | Loads the [Inbox](../plugins-built-in/inbox-plugin.md), so Ever Works inbox items and the integration's notices arrive there. |

Without `API_BASE_URL` no webhook is registered; Gauzy then follows Ever Works' change feed alone (every minute), so
the sync still works, only with a little more delay.

The admin who connects needs the integration permissions (`INTEGRATION_ADD`, `INTEGRATION_EDIT`) and must be a member of
the organization being mapped.

## Connect an organization

Open **Integrations → Ever Works** (`/pages/integrations/ever-works`) with the organization selected, and follow the
wizard:

1. **Create an integration key in Ever Works.** In Ever Works open **Settings → API keys → New key** and choose the
   type **Integration**. When `EVER_WORKS_APP_URL` is set, the wizard links straight to it with the "Ever Gauzy"
   preset: `https://app.ever.works/settings/api-keys?new=integration&preset=ever-gauzy`. Name the key, pin it to the
   Ever Works organizations to sync, keep the preset scopes, and copy it: it starts with `ew_int_` and is shown once.
2. **Connect.** Enter the Ever Works API URL and the key, then **Validate**. Gauzy shows the Ever Works tenant, the
   pinned organizations, the scopes and the API version; missing preset scopes are a warning, missing required scopes
   or an incompatible API version block the connection. **Connect** stores the key encrypted; it is never shown again.
3. **Organization.** Map this Gauzy organization to one of the key's pinned Ever Works organizations.
4. **Review matches.** People, Agents, Teams, Projects and Initiatives ↔ Missions. Suggestions are preselected and
   nothing is paired until you save; you can pair by hand, remove a pairing, or create the record on the other side
   where the mapping allows it.
5. **Entities and directions.** One direction per record type (see [What syncs](#what-syncs)).
6. **Preview and start.** A dry run per phase shows what each side has, what is paired, what the sync would create and
   what is still to pair; it writes nothing. **Start** registers the webhook and runs the first sync, phase by phase:
   members, agents, teams, works, missions, goals, ideas, tasks, comments, inbox.

Mapping an organization also adds its **Idea** issue type and **Ideas** task view; the "Ever Works" and "Ever Works —
Ideas" projects are created the first time a task needs them.

## Sync settings

A mapped organization's page opens its sync settings, in tabs:

- **Overview** — the connection state, how far Gauzy is behind Ever Works' feed, the queues in both directions
  (pending, deferred, retrying, stopped), open conflicts, the last error, the pairs per record type and the running
  or last sync. **Resync**, cancel a running sync, **Pause** and **Resume**.
- **Mapping** — the same match review as in the wizard.
- **Entities and directions**.
- **Activity** — the conflicts (both values and the side that won; **Keep** or **Use the other value**) and the sync
  log, filtered by status and direction.
- **Advanced** — **Sync this organization with Ever Works** (on/off), a new **Integration key** (**Use this key**),
  **Register the webhook again**, **Disconnect from Ever Works**.
  Disconnecting keeps everything that synced on both sides, and a later reconnect resumes without duplicates.

## Troubleshooting

### The connection says "needs re-authentication"

The integration key was revoked or expired in Ever Works. The sync pauses and the admin who connected gets a notice
(an Inbox notice when the Inbox is on, otherwise a Gauzy notification). Create a new integration key for the same Ever
Works tenant and enter it under **Advanced → Integration key → Use this key**; the sync resumes where it stopped. Gauzy
also checks every key once a day.

### A change stopped ("dead letter")

A change that keeps failing is retried with growing delays and, after eight attempts, stopped. It shows in the
**Overview** counts and in the **Activity** log with the error Ever Works answered, and the admin gets a
"dead letter" notice in the Inbox naming the latest record. Fix the cause (often a missing pairing, a direction that is
off, or a record Ever Works refuses), then edit the record again or run a **Resync**.

### Gauzy is behind, or records are missing

- Run **Overview → Resync**: it reads every record in scope again, phase by phase, and pairs or updates what is
  missing (nothing is created twice). An expired change-feed cursor starts a resync on its own.
- Check that the record type's direction is not off and that the mapping is switched on.
- A record on a team that is not paired yet waits: pair the team on **Mapping → Teams**.
- Private Ever Works records never sync.
- An Ever Works inbox item waits until its recipient is paired on **Mapping → People**.

### The webhook is not registered

Without `API_BASE_URL`, or when Ever Works cannot reach the Gauzy API, Gauzy follows the change feed instead (every
minute while webhooks are quiet). Use **Advanced → Register the webhook again** once the API is reachable; the sync
keeps working meanwhile.

### A task's status went back

Ever Works decides task status with its own gates (blockers, approvals). When it refuses a move made in Gauzy, the
Gauzy task gets Ever Works' status back and a comment saying what blocked it; the event is in the **Activity** log.

### A task deleted in Gauzy is still open in Ever Works

A delete Gauzy did not capture (for example a bulk delete) is found by the sync's periodic sweep: the Ever Works task is
then cancelled with a comment, and the pair stops syncing.

## See also

- [Inbox](../plugins-built-in/inbox-plugin.md)
- [Webhooks](./webhooks.md)
- [Integrations overview](./integrations-overview.md)
