import { expect, test } from '@playwright/test';

test.describe('Logout functionalities', () => {
    
    test.beforeEach(async ({page}) => {
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
    })

    test('Logout from current user', async ({page}) => {
        // Given A user is at the home page
        expect(page.url()).toBe('http://localhost:3000/');
		// When The logout button is clicked
        const logoutButton = page.getByRole('button', { name: 'Logout' });
        await logoutButton.click();
		// Then The login page should be displayed
        await page.waitForURL('http://localhost:3000/login', {timeout: 10 * 1000});
    })
})