# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.0] - 2026-10-24

### Added

- **Municipal BAC Bids & Awards Transparency Tracker (`LguDocumentsExplorer`)**: Built an interactive, client-side document repository component (`src/components/government/LguDocumentsExplorer.tsx`) supporting real-time keyword search, categorization (Notices of Award, Notices to Proceed, Invitations to Bid, Bidding Documents, Citizen's Charters, Financial Disclosures, Executive Orders), publication year filtering (2018–2026), barangay filtering (8 Morong barangays), sorting, and direct links to official municipal PDF uploads with external link safety warnings.
- **Automated BAC Document Harvester Script (`scripts/fetch-morong-bac.mjs`)**: Implemented an automated sync script querying the live `morongrizal.gov.ph` WordPress REST API (`/wp-json/wp/v2/media?mime_type=application/pdf`) with pagination, classification heuristics, entity decoding, and barangay tagging. Registered as `"sync:lgu-docs"` in `package.json`.
- **Pre-indexed Public Documents Data**: Bundled 110 classified and verified public municipal documents in `content/government/transparency-documents/lgu-public-documents-index.json` to ensure 100% offline resilience and fast static bundle loading without runtime API dependencies.
- **Dedicated Downloadable Forms Hub (`LguFormsHub`)**: Created a dedicated application forms directory (`/government/transparency-documents/downloadable-forms` with shortcuts `/forms` and `/government/downloadable-forms`) indexing 23 official application forms and 6 Citizen's Charters across Building & Engineering (OBO), Business Permits (BPLO), Sanitation & Health (MHO), and Working Permits with direct PDF downloads, ARTA RA 11032 statutory timelines, and cross-links to step-by-step citizen guides.
- **Enhanced Procurement & Bids Guide**: Expanded `procurement-monitoring-reports.md` with plain-language explanations of the Bids and Awards Committee (BAC), BAC Secretariat, Technical Working Group (TWG), Approved Budget for the Contract (ABC), Notice of Award (NOA), Notice to Proceed (NTP), and citizen rights to inspect bidding records under Freedom of Information (EO 2, s. 2016) and Commission on Audit (COA) citizen participatory auditing.

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

## [1.0.1] - 2026-10-24

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
- Nested subcategory rendering in `Document` page
- Breadcrumb navigation supporting 1-level, 2-level, and 3-level deep routes
- Government category cards on the home page
- `content-index.json` generation via `npm run index-content` for client-side search indexing
- Subcategory listing cards when navigating to a category with children

### Changed

- Renamed `ServiceCategory` to `CategoryIndex` to represent both service and government taxonomies
- Reorganized `content/` into `content/services/` and `content/government/`
- Updated YAML schema documentation in `CONTENT-GUIDE.md`

## [0.1.0] - 2026-02-15

### Added

- Initial release of the BetterGov starter kit
- Service catalog with markdown-based guides
- Government directory and official document templates
- Emergency hotlines directory
- Multilingual support (Filipino / English) via i18next
- Responsive UI built with Tailwind CSS and Kapwa design system tokens
- Offline-capable PWA configuration with `@vite-pwa/vite-plugin`
