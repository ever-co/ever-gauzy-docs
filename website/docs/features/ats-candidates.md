---
sidebar_position: 19
---

# ATS — Candidates

The Applicant Tracking System (ATS) manages the full recruitment pipeline from candidate application to hiring.

## Features

- **Candidate profiles** — skills, experience, education
- **Interview scheduling** — calendar-based scheduling
- **Interview feedback** — structured rating and comments
- **Source tracking** — where candidates came from
- **Status tracking** — application pipeline stages

## Candidate Flow

```
Applied → Screening → Interviewed → Offer → Hired
  │          │            │            │
  └── Reject └── Reject   └── Reject   └── Decline
```

## Candidate Profile

| Section        | Fields                              |
| -------------- | ----------------------------------- |
| **Basic**      | Name, email, phone, address         |
| **Skills**     | Technical/soft skills with levels   |
| **Experience** | Work history entries                |
| **Education**  | Degrees and certifications          |
| **Source**     | Referral, LinkedIn, Job Board, etc. |
| **Documents**  | Resume, cover letter, portfolio     |

### Skill Levels

| Level          | Description           |
| -------------- | --------------------- |
| `BEGINNER`     | Basic knowledge       |
| `INTERMEDIATE` | Working proficiency   |
| `ADVANCED`     | Strong expertise      |
| `EXPERT`       | Subject matter expert |

## Interview Management

### Interview Types

| Type         | Description                  |
| ------------ | ---------------------------- |
| Phone Screen | Initial phone interview      |
| Technical    | Technical assessment         |
| Cultural Fit | Culture and values interview |
| Panel        | Multi-interviewer session    |
| Final        | Decision-making interview    |

### Interview Feedback

Each interviewer submits:

| Field         | Description       |
| ------------- | ----------------- |
| `rating`      | 1–5 star rating   |
| `description` | Written feedback  |
| `status`      | PASS, FAIL, MAYBE |

## Candidate Sources

| Source   | Description           |
| -------- | --------------------- |
| LinkedIn | LinkedIn applications |
| Indeed   | Indeed job board      |
| Referral | Employee referral     |
| Website  | Company career page   |
| Agency   | Recruitment agency    |
| Other    | Other sources         |

## Permissions

| Action                  | Permission                  |
| ----------------------- | --------------------------- |
| View candidates         | `CANDIDATES_VIEW`           |
| Manage candidates       | `CANDIDATES_EDIT`           |
| Change candidate status | `CHANGE_SELECTED_CANDIDATE` |
| Send invites            | `ORG_INVITE_EDIT`           |

## Related Pages

- [Candidate Endpoints](/api/candidate-endpoints) — API reference
- [HRM Overview](/features/hrm-overview) — HR module overview
