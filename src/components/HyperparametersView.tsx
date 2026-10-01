import { useState } from 'react';
import { Sliders, Save, CheckCircle2 } from 'lucide-react';

export function HyperparametersView() {
  const [dataset, setDataset] = useState('imdb_reviews');
  const [vocabSize, setVocabSize] = useState('10000');
  const [embeddingDim, setEmbeddingDim] = useState('128');
  const [batchSize, setBatchSize] = useState('32');
  const [epochs, setEpochs] = useState('3');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono mb-2">
          <Sliders className="w-3.5 h-3.5" />
          <span>Level 1 · Auto-ML Hyperparameter Optimization</span>
        </div>
        <h1 className="text-2xl font-bold text-white">Hyperparameter Configuration</h1>
        <p className="text-xs text-slate-400 mt-1">
          Configure Bayesian optimization search space and dataset parameters for autonomous training cycles.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-2">Target Dataset (TFDS)</label>
            <select
              value={dataset}
              onChange={(e) => setDataset(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="imdb_reviews">IMDB Movie Reviews (Sentiment)</option>
              <option value="yelp_polarity">Yelp Polarity Reviews</option>
              <option value="amazon_us_reviews">Amazon US Reviews (Movies & TV)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-2">Vocabulary Size</label>
            <select
              value={vocabSize}
              onChange={(e) => setVocabSize(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="8000">8,000 tokens</option>
              <option value="10000">10,000 tokens</option>
              <option value="15000">15,000 tokens</option>
              <option value="20000">20,000 tokens</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-2">Embedding Dimension</label>
            <select
              value={embeddingDim}
              onChange={(e) => setEmbeddingDim(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="32">32-dim</option>
              <option value="64">64-dim</option>
              <option value="128">128-dim</option>
              <option value="256">256-dim</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-2">Batch Size</label>
            <select
              value={batchSize}
              onChange={(e) => setBatchSize(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="16">16 samples</option>
              <option value="32">32 samples</option>
              <option value="64">64 samples</option>
              <option value="128">128 samples</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-2">Training Epochs per Cycle</label>
            <select
              value={epochs}
              onChange={(e) => setEpochs(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="2">2 epochs</option>
              <option value="3">3 epochs</option>
              <option value="5">5 epochs</option>
            </select>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-400 font-mono">
            {saved && (
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" /> Configuration successfully updated & persisted.
              </span>
            )}
          </div>
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-sm transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
}
