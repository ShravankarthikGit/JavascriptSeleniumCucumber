import { By } from 'selenium-webdriver';

const loginLocators = {
    txtEmailAddress: By.xpath("//input[@id='input-email']"),
    txtPassword: By.xpath("//input[@id='input-password']"),
    btnLogin: By.xpath("//input[@value='Login']"),
    loginAlert: By.xpath("//div[@class='alert alert-danger alert-dismissible']")
};


export default loginLocators; 