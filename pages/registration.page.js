const { Key, By , Builder, until} = require("selenium-webdriver");


class RegistrationPage{

    constructor(driver){
        this.driver = driver
        this.timeout = 10000; // 10-second explicit wait window

        //Define all the locators for the gistration page
        this.firstName = By.xpath("//input[@id='input-firstname']");
        this.lastName = By.xpath("//input[@id='input-lastname']");
        this.email = By.xpath("//input[@id='input-email']");
        this.telephone = By.xpath("//input[@id='input-telephone']");
        this.password = By.xpath("//input[@id='input-password']");
        this.confirmPassword =By.xpath("//input[@id='input-confirm']");
        this.subscribeAsNo = By.xpath("//input[@value='0']");
        this.policyCheckBox = By.xpath("//input[@name='agree']");
        this.continueButton = By.xpath("//input[@value='Continue']");
    }

    async enterFirstname(){
        const element = await this.driver.wait(until.elementLocated(this.firstName), this.timeout)
        await element.sendKeys("ramu")
    };

    async enterLastName(){
        const element = await this.driver.wait(until.elementLocated(this.lastName), this.timeout);
        await element.sendKeys("ramu")
    };

    async enterEmail(){
        const element = await this.driver.wait(until.elementLocated(this.email), this.timeout);
        await element.sendKeys("test33@gmail.com");
    }

    async enterTelephone(){
        const element = await this.driver.wait(until.elementLocated(this.telephone), this.timeout);
        await element.sendKeys("7786654444");
    }

    async enterPassword(){
        const element = await this.driver.wait(until.elementLocated(this.password), this.timeout)
        await element.sendKeys("password");
    }

    async enterPassword(){
        const element = await this.driver.wait(until.elementLocated(this.password), this.timeout)
        await element.sendKeys("password");
    }

    async enterConfirmPassword(){
        const element = await this.driver.wait(until.elementLocated(this.confirmPassword), this.timeout)
        await element.sendKeys("password");
    }

    async clickUnsubscribe(){
        const element = await this.driver.wait(until.elementLocated(this.subscribeAsNo), this.timeout)
        await element.click()
    }

    async clickAgreePolicy(){
        const element = await this.driver.wait(until.elementLocated(this.policyCheckBox), this.timeout)
        await element.click()
    }

    async clickContinueButton(){
        const element = await this.driver.wait(until.elementLocated(this.continueButton), this.timeout);
        await element.click()
    }

}

module.exports = RegistrationPage;