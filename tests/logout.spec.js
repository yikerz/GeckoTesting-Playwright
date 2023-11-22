import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';

test.describe('Logout functionalities', () => {
    let homePage;
    let loginPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        const email = 'Yikerz.Testing+11@gmail.com';
        const password = 'Testing@1';

        await loginPage.navigate();
        await loginPage.login(email, password);
    })

    test('Logout from current user', async ({page}) => {
        homePage = new HomePage(page);
        
        await homePage.waitForURL(10*1000);
		await homePage.logout();
        await loginPage.waitForURL(10*1000);
    })
})