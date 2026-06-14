// Load the environment variables from the .env file at the very start 
import 'dotenv/config'; // Automatically loads environment variables instantly 
import { Builder, Browser, Capabilities } from 'selenium-webdriver'; 

class DriverConfig { 
  static async initializeBrowser() { 
    // Read directly from process.env (values fall back to defaults if missing) 
    const executionEnv = (process.env.EXECUTION_ENV || 'local').toLowerCase(); 
    const browser = (process.env.BROWSER || 'chrome').toLowerCase(); 
    const os = (process.env.OS || 'windows').toLowerCase(); 
    const remoteUrl = process.env.REMOTE_URL || 'http://localhost:4444/wd/hub'; 

    let builder = new Builder(); 

    // Resolve specific browser targets to standard Selenium constants
    let targetBrowser;
    if (browser === 'chrome') targetBrowser = Browser.CHROME;
    else if (browser === 'firefox') targetBrowser = Browser.FIREFOX;
    else if (browser === 'edge') targetBrowser = Browser.EDGE;
    else throw new Error(`Unsupported Browser Selected: ${browser}`);

    // 1. Handle Selenium Grid Remote Mode 
    if (executionEnv === 'remote') { 
      let platform; 
      if (os === 'windows') platform = 'WINDOWS'; 
      else if (os === 'mac') platform = 'MAC'; 
      else if (os === 'linux') platform = 'LINUX'; 
      else throw new Error(`Unsupported Remote OS Platform: ${os}`); 

      const caps = new Capabilities();
      caps.setBrowserName(targetBrowser);
      caps.setPlatform(platform);

      builder = builder.usingServer(remoteUrl).withCapabilities(caps);

    // 2. Handle Local Execution Mode 
    } else if (executionEnv === 'local') { 
      builder = builder.forBrowser(targetBrowser); 
    } 

    // Build the initialized driver instance
    this.driver = await builder.build(); 

    // 3. Set standard cookies and window states 
    await this.driver.manage().deleteAllCookies(); 
    await this.driver.manage().window().maximize(); 

    // Set global timeouts 
    await this.driver.manage().setTimeouts({ implicit: 10000, pageLoad: 15000 }); 
    return this.driver; 
  } 

  static getDriver() { 
    return this.driver; 
  } 

  // Reusable random alpha/numeric string helpers 
  static randomString(length = 5) { 
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'; 
    let result = ''; 
    for (let i = 0; i < length; i++) result += chars.charAt(Math.floor(Math.random() * chars.length)); 
    return result; 
  } 

  static randomNumber(length = 10) { 
    const chars = '0123456789'; 
    let result = ''; 
    for (let i = 0; i < length; i++) result += chars.charAt(Math.floor(Math.random() * chars.length)); 
    return result; 
  } 

  static randomAlphaNumeric() { 
    return this.randomString(5) + this.randomNumber(10); 
  } 
} 

// ✅ FIX: Define the static property dynamically down here.
// This allows pure JavaScript to modify it later without any type locks.
DriverConfig.driver = null;

// Export configuration out natively 
export default DriverConfig;
