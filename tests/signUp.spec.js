import { expect, test } from '@playwright/test';
import { GmailPage } from '../pages/GmailPage';
import { LoginPage } from '../pages/LoginPage';
import { SignUpPage } from '../pages/SignupPage';

test.describe('Sign Up functionalities', () => {

    test('Create new account', async ({browser, page}) => {
        const loginPage = new LoginPage(page);
        const signUpPage = new SignUpPage(page);

        await loginPage.navigate();
        await loginPage.clickSignUp();
        await page.waitForURL('http://localhost:3000/signup');
        await signUpPage.signUp('Travis', 'LunMong', 'Testing@1');
        await expect(page.getByRole('button', { name: 'Verify' })).toBeEnabled();
        
        const page2 = await browser.newPage();
        const gmailPage = new GmailPage(page2)
        await gmailPage.navigate();
        await gmailPage.login('Yikerz.Testing@gmail.com', "g6Xc{Ov48'H")
        const code = await gmailPage.getVerificationCode('signup');
        await gmailPage.deleteEmail();
        await page2.close();

        await signUpPage.verify(code);
        await page.waitForURL('http://localhost:3000/login', {timeout: 10 * 1000});
    })

    test.only('Sign Up without filling in anything', async ({browser, page}) => {
        const loginPage = new LoginPage(page);
        const signUpPage = new SignUpPage(page);

        await loginPage.navigate();
        await loginPage.clickSignUp();
        await page.waitForURL('http://localhost:3000/signup');
        await page.getByText('Sign Up').click();
        await expect(page.getByText('Given Name(s) is required')).toBeVisible();
    })

})