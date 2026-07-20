# Mascon Lead Finder — New England NAICS Edition

A static GitHub Pages application for occasional internal B2B lead research. It searches public government data directly from the browser and exports a CSV.

## What changed in this edition

- New England only: MA, CT, RI, NH, VT, and ME
- NAICS is the master industry standard
- Searchable multi-select industry dropdown
- NAICS codes appear only after an industry is selected
- Custom 2–6 digit NAICS codes and short two-digit ranges
- No New York, New Jersey, or Pennsylvania name-based searches
- No backend, database, API keys, Python, or Netlify Functions
- Detailed source diagnostics show where records are removed

## Data sources

1. **EPA ECHO Active Facilities** — all selected New England states. ECHO is strongest for active regulated physical facilities and industrial operations.
2. **Connecticut Business Registry — Business Master** — additional broad Connecticut coverage using active status and self-reported NAICS.

Because a comparable browser-accessible statewide active-business registry with direct NAICS fields is not currently connected for MA, RI, NH, VT, or ME, those states rely on ECHO in this edition. The app displays this limitation clearly.

## GitHub Pages deployment

1. Create or open a **public** GitHub repository.
2. Upload the files in this folder to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main` and `/(root)`.
6. Save and wait for the GitHub Pages URL.

No API key setup is required.

## Search logic

1. Selected industry presets and custom entries become NAICS prefixes.
2. EPA ECHO and the Connecticut Registry are queried using NAICS criteria.
3. Returned NAICS values are parsed and checked again in the browser.
4. Only active records are retained.
5. Optional operation and keyword filters are applied.
6. Duplicate physical locations are merged.
7. Results are balanced across selected industries, with state priority MA → NH/CT → RI → VT → ME.
8. The first 10 rows are previewed and all selected records are exported as CSV.

## Important limitations

- Public government data is not a complete commercial lead database.
- ECHO includes facilities represented in EPA regulatory programs, not every company.
- Connecticut NAICS values are self-reported.
- Email, website, phone, and contact person are included only if supplied by the government source; otherwise they remain blank.
- Browser-side public APIs can experience outages, throttling, or schema changes. The diagnostics table is designed to make these failures visible.
