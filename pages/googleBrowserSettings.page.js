import {By, until, Key} from 'selenium-webdriver'

class ChromeSettingsPage{

    constructor(driver){
        this.driver = driver;
        this.timeout = 10000;
        // Define locators  
        // Use css selector only for finding elements inside shadow DOM
        this.cookiesSearchLabel = By.css("#title")   
    };

    async searchResultLabel(){
        const element = await this.driver.wait(until.elementLocated(this.cookiesSearchLabel), this.timeout);
        return element; 
    }

}

export default ChromeSettingsPage;