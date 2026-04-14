# Repo-level configuration

Shared config that multiple apps (frontend, backend, scraper, catalog tooling)
reference. Files here are the single source of truth — do not duplicate them
inside individual app folders.

## `protected-brands.json`

A list of brand names and proper nouns that catalog translation tooling must
**not** translate into Spanish. Without this list, a naive translator will
happily produce "Aguapoloni" for "Poland Spring Water", "Mejor Sí" for
"Best Yet", etc.

### What's in it

- `brands` — an alphabetically-sorted array of strings. Each string is a brand
  name spelled exactly as it appears on packaging. Casing, punctuation, and
  accents all matter (e.g. `McCormick` not `Mccormick`, `Lea & Perrins` with
  the ampersand, `Sazón Goya` with the accent, `SPAM` all caps).
- `_updated` — the ISO date (YYYY-MM-DD) the list was last edited.
- `_comment` — a human-readable reminder of the file's purpose.

### How to add a brand

1. Open `config/protected-brands.json`.
2. Append the brand name into the `brands` array, matching the capitalization
   and punctuation on the actual packaging.
3. If the brand has multiple common spellings in our catalog (e.g.
   `Coca-Cola` vs `Coca Cola Zero Sugar`), include each distinct form.
4. Re-sort `brands` alphabetically, case-insensitive. Any simple sort will do
   (`jq 'sort_by(ascii_downcase)'`, Python `sorted(..., key=str.lower)`, etc.).
5. Bump `_updated` to today's date.
6. Confirm the file still parses: `jq . config/protected-brands.json`.

### Who consumes this file

- **Catalog translation skill** (personal tooling under `~/.claude/skills/`) —
  reads this list and prevents translation of any matching tokens when
  generating Spanish product names.
- **Backend Spanish-name importer** —
  `devenv-main/backend/lib/tasks/products_update_spanish_from_csv.rake`
  should validate incoming CSVs against this list to catch rows where a
  protected brand was accidentally translated.

If you add a new consumer, list it here so the next person knows where this
file flows.
