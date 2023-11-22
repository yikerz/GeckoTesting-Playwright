exports.ReviewIdPage = class ReviewIdPage {

    constructor(page) {
        this.page = page;
        this.url = 'http://localhost:3000/reviewIdVerification';
        this.applicantsDropDown = page.getByLabel('Choose Applicant');
        this.modal = page.locator('//html/body/div[2]/div[3]');
        this.modalAcceptButton = page.locator('//html/body/div[2]/div[3]/div/div/label[1]/span[1]/input');
        this.modalRejectButton = page.locator('//html/body/div[2]/div[3]/div/div/label[2]/span[1]/input');
        this.modalCloseButton = page.locator('//html/body/div[2]/div[3]/div/button');
    }

    async waitForURL(timeout) {
        await this.page.waitForURL(this.url, {timeout:timeout});
    }

    async chooseApplicant(givenName) {
        await this.applicantsDropDown.click();
        await this.page.getByRole('option', { name: `${givenName}` }).click();
    }

    async clickImage(imageNumber) {
        await this.page.getByAltText(`doc${imageNumber}.jpg`).click();
    }

    async getModal() {
        return await this.modal;
    }

    async clickAcceptInModal() {
        await this.modalAcceptButton.click();
    }

    async clickRejectInModal() {
        await this.modalRejectButton.click();
    }

    async closeModal() {
        await this.modalCloseButton.click();
    }

}