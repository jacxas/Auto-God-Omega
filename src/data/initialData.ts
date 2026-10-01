import { Genome, EvolutionCycle, P2PNode, DeploymentConfig, SingularityLog } from '../types';

export const initialGenomes: Genome[] = [
  {
    id: 'gen-001',
    generation: 5,
    genes: [
      { id: 'g1', type: 'conv1d', params: { filters: 128, kernel_size: 5 } },
      { id: 'g2', type: 'attention', params: { heads: 4, key_dim: 64 } },
      { id: 'g3', type: 'lstm', params: { units: 256, return_sequences: false } },
      { id: 'g4', type: 'dropout', params: { rate: 0.3 } }
    ],
    fitness: 0.8942,
    accuracy: 0.9120,
    parametersCount: 2543201,
    timestamp: '2026-09-29T04:12:00Z'
  },
  {
    id: 'gen-002',
    generation: 4,
    genes: [
      { id: 'g1', type: 'bilstm', params: { units: 128, return_sequences: true } },
      { id: 'g2', type: 'dense', params: { units: 128, activation: 'swish' } },
      { id: 'g3', type: 'dropout', params: { rate: 0.2 } }
    ],
    fitness: 0.8651,
    accuracy: 0.8840,
    parametersCount: 1420910,
    timestamp: '2026-09-29T03:45:00Z'
  },
  {
    id: 'gen-003',
    generation: 3,
    genes: [
      { id: 'g1', type: 'gru', params: { units: 256, return_sequences: false } },
      { id: 'g2', type: 'dense', params: { units: 64, activation: 'relu' } }
    ],
    fitness: 0.8210,
    accuracy: 0.8350,
    parametersCount: 982100,
    timestamp: '2026-09-29T03:10:00Z'
  }
];

export const initialCycles: EvolutionCycle[] = [
  {
    cycleId: 5,
    timestamp: '2026-09-29T04:12:00Z',
    dataset: 'imdb_reviews',
    bestFitness: 0.8942,
    bestAccuracy: 0.9120,
    activeGenome: initialGenomes[0],
    status: 'completed'
  },
  {
    cycleId: 4,
    timestamp: '2026-09-29T03:45:00Z',
    dataset: 'yelp_polarity',
    bestFitness: 0.8651,
    bestAccuracy: 0.8840,
    activeGenome: initialGenomes[1],
    status: 'completed'
  },
  {
    cycleId: 3,
    timestamp: '2026-09-29T03:10:00Z',
    dataset: 'imdb_reviews',
    bestFitness: 0.8210,
    bestAccuracy: 0.8350,
    activeGenome: initialGenomes[2],
    status: 'completed'
  }
];

export const initialP2PNodes: P2PNode[] = [
  { id: 'omega_seed_01', url: 'http://localhost:8081', status: 'alive', modelsShared: 14, latencyMs: 12 },
  { id: 'omega_node_02', url: 'http://localhost:8082', status: 'alive', modelsShared: 9, latencyMs: 24 },
  { id: 'omega_node_03', url: 'http://10.0.4.15:8080', status: 'syncing', modelsShared: 5, latencyMs: 58 },
  { id: 'omega_edge_04', url: 'http://192.168.1.105:8080', status: 'alive', modelsShared: 18, latencyMs: 8 }
];

export const initialDeployment: DeploymentConfig = {
  provider: 'docker',
  replicas: 3,
  imageTag: 'auto-god:omega-v5.2',
  status: 'deployed'
};

export const initialSingularityLogs: SingularityLog[] = [
  {
    timestamp: '2026-09-29T04:00:00Z',
    version: '5.2',
    totalLines: 540,
    functionsCount: 16,
    avgComplexity: 3.8,
    mutationsApplied: ['version_header', 'complexity_reduction', 'error_handling', 'meta_learning'],
    healthScore: 1.0
  },
  {
    timestamp: '2026-09-29T02:30:00Z',
    version: '5.1',
    totalLines: 490,
    functionsCount: 14,
    avgComplexity: 4.2,
    mutationsApplied: ['version_header', 'self_diagnostics', 'improvement_tracking'],
    healthScore: 1.0
  }
];
