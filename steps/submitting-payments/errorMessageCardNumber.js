import { Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { reviewPaymentPage } from "../../globalPagesSetup.js";

When("user enters card number {string}", async function (cardNumber) {
  await reviewPaymentPage.enterCardNumber(cardNumber);
  await reviewPaymentPage.cardNumberInput.press("Tab");
});

Then("the card number error should say {string}", async function (message) {
  await expect(reviewPaymentPage.cardNumberErrorMessage).toHaveText(message);
});