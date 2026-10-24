# BetterMorong Technical Documentation

Welcome to the engineering and design documentation for **BetterMorong**, the open-source citizen portal for the **Municipality of Morong, Rizal, Philippines**.

---

## Documentation Index

| Guide                                                    | Description                                                                                              | Key Topics                                                                       |
| :------------------------------------------------------- | :------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------- |
| 🏛️ **[Brand & Civic Identity](brand.md)**                | Core brand values, tone of voice, visual assets, and the Anti-Epal compliance doctrine.                  | Mission, Anti-Epal Rules, SVG Assets, Bilingual Tone, Heritage Symbolism         |
| 🎨 **[Color Palette & Design Tokens](color-palette.md)** | Comprehensive color specification, design tokens, status tokens, and WCAG contrast standards.            | Primary Blue, Terracotta, Civic Gold, Semantic Statuses, `@media print`          |
| ⚙️ **[System Architecture](system-architecture.md)**     | Technical architecture, PWA offline caching, data pipelines, client-side persistence, and edge security. | React 19, Vite 8, Workbox PWA, Checklist Engine, Tax Estimator, Cloudflare Pages |
| 🔍 **[Search & Meilisearch Indexing](meilisearch.md)**   | Setup, configuration, and maintenance for full-text search indexing across civic content.                | Meilisearch Setup, Docker, Search Index Script, Fallbacks                        |

---

## Contributing to Documentation

When adding new guides or updating existing documentation:

1. Adhere to the **Anti-Epal rule**: Credit public municipal institutions only; never include politician names or portraits.
2. Maintain bilingual parity for user-facing features (`en` and `fil`).
3. Ensure LaTeX equations and Mermaid diagrams follow project formatting standards.
4. Run `pnpm run format` to ensure markdown styling passes Prettier verification.
