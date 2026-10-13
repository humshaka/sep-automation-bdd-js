@sep14
Feature: Selecting a price plan

    As a customer, I want to be able to Choose a payment plan from the available options 
    so that I can choose the one that best suits my needs.

    #* AC1: When the user selects any payment plan (Accordion) that option should be highlighted to indicate selection.
    #* AC2: Upon selecting any pricing option, the 'Next' button should become active (indicating the user can proceed).
    #* AC3: Users should be able to change their plan selections at any time before finalizing their choice.


    Background:
        Given user is on the payment plan page

    @sep14
    Scenario: Selecting a plan highlights it and enables Next
        When user selects the "upfront" payment plan
        Then the "upfront" payment plan should be highlighted
        And the payment plan Next button should be enabled

    @sep14
    Scenario: A customer can change the selected payment plan
        When user selects the "upfront" payment plan
        And user selects the "installments" payment plan
        Then the "installments" payment plan should be highlighted
        And the payment plan Next button should be enabled