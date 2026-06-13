// Load the environment variables from the .env file at the very start
require('dotenv').config(); 

const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const edge = require('selenium-webdriver/edge');

class DriverConfig {
    static driver = null;

    static async initializeBrowser() {
        // Read directly from process.env (values fall back to defaults if missing)
        const executionEnv = (process.env.EXECUTION_ENV || 'local').toLowerCase();
        const browser = (process.env.BROWSER || 'chrome').toLowerCase();
        const os = (process.env.OS || 'windows').toLowerCase();
        const remoteUrl = process.env.REMOTE_URL || 'http://localhost:4444/wd/hub';

        let builder = new Builder();

        // 1. Handle Selenium Grid Remote Mode
        if (executionEnv === 'remote') {
            builder = builder.usingServer(remoteUrl).forBrowser(browser);
            
            let platform;
            if (os === 'windows') platform = 'WINDOWS';
            else if (os === 'mac') platform = 'MAC';
            else if (os === 'linux') platform = 'LINUX';
            else throw new Error(`Unsupported Remote OS Platform: ${os}`);

            if (browser === 'chrome') {
                builder = builder.setChromeOptions(new chrome.Options().setPlatform(platform));
            } else if (browser === 'firefox') {
                builder = builder.setFirefoxOptions(new firefox.Options().setPlatform(platform));
            } else if (browser === 'edge') {
                builder = builder.setEdgeOptions(new edge.Options().setPlatform(platform));
            }

        // 2. Handle Local Execution Mode
        } else if (executionEnv === 'local') {
            if (browser === 'chrome') {
                builder = builder.forBrowser('chrome');
            } else if (browser === 'firefox') {
                builder = builder.forBrowser('firefox');
            } else if (browser === 'edge') {
                builder = builder.forBrowser('MicrosoftEdge');
            } else {
                throw new Error(`Unsupported Local Browser: ${browser}`);
            }
        }

        this.driver = await builder.build();

        // 3. Set standard cookies and window states
        await this.driver.manage().deleteAllCookies();
        await this.driver.manage().window().maximize();

        // Set global timeouts
        await this.driver.manage().setTimeouts({ 
            implicit: 10000, 
            pageLoad: 5000 
        });

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

module.exports = DriverConfig;