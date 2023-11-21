import { expect, test } from '@playwright/test';
import JdbcConnection from '../helper/JdbcConnection';

test.describe('ID verification functionalities', () => {

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

    test('Upload documents for verification', async ({page}) => {
        // Given A user is at the home page
        expect(page.url()).toBe('http://localhost:3000/');
        // When Click the ID Verification on the NavBar
        await page.getByRole('link', { name: 'ID Verification' }).click();
        // Then The ID verification page should be displayed
        expect(page.url()).toBe('http://localhost:3000/idVerification');
        // Click the 1-th delete icon button
        await page.locator('//*[@id="root"]/div/div[2]/div[2]/div/div/div/div[1]/table/tbody/tr[1]/th[5]/button').click();
        // Then The default row is not displayed
        await expect(page.locator('input[name="documentCategory"]')).toHaveCount(0);
        // When Add primary, secondary and tertiary documents
        for (let i = 1; i <= 3; i++) {
            await page.getByRole('button', {name:'+ Add More'}).click();
            await page.locator(`//*[@id="root"]/div/div[2]/div[2]/div/div/div/div[1]/table/tbody/tr[${i}]/th[1]/div/div/div`).click();
            await page.locator(`//*[@id='menu-documentCategory']/div[3]/ul/li[${i}]`).click();
            await page.locator(`//*[@id='root']/div/div[2]/div[2]/div/div/div/div[1]/table/tbody/tr[${i}]/th[2]/div/div/div`).click();
            await page.locator(`//*[@id='menu-documentType']/div[3]/ul/li[1]`).click();
            const fileChooserPromise = page.waitForEvent('filechooser');
            await page.locator(`//*[@id="root"]/div/div[2]/div[2]/div/div/div/div[1]/table/tbody/tr[${i}]/th[3]/div/div/label/span`).click();
            const fileChooser = await fileChooserPromise;
            await fileChooser.setFiles(`C:/Users/Yik/Desktop/gecko-playwright/docs/doc${i}.jpg`);
        }
        // And Click submit button
        await page.getByRole('button', { name: 'Submit' }).click();
        // Then The success page should be displayed
        await expect(page).toHaveURL('http://localhost:3000/success');
        await expect(page.getByText('Your Application Submitted Successfully')).toBeVisible();
        // And The MySQL database should be updated with the document information
        const jdbcConnection = new JdbcConnection();
        try {
            const tableSize = await jdbcConnection.getTableSize('useridverification_document');
            await jdbcConnection.emptyTable('useridverification_document');
            await expect(tableSize).toBe(3);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            await jdbcConnection.shutDown();
        }
    })

})