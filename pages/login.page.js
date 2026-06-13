const { until } = require('selenium-webdriver');
// Import the detached selectors module
const locators = require('./locators/login.locators'); 

class LoginPage {
    constructor(driver) {
        this.driver = driver;
        this.timeout = 10000;
    }

    async setEmail(email) {
        const element = await this.driver.wait(until.elementLocated(locators.txtEmailAddress), this.timeout);
        await element.clear();
        await element.sendKeys(email);
    }

    async setPassword(pwd) {
        const element = await this.driver.wait(until.elementLocated(locators.txtPassword), this.timeout);
        await element.clear();
        await element.sendKeys(pwd);
    }

    async clickLogin() {
        const element = await this.driver.wait(until.elementLocated(locators.btnLogin), this.timeout);
        await element.click();
    }
}

module.exports = LoginPage;
