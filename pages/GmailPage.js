exports.GmailPage = class GmailPage {

    constructor(page) {
        this.page = page;
        this.url = 'https://mail.google.com';
    }

    async navigate() {
        await this.page.goto(this.url);
    }

    async login(email, password) {
        await this.page.locator('id=identifierId').fill(email);
        await this.page.locator('//*[@id=\"identifierNext\"]/div/button').click();
        await this.page.locator('[name=Passwd]').fill(password);
        await this.page.locator('//*[@id=\"passwordNext\"]/div/button').click();
    }

    async getVerificationCode(emailType) {
        let emailContent;
        switch (emailType) {
            case 'reset':
                emailContent = await this.page.locator("//span[starts-with(text(),'Your password reset code is')]").textContent();
                break;
            case 'signup':
                emailContent = await this.page.locator("//span[starts-with(text(),'Your confirmation code is')]").textContent();
                break;
            default:
                return null;
        }
        return emailContent.substring(emailContent.lastIndexOf(" ") + 1);;
    }

    async deleteEmail() {
        await this.page.hover('div[role="tabpanel"]');
        await this.page.locator('li[data-tooltip="Delete"]').click();
    }

}