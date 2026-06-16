import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';

// ✅ Modern ESM Imports (Note the mandatory '.js' file extensions)
import HomePage from '../../pages/home.page.js';
import LoginPage from '../../pages/login.page.js';
import MyAccountPage from '../../pages/myAccount.page.js';
import DriverConfig from '../../config/driver.config.js';
import logger from '../../config/logger.js'; 

Given('the user navigates to login page', async function () {
    // Instantiate the page object using the browser driver context shared from hooks.js
    logger.info("the user navigates to login page...");
    const homePage = new HomePage(this.driver);

    // Perform actions
    await homePage.clickMyAccount();
    await homePage.clickLogin();
});

When('the user enters credentials and logs in', async function () {
    const loginPage = new LoginPage(this.driver);

    // Pull credentials directly from your .env environment configurations
    const userEmail = process.env.EMAIL || 'pavanoltraining@gmail.com';
    const userPassword = process.env.PASSWORD || 'test@123';

    // Call your exact step actions sequentially
    await loginPage.setEmail(userEmail);
    await loginPage.setPassword(userPassword);
    await loginPage.clickLogin();
});

When('the user enters invalid credentials and logs in', async function () {
    const loginPage = new LoginPage(this.driver);

    // Pull credentials directly from your .env environment configurations
    const userEmail = process.env.EMAIL || 'pavano@gmail.com';
    const userPassword = process.env.PASSWORD || 'testttt@123';

    // Call your exact step actions sequentially
    await loginPage.setEmail(userEmail);
    await loginPage.setPassword(userPassword);
    await loginPage.clickLogin();
});

When('the user searches for a product {string}', async function (productName) {
    const homePage = new HomePage(this.driver);

    // Executes your brand new translated search methods back-to-back
    await homePage.enterProductName(productName);
    await homePage.clickSearch();
});

// 1. File-scoped tracker variable
let savedRandomUsername = null;

When('the user enters username {string} and password {string} and clicks login button', async function (username, password) {
    const loginPage = new LoginPage(this.driver);
    // 2. Check if the feature file is passing the trigger value '4324'
    if (username === '4324' || username === 4324) {
        // If this is the FIRST time seeing '4324', generate it once
        if (savedRandomUsername === null) {
            savedRandomUsername = DriverConfig.randomNumber();
            console.log(`[LOG] Generated new random username: ${savedRandomUsername}`);
        }
        // Overwrite the username variable with our saved random value
        username = savedRandomUsername;
    }
    // data populated from feature file
    await loginPage.setEmail(username);
    await loginPage.setPassword(password);
    await loginPage.clickLogin();
});


Then('the user should be redirected to the My Account page', async function () {
    const myAccountPage = new MyAccountPage(this.driver);

    // Assert that the private account dashboard header element is successfully visible
    const isHeaderVisible = await myAccountPage.isMyAccountPageExists();
    expect(isHeaderVisible).to.be.true;
});


Then('validate login result based on message {string}', async function (expectedmessage) {
    const myAccountPage = new MyAccountPage(this.driver);
    const loginPage = new LoginPage(this.driver);

    if (expectedmessage === 'My Account') {
        // Assert that the private account dashboard header element is successfully visible
        const isHeaderVisible = await myAccountPage.isMyAccountPageExists();
        expect(isHeaderVisible).to.be.true;
    }
    else if (expectedmessage === 'Warning: No match for E-Mail Address and/or Password.') {
        let actualtext = await loginPage.loginAlertText();
        if (!actualtext.includes(expectedmessage)) {
            throw new Error(
                `\n❌ LOGIN WARNING ASSERTION FAILED!\n` +
                `Expected text to contain: "${expectedmessage}"\n` +
                `Actual text received:     "${actualtext}"\n`
            );
        }
    }
    else if (expectedmessage === 'Warning: Your account has exceeded allowed number of login attempts. Please try again in 1 hour.') {
        let actualtext = await loginPage.loginAlertText();
        if (!actualtext.includes(expectedmessage)) {
            throw new Error(
                `\n❌ LOGIN WARNING ASSERTION FAILED!\n` +
                `Expected text to contain: "${expectedmessage}"\n` +
                `Actual text received:     "${actualtext}"\n`
            );
        }
    }
});
