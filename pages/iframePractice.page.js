import { By } from 'selenium-webdriver';

class IframePracticePage {
    constructor(driver) {
        this.driver = driver;
        
        // This targets the actual iframe host tag visible on the main parent website page
        this.iframeHostElement = By.css('#iframe-1'); 
        
        // This targets the text link hidden INSIDE the iframe context area
        this.innerDiscordLink = By.partialLinkText('Discord');
    }
}

export default IframePracticePage;
