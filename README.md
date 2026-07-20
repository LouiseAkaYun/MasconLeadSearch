# Mascon Lead Finder — GitHub Pages Edition

A static, English-only lead research tool for Mascon Inc. It runs entirely in the browser and exports CSV files. No backend, Python environment, Netlify Functions, database, login, or API-key entry is required.

## Publish with GitHub Pages

1. Create a GitHub repository.
2. Upload **the contents of this folder** to the repository root. `index.html`, `app.js`, and `styles.css` must be visible at the top level.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/(root)`, then click **Save**.
6. GitHub will show the public URL after deployment finishes.

The repository may be public or private if your GitHub plan permits Pages for that repository type. The deployed site itself is static and contains no secret credentials.

## Data sources

The static edition uses browser-compatible public sources and continues when one source fails:

- Connecticut Business Registry — Business Master
- New York Active Corporations
- Pennsylvania current/distinct registered businesses
- CMS NPPES NPI Registry for healthcare organizations
- EPA ECHO active regulated facilities via JSONP for industrial searches

Coverage differs by state and industry. The page displays partial-coverage warnings. Email, website, and contact-person fields remain blank unless directly provided by a government source.

## Blade-customer presets

The first industry group includes potential blade customers such as meat and poultry processors, seafood plants, packaging converters, plastic and rubber converters, textile/apparel cutters, leather and footwear processors, wood-product companies, metal fabricators, recycling operations, industrial machinery manufacturers, automotive/tire/gasket manufacturers, and medical/surgical device manufacturers.

## Files

- `index.html` — one-page interface
- `styles.css` — Mascon-branded styling
- `app.js` — presets, government-source connectors, filtering, deduplication, preview and CSV export
- `mascon-logo.png` — transparent Mascon logo
- `.nojekyll` — prevents Jekyll processing

## Notes

- Only explicitly active/current records are retained.
- Different physical locations remain separate rows.
- Results are balanced across selected industries.
- State priority is Massachusetts, then New Hampshire/Connecticut, then New York, followed by Rhode Island, New Jersey, Vermont, Maine and Pennsylvania.
- The first 10 rows are previewed; the full selected limit is exported.
