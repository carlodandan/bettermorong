import { useState, useMemo } from 'react';
import {
  Search,
  FileText,
  Clock,
  Coins,
  Building2,
  UserCheck,
  ChevronDown,
  ChevronUp,
  X,
  ShieldCheck,
  FileDown,
  HelpCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import charterData from '../../data/citizensCharter.json';

export interface ServiceStep {
  client_step: string;
  agency_action: string;
  fees: string;
  processing_time: string;
  person_responsible: string;
}

export interface ServiceRequirement {
  requirement: string;
  where_to_secure: string;
}

export interface CharterService {
  service_number: number;
  service_name: string;
  office: string;
  department_head: string;
  department_designation: string;
  page_start: number;
  page_end: number;
  about: string;
  classification: string;
  transaction_type: string;
  who_may_avail: string;
  checklist_of_requirements: ServiceRequirement[];
  procedures: ServiceStep[];
  total_fees: string;
  total_processing_time: string;
}

export default function CitizensCharterExplorer() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOffice, setSelectedOffice] = useState('ALL');
  const [selectedClassification, setSelectedClassification] = useState('ALL');
  const [selectedTransactionType, setSelectedTransactionType] = useState('ALL');
  const [expandedServiceId, setExpandedServiceId] = useState<number | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const services = charterData.services as CharterService[];

  // Unique list of offices with service counts
  const officesList = useMemo(() => {
    const counts = new Map<string, number>();
    services.forEach(s => {
      counts.set(s.office, (counts.get(s.office) || 0) + 1);
    });
    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [services]);

  // Filtered services
  const filteredServices = useMemo(() => {
    return services.filter(service => {
      // Office filter
      if (selectedOffice !== 'ALL' && service.office !== selectedOffice) {
        return false;
      }

      // Classification filter
      if (selectedClassification !== 'ALL') {
        if (
          !service.classification
            .toLowerCase()
            .includes(selectedClassification.toLowerCase())
        ) {
          return false;
        }
      }

      // Transaction Type filter
      if (selectedTransactionType !== 'ALL') {
        if (
          !service.transaction_type
            .toLowerCase()
            .includes(selectedTransactionType.toLowerCase())
        ) {
          return false;
        }
      }

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = service.service_name.toLowerCase().includes(query);
        const matchesOffice = service.office.toLowerCase().includes(query);
        const matchesHead = service.department_head
          .toLowerCase()
          .includes(query);
        const matchesAbout = service.about.toLowerCase().includes(query);
        const matchesRequirements = service.checklist_of_requirements.some(
          r =>
            r.requirement.toLowerCase().includes(query) ||
            r.where_to_secure.toLowerCase().includes(query)
        );
        const matchesProcedures = service.procedures.some(
          p =>
            p.client_step.toLowerCase().includes(query) ||
            p.agency_action.toLowerCase().includes(query)
        );

        if (
          !matchesName &&
          !matchesOffice &&
          !matchesHead &&
          !matchesAbout &&
          !matchesRequirements &&
          !matchesProcedures
        ) {
          return false;
        }
      }

      return true;
    });
  }, [
    services,
    selectedOffice,
    selectedClassification,
    selectedTransactionType,
    searchQuery,
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const paginatedServices = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredServices.slice(start, start + itemsPerPage);
  }, [filteredServices, currentPage]);

  const toggleExpand = (id: number) => {
    setExpandedServiceId(prev => (prev === id ? null : id));
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedOffice('ALL');
    setSelectedClassification('ALL');
    setSelectedTransactionType('ALL');
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedOffice !== 'ALL' ||
    selectedClassification !== 'ALL' ||
    selectedTransactionType !== 'ALL';

  return (
    <div className="space-y-6 my-8 font-sans" id="charter-explorer">
      {/* Top Banner / Card */}
      <div className="bg-gradient-to-r from-primary-900 via-primary-800 to-primary-700 text-white rounded-2xl p-6 md:p-8 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 backdrop-blur-sm text-primary-100 border border-white/20">
              <ShieldCheck className="w-3.5 h-3.5 text-accent-400" />
              Republic Act No. 11032 & RA 9485 Compliant
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Interactive Citizen’s Charter Explorer
            </h2>
            <p className="text-sm md:text-base text-primary-100 max-w-2xl leading-relaxed">
              Instantly search and inspect all 115 frontline municipal services
              of Morong, Rizal. Find required documentary attachments, official
              fees, processing times, and responsible officers with zero
              guesswork.
            </p>
          </div>

          {/* Download shortcuts */}
          <div className="flex flex-wrap sm:flex-nowrap md:flex-col gap-2 shrink-0">
            <a
              href="/files/CITIZEN-CHARTER-2025.pdf"
              download="Morong-Citizens-Charter-2025.pdf"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-primary-900 font-semibold text-xs md:text-sm hover:bg-primary-50 transition shadow-sm hover:shadow"
            >
              <FileDown className="w-4 h-4 text-primary-600" />
              Download PDF (2.3 MB)
            </a>
            <a
              href="/files/CITIZEN-CHARTER-2025.json"
              download="Morong-Citizens-Charter-2025.json"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-primary-800/80 hover:bg-primary-800 text-white text-xs border border-white/20 transition"
            >
              <FileText className="w-3.5 h-3.5 text-accent-300" />
              Open Data JSON
            </a>
          </div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6 shadow-sm space-y-4">
        {/* Main Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by service name, requirement, office, or keyword (e.g. Cedula, Tax Declaration, SPES, Marriage, Burial, PWD)..."
            className="w-full pl-11 pr-10 py-3 bg-gray-50 hover:bg-white focus:bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setCurrentPage(1);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded-md"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filters Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          {/* Office Select */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
              Municipal Office ({officesList.length})
            </label>
            <div className="relative">
              <Building2 className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <select
                value={selectedOffice}
                onChange={e => {
                  setSelectedOffice(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-9 pr-8 py-2.5 bg-gray-50 hover:bg-white focus:bg-white border border-gray-200 rounded-xl text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-800 transition truncate"
              >
                <option value="ALL">
                  All Municipal Offices (115 Services)
                </option>
                {officesList.map(off => (
                  <option key={off.name} value={off.name}>
                    {off.name} ({off.count})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Classification Select */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
              Service Classification
            </label>
            <div className="relative">
              <Clock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <select
                value={selectedClassification}
                onChange={e => {
                  setSelectedClassification(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-9 pr-8 py-2.5 bg-gray-50 hover:bg-white focus:bg-white border border-gray-200 rounded-xl text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-800 transition"
              >
                <option value="ALL">All Classifications</option>
                <option value="Simple">
                  Simple (≤ 3 Working Days / Minutes)
                </option>
                <option value="Complex">Complex (≤ 7 Working Days)</option>
                <option value="Highly Technical">
                  Highly Technical (≤ 20 Working Days)
                </option>
              </select>
            </div>
          </div>

          {/* Transaction Type Select */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
              Transaction Client Type
            </label>
            <div className="relative">
              <UserCheck className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <select
                value={selectedTransactionType}
                onChange={e => {
                  setSelectedTransactionType(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-9 pr-8 py-2.5 bg-gray-50 hover:bg-white focus:bg-white border border-gray-200 rounded-xl text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-800 transition"
              >
                <option value="ALL">All Transaction Types</option>
                <option value="G2C">G2C (Government to Citizen)</option>
                <option value="G2B">G2B (Government to Business)</option>
                <option value="G2G">G2G (Government to Government)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Counter and Active Filter Tags */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-100 text-xs">
          <div className="text-gray-600">
            Showing{' '}
            <span className="font-bold text-gray-900">
              {filteredServices.length}
            </span>{' '}
            of{' '}
            <span className="font-semibold text-gray-900">
              {services.length}
            </span>{' '}
            frontline services
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition"
            >
              <X className="w-3.5 h-3.5" />
              Reset all filters
            </button>
          )}
        </div>
      </div>

      {/* Services List / Cards */}
      {filteredServices.length === 0 ? (
        <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-12 text-center space-y-3">
          <HelpCircle className="w-10 h-10 text-gray-400 mx-auto" />
          <h3 className="text-lg font-bold text-gray-900">
            No matching frontline services found
          </h3>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            We couldn't find any service matching your search or filters. Try
            adjusting keywords or clearing office filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-medium text-xs md:text-sm transition mt-2"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {paginatedServices.map(service => {
            const isExpanded = expandedServiceId === service.service_number;

            return (
              <div
                key={service.service_number}
                className={`bg-white border rounded-2xl transition-all shadow-sm ${
                  isExpanded
                    ? 'border-primary-500 ring-2 ring-primary-100'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {/* Header Row */}
                <div
                  onClick={() => toggleExpand(service.service_number)}
                  className="p-4 md:p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 select-none"
                  role="button"
                  tabIndex={0}
                  aria-expanded={isExpanded}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleExpand(service.service_number);
                    }
                  }}
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary-100 text-primary-800">
                        Service #{service.service_number}
                      </span>
                      <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5" />
                        {service.office}
                      </span>
                    </div>

                    <h3 className="text-base md:text-lg font-bold text-gray-900 leading-snug">
                      {service.service_name}
                    </h3>

                    <p className="text-xs md:text-sm text-gray-600 line-clamp-2">
                      {service.about}
                    </p>
                  </div>

                  {/* Badges and Toggle Action */}
                  <div className="flex flex-wrap md:flex-col items-center md:items-end justify-between gap-2.5 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-gray-100">
                    <div className="flex items-center gap-2">
                      {/* Classification Badge */}
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold ${
                          service.classification
                            .toLowerCase()
                            .includes('simple')
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : service.classification
                                  .toLowerCase()
                                  .includes('complex')
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        <Clock className="w-3 h-3" />
                        {service.classification || 'Simple'}
                      </span>

                      {/* Fees Badge */}
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-gray-100 text-gray-800 border border-gray-200">
                        <Coins className="w-3 h-3 text-amber-600" />
                        {service.total_fees.toLowerCase().includes('none') ||
                        !service.total_fees
                          ? 'Free / No Charge'
                          : service.total_fees}
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-600 hover:text-primary-800">
                      <span>
                        {isExpanded
                          ? 'Hide Details'
                          : 'View Requirements & Steps'}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Details Section */}
                {isExpanded && (
                  <div className="px-4 pb-6 md:px-6 pt-2 border-t border-gray-100 space-y-6">
                    {/* Metadata Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-gray-50 rounded-xl p-4 text-xs">
                      <div>
                        <span className="block text-gray-500 font-medium">
                          Department Head
                        </span>
                        <span className="font-semibold text-gray-900">
                          {service.department_head}
                        </span>
                        <span className="block text-gray-500 text-[11px]">
                          {service.department_designation}
                        </span>
                      </div>
                      <div>
                        <span className="block text-gray-500 font-medium">
                          Eligible Clients
                        </span>
                        <span className="font-semibold text-gray-900">
                          {service.who_may_avail}
                        </span>
                      </div>
                      <div>
                        <span className="block text-gray-500 font-medium">
                          Standard Processing Time
                        </span>
                        <span className="font-semibold text-gray-900">
                          {service.total_processing_time || 'Immediate'}
                        </span>
                      </div>
                      <div>
                        <span className="block text-gray-500 font-medium">
                          Charter Reference
                        </span>
                        <span className="font-semibold text-gray-900">
                          Pages {service.page_start} – {service.page_end}
                        </span>
                      </div>
                    </div>

                    {/* Checklist of Requirements */}
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Checklist of Requirements (
                        {service.checklist_of_requirements.length})
                      </h4>

                      {service.checklist_of_requirements.length === 0 ? (
                        <p className="text-xs text-gray-500 italic bg-gray-50 p-3 rounded-lg">
                          No special documentary requirements listed. Standard
                          valid ID or inquiry form applies.
                        </p>
                      ) : (
                        <div className="overflow-x-auto border border-gray-200 rounded-xl">
                          <table className="w-full text-left text-xs border-collapse">
                            <thead>
                              <tr className="bg-gray-100/70 border-b border-gray-200 text-gray-700 font-semibold">
                                <th className="p-3 w-2/3">
                                  Requirement Document
                                </th>
                                <th className="p-3 w-1/3">Where to Secure</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                              {service.checklist_of_requirements.map(
                                (req, rIdx) => (
                                  <tr
                                    key={rIdx}
                                    className="hover:bg-gray-50/70 transition"
                                  >
                                    <td className="p-3 text-gray-800 font-medium">
                                      {req.requirement}
                                    </td>
                                    <td className="p-3 text-gray-600">
                                      {req.where_to_secure ||
                                        'Client / Issuing Agency'}
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>

                    {/* Step-by-Step Procedure */}
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-3">
                        <Clock className="w-4 h-4 text-primary-600" />
                        Step-by-Step Procedure & Agency Workflow
                      </h4>

                      {service.procedures.length === 0 ? (
                        <p className="text-xs text-gray-500 italic bg-gray-50 p-3 rounded-lg">
                          Workflow follows standard municipal frontline desk
                          intake and verification.
                        </p>
                      ) : (
                        <div className="overflow-x-auto border border-gray-200 rounded-xl">
                          <table className="w-full text-left text-xs border-collapse">
                            <thead>
                              <tr className="bg-gray-100/70 border-b border-gray-200 text-gray-700 font-semibold">
                                <th className="p-3 w-12 text-center">Step</th>
                                <th className="p-3 w-1/3">Client Step</th>
                                <th className="p-3 w-1/3">Agency Action</th>
                                <th className="p-3">Fees</th>
                                <th className="p-3">Time</th>
                                <th className="p-3">Person Responsible</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                              {service.procedures.map((proc, pIdx) => (
                                <tr
                                  key={pIdx}
                                  className="hover:bg-gray-50/70 transition"
                                >
                                  <td className="p-3 text-center font-bold text-gray-500">
                                    {pIdx + 1}
                                  </td>
                                  <td className="p-3 text-gray-800 font-medium leading-relaxed">
                                    {proc.client_step}
                                  </td>
                                  <td className="p-3 text-gray-600 leading-relaxed">
                                    {proc.agency_action}
                                  </td>
                                  <td className="p-3 font-semibold text-gray-800 whitespace-nowrap">
                                    {proc.fees || 'None'}
                                  </td>
                                  <td className="p-3 text-gray-600 whitespace-nowrap">
                                    {proc.processing_time || '5-10 Mins'}
                                  </td>
                                  <td className="p-3 text-gray-600 text-[11px]">
                                    {proc.person_responsible ||
                                      service.department_head}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>

                    {/* Footer Tip for Citizen */}
                    <div className="bg-primary-50/60 border border-primary-200/60 rounded-xl p-3.5 flex items-start gap-3 text-xs text-primary-900">
                      <ShieldCheck className="w-4 h-4 text-primary-700 shrink-0 mt-0.5" />
                      <div className="leading-relaxed">
                        <span className="font-bold">Citizen Guarantee: </span>
                        If this service is not acted upon within the prescribed
                        turnaround window of{' '}
                        <span className="font-semibold underline">
                          {service.total_processing_time}
                        </span>
                        , you may file an immediate ticket at the Public
                        Assistance and Complaints Desk (PACD) or report directly
                        to the Anti-Red Tape Authority (ARTA) at{' '}
                        <code className="bg-white/80 px-1 py-0.5 rounded font-mono">
                          complaints@arta.gov.ph
                        </code>
                        .
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-4 shadow-sm text-xs">
          <div className="text-gray-600">
            Page <span className="font-bold text-gray-900">{currentPage}</span>{' '}
            of <span className="font-semibold text-gray-900">{totalPages}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed text-gray-700 font-medium transition"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed text-gray-700 font-medium transition"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
