import {By, until, Key} from 'selenium-webdriver'
import 'dotenv/config'; 


class GoogleSearch{
    constructor(driver){
        this.driver = driver;
        this.timeout = 10000;
        //Define locators
        this.searchBox = By.xpath("//*[@aria-label='Search']")
    }


    async openGoogleSearch(){
        const targetUrl = process.env.GOOGLE_SEARCH_URL;
        await this.driver.get(targetUrl)
    }

    async searchForString(search){
        const element = await this.driver.wait(until.elementLocated(this.searchBox),this.timeout);
        await element.sendKeys(search, Key.RETURN);
    }

}


export default GoogleSearch;