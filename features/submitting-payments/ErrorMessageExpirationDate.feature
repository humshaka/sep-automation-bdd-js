@sep27
Feature: Error messages for the invalid expiration number

    As a user, I want to be informed when my card's expiration date has failed. 


    #* AC1: 1. An immediate error message should be thrown if the expiration number is too short or wrong:
    #*                  Your card's expiration date is incomplete.
    #*                  Your card's expiration year is in the past.


    Background:
        Given user is on the review payment page

    @sep27
    Scenario: An incomplete expiration date displays an immediate error
        When user enters expiration date "1"
        Then the expiration error should say "Your card's expiration date is incomplete."

    @sep27
    Scenario: An expired card displays an immediate error
        When user enters expiration date "01/20"
        Then the expiration error should say "Your card's expiration year is in the past."