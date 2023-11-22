exports.LoginPage = class LoginPage {

    constructor(page) {
        this.page = page;
        this.url = 'http://localhost:3000/login';
        this.emailField = page.locator('id=email');
        this.passwordField = page.locator('id=password');
        this.signInButton = page.getByRole('button', { name: 'Sign In' });
        this.forgotPasswordLinkText = page.getByRole('link', { name:'Forgot password?' });
        this.signUpLinkText = page.locator('xpath=//a[contains(text(), "Sign Up")]');
    }
    
    async navigate() {
        await this.page.goto(this.url);
    }

    async waitForURL(timeout) {
        await this.page.waitForURL(this.url, {timeout: timeout});
    }

    async login(email, password) {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        this.signInButton.click();
    }

    async getErrorMessage(message) {
        return await this.page.getByText(message);
    }

    async getEmailField() {
        return await this.emailField;
    }

    async getPasswordField() {
        return await this.passwordField;
    }

    async getSignInButton() {
        return await this.signInButton;
    }

    async clickForgotPassword() {
        await this.forgotPasswordLinkText.click();
    }

    async clickSignUp() {
        await this.signUpLinkText.click();
    }

}