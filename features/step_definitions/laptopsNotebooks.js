import HomePage from "../../pages/home.page.js";
import LaptopsNoteBooksPage from "../../pages/laptopsNotebooks.page.js"
import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from 'chai';



When('User selects Show All Laptops and Notebooks', {timeout:20000}, async function () {
    const homePage = new HomePage(this.driver);
    await homePage.selectLaptopsAndNotebooks();
});

Then('Print all item titles', async function () {
    const laptopsNoteBooksPage = new LaptopsNoteBooksPage(this.driver);
    const title = await laptopsNoteBooksPage.getPageTitle();
    await expect(title).to.include('Laptops & Notebooks')
    await laptopsNoteBooksPage.getProductNames()
});

