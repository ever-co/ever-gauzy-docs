---
sidebar_position: 2
---

# MCP Configuration

Configure and connect to the Ever Gauzy MCP Server.

## Environment Variables

```bash
# MCP Server Settings
MCP_SERVER_ENABLED=true
MCP_SERVER_PORT=3100
MCP_SERVER_HOST=0.0.0.0

# OAuth Configuration
MCP_OAUTH_CLIENT_ID=your-client-id
MCP_OAUTH_CLIENT_SECRET=your-client-secret
MCP_OAUTH_REDIRECT_URI=http://localhost:3100/callback

# Transport Configuration
MCP_TRANSPORT=http    # http, ws, stdio
MCP_WS_PATH=/mcp/ws
MCP_REST_PATH=/mcp/rest
```

## Client Configuration

### Claude Desktop

```json
{
  "mcpServers": {
    "ever-gauzy": {
      "url": "https://mcp.gauzy.co/sse",
      "transport": "sse",
      "headers": {
        "Authorization": "Bearer your-token"
      }
    }
  }
}
```

### VS Code (Cline / Continue)

```json
{
  "mcp.servers": {
    "ever-gauzy": {
      "url": "https://mcp.gauzy.co/mcp/rest",
      "transport": "http",
      "auth": {
        "type": "oauth2",
        "clientId": "your-client-id"
      }
    }
  }
}
```

### Stdio (Local)

```json
{
  "mcpServers": {
    "ever-gauzy": {
      "command": "npx",
      "args": ["-y", "@ever-co/gauzy-mcp-server"],
      "env": {
        "API_BASE_URL": "http://localhost:3000",
        "AUTH_TOKEN": "your-token"
      }
    }
  }
}
```

## Related Pages

- [MCP Overview](./mcp-overview) — features and capabilities
- [MCP Tool Reference](./mcp-tool-reference) — complete tool list
