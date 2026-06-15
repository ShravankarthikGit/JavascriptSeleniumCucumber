import { Builder, Browser } from 'selenium-webdriver';

// Initialize web browser
const driver = await new Builder().forBrowser(Browser.CHROME).build();

try {
    // Maximize page
    await driver.manage().window().maximize();
    
    // Load web page
    await driver.get('https://google.com');
    
    // Get page title
    const title = await driver.getTitle();
    console.log(`Title is: ${title}`);
    
    // Get current URL
    const currentUrl = await driver.getCurrentUrl();
    console.log(`URL is: ${currentUrl}`);
    
    // Get page source length
    const source = await driver.getPageSource();
    console.log(`Page Source Length: ${source.length}`);
    
} finally {
    // Close session
    await driver.quit();
}