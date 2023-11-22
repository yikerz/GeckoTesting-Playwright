import { expect, test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Successful', () => {
    let loginPage;
    let homePage;

    test.beforeEach(async({page}) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
    })

    test('Login with correct email and password', async ({page}) => {
        const email = 'Yikerz.Testing+11@gmail.com';
        const password = 'Testing@1';
        
        await loginPage.navigate();
        await loginPage.login(email, password);
        await homePage.waitForURL(10*1000);
        const logoutButton = await homePage.getLogoutButton();
        await expect(logoutButton).toBeEnabled();
    })

    test('Login with incorrect email or password', async ({page}) => {
        const email = 'Yikerz.Testing+11@gmail.com';
        const password = 'wrongPassword';

        await loginPage.navigate();
        await loginPage.login(email, password);
        const errorMsg = await loginPage.getErrorMessage('Incorrect username or password.');
        await expect(errorMsg).toBeVisible();
    })
    
    test('Login with correct email and password and press refresh button when loading', async ({page}) => {
        const email = 'Yikerz.Testing+11@gmail.com';
        const password = 'Testing@1';

        await loginPage.navigate();
        await loginPage.login(email, password);
        await page.reload();
        await expect(await loginPage.getEmailField()).toBeEnabled();
        await expect(await loginPage.getPasswordField()).toBeEnabled();
        await expect(await loginPage.getSignInButton()).toBeEnabled();
    })
    
    test('Click on the login button with empty fields', async ({page}) => {
        const email = '';
        const password = '';

        await loginPage.navigate();
        await loginPage.login(email, password);
        await expect(await loginPage.getErrorMessage('Invalid email address')).toBeVisible();
        await expect(await loginPage.getErrorMessage('Required')).toBeVisible();
    })

});