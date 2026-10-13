import { BrowserUtility } from '../utilities/BrowserUtility.js';

export class BasePage {

  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;

  }
  
  async login() {
    const requiredEnvironmentVariables = [
      "SEP_QA_URL",
      "SEP_USERNAME",
      "SEP_PASSWORD",
    ];
    const missingVariables = requiredEnvironmentVariables.filter(
      (name) => !process.env[name]
    );
    if (missingVariables.length) {
      throw new Error(
        `Set the following environment variables to access the SEP QA site: ${missingVariables.join(", ")}`
      );
    }

    const code = Buffer.from(
      `${process.env.SEP_USERNAME}:${process.env.SEP_PASSWORD}`
    ).toString("base64");
    await this.page.setExtraHTTPHeaders({
      Authorization: `Basic ${code}`,
    });
    await this.page.goto(process.env.SEP_QA_URL);
    await this.page.waitForLoadState("networkidle");
    await BrowserUtility.verify_title(this.page, "Checkout | Cydeo");
  }

}