import { Locator, Page } from '@playwright/test'

export class LoginPage {
    readonly errors = {
        lockedOut: 'Sorry, this user has been locked out',
        invalidCredentials: 'Username and password do not match',
        usernameRequired: 'Username is required',
        passwordRequired: 'Password is required',
    }

    inputUserName: Locator
    inputPassword: Locator
    buttonLogin: Locator
    errorMessage: Locator

    constructor(public page: Page) {
        this.inputUserName = page.getByPlaceholder('Username')
        this.inputPassword = page.getByPlaceholder('Password')
        this.buttonLogin = page.getByRole('button', { name: 'Login' })
        this.errorMessage = page.locator('[data-test="error"]')
    }

    async login(username: string, password: string): Promise<void> {
        await this.inputUserName.fill(username)
        await this.inputPassword.fill(password)
        await this.buttonLogin.click()
    }
}
