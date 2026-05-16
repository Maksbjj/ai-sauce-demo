import { softExpect } from '@assertions'
import { expect, test } from '@fixtures'

const VALID_PASSWORD = process.env.PASSWORD!

const VALID_USERS = ['standard_user', 'problem_user', 'performance_glitch_user', 'error_user', 'visual_user']

test.describe('Login Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
    })

    for (const username of VALID_USERS) {
        test(`Should login successfully as ${username}`, async ({ loginPage, inventoryPage, page }) => {
            await test.step('Enter valid credentials and submit', async () => {
                await loginPage.login(username, VALID_PASSWORD)
            })

            await test.step('Verify redirect to inventory page', async () => {
                await expect(page).toHaveURL(inventoryPage.url)
            })
        })
    }

    test('Should show error for locked out user', async ({ loginPage }) => {
        await test.step('Enter locked out user credentials and submit', async () => {
            await loginPage.login('locked_out_user', VALID_PASSWORD)
        })

        await test.step('Verify error message is displayed', async () => {
            await softExpect(loginPage.errorMessage).toBeVisible()
            await softExpect(loginPage.errorMessage).toContainText(loginPage.errors.lockedOut)
        })
    })

    test('Should show error for invalid credentials', async ({ loginPage }) => {
        await test.step('Enter invalid credentials and submit', async () => {
            await loginPage.login('invalid_user', 'wrong_password')
        })

        await test.step('Verify error message is displayed', async () => {
            await softExpect(loginPage.errorMessage).toBeVisible()
            await softExpect(loginPage.errorMessage).toContainText(loginPage.errors.invalidCredentials)
        })
    })

    test('Should show error when username is empty', async ({ loginPage }) => {
        await test.step('Submit without entering username', async () => {
            await loginPage.login('', VALID_PASSWORD)
        })

        await test.step('Verify error message is displayed', async () => {
            await softExpect(loginPage.errorMessage).toBeVisible()
            await softExpect(loginPage.errorMessage).toContainText(loginPage.errors.usernameRequired)
        })
    })

    test('Should show error when password is empty', async ({ loginPage }) => {
        await test.step('Submit without entering password', async () => {
            await loginPage.login('standard_user', '')
        })

        await test.step('Verify error message is displayed', async () => {
            await softExpect(loginPage.errorMessage).toBeVisible()
            await softExpect(loginPage.errorMessage).toContainText(loginPage.errors.passwordRequired)
        })
    })
})
