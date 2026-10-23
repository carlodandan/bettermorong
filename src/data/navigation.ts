import type { NavigationItem } from '../types';
import {
  serviceCategories as servicesData,
  governmentCategories as governmentData,
} from './yamlLoader';

interface Subcategory {
  name: string;
  slug: string;
}

interface Category {
  category: string;
  slug: string;
  subcategories: Subcategory[];
}

export const mainNavigation: NavigationItem[] = [
  {
    label: 'Services',
    href: '/services',
    children: (servicesData.categories as Category[]).map(category => ({
      label: category.category,
      href: `/services/${category.slug}`,
    })),
  },
  {
    label: 'Government',
    href: '/government',
    children: (governmentData.categories as Category[])
      .filter(category => category.slug !== 'about-morong')
      .map(category => ({
        label: category.category,
        href: `/government/${category.slug}`,
      })),
  },
];

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface FooterNavigation {
  mainSections: FooterSection[];
  socialLinks: {
    label: string;
    href: string;
    icon?: string;
  }[];
}

export const footerNavigation: FooterNavigation = {
  mainSections: [
    {
      title: 'About Morong',
      links: [
        { label: 'About Morong', href: '/government/about-morong' },
        {
          label: 'Vision & Mission',
          href: '/government/about-morong/vision-and-mission',
        },
        {
          label: 'Demographics & Barangays',
          href: '/government/about-morong/demographics-and-barangays',
        },
        {
          label: 'History & Heritage',
          href: '/government/about-morong/history-and-heritage',
        },
        {
          label: 'Tourist Spots & Dining',
          href: '/government/about-morong/tourist-spots-and-local-attractions',
        },
        {
          label: 'Municipal Directory',
          href: '/government/departments',
        },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'All Services', href: '/services' },
        ...(servicesData.categories as Category[])
          .slice(0, 5)
          .map(category => ({
            label: category.category,
            href: `/services/${category.slug}`,
          })),
        {
          label: 'Emergency Hotlines',
          href: '/philippines-hotlines',
        },
        { label: 'Philippine Holidays', href: '/philippines-holidays' },
      ],
    },
    {
      title: 'Resources',
      links: [
        {
          label: 'Official Facebook Page',
          href: 'https://www.facebook.com/morongrizal1960',
        },
        {
          label: 'Official Website',
          href: 'https://morongrizal.gov.ph/',
        },
        {
          label: 'Bureau of Local Government Finance (BLGF)',
          href: 'https://blgf.gov.ph/',
        },
        {
          label: 'DPWH Transparency Portal',
          href: 'https://transparency.dpwh.gov.ph/',
        },
        {
          label: 'Open Data Philippines',
          href: 'https://data.gov.ph/index/home',
        },
        {
          label: 'Freedom of Information (FOI)',
          href: 'https://www.foi.gov.ph',
        },
        {
          label: 'Official Gazette',
          href: 'https://www.officialgazette.gov.ph',
        },
      ],
    },
  ],
  socialLinks: [
    { label: 'Facebook', href: 'https://www.facebook.com/bettermorong.org' },
    { label: 'Website', href: 'https://bettermorong.org' },
    { label: 'GitHub', href: 'https://github.com/carlodandan/bettermorong' },
  ],
};
