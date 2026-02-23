---
sidebar_position: 18
---

# Recruitment & Candidates

Applicant tracking system (ATS) for managing candidates, interviews, and hiring workflows.

## Overview

The recruitment module provides end-to-end candidate management from sourcing to hiring.

## Recruitment Pipeline

```
Source → Apply → Screen → Interview → Evaluate → Offer → Hire
```

## Core Entities

### Candidate

| Field                    | Type   | Description                                           |
| ------------------------ | ------ | ----------------------------------------------------- |
| `firstName` / `lastName` | string | Candidate name                                        |
| `email`                  | string | Contact email                                         |
| `source`                 | string | How they found the position                           |
| `rating`                 | number | Overall rating (1-5)                                  |
| `status`                 | enum   | Applied, Screening, Interview, Offer, Hired, Rejected |

### Candidate Interview

| Field                   | Type       | Description             |
| ----------------------- | ---------- | ----------------------- |
| `title`                 | string     | Interview title         |
| `startTime` / `endTime` | DateTime   | Scheduled time          |
| `rating`                | number     | Interview rating        |
| `interviewers`          | Employee[] | Interview panel         |
| `location`              | string     | Interview location/link |

### Candidate Feedback

| Field         | Type     | Description              |
| ------------- | -------- | ------------------------ |
| `description` | string   | Feedback notes           |
| `rating`      | number   | Overall impression       |
| `status`      | enum     | Applied, Rejected, Hired |
| `interviewer` | Employee | Feedback author          |

### Candidate Scoring

- **Personal Qualities** — leadership, communication, teamwork
- **Technologies** — language/framework proficiency ratings
- **Criterions Rating** — custom evaluation criteria

## Candidate Sources

Track where candidates originate:

| Source         | Description            |
| -------------- | ---------------------- |
| **Job Boards** | Indeed, LinkedIn, etc. |
| **Referrals**  | Employee referrals     |
| **Website**    | Direct applications    |
| **Agency**     | Recruitment agencies   |
| **Social**     | Social media outreach  |

## Documents

Attach documents to candidate profiles:

- Resumes / CVs
- Cover letters
- Portfolios
- Certifications
- Assessment results

## API Endpoints

```bash
# Candidates
GET    /api/candidate
POST   /api/candidate
PUT    /api/candidate/:id
DELETE /api/candidate/:id

# Interviews
GET    /api/candidate-interview
POST   /api/candidate-interview
PUT    /api/candidate-interview/:id

# Feedback
POST   /api/candidate-feedbacks
GET    /api/candidate-feedbacks/:id

# Education & Experience
GET    /api/candidate-education
GET    /api/candidate-experience
GET    /api/candidate-skill
```

## Related Pages

- [HRM Features](../features/hrm-overview)
- [Employee Management](../features/employee-management)
- [Candidate API Endpoints](../api/candidate-endpoints)
