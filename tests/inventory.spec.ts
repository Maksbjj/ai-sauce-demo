import { softExpect } from '@assertions'
import { expect, test } from '@fixtures'

test.describe('Inventory Page - Display', () => {
    test('Should display the Products title on the inventory page', async ({ loggedIn: _loggedIn, inventoryPage }) => {
        await test.step('Verify page title is visible', async () => {
            await softExpect(inventoryPage.pageTitle).toBeVisible()
        })
    })

    test('Should display 6 products on the inventory page', async ({ loggedIn: _loggedIn, inventoryPage }) => {
        await test.step('Verify 6 product items are displayed', async () => {
            await softExpect(inventoryPage.productItems).toHaveCount(6)
        })
    })

    test('Should display name, price, and Add to cart button for each product', async ({ loggedIn: _loggedIn, inventoryPage }) => {
        await test.step('Verify all product names are visible', async () => {
            await softExpect(inventoryPage.productNames).toHaveCount(6)
        })

        await test.step('Verify all product prices are visible', async () => {
            await softExpect(inventoryPage.productPrices).toHaveCount(6)
        })

        await test.step('Verify all Add to cart buttons are visible', async () => {
            await softExpect(inventoryPage.addToCartButtons).toHaveCount(6)
        })
    })

    test('Should display sort dropdown with default option Name (A to Z)', async ({ loggedIn: _loggedIn, inventoryPage }) => {
        await test.step('Verify sort dropdown is visible with correct default', async () => {
            await softExpect(inventoryPage.sortDropdown).toBeVisible()
            await softExpect(inventoryPage.sortDropdown).toHaveValue('az')
        })
    })

    test('Should logout and redirect to login page via burger menu', async ({ loggedIn: _loggedIn, page, inventoryPage }) => {
        await test.step('Logout via burger menu', async () => {
            await inventoryPage.logout()
        })

        await test.step('Verify redirect to login page', async () => {
            await expect(page).toHaveURL('/')
        })
    })
})
