import { Given,Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { startApplicationPage } from "../../globalPagesSetup.js";
import { productInfo } from "../../utilities/qa-data-reader.js";


Given("user is on the enrollment page", async function () {
  await startApplicationPage.login();
});

Then("the programme start date is displayed", async function () {
  await expect(startApplicationPage.programStartDate).toBeVisible();
});

Then("the refund date should be displayed", async function () {
  await expect(startApplicationPage.refundEndDate).toBeVisible();
});

Then("the displayed start date for the programme is correct", async function () {

 const Actual_Start_DATE= await startApplicationPage.programStartDate.innerText();
 const EXPECTED_START_DATE =productInfo.startDate;
 //console.log("Actual Start Date:", Actual_Start_DATE);
 //console.log("Expected Start Date:", EXPECTED_START_DATE);

console.log(`Expected Upfront price${productInfo.prices[0].baseAmount}`)
 console.log(`Expected Upfront amount price${productInfo.prices[0].upfrontDiscountAmount }`);
 expect(Actual_Start_DATE).toBe(EXPECTED_START_DATE);

  
  
  //await expect(startApplicationPage.programStartDate).toHaveText(
    //productInfo.startDate
  //);
});

Then("the displayed refund date for the programme is correct", async function () {

    const Actual_Refund_DATE = await startApplicationPage.refundEndDate.innerText();
    const EXPECTED_Refund_DATE = productInfo.refundDate;
    //console.log("Actual Refund Date:", Actual_Refund_DATE);
    //console.log("Expected Refund Date:", EXPECTED_Refund_DATE);

    expect(Actual_Refund_DATE).toBe(EXPECTED_Refund_DATE);

 
 
 
 
 
  // await expect(startApplicationPage.refundEndDate).toHaveText(
   // productInfo.refundDate
 // );
});