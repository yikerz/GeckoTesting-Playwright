import { expect, test } from '@playwright/test';

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

test.describe('Sign Up functionalities', () => {

    test('Create new account', async ({browser, page}) => {
        // Given A user access to the login page
        await page.goto('http://localhost:3000/login');
        // When The link text "Forgot password?" is clicked
        await page.locator('xpath=//a[contains(text(), "Sign Up")]').click();
        // Then The site should navigate to sign-up page
        await expect(page).toHaveURL('http://localhost:3000/signup');
        // When The user insert sign-up details
        await page.locator('id=givenNames').fill('Travis');
        await page.locator('id=familyName').fill('LunMong');
        await page.locator('id=email').fill(`Yikerz.Testing+${getRandomInt(0, 999)}@gmail.com`);
        await page.locator('id=password').fill('Testing@1');
        await page.locator('id=confirmPassword').fill('Testing@1');
        // And Click the sign-up button
        await page.getByRole('button', { name: 'Sign Up' }).click()
        // Then The verify button should be displayed
        await expect(page.getByRole('button', { name: 'Verify' })).toBeEnabled();
        // When The user open a new window and nagivate to Gmail
        const gmailPage = await browser.newPage();
        await gmailPage.goto('https://mail.google.com');
        // And Login with the email and password
        await gmailPage.locator('id=identifierId').fill('Yikerz.Testing@gmail.com');
        await gmailPage.locator('//*[@id=\"identifierNext\"]/div/button').click();
        await gmailPage.locator('[name=Passwd]').fill("g6Xc{Ov48'H");
        await gmailPage.locator('//*[@id=\"passwordNext\"]/div/button').click();
        // Then The user should receive a new email with a "confirmation" code
        const emailContent = await gmailPage.locator("//span[starts-with(text(),'Your confirmation code is')]").textContent();
        const code =  emailContent.substring(emailContent.lastIndexOf(" ") + 1);
        await gmailPage.hover('div[role="tabpanel"]');
        await gmailPage.locator('li[data-tooltip="Delete"]').click();
        await gmailPage.close();
        // When The user insert the code
        await page.locator('id=code').fill(code);
        // And Click verify button
        await page.getByRole('button', { name: 'Verify' }).click();
        // Then The login page should be displayed
        await page.waitForURL('http://localhost:3000/login', {timeout: 10 * 1000});
    })

})