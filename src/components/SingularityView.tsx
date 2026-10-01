import { useState } from 'react';
import { Shield, Sparkles, AlertTriangle, CheckCircle2, RefreshCw } from 'lucide-react';
import { SingularityLog } from '../types';

interface SingularityViewProps {
  logs: SingularityLog[];
  onTriggerSingularity: () => void;
}

export function SingularityView({ logs, onTriggerSingularity }: SingularityViewProps) {
  const [isEvolving, setIsEvolving] = useState(false);
  const [stopped, setStopped] = useState(false);

  const handleEvolve = () => {
    if (stopped) return;
    setIsEvolving(true);
    setTimeout(() => {
      onTriggerSingularity();
      setIsEvolving(false);
    }, 1200);
  };

  const latestLog = logs[0] || {
    version: '5.2',
    totalLines: 540,
    functionsCount: 16,
    avgComplexity: 3.8,
    mutationsApplied: ['version_header', 'error_handling'],
    healthScore: 1.0,
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono mb-2">
            <Shield className="w-3.5 h-3.5" />
            <span>Level 5 · Singularity & Self-Modifying Source Engine</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Singularity Control Panel</h1>
          <p className="text-xs text-slate-400 mt-1">
            AST source analysis, recursive code mutation, and emergency safety overrides.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setStopped(!stopped)}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              stopped
                ? 'bg-emerald-600/20 border-emerald-500/30 text-emerald-300 hover:bg-emerald-600/30'
                : 'bg-rose-600/20 border-rose-500/30 text-rose-300 hover:bg-rose-600/30'
            }`}
          >
            {stopped ? 'Resume Singularity' : 'STOP_SINGULARITY (Emergency)'}
          </button>
          <button
            onClick={handleEvolve}
            disabled={isEvolving || stopped}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-sm transition-all disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isEvolving ? 'animate-spin' : ''}`} />
            <span>{isEvolving ? 'Mutating Codebase...' : 'Trigger Self-Modification'}</span>
          </button>
        </div>
      </div>

      {stopped && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-center gap-3 text-rose-300 text-xs font-mono">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
          <span>EMERGENCY STOP ACTIVE (`STOP_SINGULARITY` marker present). All automated source mutations are suspended.</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* AST Metrics */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <span>AST Code Metrics</span>
          </h2>

          <div className="space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between p-3 bg-slate-800/40 rounded-xl">
              <span className="text-slate-400">Current Version:</span>
              <span className="text-indigo-400 font-bold">v{latestLog.version}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-800/40 rounded-xl">
              <span className="text-slate-400">Total Lines:</span>
              <span className="text-white">{latestLog.totalLines}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-800/40 rounded-xl">
              <span className="text-slate-400">Functions Analyzed:</span>
              <span className="text-white">{latestLog.functionsCount}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-800/40 rounded-xl">
              <span className="text-slate-400">Cyclomatic Complexity:</span>
              <span className="text-emerald-400">{latestLog.avgComplexity} (Optimal)</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-800/40 rounded-xl">
              <span className="text-slate-400">Syntax Health Score:</span>
              <span className="text-emerald-400 font-bold">{(latestLog.healthScore * 100).toFixed(0)}%</span>
            </div>
          </div>
        </div>

        {/* Mutation Log History */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-white">Singularity Mutation History</h2>
          <p className="text-xs text-slate-400">Log of automated structural self-modifications and code optimizations.</p>

          <div className="space-y-3">
            {logs.map((log, idx) => (
              <div key={idx} className="p-4 bg-slate-800/50 border border-slate-700/60 rounded-xl space-y-2">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-indigo-400 font-bold">Version v{log.version}</span>
                  <span className="text-slate-500">{new Date(log.timestamp).toLocaleString()}</span>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {log.mutationsApplied.map((mut, mIdx) => (
                    <span key={mIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {mut}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center gap-3 text-xs text-indigo-300">
            <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
            <span>AST validator ensures all self-modifying Python scripts pass strict syntax checks prior to process replacement.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
