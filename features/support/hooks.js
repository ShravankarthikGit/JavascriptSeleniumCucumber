
import { Before, After, AfterStep, Status } from '@cucumber/cucumber'; 

// ✅ FIX: Converted to import statement and added mandatory '.js' extension
import DriverConfig from '../../config/driver.config.js';


Before(async function (APP_URL) {
    // 1. Initialize browser configuration and timeout options
    const driver = await DriverConfig.initializeBrowser();
    this.driver = driver; // Expose driver to our local scenario step files
    
    // 2. Fetch the URL from process.env and navigate (Translates: driver.get(p.getProperty("appURL")))
    

    const targetUrl = process.env.APP_URL;
    if (!targetUrl) {
        throw new Error("APP_URL is missing! Please declare it inside your .env configuration file.");
    }
    
    await this.driver.get(targetUrl);
});


AfterStep(async function (stepScenario) {
    // Check if the step that just executed crashed
    if (stepScenario.result.status === Status.FAILED) {
        console.log(`❌ Step Failed! Capturing execution artifact screenshot...`);
        
        // TakesScreenshot equivalent in Selenium JS
        const screenshot = await this.driver.takeScreenshot();
        
        // Attaches the raw buffer evidence directly to the Cucumber runner reports
        this.attach(Buffer.from(screenshot, 'base64'), 'image/png');
    }
});


After(async function () {
    const currentDriver = DriverConfig.getDriver();
    if (currentDriver) {
        await currentDriver.quit();
    }
});
