---
sidebar_position: 9
---

# Performance & Troubleshooting

Performance optimization techniques and diagnostic guidance for Ever Gauzy plugins.

## Performance Optimization

### Lazy Window Instantiation

Create plugin windows on demand within `activate()`, not during `initialize()`. Eager window creation imposes immediate memory cost regardless of user intent.

### Debouncing and Throttling

Apply debouncing or throttling to IPC handlers responding to rapidly emitted events:

```typescript
import { debounce } from "lodash";

const debouncedSave = debounce(() => {
  this.config.onSettingsChanged(this.config.settings);
}, 1000);
```

### Resource Cleanup

All event listeners must be explicitly removed in `dispose()`:

```typescript
public dispose(): void {
  this.timer?.stop();
  ipcMain.removeAllListeners('my-plugin-event');
  ipcMain.removeHandler('my-plugin-action');
  if (this.window && !this.window.isDestroyed()) {
    this.window.close();
  }
  this.window = null;
}
```

:::caution
Failure to remove listeners causes memory leaks and incorrect behavior across activation cycles.
:::

### Web Workers for Computation

Offload computationally intensive operations (video processing, data analysis, encryption) to Web Workers in the renderer process.

### Asynchronous Main Process Operations

All blocking I/O and long-running computations within the main process should be executed asynchronously. Blocking the main process event loop degrades responsiveness across the entire application.

---

## Troubleshooting

### Plugin Fails to Load

If a plugin doesn't appear after installation, check:

- Malformed or missing `manifest.json`
- Incorrect or absent `main` entry in the manifest
- Runtime error during module loading (check application console)

```bash
# Validate manifest JSON structure
cat manifest.json | jq .

# Verify the compiled entry point exists
ls -la build/

# Confirm TypeScript compiles without errors
npx tsc --noEmit
```

### IPC Communication Failures

Checklist when renderer can't invoke an IPC handler:

- ✅ Preload script path in `BrowserWindow` config is correct and file exists
- ✅ Channel name in `ipcMain.handle()` matches `ipcRenderer.invoke()`
- ✅ API is exposed via `contextBridge.exposeInMainWorld()`
- ✅ `contextIsolation` is not disabled

:::tip
Use `webContents.openDevTools()` in the renderer window for debugging.
:::

### Window Fails to Appear

Verify these conditions:

- Window is created before `show()` is called
- `show: false` option is not being overridden
- HTML file path resolves correctly relative to the compiled bundle
- No exceptions during window creation

### Build Failures

Common causes and solutions:

```bash
# Clean rebuild resolves most transient issues
rm -rf node_modules build
npm install
npm run build 2>&1 | tee build.log
```

Ensure `tsconfig.json` paths and `outDir` are consistent with the Webpack configuration.

### Memory Leaks

Root causes of steadily increasing memory across activation cycles:

- Event listeners not removed in `dispose()`
- Timers not cleared
- `BrowserWindow` instances not closed
- Circular references preventing garbage collection

### Installation Source Failures

| Source    | Diagnostic Steps                                                                   |
| --------- | ---------------------------------------------------------------------------------- |
| **CDN**   | Verify HTTPS URL is accessible, archive is a valid ZIP, no CSP blocks the download |
| **npm**   | Confirm registry is reachable, auth token is valid, package name and version exist |
| **Local** | Confirm file is a valid ZIP archive with a valid `manifest.json`                   |
