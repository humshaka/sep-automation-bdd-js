@sep19
Feature: Click on the next button on step 1

    As a customer, I should be able to click on the next button on step 1 when I give valid information.

    #* AC1: The next button should take customers to step 2 when given valid information.
    #*              a. Test by providing all fields
    #*              b. Test by providing only the required fields
    

    Background:
        Given user is on the enrollment page

    @sep19
    Scenario: Continue to payment plans after entering all personal details
        When user enters first name "QA"
        And user enters last name "Automation"
        And user enters email "qa.automation@example.com"
        And user enters phone number "2025550100"
        And user selects "Email" as the referral source
        Then the Next button should be enabled
        When user clicks the Next button
        Then the payment plan options should be displayed

    @sep19
    Scenario: Continue to payment plans with only required personal details
        When user enters first name "QA"
        And user enters last name "Automation"
        And user enters email "qa.automation@example.com"
        And user enters phone number "2025550100"
        Then the Next button should be enabled
        When user clicks the Next button
        Then the payment plan options should be displayed