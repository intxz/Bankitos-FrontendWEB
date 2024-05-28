# Complexity: 2

## Scenario: Find bankitos on a 50km radius

Given I am logged in as a user
And I click on the "View place" option
And I click one place
When I click "Buscar bankitos":
Then I should see others bankitos nearly
And the place i click before if it is a bankito
