Feature: OpenCart Product Catalog Search and Checkout Management

  Scenario: Verify customer can search products and add them to the cart via bulk CSV data
    Given I read catalog inputs from CSV file "products.csv"
    Then I verify each product item sequentially in the storefront
