@checkout @regression
Feature: Checkout Flow
  As a logged-in standard user with items in my cart
  I want to complete the checkout process
  So that I can successfully place an order

  Background:
    Given I am logged in as "standard_user"
    And I am on the inventory page
    And I have added "Sauce Labs Backpack" to the cart
    And I have added "Sauce Labs Bike Light" to the cart
    And I am on the cart page

  @checkout-001 @smoke
  Scenario: Complete checkout and verify order confirmation message
    When I proceed to checkout
    And I fill in first name "John", last name "Doe", and zip code "12345"
    And I click continue on the checkout info page
    Then I should be on the checkout overview page
    And the overview should contain "Sauce Labs Backpack"
    And the overview should contain "Sauce Labs Bike Light"
    And the order total should be visible
    When I click finish
    Then I should be on the order complete page
    And the success header should contain "Thank you for your order"
