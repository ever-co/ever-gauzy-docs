---
sidebar_position: 4
---

# File Upload Security

Security controls for file uploads in Ever Gauzy.

## File Validation

### File Type Restrictions

Uploaded files are validated by:

- **MIME type** — checked against an allowlist
- **File extension** — validated against permitted extensions
- **File size** — enforced maximum size limits

### Allowed File Types

| Category  | Extensions                                       |
| --------- | ------------------------------------------------ |
| Images    | `.jpg`, `.jpeg`, `.png`, `.gif`, `.svg`, `.webp` |
| Documents | `.pdf`, `.doc`, `.docx`, `.xls`, `.xlsx`         |
| Archives  | `.zip`                                           |

## Storage Security

| Measure          | Description                      |
| ---------------- | -------------------------------- |
| Tenant isolation | Files scoped to tenant directory |
| Unique naming    | Files renamed to UUIDs           |
| No execution     | Upload directories have no-exec  |
| Access control   | Files served through API auth    |

## Configuration

| Variable        | Description                 |
| --------------- | --------------------------- |
| `FILE_PROVIDER` | Storage backend             |
| `MAX_FILE_SIZE` | Maximum upload size (bytes) |

## Related Pages

- [Image Asset Endpoints](../api/image-asset-endpoints) — upload API
- [Input Validation](./input-validation) — validation patterns
