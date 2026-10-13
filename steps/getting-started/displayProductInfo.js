import { Given, Then, When } from "@cucumber/cucumber";
import { expect} from "@playwright/test";
import { startApplicationPage, page } from "../../globalPagesSetup.js";
import { productInfo } from "../../utilities/qa-data-reader.js";


Then("the product name should be displayed on the information card", async function () {
  await expect(
    startApplicationPage.programNameOnInfoCard
  ).toBeVisible();
});

Then(
  "the product name on the information card should match the product name on the left side",
  async function () {
    const cardName = (
      await startApplicationPage.programNameOnInfoCard.textContent()
    )?.trim();

    const leftName = (
      await startApplicationPage.programNameOnLeftSide.textContent()
    )?.trim();

    expect(cardName).toBe(leftName);
  }
);

Then("the product price should be displayed", async function () {
  await expect(startApplicationPage.programPrice).toBeVisible();
  await expect(startApplicationPage.programPrice).not.toBeEmpty();
});

Then("the flexible payment plan text should be displayed", async function () {
  await expect(startApplicationPage.flexiblePaymentsPlanAvailableText
  ).toBeVisible();
});

Then("the program start date should be displayed", async function () {
  await expect(startApplicationPage.programStartDate).toBeVisible();
  await expect(startApplicationPage.programStartDate).not.toBeEmpty();
});

Then("the refund policy text should be displayed", async function () {
  await expect(startApplicationPage.refundPolicyText).toBeVisible();
});

Then("the final refund date should be displayed", async function () {
  await expect(startApplicationPage.refundEndDate).toBeVisible();
  await expect(startApplicationPage.refundEndDate).not.toBeEmpty();
});

