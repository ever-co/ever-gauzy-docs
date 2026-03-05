---
sidebar_position: 8
---

# Integration Sync Failures

Troubleshoot synchronization issues with third-party integrations.

## General Steps

1. Check integration status in **Settings** → **Integrations**
2. Verify API credentials haven't expired
3. Check API rate limits on the provider side
4. Review sync logs in the activity log

## GitHub Sync Issues

| Issue          | Fix                                   |
| -------------- | ------------------------------------- |
| Token expired  | Re-authenticate via Settings          |
| Repo not found | Check repo visibility and permissions |
| Rate limited   | Wait 1 hour or use GitHub App instead |

## Hubstaff Import Issues

| Issue              | Fix                                     |
| ------------------ | --------------------------------------- |
| Token invalid      | Regenerate token in Hubstaff settings   |
| Data not appearing | Check date range filter                 |
| Duplicate entries  | Dedup is automatic; check sync settings |

## Jira Sync Issues

| Issue              | Fix                                 |
| ------------------ | ----------------------------------- |
| 401 Unauthorized   | Check API token in Jira settings    |
| Issues not syncing | Verify project mapping              |
| Status mismatch    | Map Jira statuses to Gauzy statuses |

## Upwork Sync Issues

| Issue          | Fix                         |
| -------------- | --------------------------- |
| Token expired  | Re-authorize in Settings    |
| Team not found | Check team ID configuration |

## Related Pages

- [Integrations Overview](../integrations/integrations-overview) — all integrations
- [GitHub Integration](../integrations/github-integration) — GitHub setup
- [Custom Integrations](../integrations/custom-integrations) — DIY integration
