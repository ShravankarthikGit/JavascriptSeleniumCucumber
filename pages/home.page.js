import { By, until } from 'selenium-webdriver';

class HomePage {
    /**
   * @param {WebDriver} driver 
   */
    constructor(driver) {
        this.driver = driver;
        this.timeout = 10000; // 10-second explicit wait window

        this.lnkMyaccount = By.xpath("//span[normalize-space()='My Account']");
        this.lnkRegister = By.xpath("//a[normalize-space()='Register']");
        this.linkLogin = By.linkText("Login");
        this.txtSearchbox = By.xpath("//input[@placeholder='Search']");
        this.btnSearch = By.xpath("//div[@id='search']//button[@type='button']");
    }

    async clickMyAccount() {
        const element = await this.driver.wait(until.elementLocated(this.lnkMyaccount), this.timeout);
        await element.click();
    }

    async clickRegister() {
        const element = await this.driver.wait(until.elementLocated(this.lnkRegister), this.timeout);
        await element.click();
    }

    async clickLogin() {
        const element = await this.driver.wait(until.elementLocated(this.linkLogin), this.timeout);
        await element.click();
    }

    async enterProductName(pName) {
        const element = await this.driver.wait(until.elementLocated(this.txtSearchbox), this.timeout);
        await element.clear();
        await element.sendKeys(pName);
    }

    async clickSearch() {
        const element = await this.driver.wait(until.elementLocated(this.btnSearch), this.timeout);
        await element.click();
    }
}

export default HomePage;