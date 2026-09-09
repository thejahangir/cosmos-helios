import React, { useState, useEffect } from 'react';
import { 
  Inbox, 
  Upload, 
  Database, 
  FileText, 
  CheckCircle,
  Clock,
  ShieldAlert,
  Info,
  Search,
  AlertTriangle,
  ChevronRight,
  Trash2,
  Hash,
  Scale,
  LayoutGrid,
  List,
  Filter,
  MoreVertical,
  User,
  Activity,
  ArrowRight,
  FileCheck,
  Settings,
  LogOut
} from 'lucide-react';

function App() {
  const [selectedRow, setSelectedRow] = useState(null);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [showUserMenu, setShowUserMenu] = useState(false);

  const pendingIntakes = 12;

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
    }
  ];

  const [data, setData] = useState(initialTableData);

  const filteredData = data.filter(item => {
    const matchesSearch = item.client.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' ? true : item.tag === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleDeleteConfirm = () => {
    setData(data.filter(item => item.id !== rowToDelete.id));
    if (selectedRow?.id === rowToDelete.id) {
      setSelectedRow(null);
    }
    setRowToDelete(null);
  };

  const getRiskColor = (level) => {
    switch(level) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-amber-500';
      case 'Low': return 'bg-emerald-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#f4f7f9] overflow-hidden font-sans text-brand-navy selection:bg-brand-gold/30">
      
      {/* Sidebar Navigation */}
      <aside className="w-16 lg:w-[220px] bg-brand-navy text-white flex flex-col items-center lg:items-stretch py-5 transition-all duration-300 shadow-xl z-20 shrink-0 border-r border-white/5">
        <div className="flex items-center gap-3 px-0 lg:px-6 mb-8 w-full justify-center lg:justify-start">
          <div className="bg-gradient-to-br from-brand-gold to-yellow-600 p-2 rounded-lg shadow-lg shadow-brand-gold/20 flex-shrink-0">
            <Inbox className="text-brand-navy" size={20} strokeWidth={2.5} />
          </div>
          <h1 className="text-lg font-bold text-white tracking-wide hidden lg:block">
            CosmosHelios<span className="font-light text-brand-gold"> - Intake</span>
          </h1>
        </div>

        <nav className="flex-1 w-full space-y-2 px-3">
          <NavItem icon={<Inbox size={20} />} label="Inbox" badge={pendingIntakes} active />
          <NavItem icon={<Activity size={20} />} label="Active Workflows" />
          <NavItem icon={<FileCheck size={20} />} label="Approvals" />
          <NavItem icon={<ShieldAlert size={20} />} label="Conflicts" />
          <NavItem icon={<Database size={20} />} label="Firm Data" />
        </nav>

        <div className="px-3 w-full mt-auto relative">
          
          {/* User Menu Popover */}
          {showUserMenu && (
            <div className="absolute bottom-full left-3 right-3 mb-2 bg-[#1a2f4c] border border-white/10 rounded-xl shadow-2xl py-1 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <button 
                onClick={() => setShowUserMenu(false)}
                className="w-full text-left px-4 py-2.5 text-sm text-gray-200 hover:bg-brand-gold/10 hover:text-white transition-colors flex items-center gap-3"
              >
                <User size={16} className="text-brand-gold" />
                My Profile
              </button>
              <button 
                onClick={() => setShowUserMenu(false)}
                className="w-full text-left px-4 py-2.5 text-sm text-gray-200 hover:bg-brand-gold/10 hover:text-white transition-colors flex items-center gap-3"
              >
                <Settings size={16} className="text-gray-400" />
                Setting
              </button>
              <div className="h-px bg-white/10 my-1 mx-2"></div>
              <button 
                onClick={() => setShowUserMenu(false)}
                className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors flex items-center gap-3"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}

          <div 
            onClick={() => setShowUserMenu(!showUserMenu)}
            className={`bg-[#13243b] rounded-xl p-3 flex flex-col items-center lg:items-start gap-2 shadow-inner cursor-pointer transition-all duration-200 border
              ${showUserMenu ? 'border-brand-gold/50 bg-[#1a2f4c]' : 'border-white/5 hover:border-white/20'}`}
          >
            <div className="flex items-center gap-2 w-full">
              <div className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold shrink-0">
                <User size={16} />
              </div>
              <div className="hidden lg:block overflow-hidden flex-1">
                <p className="text-xs font-bold text-white truncate">J. Harrison</p>
                <p className="text-[10px] text-gray-400 truncate">Partner</p>
              </div>
              <ChevronRight size={14} className={`hidden lg:block shrink-0 text-gray-500 transition-transform duration-200 ${showUserMenu ? '-rotate-90 text-brand-gold' : ''}`} />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* Top Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-6 shrink-0 z-10 sticky top-0">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-extrabold text-brand-navy hidden sm:block">Workflow Inbox</h2>
            <div className="h-5 w-px bg-gray-300 hidden sm:block"></div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-brand-gold border border-brand-gold/40 px-2.5 py-1 rounded-full bg-brand-gold/5">
              Demo v3.10
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-gold transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Search clients, matters, IDs..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 w-64 lg:w-80 bg-gray-100 border-transparent focus:bg-white border focus:border-brand-gold/50 rounded-full text-sm outline-none transition-all shadow-sm focus:shadow-md"
              />
            </div>
            
            <div className="flex gap-2">
              <label className="bg-white hover:bg-gray-50 text-brand-navy font-semibold py-2 px-4 rounded-full flex items-center gap-2 transition-all shadow-sm border border-gray-200 cursor-pointer text-sm group">
                <input type="file" className="hidden" accept=".csv,.xlsx" />
                <Database size={16} className="text-brand-navy group-hover:-translate-y-0.5 transition-transform" />
                <span className="hidden sm:inline">Load Aderant Book</span>
              </label>
              <button className="bg-brand-navy hover:bg-[#08152b] text-white font-semibold py-2 px-4 rounded-full flex items-center gap-2 transition-all shadow-md shadow-brand-navy/20 hover:shadow-lg text-sm group">
                <Upload size={16} className="group-hover:-translate-y-0.5 transition-transform" />
                <span className="hidden sm:inline">New Intake</span>
              </button>
            </div>
          </div>
        </header>

        {/* Master-Detail Split View */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* LEFT PANE: Master List */}
          <div className={`
            ${selectedRow ? 'hidden lg:flex' : 'flex'} 
            w-full lg:w-[400px] xl:w-[450px] flex-col bg-white border-r border-gray-200 z-10 shrink-0
          `}>
            
            {/* List Header & Filters */}
            <div className="p-4 border-b border-gray-100 bg-gray-50/50 shrink-0 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{filteredData.length} items found</span>
                <button className="text-gray-400 hover:text-brand-navy p-1 transition-colors">
                  <Filter size={16} />
                </button>
              </div>
              
              <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
                {['All', 'Real Filing', 'Live Conflict Search', 'Firm Book Load'].map(filter => (
                  <button 
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-bold transition-all
                      ${activeFilter === filter 
                        ? 'bg-brand-navy text-white shadow-sm' 
                        : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'}`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* List Items */}
            <div className="flex-1 hover-scrollbar bg-gray-50/30">
              {filteredData.length > 0 ? filteredData.map((row) => (
                <div 
                  key={row.id}
                  onClick={() => setSelectedRow(row)}
                  className={`
                    p-4 border-b border-gray-100 cursor-pointer transition-all duration-200 group relative
                    ${selectedRow?.id === row.id 
                      ? 'bg-brand-gold/5 border-l-4 border-l-brand-gold' 
                      : 'bg-white hover:bg-gray-50 border-l-4 border-l-transparent'}
                  `}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-black font-mono text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded group-hover:bg-gray-200 transition-colors">{row.id}</span>
                    <span className="text-[10px] text-gray-400 flex items-center gap-1 font-medium"><Clock size={10}/> {row.initiated.split(' ')[0]}</span>
                  </div>
                  
                  <h3 className={`font-extrabold text-sm mb-1 ${selectedRow?.id === row.id ? 'text-brand-gold' : 'text-brand-navy'}`}>
                    {row.client}
                  </h3>
                  
                  <p className="text-xs text-gray-600 line-clamp-2 mb-3 leading-relaxed">
                    {row.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full shadow-sm ${getRiskColor(row.riskLevel)}`} title={`Risk: ${row.riskLevel}`}></div>
                      {row.tag && (
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border bg-white shadow-sm ${
                          row.tag === 'Real Filing' ? 'text-[#b08b3e] border-[#C9A456]/30' :
                          row.tag === 'Live Conflict Search' ? 'text-red-600 border-red-200' :
                          'text-[#13243b] border-[#13243b]/20'
                        }`}>
                          {row.tag}
                        </span>
                      )}
                    </div>
                    <ChevronRight size={16} className={`transition-transform duration-300 ${selectedRow?.id === row.id ? 'text-brand-gold translate-x-1' : 'text-gray-300 group-hover:text-gray-500'}`} />
                  </div>
                </div>
              )) : (
                <div className="p-8 text-center text-gray-500 flex flex-col items-center">
                  <Inbox size={32} className="text-gray-300 mb-3" />
                  <p className="text-sm font-medium">No records match your filters.</p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT PANE: Detail View */}
          <div className={`
            ${!selectedRow ? 'hidden lg:flex' : 'flex'} 
            flex-1 bg-gradient-to-br from-[#f8f9fa] to-white flex-col overflow-y-auto relative
          `}>
            
            {selectedRow ? (
              <div className="animate-in fade-in slide-in-from-right-8 duration-300 pb-12">
                
                {/* Mobile Back Button */}
                <div className="lg:hidden p-4 border-b border-gray-200 bg-white sticky top-0 z-20 flex justify-between items-center shadow-sm">
                  <button 
                    onClick={() => setSelectedRow(null)}
                    className="flex items-center gap-1 text-brand-navy font-bold text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full transition-colors"
                  >
                    <ChevronRight className="rotate-180" size={16} /> Back to Inbox
                  </button>
                  <div className="flex gap-2">
                    <button onClick={() => setRowToDelete(selectedRow)} className="p-2 text-red-500 bg-red-50 rounded-full hover:bg-red-100"><Trash2 size={16}/></button>
                  </div>
                </div>

                {/* Detail Header Hero */}
                <div className="bg-brand-navy text-white px-8 py-10 relative overflow-hidden shrink-0">
                  {/* Decorative BG element */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                  
                  <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div className="max-w-2xl">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-xs font-black font-mono text-brand-navy bg-brand-gold px-2 py-1 rounded shadow-sm">
                          {selectedRow.id}
                        </span>
                      </div>
                      
                      <h2 className="text-3xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                        {selectedRow.client}
                      </h2>
                      <p className="text-gray-300 font-medium text-sm lg:text-base flex items-center gap-2">
                        <Scale size={16} className="text-brand-gold"/> 
                        {selectedRow.matterDesc}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
                      <button className="flex-1 md:flex-none bg-white text-brand-navy hover:bg-brand-gold hover:text-white transition-all shadow-lg font-bold py-2.5 px-5 rounded-lg flex items-center justify-center gap-2 text-sm">
                        <FileText size={16} /> Open Intake
                      </button>
                      <button className="flex-1 md:flex-none bg-white/10 text-white hover:bg-white/20 transition-all font-bold py-2.5 px-5 rounded-lg flex items-center justify-center gap-2 text-sm border border-white/20">
                        <FileCheck size={16} /> Intake Summary
                      </button>
                      <button 
                        onClick={() => setRowToDelete(selectedRow)} 
                        className="hidden lg:flex p-2.5 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors border border-transparent hover:border-red-400/20" 
                        title="Delete Record"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Workflow Stepper */}
                <div className="px-8 -mt-6 relative z-20">
                  <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 md:p-5 flex items-center justify-between gap-2 xl:gap-4 overflow-hidden">
                    {steps.map((step, index) => (
                      <div key={index} className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : 'shrink-0'}`}>
                        <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full shrink-0 flex items-center justify-center border-2 text-[10px] md:text-xs font-bold z-10 transition-all duration-300
                          ${step.completed ? 'border-brand-gold bg-brand-gold text-white shadow-md' : 
                            step.current ? 'border-brand-navy bg-brand-navy text-white shadow-lg shadow-brand-navy/20 scale-110' : 
                            'border-gray-200 text-gray-400 bg-gray-50'}`}
                        >
                          {step.completed ? <CheckCircle size={14} /> : index + 1}
                        </div>
                        <span className={`text-[9px] xl:text-xs font-bold ml-2 xl:ml-3 uppercase tracking-wide hidden md:block whitespace-nowrap
                          ${step.completed ? 'text-brand-gold' : 
                            step.current ? 'text-brand-navy' : 'text-gray-400'}`}>
                          {step.label}
                        </span>
                        {index < steps.length - 1 && (
                          <div className={`flex-1 h-0.5 ml-2 xl:ml-3 min-w-[10px]
                            ${step.completed ? 'bg-brand-gold/50' : 'bg-gray-100'}`} 
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detailed Info Grid */}
                <div className="p-8 grid grid-cols-1 xl:grid-cols-3 gap-8">
                  
                  {/* Left Column - Details */}
                  <div className="xl:col-span-2 space-y-8">
                    
                    <section>
                      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Info size={16}/> Matter Information
                      </h3>
                      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 grid grid-cols-1 md:grid-cols-2 gap-6 relative overflow-hidden">
                        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 pb-4 border-b border-gray-50">
                          <div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Status</p>
                            <p className="text-sm font-bold text-brand-navy bg-brand-gold/10 px-3 py-1.5 rounded-lg inline-block border border-brand-gold/20">{selectedRow.status}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Type</p>
                            <p className="text-sm font-bold text-brand-navy bg-gray-50 px-3 py-1.5 rounded-lg inline-block">{selectedRow.type}</p>
                          </div>
                        </div>
                        <div className="md:col-span-2">
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Description</p>
                          <p className="text-sm font-medium text-brand-navy">{selectedRow.description}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Jurisdiction</p>
                          <p className="text-sm font-medium text-brand-navy flex items-center gap-1.5">
                            <Scale size={14} className="text-gray-400"/> {selectedRow.jurisdiction}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Matter Number</p>
                          <p className="text-sm font-mono text-gray-600">{selectedRow.matterNum}</p>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Database size={16}/> Administration & Source
                      </h3>
                      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 grid grid-cols-1 md:grid-cols-2 gap-6 relative overflow-hidden">
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Lead Partner</p>
                          <p className="text-sm font-medium text-brand-navy flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-brand-navy">
                              {selectedRow.leadPartner.charAt(0)}
                            </span>
                            {selectedRow.leadPartner}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Initiator</p>
                          <p className="text-sm font-medium text-gray-700">{selectedRow.initiator}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Initiated</p>
                          <p className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                            <Clock size={14} className="text-gray-400"/> {selectedRow.initiated}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Data Source</p>
                          <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-gray-50 border border-gray-200 text-brand-navy shadow-sm`}>
                            {selectedRow.tag || 'Unknown'}
                          </span>
                        </div>
                      </div>
                    </section>

                  </div>

                  {/* Right Column - Actions & Docs */}
                  <div className="space-y-6">
                    <div className="bg-brand-navy rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group cursor-pointer hover:shadow-xl transition-all">
                      <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors"></div>
                      <ShieldAlert className="text-brand-gold mb-4" size={32} />
                      <h4 className="text-lg font-bold mb-2">Conflict Analysis</h4>
                      <p className="text-xs text-gray-300 mb-6 leading-relaxed">Run a comprehensive conflict check across 491 active records and historical data.</p>
                      <button className="w-full bg-brand-gold hover:bg-yellow-500 text-brand-navy font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm text-sm">
                        Run Analysis <ArrowRight size={16} />
                      </button>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                      <h4 className="text-sm font-bold text-brand-navy uppercase tracking-widest mb-4 flex items-center gap-2">
                        <FileText size={16} className="text-gray-400"/> Attached Documents
                      </h4>
                      <div className="space-y-3">
                        {selectedRow.notes.split(',').map((note, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50 hover:border-gray-200 transition-colors cursor-pointer group">
                            <div className="bg-white p-2 rounded shadow-sm border border-gray-100 group-hover:border-brand-gold/30 transition-colors">
                              <FileText size={16} className="text-brand-navy" />
                            </div>
                            <span className="text-xs font-medium text-brand-navy truncate flex-1" title={note.trim()}>{note.trim()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gray-50/30">
                <div className="w-24 h-24 bg-white rounded-full shadow-sm border border-gray-100 flex items-center justify-center mb-6">
                  <Inbox size={40} className="text-brand-gold/40" />
                </div>
                <h3 className="text-xl font-bold text-brand-navy mb-2">No Intake Selected</h3>
                <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
                  Select an item from the inbox list to view detailed information, run conflict analysis, and progress the workflow.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Delete Modal Overlay */}
      {rowToDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            <div className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-5 ring-8 ring-red-50/50">
                <AlertTriangle size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-2">Delete Record?</h3>
              <p className="text-gray-600 text-sm mb-8 leading-relaxed">
                You are about to permanently delete <span className="font-bold text-brand-navy px-1 bg-gray-100 rounded">{rowToDelete.id}</span>. This action cannot be undone.
              </p>
              <div className="flex gap-3 w-full">
                <button 
                  onClick={() => setRowToDelete(null)}
                  className="flex-1 px-4 py-3 text-gray-600 font-bold bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors text-sm"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDeleteConfirm}
                  className="flex-1 px-4 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-sm shadow-red-600/20 text-sm"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Sub-component for Sidebar Navigation Items
function NavItem({ icon, label, badge, active }) {
  return (
    <a 
      href="#" 
      className={`
        flex items-center justify-center lg:justify-start gap-3 p-3 rounded-xl transition-all duration-200 group relative
        ${active 
          ? 'bg-brand-gold/10 text-brand-gold' 
          : 'text-gray-400 hover:bg-white/5 hover:text-white'}
      `}
      title={label}
    >
      <div className={`transition-transform duration-200 ${active ? 'scale-110' : 'group-hover:scale-110'}`}>
        {icon}
      </div>
      <span className={`text-sm font-bold hidden lg:block ${active ? 'text-white' : ''}`}>{label}</span>
      
      {/* Badge for Desktop */}
      {badge && (
        <span className={`hidden lg:flex ml-auto items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-bold
          ${active ? 'bg-brand-gold text-brand-navy' : 'bg-white/10 text-white'}
        `}>
          {badge}
        </span>
      )}

      {/* Indicator dot for Mobile if has badge */}
      {badge && !active && (
        <span className="lg:hidden absolute top-2 right-2 w-2 h-2 bg-brand-gold rounded-full"></span>
      )}
    </a>
  );
}

export default App;
