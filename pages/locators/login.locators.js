const { By } = require('selenium-webdriver');

module.exports = {
    txtEmailAddress: By.xpath("//input[@id='input-email']"),
    txtPassword: By.xpath("//input[@id='input-password']"),
    btnLogin: By.xpath("//input[@value='Login']")
};