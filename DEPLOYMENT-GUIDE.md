# 🚀 BetterMorong — Deployment & Environment Guide

This comprehensive guide covers deploying **BetterMorong** (Municipality of Morong, Rizal) with a primary focus on **Cloudflare Pages** (the recommended, zero-cost, enterprise-grade edge platform for Philippine local government websites) alongside secondary hosting alternatives.

---

## 📑 Table of Contents

1. [🌟 Recommended: Cloudflare Pages](#-recommended-cloudflare-pages)
2. [🏗️ Staging/Preview vs. Production: Architecture & Separation](#️-stagingpreview-vs-production-architecture--separation)
3. [🚀 Step-by-Step Deployment Methods](#-step-by-step-deployment-methods)
   - [Method 1: Automated Git CI/CD via Cloudflare Dashboard (Recommended)](#method-1-automated-git-cicd-via-cloudflare-dashboard-recommended)
   - [Method 2: Direct Command Line Deployment via Wrangler CLI](#method-2-direct-command-line-deployment-via-wrangler-cli)
4. [🌐 Custom Domain Setup (`.gov.ph`)](#-custom-domain-setup-govph)
5. [⚙️ Edge Configuration Files (`_redirects` & `_headers`)](#️-edge-configuration-files-_redirects--_headers)
6. [🔄 Alternative Platforms (Vercel, Netlify, AWS S3)](#-alternative-platforms-vercel-netlify-aws-s3)
7. [📋 Pre-Deployment QA Checklist](#-pre-deployment-qa-checklist)

---

## 🌟 Recommended: Cloudflare Pages

**Cloudflare Pages** is the ideal deployment platform for BetterMorong because it offers:

- **Free, Unlimited Edge Bandwidth**: No unexpected overage bills for local government budgets.
- **Local Philippine Edge Nodes**: Manila and regional data centers ensure sub-50ms latency across Luzon and CALABARZON.
- **Native Single Page Application (SPA) Support**: First-class handling of client-side routing via `_redirects`.
- **Automatic Staging & Branch Previews**: Every git branch (e.g., `staging`, `feature/*`) and pull request gets its own secure, isolated preview URL.
- **DDoS Protection & SSL**: Cloudflare's enterprise-grade web application firewall (WAF) and free automatic SSL certificates for `.gov.ph` domains.
- **Zero Server Maintenance**: Pure static JAMstack edge hosting with no Linux servers or databases to patch.

---

## 🏗️ Staging/Preview vs. Production: Architecture & Separation

Staging and Production are **two completely separate environments**. Maintaining a strict boundary between them prevents unreviewed changes from breaking the live citizen portal.

### Comparison Table

| Attribute                  | 🟡 Staging / Preview Environment                                  | 🟢 Production Environment                          |
| :------------------------- | :---------------------------------------------------------------- | :------------------------------------------------- |
| **Primary Purpose**        | Internal testing, QA, mayor's office review, content verification | Live public citizen portal for Morong residents    |
| **Git Branch**             | `staging` (or pull request branches)                              | `main` (or `production`)                           |
| **Default Cloudflare URL** | `https://staging-bettermorong.pages.dev`                          | `https://bettermorong.pages.dev`                   |
| **Custom Domain**          | `https://staging.bettermorong.org` (optional)                     | `https://bettermorong.org`                         |
| **Vite Mode & Env File**   | `--mode staging` (`.env.staging`)                                 | `--mode production` (`.env.production`)            |
| **Branding Identifier**    | `BetterMorong (Staging)` badge in header & metadata               | `BetterMorong` official portal                     |
| **Search Engine Crawling** | **Blocked** (`X-Robots-Tag: noindex, nofollow` auto-applied)      | **Indexed** (`sitemap.xml` & `robots.txt` enabled) |
| **Build Command**          | `npm run build:staging`                                           | `npm run build`                                    |
| **Deploy Command**         | `pnpm pages:deploy:staging`                                       | `pnpm pages:deploy:prod`                           |

---

## 🚀 Step-by-Step Deployment Methods

### Method 1: Automated Git CI/CD via Cloudflare Dashboard (Recommended)

This method connects your GitHub repository to Cloudflare Pages so every push to `main` deploys to production, and every push to `staging` or a PR deploys to a preview environment.

#### Step 1: Push Code to GitHub

Ensure your latest branches are pushed to your remote repository:

```bash
# Push production branch
git checkout main
git push origin main

# Push staging branch
git checkout -b staging
git push -u origin staging
```

#### Step 2: Connect Repository to Cloudflare Pages

1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. In the left navigation, select **Workers & Pages** > **Create application** > **Pages** tab.
3. Click **Connect to Git**.
4. Select your GitHub account and choose the `bettermorong` repository.
5. Click **Begin setup**.

#### Step 3: Configure Build Settings

Set the build configurations:

- **Project name**: `bettermorong`
- **Production branch**: `main`
- **Framework preset**: `Vite`
- **Build command**: `pnpm run build`
- **Build output directory**: `dist`
- **Root directory**: `/` (leave blank)

#### Step 4: Configure Environment Variables

In the Cloudflare setup wizard (or under **Project Settings** > **Environment Variables** after creation), Cloudflare allows you to define distinct variables for **Production** and **Preview**:

##### Production Tab (`main` branch)

```env
NODE_VERSION = 20
VITE_GOVERNMENT_NAME = BetterMorong
VITE_WEBSITE_URL = https://bettermorong.org
VITE_CONTACT_EMAIL = info@morongrizal.gov.ph
VITE_CONTACT_PHONE = (02) 7212-5741
VITE_OG_IMAGE_URL = /og-image.png
```

##### Preview Tab (`staging` and pull request branches)

```env
NODE_VERSION = 20
VITE_GOVERNMENT_NAME = BetterMorong (Staging)
VITE_WEBSITE_URL = https://staging-bettermorong.pages.dev
VITE_CONTACT_EMAIL = info@morongrizal.gov.ph
VITE_CONTACT_PHONE = (02) 7212-5741
VITE_OG_IMAGE_URL = /og-image.png
```

> [!NOTE]
> The project already includes `.env.production` and `.env.staging` in the repository. Cloudflare's Vite build runner will automatically load `.env.production` for production builds and `.env.staging` for staging builds.

#### Step 5: Save and Deploy

Click **Save and Deploy**. Cloudflare Pages will execute the build in ~1–2 minutes.

---

### Method 2: Direct Command Line Deployment via Wrangler CLI

If you prefer deploying directly from your local terminal or a self-hosted CI pipeline without linking GitHub, use the pre-configured pnpm scripts.

#### Prerequisites: Login to Wrangler (One-time)

```powershell
pnpm dlx wrangler login
```

A browser window will open asking you to authorize Wrangler with your Cloudflare account.

#### A. Deploying to Staging (Preview)

To compile using `.env.staging` and deploy to the `staging` branch alias:

```powershell
pnpm pages:deploy:staging
```

- **Output**: Generates a dedicated preview URL, typically `https://staging-bettermorong.pages.dev` or `https://<unique-hash>.bettermorong.pages.dev`.
- **Search Protection**: Cloudflare automatically serves `X-Robots-Tag: noindex` on preview deployments so Google won't index unfinished work.

#### B. Deploying to Production

To compile using `.env.production` and deploy live to the production domain:

```powershell
pnpm pages:deploy:prod
```

- **Output**: Publishes directly to `https://bettermorong.pages.dev` and any linked custom domains (`https://bettermorong.org`).

#### C. Local Cloudflare Edge Simulation

To test the exact production build on your local machine with Cloudflare edge headers and redirects simulated:

```powershell
pnpm pages:preview
```

This serves `dist/` at `http://localhost:8788`.

---

## 🌐 Custom Domain Setup (`.gov.ph`)

Once your Cloudflare Pages project is running, connect your official municipal domain:

### 1. In Cloudflare Pages Dashboard

1. Go to your `bettermorong` project in the Cloudflare Dashboard.
2. Navigate to **Custom domains** > **Set up a custom domain**.
3. Enter your domain: `morongrizal.gov.ph` (and optionally `www.morongrizal.gov.ph`).
4. (Optional) Repeat for staging: `staging.morongrizal.gov.ph`.

### 2. Configure DNS Records in Your Domain Registrar

If your DNS is managed in Cloudflare, Pages configures the DNS CNAME records automatically.

If your DNS is managed by an external registrar (e.g., DICT GovNet or external nameservers):

- Add a **CNAME** record:
  - **Host / Name**: `@` (or `morongrizal.gov.ph`)
  - **Target**: `bettermorong.pages.dev`
- For staging:
  - **Host / Name**: `staging`
  - **Target**: `bettermorong.pages.dev`

Cloudflare will automatically issue and renew a free Universal SSL/TLS certificate.

---

## ⚙️ Edge Configuration Files (`_redirects` & `_headers`)

Cloudflare Pages automatically reads two configuration files located in the `public/` directory (copied to `dist/` upon build):

### 1. Client-Side Routing: `public/_redirects`

Single Page Applications (React Router) require all subroutes (e.g. `/government/about-morong`, `/philippines/holidays`, `/services`) to return `index.html` with an HTTP 200 status code:

```text
# Cloudflare Pages SPA rewrite rules
/*    /index.html   200
```

Without this rule, refreshing any deep page in the browser would result in a Cloudflare 404 error.

### 2. Edge Performance & Security: `public/_headers`

Enforces browser and CDN caching policies alongside security best practices:

```text
# Global security and privacy headers
/*
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()

# Cache hashed production static assets for 1 year (immutable)
/assets/*
  Cache-Control: public, max-age=31536000, immutable

# Ensure HTML shell, manifest, and service worker always revalidate immediately
/*.html
  Cache-Control: public, max-age=0, must-revalidate

/sw.js
  Cache-Control: public, max-age=0, must-revalidate

/manifest.webmanifest
  Cache-Control: public, max-age=0, must-revalidate

# Revalidate sitemap and robots daily
/sitemap.xml
  Cache-Control: public, max-age=86400, must-revalidate

/robots.txt
  Cache-Control: public, max-age=86400, must-revalidate
```

---

## 🔄 Alternative Platforms (Vercel, Netlify, AWS S3)

While Cloudflare Pages is recommended, BetterMorong is a standards-compliant static Vite app that can be hosted on any static cloud provider.

### Option A: Vercel

1. Import repository at [vercel.com/new](https://vercel.com/new).
2. Framework Preset: **Vite**.
3. Build Command: `npm run build`.
4. Output Directory: `dist`.
5. Add `vercel.json` if SPA rewriting is needed:
   ```json
   {
     "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
   }
   ```

### Option B: Netlify

1. Connect Git repository at [app.netlify.com](https://app.netlify.com).
2. Build command: `npm run build`.
3. Publish directory: `dist`.
4. Netlify automatically reads the existing `public/_redirects` and `public/_headers` files.

### Option C: AWS S3 + CloudFront

1. Build locally: `npm run build`.
2. Sync `dist/` to an S3 bucket: `aws s3 sync dist/ s3://your-bucket-name --delete`.
3. Configure CloudFront Distribution with Custom Error Response:
   - HTTP Error Code: `404`
   - Response Page Path: `/index.html`
   - HTTP Response Code: `200`

---

## 📋 Pre-Deployment QA Checklist

Before pointing production traffic to your live domain, verify the following:

- [ ] **Build Verification**: Run `npm run build` locally and ensure it exits with code 0.
- [ ] **Staging Verification**: Deploy to staging (`npm run pages:deploy:staging`) and review layout and features on mobile and desktop.
- [ ] **SEO & Sitemaps**: Confirm `sitemap.xml` and `robots.txt` are reachable at the root URL.
- [ ] **PWA & Offline Assets**: Open Chrome DevTools > Application > Service Workers to confirm `sw.js` registers successfully.
- [ ] **Emergency Contacts**: Test all one-tap `tel:` emergency hotlines (MDRRMO, Police, Fire, 911).
- [ ] **Search Autocomplete**: Verify the search bar in the Hero returns results without layout clipping.
- [ ] **Custom Domain SSL**: Confirm HTTPS padlocks and HSTS headers are active on `https://bettermorong.org`.
