const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');

// 1. Import your Page Object classes cleanly (no duplicates)
const HomePage = require('../../pages/home.page');
const LoginPage = require('../../pages/login.page');
const MyAccountPage = require('../../pages/myAccount.page');

Given('the user navigates to login page', async function () {
    // Instantiate the page object using the browser driver context shared from hooks.js
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

When('the user searches for a product {string}', async function (productName) {
    const homePage = new HomePage(this.driver);
    
    // Executes your brand new translated search methods back-to-back
    await homePage.enterProductName(productName);
    await homePage.clickSearch();
});

Then('the user should be redirected to the My Account page', async function () {
    const myAccountPage = new MyAccountPage(this.driver);
    
    // Assert that the private account dashboard header element is successfully visible
    const isHeaderVisible = await myAccountPage.isMyAccountPageExists();
    expect(isHeaderVisible).to.be.true;
});
