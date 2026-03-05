---
sidebar_position: 49
---

# Skills Management

Track and manage employee skills and competencies.

## Overview

Skills help match employees to projects and tasks based on their competencies.

## Skill Structure

| Field         | Type   | Description       |
| ------------- | ------ | ----------------- |
| `name`        | string | Skill name        |
| `color`       | string | Hex color         |
| `description` | string | Skill description |

## Managing Skills

### Add Organizational Skills

1. Go to **Settings** → **Skills**
2. Click **Add Skill**
3. Enter skill name (e.g., "TypeScript", "Project Management")
4. Save

### Assign to Employees

1. Open an employee profile
2. Go to **Skills** tab
3. Add skills from the organization's skill list
4. Set proficiency level if applicable

## Skill-Based Matching

Skills are used for:

- **Job matching** — Gauzy AI matches employees to jobs by skills
- **Task assignment** — find employees with required skills
- **Candidate screening** — match candidates to job requirements
- **Skill gap analysis** — identify missing team skills

## API

See [Tags & Skills Endpoints](../api/tags-and-skills-endpoints) for the skills CRUD API.

## Related Pages

- [Tags Management](./tags-management) — tagging system
- [Employee Management](./employee-management) — employee profiles
- [Gauzy AI Integration](../integrations/gauzy-ai-integration) — AI matching
