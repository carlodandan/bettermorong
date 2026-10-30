import * as yaml from 'js-yaml';
import {
  serviceCategories,
  governmentCategories,
  type Category,
  type CategoryIndexData,
} from '../data/yamlLoader';
import { ALL_HOTLINES } from '../data/hotlinesData';

// Raw YAML category index imports
import civilRegistryIndex from '../../content/services/civil-registry-and-ids/index.yaml?raw';
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
  'civil-registry-and-ids': civilRegistryIndex,
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

/**
 * Curated civic keyword mapping for frontline Morong municipal services,
 * legal abbreviations, Tagalog synonyms, and frequently searched public topics.
 */
const PAGE_KEYWORDS: Record<string, string[]> = {
  // --- Civil Registry, IDs & Clearances ---
  'get-cedula-and-individual-working-permit': [
    'cedula',
    'community tax certificate',
    'ctc',
    'working permit',
    'individual working permit',
    'mayors working permit',
    'occupational permit',
    'health card',
    'sanitary permit',
    'sedula',
    'treasury',
    'tax clearance',
    'trabaho permit',
  ],
  'apply-for-marriage-license': [
    'marriage license',
    'kasal',
    'wedding',
    'civil wedding',
    'pmoc',
    'pre-marriage counseling',
    'family planning seminar',
    'cenomar',
    'civil registry',
    'seminar sa kasal',
    'lisensya sa kasal',
  ],
  'correct-clerical-errors-on-civil-registry-documents': [
    'clerical error',
    'correction of error',
    'ra 9048',
    'ra 10172',
    'mali ang pangalan',
    'mali ang birthday',
    'change first name',
    'civil registry',
    'correction of gender',
    'petition',
    'birth certificate correction',
  ],
  'register-birth-marriage-or-death-certificates': [
    'birth certificate',
    'death certificate',
    'marriage certificate',
    'psa',
    'civil registry',
    'kapanganakan',
    'patay',
    'kasal',
    'late registration',
    'delayed registration',
    'certified true copy',
    'lcr',
    'endorsement',
  ],

  // --- Housing & Land Use ---
  'pay-real-property-tax-amilyar-and-get-tax-clearance': [
    'amilyar',
    'rpt',
    'real property tax',
    'tax declaration',
    'tax clearance',
    'assessor',
    'treasurer',
    'buwis sa lupa',
    'property tax',
    'prompt payment discount',
    'quarterly rpt',
    'hulog sa lupa',
  ],
  'transfer-or-update-real-property-tax-declaration': [
    'transfer of tax declaration',
    'tax declaration',
    'amilyar',
    'assessor',
    'deed of absolute sale',
    'ecar',
    'car',
    'titling',
    'subdivision of land',
    'lupa',
    'transfer of property',
  ],
  'request-zoning-land-use-or-building-permits': [
    'building permit',
    'zoning',
    'locational clearance',
    'fencing permit',
    'occupancy permit',
    'obo',
    'mpdo',
    'construction',
    'electrical permit',
  ],
  'apply-for-socialized-housing-or-relocation-projects': [
    'housing',
    'socialized housing',
    'relocation',
    'pabahay',
    'nha',
    'informal settlers',
  ],
  'ask-about-available-relocation-sites-in-case-of-demolition': [
    'relocation sites',
    'demolition',
    'danger zone',
    'eviction',
    'housing assistance',
  ],

  // --- Health Services ---
  'go-to-the-local-hospital-for-treatment-or-confinement': [
    'rphs',
    'hospital',
    'rizal provincial hospital',
    'morong main',
    'malasakit center',
    'emergency room',
    'er',
    'confinement',
    'admit sa ospital',
    'doktor',
    'gamot',
    'nbb',
    'no balance billing',
    'philhealth',
    'inpatient',
  ],
  'get-animal-bite-treatment-and-anti-rabies-vaccine': [
    'animal bite',
    'anti-rabies',
    'rabies',
    'kagat ng aso',
    'kagat ng pusa',
    'abtc',
    'animal bite treatment center',
    'rhu',
    'rphs',
    'rabies vaccine',
    'rig',
    'wound care',
  ],
  'get-free-check-ups-basic-medicines-and-vaccines': [
    'health center',
    'rhu',
    'mho',
    'checkup',
    'libreng gamot',
    'bakuna',
    'consultation',
    'clinic',
    'laboratory',
  ],
  'access-maternal-care-and-child-immunization': [
    'maternal care',
    'prenatal',
    'child immunization',
    'bakuna sa sanggol',
    'buntis',
    'paanakan',
    'lying in',
    'rhu',
  ],
  'join-health-programs-nutrition-dengue-control-tb-treatment': [
    'nutrition',
    'dengue',
    'tb treatment',
    'tuberculosis',
    'dots',
    'fogging',
    'malnutrition',
  ],

  // --- Infrastructure & Public Works ---
  'request-access-to-barangay-water-supply-systems': [
    'mowad',
    'morong water district',
    'water connection',
    'bawasa',
    'brwasa',
    'tubig',
    'water leak',
    'water supply',
    'water pressure',
    'poso',
    'deep well',
    'lwua',
  ],
  'report-damaged-roads-bridges-or-drainage': [
    'damaged roads',
    'pothole',
    'lubak',
    'drainage',
    'baha',
    'tulay',
    'engineering office',
    'kalsada',
  ],
  'use-public-facilities-like-gyms-barangay-halls-or-multipurpose-centers': [
    'gym',
    'multipurpose center',
    'barangay hall',
    'court',
    'reservation',
    'town plaza',
  ],
  'rent-stalls-in-public-markets-or-use-lgu-managed-cemeteries': [
    'public market',
    'palengke',
    'market stall',
    'cemetery',
    'sementeryo',
    'libingan',
    'pwesto sa palengke',
  ],

  // --- Garbage & Waste Disposal ---
  'check-garbage-collection-schedules-and-request-pickup': [
    'garbage collection',
    'basura',
    'trash schedule',
    'menro',
    'hakot basura',
    'biodegradable',
    'residual waste',
    'truck schedule',
  ],
  'learn-proper-waste-segregation-and-disposal-methods': [
    'waste segregation',
    'proper disposal',
    'compost',
    'recycling',
    'mrfs',
  ],
  'request-special-waste-collection-hazardous-materials-electronics': [
    'special waste',
    'hazardous waste',
    'e-waste',
    'electronics disposal',
    'bulky waste',
  ],
  'report-illegal-dumping-or-waste-management-violations': [
    'illegal dumping',
    'tapon basura',
    'menro complaint',
    'smoke belching',
    'anti-littering',
  ],

  // --- Business ---
  'apply-for-barangay-clearance-and-mayors-business-permits': [
    'business permit',
    'mayors permit',
    'bplo',
    'boss',
    'business one stop shop',
    'barangay clearance',
    'dti',
    'sec',
    'negosyo',
    'sanitary permit',
  ],
  'renew-permits-and-pay-local-business-taxes': [
    'renew business permit',
    'business tax',
    'bplo renewal',
    'gross sales',
    'january 20 deadline',
  ],
  'join-trade-fairs-business-expos-or-tourism-promotions': [
    'trade fair',
    'expo',
    'tourism promotion',
    'msme',
    'negosyo center',
  ],

  // --- Social Welfare ---
  'find-local-jobs-spes-or-peso-employment-assistance': [
    'jobs',
    'trabaho',
    'peso',
    'spes',
    'tupad',
    'dole',
    'employment',
    'hiring',
    'job vacancy',
    'ofw desk',
  ],
  'apply-for-senior-citizen-solo-parent-or-pwd-assistance': [
    'senior citizen',
    'pwd',
    'solo parent',
    'osca',
    'disability id',
    'senior id',
    'financial assistance',
    'ayuda',
    'social pension',
    'centenarian',
  ],
  'receive-relief-goods-or-cash-aid-during-disasters': [
    'relief goods',
    'cash aid',
    'ayuda sa kalamidad',
    'dswd',
    'disaster relief',
    'food packs',
  ],
  'join-livelihood-or-skills-training-programs': [
    'livelihood training',
    'skills training',
    'tesda',
    'hanapbuhay',
    'kabuhayan',
  ],
  'get-family-and-community-welfare-support': [
    'family welfare',
    'crisis intervention',
    'aics',
    'mswdo assistance',
    'burial assistance',
    'medical assistance',
  ],

  // --- Disaster Preparedness ---
  'join-disaster-drills-and-evacuation-planning': [
    'disaster drills',
    'earthquake drill',
    'shake drill',
    'evacuation plan',
    'mdrrmo',
  ],
  'learn-about-emergency-response-procedures-and-evacuation-routes': [
    'evacuation routes',
    'evacuation centers',
    'baha',
    'flood map',
    'bagyo',
    'typhoon response',
    'emergency hotline',
  ],
  'access-disaster-preparedness-information-and-early-warning-systems': [
    'early warning system',
    'siren',
    'flood alarm',
    'pagasa',
    'phivolcs',
    'water level',
  ],

  // --- Education ---
  'morong-rizal-e-library': [
    'e-library',
    'elibrary',
    'library',
    'aklatan',
    'silid-aklatan',
    'computer',
    'libreng internet',
    'free wifi',
    'printing',
    'print',
    'photocopy',
    'smart tv',
    'dilg',
    'sglg',
    'seal of good local governance',
    'tupas',
    'san pedro',
    'study hub',
    'research',
    'starbooks',
    'dost',
    'dost starbooks',
    'science library',
  ],
  'apply-for-local-scholarships': [
    'scholarship',
    'iskolar ng morong',
    'financial grant',
    'college scholarship',
    'educational assistance',
  ],
  'enroll-children-in-lgu-daycare-or-preschool-programs': [
    'daycare',
    'preschool',
    'child development center',
    'kindergarten',
    'eccd',
  ],
  'national-youth-commission-youth-organization-registration-program': [
    'yorp',
    'youth organization',
    'nyc',
    'sk',
    'sangguniang kabataan',
  ],

  // --- Agriculture & Fisheries ---
  'ask-for-free-seeds-seedlings-fertilizers-or-fingerlings': [
    'seeds',
    'binhi',
    'palay',
    'fertilizer',
    'fingerlings',
    'tilapia',
    'gulay',
    'agriculture office',
  ],
  'get-veterinary-services-for-livestock': [
    'veterinary',
    'livestock',
    'bakuna sa hayop',
    'anti-rabies dog',
    'kapon',
    'baboy',
    'baka',
  ],

  // --- Government: About Morong ---
  'commuter-and-tricycle-fare-guide': [
    'toda',
    'tricycle',
    'fare',
    'pamasahe',
    'commuter',
    'jeepney',
    'uv express',
    'transit',
    'terminal',
    'mtfrb',
    'student discount',
    'pwd discount',
    'transportation',
  ],
  'demographics-and-barangays': [
    'barangay',
    '8 barangays',
    'population',
    'san pedro',
    'san juan',
    'san jose',
    'san guillermo',
    'bombongan',
    'maybancal',
    'lagundi',
    'caniogan',
    'calero',
    'lanang',
  ],
  'history-and-heritage': [
    'history',
    'cultural heritage',
    'comandancia',
    'museong pambayan',
    'old municipal hall',
    'st. jerome church',
    'heritage',
  ],
  'tourist-spots-and-local-attractions': [
    'tourist spots',
    'attractions',
    'dining',
    'sanrok festival',
    'resorts',
    'restaurants',
  ],
  'vision-and-mission': ['vision', 'mission', 'mandate', 'morong 2030'],

  // --- Government: Departments ---
  'local-civil-registry': [
    'civil registry',
    'lcr',
    'birth certificate',
    'marriage license',
    'death certificate',
    'clerical error',
    'ra 9048',
  ],
  'municipal-treasurer-office': [
    'treasurer',
    'treasury',
    'cedula',
    'amilyar',
    'real property tax',
    'business tax',
    'tax payment',
    'community tax certificate',
  ],
  'municipal-assessor-office': [
    'assessor',
    'tax declaration',
    'assessed value',
    'market value',
    'transfer of ownership',
    'property assessment',
  ],
  'business-permits-and-licensing-office': [
    'bplo',
    'business permit',
    'mayors permit',
    'boss',
    'business license',
  ],
  'public-employment-service-office': [
    'peso',
    'jobs',
    'trabaho',
    'spes',
    'tupad',
    'employment',
  ],
  'municipal-health-office': [
    'mho',
    'rhu',
    'health center',
    'doctor',
    'nurse',
    'animal bite center',
    'bakuna',
  ],
  'municipal-disaster-risk-reduction-office': [
    'mdrrmo',
    'rescue',
    'disaster',
    'emergency operations center',
    'ambulance',
    'jerome mateo',
    'chainsaw clearing',
    'calamity loan certification',
  ],
  'general-services-office': [
    'general services office',
    'gso',
    'rental',
    'gymnasium rental',
    'equipment rental',
    'sound system',
    'plaza rental',
    'david emmanuel soriano',
    'municipal assets',
  ],
  'human-resource-management-office': [
    'human resource',
    'hrmo',
    'job vacancies',
    'plantilla',
    'job order',
    'ojt',
    'internship',
    'work immersion',
    'civil service exam',
    'teodoro trinidad',
    'certificate of non employment',
  ],
  'municipal-tourism-office': [
    'municipal tourism office',
    'tourism',
    'visitor assistance',
    'tour coordination',
    'shieldeen soriano',
    'media filming permit',
    'tourist spots',
    'cultural heritage',
  ],
  'municipal-budget-office': [
    'municipal budget office',
    'budget',
    'appropriation',
    'allotment',
    'leni pascual',
    'obligation cancellation',
    'aip',
  ],
  'municipal-accountant-office': [
    'municipal accountant',
    'accounting',
    'premium contribution',
    'loan certification',
    'gsis deduction',
    'financial statement',
  ],

  // --- Government: Transparency Documents ---
  'citizens-charter-2025': [
    'citizens charter',
    'charter',
    'charter 2025',
    'arta',
    'anti red tape',
    'service standards',
    'processing time',
    'fees',
    'checklist of requirements',
    'turnaround time',
    'pacd',
    'officer of the day',
    'complaint mechanism',
    '115 services',
    'frontline services',
    'panata sa serbisyo',
    'service pledge',
  ],
  'downloadable-forms': [
    'downloadable forms',
    'forms',
    'pdf',
    'application form',
    'cedula form',
    'business permit form',
    'building permit form',
    'template',
  ],
  'procurement-monitoring-reports': [
    'pmr',
    'bac',
    'procurement',
    'bids and awards',
    'bidding',
    'public bidding',
    'invitation to bid',
    'notice of award',
  ],
  'approved-ordinances': [
    'ordinances',
    'ordinansa',
    'kautusan',
    'municipal ordinance',
    'sangguniang bayan',
  ],
  'legislative-resolutions': [
    'resolutions',
    'resolusyon',
    'sangguniang bayan',
    'council',
  ],
};

// Convert all official hotlines into searchable emergency items
const emergencyHotlineItems: SearchItem[] = ALL_HOTLINES.map(hotline => {
  const nameLower = hotline.name.toLowerCase();
  const agencyLower = hotline.agency ? hotline.agency.toLowerCase() : '';
  const specialTokens: string[] = [];

  if (nameLower.includes('mowad')) {
    specialTokens.push(
      'mowad',
      'water district',
      'water',
      'tubig',
      'leak',
      'water leak'
    );
  }
  if (nameLower.includes('rphs') || nameLower.includes('hospital')) {
    specialTokens.push(
      'rphs',
      'hospital',
      'ospital',
      'emergency room',
      'er',
      'malasakit',
      'confinement'
    );
  }
  if (nameLower.includes('police') || nameLower.includes('pnp')) {
    specialTokens.push('pnp', 'police', 'pulis', 'blotter', 'crime');
  }
  if (nameLower.includes('fire') || nameLower.includes('bfp')) {
    specialTokens.push('bfp', 'fire', 'sunog', 'bombero', 'firetruck');
  }
  if (nameLower.includes('mdrrmo')) {
    specialTokens.push(
      'mdrrmo',
      'rescue',
      'baha',
      'flood',
      'evacuation',
      'calamity'
    );
  }
  if (nameLower.includes('rhu') || nameLower.includes('health')) {
    specialTokens.push('rhu', 'mho', 'health center', 'bakuna', 'animal bite');
  }

  return {
    id: `hotline-${hotline.id}`,
    title: hotline.name,
    description: `${hotline.description} Numbers: ${hotline.numbers.join(', ')} (${hotline.availability}).`,
    category: 'Emergency & Hotlines',
    categorySlug: 'hotlines',
    url: '/philippines-hotlines',
    type: 'emergency',
    keywords: Array.from(
      new Set([
        nameLower,
        agencyLower,
        hotline.category.toLowerCase(),
        hotline.categoryLabel.toLowerCase(),
        ...specialTokens,
      ])
    ).filter(Boolean),
  };
});

const emergencyHubItem: SearchItem = {
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
};

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
  const items: SearchItem[] = [
    emergencyHubItem,
    ...emergencyHotlineItems,
    ...holidayItems,
  ];

  // 1. Service Categories & Subpages
  for (const cat of (serviceCategories?.categories || []) as Category[]) {
    // Add top category
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
        const curatedKeywords = PAGE_KEYWORDS[page.slug] || [];

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
          keywords: Array.from(
            new Set([
              page.name.toLowerCase(),
              cat.category.toLowerCase(),
              cat.slug,
              page.slug,
              ...curatedKeywords,
            ])
          ),
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
        const curatedKeywords = PAGE_KEYWORDS[page.slug] || [];

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
          keywords: Array.from(
            new Set([
              page.name.toLowerCase(),
              cat.category.toLowerCase(),
              cat.slug,
              page.slug,
              ...curatedKeywords,
            ])
          ),
        });
      }
    }
  }

  return items;
}

export const searchIndex: SearchItem[] = buildSearchIndex();

/**
 * Client-side search function with multi-term token matching,
 * full-text relevance ranking, and instant response.
 */
export function searchBetterMorong(
  query: string,
  filterType: 'all' | 'service' | 'government' | 'emergency' = 'all'
): SearchItem[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return [];

  const tokens = trimmed
    .split(/\s+/)
    .map(t => t.replace(/^[^\w]+|[^\w]+$/g, ''))
    .filter(Boolean);

  if (tokens.length === 0) return [];

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
    const aExact = aTitle === trimmed ? 120 : 0;
    const bExact = bTitle === trimmed ? 120 : 0;

    // Title starts with query
    const aStarts = aTitle.startsWith(trimmed) ? 60 : 0;
    const bStarts = bTitle.startsWith(trimmed) ? 60 : 0;

    // Title contains query
    const aContains = aTitle.includes(trimmed) ? 35 : 0;
    const bContains = bTitle.includes(trimmed) ? 35 : 0;

    // Exact keyword match
    const aKeywordExact = (a.keywords || []).some(
      k => k.toLowerCase() === trimmed
    )
      ? 50
      : 0;
    const bKeywordExact = (b.keywords || []).some(
      k => k.toLowerCase() === trimmed
    )
      ? 50
      : 0;

    // Keyword contains query
    const aKeywordContains = (a.keywords || []).some(k =>
      k.toLowerCase().includes(trimmed)
    )
      ? 25
      : 0;
    const bKeywordContains = (b.keywords || []).some(k =>
      k.toLowerCase().includes(trimmed)
    )
      ? 25
      : 0;

    // Description contains query
    const aDescContains = a.description.toLowerCase().includes(trimmed)
      ? 15
      : 0;
    const bDescContains = b.description.toLowerCase().includes(trimmed)
      ? 15
      : 0;

    // Prioritize specific guides over general category overview hubs
    const aServiceBoost =
      a.id.startsWith('service-') || a.id.startsWith('gov-') ? 10 : 0;
    const bServiceBoost =
      b.id.startsWith('service-') || b.id.startsWith('gov-') ? 10 : 0;

    const scoreA =
      aExact +
      aStarts +
      aContains +
      aKeywordExact +
      aKeywordContains +
      aDescContains +
      aServiceBoost;
    const scoreB =
      bExact +
      bStarts +
      bContains +
      bKeywordExact +
      bKeywordContains +
      bDescContains +
      bServiceBoost;

    return scoreB - scoreA;
  });
}

export const popularSearchTags = [
  {
    label: 'Cedula & Working Permit',
    query: 'cedula',
    url: '/services/civil-registry-and-ids/get-cedula-and-individual-working-permit',
  },
  {
    label: 'Real Property Tax (Amilyar)',
    query: 'amilyar',
    url: '/services/housing-land-use/pay-real-property-tax-amilyar-and-get-tax-clearance',
  },
  {
    label: "Mayor's Business Permit",
    query: 'business permit',
    url: '/services/business/apply-for-barangay-clearance-and-mayors-business-permits',
  },
  {
    label: 'Morong Water District (MOWAD)',
    query: 'mowad',
    url: '/services/infrastructure-public-works/request-access-to-barangay-water-supply-systems',
  },
  {
    label: 'RPHS Morong Hospital & ER',
    query: 'rphs',
    url: '/services/health-services/go-to-the-local-hospital-for-treatment-or-confinement',
  },
  {
    label: 'Tricycle (TODA) Fare Guide',
    query: 'toda',
    url: '/government/about-morong/commuter-and-tricycle-fare-guide',
  },
  {
    label: '8 Barangays & Demographics',
    query: 'barangay demographics',
    url: '/government/about-morong/demographics-and-barangays',
  },
  {
    label: '24/7 Emergency Hotlines',
    query: 'emergency hotline',
    url: '/philippines-hotlines',
  },
];
