import { test, expect } from './base.fixture';

test.describe('SauceDemo Purchase Flow', () => {

  test('Complete Purchase Flow', async ({ page, takeScreenshot }) => {
    // Step 1: Open website
    await page.goto('https://www.saucedemo.com');
    await takeScreenshot('01-login-page');

    // Step 2: Login
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // Step 3: Verify inventory page
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('.title')).toHaveText('Products');
    await takeScreenshot('02-login-success-inventory-page');

    // Step 4: Add item to cart
    await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');

    // Verify cart badge shows 1 item
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    await takeScreenshot('03-item-added-to-cart');

    // Step 5: Go to cart
    await page.click('.shopping_cart_link');

    // Step 6: Verify item in cart
    await expect(page).toHaveURL(/cart/);
    const item = page.locator('.inventory_item_name');
    await expect(item).toHaveText('Sauce Labs Backpack');
    await takeScreenshot('04-cart-with-item');

    // Step 7: Checkout
    await page.click('#checkout');

    // Step 8: Fill checkout form
    await expect(page).toHaveURL(/checkout-step-one/);
    await page.fill('#first-name', 'John');
    await page.fill('#last-name', 'Doe');
    await page.fill('#postal-code', '1000');
    await takeScreenshot('05-checkout-form-filled');

    await page.click('#continue');

    // Verify checkout overview page
    await expect(page).toHaveURL(/checkout-step-two/);
    await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
    await takeScreenshot('06-checkout-overview');

    // Step 9: Finish order
    await page.click('#finish');

    // Step 10: Verify confirmation message
    await expect(page).toHaveURL(/checkout-complete/);
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
    await takeScreenshot('07-order-confirmation');
  });

});
