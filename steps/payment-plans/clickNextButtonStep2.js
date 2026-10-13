import { Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { paymentPlanPage } from "../../globalPagesSetup.js";

When("user selects the {string} payment plan", async function (plan) {
  await paymentPlanPage.selectPaymentPlan(plan);
});

Then("the payment plan Next button should be enabled", async function () {
  await expect(paymentPlanPage.activeNextButton).toBeEnabled();
});

When("user clicks the payment plan Next button", async function () {
  await paymentPlanPage.clickNextButton();
});