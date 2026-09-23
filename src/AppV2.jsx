import React, { useState, useEffect } from 'react';
import { 
  Inbox, 
  Upload, 
  Database, 
  FileText, 
  CheckCircle,
  Check,
  Clock,
  ShieldAlert,
  Info,
  Eye,
  X,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Hash,
  Scale,
  LayoutGrid,
  List
} from 'lucide-react';

function App() {
  const [selectedRow, setSelectedRow] = useState(null);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState(() => 
    typeof window !== 'undefined' && window.innerWidth < 768 ? 'card' : 'grid'
  );
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setViewMode('card');
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const rowsPerPage = 10;
  
  const pendingIntakes = 12; // Placeholder
  
  const steps = [
    { label: 'Email in', completed: true },
    { label: 'Intake', completed: true },
    { label: 'Approval', completed: false, current: true },
    { label: 'Conflict Search', completed: false },
    { label: 'Conflict Review', completed: false },
    { label: 'Decision', completed: false }
  ];

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
    },
    {
      id: 'CM-1098472',
      tag: 'Real Filing',
      riskLevel: 'Low',
      jurisdiction: 'IL Circuit Court',
      leadPartner: 'T. Jefferson',
      description: 'Acme Corp v. Global Tech (IP Infringement)',
      initiated: 'July 2, 2026 10:05 AM',
      type: 'New Matter Intake',
      client: 'Acme Corp',
      matterNum: '0',
      matterDesc: 'Acme Corp v. Global Tech Patent Infringement',
      initiator: 'Alice Johnson',
      status: 'Pending - Review',
      notes: 'CM-1098472 Notice_of_Claim.pdf'
    },
    {
      id: 'CM-1098473',
      tag: 'Live Conflict Search',
      riskLevel: 'Medium',
      jurisdiction: 'NY State Supreme',
      leadPartner: 'J. Harrison',
      description: 'Rivera v. City of NY (personal injury)',
      initiated: 'July 2, 2026 1:15 PM',
      type: 'New Client Intake',
      client: 'Hector Rivera',
      matterNum: '0',
      matterDesc: 'Rivera v. City of New York and MTA',
      initiator: 'Cosmos Cortex (auto-intake)',
      status: 'Draft - Intake',
      notes: 'CM-1098473 Initial_Pleadings.pdf'
    },
    {
      id: 'CM-1098474',
      tag: 'Real Filing',
      riskLevel: 'High',
      jurisdiction: 'Delaware Chancery',
      leadPartner: 'S. Goldberg',
      description: 'Merger Dispute (Pinnacle & Vertex)',
      initiated: 'July 3, 2026 9:30 AM',
      type: 'New Matter Intake (RUSH)',
      client: 'Pinnacle Holdings LLC',
      matterNum: '0',
      matterDesc: 'Pinnacle Holdings LLC v. Vertex Partners LP',
      initiator: 'Jane Doe',
      status: 'Conflict Check',
      notes: 'CM-1098474 Merger_Agreement_Dispute.pdf'
    },
    {
      id: 'CM-1098475',
      tag: 'System Load',
      riskLevel: 'Low',
      jurisdiction: 'Internal',
      leadPartner: 'Firm Ops',
      description: 'Attorney Roster Update',
      initiated: 'July 3, 2026 11:00 AM',
      type: 'System Maintenance',
      client: 'Internal - HR',
      matterNum: 'N/A',
      matterDesc: 'Monthly Attorney Roster Sync',
      initiator: 'System Admin',
      status: 'Completed',
      notes: 'Roster_July2026.csv'
    },
    {
      id: 'CM-1098476',
      tag: 'Real Filing',
      riskLevel: 'Medium',
      jurisdiction: 'TX Dist. Dallas Cty',
      leadPartner: 'M. Chen',
      description: 'Bright Future Inc. (employment discrimination)',
      initiated: 'July 5, 2026 8:45 AM',
      type: 'New Client/Matter Intake',
      client: 'Bright Future Inc.',
      matterNum: '0',
      matterDesc: 'Sarah Jenkins v. Bright Future Inc.',
      initiator: 'Cosmos Cortex (auto-intake)',
      status: 'Draft - Intake',
      notes: 'CM-1098476 EEOC_Charge.pdf'
    },
    {
      id: 'CM-1098477',
      tag: 'Live Conflict Search',
      riskLevel: 'High',
      jurisdiction: 'SDNY Federal',
      leadPartner: 'A. Patel',
      description: 'Omega Financial (SEC investigation)',
      initiated: 'July 5, 2026 10:20 AM',
      type: 'New Matter Intake (RUSH)',
      client: 'Omega Financial Group',
      matterNum: '0',
      matterDesc: 'SEC Inquiry into Omega Financial Group Q1 Trading',
      initiator: 'John Smith',
      status: 'Pending - Review',
      notes: 'CM-1098477 SEC_Subpoena.pdf'
    },
    {
      id: 'CM-1098478',
      tag: 'Real Filing',
      riskLevel: 'Low',
      jurisdiction: 'FL Circuit - Tampa',
      leadPartner: 'R. Simmons',
      description: 'Gulf Coast Realty (contract dispute)',
      initiated: 'July 6, 2026 2:10 PM',
      type: 'New Matter Intake',
      client: 'Gulf Coast Realty Advisors',
      matterNum: '0',
      matterDesc: 'Gulf Coast Realty v. Sunstate Builders',
      initiator: 'Jane Doe',
      status: 'Approved',
      notes: 'CM-1098478 Commercial_Lease_Dispute.pdf'
    },
    {
      id: 'CM-1098479',
      tag: 'Live Conflict Search',
      riskLevel: 'Medium',
      jurisdiction: 'WA Superior - King',
      leadPartner: 'T. Jefferson',
      description: 'CloudNet (data breach class action)',
      initiated: 'July 7, 2026 9:15 AM',
      type: 'New Client Intake',
      client: 'CloudNet Systems',
      matterNum: '0',
      matterDesc: 'Consumer Class Action re Data Breach',
      initiator: 'Cosmos Cortex (auto-intake)',
      status: 'Draft - Intake',
      notes: 'CM-1098479 Class_Action_Complaint.pdf'
    },
    {
      id: 'CM-1098480',
      tag: 'Real Filing',
      riskLevel: 'High',
      jurisdiction: 'CA Superior - SF',
      leadPartner: 'S. Goldberg',
      description: 'BioTech Solutions (trade secret theft)',
      initiated: 'July 7, 2026 4:00 PM',
      type: 'New Matter Intake (RUSH)',
      client: 'BioTech Solutions',
      matterNum: '0',
      matterDesc: 'BioTech Solutions v. Former Employees',
      initiator: 'Alice Johnson',
      status: 'Conflict Check',
      notes: 'CM-1098480 TRO_Application.pdf'
    }
  ];

  const [data, setData] = useState(initialTableData);

  const visibleColumns = [
    'Workflow ID', 'Client', 'Description', 'Initiated', 'Status', 
    'Open / Intake', 'Intake Summary', 'Conflict Report', 'Action'
  ];

  // Pagination Logic
  const totalPages = Math.ceil(data.length / rowsPerPage) || 1;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentTableData = data.slice(startIndex, startIndex + rowsPerPage);

  const handlePrevPage = () => setCurrentPage(p => Math.max(1, p - 1));
  const handleNextPage = () => setCurrentPage(p => Math.min(totalPages, p + 1));

  const handleDeleteConfirm = () => {
    setData(data.filter(item => item.id !== rowToDelete.id));
    setRowToDelete(null);
    
    // Adjust page if we deleted the last item on the current page
    if (currentTableData.length === 1 && currentPage > 1) {
      setCurrentPage(p => p - 1);
    }
  };

  return (
    <div className="h-screen flex bg-gray-50 font-sans text-black overflow-hidden">
      
      {/* Left Sidebar */}
      <aside className="w-72 bg-blue-900 text-white flex flex-col shrink-0 shadow-xl z-20 overflow-y-auto">
        
        {/* Branding */}
        <div className="p-6 pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-950 p-1.5 rounded">
              <Inbox className="text-blue-200" size={20} />
            </div>
            <h1 className="text-xl font-bold text-white tracking-wide">
              Cosmos<span className="font-light text-blue-200">Intake</span>
            </h1>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <span className="text-[10px] font-bold tracking-widest uppercase text-blue-200 border border-blue-200/40 px-2.5 py-1 rounded-sm bg-blue-950 shadow-inner text-center w-max">
              Demo v3.10
            </span>
          </div>
        </div>

        {/* Workflow Stepper - Vertical */}
        <div className="p-6 border-b border-white/10 shrink-0 flex-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-gray-300 uppercase tracking-wider">Workflow</h2>
            <span className="bg-blue-200/10 text-blue-200 border border-blue-200/20 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
              {pendingIntakes} Pending
            </span>
          </div>
          
          <div className="flex flex-col gap-4 relative">
            <div className="absolute left-[11px] top-4 bottom-4 w-px bg-white/10 z-0"></div>
            {steps.map((step, index) => (
              <div key={index} className="flex items-center gap-4 relative z-10">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 text-[10px] font-bold transition-colors shadow-sm
                  ${step.completed ? 'border-blue-400 text-blue-400 bg-blue-900' : 
                    step.current ? 'border-blue-500 bg-blue-500 text-white shadow-blue-500/30' : 
                    'border-zinc-500 text-zinc-400 bg-blue-950'}`}
                >
                  {step.completed ? <Check size={14} strokeWidth={3} /> : index + 1}
                </div>
                <span className={`text-xs font-semibold uppercase tracking-wide
                  ${step.completed || step.current ? 'text-white' : 'text-zinc-400'}`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="p-6 shrink-0 flex flex-col gap-3">
          <button className="w-full bg-white hover:bg-gray-100 text-blue-900 font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all text-sm shadow-sm">
            <Upload size={16} className="text-blue-600" />
            New Intake
          </button>
          <label className="w-full bg-blue-950 hover:bg-[#1a304e] border border-white/10 text-white font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all text-sm cursor-pointer shadow-sm">
            <input type="file" className="hidden" accept=".csv,.xlsx" />
            <Database size={16} className="text-white" />
            Load Aderant Book
          </label>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-gray-100 p-6">


        {/* Top Header inside Main Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row items-start md:items-center justify-between p-4 mb-6 shrink-0 gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-blue-900 text-white px-3 py-1.5 rounded-lg border border-blue-600/30 shadow-sm flex items-center gap-2">
              <Database size={14} className="text-white"/>
              <span className="text-xs font-bold tracking-wide">DATA SOURCES</span>
            </div>
            
            <div className="flex items-center gap-4 text-xs font-medium">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-gray-600">Real Filing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-blue-800"></div>
                <span className="text-gray-600">Live Conflict Search</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                <span className="text-gray-600">Firm Book</span>
              </div>
            </div>
          </div>
          
   
        </div>

        {/* Grid/Card Container */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col mb-6">
          <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50 shrink-0 rounded-t-xl">
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-bold text-blue-900 uppercase tracking-wider">Intake Pipeline Data</h2>
            </div>
            <div className="flex bg-gray-200/60 rounded-lg p-1">
               <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-900' : 'text-gray-500 hover:text-gray-700'}`} title="Table View"><List size={16} /></button>
               <button onClick={() => setViewMode('card')} className={`p-1.5 rounded-md transition-colors ${viewMode === 'card' ? 'bg-white shadow-sm text-blue-900' : 'text-gray-500 hover:text-gray-700'}`} title="Card View"><LayoutGrid size={16} /></button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            {viewMode === 'grid' ? (
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 z-20 bg-gray-50 shadow-sm border-b border-gray-200">
                <tr>
                  {visibleColumns.map((col, idx) => (
                    <th key={idx} className={`p-3 text-xs font-bold uppercase tracking-wider text-gray-500 whitespace-nowrap bg-gray-50 ${col === 'Action' ? 'sticky right-0 shadow-[-5px_0_10px_-5px_rgba(0,0,0,0.1)] z-30' : ''}`}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentTableData.length > 0 ? currentTableData.map((row) => (
                  <tr key={row.id} className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors">
                    <td className="p-3 text-sm font-semibold text-blue-900 whitespace-nowrap">
                      {row.id}
                    </td>
                    <td className="p-3 text-sm text-black font-medium whitespace-nowrap">{row.client}</td>
                    <td className="p-3">
                      <div className="flex flex-col items-start gap-1.5">
                        <span className="text-sm text-black max-w-[250px] truncate" title={row.description}>
                          {row.description}
                        </span>
                        {row.tag && (
                          <span 
                            className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border cursor-help shadow-sm ${
                              row.tag === 'Real Filing' ? 'bg-blue-600/10 text-blue-400 border-blue-600/30' :
                              row.tag === 'Live Conflict Search' ? 'bg-blue-800/10 text-blue-800 border-blue-800/30' :
                              'bg-blue-950/5 text-blue-400 border-blue-400/20'
                            }`}
                            title={
                              row.tag === 'Real Filing' ? 'Verified public court documents' :
                              row.tag === 'Live Conflict Search' ? '491 history records scanned' :
                              row.tag === 'Firm Book Load' ? 'CS&K Aderant extract' :
                              'Internal system automation'
                            }
                          >
                            {row.tag}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-3 text-sm text-black whitespace-nowrap">{row.initiated}</td>
                    <td className="p-3">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-bold tracking-wide whitespace-nowrap">{row.status}</span>
                    </td>
                    <td className="p-3">
                      <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold text-xs whitespace-nowrap underline underline-offset-2">
                        Open / Intake
                      </a>
                    </td>
                    <td className="p-3">
                      <a href="#" className="text-blue-900 hover:text-blue-600 font-semibold text-xs whitespace-nowrap flex items-center gap-1 transition-colors">
                        <FileText size={14} />
                        Intake Summary
                      </a>
                    </td>
                    <td className="p-3">
                      <button className="bg-blue-900 hover:bg-brand-dark text-white text-[11px] uppercase tracking-wide font-bold py-1.5 px-2.5 rounded whitespace-nowrap transition-colors flex items-center gap-1 shadow-sm">
                        <ShieldAlert size={12} />
                        Conflict Report
                      </button>
                    </td>
                    <td className="p-3 sticky right-0 bg-white shadow-[-5px_0_10px_-5px_rgba(0,0,0,0.05)] border-l border-gray-100 group-hover:bg-blue-50/30">
                      <div className="flex items-center gap-2 min-w-max">
                        <button 
                          onClick={() => setSelectedRow(row)}
                          className="text-zinc-300 hover:bg-blue-950 hover:text-blue-200 transition-colors flex items-center justify-center p-1.5 rounded"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                        <button 
                          onClick={() => setRowToDelete(row)}
                          className="text-blue-800 bg-blue-800/10 hover:bg-blue-800 hover:text-white transition-colors flex items-center justify-center p-1.5 rounded"
                          title="Delete Record"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={visibleColumns.length} className="p-8 text-center text-gray-500">
                      No records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4 bg-gray-50/30">
                {currentTableData.length > 0 ? currentTableData.map((row) => (
                  <div key={row.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_15px_-4px_rgba(201,164,86,0.15)] transition-all flex flex-col relative group overflow-hidden">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-black font-mono text-blue-900 bg-blue-900/5 px-2 py-0.5 rounded">{row.id}</span>
                      <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-lg p-0.5 border border-gray-100">
                        <button 
                          onClick={() => setSelectedRow(row)}
                          className="text-blue-900 hover:bg-blue-900/10 transition-colors p-1.5 rounded"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={() => setRowToDelete(row)}
                          className="text-blue-800 hover:bg-blue-800/10 transition-colors p-1.5 rounded"
                          title="Delete Record"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <h3 className="font-extrabold text-gray-900 text-base mb-1">{row.client}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3 flex-1">{row.description}</p>
                    
                    {row.tag && (
                      <div className="mb-4">
                        <span 
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border cursor-help shadow-sm ${
                            row.tag === 'Real Filing' ? 'bg-blue-600/10 text-blue-400 border-blue-600/30' :
                            row.tag === 'Live Conflict Search' ? 'bg-blue-800/10 text-blue-800 border-blue-800/30' :
                            'bg-blue-950/5 text-blue-400 border-blue-400/20'
                          }`}
                        >
                          {row.tag}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex flex-col gap-3 mt-auto pt-3 border-t border-gray-100">
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] text-gray-500 flex items-center gap-1 font-medium"><Clock size={12}/> {row.initiated}</span>
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-md text-[10px] font-bold tracking-wide uppercase">{row.status}</span>
                      </div>
                      
                      <div className="flex justify-between items-center mt-1">
                        <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold text-xs underline underline-offset-2">Open / Intake</a>
                        <div className="flex gap-2">
                           <button className="bg-gray-100 hover:bg-gray-200 text-blue-900 p-1.5 rounded transition-colors" title="Intake Summary">
                             <FileText size={14} />
                           </button>
                           <button className="bg-blue-900 hover:bg-[#08152b] text-white p-1.5 rounded transition-colors shadow-sm" title="Conflict Report">
                             <ShieldAlert size={14} />
                           </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="col-span-full p-8 text-center text-gray-500">
                    No records found.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {data.length > 0 && (
            <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-white shrink-0 rounded-b-xl">
              <div className="text-sm text-gray-500">
                Showing <span className="font-semibold text-blue-900">{startIndex + 1}</span> to <span className="font-semibold text-blue-900">{Math.min(startIndex + rowsPerPage, data.length)}</span> of <span className="font-semibold text-blue-900">{data.length}</span> entries
              </div>
              <div className="flex items-center gap-1 border border-gray-300 rounded-md overflow-hidden shadow-sm">
                <button 
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="p-1.5 bg-white text-gray-600 hover:bg-gray-50 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border-r border-gray-300"
                >
                  <ChevronLeft size={18} />
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 flex items-center justify-center text-sm font-bold transition-colors
                      ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-white text-blue-900 hover:bg-gray-50 border-r border-gray-300'}`}
                  >
                    {page}
                  </button>
                ))}
                
                <button 
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="p-1.5 bg-white text-gray-600 hover:bg-gray-50 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {rowToDelete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-blue-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
            <div className="p-6 flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-blue-800/20 text-blue-800 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle size={28} />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">Delete Record?</h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                Are you sure you want to delete <span className="font-bold text-black">{rowToDelete.id}</span>? This action is permanent and cannot be undone.
              </p>
              <div className="flex gap-3 w-full">
                <button 
                  onClick={() => setRowToDelete(null)}
                  className="flex-1 px-4 py-2.5 text-blue-900 font-bold bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDeleteConfirm}
                  className="flex-1 px-4 py-2.5 bg-blue-800 text-white font-bold rounded-lg hover:bg-blue-900 transition-colors shadow-sm"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-blue-900/80 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
            <div className="bg-blue-900 p-5 flex justify-between items-center text-white shrink-0">
              <div className="flex items-center gap-3">
                <FileText className="text-blue-600" size={24} />
                <div>
                  <h3 className="text-xl font-bold">{selectedRow.id}</h3>
                  <p className="text-blue-600 text-xs font-medium uppercase tracking-wider">{selectedRow.client}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedRow(null)}
                className="text-gray-300 hover:text-white transition-colors bg-brand-dark hover:bg-gray-800 p-2 rounded-full"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto bg-gray-50 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                  <h4 className="text-md font-bold text-blue-900 border-b border-gray-100 pb-2 mb-4">Matter Information</h4>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Matter Description</dt>
                      <dd className="text-sm font-medium text-gray-900 mt-1">{selectedRow.matterDesc}</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Description</dt>
                      <dd className="text-sm text-gray-700 mt-1">{selectedRow.description}</dd>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <dt className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Data Source</dt>
                        <dd className="text-sm font-medium text-gray-800 mt-1">{selectedRow.tag || 'N/A'}</dd>
                      </div>
                      <div>
                        <dt className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Matter #</dt>
                        <dd className="text-sm font-medium text-gray-800 mt-1">{selectedRow.matterNum}</dd>
                      </div>
                      <div>
                        <dt className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Type</dt>
                        <dd className="text-sm font-bold text-blue-900 mt-1">{selectedRow.type}</dd>
                      </div>
                    </div>
                  </dl>
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                  <h4 className="text-md font-bold text-blue-900 border-b border-gray-100 pb-2 mb-4">Matter Administration</h4>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Initiator</dt>
                      <dd className="text-sm font-medium text-gray-900 mt-1">{selectedRow.initiator}</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Initiated Time</dt>
                      <dd className="text-sm text-gray-700 mt-1">{selectedRow.initiated}</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Current Status</dt>
                      <span className="px-3 py-1.5 bg-gray-100 text-blue-900 border border-gray-200 rounded-md text-xs font-bold tracking-wide">
                        {selectedRow.status}
                      </span>
                    </div>
                  </dl>
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm md:col-span-2">
                  <h4 className="text-md font-bold text-blue-900 border-b border-gray-100 pb-2 mb-3">Notes & Attachments</h4>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm text-gray-700 w-full">
                    {selectedRow.notes.split(', ').map((note, i) => (
                      <div key={i} className="flex items-center gap-2 mb-2 last:mb-0">
                        <FileText size={16} className="text-blue-600 shrink-0" />
                        <span className="truncate">{note}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
            
            <div className="bg-white p-4 border-t border-gray-200 flex justify-end gap-3 shrink-0">
              <button 
                onClick={() => setSelectedRow(null)}
                className="px-5 py-2 text-gray-600 text-sm font-bold hover:bg-gray-100 rounded-lg transition-colors"
              >
                Close
              </button>
              <button className="px-5 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                View Full Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
