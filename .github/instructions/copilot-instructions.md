---
applyTo: '**'
---

# Copilot Instructions

This is a **Playwright-based test automation framework**. The project tests web application workflows using Playwright.

## **📁 INSTRUCTIONS BREAKDOWN**

**Instructions are now separated into focused files to reduce errors:**

### **🔧 [playwright-cli Workflow](./playwright-cli.instructions.md)**

- playwright-cli commands and patterns
- Browser application interaction
- Element reference patterns

### **🏗️ [Page Object Pattern](./page-object-pattern.instructions.md)**

- Constructor-based locator initialization
- Property naming conventions
- Correct vs incorrect patterns

### **🎯 [Locator Strategy](./locator-strategy.instructions.md)**

- Priority order for element selection
- Test ID vs semantic selectors
- Grid/table patterns
- Stable vs brittle selectors

### **🧪 [Test Structure](./test-structure.instructions.md)**

- Fixture usage patterns
- Path aliases and imports
- Environment configuration
- Test execution modes

---

## **QUICK REFERENCE**

### **Most Common Patterns:**

```bash
# 1. playwright-cli Workflow
playwright-cli snapshot
playwright-cli tab-list

// 2. Page Object Pattern
constructor(public page: Page) {
    // Initialize locators here
    this.myLocator = page.getByRole('button', { name: 'Submit' })
}

// 3. Test Structure
import { test } from '@playwright/test'
import { expect } from '@playwright/test'
test('test name', async ({ page }) => {
    // Use fixtures - no manual page management
    await expect(element).toBeVisible()
})
```

### **Key Rules:**

- ✅ Always use playwright-cli commands for browser interaction
- ✅ Always use fixtures for test setup
- ✅ Always initialize locators in the constructor
- ✅ Always import test and expect from @playwright/test
