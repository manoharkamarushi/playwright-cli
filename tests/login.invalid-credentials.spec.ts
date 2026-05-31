import { test, expect } from '@playwright/test';

const LOGIN_URL = 'https://app.vwo.com/#/login';
const INVALID_EMAIL = 'invalid@test.com';
const INVALID_PASSWORD = 'wrongpassword123';
const EXPECTED_ERROR = 'Your email, password, IP address or location did not match';

test.describe('VWO Login — invalid credentials', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_URL);
    await expect(page).toHaveURL(/.*\/login/);
  });

  test('shows error on wrong email and password', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Email address' }).fill(INVALID_EMAIL);
    await page.getByRole('textbox', { name: 'Password' }).fill(INVALID_PASSWORD);
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();

    const errorBox = page.locator('#js-notification-box');
    await expect(errorBox).toBeVisible();
    await expect(errorBox).toHaveText(new RegExp(EXPECTED_ERROR));
  });

  test('stays on login page after failed attempt', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Email address' }).fill(INVALID_EMAIL);
    await page.getByRole('textbox', { name: 'Password' }).fill(INVALID_PASSWORD);
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();

    await expect(page).toHaveURL(/.*\/login/);
  });

  test('email field retains value after failed attempt', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Email address' }).fill(INVALID_EMAIL);
    await page.getByRole('textbox', { name: 'Password' }).fill(INVALID_PASSWORD);
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();

    await expect(page.getByRole('textbox', { name: 'Email address' })).toHaveValue(INVALID_EMAIL);
  });
});
