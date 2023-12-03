import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { IdVerificationPage } from '../pages/IdVerificationPage';
import { LoginPage } from '../pages/LoginPage';

test.describe('ID review', () => {
    let loginPage;
    let homePage;
    let idVerifyPage;

    test.beforeEach(async({page}) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        idVerifyPage = new IdVerificationPage(page);
        await loginPage.navigate();

        let customerEmail = 'Yikerz.Testing+11@gmail.com';
        let customerPass = 'Testing@1';

        await loginPage.navigate();
        await loginPage.login(customerEmail, customerPass);
        await homePage.waitForURL(10*1000);
    })

    test.afterEach(async({page}) => {
    })

    test('ID Review', async({page}) => {
        test.slow();

        await homePage.clickCreditCards();
        await page.waitForURL('http://localhost:3000/creditCards');
        await page.pause();


        
    })

})