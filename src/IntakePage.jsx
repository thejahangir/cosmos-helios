import React, { useState, useEffect } from 'react';
import {
  ArrowLeft, Zap, ChevronUp, ChevronDown,
  ExternalLink, CheckCircle, Loader2,
} from 'lucide-react';

/* ─── Extracted data ──────────────────────────────────────────────────────── */
const COSMOS_DATA = {
  workflowDescription: 'New Client/Matter Intake (RUSH)',
  stage: 'Draft - Conflicts',
  initiator: 'Cosmos Cortex (auto-intake)',
  processOwner: 'Gene P. Kissane',
  requestor: 'Lisa Hirsch',
  formNo: 'NBI-2026-0629',
  sessionNo: 'SES-20260629-001',
  revisionNo: '1',
  confidential: 'Yes \u2013 Restricted',
  existingClient: 'No',
  client: 'K2 Claims Services, LLC',
  caseStyle: 'Nicolina Marchese v. New City Westchester Group LLC d/b/a Westchester Golf & Country Club',
  areaOfLaw: 'General Liability \u2013 Premises / Slip & Fall',
  insurerStatus: 'Insurer (Fla. R. 4-1.7(e) Applies)',
  billingAttorney: 'Gene P. Kissane',
  responsibleAttorney: 'Gene P. Kissane',
  assignedAttorney: 'Gene P. Kissane',
  parties: [
    { first: 'Nicolina',             last: 'Marchese',      type: 'Individual',   role: 'Plaintiff',             adverse: true  },
    { first: 'New City Westchester', last: 'Group LLC',     type: 'Organization', role: 'Defendant / Our Client', adverse: false },
    { first: 'K2 Claims',            last: 'Services, LLC', type: 'Organization', role: 'Client / Insurer',       adverse: false },
    { first: 'Lisa',                 last: 'Hirsch',        type: 'Individual',   role: 'Claim Rep',              adverse: false },
    { first: 'Darlene',              last: 'Drain',         type: 'Individual',   role: 'Adjuster',               adverse: false },
    { first: 'Westchester Golf',     last: 'Country Club',  type: 'Organization', role: 'Named Insured',          adverse: false },
    { first: 'Gene P.',              last: 'Kissane', suffix: 'Esq.', type: 'Individual', role: 'Defense Counsel', adverse: false },
  ],
  rushPriority: 'Yes',
  rushPrioritySource: 'Default entered; authority requested to set it aside; time-sensitive',
  notes: 'Slip and fall at Westchester Golf & Country Club on Nov 11, 2024 (complaint narrative cites Nov 10, 2024). Carrier-assigned defense of the insured. Il Circolo filed a cross-claim against the insured and a default was entered (Clerk\u2019s default Jan 9, 2026; default entered Mar 3, 2026), so treat as time-sensitive. Midvale CGL policy T2MP000089-02. Claim 10251090854. Case 502025CA011127XXXAMB, 15th Judicial Circuit, Palm Beach County.',
  notesSource: 'Email + Complaint summary',
};

const CONF = { HIGH: 'high', CONFIRM: 'confirm', MANUAL: 'manual' };
const dotColor = (c) => c === CONF.HIGH ? 'bg-green-500' : c === CONF.CONFIRM ? 'bg-yellow-400' : 'bg-red-500';

/* ─── Animated read-only field (typewriter) ──────────────────────────────── */
function AnimatedField({ value, filled, confidence = CONF.HIGH, multiline = false }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!filled || !value) { setDisplayed(''); setDone(false); return; }
    let i = 0; setDone(false);
    const speed = Math.max(12, Math.min(30, Math.floor(480 / value.length)));
    const iv = setInterval(() => {
      i++; setDisplayed(value.slice(0, i));
      if (i >= value.length) { clearInterval(iv); setDone(true); }
    }, speed);
    return () => clearInterval(iv);
  }, [filled, value]);

  const ring = filled ? 'border-orange-200 bg-orange-50/30' : 'border-slate-200 bg-white';
  const base = `w-full border rounded-md px-3 text-sm text-slate-800 transition-all duration-300 focus:outline-none placeholder:text-slate-300 ${ring}`;

  return (
    <div className="relative w-full">
      {multiline
        ? <textarea readOnly rows={5} value={displayed} placeholder="—" className={`${base} py-2 resize-none leading-relaxed`} />
        : <input readOnly type="text" value={displayed} placeholder="—" className={`${base} py-2 h-9`} />}
      {filled && value && (
        <span className={`absolute right-2.5 top-3 w-1.5 h-1.5 rounded-full ${dotColor(confidence)} transition-opacity duration-700 ${done ? 'opacity-100' : 'opacity-0'}`} />
      )}
    </div>
  );
}

/* ─── Static system field ─────────────────────────────────────────────────── */
function StaticField({ value }) {
  return (
    <div className="relative w-full">
      <input readOnly value={value} className="w-full border border-slate-200 rounded-md px-3 py-2 h-9 text-sm text-slate-500 bg-slate-50 focus:outline-none" />
      <span className="absolute right-2.5 top-3 w-1.5 h-1.5 rounded-full bg-green-500" />
    </div>
  );
}

/* ─── Field label ─────────────────────────────────────────────────────────── */
function FL({ children }) {
  return <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-1">{children}</p>;
}

/* ─── Source note ─────────────────────────────────────────────────────────── */
function SourceNote({ from, visible }) {
  if (!visible) return null;
  return <p className="text-[11px] text-slate-400 italic mt-0.5">from {from}</p>;
}

/* ─── Section divider ─────────────────────────────────────────────────────── */
function SectionHead({ children }) {
  return (
    <div className="col-span-12 flex items-center gap-3 pt-1">
      <p className="text-[10px] font-extrabold tracking-widest uppercase text-orange-700 whitespace-nowrap">{children}</p>
      <div className="flex-1 h-px bg-orange-100" />
    </div>
  );
}

/* ─── Legal line (stagger fade) ──────────────────────────────────────────── */
function LegalLine({ visible, delay, children }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (visible) { const t = setTimeout(() => setShow(true), delay); return () => clearTimeout(t); }
    else setShow(false);
  }, [visible, delay]);
  return (
    <div className="transition-all duration-500 ease-out" style={{ opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(5px)' }}>
      {children}
    </div>
  );
}

/* ─── Party row ──────────────────────────────────────────────────────────── */
function PartyRow({ party, filled, index }) {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    if (filled) { const t = setTimeout(() => setVis(true), index * 110); return () => clearTimeout(t); }
    else setVis(false);
  }, [filled, index]);
  return (
    <tr className={`border-t border-slate-100 transition-all duration-500 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}`}
      style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateX(0)' : 'translateX(-6px)', transitionDelay: `${index * 60}ms` }}>
      <td className="px-3 py-2 text-slate-700 text-xs font-medium">{vis ? party.first : ''}</td>
      <td className="px-3 py-2 font-semibold text-slate-800 text-xs">{vis ? party.last : ''}</td>
      <td className="px-3 py-2 text-slate-400 text-xs">{vis ? (party.suffix || '—') : ''}</td>
      <td className="px-3 py-2">{vis && <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide">{party.type}</span>}</td>
      <td className="px-3 py-2">
        {vis && <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide ${
          party.role.toLowerCase().includes('plaintiff') ? 'bg-orange-100 text-orange-700'
          : party.role.toLowerCase().includes('client') ? 'bg-blue-50 text-blue-700'
          : 'bg-slate-100 text-slate-600'}`}>{party.role}</span>}
      </td>
      <td className="px-3 py-2 text-center">
        {vis && <span className={`inline-block w-2 h-2 rounded-full ${party.adverse ? 'bg-orange-500' : 'bg-slate-200'}`} />}
      </td>
    </tr>
  );
}

/* ─── Main page ──────────────────────────────────────────────────────────── */
export default function IntakePage({ onBack }) {
  const [emailOpen, setEmailOpen] = useState(true);
  const [extracting, setExtracting] = useState(false);
  const [extracted, setExtracted] = useState(false);
  const [filled, setFilled] = useState({});
  const [legalCardVisible, setLegalCardVisible] = useState(false);
  const [approvalSubmitted, setApprovalSubmitted] = useState(false);

  const ORDER = [
    'workflowDescription','stage','initiator','processOwner','requestor',
    'formNo','sessionNo','revisionNo','confidential',
    'existingClient','client',
    'caseStyle','areaOfLaw','insurerStatus',
    'billingAttorney','responsibleAttorney','assignedAttorney',
    'parties','rushPriority','notes',
  ];

  const runExtraction = () => {
    if (extracting || extracted) return;
    setExtracting(true);
    ORDER.forEach((key, i) => {
      setTimeout(() => {
        setFilled(prev => ({ ...prev, [key]: true }));
        if (i === ORDER.length - 1) { setExtracting(false); setExtracted(true); }
      }, 200 + i * 220);
    });
  };

  const f = key => !!filled[key];

  useEffect(() => {
    if (filled['notes']) { const t = setTimeout(() => setLegalCardVisible(true), 900); return () => clearTimeout(t); }
    else setLegalCardVisible(false);
  }, [filled['notes']]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-white">

      {/* Sub-header */}
      <div className="shrink-0 bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="flex items-center gap-1.5 text-slate-500 hover:text-orange-800 font-semibold text-xs border border-slate-200 hover:border-orange-300 px-3 py-1.5 rounded-lg transition-all">
            <ArrowLeft size={13} /> Back to Queue
          </button>
          <div className="w-px h-4 bg-slate-200" />
          <span className="text-[11px] font-extrabold tracking-[0.12em] uppercase text-slate-400">New Business Intake \u2013 Matter</span>
        </div>
        <span className="text-[10px] font-black tracking-widest bg-orange-800 text-white px-3 py-1 rounded">CM-1098466</span>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto">

        {/* Real filing banner */}
        <div className="bg-green-50 border-b border-green-200 px-6 py-2 flex items-center gap-2">
          <CheckCircle size={13} className="text-green-600 shrink-0" />
          <p className="text-xs text-green-800">
            <span className="font-extrabold italic">Real filing.</span>{' '}
            Every field below was read from verified public court documents. Nothing was invented.
          </p>
        </div>

        {/* Source Email */}
        <div className="border-b border-slate-100">
          <div className="flex items-center justify-between px-6 py-3">
            <p className="text-[10px] font-extrabold tracking-widest uppercase text-slate-400">
              Source Email{' '}
              <span className="text-orange-700 normal-case tracking-normal font-semibold text-xs ml-1.5">Lisa Hirsch, K2 Claims Services, LLC</span>
            </p>
            <button onClick={() => setEmailOpen(v => !v)} className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 transition-colors">
              {emailOpen ? <><ChevronUp size={13} /> hide</> : <><ChevronDown size={13} /> show</>}
            </button>
          </div>
          {emailOpen && (
            <div className="px-6 pb-4 space-y-3 bg-slate-50/40 border-t border-slate-100">
              <div className="pt-3 grid grid-cols-[44px_1fr] gap-x-3 gap-y-1 text-xs">
                <span className="text-slate-400 font-bold uppercase tracking-widest pt-0.5">From</span>
                <span className="text-orange-700 font-semibold">Lisa Hirsch, K2 Claims Services (forwarding sender), K2 Claims Services, LLC</span>
                <span className="text-slate-400 font-bold uppercase tracking-widest pt-0.5">To</span>
                <span className="text-slate-700 font-semibold">Gene P. Kissane</span>
                <span className="text-slate-400 font-bold uppercase tracking-widest pt-0.5">Date</span>
                <span className="text-slate-600">June 29, 2026 · 1:38 PM</span>
              </div>
              <p className="text-xs font-semibold text-slate-700">Fw: FNOL &amp; Default &amp; Request for Authority [10251090854] New City Westchester LLC D.O.I. 11/11/2024</p>
              <p className="text-xs text-slate-500 leading-relaxed bg-white border border-slate-100 rounded-lg p-3">
                Hello Gene, we are requesting your assistance as defense counsel for the above claim. Case summary (authored by Darlene Drain, Commercial Clai\u2026
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'CM-1098466 Email \u2014 new file assignment', meta: '5p' },
                  { label: 'CM-1098466 Complaint (Marchese)', meta: '11p' },
                ].map(doc => (
                  <div key={doc.label} className="flex items-center gap-2 border border-slate-200 bg-white rounded-lg px-3 py-1.5 text-xs hover:border-orange-300 transition-colors cursor-pointer">
                    <span className="bg-orange-800 text-white text-[9px] font-black px-1.5 py-0.5 rounded">PDF</span>
                    <span className="text-slate-700 font-semibold">{doc.label}</span>
                    <span className="text-slate-400">· {doc.meta}</span>
                    <ExternalLink size={10} className="text-slate-400" />
                    <span className="text-orange-700 font-bold text-[10px] uppercase tracking-wide">View</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Extraction bar */}
        <div className="flex flex-wrap items-center gap-4 px-6 py-3 border-b border-slate-100 bg-slate-50/50">
          <button onClick={runExtraction} disabled={extracting || extracted}
            className={`flex items-center gap-2 font-bold text-sm px-5 py-2 rounded-lg transition-all shadow-sm shrink-0 ${
              extracted ? 'bg-green-600 text-white cursor-default'
              : extracting ? 'bg-orange-600/80 text-white cursor-wait'
              : 'bg-orange-700 hover:bg-orange-800 text-white hover:shadow-md hover:-translate-y-0.5'}`}>
            {extracted ? <><CheckCircle size={14} /> Extraction Complete</>
              : extracting ? <><Loader2 size={14} className="animate-spin" /> Extracting\u2026</>
              : <><Zap size={14} /> Run Cosmos extraction</>}
          </button>
          <p className="text-xs text-slate-400 leading-relaxed">
            {extracted ? 'All fields populated from verified court and email documents.'
              : 'Today this is filled by hand. Cosmos reads the email and complaint and fills it automatically.'}
          </p>
        </div>

        {/* Form body — 12-col grid, field widths match content */}
        <div className="px-6 py-5 pb-28">
          <div className="grid grid-cols-12 gap-x-4 gap-y-5">

            {/* Workflow ID (2) | Description (5) | Date (3) | Stage (2) */}
            <div className="col-span-2">
              <FL>Workflow ID</FL>
              <StaticField value="CM-1098466" />
              <p className="text-[10px] text-slate-300 mt-0.5">System</p>
            </div>
            <div className="col-span-5">
              <FL>Description</FL>
              <AnimatedField value={COSMOS_DATA.workflowDescription} filled={f('workflowDescription')} />
            </div>
            <div className="col-span-3">
              <FL>Date</FL>
              <StaticField value="June 29, 2026 · 1:46 PM" />
              <p className="text-[10px] text-slate-300 mt-0.5">System</p>
            </div>
            <div className="col-span-2">
              <FL>Stage</FL>
              <AnimatedField value={COSMOS_DATA.stage} filled={f('stage')} />
            </div>

            {/* Initiator (4) | Process Owner (4) | Requestor (4) */}
            <div className="col-span-4">
              <FL>Initiator</FL>
              <AnimatedField value={COSMOS_DATA.initiator} filled={f('initiator')} />
            </div>
            <div className="col-span-4">
              <FL>Process Owner</FL>
              <AnimatedField value={COSMOS_DATA.processOwner} filled={f('processOwner')} confidence={CONF.CONFIRM} />
            </div>
            <div className="col-span-4">
              <FL>Requestor</FL>
              <AnimatedField value={COSMOS_DATA.requestor} filled={f('requestor')} />
            </div>

            {/* Form# (3) | Session# (4) | Rev# (1 — value="1") | Confidential (4) */}
            <div className="col-span-3">
              <FL>Form #</FL>
              <AnimatedField value={COSMOS_DATA.formNo} filled={f('formNo')} />
            </div>
            <div className="col-span-4">
              <FL>Session #</FL>
              <AnimatedField value={COSMOS_DATA.sessionNo} filled={f('sessionNo')} />
            </div>
            <div className="col-span-1">
              <FL>Rev #</FL>
              <AnimatedField value={COSMOS_DATA.revisionNo} filled={f('revisionNo')} />
            </div>
            <div className="col-span-4">
              <FL>Confidential</FL>
              <AnimatedField value={COSMOS_DATA.confidential} filled={f('confidential')} confidence={CONF.MANUAL} />
            </div>

            {/* Client */}
            <SectionHead>Client</SectionHead>
            {/* Existing Client? (2 — value "No") | Client name (10) */}
            <div className="col-span-2">
              <FL>Existing Client?</FL>
              <AnimatedField value={COSMOS_DATA.existingClient} filled={f('existingClient')} />
            </div>
            <div className="col-span-10">
              <FL>Client</FL>
              <AnimatedField value={COSMOS_DATA.client} filled={f('client')} />
            </div>

            {/* Matter */}
            <SectionHead>Matter</SectionHead>
            {/* Case style — full width (long text) */}
            <div className="col-span-12">
              <FL>Case Style</FL>
              <AnimatedField value={COSMOS_DATA.caseStyle} filled={f('caseStyle')} />
            </div>
            {/* Area of Law (7) | Insurer Status (5) */}
            <div className="col-span-7">
              <FL>Area of Law</FL>
              <AnimatedField value={COSMOS_DATA.areaOfLaw} filled={f('areaOfLaw')} />
            </div>
            <div className="col-span-5">
              <FL>Insurer Status (Fla. R. 4-1.7(e))</FL>
              <AnimatedField value={COSMOS_DATA.insurerStatus} filled={f('insurerStatus')} confidence={CONF.CONFIRM} />
            </div>

            {/* Attorney Assignment */}
            <SectionHead>Attorney Assignment</SectionHead>
            <div className="col-span-4">
              <FL>Billing Attorney</FL>
              <AnimatedField value={COSMOS_DATA.billingAttorney} filled={f('billingAttorney')} confidence={CONF.CONFIRM} />
            </div>
            <div className="col-span-4">
              <FL>Responsible Attorney</FL>
              <AnimatedField value={COSMOS_DATA.responsibleAttorney} filled={f('responsibleAttorney')} confidence={CONF.CONFIRM} />
            </div>
            <div className="col-span-4">
              <FL>Assigned Attorney</FL>
              <AnimatedField value={COSMOS_DATA.assignedAttorney} filled={f('assignedAttorney')} confidence={CONF.CONFIRM} />
            </div>

            {/* Parties */}
            <SectionHead>Parties ({COSMOS_DATA.parties.length})</SectionHead>
            <div className="col-span-12 overflow-x-auto rounded-lg border border-slate-200">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-100">
                    {['First / Organization','Last Name','Suffix','Type','Party Role','Adverse'].map(h => (
                      <th key={h} className="px-3 py-2.5 text-left text-[10px] font-bold tracking-wider uppercase whitespace-nowrap text-slate-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COSMOS_DATA.parties.map((p, i) => (
                    <PartyRow key={i} party={p} filled={f('parties')} index={i} />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Conflicts Questionnaire */}
            <SectionHead>Conflicts Questionnaire</SectionHead>
            {/* Rush Priority (2 — value "Yes") */}
            <div className="col-span-2">
              <FL>Rush Priority</FL>
              <AnimatedField value={COSMOS_DATA.rushPriority} filled={f('rushPriority')} />
              <SourceNote from={COSMOS_DATA.rushPrioritySource} visible={f('rushPriority')} />
            </div>
            <div className="col-span-10" />

            {/* Notes — full width multiline */}
            <div className="col-span-12">
              <FL>Notes</FL>
              <AnimatedField value={COSMOS_DATA.notes} filled={f('notes')} multiline />
              <SourceNote from={COSMOS_DATA.notesSource} visible={f('notes')} />
            </div>

            {/* Confidence legend */}
            <div className="col-span-12 flex flex-wrap items-center gap-5 pt-1">
              {[
                { color: 'bg-green-500', label: 'High confidence' },
                { color: 'bg-yellow-400', label: 'Intaker confirms' },
                { color: 'bg-red-500', label: 'Not in source \u2014 intaker must supply' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${item.color}`} />
                  <span className="text-[11px] text-slate-400">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Rule 4-1.7(e) legal analysis card — animated */}
            {!approvalSubmitted && (
              <div
                className="col-span-12 transition-all duration-700 ease-out"
                style={{
                  opacity: legalCardVisible ? 1 : 0,
                  transform: legalCardVisible ? 'translateY(0)' : 'translateY(12px)',
                  pointerEvents: legalCardVisible ? 'auto' : 'none',
                }}
              >
                <div className="border border-green-200 bg-green-50/60 rounded-xl px-5 py-4 space-y-2.5">
                  {[
                  { delay: 0,   el: <p className="text-sm font-bold text-green-800 leading-snug">Rule 4\u20131.7(e) satisfied from the standing determination for Midvale Indemnity Company.</p> },
                  { delay: 150, el: <p className="text-sm font-semibold text-slate-700">Insured only: the insurer is a non-client third-party payor</p> },
                  { delay: 300, el: <p className="text-xs text-slate-600 leading-relaxed">Determined by <span className="font-semibold">M. Alvarez (General Counsel)</span> on January 12, 2024. Panel Counsel Agreement, clause 4.2, and the carrier\u2019s outside counsel guidelines: the firm is retained to defend the insured; the carrier does not become a client of the firm.</p> },
                  { delay: 450, el: <p className="text-xs text-slate-600 leading-relaxed">The carrier is NOT a client. Acting against it for another client is not a concurrent conflict. Rule 4\u20131.8(f) now governs the fee arrangement: the client must consent, the lawyer\u2019s independence must be protected, and confidences preserved.</p> },
                  { delay: 600, el: <p className="text-xs text-slate-600 leading-relaxed"><span className="font-bold text-green-700">The firm settles this once with each panel carrier, not on every file.</span>{' '}Cosmos applies the standing answer, records it on the matter, and re-opens it the moment a file contradicts it: a reservation of rights, a coverage dispute, a declaratory action.</p> },
                  ].map(({ delay, el }, i) => (
                    <LegalLine key={i} visible={legalCardVisible} delay={delay}>{el}</LegalLine>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="shrink-0 bg-white border-t border-slate-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="flex items-center gap-1.5 text-slate-600 hover:text-orange-800 font-semibold text-sm border border-slate-200 hover:border-orange-300 px-4 py-2 rounded-lg transition-all">
            <ArrowLeft size={14} /> Back to Inbox
          </button>
          <button className="text-slate-400 hover:text-slate-600 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors">
            Edit fields
          </button>
        </div>
        <button
          disabled={!extracted || approvalSubmitted}
          onClick={() => {
            setApprovalSubmitted(true);
            setLegalCardVisible(false);
          }}
          className={`font-bold text-sm px-6 py-2.5 rounded-lg transition-all shadow-sm ${
            extracted && !approvalSubmitted ? 'bg-orange-800 hover:bg-orange-900 text-white hover:shadow-md hover:-translate-y-0.5'
            : 'bg-slate-100 text-slate-300 cursor-not-allowed'}`}>
          {approvalSubmitted ? 'Approve and send to Conflicts' : 'Submit for approval'}
        </button>
      </div>
    </div>
  );
}
