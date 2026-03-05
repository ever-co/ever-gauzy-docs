---
sidebar_position: 6
---

# Plugin Development Guide

This guide covers setting up a development environment, understanding the plugin manifest, structuring your codebase, and implementing the plugin interface.

## Prerequisites and Environment Setup

Plugin development requires Node.js version 18 or later, the Yarn package manager, and knowledge of TypeScript and the Electron application model.

```bash
mkdir my-plugin && cd my-plugin
npm init -y
npm install --save-dev typescript webpack webpack-cli ts-loader \
    copy-webpack-plugin terser-webpack-plugin @types/node electron
```

## The Plugin Manifest

Every plugin must include a `manifest.json` at its root:

```json
{
  "name": "My Plugin",
  "version": "1.0.0",
  "author": "Author Name",
  "category": "Productivity",
  "description": "A concise description of plugin functionality",
  "main": "index.bundle.js"
}
```

**Required fields**: `name`, `version`, `main`.

**Optional fields**: `description`, `renderer`, `author`, `category`, `logo`.

## Repository Structure

### Minimal Plugin Structure

```
my-plugin/
├── manifest.json          # Plugin metadata (required)
├── package.json           # NPM package configuration
├── index.ts               # Main process entry point (required)
├── webpack.config.js      # Build pipeline configuration
├── tsconfig.json          # TypeScript compiler configuration
├── README.md              # Developer documentation
├── ui/                    # Renderer UI assets (optional)
│   └── index.html
└── build/                 # Compiled output directory (generated)
    ├── index.bundle.js
    ├── manifest.json
    └── package.json
```

### Advanced Plugin Structure (with Window Management)

```
my-plugin/
├── manifest.json
├── package.json
├── index.ts               # Main plugin class
├── window.ts              # Window lifecycle management
├── config.ts              # Configuration persistence
├── preload.ts             # Renderer process IPC bridge
├── webpack.config.js
├── tsconfig.json
├── ui/
│   └── index.html
├── assets/
│   └── icon.png
└── build/
```

## Selecting a Template

| Template                                | Bundle Size | Best Suited For                                                 |
| --------------------------------------- | ----------- | --------------------------------------------------------------- |
| `plugin-template-html` (HTML/CSS/JS)    | ~60 KB      | Simple settings pages, minimal interactivity                    |
| `plugin-template-react` (React 18+)     | ~200 KB     | Component-oriented UIs, reactive state management               |
| `plugin-template-angular` (Angular 19+) | ~350 KB     | Complex multi-view interfaces, enterprise-grade maintainability |

Begin with the HTML template for prototyping, graduating to React or Angular as complexity warrants.

## The Main Plugin Class

All plugins implement the `IPlugin` interface:

```typescript
import { MenuItemConstructorOptions } from "electron";

class MyPlugin {
  public initialize(): void {
    console.log("Plugin initializing");
  }

  public async activate(): Promise<void> {
    console.log("Plugin activating");
  }

  public deactivate(): void {
    console.log("Plugin deactivating");
  }

  public dispose(): void {
    console.log("Plugin disposing");
  }

  public get menu(): MenuItemConstructorOptions {
    return {
      label: "My Plugin",
      submenu: [
        {
          label: "Open",
          accelerator: "CmdOrCtrl+Shift+M",
          click: async () => {
            /* ... */
          },
        },
      ],
    };
  }
}

export default new MyPlugin();
```

The module must export a singleton instance as its default export.

## Window Management

Plugins with graphical interfaces must manage their Electron `BrowserWindow` through a dedicated window class. Key patterns:

- Create windows with `show: false` to prevent premature display
- Call `show()` explicitly within `activate()`
- Remove all IPC handlers and close windows in `dispose()`

## Configuration Management

Persistent configuration is managed through `electron-store`:

```typescript
import Store from "electron-store";

export interface MyPluginSettings {
  enabled: boolean;
  refreshInterval: number;
}

export class MyPluginConfig {
  private store: Store<MyPluginSettings>;
  private readonly defaults: MyPluginSettings = {
    enabled: true,
    refreshInterval: 30,
  };

  constructor() {
    this.store = new Store<MyPluginSettings>({
      name: "my-plugin-settings",
      defaults: this.defaults,
    });
  }

  public getSettings(): MyPluginSettings {
    return this.store.store;
  }

  public updateSettings(settings: Partial<MyPluginSettings>): void {
    const errors = this.validate(settings);
    if (errors.length > 0) {
      throw new Error(`Invalid settings: ${errors.join("; ")}`);
    }
    for (const [key, value] of Object.entries(settings)) {
      this.store.set(key as keyof MyPluginSettings, value);
    }
  }

  private validate(settings: Partial<MyPluginSettings>): string[] {
    const errors: string[] = [];
    if (
      settings.refreshInterval !== undefined &&
      settings.refreshInterval < 1
    ) {
      errors.push("Refresh interval must be at least 1 second");
    }
    return errors;
  }
}
```

## The Preload Script

The preload script constitutes the security boundary between main and renderer processes:

```typescript
import { contextBridge, ipcRenderer } from "electron";

interface MyPluginAPI {
  performAction: (data: unknown) => Promise<unknown>;
  closeWindow: () => void;
  onUpdate: (callback: (data: unknown) => void) => () => void;
}

const myPluginAPI: MyPluginAPI = {
  performAction: (data) => ipcRenderer.invoke("my-plugin-action", data),
  closeWindow: () => ipcRenderer.send("my-plugin-close"),
  onUpdate: (callback) => {
    const handler = (_event: unknown, data: unknown) => callback(data);
    ipcRenderer.on("my-plugin-update", handler);
    return () => ipcRenderer.removeListener("my-plugin-update", handler);
  },
};

contextBridge.exposeInMainWorld("myPluginAPI", myPluginAPI);
```

:::tip
Always return cleanup functions from event subscriptions to prevent listener accumulation.
:::

## Event-Driven Communication

Monitor host application events using `ipcMain` listeners:

```typescript
import { ipcMain } from "electron";

export class EventMonitor {
  public initialize(): void {
    ipcMain.on("start-capture-screen", () => this.onCaptureStart());
    ipcMain.on("stop-capture-screen", () => this.onCaptureStop());
  }

  public dispose(): void {
    ipcMain.removeAllListeners("start-capture-screen");
    ipcMain.removeAllListeners("stop-capture-screen");
  }
}
```

## Timer and Interval Management

Encapsulate timer state for correct disposal:

```typescript
export class Timer {
  private intervalId: NodeJS.Timeout | null = null;

  public start(callback: () => void, interval: number): void {
    if (this.intervalId) return;
    this.intervalId = setInterval(callback, interval);
  }

  public stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public dispose(): void {
    this.stop();
  }
}
```

## Build Configuration

All plugin code is bundled using Webpack with `ts-loader`. Target is `node` with `electron` as external. The `libraryTarget` is `umd`.

```javascript
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    index: path.resolve(__dirname, "index.ts"),
    preload: path.resolve(__dirname, "preload.ts"),
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].bundle.js",
    libraryTarget: "umd",
  },
  module: {
    rules: [{ test: /\.ts$/, exclude: /node_modules/, use: "ts-loader" }],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "manifest.json", to: "" },
        { from: "package.json", to: "" },
        { from: "ui", to: "ui" },
        { from: "assets", to: "assets" },
      ],
    }),
  ],
  resolve: { extensions: [".ts", ".js"] },
  externals: ["electron"],
  target: "node",
};
```

## Dependency Management

**Bundled Dependencies**: Place in `node_modules/` or `native_modules/` subdirectory. The `PluginManager` automatically renames `native_modules/` to `node_modules/` during installation.

**npm Strategy-Resolved**: When installed via npm, `package.json` `dependencies` are resolved automatically.

## Publishing to the Marketplace

1. **Build**: Execute `npm run build` and compress `build/` into a ZIP
2. **Navigate**: Open the upload dialog in Gauzy Desktop UI
3. **Complete the form**: Basic info, version details, source descriptors, subscription plans
4. **Submit**: The artifact uploads with real-time progress reporting

For npm-based publication:

```json
{
  "name": "@your-scope/my-plugin",
  "version": "1.0.0",
  "files": ["build/**/*"],
  "scripts": { "prepublishOnly": "npm run build" }
}
```

```bash
npm login
npm publish --access public
```
