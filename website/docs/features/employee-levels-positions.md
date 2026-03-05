---
sidebar_position: 62
---

# Employee Levels & Positions

Define experience levels and job positions for your organization.

## Employee Levels

Levels define seniority tiers within the organization.

### Default Levels

| Level  | Description              |
| ------ | ------------------------ |
| Junior | Entry-level (0-2 years)  |
| Mid    | Intermediate (2-5 years) |
| Senior | Experienced (5-8 years)  |
| Lead   | Team lead (8+ years)     |
| Expert | Domain expert            |

### Creating Levels

1. Go to **Settings** → **Employee Levels**
2. Click **Add Level**
3. Enter level name
4. Save

## Positions

Positions define job titles/roles.

### Creating Positions

1. Go to **Settings** → **Positions**
2. Click **Add Position**
3. Enter position title
4. Save

### Common Positions

| Position             | Department      |
| -------------------- | --------------- |
| Software Engineer    | Engineering     |
| Product Manager      | Product         |
| UI/UX Designer       | Design          |
| QA Engineer          | Quality         |
| DevOps Engineer      | Operations      |
| HR Manager           | Human Resources |
| Sales Representative | Sales           |

## API

- Levels: `GET/POST /api/employee-level`
- Positions: `GET/POST /api/organization-position`

## Related Pages

- [Departments & Positions](./departments-and-positions) — org structure
- [Employee Management](./employee-management) — employee features
