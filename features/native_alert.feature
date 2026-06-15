Feature: Automated Browser Alerts Testing

  Scenario: Verify that the automation script can cancel a browser confirmation popup
    Given I navigate to the alerts testing sandbox page
    When I click the trigger button for the JS Confirm popup
    Then I should read the alert popup text "I am an alert box!"
    And I cancel the popup window safely
