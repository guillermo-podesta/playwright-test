@cart @regression
Feature: Cart Verification
  As a logged-in standard user with items in my cart
  I want to review the cart contents
  So that I can confirm the correct items and quantity before checkout

  Background:
    Given I am logged in as "standard_user"
    And I am on the inventory page
    And I have added "Sauce Labs Backpack" to the cart
    And I have added "Sauce Labs Bike Light" to the cart
    And I am on the cart page

  @cart-001 @smoke
  Scenario: Cart contains the two added items with correct count
    Then the cart should have 2 items
    And the cart should contain "Sauce Labs Backpack"
    And the cart should contain "Sauce Labs Bike Light"
