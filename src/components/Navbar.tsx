import { Cpu, Play, Sparkles } from 'lucide-react';
import { ActiveTab } from '../types';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onRunCycle: () => void;
  isExecuting: boolean;
  generation: number;
}

export function Navbar({ activeTab, setActiveTab, onRunCycle, isExecuting, generation }: NavbarProps) {
  const navItems: { id: ActiveTab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'nas', label: 'NAS Search' },
    { id: 'hyperparams', label: 'Hyperparameters' },
    { id: 'replicants', label: 'Replicants' },
    { id: 'cloud', label: 'Cloud & P2P' },
    { id: 'singularity', label: 'Singularity' },
    { id: 'multimodal', label: 'Multimodal Studio' },
  ];

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-3.5 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100">
      {/* Zone 1: Brand title */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-indigo-600/20 border border-indigo-500/30 rounded-lg text-indigo-400">
          <Cpu className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <span className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
            Auto-God Omega
            <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              vΩ.5.{generation}
            </span>
          </span>
        </div>
      </div>

      {/* Zone 2: Navigation links */}
      <nav className="hidden lg:flex items-center gap-1 bg-slate-800/60 p-1 rounded-xl border border-slate-700/50">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Zone 3: Primary action */}
      <div className="flex items-center gap-3">
        <button
          onClick={onRunCycle}
          disabled={isExecuting}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg shadow-sm transition-all disabled:opacity-50 whitespace-nowrap cursor-pointer"
        >
          {isExecuting ? (
            <>
              <Sparkles className="w-4 h-4 animate-spin text-indigo-200" />
              <span>Executing Cycle...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>Run Evolution Cycle</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
}
