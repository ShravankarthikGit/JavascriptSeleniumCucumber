Feature: OpenCart User Authentication Lifecycle

  Scenario: Successful customer login using system credentials
    Given the user navigates to login page
    When the user enters credentials and logs in
    Then the user should be redirected to the My Account page

  @focus
  Scenario: Unsuccessful customer login using system credentials
    Given the user navigates to login page
    When the user enters invalid credentials and logs in
    Then the user should be redirected to the My Account page
