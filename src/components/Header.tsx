import React from 'react';
import { 
  Activity, 
  UploadCloud, 
  Sparkles, 
  AlertTriangle, 
  IndianRupee, 
  Sun, 
  Moon, 
  Bot, 
  FileText, 
  CreditCard, 
  Wrench, 
  ShoppingCart, 
  Users
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenUpload: () => void;
  criticalAlertCount: number;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenUpload,
  criticalAlertCount,
  isDarkMode,
  onToggleTheme,
}) => {
  const tabs = [
    { id: 'dashboard', label: 'Digital Twin & AI', icon: <Bot className="w-3.5 h-3.5" /> },
    { id: 'vault', label: 'Document Vault', icon: <FileText className="w-3.5 h-3.5" /> },
    { id: 'financials', label: 'Indian Financials', icon: <CreditCard className="w-3.5 h-3.5" /> },
    { id: 'vendors', label: 'Local Vendors', icon: <Wrench className="w-3.5 h-3.5" /> },
    { id: 'inventory', label: 'Kitchen Inventory', icon: <ShoppingCart className="w-3.5 h-3.5" /> },
    { id: 'chores', label: 'Family Chores', icon: <Users className="w-3.5 h-3.5" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0B0F17]/95 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Brand & Indian Domestic Locale Badge */}
        <div className="flex items-center gap-3.5">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500/20 via-emerald-500/20 to-teal-500/20 border border-emerald-500/40 shadow-lg shadow-emerald-950/40">
            <span className="text-xl">🇮🇳</span>
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
                Household <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-400">OS</span>
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-mono tracking-wider uppercase font-semibold bg-emerald-500/10 text-emerald-400 rounded-md border border-emerald-500/30">
                India Edition (₹)
              </span>
            </div>
            
            <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-400">
              <span className="font-mono text-emerald-400">Sharma Household • Flat 402</span>
              {criticalAlertCount > 0 && (
                <span className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full text-[10px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                  <AlertTriangle className="w-2.5 h-2.5" />
                  {criticalAlertCount} Action{criticalAlertCount > 1 ? 's' : ''} Needed
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2.5">
          
          {/* Working Upload Button */}
          <button
            onClick={onOpenUpload}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 transition-all shadow-md shadow-emerald-500/20"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Upload Document</span>
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-400" />}
          </button>
        </div>
      </div>

      {/* Navigation Sub-bar for the 6 Core Features */}
      <div className="max-w-7xl mx-auto mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-xl transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 font-medium'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-3 text-xs text-slate-400 font-mono">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Reconciled
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span> Due Soon
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span> Urgent Action
          </span>
        </div>
      </div>
    </header>
  );
};
