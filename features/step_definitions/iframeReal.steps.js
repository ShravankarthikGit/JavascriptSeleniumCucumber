import { Given, When, Then } from '@cucumber/cucumber';
import { until, By } from 'selenium-webdriver';
import { expect } from 'chai';
import IframePracticePage from '../../pages/iframePractice.page.js';

Given('I navigate to the live iframe testing portal', { timeout: 10000 }, async function () {
    // Open the live web target interface
    await this.driver.get(process.env.IFRAMES_PRACTICE_URL);
    this.iframePage = new IframePracticePage(this.driver);
});

When('I switch the browser context into the nested iframe panel', {timeout:15000}, async function () {
    // 1. Safety timing: Wait until the iframe frame container renders on the main document page
    const iframeElementNode = await this.driver.wait(
        until.elementLocated(this.iframePage.iframeHostElement),
        8000
    );

    // 2. CONTEXT SHIFT: Direct Selenium to pierce the layout and look inside the frame document
    await this.driver.switchTo().frame(iframeElementNode);
});

Then('I verify the "Discord" link is present inside the frame', {timeout:15000}, async function () {
    // 3. Since we are inside the iframe context, we can locate the hidden nested link cleanly
    const discordLinkElement = await this.driver.findElement(this.iframePage.innerDiscordLink);

    // Check its visibility state
    const isDisplayed = await discordLinkElement.isDisplayed();
    expect(isDisplayed).to.be.true;

    // 4. CRITICAL CLEANUP STEP: Return Selenium focus back to the primary main layout view
    // Failing to execute this line blocks subsequent feature scenario steps from running properly!
    await this.driver.switchTo().defaultContent();
});
