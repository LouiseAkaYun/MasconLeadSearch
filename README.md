# Mascon Lead Finder

A lightweight, single-page internal lead research tool designed for GitHub-connected Netlify deployment.

## What Version 1 does

- Uses Mascon branding and a one-page English interface.
- Supports multiple industry and business-operation filters.
- Supports individual Northeast states and region presets.
- Automatically chooses and combines relevant public government sources.
- Keeps only records explicitly identified as active or operating.
- Keeps separate rows for different physical locations.
- Merges obvious duplicates for the same company location.
- Balances the final list across selected industries.
- Applies state priority: MA, then NH/CT, then NY, RI, NJ, VT, ME, PA.
- Previews the first 10 rows and exports 50, 100, 200, or 300 rows to CSV.
- Uses email, website, phone, and contact fields only when the government source provides them.
- Has no database, account system, or saved search history.

## Live data connectors

1. **Connecticut Business Registry** — active Connecticut entities with self-reported NAICS data and, when provided, business email.
2. **New York Active Corporations** — active New York entities; industry is inferred from company-name keywords because the dataset has no NAICS field.
3. **NPPES NPI Registry** — active organizational healthcare providers in selected states.
4. **EPA ECHO** — active, non-federal, regulated facilities for industrial and physical-operation industries.
5. **FMCSA QCMobile** — active motor carriers for logistics and trucking searches; requires a free FMCSA web key.

The application intentionally shows partial-coverage warnings. Free government data does not provide a complete private-company directory for every industry and state.

## Deploy with GitHub and Netlify

### 1. Create the GitHub repository

Create a new repository and upload all files in this project folder. The repository can be public or private.

### 2. Connect it to Netlify

1. In Netlify, choose **Add new project** → **Import an existing project**.
2. Select GitHub and choose this repository.
3. Netlify should read `netlify.toml` automatically.
4. Build command: leave blank.
5. Publish directory: `.`
6. Functions directory: `netlify/functions`
7. Deploy the site.

Every push to the connected GitHub branch will redeploy the website automatically.

### 3. Set API environment variables once

In Netlify, open **Project configuration** → **Environment variables**.

- `FMCSA_WEB_KEY`: required only for logistics/trucking carrier searches. Create a free key through the FMCSA Developer site.
- `SOCRATA_APP_TOKEN`: optional. The Connecticut and New York Socrata APIs work without it, but a token may improve request allowance.

Your colleagues never enter these keys. Netlify Functions use them automatically.

### 4. Share the Netlify URL

The deployed website is public to anyone who knows the URL. No password or local Python environment is required.

## Local testing for the developer

Local testing is optional and not needed by office users.

```bash
npm test
npx netlify dev
```

Copy `.env.example` to `.env` only for local development. Never commit `.env`.

## Important coverage behavior

- Searches continue when one source fails.
- Available partial results remain exportable.
- Records with blank or unknown company status are excluded.
- The tool does not crawl company websites or infer email addresses.
- New York industry matching is less precise because its active-corporation dataset does not include NAICS codes.
- EPA ECHO includes regulated facilities rather than every business in a sector.
- FMCSA's carrier-name endpoint is not a complete state-level bulk export.

## Project structure

```text
mascon-lead-finder/
├── index.html
├── styles.css
├── assets/mascon-logo.png
├── js/app.js
├── shared/presets.mjs
├── netlify.toml
├── netlify/functions/
│   ├── search-leads.mjs
│   ├── connectors/
│   └── lib/
├── tests/
├── .env.example
└── README.md
```

## Frontend deployment note

The browser interface is intentionally bundled into the root-level `app.js`, and the logo is stored as root-level `mascon-logo.png`. This avoids missing checkbox controls caused by an unserved nested ES module or missing asset directory.

Confirm these files appear at the top level of the GitHub repository before deploying:

- `index.html`
- `styles.css`
- `app.js`
- `mascon-logo.png`
- `netlify.toml`
- `netlify/functions/`
- `shared/` (used by the serverless functions)

After pushing the fix, use **Deploys → Trigger deploy → Clear cache and deploy site** in Netlify.

## Troubleshooting a 404 search error

The frontend now calls the Netlify Function directly at:

```text
/.netlify/functions/search-leads
```

After deployment, confirm the function layer is present by opening:

```text
https://YOUR-SITE.netlify.app/.netlify/functions/health
```

Expected response:

```json
{"ok":true,"service":"Mascon Lead Finder","function":"health"}
```

If that URL returns 404, the functions were not deployed. Confirm that these paths are in the repository root (not inside an extra nested project folder):

```text
netlify.toml
netlify/functions/health.mjs
netlify/functions/search-leads.mjs
```

In Netlify Build settings use:

```text
Base directory: blank
Build command: blank
Publish directory: .
Functions directory: netlify/functions
```

Then choose **Deploys → Trigger deploy → Clear cache and deploy site**.
