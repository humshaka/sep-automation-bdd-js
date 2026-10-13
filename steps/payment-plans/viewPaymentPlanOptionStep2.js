import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { paymentPlanPage } from "../../globalPagesSetup.js";
import { productInfo } from "../../utilities/qa-data-reader.js";

Then("one upfront payment option should be displayed", async function () {
  await expect(paymentPlanPage.upfrontPaymentOption).toHaveCount(1);
  await expect(paymentPlanPage.upfrontPaymentOption).toBeVisible();
});

Then("the upfront payment should be labeled pay once", async function () {
  await expect(paymentPlanPage.upfrontPaymentAmount).toContainText("$");
  await expect(paymentPlanPage.payOnceTextUpFront).toContainText("pay once");
});

Then("the configured number of payment plans should be displayed", async function () {
  const expectedPlanCount = productInfo.prices.filter(
    (price) => price.active
  ).length;
  await expect(paymentPlanPage.paymentPlanBoxes).toHaveCount(expectedPlanCount);
});

Then("the installment option should show the configured installment count", async function () {
  const installmentPlan = productInfo.prices.find(
    (price) => price.active && price.numberOfInstallments
  );
  expect(installmentPlan).toBeDefined();
  await paymentPlanPage.installmentsPaymentFrame.click();
  await expect(paymentPlanPage.installmentsPaymentOption).toContainText(
    String(installmentPlan.numberOfInstallments)
  );
  await expect(paymentPlanPage.installmentsPaymentAmount).toContainText("$");
  await expect(paymentPlanPage.perMonthTextInstallments).toContainText(
    "per month"
  );
});

Then("each payment plan should be unique", async function () {
  const labels = (await paymentPlanPage.paymentPlanBoxes.allTextContents())
    .map((label) => label.trim())
    .filter(Boolean);
  expect(new Set(labels).size).toBe(labels.length);
});