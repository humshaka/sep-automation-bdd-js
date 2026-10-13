import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { paymentPlanPage } from "../../globalPagesSetup.js";

Then("the payment plan options should be displayed", async function () {
  await expect(paymentPlanPage.chooseAPaymentPlanText).toBeVisible();
});
