import React, { useState, useEffect } from 'react';
import AppV1 from './AppV1';
import AppV2 from './AppV2';

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

  // Check if path ends with /v1 or /v2
  if (currentPath.toLowerCase().endsWith('/v1')) {
    return <AppV1 />;
  }
  
  if (currentPath.toLowerCase().endsWith('/v2')) {
    return <AppV2 />;
  }

  // Default Home Page for the root url
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0B1C38] text-white font-sans p-6">
      <div className="max-w-md w-full bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm text-center shadow-2xl">
        <h1 className="text-3xl font-extrabold mb-2">CosmosHelios - Intake</h1>
        <p className="text-gray-400 mb-8 text-sm">Select a prototype version to view</p>
        
        <div className="flex flex-col gap-4">
          <a 
            href="./v1"
            onClick={(e) => navigate(e, './v1')}
            className="w-full px-6 py-4 bg-white text-[#0B1C38] rounded-xl font-bold hover:bg-gray-100 transition-all shadow-md flex items-center justify-between group"
          >
            <span>Version 1 (Original Grid)</span>
            <span className="text-gray-400 group-hover:translate-x-1 transition-transform">→</span>
          </a>
          <a 
            href="./v2"
            onClick={(e) => navigate(e, './v2')}
            className="w-full px-6 py-4 bg-[#C9A456] text-[#0B1C38] rounded-xl font-bold hover:bg-[#b08b3e] transition-all shadow-md flex items-center justify-between group"
          >
            <span>Version 2 (Split Pane)</span>
            <span className="text-[#0B1C38]/50 group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
