# Process for resolving Linear tickets

Follow these steps for each Linear ticket so we stay aligned and don’t move ahead without confirmation.

---

## Step 1: Identify the ticket and goal

- Get the Linear ticket URL or ID (e.g. `GRO-559`, or `https://linear.app/groupr/issue/GRO-559/...`).
- State the **goal in one sentence**: what “done” looks like for this ticket.

**Do not** run git commands or write code yet.

---

## Step 2: Analyze the system

- **Backend:** How does the relevant data/API behave today? (models, endpoints, response shape.)
- **Frontend:** Where is this used? (components, hooks, routes, state.)
- **Gap:** What’s wrong or missing relative to the ticket?

Optionally write a short **analysis report** in `docs/` (e.g. `docs/GRO-XXX-ticket-name-report.md`) so we have a single source of truth.

---

## Step 3: Align on scope

- List exactly what we **will** change (e.g. “icons by keyword”, “slug in URL”).
- List what we **won’t** change (e.g. “no new API calls”, “no backend change”).
- Confirm with the user: “If this matches what you want, we’ll plan the changes next.”

**Do not** implement until scope is agreed.

---

## Step 4: Plan exact changes (no code yet)

- List every file to touch and what will change in each (e.g. “Add `getCategoryIconPath`; remove `REFERENCE_CATEGORY_ORDER`”).
- Split into **phases** if the change is large (e.g. Phase 1: config + strip; Phase 2: route + links).
- Optionally write an **implementation plan** in `docs/` (e.g. `docs/GRO-XXX-implementation-plan.md`).

**Do not** write code until the plan is in place.

---

## Step 5: Confirm before coding

- Summarize in plain language: what we’re going to do and in what order.
- Ask the user to confirm (e.g. “If this is right, say ‘Go’ or ‘Aligned’ and we’ll implement.”).
- **Only then** start implementing.

---

## Step 6: Implement

- Implement in the order from the plan (Phase 1, then Phase 2, etc.).
- Prefer small, clear edits; run linters/tests as needed.
- If the ticket is part of a **batch branch** (e.g. `021026-bugfixes`), make one commit per ticket with the Linear ID in the message (e.g. `GRO-559 Map backend categories to frontend SVGs`).

---

## Step 7: Cleanup and verify

- Remove or update any dead code / obsolete config referenced in the plan.
- Verify behavior (e.g. correct icons, correct URLs, no new lint errors).
- Do **not** introduce unrelated changes.

---

## Step 8: Document the resolution

- Add a short **resolution process** doc (e.g. `docs/GRO-XXX-resolution-process.md`) that records:
  - Steps 1–8 for this ticket
  - Which artifacts were created (report, plan, process doc)
  - Optional: commit/PR instructions for the current branch

This gives a repeatable template for the next ticket.

---

## Checklist (quick reference)

| Step | Action | Don’t do yet |
|------|--------|----------------|
| 1 | Identify ticket + goal in one sentence | No code, no git |
| 2 | Analyze backend/frontend; write report if useful | No implementation |
| 3 | Align on scope with user | No coding |
| 4 | Plan file-by-file; write plan doc if useful | No coding |
| 5 | Summarize and get explicit “Go” / “Aligned” | No coding before this |
| 6 | Implement in phases | — |
| 7 | Cleanup and verify | — |
| 8 | Document resolution process for this ticket | — |

---

## Branch and commit convention (when using a batch branch)

- **Branch:** e.g. `021026-bugfixes` (one branch per repo for the batch).
- **Commits:** One commit per Linear ticket; message starts with ticket ID (e.g. `GRO-559 Map backend categories to frontend SVGs`).
- **PR:** From batch branch into `staging`; reference each ticket in the PR description.

When starting the next ticket, begin at **Step 1** with the new ticket URL or ID.
