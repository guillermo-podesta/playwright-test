# Playwright Test Automation Framework

A test automation framework built with Playwright and BDD (Behavior Driven Development) using Gherkin syntax. It covers both UI and API testing scenarios.

---

## Prerequisites

- A `.env` file at the project root with the following variables:

```env
SAUCE_USERNAME=your_username
SAUCE_PASSWORD=your_password
```

---

## Installation

```bash
# Clone the repository
git clone git@github.com:guillermo-podesta/playwright-test.git

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install --with-deps
```

---

## Execution Commands

### Run all tests
```bash
npm test
```

### Run UI tests only
```bash
npx bddgen test && npx playwright test --grep @regression
```

### Run API tests only
```bash
npx bddgen test && npx playwright test --grep @api
```

### Run in headed mode (visible browser)
```bash
npx bddgen test && npx playwright test --headed
```

### Run in headless mode (default)
```bash
npx bddgen test && npx playwright test --headless
```

### Run a specific tag
```bash
npx bddgen test && npx playwright test --grep @smoke
```

---

## Framework Architecture

```
playwright-test/
├── features/               # Gherkin feature files (.feature)
├── step-definitions/       # Step implementation files (.ts)
├── pages/                  # Page Object Models for UI interactions
├── support/                # Fixtures and test setup
├── utils/                  # Shared utilities (API client, env config)
├── test-data/              # Static test data used across scenarios
├── .github/workflows/      # GitHub Actions CI configuration
├── playwright.config.ts    # Playwright global configuration
└── tsconfig.json           # TypeScript configuration
```

### BDD Layer — `features/` + `step-definitions/`
Feature files are written in Gherkin (`Given / When / Then`) and live in the `features/` folder. Each feature file has a corresponding step definition file in `step-definitions/` that implements the actual logic. This separation keeps test intentions readable for non-technical stakeholders while the implementation stays in TypeScript.

### Page Object Model — `pages/`
Each page of the application under test has its own class. These classes encapsulate selectors and interactions so that if the UI changes, only the page object needs to be updated — not every step definition that touches that page.

### API Client — `utils/bookingApi.ts`
API tests use a dedicated client class that wraps all HTTP calls (auth, create, read, update, delete). This keeps raw request logic out of the step definitions, centralizes headers and base URL, and provides typed request/response interfaces.

### Fixtures — `support/fixtures.ts`
Playwright fixtures extend the base test with page objects and shared state (e.g. `bookingState` for chaining API responses across steps). This makes dependencies explicit and scoped to each test.

### Test Data — `test-data/`
Static payloads and seed data are kept separate from step logic. This makes it easy to swap datasets or extend them without touching the steps.

### CI — `.github/workflows/playwright.yml`
Tests run on GitHub Actions via manual trigger (`workflow_dispatch`). An optional tag input lets you scope the run to a specific suite (e.g. `@regression`, `@smoke`).

---

## Manual QA Bug Report

> **Simulated Jira Ticket**

| Field | Details |
|-------|---------|
| **Title** | Inventory Page \| Filter Products is not working |
| **Severity** | High |

### Description
Once the user is logged in, he/she is redirected to the Inventory page. When trying to apply any available filter option from the dropdown, none of them perform any action.

### Steps to Reproduce
1. Navigate to the login page
2. Log in using credentials: username `problem_user`, password `secret_sauce`
3. Click the Filter dropdown menu on the Inventory page
4. Choose any available option

### Expected Result
The product list should reorder or filter according to the selected option.

### Actual Result
Despite selecting any option from the dropdown, nothing happens on the page. No filter is applied and the product list remains unchanged.
