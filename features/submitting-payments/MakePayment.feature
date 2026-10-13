@sep23
Feature: Make a payment

    As a customer, I should be able to make payments so I can enroll in the program.

    #* AC1: When the user enters valid card information, checks the terms and conditions checkbox, 
    #*      and clicks on the Pay button, then they should be redirected to the confirmation page.

    #* AC2: In the stepper, steps 1, 2, 3 should be green.
    #* AC3: The correct program name should be displayed.
    #* AC4: The correct user email should be displayed.
    #* AC5: The correct company contact information should be displayed.

    Background:
        Given user is on the review payment page

    @sep23
    Scenario: A valid card payment completes enrollment
        When user enters the configured valid card details
        And user has accepted the terms and conditions
        And user clicks the Pay button
        Then the payment confirmation should be displayed
        And all checkout steps should be complete
        And the confirmation should show the program and company contact information

