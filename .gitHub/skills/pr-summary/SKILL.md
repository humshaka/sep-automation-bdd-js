---
name: pr-summary
description: "Pull Request Summary & Creation Skill that analyzes git branch diffs, acceptance criteria coverage, and Cucumber execution metrics to generate an executive-level PR description and open a Pull Request via GitHub MCP."
command: "/pr-summary [base-branch]"
parameters:
  base_branch:
    type: string
    description: "The base branch to target for the Pull Request. Defaults to main."
    required: false
---

# PR Summary & Creation Skill (`/pr-summary`)

The `/pr-summary` skill is an automated **Pull Request Authoring and Creation Gate**.
It inspects your current git branch changes, parses the feature file's acceptance criteria, analyzes the latest Cucumber test execution results, synthesizes an executive-grade Pull Request description, and opens the PR via the **GitHub MCP Server**.

---

## 🎯 What the Skill Evaluates

When invoked, the skill audits 4 dimensions of the working branch:
1. **Requirements & Scope:** Reads the target `.feature` file, user story statement, and all `#* AC` criteria.
2. **File Modifications (Git Diff):** Categorizes changes across `features/`, `steps/`, `pages/`, `hooks/`, and `utilities/`.
3. **Execution Metrics:** Reads `reports/cucumber-report.json` and `reports/cucumber-report.html` to extract exact scenario/step counts, duration, and pass rates.
4. **Quality Gate:** Confirms zero hardcoded sleeps, web-first retrying assertions, clean POM encapsulation, and absence of hardcoded credentials.

---

## 📋 Standard PR Output Schema

The skill constructs a Pull Request formatted according to this enterprise template:

```markdown
# feat(bdd): implement and verify [<STORY_TAG>] <Feature Title>

## 📌 1. Feature Overview
- **Feature Name:** <Feature Title>
- **Target Tag / Path:** `@<tag>` / `<relative-path>`
- **User Story:** <As a customer, I should be able to...>
- **Target Epic:** `<epic-folder>`

---

## 🎯 2. Acceptance Criteria Coverage (1-to-1 Traceability)
Each acceptance criterion from the feature file is verified by a dedicated scenario:
- [x] **AC1:** <Criterion 1 description> (Scenario: `@<tag>-1`)
- [x] **AC2:** <Criterion 2 description> (Scenario: `@<tag>-2`)
- [x] **AC3:** <Criterion 3 description> (Scenario: `@<tag>-3`)
<!-- all ACs listed and checked -->

---

## 🛠️ 3. Branch Changes
| Component | File Path | Action | Description |
| :--- | :--- | :---: | :--- |
| **Feature File** | `features/<epic>/<feature>.feature` | Updated | Completed scenarios with dedicated tags per AC |
| **Step Defs** | `steps/<epic>/<feature>.js` | Added/Updated | Implemented Cucumber step handlers with Playwright assertions |
| **Page Objects** | `pages/<PageName>.js` | Updated | Encapsulated resilient locators and action workflows |
| **Global Setup** | `globalPagesSetup.js` | Verified | Verified page instance initialization |

---

## 🧪 4. Cucumber Test Execution Results
- **Execution Command:** `npx cucumber-js --tags @<tag>`
- **Verdict:** **`PASS ✅`** (100% Scenarios Passed)
- **Scenarios:** `<passed>` passed / `<total>` total
- **Steps:** `<passed>` passed / `<total>` total
- **Duration:** `<duration>`s
- **HTML Report:** `reports/cucumber-report.html` (Generated)
- **Failure Screenshots:** 0 (Clean run)

---

## 🛡️ 5. Pre-Commit Quality Gate Checklist
- [x] **1. Locator Strategy:** Semantic user-facing locators utilized (`getByRole`, `getByLabel`); zero brittle absolute XPaths.
- [x] **2. Timing & Auto-Wait:** ZERO hardcoded sleeps (`page.waitForTimeout` / `setTimeout`) detected.
- [x] **3. Web-First Assertions:** Retrying `expect(...)` assertions present in every `Then` step.
- [x] **4. POM Discipline:** Locators and action workflows encapsulated in `pages/` extending `BasePage.js`. No assertions in Page Objects.
- [x] **5. Security Hygiene:** Basic auth credentials read exclusively via `process.env`.
- [x] **6. Test Isolation:** Dynamic `@faker-js/faker` data utilized for student inputs to ensure parallel safety (`parallel: 3`).

---

> 🚀 **Ready for peer review by designated colleague before merging to `main`.**
```

---

## 🤖 GitHub MCP Execution Protocol

Upon generating the summary:
1. Calls GitHub MCP `create_pull_request` (or Git CLI):
   - **Title:** `feat(bdd): implement and verify [<STORY_TAG>] <Feature Title>`
   - **Head Branch:** Current feature branch (`feature/<target>-automation`)
   - **Base Branch:** `main`
   - **Body:** The generated markdown report above.
2. Returns the URL of the newly created Pull Request in the console.
