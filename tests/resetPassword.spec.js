import { expect, test } from '@playwright/test';

test.describe('Reset password functionalities', () => {

    test('Reset forgot password', async ({browser, page}) => {
        // Given A user access to the login page
        await page.goto('http://localhost:3000/login');
        // When The link text "Forgot password?" is clicked
        await page.getByRole('link', { name:'Forgot password?' }).click();
        // Then The site should navigate to reset-password page
        await expect(page).toHaveURL('http://localhost:3000/resetPassword');
        // When The user insert "Yikerz.Testing+1@gmail.com" in the Email field
        const emailField = page.locator('id=email');
        await emailField.click();
        await emailField.fill('Yikerz.Testing+1@gmail.com');
        // And The Send Verification Code button is clicked
        await page.getByRole('button', { name: 'Send Verification Code' }).click();
        // Then The site should navigate to reset-password page
        await expect(page).toHaveURL('http://localhost:3000/resetPassword');
        // And The Reset Password button should be displayed
        await expect(page.getByRole('button', { name: 'Reset Password' })).toBeEnabled();
        // When The user open a new window and nagivate to Gmail
        const gmailPage = await browser.newPage();
        await gmailPage.goto('https://mail.google.com');
        // And Login with the email and password
        await gmailPage.locator('id=identifierId').fill('Yikerz.Testing@gmail.com');
        await gmailPage.locator('//*[@id=\"identifierNext\"]/div/button').click();
        await gmailPage.locator('[name=Passwd]').fill("g6Xc{Ov48'H");
        await gmailPage.locator('//*[@id=\"passwordNext\"]/div/button').click();
        // Then The user should receive a new email with a "password reset" code
        const emailContent = await gmailPage.locator("//span[starts-with(text(),'Your password reset code is')]").textContent();
        const code =  emailContent.substring(emailContent.lastIndexOf(" ") + 1);
        await gmailPage.hover('div[role="tabpanel"]');
        await gmailPage.locator('li[data-tooltip="Delete"]').click();
        await gmailPage.close();
        // When The user insert the code and new password "Testing@1"
        await page.locator('id=code').fill(code);
        await page.locator('id=password').fill('Testing@1');
        await page.locator('id=confirmPassword').fill('Testing@1');
        // And Click Reset Password button
        await page.getByRole('button', { name: 'Reset Password' }).click();
        // Then The login page should be displayed
        await page.waitForURL('http://localhost:3000/login', {timeout: 10 * 1000});
    })

})