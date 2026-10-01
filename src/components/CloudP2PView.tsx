import { useState } from 'react';
import { Server, Network, CheckCircle2, RefreshCw, Layers } from 'lucide-react';
import { P2PNode } from '../types';

interface CloudP2PViewProps {
  p2pNodes: P2PNode[];
  onSyncMesh: () => void;
}

export function CloudP2PView({ p2pNodes, onSyncMesh }: CloudP2PViewProps) {
  const [syncing, setSyncing] = useState(false);
  const [provider, setProvider] = useState<'docker' | 'kubernetes'>('docker');

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      onSyncMesh();
      setSyncing(false);
    }, 1000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono mb-2">
            <Server className="w-3.5 h-3.5" />
            <span>Level 4 · Cloud-Native & P2P Node Mesh</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Distributed Node Mesh & Cloud Deployer</h1>
          <p className="text-xs text-slate-400 mt-1">
            Autonomous container orchestration and decentralized peer-to-peer model sharing.
          </p>
        </div>
        <button
          onClick={handleSync}
          disabled={syncing}
          className="flex items-center gap-2 px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-xl shadow-sm transition-all disabled:opacity-50 cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
          <span>{syncing ? 'Synchronizing Mesh...' : 'Sync P2P Mesh'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* P2P Node Mesh List */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Network className="w-5 h-5 text-cyan-400" />
              <span>Active P2P Network</span>
            </h2>
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              {p2pNodes.filter((n) => n.status === 'alive').length} Online Nodes
            </span>
          </div>

          <div className="space-y-3">
            {p2pNodes.map((node) => (
              <div key={node.id} className="p-4 bg-slate-800/50 border border-slate-700/60 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-white flex items-center gap-2">
                    {node.id}
                    <span className={`w-2 h-2 rounded-full ${node.status === 'alive' ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`} />
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">{node.url}</div>
                </div>
                <div className="text-right font-mono text-xs">
                  <div className="text-cyan-400 font-semibold">{node.modelsShared} models</div>
                  <div className="text-slate-500 text-[10px]">{node.latencyMs}ms latency</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cloud Deployment Manifests */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" />
              <span>Cloud Infrastructure Manifest</span>
            </h2>
            <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg border border-slate-700">
              <button
                onClick={() => setProvider('docker')}
                className={`px-3 py-1 text-xs font-mono rounded-md transition-colors ${provider === 'docker' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Dockerfile
              </button>
              <button
                onClick={() => setProvider('kubernetes')}
                className={`px-3 py-1 text-xs font-mono rounded-md transition-colors ${provider === 'kubernetes' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Kubernetes
              </button>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-indigo-200 overflow-x-auto max-h-[300px]">
            {provider === 'docker' ? (
              <pre>{`FROM python:3.10-slim
WORKDIR /app
RUN pip install --no-cache-dir tensorflow==2.13.0 tensorflow-datasets==4.9.0
COPY model/ ./model/
COPY app.py .
EXPOSE 8080
ENV PORT=8080
ENV P2P_ENABLED=true
CMD ["python", "app.py"]`}</pre>
            ) : (
              <pre>{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: auto-god-omega
spec:
  replicas: 3
  selector:
    matchLabels:
      app: omega
  template:
    metadata:
      labels:
        app: omega
    spec:
      containers:
      - name: omega
        image: auto-god:omega-v5.2
        ports:
        - containerPort: 8080`}</pre>
            )}
          </div>

          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3 text-xs text-emerald-300">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Infrastructure ready for instant cloud deployment across Docker, Fly.io, or Kubernetes clusters.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
