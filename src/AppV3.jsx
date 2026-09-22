import React, { useState } from 'react';
import IntakePage from './IntakePage';
import IntakeSummaryModal from './IntakeSummaryModal';
import ConflictAnalysisModal from './ConflictAnalysisModal';
import { 
  Inbox, 
  Upload, 
  Database, 
  FileText, 
  CheckCircle,
  Check,
  Clock,
  ShieldAlert,
  AlertTriangle,
  Eye,
  Trash2,
  X,
  Activity,
  ArrowRight
} from 'lucide-react';

function AppV3() {
  const [selectedRow, setSelectedRow] = useState(null);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [intakeItem, setIntakeItem] = useState(null);
  const [summaryItem, setSummaryItem] = useState(null);
  const [conflictItem, setConflictItem] = useState(null);
  
  const pendingIntakes = 12; 

  // Active step: 0 = queue (Email in), 1 = intake page open (Intake)
  const activeStepIndex = intakeItem ? 1 : 0;
  const steps = [
    { label: 'Email in' },
    { label: 'Intake' },
    { label: 'Approval' },
    { label: 'Conflict Search' },
    { label: 'Conflict Review' },
    { label: 'Decision' },
  ].map((s, i) => ({
    ...s,
    completed: i < activeStepIndex,
    current: i === activeStepIndex,
  }));
  
  const initialTableData = [
    {
      id: 'CM-1098466',
      tag: 'Real Filing',
      riskLevel: 'High',
      jurisdiction: 'NY State Supreme',
      leadPartner: 'J. Harrison',
      description: 'Marchese v. New City Westchester (slip and fall) - default alleged',
      initiated: 'June 29, 2026 1:38 PM',
      type: 'New Client/Matter Intake (RUSH)',
      client: 'K2 Claims Services, LLC',
      matterNum: '0',
      matterDesc: 'Nicolina Marchese v. New City Westchester Group LLC d/b/a Westchester Golf & Country Club',
      initiator: 'Cosmos Cortex (auto-intake)',
      status: 'Draft - Intake',
      notes: 'CM-1098466 Email - new file assignment.pdf, CM-1098466 Complaint.pdf'
    },
    {
      id: 'CM-1098467',
      tag: 'Live Conflict Search',
      riskLevel: 'Medium',
      jurisdiction: 'SDNY Federal',
      leadPartner: 'A. Patel',
      description: 'Smith v. Horizon Logistics (breach of contract)',
      initiated: 'June 29, 2026 2:15 PM',
      type: 'New Matter Intake',
      client: 'Horizon Logistics Inc.',
      matterNum: '0',
      matterDesc: 'John Smith v. Horizon Logistics Inc. and Does 1-10',
      initiator: 'Cosmos Cortex (auto-intake)',
      status: 'Pending - Review',
      notes: 'CM-1098467 Summons.pdf, Initial_Demand_Letter.pdf'
    },
    {
      id: 'CM-1098468',
      tag: 'Real Filing',
      riskLevel: 'High',
      jurisdiction: 'CA Superior - LA',
      leadPartner: 'S. Goldberg',
      description: 'Davis v. Statewide Insurance (bad faith claim)',
      initiated: 'June 30, 2026 9:00 AM',
      type: 'New Client/Matter Intake',
      client: 'Statewide Insurance Co.',
      matterNum: '0',
      matterDesc: 'Marcus Davis v. Statewide Insurance Co.',
      initiator: 'Jane Doe',
      status: 'Approved',
      notes: 'CM-1098468 Claim_File.pdf'
    },
    {
      id: 'CM-1098469',
      tag: 'Firm Book Load',
      riskLevel: 'Low',
      jurisdiction: 'Internal',
      leadPartner: 'Firm Ops',
      description: 'Aderant Extract 2026 Q2',
      initiated: 'June 30, 2026 10:30 AM',
      type: 'Bulk Conflict Update',
      client: 'Internal - Firm Ops',
      matterNum: 'N/A',
      matterDesc: 'Quarterly Aderant data synchronization and conflict index update',
      initiator: 'System Admin',
      status: 'Completed',
      notes: 'Aderant_Q2_Extract_Log.csv'
    },
    {
      id: 'CM-1098470',
      tag: 'Real Filing',
      riskLevel: 'High',
      jurisdiction: 'TX Dist. Harris Cty',
      leadPartner: 'M. Chen',
      description: 'Torres v. Apex Manufacturing (product liability)',
      initiated: 'June 30, 2026 11:45 AM',
      type: 'New Client/Matter Intake (RUSH)',
      client: 'Apex Manufacturing Solutions',
      matterNum: '0',
      matterDesc: 'Maria Torres v. Apex Manufacturing Solutions, Regional Distributors LLC',
      initiator: 'Cosmos Cortex (auto-intake)',
      status: 'Draft - Intake',
      notes: 'CM-1098470 Complaint_Product_Defect.pdf'
    },
    {
      id: 'CM-1098471',
      tag: 'Live Conflict Search',
      riskLevel: 'Medium',
      jurisdiction: 'FL Circuit - Miami',
      leadPartner: 'R. Simmons',
      description: 'Reynolds Estate (probate dispute)',
      initiated: 'July 1, 2026 8:20 AM',
      type: 'New Client Intake',
      client: 'Reynolds Family Trust',
      matterNum: '0',
      matterDesc: 'Estate of Arthur Reynolds - Beneficiary Dispute',
      initiator: 'John Smith',
      status: 'Conflict Check',
      notes: 'Trust_Documents_Redacted.pdf, Beneficiary_List.pdf'
    }
  ];

  const [data, setData] = useState(initialTableData);

  const handleDeleteConfirm = () => {
    setData(data.filter(item => item.id !== rowToDelete.id));
    setRowToDelete(null);
  };

  const getRiskStyle = (level) => {
    switch (level) {
      case 'High': return 'bg-orange-800/10 text-orange-800 border-orange-800/30';
      case 'Medium': return 'bg-orange-600/10 text-orange-800 border-orange-600/30';
      case 'Low': return 'bg-orange-400/10 text-orange-400 border-orange-400/30';
      default: return 'bg-gray-50 text-slate-800 border-gray-200';
    }
  };

  return (
    <div className="h-screen bg-[#f8fafc] text-slate-800 font-sans overflow-hidden flex flex-col">
      
      {/* Top Bright Navbar */}
      <nav className="w-full px-6 py-4 flex justify-between items-center bg-white border-b border-slate-200 shadow-sm z-20 shrink-0">
        <div className="flex items-center gap-4">
          <div className="bg-orange-800 p-2 rounded-xl shadow-inner shadow-white/20">
            <Inbox className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-orange-800 flex items-center gap-2">
              Cosmos<span className="font-light text-slate-400">Helios</span>
              <span className="text-[10px] font-bold bg-orange-600/10 text-orange-600 px-2 py-0.5 rounded-full uppercase border border-orange-600/20">
                Intake Studio
              </span>
            </h1>
            <p className="text-[11px] text-slate-700 font-medium mt-0.5">Automated Business Intake Pipeline</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
           <button className="hidden md:flex items-center gap-2 bg-white hover:bg-slate-50 text-orange-800 font-bold py-2 px-4 rounded-lg border border-slate-200 shadow-sm transition-all text-sm group">
             <Upload size={16} className="text-orange-600 group-hover:scale-110 transition-transform" />
             New Intake
           </button>
           <label className="hidden md:flex items-center gap-2 bg-orange-800 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all text-sm cursor-pointer group border border-white/10">
             <input type="file" className="hidden" accept=".csv,.xlsx" />
             <Database size={16} className="text-white group-hover:scale-110 transition-transform" />
             Load Aderant Book
           </label>
           
           <div className="w-px h-8 bg-slate-200 mx-2"></div>
           
           <span className="text-[10px] font-bold tracking-widest uppercase text-white bg-orange-800 px-3 py-1.5 rounded-md shadow-sm flex items-center gap-1.5">
              <AlertTriangle size={12} />
              Confidential
           </span>
        </div>
      </nav>

      {/* Main Layout Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar - Workflow Pulse */}
        <div className="w-72 bg-white border-r border-slate-200 shadow-[4px_0_24px_rgba(0,0,0,0.02)] flex flex-col z-10 overflow-y-auto">
          
          {/* Stepper Status */}
          <div className="p-6 border-b border-slate-100">
             <div className="flex justify-between items-center mb-6">
               <h2 className="text-sm font-bold text-orange-800 uppercase tracking-wider flex items-center gap-2">
                 <Activity size={16} className="text-orange-600"/> Workflow
               </h2>
               <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-100">
                 {pendingIntakes} Active
               </span>
             </div>
             
             <div className="flex flex-col gap-4 relative">
               <div className="absolute left-[11px] top-4 bottom-4 w-px bg-slate-200 z-0"></div>
               {steps.map((step, index) => (
                 <div key={index} className="flex items-center gap-4 relative z-10 group">
                   <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 text-[10px] font-bold transition-all
                     ${step.completed ? 'border-orange-400 bg-orange-400 text-white shadow-md shadow-orange-400/20' : 
                       step.current ? 'border-orange-500 bg-orange-500 text-white shadow-md scale-110' : 
                       'border-slate-200 bg-white text-slate-600 group-hover:border-slate-300'}`}
                   >
                     {step.completed ? <Check size={14} strokeWidth={3} /> : index + 1}
                   </div>
                   <span className={`text-xs font-semibold transition-colors
                     ${step.completed ? 'text-slate-700' : 
                       step.current ? 'text-orange-800 font-bold' : 
                       'text-slate-600'}`}>
                     {step.label}
                   </span>
                 </div>
               ))}
             </div>
          </div>

          {/* Data Sources Legend */}
          <div className="p-6">
             <h2 className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-4">Data Pipelines</h2>
             <div className="flex flex-col gap-3">
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-center gap-3">
                  <div className="bg-white p-1.5 rounded-lg shadow-sm border border-slate-100"><FileText className="text-blue-500" size={16} /></div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-orange-800">Real Filing</span>
                    <span className="text-[10px] text-slate-700">Verified court docs</span>
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-center gap-3">
                  <div className="bg-white p-1.5 rounded-lg shadow-sm border border-slate-100"><ShieldAlert className="text-orange-800" size={16} /></div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-orange-800">Live Conflict Search</span>
                    <span className="text-[10px] text-slate-700">History records scan</span>
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-center gap-3">
                  <div className="bg-white p-1.5 rounded-lg shadow-sm border border-slate-100"><Database className="text-orange-600" size={16} /></div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-orange-800">Firm Book</span>
                    <span className="text-[10px] text-slate-700">Aderant extraction</span>
                  </div>
                </div>
             </div>
          </div>
        </div>

        {/* Center Stage — Queue or Intake view */}
        {intakeItem ? (
          <IntakePage matter={intakeItem} onBack={() => setIntakeItem(null)} />
        ) : (
          <div className="flex-1 overflow-y-auto p-6 lg:p-8 bg-slate-50/50">
            
            <div className="flex justify-between items-center mb-6 w-full">
               <h2 className="text-lg font-bold text-orange-800">Intake Queue</h2>
               <div className="text-sm text-slate-700 font-medium">
                 Showing <span className="text-orange-800 font-bold">{data.length}</span> items
               </div>
            </div>

            <div className="flex flex-col gap-5 w-full pb-12">
              {data.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-slate-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:border-orange-600/30 transition-all overflow-hidden flex flex-col"
                >
                  {/* Card Header (Meta Info) */}
                  <div className="flex justify-between items-center px-6 py-3 border-b border-slate-100 bg-slate-50/50">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-black font-mono text-orange-800 bg-slate-200/60 px-2 py-1 rounded-md">{item.id}</span>
                      <span className={`text-[10px] px-2 py-1 rounded-md font-bold uppercase tracking-widest border ${getRiskStyle(item.riskLevel)}`}>
                        {item.riskLevel} Risk
                      </span>
                      <span className="text-[10px] px-2 py-1 rounded-md font-bold uppercase tracking-widest bg-slate-100 text-slate-800 border border-slate-200">
                        {item.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={() => setSelectedRow(item)}
                        className="text-slate-600 hover:text-orange-800 hover:bg-slate-200/50 p-2 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => setRowToDelete(item)}
                        className="text-slate-600 hover:text-orange-800 hover:bg-orange-800/10 p-2 rounded-lg transition-colors"
                        title="Delete Record"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Card Body (Core Info) */}
                  <div className="p-6 flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                         <span className="text-[10px] text-orange-600 uppercase tracking-widest font-bold bg-orange-600/10 px-2 py-0.5 rounded-full border border-orange-600/20">
                           {item.tag}
                         </span>
                         <span className="text-xs text-slate-600 font-medium flex items-center gap-1">
                           <Clock size={12}/> {item.initiated}
                         </span>
                      </div>
                      <h3 className="text-xl font-extrabold text-orange-800 mb-2 leading-tight">{item.client}</h3>
                      <p className="text-sm text-slate-800 leading-relaxed mb-4">{item.description}</p>
                      
                      <div className="flex flex-wrap items-center gap-6 border-t border-slate-100 pt-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Jurisdiction:</span>
                          <span className="text-xs font-semibold text-orange-800">{item.jurisdiction}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Lead Partner:</span>
                          <span className="text-xs font-semibold text-orange-800">{item.leadPartner}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Notes / Attachments Sidebar within card */}
                    <div className="w-full md:w-1/3 flex flex-col pt-2 md:pt-0">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-2">Attachments</h4>
                      <div className="flex flex-col gap-2">
                        {item.notes.split(',').map((note, i) => (
                          <div key={i} className="flex items-start gap-2 group cursor-pointer">
                            <FileText size={14} className="text-orange-600 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                            <span className="text-xs text-slate-800 font-medium leading-tight group-hover:text-orange-800 transition-colors line-clamp-2">
                              {note.trim()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="bg-white border-t border-slate-100 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      onClick={() => setIntakeItem(item)}
                      className="text-orange-600 hover:text-orange-700 font-bold text-sm underline underline-offset-4 decoration-2 decoration-violet-700/30 hover:decoration-violet-700 flex items-center gap-1 transition-all"
                    >
                      Open / Intake <ArrowRight size={14} />
                    </button>
                    
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <button
                        onClick={() => setSummaryItem(item)}
                        className="flex-1 sm:flex-none bg-white hover:bg-slate-50 text-orange-800 border border-slate-200 font-bold text-xs py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm">
                        <FileText size={14} className="text-orange-800" />
                        Intake Summary
                      </button>
                      
                      <button
                        onClick={() => setConflictItem(item)}
                        className="flex-1 sm:flex-none bg-orange-800 hover:bg-orange-900 text-white font-bold text-xs py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 group"
                      >
                        <ShieldAlert size={14} className="text-orange-600 group-hover:animate-pulse" />
                        Conflict Analysis
                      </button>
                    </div>
                  </div>

                </div>
              ))}
              
              {data.length === 0 && (
                <div className="text-center p-12 bg-white rounded-2xl border border-slate-200 border-dashed">
                  <p className="text-slate-700 font-medium">No records found in the queue.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>


      {/* Intake Summary Modal */}
      {summaryItem && (
        <IntakeSummaryModal item={summaryItem} onClose={() => setSummaryItem(null)} />
      )}

      {/* Conflict Analysis Modal */}
      {conflictItem && (
        <ConflictAnalysisModal item={conflictItem} onClose={() => setConflictItem(null)} />
      )}

      {/* Delete Confirmation Modal */}
      {rowToDelete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-[2px]">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden flex flex-col">
            <div className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-orange-800/10 text-orange-800 rounded-full flex items-center justify-center mb-4 border border-orange-800/20">
                <AlertTriangle size={32} />
              </div>
              <h3 className="text-xl font-bold text-orange-800 mb-2">Delete Record?</h3>
              <p className="text-slate-800 text-sm mb-6 leading-relaxed">
                Are you sure you want to delete <span className="font-bold text-orange-800">{rowToDelete.id}</span>? This action is permanent and cannot be undone.
              </p>
              <div className="flex gap-3 w-full">
                <button 
                  onClick={() => setRowToDelete(null)}
                  className="flex-1 px-4 py-2.5 text-orange-800 font-bold bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDeleteConfirm}
                  className="flex-1 px-4 py-2.5 bg-orange-800 text-white font-bold rounded-xl hover:bg-orange-950 transition-colors shadow-md"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Detailed Modal */}
      {selectedRow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-[2px]">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="bg-orange-800 p-5 flex justify-between items-center text-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-2 rounded-lg border border-white/10 shadow-inner shadow-orange-950/20">
                  <FileText className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-white">{selectedRow.id}</h3>
                  <p className="text-white/90 text-[10px] font-bold uppercase tracking-widest">{selectedRow.client}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedRow(null)}
                className="text-slate-300 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto bg-slate-50 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <h4 className="text-sm font-bold text-orange-800 border-b border-slate-100 pb-3 mb-4 uppercase tracking-wider">Matter Information</h4>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Matter Description</dt>
                      <dd className="text-sm font-medium text-slate-800 mt-1">{selectedRow.matterDesc}</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Description</dt>
                      <dd className="text-sm text-slate-800 mt-1">{selectedRow.description}</dd>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <dt className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Data Source</dt>
                        <dd className="text-sm font-medium text-slate-800 mt-1">{selectedRow.tag || 'N/A'}</dd>
                      </div>
                      <div>
                        <dt className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Matter #</dt>
                        <dd className="text-sm font-mono font-medium text-slate-800 mt-1">{selectedRow.matterNum}</dd>
                      </div>
                      <div>
                        <dt className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Type</dt>
                        <dd className="text-sm font-bold text-orange-800 mt-1">{selectedRow.type}</dd>
                      </div>
                    </div>
                  </dl>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <h4 className="text-sm font-bold text-orange-800 border-b border-slate-100 pb-3 mb-4 uppercase tracking-wider">Matter Administration</h4>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Initiator</dt>
                      <dd className="text-sm font-medium text-slate-800 mt-1">{selectedRow.initiator}</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Initiated Time</dt>
                      <dd className="text-sm text-slate-800 mt-1">{selectedRow.initiated}</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mb-2">Current Status</dt>
                      <span className="px-3 py-1.5 bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-bold tracking-wider uppercase">
                        {selectedRow.status}
                      </span>
                    </div>
                  </dl>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm md:col-span-2">
                  <h4 className="text-sm font-bold text-orange-800 border-b border-slate-100 pb-3 mb-4 uppercase tracking-wider">Notes & Attachments</h4>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm text-slate-800 w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedRow.notes.split(', ').map((note, i) => (
                      <div key={i} className="flex items-center gap-3 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                        <FileText size={18} className="text-orange-600 shrink-0" />
                        <span className="truncate font-medium">{note}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
            
            <div className="bg-white p-4 border-t border-slate-200 flex justify-end gap-3 shrink-0">
              <button 
                onClick={() => setSelectedRow(null)}
                className="px-6 py-2.5 text-slate-800 text-sm font-bold hover:bg-slate-100 rounded-xl transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedRow(null);
                  setIntakeItem(selectedRow);
                }}
                className="px-6 py-2.5 bg-orange-600 text-white text-sm font-bold rounded-xl hover:bg-orange-700 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                View Full Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AppV3;
