@sep17
Feature: View payment plan options in Step 2   #! test only

    As a customer, I should be able to see payment plan options in Step 2.

    #* AC1: Upfront payment:
    #*      There should be only one upfront price
    #*      Text should be:
    #*              Upfront  (first row)
    #*              $ <upfont_price> pay once (second row)

    #* AC2: Installment plans:
    #*      There must be total <num> Payment Plans
    #*      There can be <number_of_installments> installments
    #*      If there are installments:
    #*            Text should be
    #*            <number_of_installments> Installments (first row)
    #*           $ <monthly_price> per month (second row)
    #*            Installment plans should be unique



    Background:
        Given user is on the payment plan page

    @sep17
    Scenario: The upfront option shows one payment due once
        Then one upfront payment option should be displayed
        And the upfront payment should be labeled pay once

    @sep17
    Scenario: Installment options match the configured payment plans
        Then the configured number of payment plans should be displayed
        And the installment option should show the configured installment count
        And each payment plan should be unique
