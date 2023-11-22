exports.ResetPage = class ResetPage {

	constructor(page) {
		this.page = page;
		this.url = 'http://localhost:3000/resetPassword';
		this.emailField = this.page.locator('id=email');
		this.sendCodeButton = this.page.getByRole('button', { name: 'Send Verification Code' });
		this.resetButton = this.page.getByRole('button', { name: 'Reset Password' });
		this.codeField = this.page.locator('id=code');
		this.passwordField = this.page.locator('id=password');
		this.confirmPasswordField = this.page.locator('id=confirmPassword');

	}
	
	async waitForURL(timeout) {
        await this.page.waitForURL(this.url, {timeout: timeout});
    }

	async inputEmail(email) {
		await this.emailField.fill(email);
	}

	async sendVerificationCode() {
		await this.sendCodeButton.click();
	}

	async clickResetPassword() {
		await this.resetButton.click();
	}

	async resetPassword(code, password) {
		await this.codeField.fill(code);
		await this.passwordField.fill(password);
		await this.confirmPasswordField.fill(password);
		await this.resetButton.click();
	}

};
