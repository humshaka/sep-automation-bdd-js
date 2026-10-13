@sep16
Feature: Click on the next button on payment plans page   #! Test Only

    As a customer, I should be able to click on the next button on step 2 when I select a plan.

    #* AC1: Clicking on any plan should activate the next button
    #* AC2: When the customer clicks on the next button, the Step 3 page should be displayed.
    #* AC3: In the stepper, steps 1 and 2 should be green, and step 3 should be blue.
    #* AC4: The payment component should be displayed.
    #* AC5: A price summary should be displayed.
    #* AC6: The back button should be displayed.
    #* AC7: By default, the pay button should be displayed.


    @sep16
    Scenario: Selecting a plan enables Next and opens the review page
        Given user is on the payment plan page
        When user selects the "upfront" payment plan
        Then the payment plan Next button should be enabled
        When user clicks the payment plan Next button
        Then the review payment page should be displayed

    @sep16
    Scenario: The review page shows its payment form, summary, back, and Pay controls
        Given user is on the review payment page
        Then the payment component should be displayed
        And the price summary should be displayed
        And the back button should be displayed on the review page
        And the Pay button should be displayed

    @sep16
    Scenario: Checkout progress reflects the review step
        Given user is on the review payment page
        Then the first two checkout steps should be green and the review step blue
