import { useState } from 'react';
import { Cpu, Plus, Trash2, Sparkles, RefreshCw, Layers } from 'lucide-react';
import { Genome, LayerGene, LayerType } from '../types';

interface NASViewProps {
  genome: Genome;
  onUpdateGenome: (newGenome: Genome) => void;
}

export function NASView({ genome, onUpdateGenome }: NASViewProps) {
  const [selectedLayerType, setSelectedLayerType] = useState<LayerType>('dense');
  const [isMutating, setIsMutating] = useState(false);

  const addLayer = () => {
    let defaultParams: LayerGene['params'] = {};
    if (selectedLayerType === 'dense' || selectedLayerType === 'lstm' || selectedLayerType === 'gru') {
      defaultParams = { units: 128, activation: 'relu', return_sequences: false };
    } else if (selectedLayerType === 'bilstm') {
      defaultParams = { units: 64, return_sequences: true };
    } else if (selectedLayerType === 'conv1d') {
      defaultParams = { filters: 128, kernel_size: 3 };
    } else if (selectedLayerType === 'attention') {
      defaultParams = { heads: 4, key_dim: 64 };
    } else if (selectedLayerType === 'dropout') {
      defaultParams = { rate: 0.3 };
    }

    const newGene: LayerGene = {
      id: `gene-${Date.now()}`,
      type: selectedLayerType,
      params: defaultParams,
    };

    const updatedGenes = [...genome.genes, newGene];
    onUpdateGenome({
      ...genome,
      genes: updatedGenes,
      parametersCount: genome.parametersCount + Math.floor(Math.random() * 500000 + 100000),
    });
  };

  const removeLayer = (id: string) => {
    if (genome.genes.length <= 1) return;
    const updatedGenes = genome.genes.filter((g) => g.id !== id);
    onUpdateGenome({
      ...genome,
      genes: updatedGenes,
      parametersCount: Math.max(200000, genome.parametersCount - 300000),
    });
  };

  const triggerMutation = () => {
    setIsMutating(true);
    setTimeout(() => {
      // Randomize parameters or shuffle
      const mutatedGenes = genome.genes.map((g) => {
        if (g.type === 'dense' && g.params.units) {
          return { ...g, params: { ...g.params, units: [64, 128, 256, 512][Math.floor(Math.random() * 4)] } };
        }
        return g;
      });
      const newAcc = Math.min(0.96, genome.accuracy + (Math.random() * 0.03 - 0.01));
      onUpdateGenome({
        ...genome,
        generation: genome.generation + 1,
        genes: mutatedGenes,
        accuracy: newAcc,
        fitness: newAcc * 0.98,
        timestamp: new Date().toISOString(),
      });
      setIsMutating(false);
    }, 800);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Neural Architecture Search (NAS) Engine</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Genome Architecture Builder</h1>
          <p className="text-xs text-slate-400 mt-1">
            Design, mutate, and optimize neural network layer sequences dynamically.
          </p>
        </div>
        <button
          onClick={triggerMutation}
          disabled={isMutating}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-sm transition-all disabled:opacity-50 cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${isMutating ? 'animate-spin' : ''}`} />
          <span>{isMutating ? 'Mutating Architecture...' : 'Trigger NAS Mutation'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Layer Stack */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Active Layer Sequence</h2>
            <span className="text-xs font-mono text-slate-400">
              Total Parameters: <strong className="text-white">{genome.parametersCount.toLocaleString()}</strong>
            </span>
          </div>

          <div className="space-y-3">
            {genome.genes.map((gene, idx) => (
              <div
                key={gene.id}
                className="p-4 bg-slate-800/60 border border-slate-700/60 rounded-xl flex items-center justify-between group hover:border-indigo-500/50 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-xs font-mono text-indigo-400 font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white uppercase tracking-wider">{gene.type}</div>
                    <div className="text-xs text-slate-400 font-mono mt-0.5">
                      {Object.entries(gene.params).map(([k, v]) => `${k}: ${v}`).join(' · ')}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => removeLayer(gene.id)}
                  disabled={genome.genes.length <= 1}
                  className="p-2 text-slate-500 hover:text-rose-400 transition-colors disabled:opacity-30 cursor-pointer"
                  title="Remove Layer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Add Layer Control */}
          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center gap-3">
            <select
              value={selectedLayerType}
              onChange={(e) => setSelectedLayerType(e.target.value as LayerType)}
              className="w-full sm:w-auto px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="dense">Dense (Fully Connected)</option>
              <option value="lstm">LSTM (Recurrent)</option>
              <option value="gru">GRU (Gated Recurrent)</option>
              <option value="bilstm">BiLSTM (Bidirectional)</option>
              <option value="conv1d">Conv1D (Convolutional)</option>
              <option value="attention">MultiHead Attention</option>
              <option value="dropout">Dropout Regularization</option>
            </select>
            <button
              onClick={addLayer}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl border border-slate-700 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Append Layer</span>
            </button>
          </div>
        </div>

        {/* Evaluation Panel */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-white">Genome Performance</h2>

          <div className="space-y-4">
            <div className="p-4 bg-slate-800/40 border border-slate-800 rounded-xl">
              <span className="text-xs text-slate-400">Estimated Accuracy</span>
              <div className="text-3xl font-bold font-mono text-emerald-400 mt-1 tabular-nums">
                {(genome.accuracy * 100).toFixed(2)}%
              </div>
            </div>

            <div className="p-4 bg-slate-800/40 border border-slate-800 rounded-xl">
              <span className="text-xs text-slate-400">Fitness Score</span>
              <div className="text-3xl font-bold font-mono text-indigo-400 mt-1 tabular-nums">
                {genome.fitness.toFixed(4)}
              </div>
            </div>

            <div className="p-4 bg-slate-800/40 border border-slate-800 rounded-xl">
              <span className="text-xs text-slate-400">Generation</span>
              <div className="text-2xl font-bold font-mono text-white mt-1 tabular-nums">
                Gen {genome.generation}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
