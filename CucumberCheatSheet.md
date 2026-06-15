# Cucumber.js Test Lifecycle Hooks

This file defines the global, scenario, and step-level hooks to manage driver sessions, log test execution progress, and automatically capture screenshots on failure.

---

## 📂 Implementation Code

Save this file as `features/support/hooks.js` within your automation project.

```javascript
import { BeforeAll, AfterAll, Before, After, BeforeStep, AfterStep } from '@cucumber/cucumber';

// ==========================================
// 1. GLOBAL EXECUTION HOOKS
// ==========================================

BeforeAll(async function () {
  console.log('--- GLOBAL INITIALIZATION: Starting the entire test runner suite ---');
});

AfterAll(async function () {
  console.log('--- GLOBAL CLEANUP: All test scenarios finished executing ---');
});

// ==========================================
// 2. SCENARIO EXECUTION HOOKS
// ==========================================

Before(async function () {
  console.log('>>> SCENARIO START: Setting up driver session for this scenario <<<');
  // Example: This is where you call DriverConfig.initializeBrowser();
});

After(async function (scenario) {
  console.log(`<<< SCENARIO END: Cleaning up session. Status: ${scenario.result.status} <<<`);
  // Example: This is where you call driver.quit();
});

// ==========================================
// 3. STEP EXECUTION HOOKS
// ==========================================

BeforeStep(async function (step) {
  console.log(`  [STEP STARTING]: About to run -> "${step.pickleStep.text}"`);
});

AfterStep(async function (step) {
  console.log(`  [STEP FINISHED]: Finished running -> "${step.pickleStep.text}"`);
  
  // High-Utility Pattern: Take a screenshot automatically IF a step fails!
  if (step.result.status === 'FAILED') {
    console.log('  [ALERT]: Step failed! Capturing error screenshot...');
    
    // Assumes 'this.driver' context exists from your Before hook setup
    if (this.driver) {
      const base64Image = await this.driver.takeScreenshot();
      
      // Attach the visual screenshot asset directly into your Allure report
      this.attach(Buffer.from(base64Image, 'base64'), 'image/png');
    }
  }
});
```

---

## 💡 Execution Flow Overview

When executing a feature file scenario containing steps, the framework adheres to the following chronological lifecycle order:

1. **`BeforeAll`** (Invoked once at suite start)
2. **`Before`** (Invoked once at scenario setup)
3. **`BeforeStep`** (Invoked before Step 1)
4. *Step 1 Executes*
5. **`AfterStep`** (Invoked after Step 1 — checks for failure state to capture screenshots)
6. **`After`** (Invoked once at scenario teardown — handles clean session closures)
7. **`AfterAll`** (Invoked once when all suites complete)
