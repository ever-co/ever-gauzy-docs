---
sidebar_position: 8
---

# Security Considerations

Security best practices for plugin development and deployment.

## Principle of Least Privilege

Plugin authors should expose only the minimum necessary IPC channels through the preload script and rigorously validate all data received from the renderer process. Treat the renderer process as an untrusted execution environment, as it is susceptible to XSS attacks when rendering external content.

## Context Isolation

The `contextIsolation` Electron security option **must never be disabled**. This setting ensures the `window` object exposed to renderer JavaScript is a distinct JavaScript context from the preload script, preventing prototype chain manipulation attacks.

:::danger
Disabling `contextIsolation` has severe security implications that cannot be mitigated by other means.
:::

## IPC Channel Whitelisting

All data crossing the IPC boundary should be validated for type conformance and business rule compliance. Use a whitelist approach:

```typescript
const permittedChannels = ["my-plugin-action", "my-plugin-query"];

const safeInvoke = (channel: string, ...args: unknown[]) => {
  if (permittedChannels.includes(channel)) {
    return ipcRenderer.invoke(channel, ...args);
  }
  throw new Error(`IPC channel '${channel}' is not permitted`);
};
```

:::warning
Exposing the raw `ipcRenderer` object through the context bridge is **explicitly prohibited**, as it grants unrestricted access to the IPC subsystem.
:::

## Manifest and Source Validation

The installation pipeline enforces manifest validity. Plugin authors should verify:

- `manifest.json` is well-formed JSON
- All required fields are present and correctly typed
- The `main` field references an existing file within the distribution artifact
