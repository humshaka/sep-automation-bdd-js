import { Given, Then, When } from "@cucumber/cucumber";
import { expect} from "@playwright/test";
import { startApplicationPage, page } from "../../globalPagesSetup.js";
import { productInfo } from "../../utilities/qa-data-reader.js";


Then("the Start application step should be displayed", async function () {
  await expect(startApplicationPage.startApplicationText).toBeVisible();
  await expect(startApplicationPage.startApplicationStepCircle).toBeVisible();
  await expect(startApplicationPage.startApplicationStepCircle).toHaveText("1");
});

Then("the Payment Plan step should be displayed", async function () {
  await expect(startApplicationPage.paymentPlanText).toBeVisible();
  await expect(startApplicationPage.paymentPlanStepCircle).toBeVisible();
  await expect(startApplicationPage.paymentPlanStepCircle).toHaveText("2");
});

Then("the Review step should be displayed", async function () {
  await expect(startApplicationPage.reviewText).toBeVisible();
  await expect(startApplicationPage.reviewStepCircle).toBeVisible();
  await expect(startApplicationPage.reviewStepCircle).toHaveText("3");
});

Then("the Start Application step should be highlighted in blue", async function () {
  await expect(startApplicationPage.startApplicationStepCircle).toHaveCSS(
    "background-color",
    "rgb(1, 201, 255)"
  );
});

Then("the Payment Plan step should be displayed in grey", async function () {
  await expect(startApplicationPage.paymentPlanText).toHaveCSS(
    "color",
    "rgb(130, 154, 177)"
  );
});

Then("the Review step should be displayed in grey", async function () {
  await expect(startApplicationPage.reviewText).toHaveCSS(
    "color",
    "rgb(130, 154, 177)"
  );
});
