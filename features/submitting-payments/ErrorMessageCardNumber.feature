@sep25
Feature: Error message for the invalid card number

    As a user, I want to be informed when my card info has failed. 

    #* AC1: An immediate error message should be thrown if the card number is wrong or too short:
    #*              Your card number is incomplete.
    #*              Your card number is invalid.


    Background:
        Given user is on the review payment page

    @sep25
    Scenario: An incomplete card number displays an immediate error
        When user enters card number "4242"
        Then the card number error should say "Your card number is incomplete."

    @sep25
    Scenario: An invalid card number displays an immediate error
        When user enters card number "1234567890123456"
        Then the card number error should say "Your card number is invalid."