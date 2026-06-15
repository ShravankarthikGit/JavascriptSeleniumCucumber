import { By } from 'selenium-webdriver';

class PracticePage {
    constructor(driver) {
        this.driver = driver;
        
        // This targets the exact "Popup Windows" button on the practice site
        this.popupWindowButton = By.xpath("//button[@id='PopUp']");
    }
}

export default PracticePage;
