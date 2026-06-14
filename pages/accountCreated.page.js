import { Key, By, Builder, until } from "selenium-webdriver";
import { expect } from 'chai';


class AccountCreatedPage{
    constructor(driver){
        this.driver = driver;
        this.timeout = 10000;
        // Define locators
        this.accountCreatedText = By.css("div[id='content'] h1")
        this.contunueButton = By.xpath("//a[normalize-space()='Continue']")
    }


    async validateAccountCreation(){
        const element = await this.driver.wait(until.elementLocated(this.accountCreatedText), this.timeout);
        const actualText = await element.getText();
        // Pass the raw string variable into your assertion
        expect(actualText.toLowerCase()).to.include('your account has been created!');
    }
}

export default AccountCreatedPage;