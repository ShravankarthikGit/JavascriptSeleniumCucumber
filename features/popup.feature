Feature: Practice Portal Window Popup Automation

  Scenario: Interact with the separate Popup Window and return safely
    Given I navigate to the test automation practice site
    When I click the Popup Windows button
    Then I switch focus to the newly opened popup window context
    And I close the popup window and return back to the home base layout
