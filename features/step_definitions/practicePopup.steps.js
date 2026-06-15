import { Given, When, Then } from '@cucumber/cucumber';
import { until, By } from 'selenium-webdriver';
import PracticePage from '../../pages/practice.page.js';

Given('I navigate to the test automation practice site', { timeout: 10000 }, async function () {
    // Open the target blogspot automation practice site
    await this.driver.get(process.env.PRACTICE_AUTOMATION);
    this.practicePage = new PracticePage(this.driver);
});

When('I click the Popup Windows button', async function () {
    // 1. Capture the unique tracking ID handle of your main page
    this.mainPageHandle = await this.driver.getWindowHandle();

    // 2. Click the button to launch the separate browser popup context
    const button = await this.driver.findElement(this.practicePage.popupWindowButton);
    await button.click();
});

Then('I switch focus to the newly opened popup window context', { timeout: 15000 }, async function () {
    // 3. Wait up to 8 seconds until the browser registers the second window handle
    await this.driver.wait(async () => {
        const handles = await this.driver.getAllWindowHandles();
        return handles.length === 3;
    }, 8000, "The secondary popup window failed to open.");

    // 4. Fetch all active window handle ID strings from the browser session
    const allHandles = await this.driver.getAllWindowHandles();

    // 5. Isolate the handle that is NOT our main page handle
    for (let currentHandle of allHandles) {
        // Skip your main page so you don't accidentally close it!
        if (currentHandle === this.mainPageHandle) {
            continue; 
        }
        await this.driver.switchTo().window(currentHandle); 
        console.log("Selenium is now inspecting window title: " + await this.driver.getTitle()); 
        await this.driver.close(); 
    }
});

When('I close the popup window and return back to the home base layout', async function () {

    await this.driver.switchTo().window(this.mainPageHandle);
    // Verify we are safely back on the home page by ensuring the home button is findable
    await this.driver.wait(until.elementLocated(this.practicePage.popupWindowButton), 5000);
});
