
@sep10
Feature: Enter my Personal details

    As a customer, I should be able to enter my Personal details.

    #* AC1: Default field types and values should be as follows:
    #*          a. First Name: Text field is present.
    #*          b. Last Name: Text field is present.
    #*          c. Email Address: Text field is present and validates for email format.
    #*          d. Phone: The field allows numbers only.
    #* AC2: "How did you hear about us?" A standard dropdown list is present.
    #* AC3: The 'Next' button should be disabled if any required data is missing or invalid.

    Background:
        Given user is on the enrollment page

    Scenario: Verify personal detail fields are displayed
        Then the first name field should be displayed
        And the last name field should be displayed
        And the email field should be displayed
        And the phone field should be displayed

    Scenario: Verify email field rejects an invalid email format
        When user enters first name "Humaira"
        And user enters last name "Kamal"
        And user enters email "invalid-email"
        And user enters phone number "1234567890"
        Then the Next button should be disabled
        Then the personal details form should remain displayed

    Scenario: Verify phone field allows numbers only
        When user enters phone number "1234567890"
        Then the phone field should contain "1234567890"

    Scenario: Verify phone field rejects non-numeric characters
        When user types phone number "abc123"
        Then the phone field should contain digits only

    Scenario: Verify referral source dropdown options are displayed
        When user opens the referral source dropdown
        Then the referral source options should be displayed

    Scenario: Verify Next does not advance when required fields are empty
        Then the Next button should be disabled
        Then the personal details form should remain displayed
