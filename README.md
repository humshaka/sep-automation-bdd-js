# SEP Automation Framework

This project tests the Self Enrollment Portal checkout using Cucumber.js feature
files and Playwright page objects.

## Prerequisites

- Node.js 18 or newer and npm
- Access to the SEP QA site and its HTTP Basic Authentication credentials
- Playwright Chromium
- Stripe test card details for the successful payment scenario

Install project dependencies and the browser:

```sh
npm install
npx playwright install chromium
```

## Environment setup

Copy `.env.example` to `.env` and fill in the values for your environment. The
Cucumber configuration loads `.env` automatically. Do not commit credentials or
real payment details; `.env` is ignored by Git.

| Variable | Purpose |
| --- | --- |
| `SEP_QA_URL` | QA enrollment URL |
| `SEP_USERNAME` | HTTP Basic Authentication username |
| `SEP_PASSWORD` | HTTP Basic Authentication password |
| `CARD_NUMBER` | Stripe test card number used by the successful payment scenario |
| `CARD_EXPIRATION_DATE` | Test card expiration date |
| `CARD_SECURITY_CODE` | Test card security code |
| `ZIP_CODE` | Test card postal code |

Use test card data from [Stripe's testing documentation](https://docs.stripe.com/testing).
The successful payment scenario requires all four card-related variables; other
scenarios only require the QA URL and login credentials.

## Running the tests

```sh
npm test
npm run test:dry-run
npx cucumber-js --tags "@sep07"
```

`test:dry-run` parses all features and verifies step bindings without starting a
browser. The existing `test:tag` command runs `@sep11`; pass another tag directly
to `npx cucumber-js --tags`. Cucumber writes HTML and JSON reports under `reports/`,
and failed scenarios save screenshots under `reports/screenshots/`.

## Framework structure

- `features/`: Gherkin scenarios organized by checkout stage.
- `steps/`: Cucumber definitions; shared checkout setup and common assertions live
  in `steps/CommonSteps.js`.
- `pages/`: Playwright page objects and locators. All page classes extend
  `BasePage`.
- `utilities/`: Shared browser actions and QA product data.
- `hooks/`: Per-scenario browser lifecycle and failure screenshots.
- `globalPagesSetup.js`: Initializes page objects with the current Playwright page.
- `cucumber.cjs`: Cucumber feature, step, hook, and report configuration.

The browser is launched in headed Chromium by default; change the browser options
in `hooks/globalHooks.js` when running in a headless environment.
