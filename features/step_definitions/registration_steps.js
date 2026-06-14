import { Given, When, Then } from '@cucumber/cucumber'; 
import { expect } from 'chai'; 
import { By, until } from 'selenium-webdriver';

// ✅ FIX: Converted to import statements and added mandatory '.js' extensions
import HomePage from '../../pages/home.page.js'; 
import RegistrationPage from '../../pages/registration.page.js'; 
import AccountCreatedPage from '../../pages/accountCreated.page.js'; 
import DriverConfig from '../../config/driver.config.js'; 

Given('user navigates to registration page', async function () {
    const homePage = new HomePage(this.driver);
    await homePage.clickMyAccount()
    await homePage.clickRegister()
});

When('user enters all the details required for registration', async function () {
    const registrationPage = new RegistrationPage(this.driver)

    await registrationPage.enterFirstname(DriverConfig.randomString())
    await registrationPage.enterLastName(DriverConfig.randomString())

    let email = DriverConfig.randomString() + "@gmail.com"
    await registrationPage.enterEmail(email)
    await registrationPage.enterTelephone(DriverConfig.randomNumber())

    let pass = DriverConfig.randomString()
    await registrationPage.enterPassword(pass)
    await registrationPage.enterConfirmPassword(pass)
    await registrationPage.clickUnsubscribe()
    await registrationPage.clickAgreePolicy()
    await registrationPage.clickContinueButton()
});


// ✅ Added a custom 60-second timeout parameter to give the CSV loop breathing room
When('user enters all the details required for registration from csv', { timeout: 60000 }, async function () {
    const registrationPage = new RegistrationPage(this.driver);
    const registrationdata = this.csvDataset;

    for (const record of registrationdata) {
        if (!record || !record.firstName) {
            console.log(`⚠️ Warning: Found an empty row or invalid record structure in CSV. Skipping row...`);
            continue;
        }

        console.log(`\n🔎 Bulk CSV Processing: Searching for records with firstname as [${record.firstName}]`);
        
        await registrationPage.enterFirstname(record.firstName);
        await registrationPage.enterLastName(record.lastName); 
        
        let uniqueEmail = `test_${Date.now()}_${record.email}`;
        await registrationPage.enterEmail(uniqueEmail);
        
        await registrationPage.enterTelephone(record.Phone);
        await registrationPage.enterPassword(record.pass);
        await registrationPage.enterConfirmPassword(record.pass);
        
        await registrationPage.clickUnsubscribe();
        await registrationPage.clickAgreePolicy();
        await registrationPage.clickContinueButton();

        if (registrationdata.indexOf(record) < registrationdata.length - 1) {
            await this.driver.wait(until.urlContains('success'), 10000);
            const homePage = new HomePage(this.driver); 
            await homePage.clickMyAccount(); 
            
            await (this.driver.wait(
                until.elementLocated(By.xpath("//ul[@class='dropdown-menu dropdown-menu-right']//a[normalize-space()='Logout']")), 
                10000
            )).click(); 
            
            await this.driver.wait(until.urlContains('logout'), 10000);
            await homePage.clickMyAccount();
            await homePage.clickRegister(); 
        }
    }
});


Then('validate account creation text', async function () {
    const accountCreatedPage = new AccountCreatedPage(this.driver);
    await accountCreatedPage.validateAccountCreation();
});