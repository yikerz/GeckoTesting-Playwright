import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { IdVerificationPage } from '../pages/IdVerificationPage';
import { LoginPage } from '../pages/LoginPage';


test.describe('ID verification functionalities', () => {

    test.beforeEach(async ({page}) => {
        let loginPage = new LoginPage(page);
        let customerEmail = 'Yikerz.Testing+11@gmail.com';
        let customerPass = 'Testing@1';

        await loginPage.navigate();
        await loginPage.login(customerEmail, customerPass);
    })

    test('Upload documents for verification', async ({page}) => {
        let homePage = new HomePage(page);
        let idVerifyPage = new IdVerificationPage(page);

        await homePage.waitForURL(10*1000);
        await homePage.clickIdVerification();
        await idVerifyPage.waitForURL(10*1000);
        await idVerifyPage.testDeleteButton();
        await idVerifyPage.uploadDoc(3);
        await idVerifyPage.verifySubmission();

        await page.waitForTimeout(2000);

        await idVerifyPage.verifyDatabase(3);
    })

})