import { softExpect } from '@assertions'
import { expect, test } from '@fixtures'

test.describe('Inventory Page - Cart', () => {
    test('Should show cart badge with count 1 after adding one product', async ({ loggedIn: _loggedIn, inventoryPage }) => {
        await test.step('Add first product to cart', async () => {
            await inventoryPage.addToCartByIndex(0)
        })

        await test.step('Verify cart badge shows count 1', async () => {
            await softExpect(inventoryPage.cartBadge).toBeVisible()
            await softExpect(inventoryPage.cartBadge).toHaveText('1')
        })
    })

    test('Should hide cart badge after removing an added product', async ({ loggedIn: _loggedIn, inventoryPage, page }) => {
        await test.step('Add first product to cart', async () => {
            await inventoryPage.addToCartByIndex(0)
        })

        await test.step('Remove the product from cart', async () => {
            await page.getByRole('button', { name: 'Remove' }).click()
        })

        await test.step('Verify cart badge is no longer visible', async () => {
            await softExpect(inventoryPage.cartBadge).not.toBeVisible()
        })
    })

    test('Should update cart badge count when adding multiple products', async ({ loggedIn: _loggedIn, inventoryPage }) => {
        await test.step('Add three products to cart', async () => {
            await inventoryPage.addToCartByIndex(0)
            await inventoryPage.addToCartByIndex(1)
            await inventoryPage.addToCartByIndex(2)
        })

        await test.step('Verify cart badge shows count 3', async () => {
            await softExpect(inventoryPage.cartBadge).toHaveText('3')
        })
    })

    test('Should navigate to cart page when clicking the cart icon', async ({ loggedIn: _loggedIn, inventoryPage, page }) => {
        await test.step('Click the cart icon', async () => {
            await inventoryPage.cartLink.click()
        })

        await test.step('Verify navigation to cart page', async () => {
            await expect(page).toHaveURL('/cart.html')
        })
    })
})
