@inventory @regression
Feature: Inventory Page
  As a logged-in standard user
  I want to add items to the cart from the inventory
  So that I can prepare my purchase

  Background:
    Given I am logged in as "standard_user"
    And I am on the inventory page

  @inventory-001 @smoke
  Scenario: Add two distinct items to the cart and verify badge count
    When I add "Sauce Labs Backpack" to the cart from inventory
    And I add "Sauce Labs Bike Light" to the cart from inventory
    Then the cart badge should display "2"
