@login @regression
Feature: Login
  As a visitor
  I want to authenticate into Swag Labs
  So that I can access the product inventory

  Background:
    Given I am on the login page

  @login-001 @smoke
  Scenario: Successful login with standard_user credentials
    When I enter username "standard_user" and password "secret_sauce"
    And I click the login button
    Then I should be redirected to the inventory page
    And the inventory page title should be "Products"
