---
sidebar_position: 23
---

# Code Review Checklist

Guidelines for reviewing pull requests in the Ever Gauzy codebase.

## General

- [ ] Code follows project coding standards
- [ ] No commented-out code
- [ ] No `console.log` left in production code
- [ ] Descriptive variable and function names
- [ ] Functions are focused and small

## Security

- [ ] Input validation using DTOs and class-validator
- [ ] No SQL injection vulnerabilities (use parameterized queries)
- [ ] Tenant isolation preserved (tenantId filtering)
- [ ] Relations use enum-based whitelists on public endpoints
- [ ] UUID parameters validated with `UUIDValidationPipe`
- [ ] No secrets hardcoded

## API

- [ ] Permissions guard applied to endpoints
- [ ] Swagger decorators present (`@ApiOperation`, `@ApiResponse`)
- [ ] Error responses are meaningful
- [ ] Pagination used for list endpoints
- [ ] Proper HTTP methods and status codes

## Database

- [ ] Entity extends correct base class
- [ ] Multi-ORM decorators used (TypeORM + MikroORM)
- [ ] Migrations generated and tested
- [ ] Indexes added for frequently queried columns
- [ ] No N+1 query patterns

## Frontend

- [ ] Components use `OnPush` change detection
- [ ] Unsubscribe from observables
- [ ] Permission guards on routes
- [ ] Responsive design
- [ ] Accessibility (ARIA labels)

## Testing

- [ ] Unit tests for new services
- [ ] Integration tests for new endpoints
- [ ] Edge cases covered

## Related Pages

- [Coding Standards](./coding-standards) — style guide
- [Git Workflow](./git-workflow) — branching model
- [Testing Strategy](./testing-strategy) — testing approach
