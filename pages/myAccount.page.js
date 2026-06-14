import { By, until } from 'selenium-webdriver';

class MyAccountPage {
    constructor(driver) {
        this.driver = driver;
        this.timeout = 10000; // 10-second explicit wait window

        // Direct mapping of your exact Java elements to Selenium By locators
        this.msgHeading = By.xpath("//h2[text()='My Account']");
        this.lnkLogout = By.xpath("//div[@class='list-group']//a[text()='Logout']");
    }


    async isMyAccountPageExists() {
        try {
            const element = await this.driver.wait(until.elementLocated(this.msgHeading), this.timeout);
            return await element.isDisplayed();
        } catch (error) {
            return false;
        }
    }

    // Direct translation of public void clickLogout()
    async clickLogout() {
        const element = await this.driver.wait(until.elementLocated(this.lnkLogout), this.timeout);
        await element.click();
    }
}

export default MyAccountPage;
