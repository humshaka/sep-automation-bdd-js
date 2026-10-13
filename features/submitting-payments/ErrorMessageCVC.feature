@sep29
Feature: Error message for the invalid CVC number

    As a user, I want to be informed when the CVC number I enter is incorrect or too short.

    #* AC1: The Immediate error message should be thrown if the CVC number is too short or wrong. "Your card's security code is incomplete."


    Background:
        Given user is on the review payment page

    @sep29
    Scenario: An incomplete security code displays an immediate error
        When user enters CVC "1"
        Then the CVC error should say "Your card's security code is incomplete."