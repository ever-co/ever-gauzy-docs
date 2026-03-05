---
sidebar_position: 9
---

# Candidate Entities

Entities for applicant tracking: candidates, interviews, feedback, skills, education, and experience.

## Candidate

| Column             | Type    | Description                    |
| ------------------ | ------- | ------------------------------ |
| `rating`           | number? | Overall candidate rating       |
| `payPeriod`        | enum?   | Expected pay period            |
| `billRateValue`    | number? | Expected billing rate          |
| `billRateCurrency` | string? | Billing currency               |
| `minimumBudget`    | number? | Minimum budget                 |
| `rejectDate`       | Date?   | Rejection date                 |
| `hiredDate`        | Date?   | Hire date                      |
| `status`           | enum?   | `APPLIED`, `REJECTED`, `HIRED` |
| `userId`           | UUID    | FK to user (1:1)               |
| `sourceId`         | UUID?   | FK to candidate source         |

**Relations:** `user` (OneToOne), `interview` (OneToMany), `feedbacks` (OneToMany), `skills` (OneToMany), `educations` (OneToMany), `experience` (OneToMany), `documents` (OneToMany), `tags` (ManyToMany)

## CandidateInterview

| Column        | Type    | Description     |
| ------------- | ------- | --------------- |
| `title`       | string  | Interview title |
| `startTime`   | Date?   | Start time      |
| `endTime`     | Date?   | End time        |
| `location`    | string? | Location        |
| `note`        | string? | Notes           |
| `rating`      | number? | Average rating  |
| `candidateId` | UUID    | FK to candidate |

**Relations:** `interviewers` (OneToMany CandidateInterviewers), `feedbacks` (OneToMany CandidateFeedback), `technologies` (OneToMany)

## CandidateFeedback

| Column          | Type    | Description       |
| --------------- | ------- | ----------------- |
| `description`   | string? | Feedback text     |
| `rating`        | number  | Rating (1-5)      |
| `status`        | enum?   | Feedback status   |
| `candidateId`   | UUID    | FK to candidate   |
| `interviewId`   | UUID?   | FK to interview   |
| `interviewerId` | UUID?   | FK to interviewer |

## CandidateSkill / CandidateEducation / CandidateExperience

Each captures different profile sections with fields like `name`, `description`, `institution`, `degree`, `startDate`, `endDate`.

## CandidateSource

| Column | Type   | Description                            |
| ------ | ------ | -------------------------------------- |
| `name` | string | Source name (e.g., LinkedIn, Referral) |

## Related Pages

- [Candidate Endpoints](../../api/candidate-endpoints) — API reference
- [ATS / Candidates](../../features/ats-candidates) — feature guide
- [Recruitment](../../features/recruitment) — recruitment overview
