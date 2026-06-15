Feature: Open multiple tabs

  Scenario: Open and switch between multiple browser windows
    Given the user navigates to login page
    When User opens a new window and navigates to Google
    And User searches for "Selenium" in the new tab or window
    Then User switches back to the laptops page and prints titles
