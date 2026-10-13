---
name: pr-reviewer
description: "Local BDD Code Quality Reviewer Skill that evaluates local git diffs, feature files, and step definitions against the 6-point enterprise Cucumber + Playwright quality checklist before pushing or opening a PR."
command: "/pr-reviewer [target-file-or-branch]"
parameters:
  target:
    type: string
    description: "Optional branch name, file path, or diff to audit. Defaults to working tree changes against main."
    required: false
---

# Local BDD PR Quality Reviewer Skill (`/pr-reviewer`)

The `/pr-reviewer` skill is a **local, interactive code quality gate** for developers and SDETs working on the Cucumber.js + Playwright framework.
Before opening a Pull Request or submitting test code for peer review, run this skill locally to audit your changes against the framework's **6-point enterprise standards**.

---

## 🎯 Purpose & Local Usage

Running this skill locally prevents broken, brittle, or insecure test code from ever leaving your machine:
- Catches accidental hardcoded sleeps (`page.waitForTimeout` or `setTimeout`) before committing.
- Flags brittle absolute XPaths (`/html/body/...`) and ensures semantic, user-facing locators.
- Confirms that every acceptance criterion has a dedicated, separate scenario (**1-to-1 AC Rule**).
- Verifies that all step definitions include web-first retrying assertions.
- Enforces strict Page Object Model (POM) encapsulation (no inline locators in step defs; no assertions in page objects).
- Scans for leaked credentials, passwords, or tokens outside `.env`.

---

## 📋 The 6-Point Quality Checklist

| # | Quality Gate Criterion | Requirement & Enforcement |
| :-: | :--- | :--- |
| **1** | **1-to-1 AC Coverage** | Every `#* AC` from the feature file has a dedicated scenario (`@<tag>-1`, `@<tag>-2`). No merged/skipped criteria. |
| **2** | **Locator Resilience** | Uses user-facing locators (`getByRole`, `getByLabel`, `getByPlaceholder`, `getByText`) or semantic component attributes (`[formcontrolname='...']`). **Bans brittle absolute XPaths.** |
| **3** | **Timing & Auto-Wait** | Relies on Playwright's native auto-waiting and retrying assertions. **Strictly bans `page.waitForTimeout()` and `setTimeout()`.** |
| **4** | **Web-First Assertions** | Every `Then` step contains retrying web-first assertions (`await expect(locator)...`). **Bans non-retrying synchronous assertions.** |
| **5** | **POM Discipline** | Locators and action workflows are encapsulated in `pages/*.js` extending `BasePage.js`. Step defs import page singletons from `globalPagesSetup.js`. |
| **6** | **Security & Secret Hygiene** | Credentials are loaded exclusively via `process.env` from `.env`. **Bans hardcoded credentials in code or docs.** |

---

## 📝 Diagnostic Output Format

```markdown
════════════════════════════════════════════════════════════════════════════════
                LOCAL BDD PR QUALITY REVIEWER AUDIT REPORT
════════════════════════════════════════════════════════════════════════════════

  ✔ [PASS] 1. 1-to-1 AC Coverage: Dedicated scenarios verified for all ACs.
  ✔ [PASS] 2. Locator Strategy: Clean semantic & role-based locators verified.
  ✔ [PASS] 3. Timing & Auto-Wait: ZERO hardcoded sleeps (waitForTimeout) detected.
  ✔ [PASS] 4. Web-First Assertions: Retrying assertions verified across all step defs.
  ✔ [PASS] 5. Page Object Model: Proper encapsulation in pages/*.js verified.
  ✔ [PASS] 6. Security Hygiene: Zero credentials hardcoded in code.

────────────────────────────────────────────────────────────────────────────────
 VERDICT: PASS ✅ 
 All automated criteria satisfied.
 Ready for /pr-summary execution and Pull Request creation via GitHub MCP.
════════════════════════════════════════════════════════════════════════════════
```
