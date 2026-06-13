Feature: Register user on ecommerce site

  @focus
  Scenario: Complete registration of new user
    Given user navigates to registration page
    When user enters all the details required for registration
    Then validate account creation text
