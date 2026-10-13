import { When } from "@cucumber/cucumber";
import { reviewPaymentPage } from "../../globalPagesSetup.js";

When("user enters the configured valid card details", async function () {
  const requiredCardValues = [
    ["CARD_NUMBER", process.env.CARD_NUMBER],
    ["CARD_EXPIRATION_DATE", process.env.CARD_EXPIRATION_DATE],
    ["CARD_SECURITY_CODE", process.env.CARD_SECURITY_CODE],
    ["ZIP_CODE", process.env.ZIP_CODE],
  ];
  const missingValues = requiredCardValues
    .filter(([, value]) => !value)
    .map(([name]) => name);
  if (missingValues.length) {
    throw new Error(
      `Set the following environment variables to run the successful payment scenario: ${missingValues.join(", ")}`
    );
  }

  await reviewPaymentPage.enterCardNumber();
  await reviewPaymentPage.enterExpiryDate();
  await reviewPaymentPage.enterCVC();
  await reviewPaymentPage.enterZipCode();
});

When("user clicks the Pay button", async function () {
  await reviewPaymentPage.clickPayButton();
});