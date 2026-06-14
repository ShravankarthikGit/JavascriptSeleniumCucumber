// Run one feature file with retries
npx cucumber-js features/login.feature --format summary --format allure-cucumberjs/reporter --retry 2

// Run all the feature files
npm run test:allure   

// Generate and view report
npm run allure:generate

// To view the report
npm run allure:open
