import { Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { reviewPaymentPage } from "../../globalPagesSetup.js";

When("user enters expiration date {string}", async function (expirationDate) {
  await reviewPaymentPage.enterExpiryDate(expirationDate);
  await reviewPaymentPage.expiryDateInput.press("Tab");
});

Then("the expiration error should say {string}", async function (message) {
  // Get the actual error text and normalize both strings to handle apostrophe encoding
  const actualText = await reviewPaymentPage.cardExpiryErrorMessage.textContent();
  // Remove "card's" prefix variations to focus on the core error message
  const normalizedExpected = message.replace(/card.{0,1}s\s*/i, '').trim();
  const normalizedActual = actualText.replace(/card.{0,1}s\s*/i, '').trim();
  expect(normalizedActual).toContain(normalizedExpected);
});
