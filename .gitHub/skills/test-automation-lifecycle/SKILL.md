---
name: test-automation-lifecycle
description: "Master Orchestration Skill that coordinates the 4 BDD sub-agents (Planner, Explorer, Generator, Healer) and the /pr-summary skill to automate Gherkin user stories into verified Pull Requests on a new branch."
command: "/test-automation-lifecycle <tag-or-relative-path>"
parameters:
  target:
    type: string
    description: "The feature tag (e.g. @sep17, sep17, @sep16, @sep19, @sep08) OR the relative path to the feature file (e.g. features/payment-plans/ViewPaymentPlanOptionStep2.feature)."
    required: true
---

# Test Automation Lifecycle Skill (Master BDD Orchestrator)

The `/test-automation-lifecycle` skill is the **central master orchestrator** of our BDD test automation framework.
When triggered with a feature tag (e.g. `/test-automation-lifecycle @sep17`) or a relative path (e.g. `/test-automation-lifecycle features/payment-plans/ViewPaymentPlanOptionStep2.feature`), it coordinates the **4 specialized BDD sub-agents** and the **`/pr-summary` skill** through an end-to-end BDD workflow on a **new git branch**, transforming acceptance criteria into a verified, peer-reviewed Pull Request.

> 💡 **Visual Architecture:** See [WORKFLOW.html](WORKFLOW.html) for the interactive visual workflow dashboard, flowcharts, sub-agent dossiers, and failure classification simulator.

---

## 🔄 The 9-Stage Orchestration Workflow

```
[1. Target Resolution] ──────► Resolves @tag, tag-without-@, or path to target .feature file
            │
            ▼
[2. Git Branch Isolation] ───► Verifies git status & creates feature/<target>-automation via Git MCP
            │
            ▼
[3. Planner Agent] ──────────► Parses ACs ──► 1-to-1 AC-to-Scenario mapping & POM gap audit
            │
            ▼
[4. Explorer Agent] ─────────► Connects to Playwright MCP & CLI ──► Audits live Angular DOM
            │
            ▼
[5. Generator Agent] ────────► Completes .feature (1 scenario per AC) ──► Synthesizes steps/*.js & pages/*.js
            │
            ▼
[6. Cucumber Verification] ──► Runs dry-run pre-check ──► npx cucumber-js --tags @<tag>
            │
       ┌────┴────┐
    [Pass]    [Fail]
       │         │
       │         ▼
       │  [7. Healer Agent] ──► Inspects failure screenshots & reports ──► Autonomously patches code
       │         │
       ▼         ▼
[8. Ephemeral Cleanup] ──────► Automatically purges scratch folder .temp/
            │
            ▼
[9. PR Summary & Creation] ──► Invokes /pr-summary skill to draft rich PR description
                               Opens Pull Request via GitHub MCP for peer review
```

---

## 📋 Detailed Stage Breakdown

### Stage 1: Target Resolution & Input Normalization
- Normalizes input format:
  - **Tag with `@` (e.g. `@sep17`):** Scans `features/**/*.feature` for matching tag.
  - **Tag without `@` (e.g. `sep17`):** Automatically prefixes `@` and scans `features/**/*.feature`.
  - **Relative Path (e.g. `features/payment-plans/ViewPaymentPlanOptionStep2.feature`):** Opens and reads the specified `.feature` file directly.
- Extracts feature title, user story narrative, and all `#* AC1`, `#* AC2` acceptance criteria comments in the header.

### Stage 2: Git Branch Isolation (GitHub MCP / Git CLI)
- Verifies repository readiness (runs `git init` if repository is uninitialized).
- Generates a clean branch name: `feature/<tag-or-slug>-automation` (e.g. `feature/sep17-automation`).
- **Switches to `main` first** and creates/checks out the new branch directly **on top of `main`** (`git checkout -B feature/<target>-automation main`), guaranteeing that each automation task starts from a clean, unpolluted baseline and never inherits changes from other feature branches.

### Stage 3: Planner Agent (1-to-1 AC Mapping & POM Gap Analysis)
- Enforces the **1-to-1 AC Rule**: Designs a separate, dedicated scenario (or `Scenario Outline`) for **each** acceptance criterion found in the feature file:
  - `AC1` ➜ `@<tag>-1` Scenario
  - `AC2` ➜ `@<tag>-2` Scenario
- **Step Deduplication Check:** Verifies steps in `steps/CommonSteps.js` (`Given user is on the enrollment page`, `Given user has completed start application step`, etc.) to reuse them without duplicate declarations.
- **Dynamic Data Strategy:** Maps expected values (such as prices, dates, installments) to `productInfo` in `utilities/qa-data-reader.js` rather than hardcoded magic strings.
- **POM Gap Analysis:** Audits `pages/` (`PaymentPlanPage.js`, `StartApplicationPage.js`, `ReviewPaymentPage.js`, etc.) to identify existing vs needed locators and methods.

### Stage 4: Explorer Agent (Live MCP & CLI Exploration)
- Interacts with live application at `https://qa.sep.tdtm.cydeo.com/taws` via the **Playwright MCP Server**.
- Validates user-facing semantic locators (`getByRole`, `getByLabel`, etc.) and Single Page Application (SPA) state changes.
- Validates reactive Angular transitions (accordion expansion, dynamic pricing rendering, stepper highlights).

### Stage 5: Generator Agent (Code Synthesis)
- **Feature File Completion:**
  - Preserves all `#* AC` comments and the `Background:` block.
  - Replaces `#TODO` with the dedicated scenarios (one per AC).
  - Employs 4-space indentation for `Scenario:` and 8-space for steps.
- **Step Definitions Synthesis (`steps/<epic>/<feature>.js`):**
  - Imports page singletons from `../../globalPagesSetup.js` with `.js` extensions.
  - Imports `productInfo` from `../../utilities/qa-data-reader.js` for data assertions.
  - **DO NOT** re-declare steps that exist in `steps/CommonSteps.js`.
  - Enforces web-first retrying assertions (`await expect(locator).toBeVisible()`).
  - **Zero hardcoded sleeps** (`page.waitForTimeout` and `setTimeout` banned).
- **Page Object Updates:** Adds missing locators and action methods to `pages/<PageName>.js`.

### Stage 6: Cucumber Execution & Dry-Run Pre-Check
1. **Dry-Run Validation:** Runs `npx cucumber-js --tags @<tag> --dry-run` to immediately catch any undefined or duplicate steps before launching browser.
2. **Full Execution:** Executes `npx cucumber-js --tags @<tag>` (or `<feature-path>`).
3. Evaluates scenario pass/fail counts, duration, and generated reports (`reports/cucumber-report.html`).

### Stage 7: Autonomous Healing (Conditional)
- If any scenario fails:
  - Invokes the **Healer Agent** with failure logs and screenshots in `reports/screenshots/`.
  - Classifies root cause (`automation-code`, `environment data`, or `product defect`).
  - If `automation-code`, applies autonomous patch to step definition or Page Object and re-executes.

### Stage 8: Ephemeral Scratch Purge
- Upon 100% scenario verification, automatically purges `.temp/` completely.

### Stage 9: PR Summary & Pull Request Creation (`/pr-summary`)
- Automatically invokes the **`/pr-summary`** skill:
  - Inspects git diff and test execution statistics.
  - Verifies that every acceptance criterion has a passing scenario.
  - Drafts a professional, comprehensive PR description (overview, AC checklist, branch changes, execution stats).
  - Uses **GitHub MCP** to commit changes, push the branch, and open a Pull Request ready for human peer review.

---

## 🚀 How to Execute the Skill

### By Tag:
```text
copilot> /test-automation-lifecycle @sep17
copilot> /test-automation-lifecycle sep17
copilot> /test-automation-lifecycle @sep16
copilot> /test-automation-lifecycle @sep19
```

### By Relative Feature File Path:
```text
copilot> /test-automation-lifecycle features/payment-plans/ViewPaymentPlanOptionStep2.feature
copilot> /test-automation-lifecycle features/payment-plans/ClickNextButtonStep2.feature
copilot> /test-automation-lifecycle features/getting-started/ClickNextButtonStep1.feature
```
