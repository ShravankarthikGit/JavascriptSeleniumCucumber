# Selenium + Cucumber + Allure Commands

## Run One Feature File with Retries

```bash
npx cucumber-js features/login.feature --format summary --format allure-cucumberjs/reporter --retry 2
```

## Run All Feature Files

```bash
npm run test:allure
```

## Generate Allure Report

```bash
npm run allure:generate
```

## Open Allure Report

```bash
npm run allure:open
```

## Complete Workflow

### Run a Single Feature

```bash
npx cucumber-js features/login.feature --format summary --format allure-cucumberjs/reporter --retry 2
npm run allure:generate
npm run allure:open
```

### Run All Features

```bash
npm run test:allure
npm run allure:generate
npm run allure:open
```
