import { expect, test } from '@fixtures'

const productData = [
    { index: 0, product: 'Sauce Labs Backpack', expectedUrlSuffix: '/inventory-item.html?id=4' },
    { index: 1, product: 'Sauce Labs Bike Light', expectedUrlSuffix: '/inventory-item.html?id=0' },
    { index: 2, product: 'Sauce Labs Bolt T-Shirt', expectedUrlSuffix: '/inventory-item.html?id=1' },
    { index: 3, product: 'Sauce Labs Fleece Jacket', expectedUrlSuffix: '/inventory-item.html?id=5' },
    { index: 4, product: 'Sauce Labs Onesie', expectedUrlSuffix: '/inventory-item.html?id=2' },
    { index: 5, product: 'Test.allTheThings() T-Shirt (Red)', expectedUrlSuffix: '/inventory-item.html?id=3' },
]

test.describe('Inventory Page - Redirections', () => {
    test('Should stay on inventory page when clicking All Items in the burger menu', async ({
        loggedIn,
        page,
        inventoryPage,
    }) => {
        await test.step('Open burger menu', async () => {
            await inventoryPage.burgerMenuButton.click()
        })

        await test.step('Click All Items link', async () => {
            await inventoryPage.allItemsLink.click()
        })

        await test.step('Verify URL contains /inventory.html', async () => {
            await expect(page).toHaveURL(/\/inventory\.html/)
        })
    })

    test('Should navigate to Sauce Labs website when clicking About in the burger menu', async ({
        loggedIn,
        page,
        inventoryPage,
    }) => {
        await test.step('Open burger menu', async () => {
            await inventoryPage.burgerMenuButton.click()
        })

        await test.step('Click About link', async () => {
            await inventoryPage.aboutLink.click()
        })

        await test.step('Verify URL matches saucelabs.com', async () => {
            await expect(page).toHaveURL(/saucelabs\.com/)
        })
    })

    test('Should navigate to the correct product detail page when clicking a product title link', async ({
        loggedIn,
        page,
        inventoryPage,
    }) => {
        for (const { index, product, expectedUrlSuffix } of productData) {
            await test.step(`Click title link for ${product}`, async () => {
                await inventoryPage.productTitleLinks.nth(index).click()
                await expect(page).toHaveURL(new RegExp(expectedUrlSuffix.replace('?', '\\?')))
                await page.goto(inventoryPage.url)
            })
        }
    })

    test('Should navigate to the correct product detail page when clicking a product image link', async ({
        loggedIn,
        page,
        inventoryPage,
    }) => {
        for (const { index, product, expectedUrlSuffix } of productData) {
            await test.step(`Click image link for ${product}`, async () => {
                await inventoryPage.productImageLinks.nth(index).click()
                await expect(page).toHaveURL(new RegExp(expectedUrlSuffix.replace('?', '\\?')))
                await page.goto(inventoryPage.url)
            })
        }
    })

    test('Should open Twitter page in a new tab when clicking the Twitter footer link', async ({
        loggedIn,
        page,
        inventoryPage,
    }) => {
        await test.step('Click Twitter footer link and capture popup', async () => {
            const [popup] = await Promise.all([page.waitForEvent('popup'), inventoryPage.twitterLink.click()])
            await popup.waitForLoadState()
            expect(popup.url()).toContain('x.com/saucelabs')
        })
    })

    test('Should open Facebook page in a new tab when clicking the Facebook footer link', async ({
        loggedIn,
        page,
        inventoryPage,
    }) => {
        await test.step('Click Facebook footer link and capture popup', async () => {
            const [popup] = await Promise.all([page.waitForEvent('popup'), inventoryPage.facebookLink.click()])
            await popup.waitForLoadState()
            expect(popup.url()).toContain('facebook.com/saucelabs')
        })
    })

    test('Should open LinkedIn page in a new tab when clicking the LinkedIn footer link', async ({
        loggedIn,
        page,
        inventoryPage,
    }) => {
        await test.step('Click LinkedIn footer link and capture popup', async () => {
            const [popup] = await Promise.all([page.waitForEvent('popup'), inventoryPage.linkedInLink.click()])
            await popup.waitForLoadState()
            expect(popup.url()).toContain('linkedin.com/company/sauce-labs/')
        })
    })
})
