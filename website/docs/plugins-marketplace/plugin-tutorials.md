---
sidebar_position: 7
---

# Plugin Tutorials

Hands-on tutorials for building Ever Gauzy plugins from scratch.

## Tutorial: A Minimal Plugin Without UI

This tutorial builds a complete, functional plugin that contributes a native menu item and presents a system dialog upon selection.

### Manifest

```json
{
  "name": "Hello Plugin",
  "version": "1.0.0",
  "author": "Your Name",
  "category": "Utility",
  "description": "A minimal demonstration plugin",
  "main": "index.bundle.js"
}
```

### Main Entry Point (`index.ts`)

```typescript
import { dialog, MenuItemConstructorOptions } from "electron";

class HelloPlugin {
  public async activate(): Promise<void> {
    console.log("Hello Plugin activated");
  }

  public initialize(): void {
    console.log("Hello Plugin initialized");
  }

  public dispose(): void {
    console.log("Hello Plugin disposed");
  }

  public deactivate(): void {
    console.log("Hello Plugin deactivated");
  }

  public get menu(): MenuItemConstructorOptions {
    return {
      label: "Hello Plugin",
      submenu: [
        {
          label: "Say Hello",
          click: async () => {
            await dialog.showMessageBox({
              title: "Hello",
              message: "Hello from the Ever Gauzy plugin system!",
              buttons: ["OK"],
            });
          },
        },
      ],
    };
  }
}

export default new HelloPlugin();
```

### Webpack Configuration

```javascript
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    index: path.resolve(__dirname, "index.ts"),
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
      ],
    }),
  ],
  resolve: { extensions: [".ts", ".js"] },
  externals: ["electron"],
  target: "node",
};
```

### TypeScript Configuration

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./build",
    "rootDir": "./",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node"
  },
  "include": ["*.ts"],
  "exclude": ["node_modules", "build"]
}
```

### Build and Distribution

```bash
npm run build
cd build && zip -r ../my-plugin.zip .
```

---

## Tutorial: A Plugin with a Custom Window

This tutorial demonstrates a plugin with a custom Electron `BrowserWindow`, IPC communication via a preload bridge, and host application event integration.

### Main Plugin Class (`index.ts`)

```typescript
import { ipcMain, MenuItemConstructorOptions } from "electron";
import { MyPluginWindow } from "./window";

class MyPlugin {
  private window: MyPluginWindow;

  constructor() {
    this.window = new MyPluginWindow();
  }

  public async activate(): Promise<void> {
    this.window.initialize();
    await this.window.show();
  }

  public initialize(): void {
    ipcMain.on("start-capture-screen", () => {
      // React to host application events
    });
  }

  public dispose(): void {
    this.window.dispose();
    ipcMain.removeAllListeners("start-capture-screen");
  }

  public deactivate(): void {
    this.window.hide();
  }

  public get menu(): MenuItemConstructorOptions {
    return {
      label: "My Plugin",
      submenu: [
        {
          label: "Open Window",
          accelerator: "CmdOrCtrl+M",
          click: async () => {
            await this.window.show();
          },
        },
        { type: "separator" },
        {
          label: "Reload",
          click: async () => {
            await this.window.reload();
          },
        },
      ],
    };
  }
}

export default new MyPlugin();
```

### Window Manager (`window.ts`)

```typescript
import { BrowserWindow, ipcMain, shell } from "electron";
import path from "path";

export class MyPluginWindow {
  private window: BrowserWindow | null = null;
  private isInitialized = false;

  public initialize(): void {
    if (this.isInitialized) return;
    this.createWindow();
    this.setupIpcHandlers();
    this.isInitialized = true;
  }

  private createWindow(): void {
    this.window = new BrowserWindow({
      width: 800,
      height: 600,
      show: false,
      autoHideMenuBar: true,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: path.join(__dirname, "preload.bundle.js"),
      },
    });

    this.window.loadFile(path.join(__dirname, "ui", "index.html"));
    this.window.on("closed", () => {
      this.window = null;
    });
    this.window.webContents.setWindowOpenHandler(({ url }) => {
      shell.openExternal(url);
      return { action: "deny" };
    });
  }

  private setupIpcHandlers(): void {
    ipcMain.handle("my-plugin-action", async (_event, data) => {
      return { success: true, received: data };
    });
    ipcMain.on("my-plugin-close", () => {
      this.hide();
    });
  }

  public async show(): Promise<void> {
    if (!this.window) this.createWindow();
    this.window?.show();
    this.window?.focus();
  }

  public hide(): void {
    this.window?.hide();
  }

  public async reload(): Promise<void> {
    this.window?.webContents.reload();
  }

  public dispose(): void {
    ipcMain.removeHandler("my-plugin-action");
    ipcMain.removeAllListeners("my-plugin-close");
    if (this.window && !this.window.isDestroyed()) this.window.close();
    this.window = null;
    this.isInitialized = false;
  }
}
```

### Renderer UI (`ui/index.html`)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Plugin</title>
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        padding: 20px;
        background: #1a1a2e;
        color: #f1f5f9;
      }
      button {
        padding: 10px 20px;
        background: #2563eb;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        margin-right: 8px;
      }
    </style>
  </head>
  <body>
    <h1>My Plugin</h1>
    <button onclick="handleAction()">Perform Action</button>
    <button onclick="closeWindow()">Close</button>
    <script>
      async function handleAction() {
        const result = await window.myPluginAPI.performAction({ test: "data" });
        console.log("Result:", result);
      }
      function closeWindow() {
        window.myPluginAPI.closeWindow();
      }
      const cleanup = window.myPluginAPI.onUpdate((data) => {
        console.log("Update received:", data);
      });
      window.addEventListener("beforeunload", cleanup);
    </script>
  </body>
</html>
```

---

## Runtime Plugin Management

### Installation from Various Sources

```typescript
const pluginManager = PluginManager.getInstance();

// From the npm registry
await pluginManager.downloadPlugin({
  contextType: PluginDownloadContextType.NPM,
  pkg: { name: "@my-scope/my-plugin", version: "1.0.0" },
  registry: { privateURL: "https://my-registry.com", authToken: "token" },
  marketplaceId: "marketplace-id",
  versionId: "version-id",
});

// From a CDN
await pluginManager.downloadPlugin({
  contextType: PluginDownloadContextType.CDN,
  url: "https://cdn.example.com/plugin.zip",
  marketplaceId: "marketplace-id",
  versionId: "version-id",
});

// From a local file
await pluginManager.downloadPlugin({
  contextType: PluginDownloadContextType.LOCAL,
  marketplaceId: "marketplace-id",
  versionId: "version-id",
});
```

### Lifecycle Operations

```typescript
// Activate a plugin
await pluginManager.activatePlugin("my-plugin");

// Deactivate a plugin
await pluginManager.deactivatePlugin("my-plugin");

// Update to a new version
await pluginManager.updatePlugin({
  name: "my-plugin",
  version: "2.0.0",
  description: "Updated description",
  versionId: "new-version-id",
});

// Uninstall
await pluginManager.uninstallPlugin({ name: "my-plugin" });

// Query installed plugins
const allPlugins = await pluginManager.getAllPlugins();
const plugin = await pluginManager.getOnePlugin("my-plugin");
const isInstalled = await pluginManager.checkInstallation("marketplace-id");
```
