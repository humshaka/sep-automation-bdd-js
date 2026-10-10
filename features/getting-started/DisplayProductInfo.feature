@sep09
Feature: Display the product information

    As a customer, I should be able to see the product information.

    #* AC1: The product name should be displayed on the information card.
    #* AC2: The product name on the information card matches the product name on the left side of the screen.
    #* AC3: The price of the product should be displayed.
    #* AC4: The text indicating a flexible payment plan should be available and displayed.
    #* AC5: The program start date should be displayed.
    #* AC6: The return policy and the final date for returns should be displayed.




    Background:
        Given user is on the enrollment page


    @sep09
    Scenario: Verify product name is displayed on the information card
        Then the product name should be displayed on the information card

    @sep09
    Scenario: Verify product name matches the left side of the screen
        Then the product name on the information card should match the product name on the left side

    @sep09
    Scenario: Verify product price is displayed
        Then the product price should be displayed

    @sep09
    Scenario: Verify flexible payment plan text is displayed
        Then the flexible payment plan text should be displayed

    @sep09
    Scenario: Verify program start date is displayed
        Then the program start date should be displayed

    @sep09
    Scenario: Verify refund policy and final refund date are displayed
        Then the refund policy text should be displayed
        And the final refund date should be displayed
