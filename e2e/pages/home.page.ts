import type { Page } from '@playwright/test';

/**
 * Page Object Model – Home (Landing) Page
 */
export class HomePage {
  constructor(private readonly page: Page) {}

  private get heading()       { return this.page.getByRole('heading', { name: /enterprise app/i }); }
  private get loginButton()   { return this.page.getByRole('link', { name: /giriş yap/i }); }
  private get registerButton(){ return this.page.getByRole('link', { name: /kayıt ol/i }); }

  async goto() {
    await this.page.goto('/');
  }

  async isVisible() {
    return this.heading.isVisible();
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async clickRegister() {
    await this.registerButton.click();
  }
}
