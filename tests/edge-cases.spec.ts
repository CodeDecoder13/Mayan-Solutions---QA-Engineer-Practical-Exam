import { test, expect } from '@playwright/test';

test.describe('SauceDemo Edge Cases', () => {

  test('Invalid Login - wrong password', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');

    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'wrong_password');
    await page.click('#login-button');

    // Verify error message appears
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Username and password do not match any user in this service');
  });

  test('Invalid Login - empty credentials', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');

    await page.click('#login-button');

    // Verify error message appears
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Username is required');
  });

  test('Invalid Login - locked out user', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');

    await page.fill('#user-name', 'locked_out_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // Verify locked out error
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Sorry, this user has been locked out');
  });

  test('Checkout Without Items - cart is empty', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');

    // Login
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await expect(page).toHaveURL(/inventory/);

    // Go directly to cart without adding items
    await page.click('.shopping_cart_link');
    await expect(page).toHaveURL(/cart/);

    // Verify cart is empty - no items present
    await expect(page.locator('.cart_item')).toHaveCount(0);

    // Click checkout with empty cart
    await page.click('#checkout');

    // Fill checkout form
    await page.fill('#first-name', 'John');
    await page.fill('#last-name', 'Doe');
    await page.fill('#postal-code', '1000');
    await page.click('#continue');

    // Verify no items in checkout overview
    await expect(page.locator('.cart_item')).toHaveCount(0);
  });

  test('Missing Checkout Fields - empty postal code', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');

    // Login
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // Add item to cart
    await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');

    // Go to cart and checkout
    await page.click('.shopping_cart_link');
    await page.click('#checkout');

    // Fill form with missing postal code
    await page.fill('#first-name', 'John');
    await page.fill('#last-name', 'Doe');
    // Leave postal code empty
    await page.click('#continue');

    // Verify error message appears
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Postal Code is required');
  });

  test('Missing Checkout Fields - empty first name', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');

    // Login
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // Add item and go to checkout
    await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');
    await page.click('#checkout');

    // Leave first name empty
    await page.fill('#last-name', 'Doe');
    await page.fill('#postal-code', '1000');
    await page.click('#continue');

    // Verify error message
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('First Name is required');
  });

  test('Missing Checkout Fields - all fields empty', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');

    // Login
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // Add item and go to checkout
    await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');
    await page.click('#checkout');

    // Leave all fields empty and click continue
    await page.click('#continue');

    // Verify error message
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('First Name is required');
  });

});
