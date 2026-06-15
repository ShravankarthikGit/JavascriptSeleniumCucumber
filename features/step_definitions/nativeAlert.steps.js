import { Given, When, Then } from '@cucumber/cucumber';
import { until } from 'selenium-webdriver';
import { expect } from 'chai';
import AlertsPracticePage from '../../pages/alert.page.js';

Given('I navigate to the alerts testing sandbox page', { timeout: 10000 }, async function () {
    // Navigate to the public sandbox site
    await this.driver.get(process.env.PRACTICE_AUTOMATION);
    
    // Initialize the page object context
    this.alertsPage = new AlertsPracticePage(this.driver);
});

When('I click the trigger button for the JS Confirm popup', async function () {
    // Find the button and click it to fire the native popup window
    const button = await this.driver.findElement(this.alertsPage.confirmAlertButton);
    await button.click();
});

Then('I should read the alert popup text {string}', async function (expectedAlertText) {
    // 1. Safety Timing: Wait up to 5 seconds for the OS/Browser to draw the popup
    await this.driver.wait(until.alertIsPresent(), 5000);

    // 2. SWITCH LAYER: Shift Selenium's focus from HTML to the native browser alert layer
    const activeAlertWindow = await this.driver.switchTo().alert();

    // 3. Extract and check the text inside the window shell
    const actualAlertText = await activeAlertWindow.getText();
    expect(actualAlertText).to.equal(expectedAlertText);
});

Then('I cancel the popup window safely', async function () {
    // Re-verify context to the active alert
    const activeAlertWindow = await this.driver.switchTo().alert();

    // Simulates a user clicking the "Cancel" button on the popup window
    // (If you wanted to click "OK", you would use: await activeAlertWindow.accept())
    await activeAlertWindow.dismiss();

    // Short pause just to visually verify the window closed on your screen
    await this.driver.sleep(1500);
});
