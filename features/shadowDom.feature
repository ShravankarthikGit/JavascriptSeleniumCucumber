Feature: Chrome Settings Search Automation

  Scenario: Search for cookie settings inside the browser configuration
    Given I navigate to the Chrome settings page
    When I type "Cookies" into the nested settings search bar
    Then the search query should be successfully processed