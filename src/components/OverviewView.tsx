import { Cpu, Network, GitBranch, Shield, Sparkles, TrendingUp, Zap, ArrowUpRight, Activity } from 'lucide-react';
import { EvolutionCycle, Genome, P2PNode } from '../types';

interface OverviewViewProps {
  cycles: EvolutionCycle[];
  bestGenome: Genome;
  p2pNodes: P2PNode[];
  onRunCycle: () => void;
  isExecuting: boolean;
  generation: number;
}

export function OverviewView({ cycles, bestGenome, p2pNodes, onRunCycle, isExecuting, generation }: OverviewViewProps) {
  const activePeersCount = p2pNodes.filter((n) => n.status === 'alive').length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Omega Core Active · Autonomous Orchestrator</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Autonomous AI Singularity Hub
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed">
              Orchestrating 5 levels of autonomous intelligence: Neural Architecture Search, code auto-replication, P2P model mesh, and self-modifying Python singularity loops.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch gap-3 w-full md:w-auto">
            <button
              onClick={onRunCycle}
              disabled={isExecuting}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-600/20 transition-all disabled:opacity-50 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>{isExecuting ? 'Running Cycle...' : 'Execute Cycle'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Core Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-medium uppercase tracking-wider">Best Accuracy</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold font-mono text-white tabular-nums">
            {(bestGenome.accuracy * 100).toFixed(2)}%
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs text-emerald-400">
            <span>+2.4% from previous gen</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-medium uppercase tracking-wider">Active Generation</span>
            <GitBranch className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-3xl font-bold font-mono text-white tabular-nums">
            Gen {generation}
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
            <span>NAS complexity: {bestGenome.genes.length} layers</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-medium uppercase tracking-wider">P2P Mesh Nodes</span>
            <Network className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-bold font-mono text-white tabular-nums">
            {activePeersCount} <span className="text-sm font-normal text-slate-400">/ {p2pNodes.length}</span>
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs text-cyan-400">
            <span>Mesh sync nominal</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-medium uppercase tracking-wider">Singularity Health</span>
            <Shield className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-3xl font-bold font-mono text-white tabular-nums">
            100%
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs text-indigo-400">
            <span>AST validation passed</span>
          </div>
        </div>
      </div>

      {/* Two Column Section: Best Genome Architecture & Recent Cycles */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Recent Evolution Cycles */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-white">Evolution Cycle History</h2>
              <p className="text-xs text-slate-400">Track record of autonomous training cycles and evaluation metrics.</p>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              {cycles.length} cycles completed
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-xs font-medium text-slate-400">
                  <th className="pb-3 font-medium">Cycle ID</th>
                  <th className="pb-3 font-medium">Dataset</th>
                  <th className="pb-3 font-medium">Accuracy</th>
                  <th className="pb-3 font-medium">Fitness</th>
                  <th className="pb-3 font-medium text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                {cycles.map((cycle) => (
                  <tr key={cycle.cycleId} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 font-semibold text-indigo-400">#00{cycle.cycleId}</td>
                    <td className="py-3.5 text-slate-300">{cycle.dataset}</td>
                    <td className="py-3.5 text-emerald-400 tabular-nums font-semibold">
                      {(cycle.bestAccuracy * 100).toFixed(2)}%
                    </td>
                    <td className="py-3.5 text-slate-300 tabular-nums">{cycle.bestFitness.toFixed(4)}</td>
                    <td className="py-3.5 text-right text-slate-500">
                      {new Date(cycle.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Col: Active Optimal Genome */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">Optimal Genome</h2>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Active
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-6">
              Current best neural architecture discovered by NAS engine.
            </p>

            <div className="space-y-3">
              {bestGenome.genes.map((gene, idx) => (
                <div key={gene.id} className="p-3 bg-slate-800/50 border border-slate-700/60 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-xs font-mono text-indigo-400 font-bold">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="text-xs font-semibold text-white uppercase tracking-wider">{gene.type}</div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {JSON.stringify(gene.params).replace(/[{}"]/g, '').replace(/,/g, ' · ')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between font-mono">
            <span>Parameters:</span>
            <span className="text-white font-semibold">{bestGenome.parametersCount.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* System Health Dashboard Component */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-400" />
              <span>System Health & Core Telemetry</span>
            </h2>
            <p className="text-xs text-slate-400">Real-time resource utilization, hardware temperatures, and neural engine stability.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Nominal Operation
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
          {/* CPU Usage */}
          <div className="p-4 bg-slate-800/40 border border-slate-800 rounded-xl space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">CPU Utilization</span>
              <span className="text-white font-bold">42.4%</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-indigo-500 h-full rounded-full transition-all duration-500" style={{ width: '42.4%' }} />
            </div>
            <div className="text-[10px] text-slate-500 flex justify-between">
              <span>8 Cores Active</span>
              <span>3.4 GHz</span>
            </div>
          </div>

          {/* Memory Allocation */}
          <div className="p-4 bg-slate-800/40 border border-slate-800 rounded-xl space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Memory Allocation</span>
              <span className="text-white font-bold">6.8 GB / 16 GB</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-cyan-500 h-full rounded-full transition-all duration-500" style={{ width: '42.5%' }} />
            </div>
            <div className="text-[10px] text-slate-500 flex justify-between">
              <span>TF Cache: 4.2 GB</span>
              <span>42.5% Used</span>
            </div>
          </div>

          {/* CPU Temperature */}
          <div className="p-4 bg-slate-800/40 border border-slate-800 rounded-xl space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">CPU Temperature</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                54.2°C (Optimal)
              </span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: '54%' }} />
            </div>
            <div className="text-[10px] text-slate-500 flex justify-between">
              <span>Thermal Throttling: Off</span>
              <span>Max: 95°C</span>
            </div>
          </div>

          {/* Neural Engine Stability Score */}
          <div className="p-4 bg-slate-800/40 border border-slate-800 rounded-xl space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Neural Engine Stability</span>
              <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[10px] font-bold">
                99.8%
              </span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-indigo-500 h-full rounded-full transition-all duration-500" style={{ width: '99.8%' }} />
            </div>
            <div className="text-[10px] text-slate-500 flex justify-between">
              <span>Gradient Divergence: 0.00</span>
              <span>Stable</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
