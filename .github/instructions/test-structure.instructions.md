---
applyTo: '**'
---

# Test Structure and Fixtures

## **🚨 CRITICAL: NEVER Use Manual Page Management 🚨**

**ABSOLUTELY FORBIDDEN patterns - NEVER use these:**

```typescript
// ❌ NEVER DO THIS
test.beforeEach(async ({ browser }) => {
    const context = await browser.newContext() // FORBIDDEN
    page = await context.newPage() // FORBIDDEN
})

test.afterEach(async () => {
    await page?.close() // FORBIDDEN
})
```

## **CRITICAL: Use Project Fixtures**

**NEVER create manual page connections or closures - use existing fixtures!**

### **✅ CORRECT - Use Fixtures:**

```typescript
import { expect, test } from '@playwright/test'

test('Should perform operation', async ({ page }) => {
    // Use page fixture - no manual creation needed
    await page.goto('https://your-app.com')
    await expect(page.getByText('Welcome')).toBeVisible()
})
```

## **Test Structure Guidelines:**

### **1. Test titles always start with 'Should' (capital S)**

```typescript
// ✅ CORRECT
test('Should complete checkout flow', async ({ page }) => { ... })
test('Should display error on invalid input', async ({ page }) => { ... })

// ❌ WRONG
test('should complete checkout flow', async ({ page }) => { ... })
test('complete checkout flow', async ({ page }) => { ... })
```

### **2. Use test.step() for grouping**

```typescript
test('Should complete checkout flow', async ({ page }) => {
    await test.step('Navigate to product page', async () => {
        await page.goto('/products')
    })

    await test.step('Add item to cart', async () => {
        await page.getByRole('button', { name: 'Add to cart' }).click()
    })

    await test.step('Verify cart updated', async () => {
        await expect(page.getByTestId('cart-count')).toHaveText('1')
    })
})
```

### **3. Test step descriptions always start with a capital letter**

```typescript
// ✅ CORRECT
await test.step('Open product listing page', async () => { ... })
await test.step('Verify item count', async () => { ... })

// ❌ WRONG
await test.step('open product listing page', async () => { ... })
await test.step('verify item count', async () => { ... })
```

### **4. Use softExpect for element state verifications**

Import `softExpect` from `@assertions`. Use it for assertions that check element state (visible, text, count, value). Use hard `expect` only for critical checkpoints like URL or navigation.

- **`await softExpect(locator)`** — always await locator-based assertions (they retry against the DOM)
- **`softExpect(value)`** — no `await` for plain JS value assertions (arrays, strings, numbers)

```typescript
import { softExpect } from '@assertions'
import { expect, test } from '@fixtures'

test('Should display products on inventory page', async ({ inventoryPage, page }) => {
    await test.step('Verify product list is displayed', async () => {
        await softExpect(inventoryPage.productItems).toHaveCount(6) // locator — needs await
        await softExpect(inventoryPage.pageTitle).toBeVisible() // locator — needs await

        const names = await inventoryPage.getProductNames()
        softExpect(names).toEqual(['A', 'B', 'C']) // plain value — no await
    })

    await test.step('Verify navigation to cart', async () => {
        await inventoryPage.cartLink.click()
        await expect(page).toHaveURL('/cart.html') // hard expect for navigation
    })
})
```

### **5. Keep tests independent**- Every test must be independently runnable

- Never rely on state from a previous test
- Use `beforeEach` for shared setup if needed

## **Test Execution:**

```bash
# Run all tests
npx playwright test

# Run specific file
npx playwright test tests/example.spec.ts

# UI mode
npx playwright test --ui

# Debug mode
npx playwright test --debug
```
