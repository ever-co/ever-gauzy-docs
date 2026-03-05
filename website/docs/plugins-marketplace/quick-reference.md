---
sidebar_position: 10
---

# Quick Reference

Essential reference tables and checklists for plugin development.

## Plugin Lifecycle Methods

| Method           | Phase        | Purpose                               |
| ---------------- | ------------ | ------------------------------------- |
| `onInitialize()` | Startup      | Register listeners, set up monitoring |
| `onActivate()`   | Activation   | Create windows, start services        |
| `onDeactivate()` | Deactivation | Hide windows, pause services          |
| `onDispose()`    | Shutdown     | Release all resources                 |

## Template Comparison

| Template    | Bundle Size | Best For                                      |
| ----------- | ----------- | --------------------------------------------- |
| HTML/CSS/JS | ~60 KB      | Simple plugins, rapid prototyping             |
| React       | ~200 KB     | Medium complexity, component reusability      |
| Angular     | ~350 KB     | Complex applications, enterprise requirements |

## Download Context Types

| Type                              | Use Case                                          |
| --------------------------------- | ------------------------------------------------- |
| `PluginDownloadContextType.CDN`   | HTTPS ZIP archive from a CDN endpoint             |
| `PluginDownloadContextType.LOCAL` | Local filesystem ZIP (development and enterprise) |
| `PluginDownloadContextType.NPM`   | npm package registry (public or private)          |

## IPC Channel Naming Convention

All plugin IPC channels should be prefixed with the plugin's unique identifier to prevent collisions:

```
plugin-name::channel-action
```

## Common IPC Patterns

```typescript
// Main → Renderer (one-way push)
window.webContents.send("my-plugin::update", data);

// Renderer → Main (fire-and-forget)
ipcRenderer.send("my-plugin::notify", data);

// Renderer → Main (request/response)
const result = await ipcRenderer.invoke("my-plugin::action", data);

// Main process handler
ipcMain.handle("my-plugin::action", async (event, data) => {
  return { result: "response" };
});
```

## Distribution Checklist

- [ ] `manifest.json` present and valid
- [ ] `main` field references a compiled bundle
- [ ] All IPC handlers removed in `onDispose()`
- [ ] Settings validated before persistence
- [ ] No raw Node.js APIs exposed to the renderer process
- [ ] `contextIsolation` enabled and not overridden
- [ ] Build artifacts packaged as `build.zip`
- [ ] Semantic version follows `MAJOR.MINOR.PATCH`

## Essential Files Reference

| File                | Purpose                                     | Required          |
| ------------------- | ------------------------------------------- | ----------------- |
| `manifest.json`     | Plugin identity and entry point declaration | Yes               |
| `index.ts`          | Main process entry point                    | Yes               |
| `package.json`      | npm package configuration                   | Yes               |
| `webpack.config.js` | Build pipeline configuration                | Yes               |
| `tsconfig.json`     | TypeScript compiler configuration           | Yes               |
| `preload.ts`        | Main-to-renderer IPC bridge                 | If using a window |
| `ui/index.html`     | Renderer process UI document                | If using a window |

## Additional Resources

- [Electron Documentation](https://www.electronjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Webpack Documentation](https://webpack.js.org/concepts/)
- [Akita State Management](https://opensource.salesforce.com/akita/)
- [GitHub Issues](https://github.com/ever-co/ever-gauzy/issues)
- [Discussions](https://github.com/ever-co/ever-gauzy/discussions)
