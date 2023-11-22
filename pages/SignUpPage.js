function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.SignUpPage = class SignUpPage {
    
    constructor(page) {
        this.page = page;
    }
    

    async signUp(givenName, familyName, password){
        await this.page.locator('id=givenNames').fill(givenName);
        await this.page.locator('id=familyName').fill(familyName);
        await this.page.locator('id=email').fill(`Yikerz.Testing+${getRandomInt(0, 999)}@gmail.com`);
        await this.page.locator('id=password').fill(password);
        await this.page.locator('id=confirmPassword').fill(password);
        await this.page.getByRole('button', { name: 'Sign Up' }).click()
    }

    async verify(code) {
        await this.page.locator('id=code').fill(code);
        await this.page.getByRole('button', { name: 'Verify' }).click();
    }

}