export interface HotlineItem {
  id: string;
  name: string;
  agency?: string;
  category:
    | 'critical'
    | 'disaster'
    | 'security'
    | 'health'
    | 'transport'
    | 'utilities'
    | 'social'
    | 'local-morong';
  categoryLabel: string;
  numbers: string[];
  description: string;
  availability: string; // e.g., '24/7 Hotline', 'Mon-Fri 8AM-5PM'
  tollFree?: boolean;
  smsAvailable?: boolean;
  iconName?: string;
  website?: string;
}

export const HOTLINE_CATEGORIES = [
  { id: 'all', label: 'All Hotlines' },
  { id: 'local-morong', label: 'Morong Emergency' },
  { id: 'critical', label: 'National Critical 24/7' },
  { id: 'disaster', label: 'Disaster & Rescue' },
  { id: 'security', label: 'Security & Police' },
  { id: 'health', label: 'Health & Crisis Support' },
  { id: 'utilities', label: 'Utilities & Weather' },
  { id: 'transport', label: 'Transport & Traffic' },
  { id: 'social', label: 'Social & Anti-Violence' },
] as const;

export const ALL_HOTLINES: HotlineItem[] = [
  // --- LOCAL MORONG, RIZAL HOTLINES ---
  {
    id: 'morong-mdrrmo',
    name: 'Morong MDRRMO Emergency Operations Center',
    agency: 'Municipality of Morong, Rizal',
    category: 'local-morong',
    categoryLabel: 'Morong Emergency',
    numbers: [
      '0917-135-0541',
      '0919-081-7181',
      '(02) 7212-5741',
      '(02) 8786-9398',
    ],
    description:
      '24/7 Municipal Disaster Risk Reduction & Management dispatch, flood & typhoon evacuation, emergency ambulance and rescue.',
    availability: '24/7 Available',
    smsAvailable: true,
  },
  {
    id: 'morong-police',
    name: 'Morong Municipal Police Station (PNP)',
    agency: 'Philippine National Police - Rizal PPO',
    category: 'local-morong',
    categoryLabel: 'Morong Emergency',
    numbers: ['0906-513-0718', '0998-598-5725', '0998-967-3462'],
    description:
      'Local police emergency dispatch, crime response, community patrols, and public security in Morong, Rizal.',
    availability: '24/7 Available',
    smsAvailable: true,
  },
  {
    id: 'morong-bfp',
    name: 'Morong Fire Station (BFP)',
    agency: 'Bureau of Fire Protection - Region IV-A',
    category: 'local-morong',
    categoryLabel: 'Morong Emergency',
    numbers: ['0908-441-7754', '0945-710-6766'],
    description:
      'Municipal fire suppression, emergency rescue, fire hazard inspection, and disaster response dispatch.',
    availability: '24/7 Available',
    smsAvailable: true,
  },
  {
    id: 'rphs-morong',
    name: 'Rizal Provincial Hospital System (RPHS) - Morong Main',
    agency: 'Provincial Government of Rizal',
    category: 'local-morong',
    categoryLabel: 'Morong Emergency',
    numbers: ['(02) 8653-1184'],
    description:
      'Primary public tertiary referral hospital serving Morong and eastern Rizal with 24/7 emergency room and trauma services.',
    availability: '24/7 Emergency Room',
  },
  {
    id: 'morong-rhu',
    name: 'Morong Rural Health Unit (MHO)',
    agency: 'Municipal Health Office',
    category: 'local-morong',
    categoryLabel: 'Morong Emergency',
    numbers: ['(02) 7212-5741'],
    description:
      'Frontline primary healthcare clinic, Animal Bite Treatment Center (ABTC), EPI infant immunization, and prenatal care.',
    availability: 'Mon - Fri 8:00 AM - 5:00 PM',
  },

  // --- NATIONAL CRITICAL HOTLINES ---
  {
    id: 'nat-911',
    name: 'National Emergency Hotline',
    agency: 'Department of the Interior and Local Government (DILG)',
    category: 'critical',
    categoryLabel: 'National Critical 24/7',
    numbers: ['911'],
    description:
      'Nationwide emergency hotline for police assistance, fire suppression, medical ambulance, and search and rescue operations.',
    availability: '24/7 Toll-Free Hotline',
    tollFree: true,
  },
  {
    id: 'nat-8888',
    name: "8888 Citizens' Complaint Center",
    agency: 'Office of the President / Civil Service Commission',
    category: 'critical',
    categoryLabel: 'National Critical 24/7',
    numbers: ['8888'],
    description:
      'Government hotline for citizens to report bureaucratic red tape, corruption, slow public transactions, and grievances.',
    availability: '24/7 Toll-Free Hotline',
    tollFree: true,
  },
  {
    id: 'red-cross-143',
    name: 'Philippine Red Cross Emergency Hotline',
    agency: 'Philippine Red Cross (PRC)',
    category: 'critical',
    categoryLabel: 'National Critical 24/7',
    numbers: ['143', '(02) 8790-2300', '(02) 8527-0000'],
    description:
      'National emergency humanitarian response, ambulance service, search and rescue, disaster relief, and blood bank inquiries.',
    availability: '24/7 Nationwide Hotline',
    tollFree: false,
    website: 'https://redcross.org.ph',
  },
  {
    id: 'pnp-117',
    name: 'PNP Emergency Patrol Hotline',
    agency: 'Philippine National Police (PNP)',
    category: 'critical',
    categoryLabel: 'National Critical 24/7',
    numbers: ['117', '(02) 8722-0650', '0917-847-5757'],
    description:
      'National law enforcement emergency dispatch and crime response patrol hotline.',
    availability: '24/7 Nationwide Hotline',
    smsAvailable: true,
  },
  {
    id: 'ncmh-crisis',
    name: 'National Center for Mental Health (NCMH) Crisis Hotline',
    agency: 'Department of Health (DOH)',
    category: 'health',
    categoryLabel: 'Health & Crisis Support',
    numbers: ['1553', '0917-899-8727', '0966-351-4518', '(02) 8531-9001'],
    description:
      'Free, confidential 24/7 psychological support, suicide crisis intervention, and mental health counseling.',
    availability: '24/7 Toll-Free Crisis Line',
    tollFree: true,
    smsAvailable: true,
  },

  // --- DISASTER & RESCUE ---
  {
    id: 'ndrrmc',
    name: 'National Disaster Risk Reduction and Management Council (NDRRMC)',
    agency: 'Office of Civil Defense (OCD / DND)',
    category: 'disaster',
    categoryLabel: 'Disaster & Rescue',
    numbers: [
      '(02) 8911-5061 to 65',
      '(02) 8911-1406',
      '(02) 8912-2665',
      '(02) 8912-5668',
    ],
    description:
      'Central national agency coordinating national disaster preparedness, typhoon advisories, rescue mobilization, and relief operations.',
    availability: '24/7 Operations Center',
    website: 'https://ndrrmc.gov.ph',
  },
  {
    id: 'dswd-disaster',
    name: 'DSWD Disaster Response Management Bureau (DRMB)',
    agency: 'Department of Social Welfare and Development',
    category: 'disaster',
    categoryLabel: 'Disaster & Rescue',
    numbers: [
      '(02) 8856-3665',
      '(02) 8852-8081',
      '(02) 8931-8101 to 07',
      '0918-912-2813',
    ],
    description:
      'Coordination of emergency family food packs, disaster relief distribution, evacuation center assistance, and cash aid for calamity victims.',
    availability: '24/7 Hotline',
    smsAvailable: true,
    website: 'https://dswd.gov.ph',
  },
  {
    id: 'coast-guard',
    name: 'Philippine Coast Guard (PCG) Search & Rescue',
    agency: 'Department of Transportation (DOTr)',
    category: 'security',
    categoryLabel: 'Security & Police',
    numbers: [
      '(02) 8527-8481 to 89',
      '(02) 8527-3877',
      '0917-724-3682',
      '0918-967-4697',
    ],
    description:
      'Maritime search and rescue, vessel safety, flood evacuation assistance, and coastal security (including Laguna de Bay operations).',
    availability: '24/7 Operations Center',
    smsAvailable: true,
  },

  // --- SECURITY & PUBLIC SAFETY ---
  {
    id: 'bfp-national',
    name: 'Bureau of Fire Protection (BFP) National Headquarters',
    agency: 'Department of the Interior and Local Government (DILG)',
    category: 'security',
    categoryLabel: 'Security & Police',
    numbers: ['(02) 8426-0219', '(02) 8426-0246'],
    description:
      'National fire safety administration, industrial fire prevention, and emergency rescue services.',
    availability: '24/7 Hotline',
  },
  {
    id: 'vawc-hotline',
    name: 'Violence Against Women and Children (VAWC) Desk',
    agency: 'PNP Women and Children Protection Center / DSWD',
    category: 'social',
    categoryLabel: 'Social & Anti-Violence',
    numbers: ['(02) 3410-3213', '(02) 8723-0401', '(02) 8931-8101 to 07'],
    description:
      'Emergency reporting, medical intervention, legal rescue, and shelter assistance for victims of domestic abuse and child violence.',
    availability: '24/7 Hotline',
  },
  {
    id: 'cfo-anti-trafficking',
    name: 'Commission on Filipinos Overseas (CFO) Anti-Human Trafficking',
    agency: 'Inter-Agency Council Against Trafficking (IACAT)',
    category: 'social',
    categoryLabel: 'Social & Anti-Violence',
    numbers: ['1343', '(02) 8564-5555'],
    description:
      'Hotline for reporting human trafficking, illegal recruitment, overseas domestic worker abuse, and mail-order bride schemes.',
    availability: '24/7 Hotline',
    tollFree: true,
  },

  // --- TRANSPORTATION & TRAFFIC ---
  {
    id: 'mmda-136',
    name: 'Metro Manila Development Authority (MMDA) Metrobase',
    agency: 'Office of the President',
    category: 'transport',
    categoryLabel: 'Transport & Traffic',
    numbers: ['136', '(02) 8882-4151 to 77'],
    description:
      'Road traffic reports, emergency towing, accident rescue, and Pasig River ferry information.',
    availability: '24/7 Hotline',
  },
  {
    id: 'dotr-action',
    name: 'Department of Transportation (DOTr) Action Center',
    agency: 'DOTr Central Office',
    category: 'transport',
    categoryLabel: 'Transport & Traffic',
    numbers: ['7890', '(02) 8790-8300', '(02) 8726-4925'],
    description:
      'Commuter grievances, public transit safety complaints, and transport infrastructure inquiries.',
    availability: 'Mon - Fri 8:00 AM - 5:00 PM',
  },
  {
    id: 'ltfrb-hotline',
    name: 'Land Transportation Franchising and Regulatory Board (LTFRB)',
    agency: 'DOTr / LTFRB',
    category: 'transport',
    categoryLabel: 'Transport & Traffic',
    numbers: ['1342', '(02) 8426-2515', '0921-448-7777'],
    description:
      'Public utility vehicle (jeepney, bus, UV express) complaints, fare overcharging reports, and franchise verification.',
    availability: '24/7 Public Assistance',
    smsAvailable: true,
  },
  {
    id: 'lto-hotline',
    name: 'Land Transportation Office (LTO)',
    agency: 'DOTr / LTO',
    category: 'transport',
    categoryLabel: 'Transport & Traffic',
    numbers: ['(02) 8922-9061 to 63'],
    description:
      "Driver's licensing inquiries, vehicle plate registration status, and motor vehicle inspection.",
    availability: 'Mon - Fri 8:00 AM - 5:00 PM',
  },

  // --- UTILITIES & WEATHER ---
  {
    id: 'pagasa-weather',
    name: 'PAGASA Weather & Flood Forecasting Center',
    agency: 'Department of Science and Technology (DOST)',
    category: 'utilities',
    categoryLabel: 'Utilities & Weather',
    numbers: ['(02) 8284-0800'],
    description:
      'Severe weather bulletins, tropical cyclone warnings, typhoon tracking, and rainfall flood advisories.',
    availability: '24/7 Operations Center',
    website: 'https://bagong.pagasa.dost.gov.ph',
  },
  {
    id: 'phivolcs-seismic',
    name: 'PHIVOLCS Volcanology & Seismology Center',
    agency: 'Department of Science and Technology (DOST)',
    category: 'utilities',
    categoryLabel: 'Utilities & Weather',
    numbers: ['(02) 8426-1468 to 79'],
    description:
      'Earthquake bulletins, tsunami warnings, volcano monitoring, and active fault line assessments.',
    availability: '24/7 Operations Center',
    website: 'https://phivolcs.dost.gov.ph',
  },
  {
    id: 'mowad-water',
    name: 'Morong Water District (MOWAD)',
    agency: 'Morong Water District (LWUA)',
    category: 'utilities',
    categoryLabel: 'Utilities & Weather',
    numbers: [
      '(02) 8691-5822',
      '(02) 8691-5645',
      '(02) 8470-0922',
      '(02) 8653-1184',
    ],
    description:
      'Public water utility for the Municipality of Morong, Rizal. Reporting water leaks, mainline bursts, low pressure, new service applications, and water billing.',
    availability: 'Mon - Fri 8:00 AM - 5:00 PM (Emergency crews on call)',
    website: 'https://mowad.gov.ph',
  },
  {
    id: 'manila-water',
    name: 'Manila Water 24/7 Customer Care (Rizal / East Zone)',
    agency: 'Manila Water Company, Inc.',
    category: 'utilities',
    categoryLabel: 'Utilities & Weather',
    numbers: ['1627'],
    description:
      'Water concessionaire serving Morong and Rizal province. Emergency pipe burst reports, water interruption schedules, and billing inquiries.',
    availability: '24/7 Customer Hotline',
    tollFree: true,
  },
  {
    id: 'meralco-power',
    name: 'Meralco 24/7 Emergency Outage & Assistance',
    agency: 'Manila Electric Company (MERALCO)',
    category: 'utilities',
    categoryLabel: 'Utilities & Weather',
    numbers: ['16211', '(02) 8631-1111', '0920-971-6211', '0917-551-6211'],
    description:
      'Power distribution utility serving Morong, Rizal. Reporting fallen electrical poles, power outages, sparking transformers, and wire hazards.',
    availability: '24/7 Power Emergency',
    smsAvailable: true,
  },
  {
    id: 'maynilad-water',
    name: 'Maynilad Customer Hotline (West Zone)',
    agency: 'Maynilad Water Services',
    category: 'utilities',
    categoryLabel: 'Utilities & Weather',
    numbers: ['1626', '0998-864-1446'],
    description:
      'Water concessionaire for West Zone Metro Manila and parts of Cavite.',
    availability: '24/7 Customer Hotline',
    smsAvailable: true,
  },
];
