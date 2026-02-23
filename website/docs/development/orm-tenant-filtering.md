---
title: Tenant Bypass Exceptions
sidebar_label: Tenant Bypass Exceptions
sidebar_position: 10
---

# Tenant Bypass Exceptions

> This document catalogs all locations in the codebase where data access **intentionally bypasses** the automatic `tenantId` scoping
> provided by `TenantAwareCrudService`. Every entry below has been reviewed and classified.
>
> **Rule**: All other data access in services extending `TenantAwareCrudService` **MUST** use inherited base class methods
> (`this.find()`, `this.save()`, `this.delete()`, `this.findOneByIdString()`, etc.) which automatically scope by tenant.

---

## Category 1 — Cross-Tenant by Design (P2)

These services **intentionally** operate across tenants for authentication, authorization, or global configuration.

| Service                     | File                                                                       | Methods                                                                                                                                                                                                                       | Justification                                                                                                                                                               |
| --------------------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `UserService`               | `packages/core/src/lib/user/user.service.ts`                               | `findOneByEmail`, `checkIfExistsEmail`, `checkIfExists`, `checkIfExistsThirdPartyIdEntity`, `getUserByEmail`, `getUserByThirdPartyId`, `createUser`, `getAdminUsers`, `updateRefreshToken`, `removeRefreshToken`, `markLogin` | User lookups are cross-tenant for login, SSO, and third-party auth. A user may exist in multiple tenants; email uniqueness and authentication must work globally.           |
| `RoleService`               | `packages/core/src/lib/role/role.service.ts`                               | `createQueryBuilder` for role lookups                                                                                                                                                                                         | Roles can be system-level (`isSystem: true`) and shared across tenants. Role lookup during auth must work before tenant context is established.                             |
| `RolePermissionService`     | `packages/core/src/lib/role-permission/role-permission.service.ts`         | `find`, `save`, `createQueryBuilder`                                                                                                                                                                                          | Permission seed operations and system-level permission checks operate across tenants. Guards check permissions before tenant context is fully resolved.                     |
| `TenantSettingService`      | `packages/core/src/lib/tenant/tenant-setting/tenant-setting.service.ts`    | `find`, `findBy`, `save` (multiple methods)                                                                                                                                                                                   | Explicitly queries both global settings (`tenantId: null`) and tenant-specific settings, then merges them. The where clauses manually include `tenantId` where appropriate. |
| `SocialAccountService`      | `packages/core/src/lib/auth/social-account/social-account.service.ts`      | `findOneBy`, `save`                                                                                                                                                                                                           | Social account linking (Google, GitHub, etc.) requires cross-tenant lookup to prevent duplicate social accounts and to find existing users across tenants during SSO login. |
| `AccountingTemplateService` | `packages/core/src/lib/accounting-template/accounting-template.service.ts` | `findOneBy`, `save`                                                                                                                                                                                                           | System-level accounting templates are seeded with `tenantId: null` and must be accessible globally for initial tenant setup.                                                |
| `AvailabilitySlotsService`  | `packages/core/src/lib/availability-slots/availability-slots.service.ts`   | `createQueryBuilder`                                                                                                                                                                                                          | Uses `createQueryBuilder` with manual `tenantId` filter in the query. Complex join queries that cannot be expressed via base class methods.                                 |

---

## Category 2 — Manual Tenant Filter via `createQueryBuilder` (P1)

These services use `this.typeOrmRepository.createQueryBuilder()` with **manual** `.andWhere('tenantId = :tenantId')` filters.
They are **not security vulnerabilities** but bypass the automatic tenant scoping pattern. They use `createQueryBuilder` because
they require complex joins, subqueries, or aggregation not expressible via `FindManyOptions`.

| Service                              | File                                                                                             | # of QB calls | Reason for `createQueryBuilder`                                  |
| ------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------- | ---------------------------------------------------------------- |
| `TimeLogService`                     | `packages/core/src/lib/time-tracking/time-log/time-log.service.ts`                               | ~10           | Complex time log aggregation, date range queries, employee joins |
| `TimeSheetService`                   | `packages/core/src/lib/time-tracking/timesheet/timesheet.service.ts`                             | 2             | Timesheet approval workflows with status filtering               |
| `TimeSlotService`                    | `packages/core/src/lib/time-tracking/time-slot/time-slot.service.ts`                             | 1             | Time slot aggregation with screenshot/activity joins             |
| `ActivityService`                    | `packages/core/src/lib/time-tracking/activity/activity.service.ts`                               | 1             | Activity aggregation with time slot joins                        |
| `ScreenshotService`                  | `packages/core/src/lib/time-tracking/screenshot/screenshot.service.ts`                           | 1             | Screenshot deletion with employee permission join                |
| `TaskService`                        | `packages/core/src/lib/tasks/task.service.ts`                                                    | ~5            | Complex task queries with sprint, project, team filters          |
| `DailyPlanService`                   | `packages/core/src/lib/tasks/daily-plan/daily-plan.service.ts`                                   | ~3            | Daily plan queries with task/employee joins                      |
| `OrganizationTeamService`            | `packages/core/src/lib/organization-team/organization-team.service.ts`                           | 1             | Team queries with member/project joins                           |
| `OrganizationProjectService`         | `packages/core/src/lib/organization-project/organization-project.service.ts`                     | 2             | Project queries with member/repository joins                     |
| `OrganizationTeamJoinRequestService` | `packages/core/src/lib/organization-team-join-request/organization-team-join-request.service.ts` | 1             | Join request with team/employee validation                       |
| `OrganizationProjectModuleService`   | `packages/core/src/lib/organization-project-module/organization-project-module.service.ts`       | 1             | Module queries with project joins                                |
| `OrganizationContactService`         | `packages/core/src/lib/organization-contact/organization-contact.service.ts`                     | 1             | Contact queries with member joins                                |
| `TimeOffRequestService`              | `packages/core/src/lib/time-off-request/time-off-request.service.ts`                             | 2             | Time-off queries with approval workflow joins                    |
| `EquipmentSharingService`            | `packages/core/src/lib/equipment-sharing/equipment-sharing.service.ts`                           | 1             | Equipment sharing with approval joins                            |
| `RequestApprovalService`             | `packages/core/src/lib/request-approval/request-approval.service.ts`                             | 1             | Approval queries with policy joins                               |
| `InviteService`                      | `packages/core/src/lib/invite/invite.service.ts`                                                 | 1             | Invite validation queries                                        |
| `EstimateEmailService`               | `packages/core/src/lib/estimate-email/estimate-email.service.ts`                                 | 0             | Uses `findOneOrFail` with manual tenantId in where               |
| `PaymentService`                     | `packages/core/src/lib/payment/payment.service.ts`                                               | 1             | Payment aggregation with invoice joins                           |
| `ExpenseService`                     | `packages/core/src/lib/expense/expense.service.ts`                                               | 1             | Expense queries with category/vendor joins                       |
| `InvoiceService`                     | `packages/core/src/lib/invoice/invoice.service.ts`                                               | 1             | Invoice queries with item/payment joins                          |
| `CandidateService`                   | `packages/core/src/lib/candidate/candidate.service.ts`                                           | 1             | Candidate queries with interview joins                           |
| `EmployeeService`                    | `packages/core/src/lib/employee/employee.service.ts`                                             | 1             | Employee pagination with complex filters                         |
| `TagService`                         | `packages/core/src/lib/tags/tag.service.ts`                                                      | 1             | Tag queries with entity type joins                               |
| `ReportService`                      | `packages/core/src/lib/reports/report.service.ts`                                                | 1             | Report queries with organization joins                           |
| `EmailHistoryService`                | `packages/core/src/lib/email-history/email-history.service.ts`                                   | 1             | Email history with template joins                                |
| `EmailResetService`                  | `packages/core/src/lib/email-reset/email-reset.service.ts`                                       | 1             | Email reset token queries                                        |
| `EmailTemplateService`               | `packages/core/src/lib/email-template/email-template.service.ts`                                 | 1             | Template queries with language joins                             |

---

## Category 3 — Plugin Services (P1/P2)

| Service                         | File                                                                                    | Classification | Notes                                                                                                                                       |
| ------------------------------- | --------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `JobPresetService`              | `packages/plugins/job-search/src/lib/employee-job-preset/job-preset.service.ts`         | P1             | Uses `createQueryBuilder` with manual tenant filter for complex preset/criteria joins                                                       |
| `PluginSubscriptionPlanService` | `packages/plugins/registry/src/lib/domain/services/plugin-subscription-plan.service.ts` | P2             | Plugin subscription plans are global marketplace entities; `find`, `findOne`, `update`, `delete` operate across tenants for plan management |

---

## Category 4 — Base Class Internal Usage

| Service       | File                                              | Notes                                                                                                                                             |
| ------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CrudService` | `packages/core/src/lib/core/crud/crud.service.ts` | This IS the base class. Direct repository calls here are the internal implementation that all tenant-aware methods delegate to. **Not a bypass.** |

---

## Maintenance Guidelines

1. **New services** extending `TenantAwareCrudService` **must** use base class methods unless they fall into Category 1 or 2 above
2. Any new `createQueryBuilder` usage **must** include `.andWhere('tenantId = :tenantId', { tenantId })` and be documented here
3. Any new cross-tenant operation **must** be added to Category 1 with justification
4. Periodic audit: run `grep -r 'this.typeOrmRepository\.' --include='*.service.ts'` and verify all hits are documented
