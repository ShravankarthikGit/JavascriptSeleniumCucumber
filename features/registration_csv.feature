Feature: Register user on ecommerce site
  @skip
  Scenario: Complete registration of new user
    Given user navigates to registration page
    Given I read catalog inputs from CSV file "accountCreationData.csv"
    When user enters all the details required for registration from csv
    Then validate account creation text
