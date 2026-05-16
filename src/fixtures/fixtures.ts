import { InventoryPage } from '../pages/InventoryPage'
import { LoginPage } from '../pages/LoginPage'
import { test as base } from '@playwright/test'

type Fixtures = {
    loginPage: LoginPage
    inventoryPage: InventoryPage
    loggedIn: void
}

export const test = base.extend<Fixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page))
    },
    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page))
    },
    loggedIn: async ({ page }, use) => {
        await page.goto('/')
        const loginPage = new LoginPage(page)
        await loginPage.login('standard_user', process.env.PASSWORD!)
        await use()
    },
})

export { expect } from '@playwright/test'
