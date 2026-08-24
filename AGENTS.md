# AGENTS.md

Guidance for AI agents (and humans) working on the **Avonvale River Action Group Bacteria Watch** dashboard.

## What this is

A static site (plain HTML/CSS/JS, no build step, no framework) that charts weekly bacterial water-quality readings for **Eckington Bridge** on the River Avon. Fladbury and Bidford are historical/archived sites (`archive.html`) and are no longer sampled.

Files:

- `index.html` — main dashboard page (Eckington)
- `app.js` — all data + chart/table/CSV logic
- `archive.html` — historical Fladbury & Bidford page
- `style.css` — styles
- Chart.js is loaded from a CDN; there is nothing to install or build.

Each reading has three measurements, all in **CFU/100ml**: `ecoli`, `enterococci`, `coliforms`.

## Sentinel values (important)

In `app.js`:

```js
const belowThreshold = 9;    // displayed as "<10"
const aboveThreshold = 1001; // displayed as ">1000"
```

The lab reports "<10" and ">1000" rather than exact counts at the extremes. Store `9` for a "<10" result and `1001` for a ">1000" result. `formatDisplayValue()` converts them for display. A genuine reading of exactly `1000` is stored as `1000` (not `1001`).

## How to add a new weekly reading

Given a date and the three values (e.g. `17/8/26  ecoli 100  enterococci 100  coliforms 1000`):

1. **`app.js` — append to the four `Eckington` arrays** (near the top). Keep all four the same length and in the same order:
   - `labels`: add the date as a `'DD/MM/YYYY'` string (e.g. `'17/08/2026'`)
   - `ecoli`: add the E-Coli value
   - `coliforms`: add the coliforms value
   - `enterococci`: add the enterococci value
   - Apply the sentinel rules above (`<10` → `9`, `>1000` → `1001`).

2. **`index.html` — update the static "Latest reading" heading** (~line 56):
   `<h2>Latest reading — {17th} {August} {2026}</h2>`. This is **hardcoded** — it does not derive from the data arrays, so it must be edited by hand each week.

3. **`index.html` — bump the `app.js` cache-bust version** (~line 144):
   `<script src="app.js?v=N"></script>` → increment `N` by 1. This forces browsers to fetch the updated `app.js`.

4. **Commit** both files: `Add Eckington results for DD/MM/YYYY`.

5. **Push** to `main` (the site deploys from `main`).

The "Latest reading" table and all charts read the **last element** of each array automatically, so only the heading and cache-bust version need manual edits beyond the data itself.

## Sanity checks before committing

- All four Eckington arrays are the same length.
- The new date is in `DD/MM/YYYY` format and appended at the **end**.
- The heading date and the cache-bust version were both updated.
