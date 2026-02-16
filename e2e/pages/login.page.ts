import type { Page } from '@playwright/test';

/**
 * Page Object Model – Login Page
 *
 * Encapsulates all selectors and actions for the login page.
 * Tests should interact through this class, never using raw selectors.
 *
 * @example
 * const loginPage = new LoginPage(page);
 * await loginPage.goto();
 * await loginPage.login('user@email.com', 'password');
 */
export class LoginPage {
  constructor(private readonly page: Page) {}

  // ── Selectors ────────────────────────────
  private get emailInput()    { return this.page.getByLabel('E-posta'); }
  private get passwordInput() { return this.page.getByLabel('Şifre'); }
  private get submitButton()  { return this.page.getByRole('button', { name: /giriş yap/i }); }
  private get registerLink()  { return this.page.getByRole('link', { name: /kayıt ol/i }); }
  private get pageHeading()   { return this.page.getByText('Tekrar hoş geldin'); }

  // ── Actions ──────────────────────────────

  /** Navigate to the login page */
  async goto() {
    await this.page.goto('/login');
  }

  /** Fill in credentials and submit */
  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  /** Fill in only the email */
  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  /** Fill in only the password */
  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  /** Click the submit button */
  async submit() {
    await this.submitButton.click();
  }

  /** Navigate to register page via link */
  async goToRegister() {
    await this.registerLink.click();
  }

  // ── Assertions helpers ───────────────────

  /** Check if the page heading is visible */
  async isVisible() {
    return this.pageHeading.isVisible();
  }

  /** Get all validation error messages */
  async getErrorMessages() {
    // Login sayfasında shadcn Form bileşeni kullanılmadığı için data-slot yok.
    // Direkt class üzerinden seçiyoruz.
    return this.page.locator('.text-destructive').allTextContents();
  }
}
