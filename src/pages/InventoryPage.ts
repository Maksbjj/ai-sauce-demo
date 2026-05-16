import { Locator, Page } from '@playwright/test'

export class InventoryPage {
    readonly url = '/inventory.html'

    burgerMenuButton: Locator
    cartLink: Locator
    cartBadge: Locator
    logoutLink: Locator
    allItemsLink: Locator
    aboutLink: Locator
    pageTitle: Locator
    sortDropdown: Locator
    productItems: Locator
    productNames: Locator
    productPrices: Locator
    productTitleLinks: Locator
    productImageLinks: Locator
    addToCartButtons: Locator
    twitterLink: Locator
    facebookLink: Locator
    linkedInLink: Locator

    constructor(public page: Page) {
        this.burgerMenuButton = page.getByRole('button', { name: 'Open Menu' })
        this.cartLink = page.locator('[data-test="shopping-cart-link"]')
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]')
        this.logoutLink = page.getByRole('link', { name: 'Logout' })
        this.allItemsLink = page.getByRole('link', { name: 'All Items' })
        this.aboutLink = page.getByRole('link', { name: 'About' })
        this.pageTitle = page.getByText('Products')
        this.sortDropdown = page.getByRole('combobox')
        this.productItems = page.locator('[data-test="inventory-item"]')
        this.productNames = page.locator('[data-test="inventory-item-name"]')
        this.productPrices = page.locator('[data-test="inventory-item-price"]')
        this.productTitleLinks = page.locator('[data-test$="-title-link"]')
        this.productImageLinks = page.locator('[data-test$="-img-link"]')
        this.addToCartButtons = page.getByRole('button', { name: 'Add to cart' })
        this.twitterLink = page.getByRole('link', { name: 'Twitter' })
        this.facebookLink = page.getByRole('link', { name: 'Facebook' })
        this.linkedInLink = page.getByRole('link', { name: 'LinkedIn' })
    }

    async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
        await this.sortDropdown.selectOption(option)
    }

    async getProductNames(): Promise<string[]> {
        return this.productNames.allTextContents()
    }

    async getProductPrices(): Promise<number[]> {
        const prices = await this.productPrices.allTextContents()
        return prices.map((p) => parseFloat(p.replace('$', '')))
    }

    sortPrices(prices: number[], direction: 'asc' | 'desc'): number[] {
        return [...prices].sort((a, b) => (direction === 'asc' ? a - b : b - a))
    }

    sortNames(names: string[], direction: 'asc' | 'desc'): string[] {
        return [...names].sort((a, b) => (direction === 'asc' ? a.localeCompare(b) : b.localeCompare(a)))
    }

    async addToCartByIndex(index: number): Promise<void> {
        await this.addToCartButtons.nth(index).click()
    }

    async logout(): Promise<void> {
        await this.burgerMenuButton.click()
        await this.logoutLink.click()
    }
}
