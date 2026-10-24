#!/usr/bin/env node

/**
 * Municipal Public Documents & BAC Procurement Indexer
 * Queries https://morongrizal.gov.ph/wp-json/wp/v2/media for public PDFs,
 * classifies documents into civic transparency categories, tags barangays,
 * and outputs structured JSON for LguDocumentsExplorer.
 *
 * Usage:
 *   node scripts/fetch-morong-bac.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const OUTPUT_FILE = path.join(
  ROOT_DIR,
  'content/government/transparency-documents/lgu-public-documents-index.json'
);

const BASE_URL = 'https://morongrizal.gov.ph/wp-json/wp/v2';
const USER_AGENT =
  'BetterMorong-Civic-Indexer/1.3 (+https://bettermorong.org; civic-transparency)';

const BARANGAYS = [
  'Bombongan',
  'Caniogan',
  'Calero',
  'Lanang',
  'Lagundi',
  'Maybancal',
  'San Guillermo',
  'San Jose',
  'San Juan',
  'San Pedro',
];

function decodeHtmlEntities(str) {
  if (!str) return '';
  return str
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#038;/g, '&')
    .replace(/&amp;/g, '&')
    .trim();
}

function classifyDocument(title, slug, url) {
  const text = `${title} ${slug} ${url}`.toLowerCase();

  if (/notice\s*of\s*award|\bnoa\b/i.test(text)) {
    return { category: 'notice-of-award', label: 'Notice of Award (NOA)' };
  }
  if (/notice\s*to\s*proceed|\bntp\b/i.test(text)) {
    return {
      category: 'notice-to-proceed',
      label: 'Notice to Proceed (NTP)',
    };
  }
  if (
    /invitation\s*to\s*bid|\bitb\b|bidding|bid\s*notice|itb[-_\d]|mrofdlitb/i.test(
      text
    )
  ) {
    return {
      category: 'invitation-to-bid',
      label: 'Invitation to Bid (ITB)',
    };
  }
  if (
    /bidding\s*documents?|terms\s*of\s*reference|\btor\b|\bprs\b/i.test(text)
  ) {
    return {
      category: 'bidding-documents',
      label: 'Bidding Documents & TOR',
    };
  }
  if (/citizen(?:'?s)?\s*charter/i.test(text)) {
    return {
      category: 'citizens-charter',
      label: "Citizen's Charter",
    };
  }
  if (
    /application\s*form|permit\s*application|permit\s*form|arta\s*form|\bform\b|requirements\s*for\s*application|procedure\s*for\s*bldg|permit\s*requirements|\bpermit\b/i.test(
      text
    )
  ) {
    return {
      category: 'application-form',
      label: 'Application & Permit Form',
    };
  }
  if (/executive\s*order|\beo\b\s*\d+/i.test(text)) {
    return {
      category: 'executive-order',
      label: 'Executive Order (EO)',
    };
  }
  if (/ordinance|resolution|\bsb\s*res/i.test(text)) {
    return {
      category: 'ordinance-resolution',
      label: 'Ordinance / Resolution',
    };
  }
  if (
    /falgu|lgsf|drrap|cpmr|\bpmr\b|procurement\s*monitoring|quarterly\s*report|monthly\s*report|budget|financial|sre|annual\s*report|balance\s*sheet|aip\s*final/i.test(
      text
    )
  ) {
    return {
      category: 'financial-disclosure',
      label: 'Financial & Procurement Report',
    };
  }

  return {
    category: 'other-public-document',
    label: 'Public Document',
  };
}

function detectBarangays(text) {
  const found = new Set();
  const normalized = text.toLowerCase();
  for (const b of BARANGAYS) {
    if (normalized.includes(b.toLowerCase())) {
      found.add(b);
    }
  }
  return Array.from(found);
}

function detectYear(title, dateStr, url) {
  const matchTitle = (title + ' ' + url).match(/\b(201\d|202\d)\b/);
  if (matchTitle) return matchTitle[1];
  if (dateStr) {
    const d = new Date(dateStr);
    if (!isNaN(d.getFullYear())) return String(d.getFullYear());
  }
  return 'Unknown';
}

async function fetchJson(url) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s timeout
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': USER_AGENT,
        Accept: 'application/json',
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }
    const totalPages = parseInt(res.headers.get('x-wp-totalpages') || '1', 10);
    const totalItems = parseInt(res.headers.get('x-wp-total') || '0', 10);
    const data = await res.json();
    return { data, totalPages, totalItems };
  } finally {
    clearTimeout(timeoutId);
  }
}

async function main() {
  console.log('📡 Fetching public documents from morongrizal.gov.ph WP API...');

  let mediaItems = [];
  try {
    let page = 1;
    let totalPages = 1;

    while (page <= totalPages) {
      console.log(`  -> Fetching media page ${page}/${totalPages}...`);
      const endpoint = `${BASE_URL}/media?mime_type=application/pdf&per_page=100&page=${page}`;
      const result = await fetchJson(endpoint);
      if (Array.isArray(result.data)) {
        mediaItems.push(...result.data);
      }
      totalPages = result.totalPages || 1;
      page++;
    }

    console.log(
      `✅ Retrieved ${mediaItems.length} PDF media records from LGU portal.`
    );
  } catch (err) {
    console.warn(
      `⚠️ Warning: Could not fetch from remote API (${err.message}).`
    );
    if (fs.existsSync(OUTPUT_FILE)) {
      console.log('ℹ️ Preserving existing public documents index.');
      return;
    }
    console.log('ℹ️ Generating fallback seed index.');
  }

  // Normalize and transform
  const documents = mediaItems
    .filter(item => item.source_url && item.source_url.endsWith('.pdf'))
    .map(item => {
      const rawTitle = item.title?.rendered || item.slug || 'Public Document';
      const cleanTitle = decodeHtmlEntities(rawTitle);
      const url = item.source_url;
      const slug = item.slug || '';
      const classification = classifyDocument(cleanTitle, slug, url);
      const date = item.date ? item.date.split('T')[0] : '';
      const year = detectYear(cleanTitle, item.date, url);
      const barangays = detectBarangays(`${cleanTitle} ${slug}`);

      return {
        id: String(item.id),
        title: cleanTitle,
        slug,
        category: classification.category,
        categoryLabel: classification.label,
        date,
        year,
        fileUrl: url,
        fileSize: item.media_details?.filesize || null,
        barangays,
      };
    });

  // Sort deterministically: Latest date first, then by title
  documents.sort((a, b) => {
    if (b.date && a.date && b.date !== a.date) {
      return b.date.localeCompare(a.date);
    }
    return a.title.localeCompare(b.title);
  });

  // Calculate summary categories
  const categorySummary = {};
  for (const doc of documents) {
    categorySummary[doc.category] = (categorySummary[doc.category] || 0) + 1;
  }

  const payload = {
    metadata: {
      generatedAt: new Date().toISOString(),
      source: 'https://morongrizal.gov.ph',
      totalDocuments: documents.length,
      categoryCounts: categorySummary,
      availableYears: Array.from(
        new Set(documents.map(d => d.year).filter(y => y !== 'Unknown'))
      )
        .sort()
        .reverse(),
    },
    documents,
  };

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(
    OUTPUT_FILE,
    JSON.stringify(payload, null, 2) + '\n',
    'utf8'
  );

  console.log(`💾 Saved ${documents.length} indexed documents to:`);
  console.log(`   ${path.relative(ROOT_DIR, OUTPUT_FILE)}`);
}

main().catch(err => {
  console.error('Fatal error during sync:', err);
  process.exit(1);
});
