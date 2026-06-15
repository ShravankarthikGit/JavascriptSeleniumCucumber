import { By } from 'selenium-webdriver';

class AlertsPracticePage {
    constructor(driver) {
        this.driver = driver;
        
        // This is a standard HTML button out in the open (No Shadow DOM required)
        this.confirmAlertButton = By.xpath("//button[@id='alertBtn']");
    }
}

export default AlertsPracticePage;
