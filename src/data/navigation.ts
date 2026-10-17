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

export const footerNavigation = {
  mainSections: [
    {
      title: 'About',
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
          label: 'Municipal Offices Directory',
          href: '/government/departments',
        },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'All Services', href: '/services' },
        ...(servicesData.categories as Category[])
          .slice(0, 6)
          .map(category => ({
            label: category.category,
            href: `/services/${category.slug}`,
          })),
        {
          label: 'Philippines & Emergency Hotlines',
          href: '/philippines/hotlines',
        },
        { label: 'Philippines Holidays', href: '/philippines/holidays' },
      ],
    },
    {
      title: 'Government',
      links: [
        { label: 'Open Data', href: 'https://data.gov.ph' },
        { label: 'Freedom of Information', href: 'https://www.foi.gov.ph' },
        {
          label: 'Contact Center',
          href: 'https://contactcenterngbayan.gov.ph',
        },
        {
          label: 'Official Gazette',
          href: 'https://www.officialgazette.gov.ph',
        },
      ],
    },
  ],
  socialLinks: [
    { label: 'Facebook', href: 'https://facebook.com/govph' },
    { label: 'Twitter', href: 'https://twitter.com/govph' },
    { label: 'Instagram', href: 'https://instagram.com/govph' },
    { label: 'YouTube', href: 'https://youtube.com/govph' },
  ],
};
