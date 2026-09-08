import React, { useState } from 'react';
import { 
  Inbox, 
  Upload, 
  Database, 
  FileText, 
  CheckCircle,
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
  Scale
} from 'lucide-react';

function App() {
  const [selectedRow, setSelectedRow] = useState(null);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
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
    'Open / Intake', 'Intake Summary', 'Conflict Analysis', 'Action'
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
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-black">
      
      {/* Top Edge-to-Edge Navbar */}
      <nav className="w-full bg-brand-navy text-white px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center shrink-0 shadow-md z-20">
        <div className="flex items-center gap-3">
          <div className="bg-[#13243b] p-1.5 rounded">
            <Inbox className="text-brand-gold" size={20} />
          </div>
          <h1 className="text-xl font-bold text-white tracking-wide flex items-center">
            CosmosHelios <span className="font-light text-brand-gold ml-1">Intake</span>
          </h1>
          <div className="hidden sm:block h-5 w-px bg-gray-600 mx-2"></div>
          <span className="hidden sm:block text-[11px] font-semibold text-gray-300 uppercase tracking-widest mt-1">
            New Business Intake <span className="text-brand-gold lowercase mx-1 font-normal tracking-normal">|</span> Auto-filled by Cortex
          </span>
        </div>
        <div className="flex items-center gap-3 mt-3 sm:mt-0">
          <span className="text-[10px] font-bold tracking-widest uppercase text-brand-gold border border-brand-gold/40 px-2.5 py-1 rounded-sm bg-brand-navy shadow-inner">
            Demo v3.10
          </span>
          <span className="text-[10px] font-bold tracking-widest uppercase text-white bg-red-900/60 border border-red-800/50 px-2.5 py-1 rounded-sm shadow-inner flex items-center gap-1">
            <AlertTriangle size={10} className="text-brand-gold" />
            Confidential
          </span>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col p-4 md:p-6">
        
        {/* Isolated Workflow Stepper */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4 flex flex-col xl:flex-row justify-between items-start xl:items-center shrink-0 gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-bold text-brand-navy uppercase tracking-wider">Workflow Inbox</h2>
            <span className="bg-blue-50 text-brand-navy border border-blue-100 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              {pendingIntakes} Pending Intakes
            </span>
          </div>
          <div className="flex items-center gap-1.5 md:gap-4 w-full xl:w-auto">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center shrink-0">
                <div className={`w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center border-2 text-[10px] md:text-xs font-bold z-10 transition-colors
                  ${step.completed ? 'border-brand-gold text-brand-gold bg-white' : 
                    step.current ? 'border-brand-gold bg-brand-gold text-white shadow-md shadow-brand-gold/20' : 
                    'border-gray-200 text-gray-400 bg-gray-50'}`}
                >
                  {step.completed ? <CheckCircle size={12} /> : index + 1}
                </div>
                <span className={`text-[10px] md:text-[11px] font-semibold ml-1.5 md:ml-2 uppercase tracking-wide
                  ${step.completed || step.current ? 'text-brand-navy' : 'text-gray-400'} 
                  ${!step.current ? 'hidden md:block' : ''}`}>
                  {step.label}
                </span>
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className={`w-3 md:w-12 h-[2px] ml-1.5 md:ml-4 
                    ${step.completed ? 'bg-brand-gold' : 'bg-gray-100'}`} 
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Control Bar - Actions & Data Sources side-by-side */}
        <div className="flex flex-col xl:flex-row gap-4 mb-4 shrink-0">
          
          {/* Actions with Extra Borders */}
          <div className="flex gap-3 w-full xl:w-auto">
            <button className="flex-1 xl:flex-none bg-white hover:bg-brand-gold/5 text-brand-navy font-bold py-2 px-5 rounded-lg flex items-center justify-center gap-2 transition-all text-sm whitespace-nowrap border-[2px] border-brand-gold shadow-sm group">
              <Upload size={16} className="text-brand-gold group-hover:scale-110 transition-transform" />
              New Intake <span className="font-normal text-xs opacity-70 hidden sm:inline">(try your own file)</span>
            </button>
            <label className="flex-1 xl:flex-none bg-white hover:bg-brand-navy/5 text-brand-navy font-bold py-2 px-5 rounded-lg flex items-center justify-center gap-2 transition-all text-sm whitespace-nowrap border-[2px] border-brand-navy shadow-sm group cursor-pointer">
              <input type="file" className="hidden" accept=".csv,.xlsx" />
              <Database size={16} className="text-brand-navy group-hover:scale-110 transition-transform" />
              Load Aderant Book
            </label>
          </div>

          {/* Horizontal Context Bar (Desktop) & Data Pipeline (Mobile) */}
          <div className="w-full xl:flex-1 bg-brand-navy rounded-xl shadow-sm border border-brand-navy flex flex-col items-start p-4 md:p-2.5">
            
            {/* --- DESKTOP VIEW --- */}
            <div className="hidden md:flex flex-row items-center gap-5 w-full">
              {/* Recessed Label */}
              <div className="bg-black/20 px-4 py-2 rounded-lg border border-white/5 shadow-inner flex items-center shrink-0">
                <span className="text-[11px] font-medium text-gray-300 tracking-wide">
                  Where the data comes from:
                </span>
              </div>
              
              <div className="flex items-center gap-6 w-full justify-around px-2 border-l border-white/10 pl-6">
                <div className="flex items-center gap-3">
                  <div className="bg-[#13243b] p-2 rounded-lg border border-gray-700/50">
                    <FileText className="text-brand-gold" size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Real Filing</span>
                    <span className="text-xs text-gray-200 font-medium">Verified court docs</span>
                  </div>
                </div>

                <div className="w-px h-8 bg-gray-700"></div>

                <div className="flex items-center gap-3">
                  <div className="bg-[#13243b] p-2 rounded-lg border border-gray-700/50">
                    <ShieldAlert className="text-brand-gold" size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Live Conflict Search</span>
                    <span className="text-xs text-gray-200 font-medium">491 history records</span>
                  </div>
                </div>

                <div className="w-px h-8 bg-gray-700"></div>

                <div className="flex items-center gap-3">
                  <div className="bg-[#13243b] p-2 rounded-lg border border-gray-700/50">
                    <Database className="text-brand-gold" size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Firm Book</span>
                    <span className="text-xs text-gray-200 font-medium">CS&K Aderant extract</span>
                  </div>
                </div>
              </div>
            </div>

            {/* --- MOBILE VIEW (Vertical Legend) --- */}
            <div className="flex md:hidden flex-col w-full">
              <div className="bg-black/20 px-3 py-2 rounded-lg border border-white/5 shadow-inner flex items-center shrink-0 w-full mb-3">
                <span className="text-[10px] font-medium text-gray-300 tracking-wide">
                  Where the data comes from:
                </span>
              </div>
              
              <div className="flex flex-col gap-2">
                {/* Item 1 */}
                <div className="bg-[#13243b] p-2.5 rounded-lg border border-gray-700/50 flex items-center gap-3 w-full shadow-sm">
                  <FileText className="text-brand-gold shrink-0" size={16} />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">Real Filing</span>
                    <span className="text-[9px] text-gray-300 font-medium">Verified court docs</span>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="bg-[#13243b] p-2.5 rounded-lg border border-gray-700/50 flex items-center gap-3 w-full shadow-sm">
                  <ShieldAlert className="text-brand-gold shrink-0" size={16} />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">Live Conflict Search</span>
                    <span className="text-[9px] text-gray-300 font-medium">491 history records</span>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="bg-[#13243b] p-2.5 rounded-lg border border-gray-700/50 flex items-center gap-3 w-full shadow-sm">
                  <Database className="text-brand-gold shrink-0" size={16} />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">Firm Book</span>
                    <span className="text-[9px] text-gray-300 font-medium">CS&K Aderant extract</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Grid Container */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col mb-6">
          <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50 shrink-0 rounded-t-xl">
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-bold text-brand-navy uppercase tracking-wider">Intake Pipeline Data</h2>
            </div>
          </div>
          
          <div className="overflow-x-auto">
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
                    <td className="p-3 text-sm font-semibold text-brand-navy whitespace-nowrap">
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
                              row.tag === 'Real Filing' ? 'bg-[#C9A456]/10 text-[#b08b3e] border-[#C9A456]/30' :
                              row.tag === 'Live Conflict Search' ? 'bg-red-50 text-red-600 border-red-200' :
                              'bg-[#13243b]/5 text-[#13243b] border-[#13243b]/20'
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
                      <a href="#" className="text-brand-gold hover:text-[#b59247] font-semibold text-xs whitespace-nowrap underline underline-offset-2">
                        Open / Intake
                      </a>
                    </td>
                    <td className="p-3">
                      <a href="#" className="text-brand-navy hover:text-brand-gold font-semibold text-xs whitespace-nowrap flex items-center gap-1 transition-colors">
                        <FileText size={14} />
                        Intake Summary
                      </a>
                    </td>
                    <td className="p-3">
                      <button className="bg-brand-navy hover:bg-brand-dark text-white text-[11px] uppercase tracking-wide font-bold py-1.5 px-2.5 rounded whitespace-nowrap transition-colors flex items-center gap-1 shadow-sm">
                        <ShieldAlert size={12} />
                        Conflict Analysis
                      </button>
                    </td>
                    <td className="p-3 sticky right-0 bg-white shadow-[-5px_0_10px_-5px_rgba(0,0,0,0.05)] border-l border-gray-100 group-hover:bg-blue-50/30">
                      <div className="flex items-center gap-2 min-w-max">
                        <button 
                          onClick={() => setSelectedRow(row)}
                          className="text-brand-navy bg-brand-navy/5 hover:bg-brand-gold hover:text-white transition-colors flex items-center justify-center p-1.5 rounded"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                        <button 
                          onClick={() => setRowToDelete(row)}
                          className="text-red-500 bg-red-50 hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center p-1.5 rounded"
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
          </div>

          {/* Pagination Controls */}
          {data.length > 0 && (
            <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-white shrink-0 rounded-b-xl">
              <div className="text-sm text-gray-500">
                Showing <span className="font-semibold text-brand-navy">{startIndex + 1}</span> to <span className="font-semibold text-brand-navy">{Math.min(startIndex + rowsPerPage, data.length)}</span> of <span className="font-semibold text-brand-navy">{data.length}</span> entries
              </div>
              <div className="flex items-center gap-1 border border-gray-300 rounded-md overflow-hidden shadow-sm">
                <button 
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="p-1.5 bg-white text-gray-600 hover:bg-gray-50 hover:text-brand-gold disabled:opacity-50 disabled:cursor-not-allowed transition-colors border-r border-gray-300"
                >
                  <ChevronLeft size={18} />
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 flex items-center justify-center text-sm font-bold transition-colors
                      ${currentPage === page ? 'bg-brand-gold text-white' : 'bg-white text-brand-navy hover:bg-gray-50 border-r border-gray-300'}`}
                  >
                    {page}
                  </button>
                ))}
                
                <button 
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="p-1.5 bg-white text-gray-600 hover:bg-gray-50 hover:text-brand-gold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {rowToDelete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
            <div className="p-6 flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle size={28} />
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-2">Delete Record?</h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                Are you sure you want to delete <span className="font-bold text-black">{rowToDelete.id}</span>? This action is permanent and cannot be undone.
              </p>
              <div className="flex gap-3 w-full">
                <button 
                  onClick={() => setRowToDelete(null)}
                  className="flex-1 px-4 py-2.5 text-brand-navy font-bold bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDeleteConfirm}
                  className="flex-1 px-4 py-2.5 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors shadow-sm"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/80 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
            <div className="bg-brand-navy p-5 flex justify-between items-center text-white shrink-0">
              <div className="flex items-center gap-3">
                <FileText className="text-brand-gold" size={24} />
                <div>
                  <h3 className="text-xl font-bold">{selectedRow.id}</h3>
                  <p className="text-brand-gold text-xs font-medium uppercase tracking-wider">{selectedRow.client}</p>
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
                  <h4 className="text-md font-bold text-brand-navy border-b border-gray-100 pb-2 mb-4">Matter Information</h4>
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
                        <dd className="text-sm font-bold text-brand-navy mt-1">{selectedRow.type}</dd>
                      </div>
                    </div>
                  </dl>
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                  <h4 className="text-md font-bold text-brand-navy border-b border-gray-100 pb-2 mb-4">Matter Administration</h4>
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
                      <span className="px-3 py-1.5 bg-gray-100 text-brand-navy border border-gray-200 rounded-md text-xs font-bold tracking-wide">
                        {selectedRow.status}
                      </span>
                    </div>
                  </dl>
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm md:col-span-2">
                  <h4 className="text-md font-bold text-brand-navy border-b border-gray-100 pb-2 mb-3">Notes & Attachments</h4>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm text-gray-700 w-full">
                    {selectedRow.notes.split(', ').map((note, i) => (
                      <div key={i} className="flex items-center gap-2 mb-2 last:mb-0">
                        <FileText size={16} className="text-brand-gold shrink-0" />
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
              <button className="px-5 py-2 bg-brand-gold text-white text-sm font-bold rounded-lg hover:bg-[#b59247] transition-colors shadow-sm">
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
