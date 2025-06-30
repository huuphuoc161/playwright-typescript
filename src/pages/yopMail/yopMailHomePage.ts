import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput = 'input[name="username"]';
  readonly passwordInput = 'input[name="password"]';
  readonly loginButton = 'button[type="submit"]';
  readonly dashboardHeader = 'h1.dashboard';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://yopmail.com/en/');
  }

  async enterCredentials(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
  }

  async clickLogin() {
    await this.page.click(this.loginButton);
  }

  async isDashboardVisible() {
    return await this.page.isVisible(this.dashboardHeader);
  }
}