import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { OverviewView } from './components/OverviewView';
import { NASView } from './components/NASView';
import { HyperparametersView } from './components/HyperparametersView';
import { ReplicantsView } from './components/ReplicantsView';
import { CloudP2PView } from './components/CloudP2PView';
import { SingularityView } from './components/SingularityView';
import { MultimodalStudioView } from './components/MultimodalStudioView';
import { ActiveTab, EvolutionCycle, Genome, P2PNode, SingularityLog } from './types';
import { initialCycles, initialGenomes, initialP2PNodes, initialSingularityLogs } from './data/initialData';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [generation, setGeneration] = useState(5);
  const [cycles, setCycles] = useState<EvolutionCycle[]>(initialCycles);
  const [bestGenome, setBestGenome] = useState<Genome>(initialGenomes[0]);
  const [p2pNodes, setP2PNodes] = useState<P2PNode[]>(initialP2PNodes);
  const [singularityLogs, setSingularityLogs] = useState<SingularityLog[]>(initialSingularityLogs);
  const [isExecuting, setIsExecuting] = useState(false);

  const handleRunCycle = () => {
    setIsExecuting(true);
    setTimeout(() => {
      const nextGen = generation + 1;
      const accDelta = (Math.random() * 0.02 - 0.005);
      const newAcc = Math.min(0.97, bestGenome.accuracy + accDelta);
      const newFitness = newAcc * 0.985;

      const newGenome: Genome = {
        id: `gen-00${nextGen}`,
        generation: nextGen,
        genes: [...bestGenome.genes],
        fitness: newFitness,
        accuracy: newAcc,
        parametersCount: bestGenome.parametersCount + Math.floor(Math.random() * 100000 - 30000),
        timestamp: new Date().toISOString()
      };

      const newCycle: EvolutionCycle = {
        cycleId: cycles.length + 1,
        timestamp: new Date().toISOString(),
        dataset: 'imdb_reviews',
        bestFitness: newFitness,
        bestAccuracy: newAcc,
        activeGenome: newGenome,
        status: 'completed'
      };

      setGeneration(nextGen);
      setBestGenome(newGenome);
      setCycles([newCycle, ...cycles]);
      setIsExecuting(false);
    }, 1500);
  };

  const handleSyncMesh = () => {
    setP2PNodes(prev => prev.map(n => ({
      ...n,
      modelsShared: n.modelsShared + Math.floor(Math.random() * 3),
      latencyMs: Math.max(5, n.latencyMs + Math.floor(Math.random() * 6 - 3))
    })));
  };

  const handleTriggerSingularity = () => {
    const nextVer = (parseFloat(singularityLogs[0]?.version || '5.2') + 0.1).toFixed(1);
    const newLog: SingularityLog = {
      timestamp: new Date().toISOString(),
      version: nextVer,
      totalLines: (singularityLogs[0]?.totalLines || 540) + 18,
      functionsCount: (singularityLogs[0]?.functionsCount || 16) + 1,
      avgComplexity: 3.6,
      mutationsApplied: ['version_header', 'complexity_reduction', 'meta_learning', 'ast_patch'],
      healthScore: 1.0
    };
    setSingularityLogs([newLog, ...singularityLogs]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onRunCycle={handleRunCycle}
        isExecuting={isExecuting}
        generation={generation}
      />

      <main className="flex-1 px-6 py-8">
        {activeTab === 'overview' && (
          <OverviewView
            cycles={cycles}
            bestGenome={bestGenome}
            p2pNodes={p2pNodes}
            onRunCycle={handleRunCycle}
            isExecuting={isExecuting}
            generation={generation}
          />
        )}
        {activeTab === 'nas' && (
          <NASView
            genome={bestGenome}
            onUpdateGenome={(g) => setBestGenome(g)}
          />
        )}
        {activeTab === 'hyperparams' && <HyperparametersView />}
        {activeTab === 'replicants' && <ReplicantsView />}
        {activeTab === 'cloud' && (
          <CloudP2PView
            p2pNodes={p2pNodes}
            onSyncMesh={handleSyncMesh}
          />
        )}
        {activeTab === 'singularity' && (
          <SingularityView
            logs={singularityLogs}
            onTriggerSingularity={handleTriggerSingularity}
          />
        )}
        {activeTab === 'multimodal' && <MultimodalStudioView />}
      </main>

      <footer className="border-t border-slate-900 px-6 py-4 text-center text-xs text-slate-600 font-mono">
        Auto-God Omega Autonomous Core · All systems operating at peak nominal efficiency.
      </footer>
    </div>
  );
}
