@sep08
Feature: Display the steps of the checkout process

    As a customer, I should be able to know where I am in the checkout process using the stepper.

    #* AC1: The system should display the steps of the checkout process as "1-Start Application", "2-Payment Plan", and "3-Review".
    #* AC2: The system should highlight "Start Application" in blue.
    #* AC3: The system should display "Payment Plan" and "Review" in grey.


    Background:
        Given user is on the enrollment page

    @sep08
    Scenario: Verify all checkout process steps are displayed
        Then the Start application step should be displayed
        And the Payment Plan step should be displayed
        And the Review step should be displayed

    @sep08
    Scenario: Verify Start Application step is highlighted in blue
        Then the Start Application step should be highlighted in blue

    @sep08
    Scenario: Verify Payment Plan and Review step are grey
        Then the Payment Plan step should be displayed in grey
        And the Review step should be displayed in grey