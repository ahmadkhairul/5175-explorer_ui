import { test, expect } from '@playwright/test'

test('visits the app root url', async ({ page }) => {
  await page.goto('/login')
  await expect(page.locator('h2')).toHaveText('Sign in to your account')
})
