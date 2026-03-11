import { test as base, expect } from '@playwright/test';
import * as path from 'path';

/**
 * Custom test fixture that provides:
 * - takeScreenshot: helper to capture screenshots at any step
 * - Auto screenshot after each test with PASSED/FAILED status
 */
export const test = base.extend<{
  takeScreenshot: (name: string) => Promise<void>;
}>({
  takeScreenshot: async ({ page }, use) => {
    const fn = async (name: string) => {
      const dir = process.env.SCREENSHOT_DIR;
      if (dir) {
        await page.screenshot({
          path: path.join(dir, `${name}.png`),
          fullPage: true,
        });
      }
    };
    await use(fn);
  },
});

// Auto screenshot at end of every UI test
test.afterEach(async ({ page }, testInfo) => {
  const screenshotDir = process.env.SCREENSHOT_DIR;
  if (screenshotDir) {
    const sanitized = testInfo.title
      .replace(/[^a-zA-Z0-9\-_ ]/g, '')
      .replace(/\s+/g, '-')
      .toLowerCase();
    const status = testInfo.status === 'passed' ? 'PASSED' : 'FAILED';
    const fileName = `${sanitized}-[${status}].png`;

    await page.screenshot({
      path: path.join(screenshotDir, fileName),
      fullPage: true,
    });
  }
});

export { expect };
