import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, LayoutGrid, PanelLeft, Sparkles, Home } from 'lucide-react';

export default function VersionSwitcher({ currentPath, navigate }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const versions = [
    { path: './v1', label: 'V1: Slate & Sapphire', icon: LayoutGrid },
    { path: './v2', label: 'V2: Forest & Stone', icon: PanelLeft },
    { path: './v3', label: 'V3: Charcoal & Amethyst', icon: Sparkles }
  ];

  const activeVersion = versions.find(v => currentPath.toLowerCase().endsWith(v.path.substring(1))) || versions[0];

  const handleNav = (e, path) => {
    navigate(e, path);
    setIsOpen(false);
  };

  return (
    <div className="fixed top-3 left-1/2 -translate-x-1/2 z-[100]" ref={dropdownRef}>
      <div className="relative">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-white/90 backdrop-blur-md border border-slate-200 shadow-sm px-4 py-2 rounded-full text-xs font-bold text-slate-800 hover:bg-slate-50 transition-all"
        >
          <activeVersion.icon size={14} className="text-slate-600" />
          {activeVersion.label}
          <ChevronDown size={14} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden py-1 animate-in fade-in slide-in-from-top-2 duration-200">
            {versions.map((v) => (
              <a
                key={v.path}
                href={v.path}
                onClick={(e) => handleNav(e, v.path)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs text-left hover:bg-slate-50 transition-colors
                  ${activeVersion.path === v.path ? 'bg-slate-50 font-bold text-slate-900' : 'text-slate-600 font-medium'}
                `}
              >
                <v.icon size={14} className={activeVersion.path === v.path ? 'text-slate-800' : 'text-slate-400'} />
                {v.label}
              </a>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}
