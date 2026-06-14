
import GoogleSearch from "../../Pages/googleSearch.page.js";
import HomePage from "../../Pages/home.page.js";
import { When, Then } from '@cucumber/cucumber'
import { expect } from 'chai'
import { until } from 'selenium-webdriver'



When('User opens a new tab and navigates to Google', async function () {
    // Track your current main application window handle
    this.mainWindow = await this.driver.getWindowHandle();

    // Open a fresh tab and shift Selenium's focus into it
    await this.driver.switchTo().newWindow('tab');

    const googleSearch = new GoogleSearch(this.driver)
    await googleSearch.openGoogleSearch()
});

When('User searches for {string} in the new tab', async function (searchWord) {
    const googleSearch = new GoogleSearch(this.driver)
    await googleSearch.searchForString(searchWord)
    await this.driver.wait(
        until.urlContains(searchWord),
        10000,
        `Timed out waiting for URL to include ${searchWord}`
    );
    const currentUrl = await this.driver.getCurrentUrl();
    expect(currentUrl.toLowerCase()).to.include('selenium')
});

Then('User switches back to the laptops page and prints titles', async function () {
    const homePage = new HomePage(this.driver)
    await this.driver.switchTo().window(this.mainWindow)
    const logoElement = await homePage.getHomepAgeTitle();
    const isDisplayed = await logoElement.isDisplayed()
    expect(isDisplayed).to.be.true
});