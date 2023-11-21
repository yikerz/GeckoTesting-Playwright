import { expect, test } from '@playwright/test';

test.describe('Login functionalities', () => {
    
    test('Login with correct email and password', async ({page}) => {
        // Given A user access to the login page
        await page.goto('http://localhost:3000/login');
        // When A "<email>" and "<password>" are inserted
        await page.click('id=email');
        await page.locator('id=email').fill('Yikerz.Testing+11@gmail.com');
        await page.click('id=password');
        await page.locator('id=password').fill('Testing@1');
        // And The sign in button is clicked
        await page.getByRole('button', { name: 'Sign In' }).click();
        // Then The home page should be displayed
        await page.waitForURL('http://localhost:3000/', {timeout: 10 * 1000});
        // And The logout button is displayed
        const logoutButton = page.getByRole('button', { name: 'Logout' });
        await expect(logoutButton).toBeEnabled();
    })
    
    test('Login with incorrect email or password', async ({page}) => {
        // Given A user access to the login page
        await page.goto('http://localhost:3000/login');
        // When A "<email>" and "<password>" are inserted
        await page.click('id=email');
        await page.locator('id=email').fill('Yikerz.Testing+11@gmail.com');
        await page.click('id=password');
        await page.locator('id=password').fill('wrongPassword');
        // And The sign in button is clicked
        await page.getByRole('button', { name: 'Sign In' }).click();
        // Then Alert with "Incorrect username or password." is displayed
        await expect(page.getByText('Incorrect username or password.')).toBeVisible();
    })

    test('Login with correct email and password and press refresh button when loading', async ({page}) => {
        // Given A user access to the login page
        await page.goto('http://localhost:3000/login');
        // When A "<email>" and "<password>" are inserted
        await page.click('id=email');
        await page.locator('id=email').fill('Yikerz.Testing+11@gmail.com');
        await page.click('id=password');
        await page.locator('id=password').fill('Testing@1');
        // And The sign in button is clicked
        await page.getByRole('button', { name: 'Sign In' }).click();
        // And The refresh button is clicked while the page is loading
        await page.reload();
        // Then Redirect back to login page
        await expect(page.locator('id=email')).toBeEnabled();
        await expect(page.locator('id=password')).toBeEnabled();
        await expect(page.getByRole('button', { name: 'Sign In' })).toBeEnabled();
    })

    test('Click on the login button with empty fields', async ({page}) => {
        // Given A user access to the login page
        await page.goto('http://localhost:3000/login');
        // And The sign in button is clicked
        await page.getByRole('button', { name: 'Sign In' }).click();
        // Then Alert with "Missing required parameter USERNAME" is displayed for empty fields
        await expect(page.getByText('Invalid email address')).toBeVisible();
        await expect(page.getByText('Required')).toBeVisible();
    })

})
