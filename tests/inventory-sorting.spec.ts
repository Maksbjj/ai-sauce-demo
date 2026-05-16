import { softExpect } from '@assertions'
import { test } from '@fixtures'

test.describe('Inventory Page - Sorting', () => {

    test('Should display products sorted by name A to Z by default', async ({ loggedIn: _loggedIn, inventoryPage }) => {
        await test.step('Get product names in current order', async () => {
            const names = await inventoryPage.getProductNames()

            softExpect(names).toEqual(inventoryPage.sortNames(names, 'asc'))
        })
    })

    test('Should sort products by name Z to A', async ({ loggedIn: _loggedIn, inventoryPage }) => {
        await test.step('Select Z to A sort option', async () => {
            await inventoryPage.sortBy('za')
        })

        await test.step('Verify products are sorted Z to A', async () => {
            const names = await inventoryPage.getProductNames()

            softExpect(names).toEqual(inventoryPage.sortNames(names, 'desc'))
        })
    })

    test('Should sort products by price low to high', async ({ loggedIn: _loggedIn, inventoryPage }) => {
        await test.step('Select Price (low to high) sort option', async () => {
            await inventoryPage.sortBy('lohi')
        })

        await test.step('Verify prices are in ascending order', async () => {
            const prices = await inventoryPage.getProductPrices()

            softExpect(prices).toEqual(inventoryPage.sortPrices(prices, 'asc'))
        })
    })

    test('Should sort products by price high to low', async ({ loggedIn: _loggedIn, inventoryPage }) => {
        await test.step('Select Price (high to low) sort option', async () => {
            await inventoryPage.sortBy('hilo')
        })

        await test.step('Verify prices are in descending order', async () => {
            const prices = await inventoryPage.getProductPrices()

            softExpect(prices).toEqual(inventoryPage.sortPrices(prices, 'desc'))
        })
    })
})
