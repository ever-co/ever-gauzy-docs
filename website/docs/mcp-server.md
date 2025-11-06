# Ever Gauzy MCP Server

> **Transform Your Ever® Gauzy™ Platform into an AI-Powered Workspace**

The Ever Gauzy MCP Server enables AI assistants like Claude, ChatGPT, and other AI tools to directly interact with your Gauzy platform through a secure, production-ready Model Context Protocol implementation. Manage projects, track time, handle HR operations, and execute business workflows using natural language through AI assistants.

## 🌐 Production Servers

Our remote MCP infrastructure is ready for immediate use:

| Service | Production | Demo |
|---------|-----------|------|
| **MCP Server** | `https://mcp.gauzy.co` | `https://mcpdemo.gauzy.co` |
| **Auth Server** | `https://mcpauth.gauzy.co` | `https://mcpauthdemo.gauzy.co` |
| **Status** | ✅ Live | ✅ Live |

**What this means for you:**
- No installation or hosting required
- Enterprise-grade infrastructure with 99.9% uptime
- OAuth 2.0 secured endpoints
- Automatic scaling and load balancing
- Real-time operations with WebSocket support
- Global CDN for optimal performance

---

## 🎯 What Can You Do?

The Gauzy MCP Server transforms how you interact with business operations. Instead of clicking through interfaces, simply tell your AI assistant what you need:

### Project Management
- **"Show me all active projects and their current status"**
- **"Create a new project called 'Mobile App Redesign' with a 3-month timeline"**
- **"Assign 5 developers to the backend API project"**
- **"What projects are behind schedule this week?"**

### Time Tracking & Productivity
- **"Start tracking time on the authentication feature"**
- **"Show my team's time logs for the last sprint"**
- **"Generate a weekly timesheet report for all employees"**
- **"Who worked the most hours on the frontend project?"**

### Task Management
- **"Create 10 tasks from this requirements document and assign them to the team"**
- **"Show all high-priority tasks due this week"**
- **"Update task status to 'In Review' and add completion notes"**
- **"Bulk assign all QA tasks to the testing team"**

### HR & Employee Management
- **"Add a new employee to the development team"**
- **"Show employee performance metrics for Q4"**
- **"Process leave requests pending approval"**
- **"Track employee skills and certifications across the organization"**

### Financial Operations
- **"Generate invoices for all completed projects this month"**
- **"Process expense claims submitted last week"**
- **"Create payment records for contractor work"**
- **"Show revenue breakdown by project and client"**

### Sales & CRM
- **"Show all deals in the pipeline with 'Negotiation' status"**
- **"Create a new sales opportunity for the enterprise client"**
- **"Update contact information for all marketing leads"**
- **"Track deal progression through sales stages"**

---

## 🔥 Key Features

### 323 Business Tools Across 22 Categories

The remote MCP server provides comprehensive access to your entire Gauzy platform:

**Core Operations (90 tools)**
- **Employee Management** (15) - Full employee lifecycle, profiles, organization members
- **Task Management** (16) - Complete CRUD with bulk operations and analytics
- **Project Management** (14) - Project lifecycle, assignments, team collaboration
- **Daily Planning** (17) - Personal and team planning with task integration
- **Organization Contacts** (17) - Contact management with bulk operations
- **Time Tracking** (3) - Start/stop timers, status monitoring
- **Authentication** (5) - Secure login, token refresh, session management
- **Testing & Diagnostics** (3) - Connection tests, health checks, capability enumeration

**Financial Management (37 tools)**
- **Payments** (14) - Payment processing and management
- **Expenses** (9) - Expense tracking and reporting
- **Invoices** (14) - Invoice creation and management

**Business Operations (196+ tools)**
- **Candidate Management** (15) - Recruitment and hiring workflows
- **Sales & CRM** (23) - Deals, pipelines, opportunity tracking
- **Goal Management** (24) - OKR system with objectives and key results
- **Inventory & Equipment** (21) - Asset tracking and warehouse management
- **Product Management** (18) - Catalog management and categorization
- **Time Off Management** (20) - Leave requests, PTO tracking, approvals
- **Skills Management** (10) - Competency tracking and development
- **Merchant Management** (14) - Vendor and supplier relationships
- **Income Management** (13) - Revenue tracking and analysis
- **Activity Logging** (12) - Audit trails and user actions
- **Content & Communication** (15) - Comments, discussions, collaboration
- **Reporting** (4) - Analytics and custom reports
- **HR & Awards** (7) - Recognition programs and achievements

### 🔒 Enterprise-Grade Security

**OAuth 2.0 Authorization Flow**

The remote MCP server implements a complete OAuth 2.0 authorization framework:

1. **Client Registration** - Register your application with the MCP Auth Server
2. **Authorization Request** - User authenticates and grants permissions
3. **Token Exchange** - Receive JWT access and refresh tokens
4. **Secure API Access** - All requests validated with Bearer tokens
5. **Automatic Refresh** - Seamless token renewal without interruption

**Security Features:**
- **JWT Token Validation** - Public key cryptography (RS256, ES256)
- **JWKS Endpoint** - Dynamic key rotation support
- **Token Introspection** - Real-time validation (RFC 7662)
- **Scope-Based Access Control** - Fine-grained permissions
- **TLS 1.3 Encryption** - End-to-end secure transport
- **Rate Limiting** - 100 requests per 15-minute window
- **CSRF Protection** - State parameter validation
- **Audit Logging** - Complete request/response tracking

### ⚡ Production Infrastructure

**Multi-Transport Architecture**

The remote server supports three connection methods:

1. **HTTP/REST Transport** (`https://mcp.gauzy.co/sse`)
   - JSON-RPC 2.0 over HTTPS
   - Server-Sent Events for real-time updates
   - CORS-enabled for web applications
   - Session management with Redis
   - Perfect for web apps, mobile apps, and API integrations

2. **WebSocket Transport** (`wss://mcp.gauzy.co/sse`)
   - Persistent bidirectional connections
   - Real-time push notifications
   - Compression enabled (per-message deflate)
   - 16MB payload support
   - Ideal for dashboards, live monitoring, real-time collaboration

3. **Stdio Transport** (via NPM package)
   - Direct process communication
   - Zero network overhead
   - Best for Claude Desktop and local AI assistants
   - Automatic transport detection

**High Availability:**
- **Load Balanced** - Multiple server instances
- **Redis Sessions** - Shared state across instances
- **Health Monitoring** - `/health` endpoint with readiness checks
- **Automatic Failover** - Zero-downtime deployments
- **Horizontal Scaling** - Handles thousands of concurrent users

### 🚀 Developer Experience

**Automatic Token Management**
- Tracks token expiration with 10-second buffer
- Refreshes tokens automatically before expiry
- Maintains organization and tenant context
- Zero-configuration for end users

**Session Persistence**
- Redis-backed multi-user sessions
- 30-minute TTL (configurable)
- Session hijacking protection
- Cross-instance session sharing

**Error Handling**
- Descriptive error messages
- Validation errors with field details
- Automatic retry on transient failures
- Debug mode for troubleshooting

**Tool Discovery**
- `tools/list` - Enumerate all 323 available tools
- Complete JSON schemas for all tool parameters
- Zod validation for type safety
- Comprehensive tool descriptions

---

## 🏗️ How the Remote MCP Server Works

### Architecture Overview

The Gauzy remote MCP infrastructure consists of two main production services that work together to provide secure, scalable AI assistant integration:

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────────┐
│   AI Assistant  │         │   MCP Server     │         │   Gauzy API     │
│  (Claude, etc)  │◄───────►│  mcp.gauzy.co    │◄───────►│  api.gauzy.co   │
│                 │  MCP    │                  │  REST   │                 │
│  - Claude       │  Proto  │  323 Tools       │  API    │  - Projects     │
│  - ChatGPT      │  col    │  - HTTP/WS       │         │  - Tasks        │
│  - Custom Apps  │         │  - Sessions      │         │  - Employees    │
│                 │         │  - Rate Limit    │         │  - Timesheets   │
└─────────────────┘         └──────────────────┘         └─────────────────┘
         │                           │
         │      OAuth 2.0            │
         │      Tokens               │
         │                           │
         └──────────────┬────────────┘
                        │
                        ▼
              ┌──────────────────┐
              │   Auth Server    │
              │ mcpauth.gauzy.co │
              │                  │
              │  - OAuth 2.0     │
              │  - JWT Tokens    │
              │  - JWKS          │
              │  - User Auth     │
              └──────────────────┘
                        │
                        ▼
                  ┌──────────┐
                  │  Redis   │
                  │ Sessions │
                  └──────────┘
```

### Component Details

#### 1. MCP Server (`mcp.gauzy.co`)

The production MCP server is the main entry point for all AI assistant interactions:

**Core Responsibilities:**
- **Tool Execution** - Processes 323 tool invocations from AI assistants
- **Request Routing** - Translates MCP protocol to Gauzy API calls
- **Session Management** - Maintains multi-user sessions across instances
- **Authentication** - Validates OAuth tokens and manages Gauzy API authentication
- **Rate Limiting** - Protects backend from abuse (100 req/15min)
- **Response Formatting** - Converts API responses to MCP-compatible format

**Transport Endpoints:**
- `POST /sse` - JSON-RPC 2.0 endpoint for MCP requests
- `GET /sse/events` - Server-Sent Events stream
- `GET /health` - Health check and readiness probe
- `GET /.well-known/oauth-protected-resource` - OAuth metadata

**Processing Flow:**
1. Client sends JSON-RPC request (e.g., `tools/call` with `list_projects`)
2. HTTP/WebSocket transport receives and parses request
3. Session middleware extracts user session from Redis
4. OAuth middleware validates Bearer token against Auth Server
5. Tool handler validates parameters with Zod schema
6. AuthManager ensures valid Gauzy API token (auto-refresh if needed)
7. ApiClient makes authenticated request to Gauzy API
8. Response transformed to MCP format
9. Result returned to client via transport layer
10. Session activity timestamp updated in Redis

#### 2. Auth Server (`mcpauth.gauzy.co`)

Dedicated OAuth 2.0 authorization server providing enterprise authentication:

**Core Responsibilities:**
- **User Authentication** - Validates Gauzy credentials
- **Token Issuance** - Generates JWT access and refresh tokens
- **Client Management** - OAuth client registration and validation
- **Token Validation** - Introspection endpoint for token verification
- **Key Management** - RSA/ECDSA key pairs with JWKS endpoint

**OAuth Endpoints:**
- `GET /oauth2/authorize` - Authorization endpoint (browser-based)
- `POST /oauth2/token` - Token exchange endpoint
- `POST /oauth2/introspect` - Token introspection (RFC 7662)
- `POST /oauth2/register` - Dynamic client registration (RFC 7591)
- `GET /oauth2/userinfo` - OpenID Connect user info
- `GET /.well-known/oauth-authorization-server` - Server metadata (RFC 8414)
- `GET /.well-known/jwks.json` - JSON Web Key Set for token validation

**Supported Grant Types:**
- **Authorization Code + PKCE** - For web and mobile applications
- **Refresh Token** - Long-lived access without re-authentication
- **Client Credentials** - For machine-to-machine communication

**Token Structure:**
```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 900,
  "refresh_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "scope": "mcp.read mcp.write"
}
```

**JWT Claims:**
```json
{
  "iss": "https://mcpauth.gauzy.co",
  "sub": "user-id",
  "aud": "https://mcp.gauzy.co/sse",
  "exp": 1735654800,
  "iat": 1735654000,
  "scope": "mcp.read mcp.write",
  "tenant_id": "tenant-123",
  "organization_id": "org-456"
}
```

#### 3. Session Management (Redis)

Redis provides distributed session storage for horizontal scaling:

**Session Data Structure:**
```javascript
{
  sessionId: "mcp-session-abc123",
  userId: "user-id",
  tenantId: "tenant-123",
  organizationId: "org-456",
  gauzyAccessToken: "gauzy-jwt-token",
  gauzyRefreshToken: "gauzy-refresh-token",
  tokenExpiry: 1735654800000,
  metadata: {
    ipAddress: "192.168.1.1",
    userAgent: "Claude Desktop/1.0",
    createdAt: "2025-01-30T10:00:00Z",
    lastActivity: "2025-01-30T10:30:00Z"
  },
  ttl: 1800000  // 30 minutes
}
```

**Session Security:**
- IP address and User-Agent validation (session hijacking prevention)
- Automatic cleanup of expired sessions
- Sliding TTL on each request (maintains active sessions)
- Cross-instance session sharing for load balancing

### Request Flow Example

Let's trace a complete request: **"Show all active projects"**

1. **AI Assistant** (Claude Desktop):
   ```json
   {
     "jsonrpc": "2.0",
     "id": 1,
     "method": "tools/call",
     "params": {
       "name": "list_projects",
       "arguments": {
         "filter": { "active": true }
       }
     }
   }
   ```

2. **MCP Server** receives request at `https://mcp.gauzy.co/sse`

3. **Session Middleware** extracts session cookie → Redis lookup → Session validated

4. **OAuth Middleware** extracts `Authorization: Bearer <token>` header:
   - Checks Redis cache for token validation result
   - If not cached: Fetches JWKS from `https://mcpauth.gauzy.co/.well-known/jwks.json`
   - Validates JWT signature, expiry, audience, issuer
   - Caches validation result (5 min TTL)

5. **Tool Handler** `list_projects`:
   - Validates `filter` parameter with Zod schema
   - Checks Gauzy API token expiry (stored in session)
   - If expired: Calls Gauzy `/auth/refresh` with refresh token
   - Updates session with new tokens

6. **API Client** makes request:
   ```
   GET https://api.gauzy.co/api/projects?active=true
   Authorization: Bearer <gauzy-token>
   ```

7. **Gauzy API** returns projects data

8. **MCP Server** formats response:
   ```json
   {
     "jsonrpc": "2.0",
     "id": 1,
     "result": {
       "content": [
         {
           "type": "text",
           "text": "Found 5 active projects:\n1. Mobile App (Due: 2025-03-15)\n..."
         }
       ]
     }
   }
   ```

9. **Session Updated** in Redis: `lastActivity` → current timestamp

10. **AI Assistant** receives formatted response and presents to user

---

## 🔌 Connecting to the Remote MCP Server

### Connection Methods

The production Gauzy MCP server supports three connection methods to accommodate different use cases:

#### 1. Claude Desktop Integration (Stdio via NPM)

The easiest way to connect Claude Desktop to the remote Gauzy MCP Server:

**Configuration** (`~/.claude_desktop_config.json`):
```json
{
  "mcpServers": {
    "gauzy": {
      "command": "npx",
      "args": ["-y", "@gauzy/mcp-server"],
      "env": {
        "API_BASE_URL": "https://api.gauzy.co",
        "GAUZY_AUTH_EMAIL": "your-email@example.com",
        "GAUZY_AUTH_PASSWORD": "your-password"
      }
    }
  }
}
```

**How it works:**
- NPX downloads and runs the latest `@gauzy/mcp-server` package
- Package connects to your Gauzy API endpoint
- Authenticates with your credentials
- Establishes stdio communication with Claude Desktop
- Automatically manages tokens and sessions

**Demo Environment:**
```json
{
  "mcpServers": {
    "gauzy-demo": {
      "command": "npx",
      "args": ["-y", "@gauzy/mcp-server"],
      "env": {
        "API_BASE_URL": "https://apidemo.gauzy.co",
        "GAUZY_AUTH_EMAIL": "demo@gauzy.co",
        "GAUZY_AUTH_PASSWORD": "demo123"
      }
    }
  }
}
```

#### 2. HTTP/REST API Integration

For web applications, mobile apps, or any HTTP client:

**Endpoint**: `https://mcp.gauzy.co/sse`

**Example - List Available Tools:**
```bash
curl -X POST https://mcp.gauzy.co/sse \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_OAUTH_TOKEN" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/list",
    "params": {}
  }'
```

**Example - Execute Tool:**
```bash
curl -X POST https://mcp.gauzy.co/sse \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_OAUTH_TOKEN" \
  -d '{
    "jsonrpc": "2.0",
    "id": 2,
    "method": "tools/call",
    "params": {
      "name": "list_projects",
      "arguments": {
        "filter": { "active": true }
      }
    }
  }'
```

**Available Endpoints:**
- `POST /sse` - MCP JSON-RPC 2.0 requests
- `GET /sse/events` - Server-Sent Events stream
- `GET /health` - Health check
- `GET /.well-known/oauth-protected-resource` - OAuth metadata

**Features:**
- JSON-RPC 2.0 over HTTPS
- OAuth 2.0 Bearer token authentication
- CORS-enabled for web applications
- Session cookies for state management
- Rate limiting: 100 requests per 15 minutes

#### 3. WebSocket Real-Time Connection

For real-time bidirectional communication:

**Endpoint**: `wss://mcp.gauzy.co/sse`

**Example with wscat:**
```bash
# Install wscat
npm install -g wscat

# Connect to WebSocket server
wscat -c wss://mcp.gauzy.co/sse \
  -H "Authorization: Bearer YOUR_OAUTH_TOKEN"

# Send initialization
{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18","capabilities":{},"clientInfo":{"name":"my-client","version":"1.0.0"}}}

# List tools
{"jsonrpc":"2.0","id":2,"method":"tools/list","params":{}}

# Execute tool
{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"list_projects","arguments":{}}}
```

**Features:**
- Persistent connection with automatic reconnection
- Compression enabled (per-message deflate)
- 16MB max payload size
- Server-initiated notifications
- Sub-second latency
- Perfect for dashboards and live monitoring

---

## 🔐 OAuth 2.0 Authentication

For HTTP and WebSocket connections, the remote MCP server requires OAuth 2.0 Bearer tokens.

### Get an Access Token

#### Step 1: Discover OAuth Metadata

```bash
curl https://mcpauth.gauzy.co/.well-known/oauth-authorization-server
```

Response includes:
- `authorization_endpoint` - Where to send users for authorization
- `token_endpoint` - Where to exchange codes for tokens
- `introspection_endpoint` - Token validation
- `jwks_uri` - Public keys for JWT verification
- `grant_types_supported` - Available OAuth flows
- `scopes_supported` - Available permission scopes

#### Step 2: Register OAuth Client

```bash
curl -X POST https://mcpauth.gauzy.co/oauth2/register \
  -H "Content-Type: application/json" \
  -d '{
    "client_name": "My Application",
    "redirect_uris": ["https://myapp.com/callback"],
    "grant_types": ["authorization_code", "refresh_token"],
    "response_types": ["code"],
    "scope": "mcp.read mcp.write",
    "token_endpoint_auth_method": "none"
  }'
```

Response:
```json
{
  "client_id": "client_abc123xyz",
  "client_name": "My Application",
  "redirect_uris": ["https://myapp.com/callback"],
  "grant_types": ["authorization_code", "refresh_token"],
  "response_types": ["code"],
  "scope": "mcp.read mcp.write"
}
```

#### Step 3: Authorization Code Flow (with PKCE)

**Generate PKCE verifier and challenge:**
```javascript
// Generate code verifier (43-128 characters)
const codeVerifier = generateRandomString(128);

// Generate code challenge (SHA256 hash, base64url encoded)
const codeChallenge = base64urlEncode(sha256(codeVerifier));
```

**Redirect user to authorization endpoint:**
```
https://mcpauth.gauzy.co/oauth2/authorize?
  response_type=code&
  client_id=client_abc123xyz&
  redirect_uri=https://myapp.com/callback&
  scope=mcp.read%20mcp.write&
  state=random_state_string&
  code_challenge=CODE_CHALLENGE_HERE&
  code_challenge_method=S256
```

**User authenticates** with Gauzy credentials and grants permission.

**Receive authorization code** at your redirect URI:
```
https://myapp.com/callback?code=auth_code_here&state=random_state_string
```

#### Step 4: Exchange Code for Token

```bash
curl -X POST https://mcpauth.gauzy.co/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=authorization_code" \
  -d "code=auth_code_here" \
  -d "redirect_uri=https://myapp.com/callback" \
  -d "client_id=client_abc123xyz" \
  -d "code_verifier=CODE_VERIFIER_HERE"
```

Response:
```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 900,
  "refresh_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "scope": "mcp.read mcp.write"
}
```

#### Step 5: Use Access Token

```bash
curl -X POST https://mcp.gauzy.co/sse \
  -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/list",
    "params": {}
  }'
```

#### Step 6: Refresh Token (when expired)

```bash
curl -X POST https://mcpauth.gauzy.co/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=refresh_token" \
  -d "refresh_token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d "client_id=client_abc123xyz"
```

### OAuth Scopes

The remote MCP server supports the following scopes:

| Scope | Description | Tools Enabled |
|-------|-------------|---------------|
| `mcp.read` | Read-only access | All GET/list operations (150+ tools) |
| `mcp.write` | Write access | All POST/PUT/PATCH/DELETE operations (173+ tools) |
| `mcp.admin` | Administrative access | All tools including admin operations (323 tools) |

**Recommended:** Request `mcp.read mcp.write` for full functionality.

### Token Validation

**Introspect Token:**
```bash
curl -X POST https://mcpauth.gauzy.co/oauth2/introspect \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "token=YOUR_ACCESS_TOKEN"
```

Response:
```json
{
  "active": true,
  "scope": "mcp.read mcp.write",
  "client_id": "client_abc123xyz",
  "username": "user@example.com",
  "token_type": "Bearer",
  "exp": 1735654800,
  "iat": 1735654000,
  "sub": "user-id-123",
  "aud": "https://mcp.gauzy.co/sse"
}
```

**Verify JWT Signature:**
```bash
# Get public keys
curl https://mcpauth.gauzy.co/.well-known/jwks.json

# Use keys to verify JWT signature locally
# Libraries: jsonwebtoken (Node.js), PyJWT (Python), etc.
```

---

## 📚 Complete Tool Reference

The remote Gauzy MCP server exposes **323 production-ready tools** organized into **22 categories**. All tools are available via the `tools/list` method.

### Tool Discovery

**List all available tools:**
```bash
curl -X POST https://mcp.gauzy.co/sse \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/list",
    "params": {}
  }'
```

**Get tool schema:**
Each tool includes:
- `name` - Tool identifier
- `description` - What the tool does
- `inputSchema` - JSON Schema for parameters (Zod-validated)

### Tool Categories Summary

| Category | Tools | Key Capabilities |
|----------|-------|-----------------|
| **Authentication** | 5 | Login, logout, token management, session handling |
| **Employee Management** | 15 | CRUD operations, bulk updates, statistics, profiles |
| **Task Management** | 16 | Task lifecycle, assignments, bulk ops, analytics |
| **Project Management** | 14 | Project CRUD, team assignments, reporting |
| **Daily Planning** | 17 | Personal/team plans, task integration, analytics |
| **Organization Contacts** | 17 | Contact management, bulk operations, assignments |
| **Time Tracking** | 3 | Start/stop timers, status monitoring |
| **Payments** | 14 | Payment processing, records, reporting |
| **Expenses** | 9 | Expense tracking, approval workflows |
| **Invoices** | 14 | Invoice generation, management, reporting |
| **Candidate Management** | 15 | Recruitment workflows, tracking, evaluations |
| **Sales & CRM** | 23 | Deals, pipelines, opportunity management |
| **Goal Management** | 24 | OKR system, objectives, key results |
| **Inventory & Equipment** | 21 | Asset tracking, warehouse management |
| **Product Management** | 18 | Product catalog, categories, organization |
| **Time Off** | 20 | Leave requests, PTO tracking, approvals |
| **Skills** | 10 | Competency tracking, development plans |
| **Merchants** | 14 | Vendor management, supplier relationships |
| **Income** | 13 | Revenue tracking, analysis, reporting |
| **Activity Logging** | 12 | Audit trails, user actions, events |
| **Communication** | 15 | Comments, discussions, collaboration |
| **Reporting** | 4 | Analytics, custom reports, insights |
| **HR & Awards** | 7 | Recognition programs, achievements |

**Total: 323 Tools**

### Example Tools

**Project Management:**
- `list_projects` - Get all projects with filtering
- `create_project` - Create new project
- `update_project` - Update project details
- `delete_project` - Remove project
- `bulk_create_projects` - Create multiple projects
- `get_project_by_id` - Get specific project
- `get_my_team_projects` - Get team's projects
- `assign_project_to_employee` - Assign project

**Time Tracking:**
- `start_timer` - Start time tracking
- `stop_timer` - Stop active timer
- `timer_status` - Get current timer state

**Task Management:**
- `list_tasks` - Get all tasks with filters
- `create_task` - Create new task
- `bulk_create_tasks` - Create multiple tasks
- `update_task` - Update task details
- `delete_task` - Remove task
- `get_task_by_id` - Get specific task
- `get_my_tasks` - Get user's tasks
- `get_team_tasks` - Get team's tasks

**Employee Management:**
- `list_employees` - Get all employees
- `create_employee` - Add new employee
- `update_employee` - Update employee details
- `get_employee_by_id` - Get specific employee
- `get_employee_statistics` - Employee analytics

**Financial Operations:**
- `list_invoices` - Get all invoices
- `create_invoice` - Generate new invoice
- `list_payments` - Get payment records
- `create_payment` - Process payment
- `list_expenses` - Get expense records
- `create_expense` - Submit expense

---

## 🎨 Use Cases & Examples

### Use Case 1: Project Setup Automation

**Scenario:** New client project needs setup with team, tasks, and time tracking.

**Natural Language Request:**
> "Set up a new project called 'Acme Corp Website' for Q1 2025, assign 3 developers and 1 designer, create 20 tasks from the requirements doc, and start tracking time."

**Behind the Scenes (Tools Used):**
1. `create_project` - Creates the project with timeline
2. `list_employees` - Finds team members by skills
3. `bulk_assign_project_to_employees` - Assigns team
4. `bulk_create_tasks` - Creates all tasks at once
5. `start_timer` - Begins time tracking

**Result:** Complete project setup in seconds instead of hours of manual work.

### Use Case 2: Weekly Team Report

**Scenario:** Manager needs weekly progress report for stakeholders.

**Natural Language Request:**
> "Generate a weekly report showing all completed tasks, time logged per project, and employees who worked overtime."

**Behind the Scenes (Tools Used):**
1. `list_tasks` - Filtered by date range and completed status
2. `get_time_logs` - Grouped by project
3. `list_employees` - With hours worked filter
4. `generate_report` - Formats data for presentation

**Result:** Comprehensive report ready for stakeholders in seconds.

### Use Case 3: Expense Processing

**Scenario:** Month-end expense approval and invoice generation.

**Natural Language Request:**
> "Show all pending expense claims for January, approve those under $500, and generate invoices for approved expenses."

**Behind the Scenes (Tools Used):**
1. `list_expenses` - Filtered by status and date
2. `bulk_update_expenses` - Batch approval
3. `bulk_create_invoices` - Generate invoices
4. `send_notifications` - Notify employees

**Result:** Month-end expense processing automated completely.

### Use Case 4: Recruitment Pipeline

**Scenario:** Hiring manager tracking multiple candidates through interview process.

**Natural Language Request:**
> "Show all candidates in 'Technical Interview' stage, schedule next round for top 3 candidates, and send rejection emails to others."

**Behind the Scenes (Tools Used):**
1. `list_candidates` - Filtered by stage
2. `get_candidate_evaluations` - Ranking data
3. `update_candidate_stage` - Move top candidates forward
4. `send_bulk_emails` - Automated communications

**Result:** Recruitment workflow streamlined with AI assistance.

### Use Case 5: Real-Time Dashboard

**Scenario:** Operations dashboard showing live project metrics.

**Implementation:**
- WebSocket connection to `wss://mcp.gauzy.co/sse`
- Subscribe to real-time updates
- Tools called periodically: `get_active_timers`, `get_project_progress`, `get_team_availability`
- Dashboard updates automatically as data changes

**Result:** Live operational visibility without manual refreshes.

---

## 💻 Self-Hosting & Development

While we provide production-ready remote servers, you can also self-host the Gauzy MCP Server for development or on-premise deployments.

### Quick Reference

**Repository:** https://github.com/ever-co/ever-gauzy

**Package Locations:**
- MCP Server: `packages/mcp-server`
- MCP App (Stdio): `apps/mcp`
- Auth Server: `apps/mcp-auth`

**Build Commands:**
```bash
yarn build:mcp-server  # Build MCP server package
yarn build:mcp         # Build stdio app
yarn build:mcp-auth    # Build auth server
```

**Documentation:**

For complete self-hosting instructions, environment variables, and configuration options, see the repository README:
- **Main README**: `README.md`
- **MCP Server Package**: `packages/mcp-server/README.md`
- **MCP App**: `apps/mcp/README.md`
- **Auth Server**: `apps/mcp-auth/README.md`

**Docker Images:**
```bash
docker pull gauzy/mcp-server:latest
docker pull gauzy/mcp-auth-server:latest
```

---

## 🔧 Troubleshooting

### Connection Issues

**Problem:** Cannot connect to remote MCP server

**Solutions:**
1. **Check server status**:
   ```bash
   curl https://mcp.gauzy.co/health
   ```
   Response should return `200 OK` with health status.

2. **Verify API endpoint**: Ensure `API_BASE_URL` points to correct Gauzy API
   - Production: `https://api.gauzy.co`
   - Demo: `https://apidemo.gauzy.co`

3. **Test credentials**: Verify login works through Gauzy web interface first

### Authentication Errors

**Problem:** `401 Unauthorized` or authentication failures

**Solutions:**
1. **Verify credentials** are correct for the specified API endpoint
2. **Check account status**: Ensure account is active in Gauzy
3. **OAuth token expired**: Use refresh token to get new access token
4. **Check token scopes**: Ensure token has `mcp.read mcp.write` scopes

**Debug command:**
```bash
curl -X POST https://mcpauth.gauzy.co/oauth2/introspect \
  -d "token=YOUR_TOKEN"
```

### Rate Limiting

**Problem:** `429 Too Many Requests`

**Solutions:**
- Default limit: 100 requests per 15 minutes
- Wait for rate limit window to reset
- For higher limits, contact support for enterprise plan
- Check `X-RateLimit-Remaining` header in responses

### Tool Execution Errors

**Problem:** Tool returns validation or execution errors

**Solutions:**
1. **Check tool schema**: Use `tools/list` to get correct parameter schema
2. **Validate parameters**: Ensure all required fields are provided
3. **Check permissions**: User may lack permissions for specific operations
4. **Review error message**: Provides specific field validation failures

Example:
```bash
# Get tool schema
curl -X POST https://mcp.gauzy.co/sse \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

### Claude Desktop Integration Issues

**Problem:** MCP server not showing in Claude Desktop

**Solutions:**
1. **Verify config location**: `~/.claude_desktop_config.json`
2. **Check JSON syntax**: Validate JSON is properly formatted
3. **Restart Claude Desktop**: Required after config changes
4. **Check logs**: Claude Desktop logs show MCP connection status
5. **Test NPM package**: `npx @gauzy/mcp-server --help`

### WebSocket Connection Failures

**Problem:** WebSocket disconnects or fails to connect

**Solutions:**
1. **Check firewall**: Ensure outbound WebSocket (WSS) connections allowed
2. **Verify endpoint**: Use `wss://mcp.gauzy.co/sse` (not `ws://`)
3. **Check Authorization header**: Must include valid Bearer token
4. **Network proxy**: Some corporate proxies block WebSocket connections

### Common Error Codes

| Code | Meaning | Solution |
|------|---------|----------|
| `401` | Unauthorized | Check token or credentials |
| `403` | Forbidden | User lacks permissions |
| `404` | Not Found | Verify endpoint URL or resource ID |
| `422` | Validation Error | Check parameter schema |
| `429` | Rate Limited | Wait or request higher limit |
| `500` | Server Error | Check server status, retry |
| `503` | Service Unavailable | Server maintenance, check status page |

### Getting Help

- **Server Status**: https://status.gauzy.co
- **GitHub Issues**: https://github.com/ever-co/ever-gauzy/issues
- **Community Discord**: https://discord.gg/ever
- **Email Support**: support@ever.co

---

## 📊 Performance & Limits

### Rate Limits

| Operation | Limit | Window |
|-----------|-------|--------|
| HTTP/WebSocket Requests | 100 | 15 minutes |
| OAuth Token Requests | 10 | 1 hour |
| Tool Executions | 100 | 15 minutes |

**Enterprise plans** available with higher limits and SLA.

### Request Limits

- **Max payload size**: 1MB (production), 10MB (development)
- **Max WebSocket message**: 16MB
- **Session TTL**: 30 minutes (sliding window)
- **Token expiry**: 15 minutes (access), 7 days (refresh)

### Performance Metrics

**Production Server Performance:**
- **Latency**: < 100ms (p50), < 500ms (p99)
- **Uptime**: 99.9% SLA
- **Throughput**: 10,000+ requests/second
- **Concurrent connections**: 50,000+ (WebSocket)

---

## 📝 API Versioning & Compatibility

### MCP Protocol Version

**Current**: `2025-06-18`

The Gauzy MCP Server fully implements the Model Context Protocol specification version 2025-06-18.

### API Versioning

The remote MCP server maintains backward compatibility:
- **Tool names**: Stable, no breaking changes
- **Parameters**: New optional parameters added, existing parameters unchanged
- **Responses**: New fields added, existing fields unchanged

### Breaking Changes Policy

- Announced 90 days in advance
- Deprecated features supported for 6 months
- Version parameter in requests (future enhancement)

### Changelog

See https://github.com/ever-co/ever-gauzy/releases for release notes and changelogs.

---

## 🔒 Security & Compliance

### Security Features

**Transport Layer:**
- TLS 1.3 encryption for all connections
- Perfect Forward Secrecy (PFS)
- HSTS headers enforced
- Certificate pinning support

**Authentication & Authorization:**
- OAuth 2.0 with PKCE (RFC 7636)
- JWT tokens with RS256/ES256 signatures
- Token introspection (RFC 7662)
- Automatic token rotation
- Scope-based access control

**Data Protection:**
- No storage of Gauzy passwords
- Tokens encrypted at rest (Redis)
- Session hijacking protection
- CSRF protection for state-changing operations
- XSS prevention with HTML escaping

**Audit & Monitoring:**
- Complete request/response logging
- User action tracking
- Failed authentication alerting
- Anomaly detection
- Compliance reporting

### Compliance

**Standards:**
- SOC 2 Type II (in progress)
- GDPR compliant
- CCPA compliant
- OAuth 2.0 (RFC 6749, 6750)
- OpenID Connect compatible

**Data Residency:**
- Production: US East (configurable)
- Data never leaves your specified region
- On-premise deployment available

---

## 🌟 Enterprise Features

Contact us for enterprise features:

- **Higher Rate Limits**: Custom limits for high-volume usage
- **SLA Guarantees**: 99.99% uptime with credits
- **Priority Support**: 24/7 dedicated support team
- **Custom Deployment**: On-premise or private cloud
- **SSO Integration**: SAML 2.0, LDAP, Active Directory
- **Advanced Analytics**: Usage metrics and insights
- **Dedicated Infrastructure**: Isolated servers
- **Custom Integrations**: Tailored tool development
- **Training & Onboarding**: Team training sessions

**Contact**: enterprise@ever.co

---

## 📚 Additional Resources

### Documentation
- **MCP Protocol Specification**: https://modelcontextprotocol.io
- **Gauzy Platform Docs**: https://docs.gauzy.co
- **API Documentation**: https://api.gauzy.co/docs
- **GitHub Repository**: https://github.com/ever-co/ever-gauzy

### Community & Support
- **Discord Community**: https://discord.gg/ever
- **GitHub Discussions**: https://github.com/ever-co/ever-gauzy/discussions
- **Stack Overflow**: Tag `gauzy`
- **Twitter**: @gauzyapp

### OAuth 2.0 Standards
- **RFC 6749**: OAuth 2.0 Authorization Framework
- **RFC 6750**: OAuth 2.0 Bearer Token Usage
- **RFC 7591**: OAuth 2.0 Dynamic Client Registration
- **RFC 7662**: OAuth 2.0 Token Introspection
- **RFC 7636**: PKCE (Proof Key for Code Exchange)
- **RFC 8414**: OAuth 2.0 Authorization Server Metadata
- **RFC 9728**: OAuth 2.0 Protected Resource Metadata

---

## 📄 License

The Gauzy MCP Server is part of the Gauzy Platform.

**License**: AGPLv3 with commercial licensing available

See https://github.com/ever-co/ever-gauzy/blob/develop/LICENSE for details.

For commercial licensing inquiries: licenses@ever.co

---

**Last Updated**: 2025-01-30
**MCP Protocol Version**: 2025-06-18
**Server Version**: Latest
**Production Status**: ✅ Live

---

<p align="center">
  <strong>Built with ❤️ by <a href="https://ever.co">Ever Co. LTD</a></strong><br />
  <sub>Transform your business operations with AI-powered workspace management</sub>
</p>
