#!/usr/bin/env node

/**
 * Generate Environment Files (.env.local, .env.staging, .env.production, .env.example)
 *
 * Automatically populates environment variables using existing project details
 * for BetterMorong (Municipality of Morong, Rizal).
 *
 * Usage:
 *   node scripts/generate-env.mjs                   # Generates all .env files automatically
 *   node scripts/generate-env.mjs --env=local      # Generates only .env.local
 *   node scripts/generate-env.mjs --env=staging    # Generates only .env.staging
 *   node scripts/generate-env.mjs --env=production # Generates only .env.production
 *   node scripts/generate-env.mjs --interactive    # Prompt to review or override values
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import readline from 'node:readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Parse CLI flags
const args = process.argv.slice(2);
const isInteractive = args.includes('--interactive') || args.includes('-i');
const envFlag = args.find(arg => arg.startsWith('--env='));
const targetEnv = envFlag ? envFlag.split('=')[1] : null;

// Helper: Parse existing .env file into key-value map
function parseExistingEnv(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const content = fs.readFileSync(filePath, 'utf8');
  const result = {};
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const match = trimmed.match(/^([A-Z0-9_]+)=(.*)$/);
    if (match) {
      let val = match[2].trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      result[match[1]] = val;
    }
  }
  return result;
}

// Read current overrides from .env.local if present
const currentLocal = parseExistingEnv(path.join(projectRoot, '.env.local'));

// Canonical details for BetterMorong
const defaultBaseConfig = {
  GOVERNMENT_NAME: 'BetterMorong',
  GOVERNMENT_TYPE: 'Municipality',
  REGION: 'Region IV-A',
  PROVINCE: 'Rizal',
  CONTACT_EMAIL: currentLocal.VITE_CONTACT_EMAIL || 'info@morongrizal.gov.ph',
  CONTACT_PHONE: currentLocal.VITE_CONTACT_PHONE || '(02) 7212-5741',
  FACEBOOK_URL:
    currentLocal.VITE_FACEBOOK_URL ||
    'https://www.facebook.com/bettermorong.org',
  TWITTER_HANDLE: currentLocal.VITE_TWITTER_HANDLE || '@bettermorong',
};

// Environment configurations
function getEnvConfigurations(base) {
  const prodDescription =
    'Citizen-first portal of the Municipality of Morong, Rizal. Direct access to public services, offices, ordinances, and 24/7 emergency hotlines.';
  const prodKeywords =
    'government, local government, services, municipality of morong, rizal, bettermorong, morong';

  return {
    local: {
      fileName: '.env.local',
      title: 'Local Development Environment (.env.local)',
      vars: {
        VITE_APP_ENV: 'local',
        VITE_GOVERNMENT_NAME: base.GOVERNMENT_NAME,
        VITE_GOVERNMENT_TYPE: base.GOVERNMENT_TYPE,
        VITE_REGION: base.REGION,
        VITE_PROVINCE: base.PROVINCE,
        VITE_WEBSITE_URL: 'http://localhost:5173',
        VITE_CONTACT_EMAIL: base.CONTACT_EMAIL,
        VITE_CONTACT_PHONE: base.CONTACT_PHONE,
        VITE_FACEBOOK_URL: base.FACEBOOK_URL,
        VITE_TWITTER_HANDLE: base.TWITTER_HANDLE,
        VITE_SITE_DESCRIPTION: prodDescription,
        VITE_SITE_KEYWORDS: prodKeywords,
        VITE_OG_IMAGE_URL: 'http://localhost:5173/og-image.png',
      },
    },
    staging: {
      fileName: '.env.staging',
      title: 'Staging Environment (.env.staging)',
      vars: {
        VITE_APP_ENV: 'staging',
        VITE_GOVERNMENT_NAME: `${base.GOVERNMENT_NAME} (Staging)`,
        VITE_GOVERNMENT_TYPE: base.GOVERNMENT_TYPE,
        VITE_REGION: base.REGION,
        VITE_PROVINCE: base.PROVINCE,
        VITE_WEBSITE_URL: 'https://staging.bettermorong.org',
        VITE_CONTACT_EMAIL: base.CONTACT_EMAIL,
        VITE_CONTACT_PHONE: base.CONTACT_PHONE,
        VITE_FACEBOOK_URL: base.FACEBOOK_URL,
        VITE_TWITTER_HANDLE: base.TWITTER_HANDLE,
        VITE_SITE_DESCRIPTION:
          'Staging preview of BetterMorong civic portal. For testing, QA, and content verification purposes only.',
        VITE_SITE_KEYWORDS: 'BetterMorong staging, preview, morong rizal',
        VITE_OG_IMAGE_URL: 'https://staging.bettermorong.org/og-image.png',
      },
    },
    production: {
      fileName: '.env.production',
      title: 'Production Environment (.env.production)',
      vars: {
        VITE_APP_ENV: 'production',
        VITE_GOVERNMENT_NAME: base.GOVERNMENT_NAME,
        VITE_GOVERNMENT_TYPE: base.GOVERNMENT_TYPE,
        VITE_REGION: base.REGION,
        VITE_PROVINCE: base.PROVINCE,
        VITE_WEBSITE_URL: 'https://bettermorong.org',
        VITE_CONTACT_EMAIL: base.CONTACT_EMAIL,
        VITE_CONTACT_PHONE: base.CONTACT_PHONE,
        VITE_FACEBOOK_URL: base.FACEBOOK_URL,
        VITE_TWITTER_HANDLE: base.TWITTER_HANDLE,
        VITE_SITE_DESCRIPTION: prodDescription,
        VITE_SITE_KEYWORDS: prodKeywords,
        VITE_OG_IMAGE_URL: 'https://bettermorong.org/og-image.png',
      },
    },
    example: {
      fileName: '.env.example',
      title: 'Template / Example Environment (.env.example)',
      vars: {
        VITE_APP_ENV: 'local',
        VITE_GOVERNMENT_NAME: 'BetterMorong',
        VITE_GOVERNMENT_TYPE: 'Municipality',
        VITE_REGION: 'Region IV-A',
        VITE_PROVINCE: 'Rizal',
        VITE_WEBSITE_URL: 'http://localhost:5173',
        VITE_CONTACT_EMAIL: 'info@morongrizal.gov.ph',
        VITE_CONTACT_PHONE: '(02) 7212-5741',
        VITE_FACEBOOK_URL: 'https://www.facebook.com/bettermorong.org',
        VITE_TWITTER_HANDLE: '@bettermorong',
        VITE_SITE_DESCRIPTION:
          'Citizen-first portal of the Municipality of Morong, Rizal.',
        VITE_SITE_KEYWORDS:
          'government, local government, services, municipality of morong, rizal',
        VITE_OG_IMAGE_URL: '/og-image.png',
      },
    },
  };
}

// Generate formatted .env file string
function formatEnvFile(title, vars) {
  return `# ==============================================================================
# BetterMorong — ${title}
# Generated automatically by scripts/generate-env.mjs
# ==============================================================================

# Application Environment Mode ('local' | 'staging' | 'production')
VITE_APP_ENV="${vars.VITE_APP_ENV}"

# Government Information
VITE_GOVERNMENT_NAME="${vars.VITE_GOVERNMENT_NAME}"
VITE_GOVERNMENT_TYPE="${vars.VITE_GOVERNMENT_TYPE}"
VITE_REGION="${vars.VITE_REGION}"
VITE_PROVINCE="${vars.VITE_PROVINCE}"

# Website & Contact Information
VITE_WEBSITE_URL="${vars.VITE_WEBSITE_URL}"
VITE_CONTACT_EMAIL="${vars.VITE_CONTACT_EMAIL}"
VITE_CONTACT_PHONE="${vars.VITE_CONTACT_PHONE}"

# Social Media Channels
VITE_FACEBOOK_URL="${vars.VITE_FACEBOOK_URL}"
VITE_TWITTER_HANDLE="${vars.VITE_TWITTER_HANDLE}"

# SEO & Metadata
VITE_SITE_DESCRIPTION="${vars.VITE_SITE_DESCRIPTION}"
VITE_SITE_KEYWORDS="${vars.VITE_SITE_KEYWORDS}"
VITE_OG_IMAGE_URL="${vars.VITE_OG_IMAGE_URL}"

# Optional Search Engine Integration (Meilisearch)
# VITE_MEILISEARCH_HOST="http://localhost:7700"
# VITE_MEILISEARCH_SEARCH_KEY=""
`;
}

// Interactive prompt helper
function promptUser(rl, question, defaultValue) {
  return new Promise(resolve => {
    const query = defaultValue
      ? `${question} [${defaultValue}]: `
      : `${question}: `;
    rl.question(query, answer => {
      resolve(answer.trim() || defaultValue);
    });
  });
}

async function run() {
  console.log('\n🏛️  BetterMorong Environment File Generator');
  console.log('============================================\n');

  let baseConfig = { ...defaultBaseConfig };

  if (isInteractive) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    console.log('Press [Enter] to keep current default value.\n');
    baseConfig.GOVERNMENT_NAME = await promptUser(
      rl,
      'Government Name',
      baseConfig.GOVERNMENT_NAME
    );
    baseConfig.GOVERNMENT_TYPE = await promptUser(
      rl,
      'Government Type',
      baseConfig.GOVERNMENT_TYPE
    );
    baseConfig.REGION = await promptUser(rl, 'Region', baseConfig.REGION);
    baseConfig.PROVINCE = await promptUser(rl, 'Province', baseConfig.PROVINCE);
    baseConfig.CONTACT_EMAIL = await promptUser(
      rl,
      'Contact Email',
      baseConfig.CONTACT_EMAIL
    );
    baseConfig.CONTACT_PHONE = await promptUser(
      rl,
      'Contact Phone',
      baseConfig.CONTACT_PHONE
    );
    baseConfig.FACEBOOK_URL = await promptUser(
      rl,
      'Facebook URL',
      baseConfig.FACEBOOK_URL
    );

    rl.close();
    console.log('\nGenerating environment files...\n');
  } else {
    console.log(
      'Using pre-configured BetterMorong details (non-interactive mode).'
    );
    console.log(
      'Tip: Run with "--interactive" if you want to customize fields individually.\n'
    );
  }

  const configs = getEnvConfigurations(baseConfig);
  const targets = targetEnv
    ? [targetEnv]
    : ['local', 'staging', 'production', 'example'];

  for (const envKey of targets) {
    const config = configs[envKey];
    if (!config) {
      console.error(
        `❌ Unknown environment: "${envKey}". Valid options: local, staging, production, example`
      );
      continue;
    }

    const filePath = path.join(projectRoot, config.fileName);
    const content = formatEnvFile(config.title, config.vars);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Generated ${config.fileName} (${config.title})`);
  }

  console.log('\n🎉 All environment files generated successfully!\n');
}

run().catch(err => {
  console.error('Error generating environment files:', err);
  process.exit(1);
});
