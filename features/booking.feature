@api @regression
Feature: Booking Lifecycle
  As an API consumer
  I want to manage hotel bookings through the Restful-Booker API
  So that I can perform full CRUD operations

  @booking-001
  Scenario: Complete booking lifecycle - create, read, update and delete
    Given I authenticate with the Restful-Booker API
    When I create a new booking
    Then the booking is created with status 200
    When I retrieve the booking by its ID
    Then the retrieved booking matches the created data
    When I update the checkout date to "2025-06-15"
    Then the booking is updated successfully
    When I delete the booking
    Then the deletion response returns status 201
    And retrieving the deleted booking returns 404
