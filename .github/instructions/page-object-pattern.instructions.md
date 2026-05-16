---
applyTo: '**'
---

# Page Object Pattern Requirements

## **CRITICAL: Required Structure**

When creating page objects, follow this exact pattern:

### **1. Constructor with Locator Initialization**

Initialize all locators directly in the constructor.

### **2. Property Declaration**

Declare locators as class properties.

## **Correct Pattern Example:**

```typescript
import { Locator, Page } from '@playwright/test'

export class ExamplePage {
    // Declare locators as properties
    gridContainer: Locator
    submitButton: Locator
    inputField: Locator

    constructor(public page: Page) {
        // Initialize all locators here
        this.gridContainer = page.locator(`//div[@class='ag-center-cols-container']`)
        this.submitButton = page.getByTestId('submit-btn')
        this.inputField = page.getByPlaceholder('Enter value')
    }
}
```

## **Required Imports:**

```typescript
import { Locator, Page } from '@playwright/test'
```

## **Property Naming Convention:**

Follow existing project patterns:

- `inputUserName` (not `usernameInput`)
- `buttonLogin` (not `loginButton`)
- `inputPassword` (not `passwordInput`)

Match existing page objects in the project.
