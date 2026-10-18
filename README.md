# 🏛️ BetterMorong (bettermorong.org)

> **Citizen-first digital portal for the Municipality of Morong, Rizal**  
> Direct access to public services, municipal offices, ordinances, health programs, and emergency hotlines — built without political clutter.

[![Live Portal](https://img.shields.io/badge/Live_Portal-bettermorong.org-1E40AF?style=flat&logo=cloudflare)](https://bettermorong.org)
[![Staging Preview](https://img.shields.io/badge/Staging-staging.bettermorong.org-0284C7?style=flat&logo=cloudflarepages)](https://staging-bettermorong.pages.dev)
[![React](https://img.shields.io/badge/React-19.1-61DAFB?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![pnpm](https://img.shields.io/badge/pnpm-v10-F69220?style=flat&logo=pnpm)](https://pnpm.io/)
[![Accessibility](https://img.shields.io/badge/WCAG-2.1_AA-success?style=flat)](/accessibility)
[![License](https://img.shields.io/badge/License-CC0_1.0_Universal-lightgrey.svg)](LICENSE)

---

## 📖 About the Project

**BetterMorong** is an independent, community-driven civic technology initiative designed to bridge the gap between residents and local government services in the **Municipality of Morong, Province of Rizal** (Region IV-A CALABARZON).

Standard government portals are frequently burdened by political vanity ("anti-epal" violations), slow page loads, poor mobile responsiveness, and confusing bureaucratic language. BetterMorong delivers a modern, high-performance web experience focused squarely on citizen utility: **what services exist, what requirements are needed, what fees apply, and where to go.**

Part of the wider [BetterGov.ph](https://bettergov.ph) civic tech movement, BetterMorong is free, open source, and built for the people of Morong.

---

## 🌟 Key Features

- **⚡ Instant Citizen Search**: Client-side indexed fuzzy search querying over 60+ municipal services, department directories, and enacted ordinances in milliseconds.
- **🌐 Bilingual UI (English & Filipino / Tagalog)**: Instant language switching across navigation chrome, hero search, and footer links with zero page reloads.
- **🌦️ Live Morong Weather & PHT Clock**: Real-time weather data fetched from Open-Meteo for Morong coordinates (`14.5133° N, 121.2384° E`) with a synchronized Philippine Standard Time (PST/PHT) display.
- **🚨 24/7 Emergency Hotlines Directory**: Quick-dial emergency contacts including Morong MDRRMO, PNP Morong Station, BFP Morong, Rizal Provincial Police, and national hotlines (911, 8888, 1343).
- **📋 Citizen's Charter & Ordinances**: Plain-language guides for Business Permits (BPLO), Civil Registry (birth, death, marriage certificates), Real Property Taxes (Assessor), and Social Welfare (Senior Citizen, PWD, Solo Parent IDs).
- **♿ WCAG 2.1 AA Accessibility**: High color contrast (`#1E40AF` civic blue), semantic HTML5 landmark architecture, keyboard navigation, and a dedicated [Accessibility Statement](/accessibility).
- **🗺️ Complete Visual Sitemap**: Public directory at `/sitemap` providing transparent navigation for citizens and automated crawlers via `/sitemap.xml` and `/robots.txt`.
- **📱 Progressive Web App (PWA)**: Installable on Android, iOS, Windows, and macOS, with Workbox offline service worker caching for resilient access during emergencies.

---

## 🛠️ Technology Stack

| Layer                       | Technology              | Details                                                           |
| :-------------------------- | :---------------------- | :---------------------------------------------------------------- |
| **Frontend Framework**      | React 19                | Fast functional components with modern hooks                      |
| **Language**                | TypeScript 5.9          | Strict type safety and complete type coverage                     |
| **Styling & Design System** | Tailwind CSS v4 & Kapwa | Utility-first CSS + `@bettergov/kapwa` civic tokens               |
| **Routing**                 | React Router v8         | Single Page Application (SPA) routing with history                |
| **Icons**                   | Lucide React            | Consistent, lightweight SVG iconography                           |
| **Localization**            | i18next & react-i18next | Statically bundled in-memory dictionaries                         |
| **Content Engine**          | Markdown + YAML         | Frontmatter-backed service files with `js-yaml`                   |
| **Package Manager**         | pnpm                    | Fast, deterministic dependency resolution with workspace security |
| **Hosting & Edge**          | Cloudflare Pages        | Global edge deployment with automated preview branches            |

---

## 📁 Repository Structure

```text
bettermorong/
├── content/                     # Civic content in Markdown with YAML frontmatter
│   ├── government/              # Departments, executive, legislative, and ordinances
│   │   ├── departments/         # MPDO, Engineering, Assessor, MDRRMO, Health, etc.
│   │   ├── executive.md         # Office of the Municipal Mayor & Vice Mayor
│   │   ├── legislative.md       # Sangguniang Bayan profiles & committee rosters
│   │   └── approved-ordinances.md # Enacted municipal resolutions & ordinances
│   └── services/                # Public services categorized by citizen life event
│       ├── agriculture/         # Free seeds, farming tools, livestock veterinary
│       ├── business/            # Barangay clearance, business permits, tax renewal
│       ├── civil-registry/      # Birth, death, and marriage certificate registration
│       ├── education/           # Local municipal scholarships & school support
│       ├── environment/         # Waste segregation schedules, illegal dumping reports
│       ├── health/              # Rural Health Units (RHU), vaccines, maternal care
│       ├── housing/             # Socialized housing & relocation programs
│       ├── infrastructure/      # Road repair requests, drainage maintenance
│       └── social-welfare/      # MSWDO senior, PWD, and solo parent assistance
├── public/                      # Static assets served at root
│   ├── Morong-Logo.svg          # Official Morong civic seal
│   ├── favicon.svg              # Browser tab icon
│   ├── morong-simbahan.svg      # Historic St. Jerome Parish Church vector silhouette
│   ├── robots.txt               # Search engine crawler policies
│   └── sitemap.xml              # Machine-readable XML sitemap
├── src/
│   ├── components/
│   │   ├── home/                # Homepage widgets (Weather, Services, Emergency)
│   │   ├── layout/              # Navbar, Footer, and layout wrappers
│   │   ├── sections/            # Hero section with interactive search dropdown
│   │   ├── ui/                  # Reusable accessible atomic UI components
│   │   └── SEO.tsx              # Centralized meta tags & "BetterMorong | Page" titles
│   ├── hooks/                   # Custom hooks (PHT time, Morong live weather)
│   ├── i18n/                    # Language definitions & localization configuration
│   ├── lib/                     # Markdown and YAML loaders, search indexing logic
│   ├── locales/                 # Bundled translations (en/common.json, fil/common.json)
│   ├── pages/                   # Application pages (Home, Services, Government,
│   │                            # Document, Hotlines, Holidays, Sitemap, Accessibility)
│   ├── types/                   # TypeScript interfaces (Service, Subcategory, etc.)
│   ├── App.tsx                  # Root routing layout
│   └── main.tsx                 # Application bootstrap
├── wrangler.jsonc               # Cloudflare Pages deployment configuration
├── DEPLOYMENT-GUIDE.md          # Cloudflare Pages staging and prod deployment runbook
└── package.json                 # Project scripts and dependencies
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v20.0.0` or higher recommended
- **pnpm**: `v10.0.0` or higher (`corepack enable && corepack prepare pnpm@latest --activate` or `npm install -g pnpm`)
- **Git**

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/carlodandan/bettermorong.git
   cd bettermorong
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Start the local development server:**
   ```bash
   pnpm dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

---

## 💻 Available Scripts

| Command                     | Description                                                         |
| :-------------------------- | :------------------------------------------------------------------ |
| `pnpm dev`                  | Starts Vite development server at `localhost:5173`                  |
| `pnpm build`                | Type-checks with `tsc` and bundles production assets into `dist/`   |
| `pnpm build:staging`        | Builds assets using staging environment mode (`--mode staging`)     |
| `pnpm preview`              | Locally serves the production `dist/` folder for verification       |
| `pnpm lint`                 | Runs ESLint across all TypeScript and React files                   |
| `pnpm lint:fix`             | Automatically fixes autofixable ESLint errors                       |
| `pnpm format`               | Formats all files with Prettier                                     |
| `pnpm format:check`         | Checks code formatting without modifying files                      |
| `pnpm pages:deploy:staging` | Deploys `dist/` to Cloudflare Pages on the `staging` branch         |
| `pnpm pages:deploy:prod`    | Deploys `dist/` to Cloudflare Pages on the `main` production branch |

---

## ✍️ Content Management

Civic information in BetterMorong is kept in plain Markdown files with YAML frontmatter. Non-technical contributors can easily update service details, requirements, fees, and office hours without touching application code.

### Sample Service File (`content/services/business/apply-for-barangay-clearance.md`):

```markdown
---
title: "Apply for Barangay Clearance and Mayor's Business Permits"
description: 'Guidelines, requirements, and steps for obtaining business permits in Morong, Rizal.'
category: 'business'
department: 'Business Permits and Licensing Office (BPLO)'
fee: 'Varies depending on business capital and classification'
processing_time: '1-3 working days'
---

# Overview

All enterprises operating within the Municipality of Morong are required to obtain...

## Requirements

1. DTI Business Name Registration or SEC Certificate
2. Barangay Business Clearance
3. Contract of Lease or Proof of Ownership
4. Comprehensive General Liability Insurance

## Step-by-Step Procedure

1. Submit application form and requirements at the BPLO Window...
2. Undergo assessment of municipal taxes and regulatory fees...
3. Pay assessed fees at the Municipal Treasurer's Office...
4. Claim your Mayor's Permit and official municipal sticker.
```

---

## ☁️ Deployment

BetterMorong is deployed globally on **Cloudflare Pages**, delivering sub-100ms load times and high availability across the Philippines.

### Environments

- **Production**: Deployed from the `main` branch to [bettermorong.org](https://bettermorong.org).
- **Staging / Preview**: Deployed from the `staging` or `morong-dev` branch to [staging.bettermorong.org](https://staging.bettermorong.org) / [staging-bettermorong.pages.dev](https://staging-bettermorong.pages.dev).

For step-by-step instructions on setting up custom domains, DNS records, and automated GitHub Actions deployments, refer to the [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md).

---

## 🏛️ Civic Technology Standards

BetterMorong strictly adheres to the core standards of the [BetterGov.ph](https://bettergov.ph) network:

1. **Anti-Epal Compliance**: No public official portraits, names, or campaign material on service pages. Public funds and digital services belong to the people, not politicians.
2. **Citizen-First Language**: Procedures are written in clear, concise language rather than legalese.
3. **Open Access & Public Domain**: All government service guides, schedules, and information are public records and provided under the [Creative Commons Zero (CC0 1.0) Universal](LICENSE) license.
4. **Data Privacy**: No personal tracking, surveillance cookies, or data harvesting.

---

## 🤝 Contributing

We welcome contributions from Morong residents, civic hackers, writers, designers, and developers!

- **Found an outdated fee or requirement?** Submit a pull request or open an issue with the corrected municipal memorandum.
- **Want to add a missing service?** Create a new markdown file in `content/services/`.
- **Help with translations:** Help localize content into conversational Tagalog in `src/locales/fil/common.json`.

Join the civic tech conversation on the **[BetterGov.ph Discord Community](https://discord.gg/bettergov)**.

---

## 📄 License

This repository is dedicated to the public domain under the **Creative Commons Zero 1.0 Universal (CC0 1.0)** license. You are free to copy, modify, distribute, and build upon this work without asking permission.

**Built with pride by volunteers for the Municipality of Morong, Rizal.**
