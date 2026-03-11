# QA Engineer Technical Assessment – Automation + API Testing

## Objective

Automate the SauceDemo purchase flow using Playwright and create API tests using Postman.

Website to test:
https://www.saucedemo.com

Credentials:
Username: standard_user
Password: secret_sauce

---

# 1. Playwright Automation

## Required Test Scenario

Automate the full purchase flow:

1. Open SauceDemo
2. Login
3. Verify inventory page
4. Add item to cart
5. Open cart
6. Verify item exists
7. Checkout
8. Fill checkout form
9. Complete order
10. Verify confirmation message

Expected confirmation message:

Thank you for your order!

---

# Project Setup


Run tests:

npx playwright test

---

# Folder Structure

tests/
purchase-flow.spec.ts

---

# Playwright Automation Script

Create file:

tests/purchase-flow.spec.ts

```ts
import { test, expect } from '@playwright/test';

test('Complete Purchase Flow', async ({ page }) => {

  // Open website
  await page.goto('https://www.saucedemo.com');

  // Login
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // Verify inventory page
  await expect(page).toHaveURL(/inventory/);

  // Add item to cart
  await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');

  // Go to cart
  await page.click('.shopping_cart_link');

  // Verify item in cart
  const item = page.locator('.inventory_item_name');
  await expect(item).toContainText('Sauce Labs Backpack');

  // Checkout
  await page.click('#checkout');

  // Fill checkout form
  await page.fill('#first-name', 'John');
  await page.fill('#last-name', 'Doe');
  await page.fill('#postal-code', '1000');

  await page.click('#continue');

  // Finish order
  await page.click('#finish');

  // Verify confirmation
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');

});
```

---

# Edge Case Automation Tests

Claude Code should also generate these tests:

### Invalid Login

Test:
Login with invalid password.

Expected:
Error message appears.

---

### Checkout Without Items

Steps:
Login → Checkout without adding product.

Expected:
User cannot proceed.

---

### Missing Checkout Fields

Steps:
Leave postal code empty.

Expected:
Error message appears.

---

# 2. API Testing (Postman)

Base URL:

https://jsonplaceholder.typicode.com

---

# API 1 – Get All Users

Request

GET /users

Expected Result

Status Code: 200
Response contains list of users.

---

# API 2 – Get Specific User

Request

GET /users/1

Expected

User data returned.

Edge Case

GET /users/999

Expected

User not found or empty response.

---

# API 3 – Create Post

POST /posts

Body

```json
{
"title": "QA Test Post",
"body": "Testing API endpoint",
"userId": 1
}
```

Expected

Status Code: 201
Post created successfully.

---

# API 4 – Update Post

PUT /posts/1

Body

```json
{
"title": "Updated Post",
"body": "Updated content",
"userId": 1
}
```

Expected

Status Code: 200
Post updated.

---

# Creating Postman Collection

Steps:

1. Open Postman
2. Create New Collection
3. Name it:

QA Technical Assessment

4. Add requests:

* GET Users
* GET User by ID
* POST Create Post
* PUT Update Post

5. Save responses.

Export collection:

Collection → Export → JSON

---

# Deliverables for Submission

GitHub Repository Structure:

QA-Assessment/

TestCases.xlsx
BugReports.docx

Playwright/

tests/purchase-flow.spec.ts

Postman/

QA-Collection.json

Screenshots/

README.md

---

# README Content

Include:

* How to run Playwright tests
* Postman API documentation
* Test results summary

---
