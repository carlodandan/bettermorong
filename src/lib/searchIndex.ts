import * as yaml from 'js-yaml';
import {
  serviceCategories,
  governmentCategories,
  type Category,
  type CategoryIndexData,
} from '../data/yamlLoader';

// Raw YAML content imports
import healthServicesIndex from '../../content/services/health-services/index.yaml?raw';
import educationIndex from '../../content/services/education/index.yaml?raw';
import businessIndex from '../../content/services/business/index.yaml?raw';
import socialWelfareIndex from '../../content/services/social-welfare/index.yaml?raw';
import agricultureFisheriesIndex from '../../content/services/agriculture-fisheries/index.yaml?raw';
import infrastructurePublicWorksIndex from '../../content/services/infrastructure-public-works/index.yaml?raw';
import garbageWasteDisposalIndex from '../../content/services/garbage-waste-disposal/index.yaml?raw';
import environmentIndex from '../../content/services/environment/index.yaml?raw';
import disasterPreparednessIndex from '../../content/services/disaster-preparedness/index.yaml?raw';
import housingLandUseIndex from '../../content/services/housing-land-use/index.yaml?raw';
import governmentDepartmentsIndex from '../../content/government/departments/index.yaml?raw';
import governmentTransparencyDocumentsIndex from '../../content/government/transparency-documents/index.yaml?raw';
import governmentOrdinancesResolutionsIndex from '../../content/government/ordinances-and-resolutions/index.yaml?raw';
import governmentAboutMorongIndex from '../../content/government/about-morong/index.yaml?raw';

export interface SearchItem {
  id: string;
  title: string;
  description: string;
  category: string;
  categorySlug: string;
  url: string;
  type: 'service' | 'government' | 'emergency';
  keywords?: string[];
}

const serviceIndexYamls: Record<string, string> = {
  'health-services': healthServicesIndex,
  education: educationIndex,
  business: businessIndex,
  'social-welfare': socialWelfareIndex,
  'agriculture-fisheries': agricultureFisheriesIndex,
  'infrastructure-public-works': infrastructurePublicWorksIndex,
  'garbage-waste-disposal': garbageWasteDisposalIndex,
  environment: environmentIndex,
  'disaster-preparedness': disasterPreparednessIndex,
  'housing-land-use': housingLandUseIndex,
};

const governmentIndexYamls: Record<string, string> = {
  departments: governmentDepartmentsIndex,
  'transparency-documents': governmentTransparencyDocumentsIndex,
  'ordinances-and-resolutions': governmentOrdinancesResolutionsIndex,
  'about-morong': governmentAboutMorongIndex,
};

function parseYamlPages(
  raw: string
): Array<{ name: string; slug: string; description?: string }> {
  try {
    const parsed = yaml.load(raw) as CategoryIndexData;
    return parsed?.pages || [];
  } catch {
    return [];
  }
}

// Emergency Hotlines for Morong, Rizal & National Philippines Directory
const emergencyItems: SearchItem[] = [
  {
    id: 'emergency-hotlines-hub',
    title: 'Philippines & Morong Emergency Hotlines Directory',
    description:
      'Complete directory of 24/7 emergency dispatch, disaster rescue, police, fire, utilities, mental health, and social services hotlines.',
    category: 'Emergency & Hotlines',
    categorySlug: 'hotlines',
    url: '/philippines-hotlines',
    type: 'emergency',
    keywords: [
      'hotlines',
      'emergency numbers',
      'contact directory',
      'national hotlines',
      'phone numbers',
      'dispatch',
    ],
  },
  {
    id: 'emergency-mdrrmo',
    title: 'Morong MDRRMO 24/7 Operations Center',
    description:
      'Disaster management, rescue dispatch, emergency ambulance, and flood response. Call 0917-135-0541 / 0919-081-7181 / (02) 7212-5741.',
    category: 'Emergency & Hotlines',
    categorySlug: 'hotlines',
    url: '/philippines-hotlines',
    type: 'emergency',
    keywords: [
      'mdrrmo',
      'rescue',
      'ambulance',
      'flood',
      'calamity',
      'evacuation',
      'emergency',
      'hotline',
      'disaster',
    ],
  },
  {
    id: 'emergency-pnp',
    title: 'Morong Municipal Police Station (PNP)',
    description:
      'Police assistance, public safety, crime reporting, and peace & order. Call 0906-513-0718 / 0998-598-5725.',
    category: 'Emergency & Hotlines',
    categorySlug: 'hotlines',
    url: '/philippines-hotlines',
    type: 'emergency',
    keywords: [
      'police',
      'pnp',
      'crime',
      'blotter',
      'security',
      'safety',
      'investigation',
      'patrol',
    ],
  },
  {
    id: 'emergency-bfp',
    title: 'Morong Fire Station (Bureau of Fire Protection)',
    description:
      'Fire suppression, arson investigation, and fire emergency response. Call 0908-441-7754 / 0945-710-6766.',
    category: 'Emergency & Hotlines',
    categorySlug: 'hotlines',
    url: '/philippines-hotlines',
    type: 'emergency',
    keywords: [
      'fire',
      'bfp',
      'sunog',
      'bombero',
      'arson',
      'firetruck',
      'inspection',
    ],
  },
  {
    id: 'emergency-911',
    title: 'National Emergency Hotline 911',
    description:
      'Nationwide 24/7 emergency hotline dispatch connecting to local police, medical, and fire units.',
    category: 'Emergency & Hotlines',
    categorySlug: 'hotlines',
    url: '/philippines-hotlines',
    type: 'emergency',
    keywords: ['911', 'emergency', 'dispatch', 'hotline', 'urgent'],
  },
  {
    id: 'emergency-8888',
    title: "8888 Citizens' Complaint Hotline",
    description:
      'National government public grievance hotline for reporting bureaucratic red tape, corruption, and slow services.',
    category: 'Emergency & Hotlines',
    categorySlug: 'hotlines',
    url: '/philippines-hotlines',
    type: 'emergency',
    keywords: [
      '8888',
      'complaint',
      'red tape',
      'arta',
      'grievance',
      'corruption',
    ],
  },
  {
    id: 'emergency-red-cross',
    title: 'Philippine Red Cross Hotline 143',
    description:
      'Emergency ambulance, disaster relief, blood donation inquiries, and search and rescue. Dial 143 or (02) 8790-2300.',
    category: 'Emergency & Hotlines',
    categorySlug: 'hotlines',
    url: '/philippines-hotlines',
    type: 'emergency',
    keywords: ['red cross', '143', 'blood', 'ambulance', 'disaster relief'],
  },
  {
    id: 'emergency-ncmh',
    title: 'National Center for Mental Health (NCMH) 1553',
    description:
      'Free, confidential 24/7 mental health crisis hotline, psychological counseling, and emotional support. Dial 1553 or 0917-899-8727.',
    category: 'Emergency & Hotlines',
    categorySlug: 'hotlines',
    url: '/philippines-hotlines',
    type: 'emergency',
    keywords: [
      'mental health',
      '1553',
      'suicide',
      'counseling',
      'depression',
      'psychological',
      'ncmh',
    ],
  },
  {
    id: 'emergency-meralco',
    title: 'Meralco 24/7 Power Emergency 16211',
    description:
      'Report power outages, fallen electric poles, damaged transformers, and electrical hazards in Morong, Rizal.',
    category: 'Emergency & Hotlines',
    categorySlug: 'hotlines',
    url: '/philippines-hotlines',
    type: 'emergency',
    keywords: [
      'meralco',
      'kuryente',
      'blackout',
      'brownout',
      'power outage',
      'electric',
      '16211',
    ],
  },
];

const holidayItems: SearchItem[] = [
  {
    id: 'holidays-philippines-morong',
    title: 'Philippines & Morong Official Holidays Calendar',
    description:
      'Comprehensive schedule of nationwide regular holidays, special non-working days, and Morong/Rizal local holidays with DOLE wage compensation rules.',
    category: 'Government',
    categorySlug: 'holidays',
    url: '/philippines-holidays',
    type: 'government',
    keywords: [
      'holidays',
      'walang pasok',
      'regular holiday',
      'special non-working',
      'long weekend',
      'dole pay',
      'calendar',
      'rizal day',
      'bonifacio day',
      'national heroes',
      'sanrok festival',
    ],
  },
  {
    id: 'holidays-dole-pay-rules',
    title: 'DOLE Holiday Pay Rules & Worker Entitlements',
    description:
      'Official wage computation for regular holidays (200%) and special non-working days (130%), rest day premiums, and overtime labor standards.',
    category: 'Government',
    categorySlug: 'holidays',
    url: '/philippines-holidays',
    type: 'government',
    keywords: [
      'dole holiday pay',
      'holiday wage',
      'overtime pay',
      'sweldo sa holiday',
      'regular holiday computation',
      'special holiday pay',
    ],
  },
  {
    id: 'holidays-rizal-foundation-day',
    title: 'Araw ng Lalawigan ng Rizal (Rizal Foundation Day - June 11)',
    description:
      'Official special non-working holiday for the Province of Rizal including Morong under Republic Act No. 11144.',
    category: 'Government',
    categorySlug: 'holidays',
    url: '/philippines-holidays',
    type: 'government',
    keywords: [
      'araw ng rizal',
      'rizal foundation day',
      'june 11',
      'ra 11144',
      'morong holiday',
    ],
  },
];

// Build comprehensive searchable dataset
function buildSearchIndex(): SearchItem[] {
  const items: SearchItem[] = [...emergencyItems, ...holidayItems];

  // 1. Service Categories & Subpages
  for (const cat of (serviceCategories?.categories || []) as Category[]) {
    // Add the top category itself
    items.push({
      id: `cat-service-${cat.slug}`,
      title: cat.category,
      description: cat.description,
      category: 'Services',
      categorySlug: cat.slug,
      url: `/services/${cat.slug}`,
      type: 'service',
      keywords: [cat.category.toLowerCase(), cat.slug],
    });

    // Add child pages
    const rawYaml = serviceIndexYamls[cat.slug];
    if (rawYaml) {
      const pages = parseYamlPages(rawYaml);
      for (const page of pages) {
        items.push({
          id: `service-${cat.slug}-${page.slug}`,
          title: page.name,
          description:
            page.description ||
            `Public service procedure in Morong under ${cat.category}.`,
          category: cat.category,
          categorySlug: cat.slug,
          url: `/services/${cat.slug}/${page.slug}`,
          type: 'service',
          keywords: [
            page.name.toLowerCase(),
            cat.category.toLowerCase(),
            cat.slug,
            page.slug,
          ],
        });
      }
    }
  }

  // 2. Government Categories & Subpages
  for (const cat of (governmentCategories?.categories || []) as Category[]) {
    // Add top category
    items.push({
      id: `cat-gov-${cat.slug}`,
      title: cat.category,
      description: cat.description,
      category: 'Government',
      categorySlug: cat.slug,
      url: `/government/${cat.slug}`,
      type: 'government',
      keywords: [cat.category.toLowerCase(), cat.slug],
    });

    // Add child pages
    const rawYaml = governmentIndexYamls[cat.slug];
    if (rawYaml) {
      const pages = parseYamlPages(rawYaml);
      for (const page of pages) {
        items.push({
          id: `gov-${cat.slug}-${page.slug}`,
          title: page.name,
          description:
            page.description ||
            `Official Morong government document and information under ${cat.category}.`,
          category: cat.category,
          categorySlug: cat.slug,
          url: `/government/${cat.slug}/${page.slug}`,
          type: 'government',
          keywords: [
            page.name.toLowerCase(),
            cat.category.toLowerCase(),
            cat.slug,
            page.slug,
          ],
        });
      }
    }
  }

  return items;
}

export const searchIndex: SearchItem[] = buildSearchIndex();

/**
 * Client-side search function with multi-term ranking and instant response
 */
export function searchBetterMorong(
  query: string,
  filterType: 'all' | 'service' | 'government' | 'emergency' = 'all'
): SearchItem[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return [];

  const tokens = trimmed.split(/\s+/).filter(Boolean);

  const matched = searchIndex.filter(item => {
    if (filterType !== 'all' && item.type !== filterType) {
      return false;
    }

    const titleLower = item.title.toLowerCase();
    const descLower = item.description.toLowerCase();
    const catLower = item.category.toLowerCase();
    const keywordsLower = (item.keywords || []).join(' ').toLowerCase();

    // Every token must match somewhere in title, description, category, or keywords
    return tokens.every(
      token =>
        titleLower.includes(token) ||
        descLower.includes(token) ||
        catLower.includes(token) ||
        keywordsLower.includes(token)
    );
  });

  // Score & sort results
  return matched.sort((a, b) => {
    const aTitle = a.title.toLowerCase();
    const bTitle = b.title.toLowerCase();

    // Exact title match gets highest priority
    const aExact = aTitle === trimmed ? 100 : 0;
    const bExact = bTitle === trimmed ? 100 : 0;

    // Title starts with query
    const aStarts = aTitle.startsWith(trimmed) ? 50 : 0;
    const bStarts = bTitle.startsWith(trimmed) ? 50 : 0;

    // Title contains query
    const aContains = aTitle.includes(trimmed) ? 25 : 0;
    const bContains = bTitle.includes(trimmed) ? 25 : 0;

    const scoreA = aExact + aStarts + aContains;
    const scoreB = bExact + bStarts + bContains;

    return scoreB - scoreA;
  });
}

export const popularSearchTags = [
  {
    label: "Mayor's Business Permit",
    query: 'business permit',
    url: '/services/business/apply-for-barangay-clearance-and-mayors-business-permits',
  },
  {
    label: '8 Barangays & Population',
    query: 'barangay demographics',
    url: '/government/about-morong/demographics-and-barangays',
  },
  {
    label: 'Tourist Spots & Dining',
    query: 'tourist spots dining',
    url: '/government/about-morong/tourist-spots-and-local-attractions',
  },
  {
    label: 'Health Center & Bakuna',
    query: 'health vaccination',
    url: '/services/health-services/get-free-check-ups-basic-medicines-and-vaccines',
  },
  {
    label: 'Approved Ordinances',
    query: 'ordinances',
    url: '/government/ordinances-and-resolutions/approved-ordinances',
  },
  {
    label: '24/7 Emergency Hotlines',
    query: 'emergency hotline',
    url: '/philippines-hotlines',
  },
];
