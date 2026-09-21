import React, { useState, useEffect } from 'react';
import AppV1 from './AppV1';
import AppV2 from './AppV2';
import AppV3 from './AppV3';
import VersionSwitcher from './VersionSwitcher';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Handle manual navigation within the app without full page reload
  const navigate = (e, path) => {
    e.preventDefault();
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  if (currentPath.toLowerCase().endsWith('/v1')) {
    return (
      <>
        <VersionSwitcher currentPath={currentPath} navigate={navigate} />
        <AppV1 />
      </>
    );
  }

  if (currentPath.toLowerCase().endsWith('/v2')) {
    return (
      <>
        <VersionSwitcher currentPath={currentPath} navigate={navigate} />
        <AppV2 />
      </>
    );
  }

  if (currentPath.toLowerCase().endsWith('/v3')) {
    return (
      <>
        <VersionSwitcher currentPath={currentPath} navigate={navigate} />
        <AppV3 />
      </>
    );
  }

  // Default Home Page for the root url
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 text-slate-800 font-sans p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-slate-200 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <h1 className="text-3xl font-extrabold mb-2 text-slate-900">CosmosHelios - Intake</h1>
        <p className="text-slate-500 mb-8 text-sm">Select a corporate design theme</p>
        
        <div className="flex flex-col gap-4">
          <a 
            href="./v1"
            onClick={(e) => navigate(e, './v1')}
            className="w-full px-6 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-md flex items-center justify-between group"
          >
            <span>V1: Slate & Sapphire</span>
            <span className="text-blue-400 group-hover:translate-x-1 transition-transform">→</span>
          </a>
          <a 
            href="./v2"
            onClick={(e) => navigate(e, './v2')}
            className="w-full px-6 py-4 bg-emerald-900 text-white rounded-xl font-bold hover:bg-emerald-800 transition-all shadow-md flex items-center justify-between group"
          >
            <span>V2: Forest & Stone</span>
            <span className="text-stone-400 group-hover:translate-x-1 transition-transform">→</span>
          </a>
          <a 
            href="./v3"
            onClick={(e) => navigate(e, './v3')}
            className="w-full px-6 py-4 bg-zinc-900 text-white rounded-xl font-bold hover:bg-zinc-800 transition-all shadow-md flex items-center justify-between group"
          >
            <span>V3: Charcoal & Amethyst</span>
            <span className="text-violet-400 group-hover:translate-x-1 transition-transform">→</span>
          </a>

        </div>
      </div>
    </div>
  );
}

export default App;
