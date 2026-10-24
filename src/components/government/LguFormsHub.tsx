import { useState, useMemo } from 'react';
import {
  Search,
  FileDown,
  ExternalLink,
  Building,
  Briefcase,
  Activity,
  UserCheck,
  BookOpen,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertCircle,
  X,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router';
import lguDocsData from '../../../content/government/transparency-documents/lgu-public-documents-index.json';

export interface FormItem {
  id: string;
  title: string;
  slug: string;
  department: string;
  departmentKey: 'engineering' | 'bplo' | 'health' | 'working' | 'charter';
  formType: 'application' | 'requirements' | 'charter' | 'procedure';
  description: string;
  guideLink?: string;
  guideLabel?: string;
  processingTime?: string;
  fileUrl: string;
  fileSize?: number | null;
}

const DEPARTMENT_TABS = [
  { key: 'all', label: 'All Forms & Charters', icon: FileDown },
  { key: 'engineering', label: 'Building & Engineering (OBO)', icon: Building },
  { key: 'bplo', label: 'Business & Permits (BPLO)', icon: Briefcase },
  { key: 'health', label: 'Sanitation & Health (MHO)', icon: Activity },
  { key: 'working', label: 'Labor & Working Permits', icon: UserCheck },
  { key: 'charter', label: "Citizen's Charters", icon: BookOpen },
] as const;

// Curated metadata and department assignment for Morong official forms
function enrichFormItem(doc: {
  id: string;
  title: string;
  slug: string;
  fileUrl: string;
  fileSize?: number | null;
  category: string;
}): FormItem | null {
  const text = `${doc.title} ${doc.slug}`.toLowerCase();

  // Citizen's Charters
  if (
    doc.category === 'citizens-charter' ||
    /citizen(?:'?s)?\s*charter/i.test(text)
  ) {
    return {
      id: doc.id,
      title: doc.title,
      slug: doc.slug,
      department: 'Anti-Red Tape Authority (ARTA) & Municipal Administration',
      departmentKey: 'charter',
      formType: 'charter',
      description:
        'Official handbook detailing guaranteed service standards, fees, requirements, and maximum turnaround times under RA 11032.',
      guideLink: '/government/transparency-documents/citizens-charter-2025',
      guideLabel: "View Citizen's Charter Overview",
      processingTime: 'Public Reference',
      fileUrl: doc.fileUrl,
      fileSize: doc.fileSize,
    };
  }

  // Working Permit
  if (/working\s*permit/i.test(text)) {
    return {
      id: doc.id,
      title: "Mayor's Working Permit Application Form",
      slug: doc.slug,
      department: 'Office of the Municipal Mayor / Treasury',
      departmentKey: 'working',
      formType: 'application',
      description:
        "Prescribed application for Individual Mayor's Occupational Permit and Health Card required for local employment in Morong.",
      guideLink:
        '/services/civil-registry-and-ids/get-cedula-and-individual-working-permit',
      guideLabel: 'Working Permit & Cedula Guide',
      processingTime: 'Simple: 1 working day',
      fileUrl: doc.fileUrl,
      fileSize: doc.fileSize,
    };
  }

  // Business Permits (BPLO)
  if (/business/i.test(text) || /arta/i.test(text)) {
    const isArta = /arta/i.test(text);
    return {
      id: doc.id,
      title: doc.title,
      slug: doc.slug,
      department: 'Business Permits & Licensing Office (BPLO)',
      departmentKey: 'bplo',
      formType: 'application',
      description: isArta
        ? 'Unified ARTA business application form for new business registration and annual mayor’s permit renewals.'
        : 'Official municipal business permit application sheet for commercial operations in Morong.',
      guideLink:
        '/services/business/apply-for-barangay-clearance-and-mayors-business-permits',
      guideLabel: 'Business Registration Guide',
      processingTime: 'Simple / Renewal: 1 – 3 working days',
      fileUrl: doc.fileUrl,
      fileSize: doc.fileSize,
    };
  }

  // Health & Sanitation (MHO)
  if (/sanitary/i.test(text)) {
    const isReq = /requirement/i.test(text);
    return {
      id: doc.id,
      title: doc.title,
      slug: doc.slug,
      department: 'Municipal Health Office (MHO) — Sanitation Division',
      departmentKey: 'health',
      formType: isReq ? 'requirements' : 'application',
      description: isReq
        ? 'Documentary checklist including health certificates, chest X-rays, stool examinations, and water potability tests.'
        : 'Official application for Sanitary Permit inspection and clearance for food establishments and commercial buildings.',
      guideLink: '/services/health-services',
      guideLabel: 'Health Services Overview',
      processingTime: 'Simple: 1 – 2 working days',
      fileUrl: doc.fileUrl,
      fileSize: doc.fileSize,
    };
  }

  // Building & Engineering (OBO / Engineering / MPDO)
  if (
    /building|occupancy|electrical|demolition|excavation|fencing|locational|sign|bldg/i.test(
      text
    )
  ) {
    const specificGuide =
      '/services/housing-land-use/request-zoning-land-use-or-building-permits';
    let specificDesc =
      'Official engineering clearance and permit form under the National Building Code (PD 1096).';

    if (/occupancy/i.test(text)) {
      specificDesc =
        'Application for Certificate of Final Inspection and Occupancy before residential or commercial power/water energization.';
    } else if (/locational/i.test(text)) {
      specificDesc =
        'Application for Zoning & Locational Clearance from MPDO, a prerequisite before filing for a Building Permit.';
    } else if (/electrical/i.test(text)) {
      specificDesc =
        'Electrical wiring permit and certificate of final electrical inspection (CFEI) for Meralco energization.';
    } else if (/demolition/i.test(text)) {
      specificDesc =
        'Permit application for the safe dismantling and demolition of existing residential or commercial structures.';
    } else if (/excavation/i.test(text)) {
      specificDesc =
        'Excavation and ground preparation clearance for earthworks, slope alteration, or foundation work.';
    } else if (/fencing/i.test(text)) {
      specificDesc =
        'Requirements and specifications for perimeter fences, masonry walls, and boundary installations.';
    }

    const isReq = /requirement|procedure/i.test(text);

    return {
      id: doc.id,
      title: doc.title,
      slug: doc.slug,
      department: 'Office of the Municipal Engineer / Building Official (OBO)',
      departmentKey: 'engineering',
      formType: isReq ? 'requirements' : 'application',
      description: specificDesc,
      guideLink: specificGuide,
      guideLabel: 'Building & Zoning Permits Guide',
      processingTime: 'Complex: 3 – 7 working days',
      fileUrl: doc.fileUrl,
      fileSize: doc.fileSize,
    };
  }

  return null;
}

function formatFileSize(bytes?: number | null): string {
  if (!bytes) return 'Official PDF';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// Build static list of enriched forms
const allRawDocs = (lguDocsData.documents || []) as Array<{
  id: string;
  title: string;
  slug: string;
  fileUrl: string;
  fileSize?: number | null;
  category: string;
}>;

const allForms: FormItem[] = allRawDocs
  .map(enrichFormItem)
  .filter((f): f is FormItem => f !== null);

export default function LguFormsHub() {
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Department counts
  const counts = useMemo(() => {
    const c: Record<string, number> = { all: allForms.length };
    for (const f of allForms) {
      c[f.departmentKey] = (c[f.departmentKey] || 0) + 1;
    }
    return c;
  }, []);

  // Filtered forms
  const filteredForms = useMemo(() => {
    return allForms.filter(item => {
      if (selectedDept !== 'all' && item.departmentKey !== selectedDept) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesDept = item.department.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesDept) {
          return false;
        }
      }
      return true;
    });
  }, [selectedDept, searchQuery]);

  return (
    <div className="w-full space-y-6">
      {/* Hero / Header Card */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-6 md:p-8 text-white shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/30 text-blue-200 border border-blue-400/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ARTA RA 11032 Ease of Doing Business Standard</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Morong LGU Downloadable Forms Hub
            </h2>
            <p className="text-sm md:text-base text-blue-100/90 max-w-3xl leading-relaxed">
              Download official municipal application forms, engineering
              permits, ARTA unified business sheets, and Citizen’s Charter
              handbooks directly from official municipal servers before visiting
              Sitio Paglabas.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
            <div className="bg-white/10 backdrop-blur-xs rounded-xl p-4 border border-white/15 text-center">
              <span className="block text-3xl font-black text-white tracking-tight">
                {allForms.length}
              </span>
              <span className="text-xs uppercase tracking-wider text-blue-200 font-medium">
                Official Forms Indexed
              </span>
            </div>
          </div>
        </div>

        {/* Quick Advice Bar */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-blue-200/90">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-blue-300" />
            <span>Zero Hidden Fees: Only official municipal rates</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-blue-300" />
            <span>No-Noon-Break Policy: 8:00 AM – 5:00 PM</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Building className="w-4 h-4 text-blue-300" />
            <span>PACD Desk at Ground Floor Lobby</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-5 shadow-xs space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search forms by keyword (e.g., building, business permit, sanitary, electrical, occupancy, ARTA)..."
            className="w-full pl-10 pr-10 py-2.5 text-sm md:text-base bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Department Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {DEPARTMENT_TABS.map(tab => {
            const Icon = tab.icon;
            const count = counts[tab.key] || 0;
            const isSelected = selectedDept === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setSelectedDept(tab.key)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
                  isSelected
                    ? 'bg-primary-700 text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full ${
                    isSelected
                      ? 'bg-primary-800 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Forms Grid */}
      {filteredForms.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center space-y-3">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto" />
          <h3 className="text-lg font-bold text-gray-900">
            No application forms found
          </h3>
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            No downloadable forms match your current search criteria. Try a
            different keyword or reset your department filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedDept('all');
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary-700 hover:bg-primary-800 text-white text-xs font-semibold rounded-lg transition"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredForms.map(form => (
            <div
              key={form.id}
              className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary-500 hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Header Tags */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                    {form.formType === 'charter'
                      ? "Citizen's Charter"
                      : form.formType === 'requirements'
                        ? 'Checklist / Requirements'
                        : 'Application Form'}
                  </span>
                  <span className="text-[11px] font-medium text-gray-500">
                    {formatFileSize(form.fileSize)}
                  </span>
                  {form.processingTime && (
                    <span className="text-[11px] font-medium text-gray-500 ml-auto inline-flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      {form.processingTime}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-gray-950 leading-snug">
                  {form.title}
                </h3>

                {/* Department */}
                <p className="text-xs font-semibold text-primary-700 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 shrink-0" />
                  <span>{form.department}</span>
                </p>

                {/* Description */}
                <p className="text-xs text-gray-600 leading-relaxed">
                  {form.description}
                </p>
              </div>

              {/* Actions Footer */}
              <div className="mt-5 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2">
                {form.guideLink ? (
                  <Link
                    to={form.guideLink}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary-700 hover:text-primary-800 transition"
                  >
                    <span>{form.guideLabel || 'View Guide'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <span />
                )}

                <a
                  href={form.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-700 hover:bg-primary-800 text-white rounded-lg text-xs font-semibold transition shrink-0 shadow-2xs"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ARTA & Red Tape Advisory Footer */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 md:p-6 text-xs text-gray-700 space-y-3">
        <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
          <ShieldCheck className="w-4 h-4 text-primary-700" />
          <span>
            Citizen Rights under the Ease of Doing Business Act (RA 11032)
          </span>
        </div>
        <p className="leading-relaxed">
          The Municipality of Morong adheres to the statutory mandates of
          Republic Act No. 11032. Every applicant is entitled to a clear
          documentary checklist, a written acknowledgement receipt, and service
          within prescribed timelines (3 days for simple, 7 days for complex,
          and 20 days for highly technical transactions).
        </p>
        <div className="flex flex-wrap gap-4 text-gray-600">
          <span>
            <strong>Anti-Red Tape Authority (ARTA):</strong> Hotline 8-478-5093
          </span>
          <span>
            <strong>Contact Center ng Bayan:</strong> SMS 0908-881-6565
          </span>
          <span>
            <strong>BAC Procurement Tracker:</strong>{' '}
            <Link
              to="/government/transparency-documents/procurement-monitoring-reports"
              className="text-primary-700 font-semibold underline hover:text-primary-800"
            >
              View Municipal Bids & Contracts
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
