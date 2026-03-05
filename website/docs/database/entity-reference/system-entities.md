---
sidebar_position: 15
---

# System Entities

System-level entities for activity logs, API call logs, features, languages, countries, currencies, image assets, and reports.

## ActivityLog

| Column           | Type      | Description                     |
| ---------------- | --------- | ------------------------------- |
| `entity`         | string    | Changed entity type             |
| `entityId`       | UUID      | Changed entity ID               |
| `action`         | enum      | `CREATED`, `UPDATED`, `DELETED` |
| `actorType`      | enum?     | `User` or `System`              |
| `description`    | string?   | Change description              |
| `updatedFields`  | string[]? | List of changed fields          |
| `updatedValues`  | json?     | New values                      |
| `previousValues` | json?     | Old values                      |
| `creatorId`      | UUID?     | FK to user                      |
| `data`           | json?     | Additional data                 |

## ApiCallLog

| Column           | Type    | Description          |
| ---------------- | ------- | -------------------- |
| `url`            | string  | Request URL          |
| `method`         | string  | HTTP method          |
| `statusCode`     | number  | Response status code |
| `requestHeaders` | string? | Request headers      |
| `requestBody`    | string? | Request body         |
| `responseBody`   | string? | Response body        |
| `ipAddress`      | string? | Client IP address    |

## Feature

| Column        | Type     | Description           |
| ------------- | -------- | --------------------- |
| `name`        | string   | Feature name          |
| `code`        | string   | Feature code          |
| `description` | string?  | Description           |
| `image`       | string?  | Feature image         |
| `link`        | string?  | Documentation link    |
| `isEnabled`   | boolean  | Default enabled state |
| `isPaid`      | boolean? | Requires payment      |
| `parentId`    | UUID?    | FK to parent feature  |

## Language

| Column        | Type    | Description     |
| ------------- | ------- | --------------- |
| `name`        | string  | Language name   |
| `code`        | string  | ISO code        |
| `is_system`   | boolean | System language |
| `description` | string? | Description     |
| `color`       | string? | Display color   |

## Country

| Column    | Type   | Description      |
| --------- | ------ | ---------------- |
| `isoCode` | string | ISO country code |
| `country` | string | Country name     |

## Currency

| Column     | Type   | Description       |
| ---------- | ------ | ----------------- |
| `isoCode`  | string | ISO currency code |
| `currency` | string | Currency name     |

## ImageAsset

| Column               | Type     | Description         |
| -------------------- | -------- | ------------------- |
| `name`               | string   | File name           |
| `url`                | string   | Full URL            |
| `thumb`              | string?  | Thumbnail URL       |
| `width`              | number?  | Image width         |
| `height`             | number?  | Image height        |
| `size`               | number?  | File size (bytes)   |
| `isFeatured`         | boolean? | Featured flag       |
| `storageProvider`    | enum?    | Storage provider    |
| `externalProviderId` | string?  | External storage ID |

## Report / ReportCategory

| Column        | Type     | Description          |
| ------------- | -------- | -------------------- |
| `name`        | string   | Report/category name |
| `slug`        | string?  | URL-friendly slug    |
| `description` | string?  | Description          |
| `image`       | string?  | Report image         |
| `iconClass`   | string?  | Icon CSS class       |
| `showInMenu`  | boolean? | Show in sidebar      |
| `categoryId`  | UUID?    | FK to category       |

## Tag / TagType / Skill

Tags and skills used for categorization.

| Tag Column    | Type    | Description    |
| ------------- | ------- | -------------- |
| `name`        | string  | Tag name       |
| `color`       | string  | Color hex      |
| `icon`        | string? | Icon           |
| `description` | string? | Desc           |
| `isSystem`    | boolean | System tag     |
| `tagTypeId`   | UUID?   | FK to tag type |

## Related Pages

- [Activity Log Endpoints](../../api/activity-log-endpoints) — API reference
- [Feature Toggle Endpoints](../../api/feature-toggle-endpoints) — feature flags API
- [Report Endpoints](../../api/report-endpoints) — reports API
