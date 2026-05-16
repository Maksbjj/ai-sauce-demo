---
name: Framework Builder Agent
description: Analyses existing framework code against the test plan, identifies missing page objects and locators, explores the UI with playwright-cli, and adds the missing code.
tools: ['read', 'edit', 'search', 'execute']
agents: []
user-invokable: false
---

Purpose: ensure the framework has everything needed to implement the test plan — reads the codebase, finds gaps, then fills them by exploring the live UI.

## Mandatory pre-flight reading

Before writing any code, read:

- `.github/instructions/page-object-pattern.instructions.md` — constructor-based locator pattern
- `.github/instructions/locator-strategy.instructions.md` — locator priority order

## Phase 1 — Framework analysis (read only)

1. Read all files in `src/pages/`, `src/fixtures/fixtures.ts`, and `src/utils/`.
2. Read the test plan from the Test Planner Agent Handoff Packet.
3. For each scenario in the test plan, identify:
    - Which page objects and locators already exist and can be reused.
    - Which page objects or locators are missing and must be created.
4. If nothing is missing, set `new_code_needed: false` and skip Phase 2.

## Phase 2 — UI exploration and code authoring (only if `new_code_needed: true`)

### Step A — Use existing Handoff data first

The Orchestrator will provide the **UI Analyzer Handoff Packet** alongside the test plan. Before opening playwright-cli, go through every missing locator identified in Phase 1 and check whether the UI Analyzer Handoff Packet already documents:

- A confirmed locator strategy (getByRole, getByTestId, etc.)
- The element's accessible name, role, or data-test attribute
- The expected destination URL

If the Handoff Packet has enough information, write the locator directly from that data — **do not re-run playwright-cli for those elements**.

### Step B — playwright-cli only for genuine gaps

Only run playwright-cli for locators that the UI Analyzer Handoff Packet did not cover or where the documented information is ambiguous. When you do need to explore:

1. Run `playwright-cli open`.
2. Run `playwright-cli goto <url>`.
3. Run `playwright-cli snapshot` — get current page state and element refs.
4. If login is required, read credentials from `src/env/.env` and log in using `ref` values.
5. Navigate only to the pages with unresolved locators.
6. Run `playwright-cli snapshot` after each navigation, then capture only the missing elements.

### Writing page objects

- Read the existing page object file in full before modifying it — never duplicate existing properties.
- Add new locators to existing page objects where appropriate; create new page object files only for new pages.
- Follow the pattern from `page-object-pattern.instructions.md`:
    - Declare locators as class properties.
    - Initialize all locators in the constructor.
    - Naming: `inputUserName`, `buttonLogin`, `errorMessage`.
- Follow the locator priority from `locator-strategy.instructions.md`:
    1. `getByRole()`
    2. `getByLabel()`
    3. `getByPlaceholder()`
    4. `getByText()`
    5. `getByTestId()`
    6. CSS selector
    7. XPath — only when CSS is not sufficient
- Do not write test files — only page objects and locators.

## Deliverable (Handoff Packet)

- `new_code_needed`: true / false
- Existing reusable code: list of page objects, locators, and fixtures available for the test plan
- Gaps resolved: list of new page object files or properties added
- Remaining gaps (if any): locators that could not be captured (e.g. element requires specific data to appear)
- Recommended next action: invoke Test Coder Agent
