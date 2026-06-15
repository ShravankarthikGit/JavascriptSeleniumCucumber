# Selenium JavaScript Cheat Sheet

A quick reference guide for essential Selenium WebDriver operations, locators, and browser configurations in JavaScript.

---

## 🚀 Browser Initialization

### Launching Standard Browsers
```javascript
const { Builder, Browser } = require('selenium-webdriver');

// Chrome
let driver = await new Builder().forBrowser(Browser.CHROME).build();

// Firefox
let driver = await new Builder().forBrowser(Browser.CHROME).build();

// Edge
let driver = await new Builder().forBrowser(Browser.EDGE).build();

// Safari
let driver = await new Builder().forBrowser(Browser.SAFARI).build();
```

### Headless Browser Configuration
Run your tests silently in the background without launching a visible UI window.

```javascript
import { Builder, Browser } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

let options = new chrome.Options();
options.addArguments('--headless=new');       // Runs silently in the background
options.addArguments('--window-size=1920,1080'); // Sets explicit browser dimensions

let driver = await new Builder()
  .forBrowser(Browser.CHROME)
  .setChromeOptions(options)
  .build();
```

---

## 🌐 Basic Browser Operations

```javascript
// Load a web page
await driver.get("https://www.google.com");

// Maximize the current browser window
await driver.manage().window().maximize();

// Open and switch to a new Tab
await driver.switchTo().newWindow('tab');

// Open and switch to a new Window
await driver.switchTo().newWindow('window');
```

---

## 🔍 Locators Matrix

Map your automation script to DOM elements using various locator strategies via the `By` class.

| Strategy | Syntax Example |
| :--- | :--- |
| **ID** | `driver.findElement(By.id("elementId"))` |
| **Name** | `driver.findElement(By.name("elementName"))` |
| **Class Name** | `driver.findElement(By.className("className"))` |
| **XPath** | `driver.findElement(By.xpath("//div[@text='element']"))` |
| **CSS Selector** | `driver.findElement(By.css("[name='value']"))` |
| **Link Text** | `driver.findElement(By.linkText("Exact Link Text"))` |
| **Partial Link Text** | `driver.findElement(By.partialLinkText("Partial Text"))` |
| **Tag Name** | `driver.findElement(By.tagName("tagName"))` |

---

## 🎛️ Identifying Elements

### Single Element
Returns the **first** matching element found in the DOM. Throws an error if the element is not found.
```javascript
let element = await driver.findElement(By.id("elementid"));
```

### Multiple Elements
Returns an **array** of all matching elements. Returns an empty array `[]` if no elements match the locator criteria.
```javascript
let elements = await driver.findElements(By.xpath("//div//td"));
```

## 🌐 Basic Browser Operations

```javascript
// Load a specific web page
await driver.get("https://www.google.com");

// Maximize the current browser window view
await driver.manage().window().maximize();

// Fetch the active page title text
const title = await driver.getTitle();

// Retrieve the current absolute web URL string
const url = await driver.getCurrentUrl();

// Extract the raw DOM HTML source structure
const source = await driver.getPageSource();

// Close the active focused browser window
await driver.close();

// Terminate the entire active WebDriver process session safely
await driver.quit();
```

---

## 🧭 Navigational Commands

```javascript
// Reload the current web page document completely
await driver.navigate().refresh();

// Navigate directly to an absolute target URL destination
await driver.navigate().to("https://www.google.com");

// Move back one step in browser session history
await driver.navigate().back();

// Move forward one step in browser session history
await driver.navigate().forward();
```

---

## 🎛️ WebElement Interaction

```javascript
// Locate a single target DOM element safely by its ID attribute
const element = await driver.findElement(By.id("id"));

// Trigger a native mouse click event on the target element
await element.click();

// Simulate keyboard key inputs into a specific interactive field
await element.sendKeys("Text Here");

// Clear existing text content fields completely before typing
await element.clear();

// Extract visible outer text content from the selected element
const text = await element.getText();

// Retrieve specific DOM attribute value strings (e.g., class names)
const activeClass = await element.getAttribute("class");

// Check if an element is rendered visually on the web page
const isVisible = await element.isDisplayed();

// Validate if an interactive component can accept target input events
const isClickable = await element.isEnabled();

// Check check-box or radio-button active state status
const isChecked = await element.isSelected();

// Submit an active HTML form structure instantly
await element.submit();

// Fetch the raw structural HTML node tag string name
const tagName = await element.getTagName();

// Retrieve targeted runtime parsed CSS styling rules from an element
const colorValue = await element.getCssValue("color");
```

---

## 🖼️ Handling Frames

```javascript
// Shift WebDriver execution focus to a frame using an index
await driver.switchTo().frame(1);

// Shift WebDriver execution focus to a frame using a locator
await driver.switchTo().frame(driver.findElement(By.id("frame-id")));

// Shift WebDriver execution focus to a frame using its name string
await driver.switchTo().frame("framename");

// Shift WebDriver execution focus to a frame using its ID string
await driver.switchTo().frame("frameID");

// Exit an active frame context and return to the primary page document
await driver.switchTo().defaultContent();
```

---

## ⚠️ Handle Alerts & Modals

```javascript
// Shift WebDriver tracking target to an active JavaScript modal dialog
const alert = await driver.switchTo().alert();

// Click the affirmative option (OK/Confirm) on the modal
await alert.accept();

// Click the negative dismissal option (Cancel) on the modal
await alert.dismiss();

// Fetch text message context displayed inside the pop-up modal
const alertText = await alert.getText();

// Type automated text inputs directly inside a prompt alert box
await alert.sendKeys("abc");
```


# Selenium JavaScript Advanced Operations & Waits Reference

A concise reference guide for handling select dropdown options and configuring implicit/explicit synchronization conditions in JavaScript.

---

## 🔽 Dropdown Manipulation

Unlike other Selenium bindings, JavaScript does not use a `Select` class. Instead, locate and click the `<option>` elements directly.

```javascript
// 1. Select Dropdown Option using Visible Text
let optionText = await driver.findElement(By.xpath("//select[@id='country']/option[text()='India']"));
await optionText.click();

// 2. Select Dropdown Option using Value Attribute
let optionValue = await driver.findElement(By.css("select#country option[value='IN']"));
await optionValue.click();

// 3. Select Dropdown Option using Index (1-Based Nth-Child Selector)
let optionIndex = await driver.findElement(By.css("select#country option:nth-child(2)"));
await optionIndex.click();
```

---

## ⏱️ Dynamic Synchronization (Waits)

### Global Implicit Wait
Sets a default timeout duration across the entire driver lifecycle when searching for elements.
```javascript
await driver.manage().setTimeouts({ implicit: 10000 });
```

### Explicit Waits Engine
Polls the browser for a targeted condition before executing subsequent actions.
```javascript
const { until } = require('selenium-webdriver');

await driver.wait(
  until.elementLocated(By.xpath("cccc")), 
  15000, 
  'Timed out waiting for success message to load!'
);
```

---

## 🛠️ Explicit Wait Conditions Matrix

### 1. Element State Conditions
Track DOM existence, layout status, or functional interactability of buttons and input controls.

* **`until.elementLocated(locator)`**
  Waits for the element to exist inside the browser DOM (ignores visibility).
* **`until.elementsLocated(locator)`**
  Waits until at least one target element is found in the DOM. Returns an array.
* **`until.elementIsVisible(element)`**
  Waits for an already-located element to become physically visible on the viewport.
* **`until.elementIsNotVisible(element)`**
  Waits until an element is hidden from view (`display: none` or `visibility: hidden`).
* **`until.elementIsEnabled(element)`**
  Waits until a form control or button becomes interactable (removes `disabled`).
* **`until.elementIsDisabled(element)`**
  Waits until an element changes status to a disabled state.
* **`until.elementIsSelected(element)`**
  Waits until a checkbox, radio button, or select option is ticked.
* **`until.elementIsNotSelected(element)`**
  Waits until a target element state returns to unselected.
* **`until.stalenessOf(element)`**
  Waits until an element is deleted or detached from the active page DOM tree.

### 2. Text & Content Conditions
Monitor real-time text mutations, label updates, or string validation inside web elements.

* **`until.elementTextIs(element, string)`**
  Waits until the inner text of an element matches the provided string exactly.
* **`until.elementTextContains(element, substring)`**
  Waits until the element text contains a specific substring or keyword snippet.
* **`until.elementTextMatches(element, regex)`**
  Waits until the text values inside an element satisfy a regular expression pattern.

### 3. Page Title & URL Conditions
Watch high-level browser navigation actions, authorization redirects, or URL context path states.

* **`until.titleIs(string)`**
  Waits for the current page `<title>` tag to match the target string exactly.
* **`until.titleContains(substring)`**
  Waits for the document title text to include a specific contextual keyword.
* **`until.titleMatches(regex)`**
  Waits for the title text to satisfy a specified regular expression pattern.
* **`until.urlIs(string)`**
  Waits until the active browser address path matches the strict URL string parameter.
* **`until.urlContains(substring)`**
  Waits until the browser address contains a targeted path slug or query parameter.
* **`until.urlMatches(regex)`**
  Waits until the current URL string matches a specified regex template structure.

### 4. Alert & Frame Context Conditions
Synchronize your scripts with system UI components outside the primary HTML document layer.

* **`until.alertIsPresent()`**
  Waits for a native browser window dialog modal (`alert()`, `confirm()`, `prompt()`) to display.
* **`until.ableToSwitchToFrame(frameInfo)`**
  Waits for a frame component to become available, then switches driver execution focus inside it. Takes an index, locator, or element instance.


# Selenium JavaScript Advanced Automation Mechanics

An essential reference guide for configuring fluent dynamic waits, tracking multiple window tab processes, capturing screen captures, and orchestrating composite user interactions via the Actions API.

---

## ⏱️ Fluent Wait Strategy

Construct custom polling routines to ignore specific operational exceptions and set granular inspection intervals when dealing with asynchronous element states.

```javascript
const { By, error } = require('selenium-webdriver');

let dynamicElement = await driver.wait(
  async () => {
    try {
      let el = await driver.findElement(By.className('lazy-load-box'));
      let isDisplayed = await el.isDisplayed();
      
      // Return the functional element if visible, otherwise return false to continue polling
      return isDisplayed ? el : false; 
    } catch (e) {
      // Safely ignore standard lookup exceptions inside the active polling execution loop
      if (e instanceof error.NoSuchElementError || e instanceof error.StaleElementReferenceError) {
        return false;
      }
      throw e; // Bubble up unexpected runtime framework errors immediately
    }
  },
  20000, // Total boundary timeout duration (20 seconds)
  'Element never loaded fully',
  1000 // Custom execution polling interval context (Inspects DOM every 1000ms instead of 500ms default)
);
```

---

## 🪟 Advanced Window & Tab Tracking

Manage cross-tab automation scenarios explicitly by recording host window hashes and tracking operational process focus.

```javascript
// Record unique alphanumeric string identifier handle for the current active host window
const originalWindow = await driver.getWindowHandle();

// Action triggering a secondary browser viewport window target
await driver.findElement(By.id('open-tab-btn')).click();

// Retrieve an array list containing all open window string handles
const allHandles = await driver.getAllWindowHandles();

// Iterate through active handles to discover and target the newly created window context
for (const handle of allHandles) {
  if (handle !== originalWindow) {
    await driver.switchTo().window(handle);
    break;
  }
}

// Execution now controls the target window context tab
console.log("New tab title:", await driver.getTitle());
await driver.close(); // Terminates the focused child window tab exclusively

// Crucial: Manually redirect context focus back to the primary base window to continue script steps
await driver.switchTo().window(originalWindow);
console.log("Back to original tab title:", await driver.getTitle());
```

---

## 📸 Capture Desktop Screenshots

Extract a binary canvas view of your current browser viewport state and serialize the data asset straight to local storage.

```javascript
const fs = require('fs');

// 1. Capture the raw active viewport screen contents as a base64 string
let base64Image = await driver.takeScreenshot();

// 2. Decode the raw base64 string layer and write a physical image asset file to disk
fs.writeFileSync('viewport_screenshot.png', base64Image, 'base64');
console.log('Viewport screenshot saved successfully!');
```

---

## 🖱️ Composite User Interactions (Actions API)

Orchestrate complex physical interface actions ranging from pointer precision navigation gestures to composite key combinations.

### Mouse Interactions
```javascript
let button = await driver.findElement(By.id('right-clickBtn'));

// Context Click (Right-Click)
await driver.actions()
  .contextClick(button)
  .perform();

// Double Click
await driver.actions()
  .doubleClick(button)
  .perform();

// Drag and Drop (Translates coordinate map tracking from source element straight to target zone)
let source = await driver.findElement(By.id('draggable'));
let target = await driver.findElement(By.id('droppable'));

await driver.actions()
  .dragAndDrop(source, target)
  .perform();
```

### Keyboard Chord Actions
```javascript
const { Key } = require('selenium-webdriver');

// Simulates executing a select-all text modifier chord (Ctrl + A / Cmd + A)
await driver.actions()
  .keyDown(Key.CONTROL)
  .sendKeys('a')
  .keyUp(Key.CONTROL)
  .perform();
```
