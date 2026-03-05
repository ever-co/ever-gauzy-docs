---
sidebar_position: 15
---

# E2E Testing with Playwright

End-to-end testing for the Gauzy web application.

## Setup

```bash
# Install Playwright
npx playwright install

# Run E2E tests
yarn e2e
```

## Writing E2E Tests

```typescript
import { test, expect } from "@playwright/test";

test.describe("Time Tracking", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/auth/login");
    await page.fill('[data-testid="email"]', "admin@ever.co");
    await page.fill('[data-testid="password"]', "admin");
    await page.click('[data-testid="login-button"]');
    await page.waitForURL("/dashboard");
  });

  test("should start and stop timer", async ({ page }) => {
    await page.goto("/pages/time-tracking");

    // Start timer
    await page.click('[data-testid="start-timer"]');
    await expect(page.locator('[data-testid="timer-running"]')).toBeVisible();

    // Wait and stop
    await page.waitForTimeout(2000);
    await page.click('[data-testid="stop-timer"]');

    // Verify time log created
    await expect(page.locator('[data-testid="time-log-entry"]')).toBeVisible();
  });

  test("should create a task", async ({ page }) => {
    await page.goto("/pages/tasks");
    await page.click('[data-testid="add-task"]');

    await page.fill('[data-testid="task-title"]', "Test Task");
    await page.selectOption('[data-testid="task-status"]', "TODO");
    await page.click('[data-testid="save-task"]');

    await expect(page.locator("text=Test Task")).toBeVisible();
  });
});
```

## Test Configuration

```typescript
// playwright.config.ts
export default defineConfig({
  testDir: "./e2e",
  timeout: 30 * 1000,
  use: {
    baseURL: "http://localhost:4200",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
  ],
});
```

## Related Pages

- [Testing Strategy](./testing-strategy) — testing overview
- [API Testing](./api-testing) — backend testing
