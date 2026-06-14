Feature: Open multiple tabs

  Scenario: Open and switch between multiple browser windows
    Given the user navigates to login page
    When User opens a new tab and navigates to Google
    And User searches for "Selenium" in the new tab
    Then User switches back to the laptops page and prints titles
