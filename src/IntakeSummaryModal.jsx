import React from 'react';
import {
  X, FileText, FileSpreadsheet, Mail, Download,
  CheckCircle, Clock, Shield, AlertCircle, FileType2,
} from 'lucide-react';

/* ─── Report data ─────────────────────────────────────────────────────────── */
const REPORT = {
  workflowId:   'CM-1098466',
  workflowType: 'New Client/Matter Intake (RUSH)',
  initiator:    'Cosmos Cortex (auto-intake)',
  matter:       'Nicolina Marchese v. New City Westchester Group LLC d/b/a Westchester Golf & Country Club, and II Circolo Culturale Italiano Della Florida, Inc.',

  extractedFields: [
    { field: 'Client',                        value: 'K2 Claims Services, LLC (TPA for Midvale Indemnity Company)',  confidence: 'high',    source: 'extracted' },
    { field: 'Existing client',                value: 'Yes',                                                         confidence: 'confirm', source: 'supplied'  },
    { field: 'Case style',                     value: 'Nicolina Marchese v. New City Westchester Group LLC d/b/a Westchester Golf & Country Club, and II Circolo Culturale Italiano Della Florida, Inc.', confidence: 'high', source: 'extracted' },
    { field: 'Area of law',                    value: 'Premises Liability - General Liability',                       confidence: 'high',    source: 'extracted' },
    { field: 'Insurer status (Fla. 4-1.7(e))', value: 'Insured only: the insurer is a non-client third-party payor', confidence: 'confirm', source: 'supplied'  },
  ],

  parties: [
    { name: 'Nicolina Marchese',                                                                    type: 'Individual', role: 'Plaintiff',                                         adverse: 'Yes'     },
    { name: 'New City Westchester Group LLC d/b/a Westchester Golf & Country Club',                 type: 'Company',    role: 'Defendant (Insured)',                               adverse: 'No'      },
    { name: 'Il Circolo Culturale Italiano Della Florida, Inc.',                                    type: 'Company',    role: 'Co-Defendant (cross-claim vs insured)',             adverse: 'Unknown' },
    { name: 'Midvale Indemnity Company',                                                            type: 'Company',    role: 'Carrier (Insurer) — PAYOR, not a client, 4-1.7(e)', adverse: 'No'      },
    { name: 'K2 Claims Services, LLC',                                                              type: 'Company',    role: 'Carrier / Client (TPA)',                            adverse: 'No'      },
    { name: 'Mount Vernon Fire Insurance Company',                                                   type: 'Company',    role: "Tendering carrier (Il Circolo's insurer)",          adverse: 'Unknown' },
    { name: 'Britto & Herman Injury Attorneys',                                                     type: 'Company',    role: 'Opposing counsel (for Plaintiff)',                  adverse: 'Yes'     },
  ],
};

/* ─── Confidence dot ─────────────────────────────────────────────────────── */
function ConfidenceDot({ c }) {
  const color = c === 'high' ? 'bg-green-500' : c === 'confirm' ? 'bg-amber-400' : 'bg-red-500';
  return <span className={`inline-block w-2 h-2 rounded-full ${color} shrink-0`} />;
}

/* ─── Adverse badge ──────────────────────────────────────────────────────── */
function AdverseBadge({ value }) {
  if (value === 'Yes') return <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-[9px] font-black uppercase tracking-wide">Yes</span>;
  if (value === 'No')  return <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[9px] font-bold uppercase tracking-wide">No</span>;
  return <span className="px-2 py-0.5 bg-slate-50 text-slate-400 rounded text-[9px] font-bold uppercase tracking-wide">—</span>;
}

/* ─── Action icon button ─────────────────────────────────────────────────── */
function ActionBtn({ icon: Icon, label, onClick }) {
  return (
    <button onClick={onClick}
      className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-orange-800 transition-all group">
      <Icon size={16} className="transition-transform group-hover:-translate-y-0.5" />
      <span className="text-[10px] font-bold uppercase tracking-wide leading-none">{label}</span>
    </button>
  );
}

/* ─── Section title ──────────────────────────────────────────────────────── */
function SectionTitle({ children }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <p className="text-[10px] font-extrabold tracking-widest uppercase text-orange-700 whitespace-nowrap">{children}</p>
      <div className="flex-1 h-px bg-orange-100" />
    </div>
  );
}

/* ─── Main modal ─────────────────────────────────────────────────────────── */
export default function IntakeSummaryModal({ item, onClose }) {
  const now = new Date().toLocaleString('en-US', {
    month: 'numeric', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit', hour12: true,
  });

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-[2px]">
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden"
        style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
      >

        {/* ── Top bar ── */}
        <div className="shrink-0 bg-orange-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/15 p-1.5 rounded-lg">
              <FileText size={16} className="text-orange-100" />
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">Matter Intake Report</p>
              <p className="text-orange-200 text-[11px]">Generated {now}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onClose}
              className="text-orange-200 hover:text-white hover:bg-white/15 p-1.5 rounded-lg transition-all">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* ── Toolbar ── */}
        <div className="shrink-0 bg-white border-b border-slate-100 px-5 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <ActionBtn icon={Download}        label="PDF"   />
            <ActionBtn icon={FileType2}       label="Word"  />
            <ActionBtn icon={FileSpreadsheet} label="Excel" />
            <ActionBtn icon={Mail}            label="Email" />
          </div>
          <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold text-xs px-4 py-2 rounded-lg transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
            <CheckCircle size={14} />
            Approve Intake (manager)
          </button>
        </div>

        {/* ── Scrollable body ── */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6 bg-slate-50/30">

          {/* Workflow meta — 4 stat cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Workflow ID',     value: REPORT.workflowId,   highlight: true },
              { label: 'Workflow Type',   value: REPORT.workflowType  },
              { label: 'Initiator',       value: REPORT.initiator     },
              { label: 'Date',            value: now                  },
            ].map(card => (
              <div key={card.label} className={`rounded-xl px-4 py-3 border ${card.highlight ? 'bg-orange-50 border-orange-200' : 'bg-white border-slate-200'}`}>
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-1">{card.label}</p>
                <p className={`text-sm font-bold leading-snug ${card.highlight ? 'text-orange-800' : 'text-slate-800'}`}>{card.value}</p>
              </div>
            ))}
          </div>

          {/* Matter */}
          <div className="bg-white rounded-xl border border-slate-200 px-5 py-4">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-1.5">Matter</p>
            <p className="text-sm font-semibold text-slate-800 leading-relaxed">{REPORT.matter}</p>
          </div>

          {/* Extracted fields */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-100">
              <SectionTitle>Extracted Fields — each cited to its source</SectionTitle>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-slate-100">
                  {['Field', 'Value', 'Conf.', 'Source'].map(h => (
                    <th key={h} className="px-4 py-2.5 text-left text-[10px] font-bold tracking-wider uppercase text-slate-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {REPORT.extractedFields.map((row, i) => (
                  <tr key={i} className={`border-t border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}`}>
                    <td className="px-4 py-2.5 text-xs font-semibold text-slate-700 whitespace-nowrap align-top w-44">{row.field}</td>
                    <td className="px-4 py-2.5 text-xs text-slate-600 leading-relaxed">{row.value}</td>
                    <td className="px-4 py-2.5 text-center align-top">
                      <ConfidenceDot c={row.confidence} />
                    </td>
                    <td className="px-4 py-2.5 align-top">
                      <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                        row.source === 'extracted'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}>{row.source}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Parties */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-100">
              <SectionTitle>Parties ({REPORT.parties.length})</SectionTitle>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-slate-100">
                  {['Name', 'Type', 'Party Role', 'Adverse'].map(h => (
                    <th key={h} className="px-4 py-2.5 text-left text-[10px] font-bold tracking-wider uppercase text-slate-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {REPORT.parties.map((p, i) => (
                  <tr key={i} className={`border-t border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}`}>
                    <td className="px-4 py-2.5 text-xs font-semibold text-slate-800">{p.name}</td>
                    <td className="px-4 py-2.5">
                      <span className="text-[9px] font-bold uppercase tracking-wide bg-slate-100 text-slate-600 px-2 py-0.5 rounded whitespace-nowrap">{p.type}</span>
                    </td>
                    <td className="px-4 py-2.5 text-xs text-slate-600">{p.role}</td>
                    <td className="px-4 py-2.5"><AdverseBadge value={p.adverse} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Gate G0 */}
          <div className="bg-white rounded-xl border border-slate-200 px-5 py-4">
            <SectionTitle>Gate G0 — matter cannot advance to conflicts until these exist</SectionTitle>
            <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
              <CheckCircle size={16} className="text-green-600 shrink-0 mt-0.5" />
              <p className="text-xs font-semibold text-green-800 leading-relaxed">
                PASSED: client named, and the Fla. R. 4-1.7(e) insurer determination made. Ready for manager approval.
              </p>
            </div>
          </div>

          {/* Manager approval */}
          <div className="bg-white rounded-xl border border-slate-200 px-5 py-4">
            <SectionTitle>Manager Approval</SectionTitle>
            <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
              <Clock size={16} className="text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs font-semibold text-amber-800 leading-relaxed">
                Pending manager approval. The manager reviews the fields above and approves the intake.
              </p>
            </div>
          </div>

          {/* Footer note */}
          <p className="text-[11px] text-slate-400 leading-relaxed text-center pb-2">
            This is the intake-stage report. The manager approves the matter here; only then does the conflict check run.
            Extraction is automatic; the approval is a human check by design.
          </p>

        </div>
      </div>
    </div>
  );
}
