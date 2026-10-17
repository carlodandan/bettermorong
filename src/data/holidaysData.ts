export interface HolidayItem {
  id: string;
  name: string;
  date: string; // e.g., 'January 1' or '2026-01-01'
  month: number; // 1-12
  dayOfMonth: number;
  type: 'regular' | 'special-non-working' | 'local-rizal';
  typeLabel: string;
  description: string;
  legalBasis: string;
  isNational: boolean;
}

export const PHILIPPINE_HOLIDAYS_BASE: HolidayItem[] = [
  // A. Regular Holidays
  {
    id: 'new-years-day',
    name: "New Year's Day",
    date: 'January 1',
    month: 1,
    dayOfMonth: 1,
    type: 'regular',
    typeLabel: 'Regular Holiday',
    description: 'First day of the civil year in the Gregorian calendar.',
    legalBasis: 'Republic Act No. 9492 / Presidential Proclamation',
    isNational: true,
  },
  {
    id: 'maundy-thursday',
    name: 'Maundy Thursday',
    date: 'April 2',
    month: 4,
    dayOfMonth: 2,
    type: 'regular',
    typeLabel: 'Regular Holiday',
    description:
      'Christian holy day commemorating the Last Supper of Jesus Christ with the Apostles.',
    legalBasis: 'Republic Act No. 9492',
    isNational: true,
  },
  {
    id: 'good-friday',
    name: 'Good Friday',
    date: 'April 3',
    month: 4,
    dayOfMonth: 3,
    type: 'regular',
    typeLabel: 'Regular Holiday',
    description:
      'Christian holiday commemorating the crucifixion of Jesus and his death at Calvary.',
    legalBasis: 'Republic Act No. 9492',
    isNational: true,
  },
  {
    id: 'araw-ng-kagitingan',
    name: 'Araw ng Kagitingan (Day of Valor)',
    date: 'April 9',
    month: 4,
    dayOfMonth: 9,
    type: 'regular',
    typeLabel: 'Regular Holiday',
    description:
      'Commemorates the fall of Bataan during World War II and honors the bravery of Filipino and American soldiers.',
    legalBasis: 'Republic Act No. 3022',
    isNational: true,
  },
  {
    id: 'labor-day',
    name: 'Labor Day',
    date: 'May 1',
    month: 5,
    dayOfMonth: 1,
    type: 'regular',
    typeLabel: 'Regular Holiday',
    description:
      'Annual holiday to celebrate the achievements and contributions of Filipino workers and laborers.',
    legalBasis: 'Republic Act No. 9492',
    isNational: true,
  },
  {
    id: 'independence-day',
    name: 'Independence Day (Araw ng Kalayaan)',
    date: 'June 12',
    month: 6,
    dayOfMonth: 12,
    type: 'regular',
    typeLabel: 'Regular Holiday',
    description:
      'Commemorates the Philippine Declaration of Independence from Spain in 1898 in Kawit, Cavite.',
    legalBasis: 'Republic Act No. 4166',
    isNational: true,
  },
  {
    id: 'national-heroes-day',
    name: 'National Heroes Day',
    date: 'August 31',
    month: 8,
    dayOfMonth: 31,
    type: 'regular',
    typeLabel: 'Regular Holiday',
    description:
      'Celebrates all Filipino national heroes who fought for Philippine freedom and nationhood (last Monday of August).',
    legalBasis: 'Republic Act No. 9492',
    isNational: true,
  },
  {
    id: 'bonifacio-day',
    name: 'Bonifacio Day',
    date: 'November 30',
    month: 11,
    dayOfMonth: 30,
    type: 'regular',
    typeLabel: 'Regular Holiday',
    description:
      'Commemorates the birthday of Andres Bonifacio, the Father of the Philippine Revolution and Supremo of Katipunan.',
    legalBasis: 'Republic Act No. 9492',
    isNational: true,
  },
  {
    id: 'christmas-day',
    name: 'Christmas Day',
    date: 'December 25',
    month: 12,
    dayOfMonth: 25,
    type: 'regular',
    typeLabel: 'Regular Holiday',
    description: 'Christian festival celebrating the birth of Jesus Christ.',
    legalBasis: 'Republic Act No. 9492',
    isNational: true,
  },
  {
    id: 'rizal-day',
    name: 'Rizal Day',
    date: 'December 30',
    month: 12,
    dayOfMonth: 30,
    type: 'regular',
    typeLabel: 'Regular Holiday',
    description:
      'Commemorates the life and works of Dr. Jose Rizal, national hero of the Philippines, and his martyrdom in Bagumbayan.',
    legalBasis: 'Republic Act No. 229',
    isNational: true,
  },
  {
    id: 'eidl-fitr',
    name: "Eid'l Fitr (Feast of Ramadhan)",
    date: 'March 31', // Approx astronomical date, proclaimed officially
    month: 3,
    dayOfMonth: 31,
    type: 'regular',
    typeLabel: 'Regular Holiday',
    description:
      'Marks the end of Ramadan, the Islamic holy month of dawn-to-sunset fasting. Official date declared by Malacañang.',
    legalBasis: 'Republic Act No. 9177',
    isNational: true,
  },
  {
    id: 'eidl-adha',
    name: "Eid'l Adha (Feast of the Sacrifice)",
    date: 'June 7', // Approx astronomical date, proclaimed officially
    month: 6,
    dayOfMonth: 7,
    type: 'regular',
    typeLabel: 'Regular Holiday',
    description:
      'Honors the willingness of Ibrahim to sacrifice his son as an act of obedience to God. Official date declared by Malacañang.',
    legalBasis: 'Republic Act No. 9849',
    isNational: true,
  },

  // B. Special (Non-Working) Holidays
  {
    id: 'chinese-new-year',
    name: 'Chinese New Year (Spring Festival)',
    date: 'February 17',
    month: 2,
    dayOfMonth: 17,
    type: 'special-non-working',
    typeLabel: 'Special Non-Working Day',
    description:
      'Celebrates the beginning of a new year on the traditional lunisolar Chinese calendar.',
    legalBasis: 'Presidential Proclamation',
    isNational: true,
  },
  {
    id: 'black-saturday',
    name: 'Black Saturday',
    date: 'April 4',
    month: 4,
    dayOfMonth: 4,
    type: 'special-non-working',
    typeLabel: 'Special Non-Working Day',
    description: 'Day of the Holy Week between Good Friday and Easter Sunday.',
    legalBasis: 'Presidential Proclamation',
    isNational: true,
  },
  {
    id: 'ninoy-aquino-day',
    name: 'Ninoy Aquino Day',
    date: 'August 21',
    month: 8,
    dayOfMonth: 21,
    type: 'special-non-working',
    typeLabel: 'Special Non-Working Day',
    description:
      'Commemorates the assassination of former Senator Benigno "Ninoy" Aquino Jr. in 1983.',
    legalBasis: 'Republic Act No. 9256',
    isNational: true,
  },
  {
    id: 'all-saints-day',
    name: "All Saints' Day (Undas)",
    date: 'November 1',
    month: 11,
    dayOfMonth: 1,
    type: 'special-non-working',
    typeLabel: 'Special Non-Working Day',
    description:
      'Solemnity honoring all Christian saints and martyrs; traditional day for families to visit cemeteries.',
    legalBasis: 'Presidential Proclamation',
    isNational: true,
  },
  {
    id: 'all-souls-day',
    name: "All Souls' Day",
    date: 'November 2',
    month: 11,
    dayOfMonth: 2,
    type: 'special-non-working',
    typeLabel: 'Special Non-Working Day',
    description:
      'Traditional day of remembrance and prayers for departed souls of loved ones.',
    legalBasis: 'Presidential Proclamation',
    isNational: true,
  },
  {
    id: 'immaculate-conception',
    name: 'Feast of the Immaculate Conception of Mary',
    date: 'December 8',
    month: 12,
    dayOfMonth: 8,
    type: 'special-non-working',
    typeLabel: 'Special Non-Working Day',
    description:
      'Celebrates the Catholic belief in the sinless conception of Mary, Principal Patroness of the Philippines.',
    legalBasis: 'Republic Act No. 10966',
    isNational: true,
  },
  {
    id: 'christmas-eve',
    name: 'Christmas Eve',
    date: 'December 24',
    month: 12,
    dayOfMonth: 24,
    type: 'special-non-working',
    typeLabel: 'Special Non-Working Day',
    description:
      'Day preceding Christmas Day, traditional family gathering and Noche Buena.',
    legalBasis: 'Presidential Proclamation',
    isNational: true,
  },
  {
    id: 'last-day-of-the-year',
    name: 'Last Day of the Year',
    date: 'December 31',
    month: 12,
    dayOfMonth: 31,
    type: 'special-non-working',
    typeLabel: 'Special Non-Working Day',
    description: 'New Year’s Eve, the final day of the calendar year.',
    legalBasis: 'Presidential Proclamation',
    isNational: true,
  },

  // C. Local Rizal Province & Morong Holidays
  {
    id: 'rizal-foundation-day',
    name: 'Araw ng Lalawigan ng Rizal (Rizal Province Foundation Day)',
    date: 'June 11',
    month: 6,
    dayOfMonth: 11,
    type: 'local-rizal',
    typeLabel: 'Special Non-Working (Rizal Province)',
    description:
      'Commemorates the establishment of the Province of Rizal in 1901 under Act No. 137. Special non-working holiday in the entire Province of Rizal including Morong.',
    legalBasis: 'Republic Act No. 11144',
    isNational: false,
  },
  {
    id: 'morong-sanrok-festival',
    name: 'Sanrok sa Ringring Festival & Feast of St. Jerome',
    date: 'February 1', // Traditional municipal fiesta / celebration
    month: 2,
    dayOfMonth: 1,
    type: 'local-rizal',
    typeLabel: 'Local Municipal Observance (Morong)',
    description:
      'Annual cultural festival and patronal feast of St. Jerome in Morong, Rizal featuring community street dancing, food bazaars, and traditional cultural heritage.',
    legalBasis: 'Municipal Ordinance / Local Proclamation',
    isNational: false,
  },
];

export interface FormattedHoliday extends HolidayItem {
  year: number;
  dayOfWeek: string;
  isUpcoming: boolean;
  daysUntil: number;
}

export function getHolidaysForYear(
  year: number = new Date().getFullYear()
): FormattedHoliday[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  return PHILIPPINE_HOLIDAYS_BASE.map(holiday => {
    const holidayDate = new Date(year, holiday.month - 1, holiday.dayOfMonth);
    const dayOfWeek = daysOfWeek[holidayDate.getDay()];

    // Difference in calendar days
    const diffTime = holidayDate.getTime() - today.getTime();
    const daysUntil = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const isUpcoming = daysUntil >= 0;

    return {
      ...holiday,
      year,
      dayOfWeek,
      isUpcoming,
      daysUntil,
    };
  }).sort((a, b) => {
    const dateA = new Date(year, a.month - 1, a.dayOfMonth).getTime();
    const dateB = new Date(year, b.month - 1, b.dayOfMonth).getTime();
    return dateA - dateB;
  });
}
