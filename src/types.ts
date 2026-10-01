export type LayerType = 'dense' | 'lstm' | 'gru' | 'bilstm' | 'conv1d' | 'attention' | 'dropout' | 'batchnorm' | 'residual';

export interface LayerGene {
  id: string;
  type: LayerType;
  params: {
    units?: number;
    activation?: string;
    return_sequences?: boolean;
    filters?: number;
    kernel_size?: number;
    heads?: number;
    key_dim?: number;
    rate?: number;
  };
}

export interface Genome {
  id: string;
  generation: number;
  genes: LayerGene[];
  fitness: number;
  accuracy: number;
  parametersCount: number;
  timestamp: string;
}

export interface EvolutionCycle {
  cycleId: number;
  timestamp: string;
  dataset: string;
  bestFitness: number;
  bestAccuracy: number;
  activeGenome: Genome;
  status: 'completed' | 'running' | 'failed';
}

export interface P2PNode {
  id: string;
  url: string;
  status: 'alive' | 'syncing' | 'offline';
  modelsShared: number;
  latencyMs: number;
}

export interface DeploymentConfig {
  provider: 'docker' | 'kubernetes' | 'fly' | 'render';
  replicas: number;
  imageTag: string;
  status: 'deployed' | 'building' | 'stopped';
}

export interface SingularityLog {
  timestamp: string;
  version: string;
  totalLines: number;
  functionsCount: number;
  avgComplexity: number;
  mutationsApplied: string[];
  healthScore: number;
}

export type ActiveTab = 'overview' | 'nas' | 'hyperparams' | 'replicants' | 'cloud' | 'singularity' | 'multimodal';
