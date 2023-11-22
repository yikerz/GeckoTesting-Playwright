import { expect, test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { IdVerificationPage } from '../pages/IdVerificationPage';
import { LoginPage } from '../pages/LoginPage';
import { ReviewIdPage } from '../pages/ReviewIdPage';

test.describe('ID review', () => {
    let loginPage;
    let homePage;

    test.beforeEach(async({page}) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        await loginPage.navigate();

        let customerEmail = 'Yikerz.Testing+11@gmail.com';
        let customerPass = 'Testing@1';

        await loginPage.navigate();
        await loginPage.login(customerEmail, customerPass);
        await homePage.waitForURL(10*1000);
        await homePage.clickIdVerification();
        await idVerifyPage.waitForURL(10*1000);
        await idVerifyPage.testDeleteButton();
        await idVerifyPage.uploadDoc(3);
        await idVerifyPage.verifySubmission();
        await page.waitForTimeout(2000);
        await homePage.logout();
    })

    test.afterEach(async({page}) => {
        let idVerifyPage = new IdVerificationPage(page);
        await idVerifyPage.emptyTable();
    })

    test('ID Review', async({page}) => {
        let employeeEmail = 'Yikerz.Testing@gmail.com';
        let employeePass = 'Password@1'
        let reviewIdPage = new ReviewIdPage(page);
        const modal = await reviewIdPage.getModal();

        await loginPage.waitForURL(10*1000);
        await loginPage.login(employeeEmail, employeePass);
        await homePage.waitForURL(10*1000);
        await homePage.clickReviewId();
        await reviewIdPage.waitForURL(10*1000);
        await reviewIdPage.chooseApplicant('Travis');
        await reviewIdPage.clickImage(1);
        expect(modal).toBeVisible();
        await reviewIdPage.clickAcceptInModal();
        await reviewIdPage.closeModal();
        await reviewIdPage.clickImage(2);
        expect(modal).toBeVisible();
        await reviewIdPage.clickAcceptInModal();
        await reviewIdPage.closeModal();
        await reviewIdPage.clickImage(3);
        expect(modal).toBeVisible();
        await reviewIdPage.clickRejectInModal();
        await reviewIdPage.closeModal();
        await page.getByRole('row', { name: 'TERTIARY TERTIARY_ID doc3.jpg' }).locator('#comment').click();
        await page.getByRole('row', { name: 'TERTIARY TERTIARY_ID doc3.jpg' }).locator('#comment').fill('Image blurred');
        await page.getByRole('button', { name: 'Submit' }).click();
    })

})