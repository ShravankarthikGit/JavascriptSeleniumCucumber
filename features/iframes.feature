Feature: Real-World IFrame Automation

  Scenario: Interact with a link nested inside a cross-domain iframe
    Given I navigate to the live iframe testing portal
    When I switch the browser context into the nested iframe panel
    Then I verify the "Discord" link is present inside the frame
