import {By, until } from 'selenium-webdriver';

// ✅ Modern ESM Import (Note the mandatory '.js' file extension)
import loginLocators from './locators/login.locators.js'; 

class LoginPage {
        /**
   * @param {WebDriver} driver 
   */
    constructor(driver) {
        this.driver = driver;
        this.timeout = 10000;
    }

    async setEmail(email) {
        const element = await this.driver.wait(until.elementLocated(loginLocators.txtEmailAddress), this.timeout);
        await element.clear();
        await element.sendKeys(email);
    }

    async setPassword(pwd) {
        const element = await this.driver.wait(until.elementLocated(loginLocators.txtPassword), this.timeout);
        await element.clear();
        await element.sendKeys(pwd);
    }

    async clickLogin() {
        const element = await this.driver.wait(until.elementLocated(loginLocators.btnLogin), this.timeout);
        await element.click();
    }

    async loginAlertText() {
        const element = await this.driver.wait(until.elementLocated(loginLocators.loginAlert), this.timeout);
        return await element.getText()
    }
}

export default LoginPage;