---
sidebar_position: 2
---

# AI Plugin

The Gauzy AI plugin provides intelligent features powered by machine learning and NLP.

## Overview

| Property       | Value                                  |
| -------------- | -------------------------------------- |
| **Package**    | `@ever-co/gauzy-plugin-integration-ai` |
| **Source**     | `packages/plugins/integration-ai`      |
| **UI Package** | `packages/plugins/integration-ai-ui`   |

## Features

- **Employee-Job Matching** — AI-powered matching of employees to job openings
- **Smart Search** — NLP-powered search across entities
- **Automation Suggestions** — intelligent workflow suggestions
- **Data Analysis** — automated pattern detection in time logs and activity

## Configuration

```bash
# Gauzy AI API Configuration
GAUZY_AI_GRAPHQL_ENDPOINT=http://localhost:3005/graphql
GAUZY_AI_REST_ENDPOINT=http://localhost:3005

# AI Features
AI_ASSIST_ENABLED=true
```

## Architecture

```
Gauzy API
  │
  ├── integration-ai (plugin)
  │     ├── AI Service
  │     ├── Employee-Job Matching
  │     └── NLP Processing
  │
  └── Gauzy AI Server (external)
        ├── GraphQL API
        ├── Machine Learning Models
        └── Vector Search
```

## Employee-Job Matching

The AI plugin matches employees to job openings based on:

- Skills and experience
- Availability
- Past performance
- Project preferences

```typescript
// Example: Get AI-matched employees for a job
const matches = await aiService.getEmployeeJobMatches({
  jobId: "job-uuid",
  limit: 10,
  minScore: 0.7,
});
```

## Integration with Gauzy AI Server

The plugin communicates with an external Gauzy AI server via GraphQL:

```graphql
query EmployeeJobMatches($input: MatchInput!) {
  employeeJobMatches(input: $input) {
    employeeId
    jobId
    score
    reasons
  }
}
```

## Related Pages

- [Plugins Overview](./plugins-overview)
- [Integrations Overview](../integrations/integrations-overview)
