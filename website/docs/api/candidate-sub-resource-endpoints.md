---
sidebar_position: 23
---

# Candidate Sub-Resource Endpoints

Detailed API reference for candidate feedback, interviews, education, experience, skills, and sources.

## Candidate Feedback

### Base Path: `/api/candidate-feedbacks`

```
GET    /api/candidate-feedbacks                    # List all feedbacks
GET    /api/candidate-feedbacks/:id                # Get feedback by ID
POST   /api/candidate-feedbacks                    # Create feedback
PUT    /api/candidate-feedbacks/:id                # Update feedback
DELETE /api/candidate-feedbacks/:id                # Delete feedback
GET    /api/candidate-feedbacks/candidate/:candidateId  # Get by candidate
```

**Create Feedback Body:**

```json
{
  "description": "Strong technical skills, good communication",
  "rating": 4,
  "status": "APPLIED",
  "candidateId": "candidate-uuid",
  "interviewId": "interview-uuid",
  "interviewerId": "employee-uuid"
}
```

## Candidate Interviews

### Base Path: `/api/candidate-interview`

```
GET    /api/candidate-interview                    # List interviews
GET    /api/candidate-interview/:id                # Get interview
POST   /api/candidate-interview                    # Create interview
PUT    /api/candidate-interview/:id                # Update interview
DELETE /api/candidate-interview/:id                # Delete interview
GET    /api/candidate-interview/candidate/:candidateId  # By candidate
```

**Create Interview Body:**

```json
{
  "title": "Technical Interview Round 1",
  "startTime": "2025-01-15T10:00:00",
  "endTime": "2025-01-15T11:00:00",
  "location": "Google Meet link",
  "candidateId": "candidate-uuid",
  "interviewers": [{ "employeeId": "interviewer-uuid" }],
  "technologies": [{ "name": "TypeScript" }, { "name": "NestJS" }]
}
```

## Candidate Interviewers

### Base Path: `/api/candidate-interviewers`

```
GET    /api/candidate-interviewers                     # List
GET    /api/candidate-interviewers/interview/:id       # By interview
POST   /api/candidate-interviewers                     # Assign
DELETE /api/candidate-interviewers/:id                 # Remove
```

## Candidate Education

### Base Path: `/api/candidate-education`

```
GET    /api/candidate-education                        # List
GET    /api/candidate-education/:id                    # Get by ID
POST   /api/candidate-education                        # Create
PUT    /api/candidate-education/:id                    # Update
DELETE /api/candidate-education/:id                    # Delete
GET    /api/candidate-education/candidate/:candidateId # By candidate
```

**Body:**

```json
{
  "schoolName": "MIT",
  "degree": "B.S. Computer Science",
  "field": "Computer Science",
  "completionDate": "2020-06-15",
  "candidateId": "candidate-uuid"
}
```

## Candidate Experience

### Base Path: `/api/candidate-experience`

```
GET    /api/candidate-experience                       # List
GET    /api/candidate-experience/:id                   # Get by ID
POST   /api/candidate-experience                       # Create
PUT    /api/candidate-experience/:id                   # Update
DELETE /api/candidate-experience/:id                   # Delete
GET    /api/candidate-experience/candidate/:candidateId # By candidate
```

## Candidate Skills

### Base Path: `/api/candidate-skill`

```
GET    /api/candidate-skill                            # List
POST   /api/candidate-skill                            # Create
PUT    /api/candidate-skill/:id                        # Update
DELETE /api/candidate-skill/:id                        # Delete
GET    /api/candidate-skill/candidate/:candidateId     # By candidate
```

## Candidate Sources

### Base Path: `/api/candidate-source`

```
GET    /api/candidate-source                           # List
POST   /api/candidate-source                           # Create
PUT    /api/candidate-source/:id                       # Update
DELETE /api/candidate-source/:id                       # Delete
```

## Candidate Documents

### Base Path: `/api/candidate-documents`

```
GET    /api/candidate-documents                        # List
POST   /api/candidate-documents                        # Upload
DELETE /api/candidate-documents/:id                    # Delete
GET    /api/candidate-documents/candidate/:candidateId # By candidate
```

## Candidate Criteria Rating

### Base Path: `/api/candidate-criterions-rating`

```
GET    /api/candidate-criterions-rating                # List
POST   /api/candidate-criterions-rating/bulk           # Bulk create
PUT    /api/candidate-criterions-rating/bulk           # Bulk update
DELETE /api/candidate-criterions-rating/bulk           # Bulk delete
```

## Related Pages

- [Candidate Endpoints](./candidate-endpoints) — main candidate API
- [Screening Task Endpoints](./screening-task-endpoints) — screening tests
- [ATS / Candidates](../features/ats-candidates) — feature guide
