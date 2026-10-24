import { useState, useMemo, Fragment } from 'react';
import {
  Search,
  FileText,
  ExternalLink,
  Calendar,
  Building2,
  X,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  FileDown,
} from 'lucide-react';
import { Link } from 'react-router';
import lguDocsData from '../../../content/government/transparency-documents/lgu-public-documents-index.json';

export interface LguDocument {
  id: string;
  title: string;
  slug: string;
  category: string;
  categoryLabel: string;
  date: string;
  year: string;
  fileUrl: string;
  fileSize?: number | null;
  barangays: string[];
}

const CATEGORY_STYLES: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  'notice-of-award': {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
  },
  'notice-to-proceed': {
    bg: 'bg-teal-50',
    text: 'text-teal-700',
    border: 'border-teal-200',
  },
  'invitation-to-bid': {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
  },
  'bidding-documents': {
    bg: 'bg-indigo-50',
    text: 'text-indigo-700',
    border: 'border-indigo-200',
  },
  'financial-disclosure': {
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    border: 'border-purple-200',
  },
  'citizens-charter': {
    bg: 'bg-amber-50',
    text: 'text-amber-800',
    border: 'border-amber-200',
  },
  'application-form': {
    bg: 'bg-emerald-50',
    text: 'text-emerald-800',
    border: 'border-emerald-200',
  },
  'executive-order': {
    bg: 'bg-cyan-50',
    text: 'text-cyan-800',
    border: 'border-cyan-200',
  },
  'ordinance-resolution': {
    bg: 'bg-rose-50',
    text: 'text-rose-800',
    border: 'border-rose-200',
  },
  'other-public-document': {
    bg: 'bg-slate-50',
    text: 'text-slate-700',
    border: 'border-slate-200',
  },
};

const BARANGAYS = [
  'All Barangays',
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

const ITEMS_PER_PAGE = 10;

const allRawDocs = (lguDocsData.documents || []) as LguDocument[];
// Exclude application permit forms and citizen charters (hosted in the dedicated Forms Hub)
const documents = allRawDocs.filter(
  doc =>
    doc.category !== 'application-form' && doc.category !== 'citizens-charter'
);
const metadata = {
  totalDocuments: documents.length,
  availableYears: lguDocsData.metadata?.availableYears || [],
};

const categoriesMap = new Map<string, string>();
for (const doc of documents) {
  if (doc.category && doc.categoryLabel) {
    categoriesMap.set(doc.category, doc.categoryLabel);
  }
}
const categoriesList = Array.from(categoriesMap.entries());

export default function LguDocumentsExplorer() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedBarangay, setSelectedBarangay] =
    useState<string>('All Barangays');
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc' | 'title-asc'>(
    'date-desc'
  );
  const [currentPage, setCurrentPage] = useState(1);

  // Filtered documents
  const filteredDocuments = useMemo(() => {
    return documents.filter(doc => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = doc.title.toLowerCase().includes(q);
        const matchesSlug = doc.slug.toLowerCase().includes(q);
        const matchesCat = doc.categoryLabel.toLowerCase().includes(q);
        const matchesBarangay = doc.barangays.some(b =>
          b.toLowerCase().includes(q)
        );
        if (!matchesTitle && !matchesSlug && !matchesCat && !matchesBarangay) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== 'all' && doc.category !== selectedCategory) {
        return false;
      }

      // Year filter
      if (selectedYear !== 'all' && doc.year !== selectedYear) {
        return false;
      }

      // Barangay filter
      if (selectedBarangay !== 'All Barangays') {
        const matchesBarangay = doc.barangays.includes(selectedBarangay);
        if (!matchesBarangay) return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedYear, selectedBarangay]);

  // Sorted documents
  const sortedDocuments = useMemo(() => {
    return [...filteredDocuments].sort((a, b) => {
      if (sortBy === 'date-desc') {
        return (
          (b.date || '').localeCompare(a.date || '') ||
          a.title.localeCompare(b.title)
        );
      }
      if (sortBy === 'date-asc') {
        return (
          (a.date || '').localeCompare(b.date || '') ||
          a.title.localeCompare(b.title)
        );
      }
      return a.title.localeCompare(b.title);
    });
  }, [filteredDocuments, sortBy]);

  // Pagination
  const totalPages = Math.ceil(sortedDocuments.length / ITEMS_PER_PAGE) || 1;
  const paginatedDocs = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedDocuments.slice(start, start + ITEMS_PER_PAGE);
  }, [sortedDocuments, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedYear('all');
    setSelectedBarangay('All Barangays');
    setSortBy('date-desc');
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6 mt-8">
      {/* Header Info Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/30 text-blue-200 border border-blue-400/30 mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Official Transparency Archive</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Municipal Public Documents & Procurement Explorer
            </h2>
            <p className="mt-2 text-sm md:text-base text-blue-100/90 max-w-2xl leading-relaxed">
              Explore public procurement records, BAC Notices of Award,
              Invitations to Bid, financial disclosures, and official executive
              documents published by the Municipal Government of Morong, Rizal.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-xs border border-white/15 rounded-xl p-4 text-center shrink-0 self-start md:self-auto">
            <span className="text-3xl font-black block tracking-tight">
              {metadata.totalDocuments}
            </span>
            <span className="text-xs uppercase tracking-wider text-blue-200 font-medium">
              Indexed Documents
            </span>
          </div>
        </div>
      </div>

      {/* Forms Hub Referral Callout */}
      <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-blue-950">
        <div className="flex items-center gap-2.5">
          <FileDown className="w-4 h-4 text-primary-700 shrink-0" />
          <span>
            Looking for business permits, building clearances, sanitary forms,
            or working permit templates?
          </span>
        </div>
        <Link
          to="/government/transparency-documents/downloadable-forms"
          className="font-semibold text-primary-700 hover:text-primary-800 underline shrink-0 inline-flex items-center gap-1"
        >
          <span>Visit Downloadable Forms Hub</span>
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by project name, document title, or keyword..."
            className="w-full pl-10 pr-10 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-gray-900"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setCurrentPage(1);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Controls Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Category Filter */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Document Category
            </label>
            <select
              value={selectedCategory}
              onChange={e => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full text-xs md:text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">
                All Document Types ({documents.length})
              </option>
              {categoriesList.map(([cat, label]) => (
                <option key={cat} value={cat}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Year Filter */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Year Published
            </label>
            <select
              value={selectedYear}
              onChange={e => {
                setSelectedYear(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full text-xs md:text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Years</option>
              {(metadata.availableYears || []).map(yr => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
          </div>

          {/* Barangay Filter */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Tagged Barangay
            </label>
            <select
              value={selectedBarangay}
              onChange={e => {
                setSelectedBarangay(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full text-xs md:text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {BARANGAYS.map(b => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Control */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={e => {
                setSortBy(
                  e.target.value as 'date-desc' | 'date-asc' | 'title-asc'
                );
                setCurrentPage(1);
              }}
              className="w-full text-xs md:text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="title-asc">Title (A – Z)</option>
            </select>
          </div>
        </div>

        {/* Active Filters Summary */}
        <div className="flex flex-wrap items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100 gap-2">
          <div>
            Showing{' '}
            <strong className="text-gray-900">
              {filteredDocuments.length}
            </strong>{' '}
            of <strong className="text-gray-900">{documents.length}</strong>{' '}
            documents
          </div>
          {(searchQuery ||
            selectedCategory !== 'all' ||
            selectedYear !== 'all' ||
            selectedBarangay !== 'All Barangays') && (
            <button
              onClick={handleResetFilters}
              className="text-primary-700 hover:text-primary-800 font-medium inline-flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" /> Reset all filters
            </button>
          )}
        </div>
      </div>

      {/* Documents Results List */}
      {paginatedDocs.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-xs">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-gray-800">
            No public documents found
          </h3>
          <p className="text-sm text-gray-500 mt-1 max-w-md mx-auto">
            No records matched your search query or filter selection. Try
            adjusting keywords or clearing active filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="mt-4 px-4 py-2 bg-primary-50 text-primary-700 hover:bg-primary-100 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {paginatedDocs.map(doc => {
            const badgeStyle =
              CATEGORY_STYLES[doc.category] ||
              CATEGORY_STYLES['other-public-document'];
            return (
              <div
                key={doc.id}
                className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary-300 hover:shadow-xs transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-2 max-w-3xl">
                  {/* Category and Badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border}`}
                    >
                      {doc.categoryLabel}
                    </span>
                    {doc.year && doc.year !== 'Unknown' && (
                      <span className="inline-flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md font-medium">
                        <Calendar className="w-3 h-3 text-gray-500" />
                        {doc.year}
                      </span>
                    )}
                    {doc.barangays.map(b => (
                      <span
                        key={b}
                        className="inline-flex items-center gap-1 text-xs text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md font-medium"
                      >
                        <Building2 className="w-3 h-3 text-indigo-500" />
                        {b}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-gray-900 leading-snug">
                    {doc.title}
                  </h3>

                  {/* Metadata line */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                    {doc.date && (
                      <span>
                        Published: <time dateTime={doc.date}>{doc.date}</time>
                      </span>
                    )}
                    <span>Source: Official Morong LGU Portal</span>
                  </div>
                </div>

                {/* View / Download Action Button */}
                <div className="shrink-0 self-start md:self-center">
                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
                  >
                    <span>View Official PDF</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-xs">
          <div className="text-xs text-gray-600">
            Page <strong className="text-gray-900">{currentPage}</strong> of{' '}
            <strong className="text-gray-900">{totalPages}</strong>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-gray-700"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="hidden sm:flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  p =>
                    p === 1 ||
                    p === totalPages ||
                    Math.abs(p - currentPage) <= 1
                )
                .map((p, idx, arr) => {
                  const prev = arr[idx - 1];
                  const showEllipsis = prev && p - prev > 1;
                  return (
                    <Fragment key={p}>
                      {showEllipsis && (
                        <span className="px-1 text-gray-400 text-xs">...</span>
                      )}
                      <button
                        onClick={() => handlePageChange(p)}
                        className={`w-7 h-7 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                          currentPage === p
                            ? 'bg-primary-600 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {p}
                      </button>
                    </Fragment>
                  );
                })}
            </div>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-gray-700"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
