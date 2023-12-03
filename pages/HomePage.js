exports.HomePage = class HomePage{

    constructor(page) {
        this.page = page;
        this.url = 'http://localhost:3000/';
        this.logoutButton = page.getByRole('button', { name: 'Logout' });
        this.idVerificationLinkText = page.getByRole('link', { name: 'ID Verification' });
        this.reviewIdLinkText = page.getByRole('link', { name: 'Review ID' });
        this.creditCardsLinkText = page.getByRole('link', { name: 'Credit Cards' });
    }

    async waitForURL(timeout) {
        await this.page.waitForURL(this.url, {timeout: timeout});
    }

    async getLogoutButton() {
        return await this.logoutButton;
    }

    async logout() {
        await this.logoutButton.click();
    }

    async clickIdVerification() {
        await this.idVerificationLinkText.click();
    }

    async clickReviewId() {
        await this.reviewIdLinkText.click();
    }

    async clickCreditCards() {
        await this.creditCardsLinkText.click();
    }


}