import { Given, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/browser/esm/sync'; 
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import HomePage from '../../pages/home.page.js';
import SearchPage from '../../pages/search.page.js';

Given('I read catalog inputs from CSV file {string}', function (fileName) {
    const filePath = path.join(__dirname, '..', '..', 'data', fileName);
    console.log("Loading CSV from:", filePath);
    
    const rawData = fs.readFileSync(filePath, 'utf8');
    
    // Clean column names and cell data automatically using trim: true
    this.csvDataset = parse(rawData, { 
        columns: true, 
        skip_empty_lines: true, 
        trim: true, 
        bom: true 
    });
});

Then('I verify each product item sequentially in the storefront', { timeout: 60000 }, async function () {

  const homePage = new HomePage(this.driver);
  const searchPage = new SearchPage(this.driver);

  const csvDataset = this.csvDataset;

  for (const record of csvDataset) {
    // Defensive Guard: Skip row if record or productName property evaluates as empty or missing
    if (!record || !record.productName) {
      console.log(`⚠️ Warning: Found an empty row or invalid record structure in CSV. Skipping row...`);
      continue;
    }

    console.log(`\n🔎 Bulk CSV Processing: Searching for [${record.productName}] and [${record.expectedModel}] `);

    // 1. Clear search input and enter product text
    await homePage.enterProductName(record.productName);
    await homePage.clickSearch();

    // 2. Validate grid contents using list tracking
    const exists = await searchPage.isProductExist(record.productName);
    expect(exists).to.be.true;

    // 3. Drill down, modify quantity variables, and add to cart
    await searchPage.selectProduct(record.productName);
    await searchPage.setQuantity("2");
    await searchPage.addToCart();

    // 4. Validate successful basket addition alert text
    // const alertVisible = await searchPage.checkConfMsg();
    // expect(alertVisible).to.be.true;
  }
});
