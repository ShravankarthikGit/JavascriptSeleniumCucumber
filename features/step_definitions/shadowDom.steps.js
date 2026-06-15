
import { By, until } from 'selenium-webdriver';
import { expect } from 'chai';
import { Given, When, Then } from '@cucumber/cucumber';

import ChromeSettingsPage from '../../pages/googleBrowserSettings.page.js'


Given('I navigate to the Chrome settings page', { timeout: 10000 }, async function () {
    const chromesettingurl = process.env.CHROME_SETTINGS_URL
    await this.driver.get(chromesettingurl)
});

When('I type {string} into the nested settings search bar', { timeout: 15000 }, async function (searchSetting) {
    this.settingsPage = new ChromeSettingsPage(this.driver);

    const uihost = await this.driver.wait(until.elementLocated(By.css("settings-ui")));
    const uiRoot = await uihost.getShadowRoot();

    const crtoolbarhost = await uiRoot.findElement(By.css("cr-toolbar"));
    const crtoolbarroot = await crtoolbarhost.getShadowRoot();

    const crtoolbarsearchfieldhost = await crtoolbarroot.findElement(By.css("cr-toolbar-search-field"));
    const crtoolbarsearchfieldroot = await crtoolbarsearchfieldhost.getShadowRoot();

    // Locate the final input tag
    const searchInput = await crtoolbarsearchfieldroot.findElement(By.css("#searchInput"));

    // Interact with the field
    await searchInput.clear();
    await searchInput.sendKeys(searchSetting);

});

Then('the search query should be successfully processed', async function () {
    Then('the search query should be successfully processed', async function () {
        // 1. Pierce down to the privacy section root context using Selenium 4
        const uiHost = await this.driver.findElement(this.settingsPage.settingsUiHost);
        const uiRoot = await uiHost.getShadowRoot();

        const mainHost = await uiRoot.findElement(By.css('settings-main'));
        const mainRoot = await mainHost.getShadowRoot();

        const basicPageHost = await mainRoot.findElement(By.css('settings-basic-page'));
        const basicPageRoot = await basicPageHost.getShadowRoot();

        const privacyPageHost = await basicPageRoot.findElement(By.css('settings-privacy-page'));
        const privacyPageRoot = await privacyPageHost.getShadowRoot();

        // 2. Fetch the locator string from your Page Object class
        const labelLocator = this.settingsPage.searchResultLabel();

        // 3. Locate the WebElement node inside the shadow root context!
        const activeElementNode = await privacyPageRoot.findElement(labelLocator);

        // 4. Extract the visible text string safely
        const labelText = await activeElementNode.getText();
        const actualText = "Privacy and security";

        expect(labelText.toLowerCase()).to.include(actualText.toLowerCase());
    });

});