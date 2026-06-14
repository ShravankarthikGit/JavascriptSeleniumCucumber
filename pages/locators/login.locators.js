import { By } from 'selenium-webdriver';

const loginLocators = {
    txtEmailAddress: By.xpath("//input[@id='input-email']"),
    txtPassword: By.xpath("//input[@id='input-password']"),
    btnLogin: By.xpath("//input[@value='Login']")
};


export default loginLocators; 