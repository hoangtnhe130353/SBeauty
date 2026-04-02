# PC1 Group Corporate Report Website

Static website demo for `PC1 Group`, currently publishing:

- `pages/index.html`: 2024 report landing page
- `pages/2025.html`: 2025 report and outlook page

## Project structure

```text
.
|-- assets/
|   |-- css/
|   |   |-- style.css
|   |   `-- 2025.css
|   |-- data/
|   |   `-- report-data.json
|   `-- js/
|       |-- main.js
|       |-- charts.js
|       `-- charts2025.js
|-- pages/
|   |-- index.html
|   |-- 2021.html
|   |-- 2022.html
|   |-- 2023.html
|   |-- 2025.html
|   `-- 2026.html
|-- scripts/
|   `-- import-genspark-export.ps1
`-- index.html          # root entry/redirect for GitHub Pages
```

## Better update workflow

Instead of dropping a full duplicate project like `new version/` into the repo root, use this flow:

1. Export the updated site from Genspark.
2. Put that export into `incoming/<folder-name>/`.
3. Run:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\import-genspark-export.ps1 -SourcePath .\incoming\<folder-name> -RemoveSource
```

The script will:

- sync all exported `.html` files into `pages/`
- sync exported asset folders into `assets/` when present
- keep repo-only files such as `.git/`, `.nojekyll`, and this README untouched
- optionally delete the imported export folder after syncing

## Shared data

Core shared data now lives in `assets/data/report-data.json`:

- shared contact info for repeated footer / IR blocks
- year navigation config
- annual summary data for 2024, 2025, and 2026

This keeps future year updates more explicit and reduces repeated hard-coded content across pages.

## Local preview

Because this is a static site, there is no build step. A simple local server is enough:

```powershell
python -m http.server 4173
```

Then open `http://127.0.0.1:4173/`.

## Deploy

The published site is served from GitHub Pages:

- repo: `hoangtnhe130353/dxd-portal`
- site: `https://hoangtnhe130353.github.io/dxd-portal/`

Deploy flow:

1. Verify the site locally.
2. Commit the updated static files.
3. Push `main` to GitHub.

## Notes

- `new version/` was a one-off raw export and should not stay in the repo.
- Some 2025 references are estimate/demo content collected from public sources.
- `.nojekyll` is kept so GitHub Pages serves files directly without Jekyll processing.
