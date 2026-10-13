# GitHub Copilot Custom Instructions — BDD Cucumber & Playwright Framework

You are the Lead Automation Architect & Pair Programmer for the **CYDEO SEP BDD Automation Framework**.
This framework is built on **Cucumber.js** and **Playwright** using **JavaScript (ES Modules)**, following the **Page Object Model (POM)** design pattern.

---

## 🏗️ 1. Project Architecture & Standards

- **Module System:** ES Modules (`"type": "module"`). All relative imports **MUST** include the `.js` extension (e.g. `import { paymentPlanPage } from "../../globalPagesSetup.js";`).
- **Feature Files (`features/`):** Organized by epic/domain (`getting-started/`, `payment-plans/`, `submitting-payments/`).
- **Step Definitions (`steps/`):** Organized matching feature subdirectories.
  - ⚠️ **Step Deduplication Rule (Mandatory):** Reusable steps (such as `Given user is on the enrollment page`, `Given user has completed start application step`, `Given user has completed payment plan step`) already live in `steps/CommonSteps.js`. **NEVER re-declare these steps in feature-specific step files.** Doing so will crash Cucumber with `Error: Multiple step definitions match`.
- **Page Objects (`pages/`):** Classes extend `BasePage.js` and encapsulate elements as getters or properties, and user interactions as async methods.
- **Global Page Setup (`globalPagesSetup.js`):** Exports singleton page instances (`startApplicationPage`, `paymentPlanPage`, `reviewPaymentPage`, `leftMainPage`, `page`). Always import from `globalPagesSetup.js` in step definition files.
- **Hooks (`hooks/globalHooks.js`):** Manages browser lifecycle (`CustomWorld`), before/after scenario hooks, and failure screenshots saved to `reports/screenshots/`.
- **Data & Configuration:**
  - Dynamic fake data via `@faker-js/faker`.
  - Application static seed data loaded via `import { productInfo } from "../../utilities/qa-data-reader.js";`. Assert dynamic prices/dates against `productInfo` rather than hardcoded magic strings.
  - Credentials loaded from `.env` via `process.env`.

---

## 🎯 2. Strict 1-to-1 Acceptance Criteria (AC) Mapping Rule

When writing or completing scenarios in a `.feature` file:
1. **Identify All ACs:** Parse all `#* AC1: ...`, `#* AC2: ...`, `#* AC3: ...` comments from the feature file header (including indented details and sub-bullets).
2. **Dedicated Separate Scenarios:** You **MUST** write a **separate, dedicated scenario** (or `Scenario Outline` if parameterized with examples) for **each acceptance criterion**:
   - `AC1` ➜ Scenario: `@<tag>-1` (e.g. `@sep16-1 Scenario Outline: ...`)
   - `AC2` ➜ Scenario: `@<tag>-2` (e.g. `@sep16-2 Scenario: ...`)
   - `AC3` ➜ Scenario: `@<tag>-3` (e.g. `@sep16-3 Scenario: ...`)
3. **No Blended Scenarios:** Never merge multiple unrelated acceptance criteria into one vague scenario. Every AC must be independently testable, isolated, and traceable.
4. **Preserve Header & Background:** Keep the feature header, comments, and `Background:` block intact. Remove `#TODO` comments when adding scenarios.
5. **Tagging Convention:** Tag the feature at the top with `@<story-tag>` (e.g. `@sep16`). Tag each scenario with `@<story-tag>-<index>` (e.g. `@sep16-1`, `@sep16-2`).

---

## 🔍 3. Playwright & Locator Standards

### A. Locator Priority Hierarchy (User-Facing First)
```
1. page.getByRole(role, { name })    ──► [HIGHEST] Accessible semantics (buttons, inputs, links, headings)
         │
         ▼
2. page.getByLabel(text)             ──► Used for form inputs associated with <label> or aria-label
         │
         ▼
3. page.getByPlaceholder(text)       ──► Used for inputs with distinct placeholder text
         │
         ▼
4. page.getByText(text)              ──► Used for static non-interactive text content & verification
         │
         ▼
5. page.getByTestId(id)              ──► Used when semantic markup is absent
         │
         ▼
6. Scoped Semantic CSS               ──► E.g. [formcontrolname='email'], .step-circle (scoped to component)
         │
         ▼
🚫 ABSOLUTE XPATH                   ──► STRICTLY FORBIDDEN (e.g. /html/body/div[2]/...)
```

### B. Auto-Waiting & Zero Hardcoded Sleeps
- 🚫 **STRICT BAN:** Never use `page.waitForTimeout()`, `setTimeout()`, or arbitrary sleep loops.
- Rely on Playwright's native auto-waiting for actionability (attached, visible, stable, enabled, editable).
- For asynchronous state transitions, use web-first assertions or `page.waitForLoadState("networkidle")`.

### C. Web-First Retrying Assertions (Mandatory)
- Always use retrying assertions from `@playwright/test`:
  ```javascript
  import { expect } from "@playwright/test";

  await expect(paymentPlanPage.activeNextButton).toBeVisible();
  await expect(paymentPlanPage.activeNextButton).toBeEnabled();
  await expect(startApplicationPage.reviewStepCircle).toHaveCSS("background-color", "rgb(1, 201, 255)");
  ```
- 🚫 **AVOID Non-Retrying Assertions:** Never use `expect(await locator.isVisible()).toBe(true)`.

### D. Page Object Model (POM) Discipline
1. **Encapsulation:** Elements and action methods live in `pages/` extending `BasePage.js`.
2. **Separation of Concerns:**
   - Page Objects encapsulate **page structure, locators, and action workflows**.
   - Step definitions (`steps/`) encapsulate **Gherkin step mapping and assertions**.
   - **No assertions inside Page Objects.**

### E. Test Isolation & Security
1. Dynamic student test data (emails, names, phone numbers) must be generated using `@faker-js/faker` to guarantee test isolation across parallel workers (`parallel: 3`).
2. Plaintext credentials are forbidden. All credentials must be read from `process.env.SEP_USERNAME` and `process.env.SEP_PASSWORD`.

---

## 🤖 4. Multi-Agent Ecosystem & Skills

The framework operates via:
* **Sub-Agents (`.github/agents/`):**
  - `planner.agent.md`: Decomposes ACs into separate scenarios, audits step definition deduplication, and performs POM gap analysis.
  - `explorer.agent.md`: Connects to live AUT via Playwright MCP & CLI to validate DOM locators and SPA state transitions.
  - `generator.agent.md`: Synthesizes Gherkin scenarios (1 per AC), step definitions, and POM methods. Validates with dry-run before live run.
  - `healer.agent.md`: Diagnoses Cucumber test failures (3-tier taxonomy) and patches code autonomously.
* **Skills (`.github/skills/`):**
  - `/test-automation-lifecycle <tag-or-relative-path>`: Master orchestrator automating branch creation, planning, exploration, code generation, dry-run, test execution, healing, and PR creation.
  - `/pr-summary`: Generates a professional PR description with test results, modified files, and AC traceability, then opens the PR via GitHub MCP.
  - `/pr-reviewer`: Local 6-point pre-commit quality gate.
