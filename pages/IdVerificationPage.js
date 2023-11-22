import { expect } from "@playwright/test";
import JdbcConnection from '../helper/JdbcConnection';

exports.IdVerificationPage = class IdVerificationPage {

    constructor(page) {
        this.page = page;
        this.url = 'http://localhost:3000/idVerification';
        this.firstDeleteButton = page.locator('//*[@id="root"]/div/div[2]/div[2]/div/div/div/div[1]/table/tbody/tr[1]/th[5]/button');
        this.addRowButton = page.getByRole('button', {name:'+ Add More'});
        this.submitButton = page.getByRole('button', { name: 'Submit' });
        this.successfulMessage = 'Your Application Submitted Successfully';
    }

    async waitForURL(timeout) {
        await this.page.waitForURL(this.url, {timeout: timeout});
    }

    async testDeleteButton() {
        await this.firstDeleteButton.click();
        await expect(this.page.locator('input[name="documentCategory"]')).toHaveCount(0);
    }

    async uploadDoc(numberOfDoc) {
        for (let i = 1; i <= numberOfDoc; i++) {
            await this.addRowButton.click();
            await this.page.locator(`//*[@id="root"]/div/div[2]/div[2]/div/div/div/div[1]/table/tbody/tr[${i}]/th[1]/div/div/div`).click();
            await this.page.locator(`//*[@id='menu-documentCategory']/div[3]/ul/li[${i}]`).click();
            await this.page.locator(`//*[@id='root']/div/div[2]/div[2]/div/div/div/div[1]/table/tbody/tr[${i}]/th[2]/div/div/div`).click();
            await this.page.locator(`//*[@id='menu-documentType']/div[3]/ul/li[1]`).click();
            const fileChooserPromise = this.page.waitForEvent('filechooser');
            await this.page.locator(`//*[@id="root"]/div/div[2]/div[2]/div/div/div/div[1]/table/tbody/tr[${i}]/th[3]/div/div/label/span`).click();
            const fileChooser = await fileChooserPromise;
            await fileChooser.setFiles(`C:/Users/Yik/Desktop/gecko-playwright/docs/doc${i}.jpg`);
        }
        await this.submitButton.click();
    }

    async verifySubmission() {
        await this.page.waitForURL('http://localhost:3000/success');
        await expect(this.page.getByText(this.successfulMessage)).toBeVisible();
    }

    async verifyDatabase(numberOfDoc) {
        const jdbcConnection = new JdbcConnection();
        try {
            const tableSize = await jdbcConnection.getTableSize('useridverification_document');
            await jdbcConnection.emptyTable('useridverification_document');
            expect(tableSize).toBe(numberOfDoc);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            await jdbcConnection.shutDown();
        }
    }

    async emptyTable() {
        const jdbcConnection = new JdbcConnection();
        try {
            await jdbcConnection.emptyTable('useridverification_document');
        } catch (error) {
            console.error('Error:', error);
        } finally {
            await jdbcConnection.shutDown();
        }
    }




}