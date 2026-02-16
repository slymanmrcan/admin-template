import { test, expect } from '@playwright/test';
test.describe('Home Page', () => {
  test('root url redirects to login (when unauthenticated)', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/.*\/login/); // Dashboard korumalı olduğu için login'e atar
  });
});
