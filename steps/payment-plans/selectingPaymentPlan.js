import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { paymentPlanPage } from "../../globalPagesSetup.js";

Then("the {string} payment plan should be highlighted", async function (plan) {
  const selectedPlan = plan.toLowerCase().includes("upfront")
    ? paymentPlanPage.upfrontPaymentFrame
    : paymentPlanPage.installmentsPaymentFrame;
  await expect(selectedPlan).toHaveAttribute("aria-expanded", "true");
});