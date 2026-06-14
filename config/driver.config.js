// Load the environment variables from the .env file at the very start 
import 'dotenv/config'; // Automatically loads environment variables instantly 
import { Builder, Browser, Capabilities } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import firefox from 'selenium-webdriver/firefox.js';
import edge from 'selenium-webdriver/edge.js';


class DriverConfig {

  static async initializeBrowser() {
    const executionEnv = (process.env.EXECUTION_ENV || 'local').toLowerCase();
    const browser = (process.env.BROWSER || 'chrome').toLowerCase();
    const os = (process.env.OS || 'windows').toLowerCase();
    const remoteUrl = process.env.REMOTE_URL || 'http://localhost:4444/wd/hub';

    let builder = new Builder();
    let targetBrowser;
    let options;

    // 1. Initialize the correct options class dynamically
    if (browser === 'chrome') {
      targetBrowser = Browser.CHROME;
      options = new chrome.Options();
    } else if (browser === 'firefox') {
      targetBrowser = Browser.FIREFOX;
      options = new firefox.Options();
    } else if (browser === 'edge') {
      targetBrowser = Browser.EDGE;
      options = new edge.Options();
    } else {
      throw new Error(`Unsupported Browser Selected: ${browser}`);
    }

    // 2. Define universal arguments that work across Chromium engines (Chrome/Edge)
    const baseArguments = [
      '--start-maximized',
      '--disable-notifications',
      '--disable-popup-blocking'
    ];

    // Headless mode logic
    if (process.env.HEADLESS === 'true' || executionEnv === 'remote') {
      if (browser === 'firefox') {
        baseArguments.push('-headless'); // Firefox specific headless flag
      } else {
        baseArguments.push(
          '--headless=new',
          '--window-size=1920,1080',
          '--no-sandbox',
          '--disable-dev-shm-usage'
        );
      }
    } else {
      // Incognito mode logic (Optional: Uncomment if needed for local execution)
      // if (browser !== 'firefox') baseArguments.push('--incognito');
    }

    // Apply base arguments to the active options instance
    options.addArguments(...baseArguments);

    // 3. Apply Chrome/Edge specific Anti-Bot and Optimization tweaks safely
    if (browser === 'chrome' || browser === 'edge') {
      options.addArguments(
        '--disable-search-engine-choice-screen',
        '--log-level=3',
        '--silent',
        '--disable-blink-features=AutomationControlled',
        'user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      );
      options.excludeSwitches('enable-automation');
    }

    // 4. Handle Selenium Grid Remote Mode Configuration
    if (executionEnv === 'remote') {
      let platform;
      if (os === 'windows') platform = 'WINDOWS';
      else if (os === 'mac') platform = 'MAC';
      else if (os === 'linux') platform = 'LINUX';
      else throw new Error(`Unsupported Remote OS Platform: ${os}`);

      // Attach cross-browser platform options safely using the dynamic mapping
      builder = builder
        .usingServer(remoteUrl)
        .forBrowser(targetBrowser);

      if (browser === 'chrome') builder = builder.setChromeOptions(options);
      if (browser === 'firefox') builder = builder.setFirefoxOptions(options);
      if (browser === 'edge') builder = builder.setEdgeOptions(options);

      // 5. Handle Local Execution Mode Configuration
    } else if (executionEnv === 'local') {
      builder = builder.forBrowser(targetBrowser);
      if (browser === 'chrome') builder = builder.setChromeOptions(options);
      if (browser === 'firefox') builder = builder.setFirefoxOptions(options);
      if (browser === 'edge') builder = builder.setEdgeOptions(options);
    }

    // Build the initialized driver instance
    this.driver = await builder.build();

    // 6. Global Session States and Timeouts
    await this.driver.manage().deleteAllCookies();
    await this.driver.manage().window().maximize();
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
