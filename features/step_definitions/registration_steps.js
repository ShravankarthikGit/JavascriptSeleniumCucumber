const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const HomePage = require('../../pages/home.page');
const RegistrationPage = require('../../pages/registration.page');
const AccountCreatedPage = require('../../pages/accountCreated.page');



Given('user navigates to registration page', async function () {
    const homePage = new HomePage(this.driver);
    await homePage.clickMyAccount()
    await homePage.clickRegister()
});

When('user enters all the details required for registration', async function () {
    const registrationPage = new RegistrationPage(this.driver)
    await registrationPage.enterFirstname()
    await registrationPage.enterLastName()
    await registrationPage.enterEmail()
    await registrationPage.enterTelephone()
    await registrationPage.enterPassword()
    await registrationPage.enterConfirmPassword()
    await registrationPage.clickUnsubscribe()
    await registrationPage.clickAgreePolicy()
    await registrationPage.clickContinueButton()
});


Then('validate account creation text', async function () {
    const accountCreatedPage = new AccountCreatedPage(this.driver);
    await accountCreatedPage.validateAccountCreation();
});