import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';
import Sitemap from 'vite-plugin-sitemap';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import websiteVersion from './web-version.json' with { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to dynamically discover all routes from content/ and static pages
function getAllRoutes(): string[] {
  const routes: string[] = [
    '/',
    '/services',
    '/government',
    '/government/departments',
    '/government/ordinances-and-resolutions',
    '/government/transparency-documents',
    '/government/about-morong',
    '/philippines-hotlines',
    '/philippines-holidays',
    '/search',
    '/sitemap',
    '/accessibility',
    '/join-us',
  ];

  try {
    const servicesDir = path.resolve(__dirname, 'content/services');
    if (fs.existsSync(servicesDir)) {
      const cats = fs.readdirSync(servicesDir);
      for (const cat of cats) {
        const catPath = path.join(servicesDir, cat);
        if (fs.statSync(catPath).isDirectory()) {
          routes.push(`/services/${cat}`);
          const files = fs.readdirSync(catPath);
          for (const file of files) {
            if (file.endsWith('.md')) {
              routes.push(`/services/${cat}/${file.replace('.md', '')}`);
            }
          }
        }
      }
    }

    const govDir = path.resolve(__dirname, 'content/government');
    if (fs.existsSync(govDir)) {
      const cats = fs.readdirSync(govDir);
      for (const cat of cats) {
        const catPath = path.join(govDir, cat);
        if (fs.statSync(catPath).isDirectory()) {
          if (!routes.includes(`/government/${cat}`)) {
            routes.push(`/government/${cat}`);
          }
          const files = fs.readdirSync(catPath);
          for (const file of files) {
            if (file.endsWith('.md')) {
              routes.push(`/government/${cat}/${file.replace('.md', '')}`);
            }
          }
        }
      }
    }
  } catch (err) {
    console.warn('Error discovering routes for sitemap:', err);
  }

  return Array.from(new Set(routes));
}

const allRoutes = getAllRoutes();

// https://vite.dev/config/
export default defineConfig({
  define: {
    'import.meta.env.VITE_WEB_VERSION': JSON.stringify(websiteVersion.version),
  },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'favicon.svg',
        'morong-pfp.png',
        'Morong-Logo.svg',
        'morong-logo-nobg.svg',
        'morong-simbahan.svg',
        'og-image.png',
      ],
      manifest: {
        name: 'BetterMorong — Municipality of Morong, Rizal',
        short_name: 'BetterMorong',
        description:
          'Citizen-first portal of the Municipality of Morong, Rizal. Direct access to public services, offices, ordinances, and 24/7 emergency hotlines.',
        theme_color: '#1E40AF',
        background_color: '#FFFFFF',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any',
          },
          {
            src: '/morong-pfp.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/Morong-Logo.svg',
            sizes: '192x192 512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
          {
            src: '/og-image.png',
            sizes: '1200x630',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globPatterns: [
          '**/*.{js,css,html,svg,png,jpg,jpeg,json,woff2,txt,ico,xml,webmanifest}',
        ],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.open-meteo\.com\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'weather-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 15, // 15 minutes
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'google-fonts-stylesheets',
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
            },
          },
        ],
      },
    }),
    Sitemap({
      hostname: 'https://staging.bettermorong.org',
      dynamicRoutes: allRoutes,
      exclude: ['/og-image-template'],
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date(),
      readable: true,
      generateRobotsTxt: true,
      robots: [
        {
          userAgent: '*',
          allow: '/',
        },
        {
          userAgent: 'Googlebot',
          allow: '/',
        },
        {
          userAgent: 'Bingbot',
          allow: '/',
        },
        {
          userAgent: 'Applebot',
          allow: '/',
        },
      ],
    }),
  ],
  assetsInclude: ['**/*.md'],
});
