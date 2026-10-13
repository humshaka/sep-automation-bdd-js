import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { startApplicationPage } from "../../globalPagesSetup.js";

Then("the Cydeo Secure Checkout test should be displayed", async function () {

     await expect(startApplicationPage.checkoutTitle).toBeVisible();

});
Then("the programme name should be displayed", async function () {
    await expect(startApplicationPage.programNameOnInfoCard).toBeVisible();
});


Then("the footer links should be displayed", async function () {
    await expect(startApplicationPage.footerLogo).toBeVisible();
    await expect(startApplicationPage.termsAndConditionsLink).toBeVisible();
    await expect(startApplicationPage.privacyPolicyLink).toBeVisible();
    await expect(startApplicationPage.disclaimerLink).toBeVisible();
    await expect(startApplicationPage.cookiePolicyLink).toBeVisible();

    await startApplicationPage.verifyFooterOrder();
});




Then("the help contact information should be displayed", async function () {
    await expect(startApplicationPage.footer).toBeVisible();
    await expect(startApplicationPage.footer).toContainText(
        "Need help? Contact us at enrollment@cydeo.com"
    );

});
