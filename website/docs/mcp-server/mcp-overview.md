---
sidebar_position: 1
---

# MCP Server Overview

The Ever Gauzy MCP (Model Context Protocol) Server enables AI assistants to interact with the Gauzy platform.

## What is MCP?

MCP is an open protocol that allows AI applications (like Claude, ChatGPT, etc.) to interact with external tools and data sources through a standardized interface.

## Production Servers

| Server | URL                    |
| ------ | ---------------------- |
| **US** | `https://mcp.gauzy.co` |
| **EU** | `https://mcp.gauzy.eu` |

## Available Tools

The MCP Server provides **323+ tools** across all Gauzy modules:

| Category          | Tool Count | Examples                            |
| ----------------- | :--------: | ----------------------------------- |
| **Employee**      |    30+     | Create, update, list employees      |
| **Time Tracking** |    40+     | Start timer, log time, timesheets   |
| **Projects**      |    25+     | Create project, manage tasks        |
| **Invoicing**     |    20+     | Generate invoice, track payments    |
| **Organization**  |    35+     | Manage departments, teams, settings |
| **CRM**           |    20+     | Contacts, pipelines                 |
| **Reports**       |    15+     | Generate analytics, statistics      |

## Connection Methods

| Transport     | Use Case            | URL               |
| ------------- | ------------------- | ----------------- |
| **HTTP/REST** | Standard API calls  | `/mcp/rest`       |
| **WebSocket** | Real-time streaming | `/mcp/ws`         |
| **Stdio**     | Local process       | Binary executable |

## Authentication

OAuth 2.0 with PKCE flow:

```bash
# 1. Get authorization URL
GET /mcp/auth/authorize?client_id=your-app&redirect_uri=...

# 2. Exchange code for token
POST /mcp/auth/token
{ "code": "auth-code", "grant_type": "authorization_code" }

# 3. Use token in requests
Authorization: Bearer <access-token>
```

## Related Pages

- [MCP Configuration](./mcp-configuration) — setup guide
- [MCP Tool Reference](./mcp-tool-reference) — complete tool list
