import React from 'react';
import {
  X,
  FileText,
  FileSpreadsheet,
  Mail,
  Download,
  CheckCircle,
  Clock,
  Shield,
} from 'lucide-react';

const REPORT = {
  workflowId: '47971',
  workflowType: 'New Client/Matter Intake (RUSH)',
  searchDate: '9/23/2023, 1:47:48 AM',
  initiator: 'Cosmos Cortex (auto-intake)',
  matter:
    'Nicolina Marchese v. New City Westchester Group LLC d/b/a Westchester Golf & Country Club, and II Circolo Culturale Italiano Della Florida, Inc.',
  comments:
    'CM-1098466 - Nicolina Marchese v. New City Westchester Group LLC d/b/a Westchester Golf & Country Club, and II Circolo Culturale Italiano Della Florida, Inc.',
  rows: [
    {
      searchCriteria: 'Midvale Indemnity Company',
      hitType: 'Client',
      hitText: 'Midvale Indemnity Company',
      partyStatus: 'Client',
      affiliation: 'Client (carrier)',
      matterStatus: '6 firm matters',
      client: '0434 Hanover',
      matter: 'Multiple (6 matters)',
      billingAttorney: 'not in record',
      responsibleAttorney: 'not in record',
      insuredForMatter: 'not in record',
      highlighted: true,
      highlightText:
        'Client as a party on 6 matters (frequent client, flagged) and the insurer has no conflict or attorney disclosure issue.',
    },
    {
      searchCriteria: 'K2 Claims Services, LLC',
      hitType: 'Client',
      hitText: 'K2 Claims Services, LLC',
      partyStatus: 'Client',
      affiliation: 'Client (carrier)',
      matterStatus: '2 firm matters',
      client: '0159 K2 Claims Services',
      matter: 'Multiple (2 matters)',
      billingAttorney: 'not in record',
      responsibleAttorney: 'not in record',
      insuredForMatter: 'not in record',
      highlighted: true,
      highlightText:
        'Client as a party on 2 matters (frequent client) and the insurer has no conflict or attorney disclosure issue.',
    },
    {
      searchCriteria: 'Mount Vernon Fire Insurance Company',
      hitType: 'Matter',
      hitText: 'Mount Vernon Fire Insurance Co. v. Agency Marketing Services, Inc.',
      partyStatus: 'not in record',
      affiliation: 'not in record',
      matterStatus: 'Closed: 2008-11-14',
      client: '0299 RUSI Group, Inc',
      matter: '0071-00-0140 Mount Vernon Fire Insurance Co. v. Agency Marketing Services, Inc.',
      billingAttorney: 'not in record',
      responsibleAttorney: 'not in record',
      insuredForMatter: 'not in record',
      highlighted: false,
    },
    {
      searchCriteria: 'Mount Vernon Fire Insurance Company',
      hitType: 'Matter',
      hitText: 'Mount Vernon Fire Insurance Co. v. Agency Marketing Services, Inc. + 24 further matters for this entity (folded)',
      partyStatus: 'Claimant',
      affiliation: 'Adverse',
      matterStatus: 'Closed: 2008-11-14',
      client: '0299 RUSI Group, Inc',
      matter: '0071-00-0140 Mount Vernon Fire Insurance Co. v. Agency Marketing Services, Inc.',
      billingAttorney: 'not in record',
      responsibleAttorney: 'not in record',
      insuredForMatter: 'not in record',
      highlighted: false,
    },
  ],
};

function ActionBtn({ icon: Icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-orange-800 transition-all group"
    >
      <Icon size={16} className="transition-transform group-hover:-translate-y-0.5" />
      <span className="text-[10px] font-bold uppercase tracking-wide leading-none">{label}</span>
    </button>
  );
}

function SectionTitle({ children }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <p className="text-[10px] font-extrabold tracking-widest uppercase text-orange-700 whitespace-nowrap">{children}</p>
      <div className="flex-1 h-px bg-orange-100" />
    </div>
  );
}

export default function ConflictAnalysisModal({ item, onClose }) {
  const now = new Date().toLocaleString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-[2px]">
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-[1400px] max-h-[92vh] flex flex-col overflow-hidden"
        style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
      >
        <div className="shrink-0 bg-orange-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/15 p-1.5 rounded-lg">
              <FileText size={16} className="text-orange-100" />
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">Conflicts Report</p>
              <p className="text-orange-200 text-[11px]">Generated {now}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="text-orange-200 hover:text-white hover:bg-white/15 p-1.5 rounded-lg transition-all">
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="shrink-0 bg-white border-b border-slate-100 px-5 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <ActionBtn icon={Download} label="PDF" />
            <ActionBtn icon={FileText} label="Word" />
            <ActionBtn icon={FileSpreadsheet} label="Excel" />
            <ActionBtn icon={Mail} label="Email" />
          </div>
          <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold text-xs px-4 py-2 rounded-lg transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
            <CheckCircle size={14} />
            Approve Clearance
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6 bg-slate-50/30">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Search ID', value: REPORT.workflowId, highlight: true },
              { label: 'Search Type', value: REPORT.workflowType },
              { label: 'Search Date', value: REPORT.searchDate },
              { label: 'Initiator', value: REPORT.initiator },
            ].map((card) => (
              <div key={card.label} className={`rounded-xl px-4 py-3 border ${card.highlight ? 'bg-orange-50 border-orange-200' : 'bg-white border-slate-200'}`}>
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-1">{card.label}</p>
                <p className={`text-sm font-bold leading-snug ${card.highlight ? 'text-orange-800' : 'text-slate-800'}`}>{card.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl border border-slate-200 px-5 py-4">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-1.5">Matter</p>
            <p className="text-sm font-semibold text-slate-800 leading-relaxed">{REPORT.matter}</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 px-5 py-4">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-1.5">Comments</p>
            <p className="text-sm text-slate-700 leading-relaxed">{REPORT.comments}</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-100">
              <SectionTitle>Search Results ({REPORT.rows.length})</SectionTitle>
            </div>
            <div className="overflow-x-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-100">
                    {['Search Criteria', 'Hit Type', 'Hit Text', 'Party Status', 'Affiliation', 'Matter Status', 'Client', 'Matter', 'Billing Attorney', 'Responsible Attorney', 'Insured For Matter'].map((h) => (
                      <th key={h} className="px-4 py-2.5 text-left text-[10px] font-bold tracking-wider uppercase text-slate-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {REPORT.rows.map((row, i) => (
                    <tr key={`${row.searchCriteria}-${i}`} className={`border-t border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}`}>
                      <td className="px-4 py-2.5 text-xs font-semibold text-slate-800 align-top">{row.searchCriteria}</td>
                      <td className="px-4 py-2.5 text-xs font-semibold text-slate-800 align-top">{row.hitType}</td>
                      <td className="px-4 py-2.5 text-xs text-slate-600 leading-relaxed align-top">
                        {row.hitText}
                        {row.highlighted && (
                          <div className="mt-2 rounded border border-red-200 bg-red-50 p-2 text-[10px] font-semibold text-red-700 leading-relaxed">
                            {row.highlightText}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-2.5 text-xs text-slate-600 align-top">{row.partyStatus}</td>
                      <td className="px-4 py-2.5 text-xs text-slate-600 align-top">{row.affiliation}</td>
                      <td className="px-4 py-2.5 text-xs text-slate-600 align-top">{row.matterStatus}</td>
                      <td className="px-4 py-2.5 text-xs text-slate-600 align-top">{row.client}</td>
                      <td className="px-4 py-2.5 text-xs text-slate-600 align-top">{row.matter}</td>
                      <td className="px-4 py-2.5 text-xs text-slate-600 align-top">{row.billingAttorney}</td>
                      <td className="px-4 py-2.5 text-xs text-slate-600 align-top">{row.responsibleAttorney}</td>
                      <td className="px-4 py-2.5 text-xs text-slate-600 align-top">{row.insuredForMatter}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 px-5 py-4">
            <SectionTitle>Conflict Disposition</SectionTitle>
            <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
              <CheckCircle size={16} className="text-green-600 shrink-0 mt-0.5" />
              <p className="text-xs font-semibold text-green-800 leading-relaxed">
                PASSED: no direct conflict for the disclosed client or insurer. The reviewed matter remains eligible to advance to manager clearance.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 px-5 py-4">
            <SectionTitle>Manager Review</SectionTitle>
            <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
              <Clock size={16} className="text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs font-semibold text-amber-800 leading-relaxed">
                Pending manager review. The manager verifies the screening results and approves the matter for the next step.
              </p>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed text-center pb-2">
            This is the conflicts-stage report. The manager reviews the screening results here; only then does the file advance to the next approval gate.
            The report is generated automatically from the search results and is designed to support a defensible clearance record.
          </p>
        </div>
      </div>
    </div>
  );
}
