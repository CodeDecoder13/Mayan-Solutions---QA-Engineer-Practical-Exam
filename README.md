# QA Engineer - Technical Assessment

Demonstrate ability to perform manual testing, automation, and API testing on sample applications to verify that core features work as expected.

## Project Structure

```
QA-Assessment/
├── tests/
│   ├── purchase-flow.spec.ts    # Main purchase flow automation
│   ├── edge-cases.spec.ts       # Edge case tests (invalid login, empty cart, missing fields)
│   └── api-tests.spec.ts        # API tests for JSONPlaceholder
├── Postman/
│   └── QA-Collection.json       # Postman collection for API testing
├── playwright.config.ts         # Playwright configuration
├── package.json
└── README.md
```

## Part 1: Playwright Automation

### Test Environment
- **URL:** https://www.saucedemo.com
- **Credentials:** `standard_user` / `secret_sauce`

### Test Scenarios

#### Main Purchase Flow (`purchase-flow.spec.ts`)
1. Open SauceDemo website
2. Login with valid credentials
3. Verify inventory page loads
4. Add "Sauce Labs Backpack" to cart
5. Open cart and verify item exists
6. Proceed to checkout
7. Fill checkout form (first name, last name, postal code)
8. Complete the order
9. Verify confirmation message: **"Thank you for your order!"**

#### Edge Cases (`edge-cases.spec.ts`)
- **Invalid Login:** Wrong password shows error message
- **Empty Credentials:** Login with no input shows error
- **Locked Out User:** Locked user gets appropriate error
- **Checkout Without Items:** Empty cart checkout behavior
- **Missing Postal Code:** Error when postal code is empty
- **Missing First Name:** Error when first name is empty
- **All Fields Empty:** Error when all checkout fields are empty

### How to Run Playwright Tests

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install --with-deps

# Run all tests
npx playwright test

# Run specific test file
npx playwright test tests/purchase-flow.spec.ts
npx playwright test tests/edge-cases.spec.ts
npx playwright test tests/api-tests.spec.ts

# Run tests with UI mode
npx playwright test --ui

# View HTML report after tests
npx playwright show-report
```

## Part 2: API Testing

### Base URL
https://jsonplaceholder.typicode.com

### Endpoints Tested

| # | Method | Endpoint | Description | Expected Status |
|---|--------|----------|-------------|-----------------|
| 1 | GET | /users | Retrieve all users | 200 |
| 2 | GET | /users/1 | Retrieve specific user | 200 |
| 3 | GET | /users/999 | Non-existent user (edge case) | 404 |
| 4 | POST | /posts | Create a new post | 201 |
| 5 | PUT | /posts/1 | Update existing post | 200 |
| 6 | PUT | /posts/999 | Update non-existent post (edge case) | 500 |

### Postman Collection

The Postman collection is located at `Postman/QA-Collection.json`.

**To import:**
1. Open Postman
2. Click **Import**
3. Select the `Postman/QA-Collection.json` file
4. Run the collection

The collection includes test scripts with assertions for each endpoint plus edge cases.

### API Tests in Playwright

API tests are also automated in `tests/api-tests.spec.ts` and can be run with:

```bash
npx playwright test tests/api-tests.spec.ts
```

## Test Results Summary

### Web Application Tests
- **Purchase Flow:** Validates the complete end-to-end purchase journey
- **Edge Cases:** Covers invalid login, empty cart checkout, and missing form fields

### API Tests
- **GET /users:** Returns 10 users with correct structure
- **GET /users/1:** Returns specific user (Leanne Graham)
- **GET /users/999:** Returns 404 for non-existent user
- **POST /posts:** Successfully creates post with status 201
- **PUT /posts/1:** Successfully updates post with status 200
- **Edge cases:** Empty body POST, non-existent resource PUT, invalid query params

## Tools Used
- **Playwright** - Web automation and API testing
- **Postman** - API testing and documentation
- **Node.js** - Runtime environment
