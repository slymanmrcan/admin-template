import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('Login Page', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  // ── Rendering ──────────────────────────────
  test('renders the login form correctly', async ({ page }) => {
    // Heading
    await expect(page.getByText('Tekrar hoş geldin')).toBeVisible();

    // Form fields
    await expect(page.getByLabel('E-posta')).toBeVisible();
    await expect(page.getByLabel('Şifre')).toBeVisible();

    // Submit button
    await expect(page.getByRole('button', { name: /giriş yap/i })).toBeVisible();

    // Register link
    await expect(page.getByRole('link', { name: /kayıt ol/i })).toBeVisible();
  });

  // ── Validation ─────────────────────────────
  test('shows validation errors for empty form submission', async ({ page }) => {
    // Disable HTML5 validation to test JS validation
    await page.evaluate(() => document.querySelector('form')?.setAttribute('novalidate', 'true'));
    
    await loginPage.submit();

    // Hata mesajlarının görünmesini bekle (Assertion failure here means validation didnt trigger)
    const errorLocator = page.locator('.text-destructive');
    await expect(errorLocator.first()).toBeVisible();

    const errors = await loginPage.getErrorMessages();
    expect(errors.some((e) => e.includes('6 karakter'))).toBeTruthy();
  });

  test('email field rejects invalid input via native HTML5 validation', async ({ page }) => {
    await loginPage.fillEmail('not-an-email');
    await loginPage.fillPassword('123456');
    await loginPage.submit();

    // HTML5 email input prevents submission – user stays on login page
    await expect(page).toHaveURL(/\/login/);
  });

  test('shows validation error for short password', async ({ page }) => {
    await loginPage.fillEmail('user@example.com');
    await loginPage.fillPassword('123');
    await loginPage.submit();

    // Hata mesajlarının görünmesini bekle
    await expect(page.getByText('Şifre en az 6 karakter olmalı')).toBeVisible();
  });

  // ── Navigation ─────────────────────────────
  test('register link navigates to /register', async ({ page }) => {
    await loginPage.goToRegister();
    await expect(page).toHaveURL(/\/register/);
  });

  // ── Accessibility ──────────────────────────
  test('email input has correct type attribute', async ({ page }) => {
    const emailInput = page.getByLabel('E-posta');
    await expect(emailInput).toHaveAttribute('type', 'email');
  });

  test('password input has correct type attribute', async ({ page }) => {
    const passwordInput = page.getByLabel('Şifre');
    await expect(passwordInput).toHaveAttribute('type', 'password');
  });
});
