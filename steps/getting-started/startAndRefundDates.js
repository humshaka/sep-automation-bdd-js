import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { startApplicationPage } from "../../globalPagesSetup.js";
import { productInfo } from "../../utilities/qa-data-reader.js";


Given("user is on the enrollment page", async function () {
  await startApplicationPage.login();
});

Then("the programme start date is diplayed", async function () {
  await expect(startApplicationPage.programStartDate).toBeVisible();
});

Then("the refund date should be displayed", async function () {
  await expect(startApplicationPage.refundEndDate).toBeVisible();
});

Then("the displayed start date for the programme is correct", async function () {
  await expect(startApplicationPage.programStartDate).toHaveText(
    productInfo.startDate
  );
});

Then("the displayed refund date for the programme is correct", async function () {
  await expect(startApplicationPage.refundEndDate).toHaveText(
    productInfo.refundDate
  );
});