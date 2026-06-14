import { By, until } from 'selenium-webdriver';

// 1. Group locators in a plain object at the top (No "this." clutter)
const locators = {
    searchProducts: By.xpath("//*[@id='content']/div[3]//img"),
    txtquantity: By.xpath("//input[@id='input-quantity']"),
    btnaddToCart: By.xpath("//button[@id='button-cart']"),
    cnfMsg: By.xpath("//div[contains(text(),'Success: You have added')]")
};

class SearchPage {
    constructor(driver) {
        this.driver = driver;
        this.timeout = 10000;
    }

    async _getProductsList() {
        // Wait for the grid to load, then find all matching web elements
        await this.driver.wait(until.elementsLocated(locators.searchProducts), this.timeout);
        return await this.driver.findElements(locators.searchProducts);
    }

    async isProductExist(productName) {
        const products = await this._getProductsList();

        for (const product of products) {
            const title = await product.getAttribute('title');
            if (title) {
                // Clean up both strings to avoid spacing and casing issues
                const cleanTitle = title.toLowerCase().trim();
                const cleanInput = productName.toLowerCase().trim();

                // Look for an exact match OR an inclusion match
                if (cleanTitle === cleanInput || cleanTitle.includes(cleanInput)) {
                    return true;
                }
            }
        }
        return false;
    }

    async selectProduct(productName) {
        const products = await this._getProductsList();
        for (const product of products) {
            const title = await product.getAttribute('title');

            // Check if title exists and partially matches the target product name
            if (title && title.toLowerCase().includes(productName.toLowerCase().trim())) {
                await product.click();
                break; // Stop looping once clicked
            }
        }
    }

    async setQuantity(qty) {
        const element = await this.driver.wait(until.elementLocated(locators.txtquantity), this.timeout);
        await element.clear();
        await element.sendKeys(qty);
    }

    async addToCart() {
        const element = await this.driver.wait(until.elementLocated(locators.btnaddToCart), this.timeout);
        await element.click();
    }

    // async checkConfMsg() {
    //     try {
    //         const element = await this.driver.wait(until.elementLocated(locators.cnfMsg), this.timeout);
    //         return await element.isDisplayed();
    //     } catch (error) {
    //         return false;
    //     }
    // }
}

export default SearchPage;
