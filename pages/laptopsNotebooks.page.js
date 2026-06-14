import { By, until } from 'selenium-webdriver'



class LaptopsNoteBooksPage {
    constructor(driver) {
        this.driver = driver;
        this.timeout = 10000;

        //Define locators
        this.pageTitle = By.css("div[id='content'] h2");
        this.productTitles = By.xpath("//div[@id='content']//h4");
    }

    async getPageTitle() {
        const element = await this.driver.wait(until.elementLocated(this.pageTitle), this.timeout);
        //Wait for the element to actually be visible to the user
        await this.driver.wait(until.elementIsVisible(element), this.timeout);
        const title = await element.getText();
        return title;
    }

    async getProductNames() {
        const elements = await this.driver.wait(until.elementsLocated(this.productTitles), this.timeout);
        for (let ele of elements) {
            const title = await ele.getText()
            console.log(`product tiltle is ${title}`)
        }
    }

}

export default LaptopsNoteBooksPage