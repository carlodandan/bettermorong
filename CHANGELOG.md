# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2026-10-24

### Added

- **Morong Water District (MOWAD) Hotline**: Added official contact numbers and emergency leak reporting lines for MOWAD in `src/data/hotlinesData.ts`.
- **Water Connections & Utilities Guide**: Expanded `request-access-to-barangay-water-supply-systems.md` to clearly delineate Morong Water District (MOWAD) franchised areas from Barangay Rural Waterworks (BAWASA / BRWASA) systems, including connection requirements and leak reporting protocols.
- **RPHS Morong Main & Malasakit Center Guide**: Upgraded `go-to-the-local-hospital-for-treatment-or-confinement.md` with side-by-side RHU vs Hospital comparison, 24/7 ER contact details, PhilHealth No Balance Billing (NBB), and complete documentary checklists for Malasakit Center / Medical Social Service financial assistance.
- **Morong Commuter & TODA Fare Guide**: Added `commuter-and-tricycle-fare-guide.md` under `content/government/about-morong/` covering regional transit routes (UV Express, jeepneys, buses), 20% statutory student/senior/PWD discounts, 8-barangay TODA network, and overcharging reporting procedures.
- **8-Barangay Garbage Collection Table**: Upgraded `check-garbage-collection-schedules-and-request-pickup.md` with a structured, responsive Markdown table covering all 8 barangays of Morong with highway vs interior collection guidelines, special bulk hauling, and MENRO "No Segregation, No Collection" enforcement.

## [1.2.0] - 2026-10-24

### Added

- **Morong Water District (MOWAD) Hotline**: Added official contact numbers and emergency leak reporting lines for MOWAD in `src/data/hotlinesData.ts`.
- **Water Connections & Utilities Guide**: Expanded `request-access-to-barangay-water-supply-systems.md` to clearly delineate Morong Water District (MOWAD) franchised areas from Barangay Rural Waterworks (BAWASA / BRWASA) systems, including connection requirements and leak reporting protocols.
- **RPHS Morong Main & Malasakit Center Guide**: Upgraded `go-to-the-local-hospital-for-treatment-or-confinement.md` with side-by-side RHU vs Hospital comparison, 24/7 ER contact details, PhilHealth No Balance Billing (NBB), and complete documentary checklists for Malasakit Center / Medical Social Service financial assistance.
- **Morong Commuter & TODA Fare Guide**: Added `commuter-and-tricycle-fare-guide.md` under `content/government/about-morong/` covering regional transit routes (UV Express, jeepneys, buses), 20% statutory student/senior/PWD discounts, 8-barangay TODA network, and overcharging reporting procedures.
- **8-Barangay Garbage Collection Table**: Upgraded `check-garbage-collection-schedules-and-request-pickup.md` with a structured, responsive Markdown table covering all 8 barangays of Morong with highway vs interior collection guidelines, special bulk hauling, and MENRO "No Segregation, No Collection" enforcement.

## [1.1.0] - 2026-10-24

### Added

- **New Service Category `civil-registry-and-ids`**: Registered "Civil Registry, IDs & Clearances" in `src/data/services.yaml` and `yamlLoader.ts`.
- **Civil Registry Citizen Guides**:
  - `register-birth-marriage-or-death-certificates.md` — Timely and delayed registration, certified true copies, and PSA electronic endorsements.
  - `apply-for-marriage-license.md` — Marriage license requirements, PMOC & family planning seminars, and 10-day publication period.
  - `correct-clerical-errors-on-civil-registry-documents.md` — Administrative correction procedures under RA 9048 and RA 10172.
  - `get-cedula-and-individual-working-permit.md` — Community Tax Certificate (Cedula) at Treasury and Mayor's Occupational Working Permit & Health Card.
- **Real Property & Taxation Guides** (`housing-land-use`):
  - `pay-real-property-tax-amilyar-and-get-tax-clearance.md` — Annual RPT payment structure, installment deadlines, promptness discounts, and tax clearances.
  - `transfer-or-update-real-property-tax-declaration.md` — Transfer of ownership via Deed of Conveyance/eCAR, declaring new improvements, and Assessor certifications.
- **Healthcare & Animal Bite Treatment** (`health-services`):
  - `get-animal-bite-treatment-and-anti-rabies-vaccine.md` — Wound first aid, Animal Bite Treatment Center (ABTC) at Morong RHU, rabies vaccination schedules, and RPHS Morong Main hospital referrals.
- **New Department Pages** (`departments`):
  - `business-permits-and-licensing-office.md` — Institutional overview of Morong BPLO and BOSS operations.
  - `public-employment-service-office.md` — Institutional overview of Morong PESO.
- **Employment Citizen Guide** (`social-welfare`):
  - `find-local-jobs-spes-or-peso-employment-assistance.md` — Job referral, student employment (SPES), DOLE TUPAD emergency wage assistance, and OFW desk.

### Fixed

- Fixed Cloudflare Pages build warning by removing redundant `public/_redirects` SPA rewrite rule (handled natively by Cloudflare Pages when no custom `404.html` exists).
- Removed 0-byte duplicate `content/services/business/rent-stalls-in-public-markets.md` and cleaned up `content/services/business/index.yaml` in favor of complete guide in `content/services/infrastructure-public-works/rent-stalls-in-public-markets-or-use-lgu-managed-cemeteries.md`.
- Removed unused development component `src/components/I18nTest.tsx`.

### Documentation

- Updated `DEPLOYMENT-GUIDE.md` edge configuration section to reflect Cloudflare Pages native SPA routing.

## [1.0.0] - 2026-10-24

### Added

- Independent `web-version.json` single source of truth for versioning.
- Automated GitHub Actions release pipeline (`.github/workflows/release.yml`) triggered on `web-version.json` changes with automated testing, dist archiving, and Discord release notifications.
- Dynamic year and dynamic versioning in `Footer` component.
- Interactive and automated `.env` file generator script (`scripts/generate-env.mjs`).
- Single-slug routes `/philippines-hotlines` and `/philippines-holidays` for reliable breadcrumb navigation.

## [0.3.0] - 2026-07-29

### Added

- Meilisearch content search integration — `/search` route with a new `Search` page (`src/pages/Search.tsx`)
- `src/lib/meilisearch.ts` — Meilisearch client and `isMeilisearchEnabled` feature flag; the search route and nav links only render when Meilisearch is configured
- `scripts/index-content.mjs` and the `npm run index-content` script for indexing services and government content into Meilisearch
- `docs/meilisearch.md` — Meilisearch setup and indexing documentation
- Terraform configuration for AWS S3 static site deployment under `terraform/` (#3)
- `DEPLOYMENT-GUIDE.md` — deployment instructions for the static site
- `GovernmentActivitySection` now accepts optional `title` and `description` props, falling back to translations

### Changed

- Migrated from `react-router-dom` v7 to `react-router` v8 across all imports
- Upgraded core dependencies: Vite 8, TypeScript 6, ESLint 10, i18next 26, react-i18next 17, `@vitejs/plugin-react` 6, `js-yaml` 5, `lint-staged` 17, `globals` 17
- ESLint flat config updated for ESLint 10 and the new `eslint-plugin-react-hooks` v7
- Dropped the redundant `@types/js-yaml` dependency (types now ship with `js-yaml`)
- `.gitignore` expanded with Terraform ignores (state files, `.tfvars`, local overrides, CLI config)

### Documentation

- `README.md` and `STARTER-KIT-README.md` — installation guide switched to a fork-first workflow, with a "Keeping Your Fork Updated" upstream sync section and clarified contribution steps

## [0.2.0] - 2026-03-07

### Added

- `/government` and `/government/:category` routes with a new `Government` page
- Government section content system under `content/government/` (departments: executive, legislative)
- `src/pages/Government.tsx` — category listing page for government departments
- `src/data/government.yaml` — top-level government category definitions
- Expanded `Document` page to support government content alongside services
- Navigation updated: main nav Government item now links to `/government/departments`
- OG image template redesigned for improved open graph previews
- Companion JSON files for markdown pages — optional `{slug}.json` files supply `{PLACEHOLDER}` token values (official names, dates, etc.) interpolated at load time, with `VITE_<KEY>` env vars as fallback

### Changed

- `yamlLoader.ts` refactored to handle both service and government category indexes
- `markdownLoader.ts` refactored to resolve markdown files across content types; now also loads companion JSON and runs `interpolate()` for token substitution
- `Navbar` updated to support government section routing
- `Breadcrumbs` updated to reflect government section paths
- `Section` component adjusted for layout consistency
- `GovernmentActivitySection` on Home page now points to live government routes
- `Services` page layout and routing logic improved
- Locale strings updated in `public/locales/en/common.json` and `src/i18n/locales/en.json`

### Documentation

- `README.md` — project structure and content setup steps updated for government section
- `CLAUDE.md` — routing, content system, and companion JSON file behavior documented
- `CONTENT-MANAGEMENT.md` — added government department pages section, JSON data files explained, dynamic placeholder workflow included
- `CONTENT-GUIDE.md` — added department/office page template, content type, and "Dynamic Content with Placeholders" section

## [0.1.0] - 2026-03-06

### Added

- `@bettergov/kapwa` component library integrated as the primary UI primitive layer
- New font and theme setup via `src/fonts.css`
- `react-helmet-async` for SEO and document head management

### Changed

- Migrated styling pipeline to **Tailwind CSS v4** (Vite plugin, PostCSS config updated)
- Replaced local `Card` component (`src/components/ui/Card.tsx`) with Kapwa card primitives
- Replaced legacy `ListItem` component with Kapwa cards and banners across Services, Home, and Document pages
- Updated `src/index.css` to align with Tailwind v4 conventions
- Upgraded `App.tsx` and `main.tsx` for the new app shell and SEO setup

### Removed

- `src/components/ui/Card.tsx` — superseded by Kapwa primitives
- `src/components/ui/ListItem.tsx` — superseded by Kapwa cards and banners

[0.3.0]: https://github.com/iyanski/betterlocalgov/releases/tag/v0.3.0
[0.2.0]: https://github.com/iyanski/betterlocalgov/releases/tag/v0.2.0
[0.1.0]: https://github.com/iyanski/betterlocalgov/releases/tag/v0.1.0
