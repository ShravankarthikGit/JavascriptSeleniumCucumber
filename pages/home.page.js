import { By, until } from 'selenium-webdriver';

class HomePage {

    constructor(driver) {
        this.driver = driver;
        this.timeout = 10000; // 10-second explicit wait window
        this.homePageTitle = By.xpath("//img[@title='naveenopencart']")
        this.lnkMyaccount = By.xpath("//span[normalize-space()='My Account']");
        this.lnkRegister = By.xpath("//a[normalize-space()='Register']");
        this.linkLogin = By.linkText("Login");
        this.txtSearchbox = By.xpath("//input[@placeholder='Search']");
        this.btnSearch = By.xpath("//div[@id='search']//button[@type='button']");
        this.laptopsNotebooks = By.xpath("//a[normalize-space()='Laptops & Notebooks']");
        this.showAllLaptops = By.xpath("//a[normalize-space()='Show All Laptops & Notebooks']");
    }

    async getHomepAgeTitle() {
        const element = await this.driver.wait(until.elementLocated(this.homePageTitle), this.timeout);
        return element
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

    async selectLaptopsAndNotebooks() {
        const parentElement = await this.driver.wait(until.elementLocated(this.laptopsNotebooks), this.timeout);
        // Instantiate the Actions builder
        const actions = this.driver.actions({ bridge: true })
        await actions
            .move({ origin: parentElement })
            .click()
            .perform();
        const element = await this.driver.wait(until.elementLocated(this.showAllLaptops), this.timeout);
        await element.click();
    }
}

export default HomePage;