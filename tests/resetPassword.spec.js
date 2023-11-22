import { test } from '@playwright/test';
import { GmailPage } from '../pages/GmailPage';
import { LoginPage } from '../pages/LoginPage';
import { ResetPage } from '../pages/ResetPage';

test.describe('Reset password functionalities', () => {

    test('Reset forgot password', async ({browser, page}) => {
        const loginPage = new LoginPage(page);
        const resetPage = new ResetPage(page);

        await loginPage.navigate();
        await loginPage.clickForgotPassword();
        await resetPage.waitForURL(10*1000);
        await resetPage.inputEmail('Yikerz.Testing+11@gmail.com');
        await resetPage.sendVerificationCode();

        const page2 = await browser.newPage();
        const gmailPage = new GmailPage(page2)
        await gmailPage.navigate();
        await gmailPage.login('Yikerz.Testing@gmail.com', "g6Xc{Ov48'H")
        const code = await gmailPage.getVerificationCode('reset');
        await gmailPage.deleteEmail();
        await page2.close();
        
        await resetPage.resetPassword(code, 'Testing@1');
        await loginPage.waitForURL(10*1000);
    })

})