Feature: Mobile Login
  As a user, I want to log in to the website on a mobile device

  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I enter username "testuser" and password "password123"
    And I click the login button
    Then I should see the dashboard