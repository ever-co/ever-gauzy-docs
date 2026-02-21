---
sidebar_position: 12
---

# Candidate Endpoints

API endpoints for Applicant Tracking System (ATS) — candidates, interviews, and pipelines.

## Candidates

### List Candidates

```http
GET /api/candidate?take=20&skip=0&relations[]=user&relations[]=source
Authorization: Bearer {token}
```

**Response (200 OK):**

```json
{
  "items": [
    {
      "id": "...",
      "rating": 4.5,
      "status": "APPLIED",
      "appliedDate": "2024-01-10T00:00:00.000Z",
      "hiredDate": null,
      "rejectDate": null,
      "user": {
        "firstName": "Jane",
        "lastName": "Doe",
        "email": "jane.doe@example.com"
      },
      "source": { "name": "LinkedIn" },
      "organizationId": "..."
    }
  ],
  "total": 15
}
```

### Create Candidate

```http
POST /api/candidate
Authorization: Bearer {token}
Content-Type: application/json

{
  "user": {
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane.doe@example.com"
  },
  "password": "temporaryPassword",
  "appliedDate": "2024-01-10",
  "organizationId": "org-uuid"
}
```

### Update Candidate

```http
PUT /api/candidate/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "rating": 4.5,
  "status": "INTERVIEWED"
}
```

### Candidate Statuses

| Status        | Description          |
| ------------- | -------------------- |
| `APPLIED`     | Initial application  |
| `REJECTED`    | Application rejected |
| `INTERVIEWED` | Interview completed  |
| `HIRED`       | Candidate hired      |

## Candidate Interviews

### List Interviews

```http
GET /api/candidate-interview?where[candidateId]={candidate-id}
Authorization: Bearer {token}
```

### Schedule Interview

```http
POST /api/candidate-interview
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Technical Interview",
  "startTime": "2024-01-20T10:00:00.000Z",
  "endTime": "2024-01-20T11:00:00.000Z",
  "candidateId": "candidate-uuid",
  "organizationId": "org-uuid",
  "interviewers": [
    { "employeeId": "employee-uuid" }
  ]
}
```

### Interview Feedback

```http
POST /api/candidate-interview/{id}/feedbacks
Authorization: Bearer {token}
Content-Type: application/json

{
  "description": "Strong technical skills, good cultural fit",
  "rating": 4.5,
  "interviewerId": "employee-uuid"
}
```

## Candidate Skills

### Add Skills

```http
POST /api/candidate/{id}/skills
Authorization: Bearer {token}
Content-Type: application/json

{
  "skills": [
    { "name": "TypeScript", "level": "EXPERT" },
    { "name": "Angular", "level": "INTERMEDIATE" }
  ]
}
```

## Candidate Experience

### Add Experience

```http
POST /api/candidate-experience
Authorization: Bearer {token}
Content-Type: application/json

{
  "occupation": "Senior Developer",
  "organization": "Previous Company",
  "duration": "3 years",
  "description": "Led frontend team",
  "candidateId": "candidate-uuid"
}
```

## Candidate Education

### Add Education

```http
POST /api/candidate-education
Authorization: Bearer {token}
Content-Type: application/json

{
  "schoolName": "MIT",
  "degree": "BS Computer Science",
  "field": "Computer Science",
  "completionDate": "2020-06-01",
  "candidateId": "candidate-uuid"
}
```

## Invitations

### Send Invite

```http
POST /api/invite
Authorization: Bearer {token}
Content-Type: application/json

{
  "emailId": "user@example.com",
  "roleId": "role-uuid",
  "organizationId": "org-uuid",
  "invitedById": "admin-uuid",
  "startedWorkOn": "2024-02-01"
}
```

### Accept Invite

```http
POST /api/invite/validate
Content-Type: application/json

{
  "email": "user@example.com",
  "token": "invite-token"
}
```

## Sales Pipelines

### List Pipelines

```http
GET /api/pipelines?where[organizationId]={org-id}
Authorization: Bearer {token}
```

### Create Pipeline

```http
POST /api/pipelines
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Enterprise Sales",
  "description": "Pipeline for enterprise deals",
  "organizationId": "org-uuid",
  "stages": [
    { "name": "Lead", "index": 0 },
    { "name": "Qualified", "index": 1 },
    { "name": "Proposal", "index": 2 },
    { "name": "Negotiation", "index": 3 },
    { "name": "Closed Won", "index": 4 }
  ]
}
```

## Contacts (Organization Contacts)

### List Contacts

```http
GET /api/organization-contact?take=20&skip=0
Authorization: Bearer {token}
```

### Create Contact

```http
POST /api/organization-contact
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Acme Corporation",
  "contactType": "CLIENT",
  "primaryEmail": "contact@acme.com",
  "primaryPhone": "+1-555-0100",
  "organizationId": "org-uuid"
}
```

### Contact Types

| Type       | Description     |
| ---------- | --------------- |
| `CLIENT`   | Client/customer |
| `LEAD`     | Sales lead      |
| `CUSTOMER` | Active customer |

## Required Permissions

| Endpoint              | Permission        |
| --------------------- | ----------------- |
| `GET /api/candidate`  | `CANDIDATES_VIEW` |
| `POST /api/candidate` | `CANDIDATES_EDIT` |
| `POST /api/invite`    | `ORG_INVITE_EDIT` |
| `GET /api/pipelines`  | `PIPELINE_VIEW`   |
| `POST /api/pipelines` | `PIPELINE_EDIT`   |
