# Website

This website is built with [Sourcey](https://sourcey.com) from the Markdown in `docs/` and the
configuration in `sourcey.config.ts`, which also holds the sidebar: each section and its pages, in order.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server at http://localhost:3000. Changes to the docs and the configuration are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### API and MCP references

The API Reference tab is built from `reference/openapi.json`, the OpenAPI document api.gauzy.co publishes, with the corrections in `reference/openapi.overlay.yaml`. To refresh it:

```
$ curl -fsS https://api.gauzy.co/swg-json -o reference/openapi.json
```

The MCP Reference tab is built from `reference/mcp.json`: the tools the MCP server in [ever-gauzy](https://github.com/ever-co/ever-gauzy) reports, captured with [mcp-parser](https://www.npmjs.com/package/mcp-parser), with a description of the server and its stdio command added. `reference/mcp-groups.json` lists each tool under the file in `packages/mcp-server/src/lib/tools` that registers it. To refresh the tools, build the server in an ever-gauzy checkout and capture it, then replace the `tools` in `reference/mcp.json` with the capture's:

```
$ yarn build:mcp:prod
$ MCP_TRANSPORT=stdio API_BASE_URL=http://localhost:3000 npx mcp-parser snapshot --stdio "node dist/apps/mcp/index.js" -o tools.json
```

A tool that `reference/mcp-groups.json` doesn't list is shown after the sections, and the build names it.

### Deployment

`Dockerfile.everk8s` builds the site and serves `build` with nginx (`nginx-default.conf`); the `k8s-build` workflow publishes the image for `develop`, `stage` and `master`.
