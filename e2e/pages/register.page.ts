import type { Page } from '@playwright/test';

/**
 * Page Object Model – Register Page
 */
export class RegisterPage {
  constructor(private readonly page: Page) {}

  // ── Selectors ────────────────────────────
  private get firstNameInput()       { return this.page.getByLabel('Ad'); }
  private get lastNameInput()        { return this.page.getByLabel('Soyad'); }
  private get emailInput()           { return this.page.getByLabel('E-posta'); }
  private get passwordInput()        { return this.page.getByLabel('Şifre', { exact: true }); }
  private get confirmPasswordInput() { return this.page.getByLabel('Şifreyi doğrula'); }
  private get submitButton()         { return this.page.getByRole('button', { name: /kayıt ol/i }); }
  private get loginLink()            { return this.page.getByRole('link', { name: /giriş yap/i }); }

  // ── Actions ──────────────────────────────

  async goto() {
    await this.page.goto('/register');
  }

  async register(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.emailInput.fill(data.email);
    await this.passwordInput.fill(data.password);
    await this.confirmPasswordInput.fill(data.confirmPassword);
    await this.submitButton.click();
  }

  async submit() {
    await this.submitButton.click();
  }

  async goToLogin() {
    await this.loginLink.click();
  }

  // ── Assertions helpers ───────────────────

  async getErrorMessages() {
    return this.page.locator('[data-slot="form-message"]').allTextContents();
  }
}
